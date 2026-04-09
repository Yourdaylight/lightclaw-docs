---
sidebar_position: 5
title: 离线模式
description: 配置 LightClaw 完全离线运行，使用本地 LLM 模型实现零 API 调用和完整数据隔离。
---

# 离线模式

LightClaw 支持完全离线运行，使用本地部署的大语言模型实现**零 API 调用**和**完整数据隔离**。

## 为什么使用离线模式？

| 场景 | 优势 |
|------|------|
| 🔒 **隐私敏感** | 所有数据不出本机，满足合规要求 |
| 💰 **零成本** | 无 API 费用，仅需硬件成本 |
| 🚫 **网络受限** | 内网、无外网环境的唯一选择 |
| ⚡ **低延迟** | 本地推理，无网络往返延迟 |

## 支持的本地推理方案

| 方案 | 硬件要求 | 推荐模型 | 特点 |
|------|----------|----------|------|
| **Ollama** | 任意（GPU 加速更好） | Qwen2, Llama3 | 最易上手，生态丰富 |
| **LLaMA-CPP** | CPU 即可（GGUF 格式） | 任意 GGUF 模型 | 资源占用可控 |
| **MLX** | Apple Silicon (M1+) | Qwen2, Llama3 | Mac 最佳选择 |

## 方案一：Ollama（通用推荐）

### 安装 Ollama

```bash
# macOS (Homebrew)
brew install ollama

# Linux
curl -fsSL https://ollama.ai/install.sh | sh

# 启动服务
ollama serve
```

### 下载模型

```bash
# 推荐：千问 7B（中文优秀）
ollama pull qwen2:7b

# 推荐：Llama 3（英文优秀）
ollama pull llama3:8b

# 更大的模型（需要更多内存）
ollama pull qwen2:72b   # 需要 48GB+ 内存
ollama pull llama3:70b  # 需要 48GB+ 内存
```

### 配置 LightClaw

```bash
# 初始化时选择 Ollama 作为 LLM 供应商
lightclaw init
# 选择 provider: ollama
# 选择 model: qwen2:7b
```

或手动修改配置：

```json title="~/.lightclaw/lightclaw.json"
{
  "llm": {
    "provider": "ollama",
    "base_url": "http://localhost:11434",
    "model": "qwen2:7b"
  },
  "offline_mode": true
}
```

### 启动验证

```bash
lightclaw run
```

打开 Dashboard 发送测试消息，确认本地模型正常响应。

---

## 方案二：LLaMA-CPP（CPU 友好）

### 安装

```bash
# 安装 Python 依赖
pip install lightclaw[ollama]

# 下载 GGUF 格式模型
# 推荐从 HuggingFace 下载
mkdir -p ~/.lightclaw/models
cd ~/.lightclaw/models
wget https://huggingface.co/Qwen/Qwen2-7B-Instruct-GGUF/resolve/main/qwen2-7b-instruct-q4_k_m.gguf
```

### 配置

```json
{
  "llm": {
    "provider": "llama-cpp",
    "model_path": "~/.lightclaw/models/qwen2-7b-instruct-q4_k_m.gguf",
    "n_ctx": 4096,
    "n_gpu_layers": -1,
    "offline_mode": true
  }
}
```

| 参数 | 说明 |
|------|------|
| `n_ctx` | 上下文窗口大小 |
| `n_gpu_layers` | GPU 层数（-1 = 全部，0 = 纯 CPU） |
| `n_batch` | 批处理大小（越大越快，占更多内存） |

---

## 方案三：MLX（Apple Silicon）

:::note 仅支持 macOS Apple Silicon (M1/M2/M3/M4) 设备
:::

### 安装

```bash
pip install lightclaw[mlx]
```

### 配置

```json
{
  "llm": {
    "provider": "mlx",
    "model": "mlx-community/Qwen2-7B-Instruct-4bit",
    "offline_mode": true
  }
}
```

MLX 利用 Apple 的 Metal GPU 加速，是 Mac 上的最佳选择。

## 硬件需求参考

| 模型 | 参数量 | 量化 | 最低内存 | 推荐内存 | GPU 显存 |
|------|--------|------|----------|----------|----------|
| Qwen2-7B | 7B | Q4_K_M | 8 GB | 16 GB | 6 GB |
| Qwen2-14B | 14B | Q4_K_M | 12 GB | 24 GB | 10 GB |
| Qwen2-32B | 32B | Q4_K_M | 20 GB | 48 GB | 20 GB |
| Qwen2-72B | 72B | Q4_K_M | 36 GB | 96 GB | 44 GB |
| Llama3-8B | 8B | Q4_K_M | 8 GB | 16 GB | 6 GB |
| Llama3-70B | 70B | Q4_K_M | 36 GB | 96 GB | 44 GB |

:::tip 选择建议
- 16GB 内存的 MacBook Pro → 推荐 Qwen2-7B 或 Llama3-8B
- 32GB+ 内存 → 可以尝试 Qwen2-14B 或 Qwen2-32B
- 64GB+ 内存 → 可以运行 72B 级别大模型
:::

## 离线模式下的可用功能

| 功能 | 离线可用 | 说明 |
|------|:-------:|------|
| 对话聊天 | ✅ | 核心功能完全可用 |
| 文件读写 | ✅ | 本地文件操作 |
| Shell 命令 | ✅ | 执行本地命令 |
| 浏览器自动化 | ⚠️ | 需要能联网才能浏览网页 |
| PDF 处理 | ✅ | 纯本地处理 |
| 定时任务 | ✅ | 本地调度 |
| 记忆系统 | ✅ | 全部本地存储 |
| 技能系统 | ✅ | 大部分技能可用 |
| MCP 服务 | 取决于服务 | 如果 MCP 也是本地的则可用 |

## 混合模式

你也可以将本地模型作为默认，云端模型作为 fallback：

```json
{
  "llm": {
    "primary": {
      "provider": "ollama",
      "model": "qwen2:7b"
    },
    "fallback": {
      "enabled": true,
      "trigger": "complexity_threshold",
      "provider": "openai",
      "model": "gpt-4o"
    }
  }
}
```

这样日常简单对话走本地免费模型，遇到复杂任务才调用云端付费模型。

## 性能优化建议

### 1. 使用量化模型

量化模型大幅减少内存占用和加速推理：

```bash
# Ollama 默认使用量化版本
ollama pull qwen2:7b          # 已经是 Q4_K_M 量化

# 选择更激进的量化
ollama pull qwen2:7b-q3_K_M   # 更小，质量略有下降
```

### 2. 增加 GPU 层数（如果有 GPU）

```json
{
  "llm": {
    "provider": "llama-cpp",
    "n_gpu_layers": -1  // 全部放 GPU
  }
}
```

### 3. 调整上下文窗口

根据实际需求调整，不要设过大：

```json
{
  "llm": {
    "n_ctx": 2048  // 一般够用，比 4096 快一倍
  }
}
```

### 4. 启用持久化缓存

```bash
# Ollama 会自动缓存模型，首次加载后后续启动很快
# 确保 Ollama 保持后台运行
ollama serve &
```
