# GitHub Actions 自动化部署文档

## 目录
- [1. 方案概述](#1-方案概述)
- [2. 前置条件](#2-前置条件)
- [3. 服务器端配置](#3-服务器端配置)
  - [3.1 创建部署专用用户](#31-创建部署专用用户)
  - [3.2 配置SSH免密登录](#32-配置ssh免密登录)
  - [3.3 配置目录权限](#33-配置目录权限)
- [4. GitHub仓库配置](#4-github仓库配置)
  - [4.1 添加SSH私钥（Secret）](#41-添加ssh私钥secret)
  - [4.2 添加服务器IP（Secret）](#42-添加服务器ipsecret)
- [5. 编写Actions工作流](#5-编写actions工作流)
  - [5.1 文件路径与结构](#51-文件路径与结构)
  - [5.2 完整YAML配置](#52-完整yaml配置)
  - [5.3 配置详解](#53-配置详解)
- [6. 验证部署](#6-验证部署)
- [7. 常见问题排查](#7-常见问题排查)
- [8. 维护建议](#8-维护建议)

---

## 1. 方案概述
实现代码推送至GitHub后自动触发以下流程：
1. 在GitHub云端环境构建项目
2. 将构建产物同步至阿里云服务器
3. 重启Nginx服务使更新生效

**部署流程图**：
```
本地代码 -> Push到GitHub -> 触发GitHub Actions ->
自动构建 -> SCP上传文件 -> SSH执行重启命令 -> 服务更新
```

---

## 2. 前置条件
- 项目根目录已存在`package.json`和构建脚本（`npm run build`）
- 服务器端已部署以下环境：
  - Node.js运行环境（版本需与构建环境匹配）
  - Nginx服务（已配置正确站点目录）
  - Git客户端

---

## 3. 服务器端配置

### 3.1 创建部署专用用户
```bash
# 创建用户并授予sudo权限
sudo adduser deployer
sudo usermod -aG sudo deployer

# 验证用户创建
su - deployer
sudo whoami  # 应返回root
```

### 3.2 配置SSH免密登录
```bash
# 本地生成密钥对（开发机执行）
ssh-keygen -t ed25519 -f ~/.ssh/deploy_ogliu -N ""

# 上传公钥到服务器
ssh-copy-id -i ~/.ssh/deploy_ogliu.pub deployer@8.138.58.115

# 验证免密登录
ssh -i ~/.ssh/deploy_ogliu deployer@8.138.58.115
```

### 3.3 配置目录权限
```bash
# 假设项目部署目录为 /var/www/ogliu-gallery
sudo mkdir -p /var/www/ogliu-gallery
sudo chown -R deployer:deployer /var/www/ogliu-gallery
```

---

## 4. GitHub仓库配置

### 4.1 添加SSH私钥（Secret）
1. 访问 `https://github.com/[用户名]/[仓库名]/settings/secrets/actions`
2. 点击 `New repository secret`
3. 填写信息：
  - **Name**: `SERVER_SSH_KEY`
  - **Secret**: 粘贴 `~/.ssh/deploy_ogliu` 文件的完整内容（包括`-----BEGIN/END OPENSSH...`边界）
4. 保存密钥

### 4.2 添加服务器IP（Secret）
1. 同一Secret配置页点击 `New repository secret`
2. 填写信息：
  - **Name**: `SERVER_IP`
  - **Secret**: `8.138.58.115`
3. 保存密钥

---

## 5. 编写Actions工作流

### 5.1 文件路径与结构
在项目根目录创建以下路径的文件：
`/.github/workflows/deploy.yml`

**文件命名规则**：
- `.github` 和 `workflows` 为固定目录名称
- `deploy.yml` 可自定义名称（建议见名知意）

### 5.2 完整YAML配置
```yaml
name: Auto-Deploy ogliu.net

on:
  push:
    branches: [ main ]

jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      # ---------- 代码检出 ----------
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 0  # 获取完整git历史

      # ---------- Node环境配置 ----------
      - name: Setup Node.js 18.x
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'  # 启用npm依赖缓存

      # ---------- 依赖安装与构建 ----------
      - name: Install dependencies
        run: |
          npm ci --prefer-offline  # 根据lock文件精确安装
          echo "Dependencies installed"

      - name: Build project
        run: npm run build
        env:
          NODE_ENV: production

      # ---------- 文件部署 ----------
      - name: Upload artifacts via SCP
        uses: appleboy/scp-action@v0.1.6
        with:
          host: ${{ secrets.SERVER_IP }}
          username: deployer
          key: ${{ secrets.SERVER_SSH_KEY }}
          source: 'dist/'        # 构建产物目录
          target: '/var/www/ogliu-gallery'
          overwrite: true        # 覆盖现有文件
          strip_components: 1    # 移除父级目录结构

      # ---------- 服务重启 ----------
      - name: Restart services via SSH
        uses: appleboy/ssh-action@v1.0.0
        with:
          host: ${{ secrets.SERVER_IP }}
          username: deployer
          key: ${{ secrets.SERVER_SSH_KEY }}
          script: |
            echo "---- 开始部署 ----"
            sudo systemctl restart nginx
            echo "✔️ Nginx已重启"
            echo "---- 部署完成 ----"
```

### 5.3 配置详解
| 步骤                | 关键配置                 | 作用说明                                                                 |
|---------------------|--------------------------|--------------------------------------------------------------------------|
| `Checkout`          | `fetch-depth: 0`         | 获取完整git历史（对需要版本比较的场景有用）                                |
| `Setup Node.js`     | `cache: 'npm'`           | 缓存node_modules加快后续构建                                              |
| `Install`           | `npm ci --prefer-offline`| 根据lock文件安装，优先使用本地缓存                                        |
| `Build`             | `NODE_ENV`              | 设置生产环境参数                                                          |
| `SCP上传`           | `strip_components: 1`   | 去除源目录层级（如上传dist内容而非dist文件夹本身）                         |
| `SSH重启`           | `restart nginx`          | 通过系统服务管理命令加载新版本                                            |

---

## 6. 验证部署
**6.1 查看Actions执行状态**
推送代码到main分支后，访问：
`https://github.com/[用户名]/[仓库名]/actions`
查看最新工作流是否显示绿色√

**6.2 服务器端验证文件**
```bash
# 查看文件修改时间
ls -l /var/www/ogliu-gallery

# 查看Nginx日志
sudo tail -f /var/log/nginx/access.log
```

---

## 7. 常见问题排查

### 问题1：文件上传失败（SCP: Permission denied）
**可能原因**：
- 服务器目录权限不足
- 私钥未正确配置
  **解决步骤**：
```bash
# 检查目录权限
ssh deployer@8.138.58.115
ls -ld /var/www/ogliu-gallery  # 应显示deployer所属

# 验证SSH连接（本地运行）
ssh -i ~/.ssh/deploy_ogliu deployer@8.138.58.115
```

### 问题2：构建产物未更新
**可能原因**：
- 本地未正确提交代码
- GitHub Actions缓存未清除
  **解决方案**：
  在Actions配置中添加缓存清除步骤：
```yaml
- name: Clean old builds
  run: rm -rf dist/
```

---

## 8. 维护建议
1. **依赖更新**
   定期执行 `npm update` 并提交锁文件 (`package-lock.json`)

2. **安全加固**
  - 限定服务器SSH连接的IP范围
  - GitHub Actions使用最新插件版本

3. **扩展性优化**
   如需增加多环境部署，可添加GitHub Environments配置：
   ```yaml
   environment:
     name: production
     url: https://ogliu.net
   ```
