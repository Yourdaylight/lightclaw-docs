---
sidebar_position: 4
title: 贡献指南
description: 参与 LightClaw 项目贡献的指南，包括工作流程、编码规范和 PR 流程。
---

# 贡献指南

感谢你对 LightClaw 的关注！我们欢迎各种形式的贡献，包括但不限于：Bug 修复、新功能、文档改进、测试补充等。

## 贡献方式

| 方式 | 适合人群 | 说明 |
|------|----------|------|
| 🐛 报告 Bug | 所有用户 | 在 GitHub Issues 中报告 |
| 💡 提出新功能 | 所有用户 | 在 GitHub Discussions 中讨论 |
| 🔧 修复 Bug | 开发者 | 提交 Pull Request |
| ✨ 新功能开发 | 开发者 | 先在 Discussions 讨论，再提 PR |
| 📝 文档改进 | 所有人 | 改善文档的准确性或易读性 |
| 🧪 补充测试 | 开发者 | 提高测试覆盖率 |

## 开发流程

### 1. Fork 和克隆

```bash
# Fork 仓库后在本地克隆
git clone https://github.com/<your-username>/finnie.git
cd finnie

# 添加上游仓库（方便后续同步）
git remote add upstream https://github.com/orcakit/finnie.git
```

### 2. 创建分支

```bash
# 同步最新代码
git fetch upstream
git checkout main
git merge upstream/main

# 创建功能分支
git checkout -b feature/amazing-feature
```

分支命名规范：

```bash
feature/<功能描述>          # 新功能
fix/<问题描述>              # Bug 修复
docs/<文档修改>             # 文档更新
refactor/<重构范围>         # 重构
test/<测试范围>             # 测试相关
chore/<杂项>                # 构建配置等
```

### 3. 开发和测试

```bash
# 安装开发依赖
uv sync --extra dev

# 编写代码...

# 运行 lint
ruff check .
ruff format .

# 运行测试
pytest -xvs

# 确保全部通过
```

### 4. 提交 Commit

```bash
# 添加文件
git add .

# 提交（遵循 Conventional Commits）
git commit -m "feat(skills): add weather query tool support"
```

Commit Message 规范：

```
<type>(<scope>): <subject>

<body>

<footer>
```

| Type | 说明 |
|------|------|
| `feat` | 新功能 |
| `fix` | Bug 修复 |
| `docs` | 文档变更 |
| `style` | 代码格式（不影响逻辑） |
| `refactor` | 重构（不是新功能也不是修复） |
| `perf` | 性能优化 |
| `test` | 测试相关 |
| `chore` | 构建过程或辅助工具变更 |

### 5. 推送和提交 PR

```bash
# 推送到你的 fork
git push origin feature/amazing-feature

# 在 GitHub 上创建 Pull Request
```

PR 描述模板：

```markdown
## 变更概述
简要描述这次改动的内容和目的。

## 变更类型
- [ ] Bug 修复
- [ ] 新功能
- [ ] 文档更新
- [ ] 其他: ___

## 测试
- [ ] 已添加/更新测试
- [ ] 本地测试通过 (`pytest -xvs`)
- [ ] Lint 检查通过 (`ruff check . && ruff format .`)
- [ ] 类型检查通过 (`mypy src/lightclaw/`)

## 截图/GIF（如果是 UI 变更）

## 关联 Issue
Fixes #xxx (如果有对应的 Issue)
```

## 编码规范

