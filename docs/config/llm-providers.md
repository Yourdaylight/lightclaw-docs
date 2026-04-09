---
sidebar_position: 1
title: LLM 供应商配置
description: 配置 LightClaw 支持的各种 LLM 供应商，包括 OpenAI、DashScope、Ollama 等。
---

# LLM 供应商配置

LightClaw 支持多种 LLM（大语言模型）供应商，可以根据需求自由选择或组合使用。

## 支持的供应商

| 供应商 | 说明 | 需要 API Key | 推荐用途 |
|--------|------|:----------:|----------|
| **OpenAI** | GPT-4o、GPT-4、GPT-3.5 等 | ✅ | 复杂推理任务 |
| **DashScope** | 阿里千问系列 | ✅ | 中文场景，性价比高 |
| **Ollama** | 本地 Ollama 服务 | ❌ | 本地部署，隐私优先 |
| **LLaMA-CPP** | 本地 GGUF 模型推理 | ❌ | 资源受限设备 |
| **MLX** | macOS Apple Silicon 本地推理 | ❌ | Mac 用户最优选择 |

## 配置方式

### 方式一：交互式配置

```bash
lightclaw init
# 或
lightclaw config
# 选择 "重新配置 LLM"
```

### 方式二：直接编辑配置文件

所有配置存储在 `~/.lightclaw/lightclaw.json`：

```json title="~/.lightclaw/lightclaw.json"
{
  "llm": {
    "provider": "openai",
    "api_key": "sk-xxx",
    "base_url": "https://api.openai.com/v1",
    "model": "gpt-4o",
    "temperature": 0.7,
    "max_tokens": 4096
  }
}
```

### 方式三：环境变量

```bash
export OPENAI_API_KEY="sk-xxx"
export DASHSCOPE_API_KEY="sk-xxx"
```

:::tip 环境变量优先级高于配置文件中的值。
:::

## OpenAI 配置

```bash
# 使用 CLI 配置
lightclaw models add-provider openai
# 输入 API Key 和选择模型
```

```json title="配置示例"
{
  "llm": {
    "provider": "openai",
    "api_key": "sk-your-api-key-here",
    "base_url": "https://api.openai.com/v1",
    "model": "gpt-4o"
  }
}
```

支持的模型：
- `gpt-4o` — 最新旗舰模型（推荐）
- `gpt-4-turbo` — 性能均衡
- `gpt-3.5-turbo` — 成本最低

### 兼容 OpenAI API 的服务

LightClaw 也支持任何兼容 OpenAI API 格式的第三方服务：

```json title="使用第三方代理"
{
  "llm": {
    "provider": "openai",
    "base_url": "https://your-proxy.example.com/v1",
    "model": "your-model-name",
    "api_key": "your-key"
  }
}
```

## DashScope (阿里千问) 配置

```bash
lightclaw models add-provider dashscope
```

```json title="配置示例"
{
  "llm": {
    "provider": "dashscope",
    "api_key": "sk-your-dashscope-key",
    "model": "qwen-max"
  }
}
```

支持的模型：
- `qwen-max` — 最强能力（推荐）
- `qwen-plus` — 均衡性能和成本
- `qwen-turbo` — 快速响应
- `qwen-long` — 长上下文（100K+ tokens）

## Ollama (本地) 配置

```bash
# 安装并启动 Ollama
curl -fsSL https://ollama.ai/install.sh | bash
ollama serve &

# 拉取模型
ollama pull llama3
ollama pull qwen2

# 在 LightClaw 中配置
lightclaw models add-provider ollama
```

```json title="配置示例"
{
  "llm": {
    "provider": "ollama",
    "base_url": "http://localhost:11434",
    "model": "qwen2:7b"
  }
}
```

推荐本地模型：
- `qwen2:7b` / `qwen2:72b` — 千问二代
- `llama3:8b` / `llama3:70b` — Meta Llama 3
- `codellama:13b` — 代码专用

## LLaMA-CPP (本地) 配置

```bash
# 安装依赖
pip install lightclaw[ollama]

# 下载 GGUF 格式模型
# 从 HuggingFace 下载 .gguf 文件
```

```json title="配置示例"
{
  "llm": {
    "provider": "llama-cpp",
    "model_path": "~/.lightclaw/models/qwen2-7b-instruct-q4_k_m.gguf",
    "n_ctx": 4096,
    "n_gpu_layers": -1  // -1 表示全部使用 GPU
  }
}
```

## MLX (Apple Silicon) 配置

```bash
# 仅支持 macOS Apple Silicon (M1/M2/M3/M4)
pip install lightclaw[mlx]
```

```json title="配置示例"
{
  "llm": {
    "provider": "mlx",
    "model": "mlx-community/Qwen2-7B-Instruct-4bit"
  }
}
```

## 多模型路由

LightClaw 的智能多模型路由功能可以根据任务复杂度自动选择合适的模型：

```json title="多模型路由配置"
{
  "llm": {
    "routing": {
      "enabled": true,
      "rules": [
        {
          "pattern": "简单问答",
          "provider": "ollama",
          "model": "qwen2:7b"
        },
        {
          "pattern": "代码生成|复杂分析",
          "provider": "openai",
          "model": "gpt-4o"
        },
        {
          "pattern": "*",
          "provider": "dashscope",
          "model": "qwen-plus"
        }
      ],
      "fallback": {
        "provider": "ollama",
        "model": "qwen2:7b"
      }
    }
  }
}
```

:::info Token 节省策略
多模型路由是 LightClaw **省钱** 的核心策略之一。简单问题用便宜/本地模型处理，复杂任务才调用昂贵的云端大模型。整体可降低一个数量级的 Token 成本。
:::

## 模型参数调优

```json
{
  "llm": {
    "temperature": 0.7,     // 创造性：0(确定) - 2(随机)
    "top_p": 0.9,           // 核采样
    "max_tokens": 4096,      // 最大生成长度
    "presence_penalty": 0,   // 存在惩罚
    "frequency_penalty": 0   // 频率惩罚
  }
}
```

| 参数 | 说明 | 推荐值 |
|------|------|--------|
| `temperature` | 输出随机性 | 0.3-0.5（精确任务），0.7-1.0（创意任务） |
| `top_p` | 核采样阈值 | 0.9 |
| `max_tokens` | 最大输出 token 数 | 2048-8192 |
| `presence_penalty` | 减少重复话题 | 0-0.6 |
| `frequency_penalty` | 减少重复用词 | 0-0.6 |

## 切换模型

```bash
# CLI 切换
lightclaw models switch
# 交互式选择新模型

# 或在 Dashboard 的设置页面切换
```
