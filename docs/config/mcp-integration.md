---
sidebar_position: 4
title: MCP 集成
description: 了解如何在 LightClaw 中集成 MCP（Model Context Protocol）工具服务。
---

# MCP 集成

MCP (Model Context Protocol) 是一种标准化协议，允许 AI 模型与外部工具和数据源进行安全交互。LightClaw 完整支持 MCP 协议。

## 什么是 MCP？

```mermaid
graph LR
    subgraph "LightClaw"
        A[Agent Engine]
    end
    
    subgraph "MCP Services"
        B[MCP Server 1<br/>数据库查询]
        C[MCP Server 2<br/>API 调用]
        D[MCP Server 3<br/>文件操作]
    end
    
    A <-->|"MCP Protocol"| B
    A <-->|"MCP Protocol"| C
    A <-->|"MCP Protocol"| D
```

MCP 定义了 AI 应用与外部工具之间的标准接口，包括：
- **工具发现** — 自动获取可用工具列表
- **工具调用** — 统一的调用协议
- **资源访问** — 读取外部数据源
- **提示模板** — 共享 prompt 模板

## 支持的传输类型

| 传输类型 | 适用场景 | 示例 |
|----------|----------|------|
| **stdio** | 本地进程通信 | Node.js / Python 工具 |
| **HTTP/SSE** | 远程服务 | 云端 API |
| **Streamable HTTP** | 双向流 | 实时数据流 |

## 配置 MCP 服务

### stdio 方式（本地服务）

适用于运行在本地的 MCP Server：

```bash
# 添加 filesystem MCP 服务
lightclaw mcp add filesystem \
  --command npx \
  --args "-y" \
  --args "@modelcontextprotocol/server-filesystem" \
  --args "/Users/lizhenghui/Documents" \
  --transport stdio
```

对应的配置文件 `~/.lightclaw/mcp.json`：

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/lizhenghui/Documents"
      ],
      "transport": "stdio"
    }
  }
}
```

### HTTP/SSE 方式（远程服务）

适用于远程部署的 MCP Server：

```bash
# 添加远程 MCP 服务
lightclaw mcp add my-api \
  --url https://mcp.example.com/sse \
  --transport sse \
  --headers "Authorization:Bearer xxx"
```

```json
{
  "mcpServers": {
    "my-api": {
      "url": "https://mcp.example.com/sse",
      "transport": "sse",
      "headers": {
        "Authorization": "Bearer xxx"
      }
    }
  }
}
```

## 管理 MCP 服务

```bash
# 列出所有已注册的 MCP 服务
lightclaw mcp list

# 查看某个服务的工具列表
lightclaw mcp tools filesystem

# 测试服务连通性
lightclaw mcp test filesystem

# 移除服务
lightclaw mcp remove filesystem

# 更新服务配置
lightclaw mcp update filesystem --args "/new/path"
```

## 常用 MCP 服务示例

### 文件系统操作

```bash
npx @modelcontextprotocol/server-filesystem /path/to/dir
```

提供工具：
- `read_file` — 读取文件
- `write_file` — 写入文件
- `list_directory` — 列出目录
- `move_file` — 移动文件
- `search_files` — 搜索文件

### GitHub 操作

```bash
npx @modelcontextprotocol/server-github
```

需要环境变量：`GITHUB_PERSONAL_ACCESS_TOKEN`

提供工具：
- `search_repositories` — 搜索仓库
- `create_issue` — 创建 Issue
- `create_pull_request` — 创建 PR
- `file_search` — 搜索代码

### PostgreSQL 数据库

```bash
npx @modelcontextprotocol/server-postgres "postgresql://user:pass@localhost:5432/mydb"
```

提供工具：
- `read_query` — 只读查询
- `write_query` — 写入查询（需谨慎开启）

### Brave Search

```bash
npx @modelcontextprotocol/server-brave-search
```

需要环境变量：`BRAVE_API_KEY`

提供工具：
- `brave_web_search` — 网页搜索
- `brave_news_search` — 新闻搜索

## 在对话中使用 MCP 工具

配置好 MCP 服务后，Agent 会自动将其纳入可用工具集：

> **用户**: "帮我看看 GitHub 上最近有什么热门的 Python 项目？"

Agent 会自动调用 GitHub MCP 的 `search_repositories` 工具进行搜索。

> **用户**: "帮我查一下数据库里上个月的订单总数"

Agent 会自动调用 PostgreSQL MCP 的 `read_query` 执行 SQL 查询。

## MCP 权限控制

可以为 MCP 工具设置权限限制：

```json
{
  "mcpServers": {
    "database": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-postgres", "..."],
      "permissions": {
        "allowTools": ["read_query"],
        "denyTools": ["write_query"],
        "requireConfirmation": ["delete_*"]
      }
    }
  }
}
```

| 权限级别 | 说明 |
|----------|------|
| `allowTools` | 白名单，仅允许列出的工具 |
| `denyTools` | 黑名单，禁止列出的工具 |
| `requireConfirmation` | 调用时需用户确认 |

## 调试 MCP 问题

```bash
# 查看详细的 MCP 通信日志
lightclaw run --debug

# 手动测试 MCP 服务是否正常
lightclaw mcp debug <service-name>

# 查看 MCP 服务的 schema 信息
lightclaw mcp inspect <service-name>

# 重启 MCP 连接（不重启整个服务）
lightclaw mcp restart <service-name>
```

## 编写自定义 MCP Server

你可以编写自己的 MCP Server 来扩展 LightClaw 的能力：

```python
# my_mcp_server.py
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("my-tools")

@mcp.tool()
def calculate_bmi(weight_kg: float, height_m: float) -> float:
    """计算 BMI 指数"""
    return weight_kg / (height_m ** 2)

@mcp.tool()
def format_date(date_str: str, format: str = "%Y-%m-%d") -> str:
    """格式化日期字符串"""
    from datetime import datetime
    dt = datetime.fromisoformat(date_str)
    return dt.strftime(format)

if __name__ == "__main__":
    mcp.run(transport="stdio")
```

注册到 LightClaw：

```bash
lightclaw mcp add my-tools \
  --command python \
  --args "/path/to/my_mcp_server.py" \
  --transport stdio
```

详细开发指南参见 [MCP 官方文档](https://modelcontextprotocol.io/)。
