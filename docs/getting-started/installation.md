---
sidebar_position: 2
title: 安装指南
description: 详细介绍如何安装和配置 LightClaw，包括环境要求、多种安装方式和常见问题。
---

# 安装指南

## 环境要求

### 操作系统

- ✅ macOS (Apple Silicon / Intel)
- ✅ Linux (x86_64 / ARM64)
- ⚠️ Windows (WSL2 支持)

### 运行时依赖

| 依赖项 | 版本要求 | 说明 |
|--------|----------|------|
| Python | 3.11 – 3.13 | 必须使用受支持的版本 |
| uv | 最新版 | 推荐，或使用 pip |

### 可选依赖（本地 LLM）

| 依赖 | 用途 |
|------|------|
| Ollama | 本地大模型运行 |
| LLaMA-CPP | GGUF 格式模型推理 |
| MLX | macOS Apple Silicon 加速 |

## 方式一：一键安装脚本（推荐）

```bash
# macOS / Linux 一行命令安装
curl -fsSL https://finnie-1258344699.cos.ap-guangzhou.myqcloud.com/install.sh | bash
```

安装完成后，打开一个**新的终端窗口**：

```bash
source ~/.zshrc   # Zsh 用户
# 或
source ~/.bashrc  # Bash 用户
```

验证安装成功：

```bash
lightclaw --version
```

## 方式二：从源码安装

```bash
# 克隆仓库
git clone https://github.com/orcakit/finnie.git
cd finnie

# 使用 uv 创建虚拟环境并安装
uv sync

# 或使用 pip
pip install -e .

# 验证安装
lightclaw --version
```

## 方式三：Docker 部署

```bash
# 构建镜像
docker build -t lightclaw .

# 运行容器
docker run -d \
  --name lightclaw \
  --restart unless-stopped \
  -p 80:80 \
  -v ~/.lightclaw:/root/.lightclaw \
  lightclaw

# 查看日志
docker logs -f lightclaw
```

## Docker Compose 部署

LightClaw 提供了完整的 `docker-compose.yml` 配置：

```bash
cd finnie
docker compose up -d
```

这将启动：
- **LightClaw 主服务** (端口 80)
- **Qdrant 向量数据库** (端口 6333)

## 升级

```bash
# 使用安装脚本升级
curl -fsSL https://finnie-1258344699.cos.ap-guangzhou.myqcloud.com/install.sh | bash

# 从源码升级
cd finnie && git pull origin main && uv sync
```

## 卸载

```bash
lightclaw uninstall
```

:::warning 注意事项
卸载会清理 `~/.lightclaw/` 目录下的所有数据，包括配置、记忆和对话记录。请提前备份重要数据！
:::

## 常见问题

<details>
<summary><strong>Q: Python 版本不兼容怎么办？</strong></summary>

请确保使用 Python 3.11 至 3.13 版本。可以使用 [pyenv](https://github.com/pyenv/pyenv) 管理多版本：

```bash
pyenv install 3.12.0
pyenv local 3.12.0
```
</details>

<details>
<summary><strong>Q: 安装后找不到 `lightclaw` 命令？</strong></summary>

确认已重新加载 shell 环境：

```bash
# 检查 PATH 中是否包含 lightclaw 的 bin 路径
which lightclaw

# 如果没有，手动加载
export PATH="$HOME/.local/bin:$PATH"
```
</details>

<details>
<summary><strong>Q: 如何在代理网络下安装？</strong></summary>

```bash
# 设置代理后运行安装脚本
export https_proxy=http://your-proxy:port
curl -fsSL https://finnie-1258344699.cos.ap-guangzhou.myqcloud.com/install.sh | bash
```
</details>

## 下一步

→ [快速开始](/docs/getting-started/quickstart) - 完成初始化配置并启动服务