详见项目的 [`CLAUDE.md`](https://github.com/orcakit/finnie/blob/main/CLAUDE.md)，以下是关键要点：

### Python 规范

- 使用 **Ruff** 进行 linting 和 formatting（配置见 `pyproject.toml`）
- 行长度：120 字符
- 字符串引号：双引号
- 缩进：空格（4 个空格）
- 类型注解：所有公开函数必须添加类型注解

```python
# ✅ 正确示例
async def fetch_weather(
    city: str, 
    days: int = 3
) -> list[WeatherData]:
    """获取天气预报数据。"""
    ...

# ❌ 错误示例
def fetchWeather(city, days=3):
    ...
```

### TypeScript/React 规范（前端）

- ESLint + TypeScript strict mode
- Prettier 格式化
- 函数组件 + Hooks
- 组件文件使用 PascalCase

### 文档规范

- Markdown 格式
- 中文为主，技术术语保留英文
- 代码块标注语言类型
- 表格用于结构化数据展示

## 测试指南

### 测试结构

```
tests/
├── conftest.py              # 全局 fixtures
├── test_agent/
│   ├── test_engine.py
│   └── test_runner.py
├── test_memory/
│   ├── test_long_term.py
│   ├── test_user_profile.py
│   └── test_summary.py
├── test_channels/
│   └── test_feishu.py
├── test_skills/
│   ├── test_pdf.py
│   └── test_cron.py
└── test_llm/
    └── test_router.py
```

### 测试示例

```python
import pytest
from unittest.mock import AsyncMock, patch
from lightclaw.memory.long_term import MemoryRetriever


class TestMemoryRetriever:
    """长期记忆检索器的测试类。"""
    
    @pytest.fixture
    def retriever(self):
        """创建测试用的检索器实例。"""
        mock_client = AsyncMock()
        embedder = MockEmbedder()
        return MemoryRetriever(mock_client, embedder)
    
    @pytest.mark.asyncio
    async def test_retrieve_returns_results(self, retriever):
        """测试基本检索功能。"""
        # Arrange
        with patch.object(retriever.client, 'search') as mock_search:
            mock_search.return_value = [MockScoredPoint(...)]
            
            # Act
            results = await retriever.retrieve("用户偏好", top_k=5)
            
            # Assert
            assert len(results) == 5
            mock_search.assert_called_once()
    
    @pytest.mark.asyncio
    async def test_retrieve_filters_by_score_threshold(self, retriever):
        """测试最低分数阈值过滤。"""
        with patch.object(retriever.client, 'search') as mock_search:
            # 设置低于阈值的分数
            mock_search.return_value = [MockScoredPoint(score=0.3)]
            
            results = await retriever.retrieve("query", min_score=0.5)
            
            assert len(results) == 0  # 低分结果被过滤
    
    @pytest.mark.slow
    @pytest.mark.asyncio
    async def test_retrieve_with_large_dataset(self, retriever):
        """大数据量检索性能测试（标记为 slow）。"""
        ...
```

### 运行测试

```bash
# 全部测试
pytest

# 详细模式
pytest -xvs

# 单个文件
pytest tests/test_memory/test_long_term.py -xvs

# 单个测试
pytest tests/test_memory/test_long_term.py::TestMemoryRetriever::test_retrieve_returns_results -xvs

# 覆盖率
pytest --cov=src/lightclaw --cov-report=term-missing

# 仅运行快速测试
pytest -m "not slow"
```

## Code Review 标准

PR 会经过以下方面的 Review：

### 必须通过的检查项

- [ ] **Lint 通过**: `ruff check .` 无错误
- [ ] **格式正确**: `ruff format .` 无变化
- [ ] **测试新增/更新**: 新功能必须有对应测试
- [ ] **测试全部通过**: `pytest` 无失败
- [ ] **无破坏性变更**: 除非必要且在 PR 中明确说明

### Review 关注点

- **代码质量和可读性**
- **性能影响**（特别是热路径代码）
- **安全性**（是否有注入、泄露风险）
- **向后兼容性**（API 变更的影响范围）
- **文档完整性**（公开接口必须有 docstring）

## 社区准则

- **尊重他人** — 保持礼貌和专业
- **建设性反馈** — 评论针对代码而非个人
- **及时回应** — Review 请求尽量在 48 小时内回复
- **持续迭代** — 根据 Review 反馈及时修改

## 问题报告模板

报告 Bug 时请提供以下信息：

1. **复现步骤** — 如何触发该 Bug
2. **期望行为** — 你期望的正确行为
3. **实际行为** — 当前观察到的行为
4. **环境信息** — 操作系统、Python 版本、LightClaw 版本
5. **日志/截图** — 相关的错误日志或截图

```markdown
## 描述
简要描述遇到的问题。

## 复现步骤
1. 运行 `...`
2. 输入 `...`
3. 观察到 `...`

## 期望行为
应该发生什么。

## 实际行为
实际发生了什么。

## 环境
- OS: macOS 15.3
- Python: 3.12.3
- LightClaw: v0.0.57
```

感谢你的贡献！🎉
