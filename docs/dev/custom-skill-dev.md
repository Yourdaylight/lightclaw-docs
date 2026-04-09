---
sidebar_position: 3
title: 自定义技能开发
description: 从零开始为 LightClaw 创建自定义技能的完整指南。
---

# 自定义技能开发

本指南将教你如何从零开始创建一个 LightClaw 自定义技能。

## 技能的基本结构

一个 LightClaw 技能是一个包含以下文件的目录：

```
my-skill/                    # 技能根目录
├── skill.yaml               # 元数据和配置
├── skill.py                 # 主逻辑代码
├── prompts/                 # （可选）Prompt 模板
│   └── system.md
└── assets/                  # （可选）静态资源
    └── icon.png
```

## 快速创建

使用内置的技能创建器：

```bash
# 交互式创建
lightclaw skill create my-skill

# 这会引导你填写：
# - 技能名称
# - 技能描述
# - 技能分类
# - 初始功能
```

或手动创建：

```bash
mkdir -p my-skill/prompts
touch my-skill/skill.yaml my-skill/skill.py
```

## 第一步：定义元数据

```yaml title="skill.yaml"
name: weather-query
version: "1.0.0"
author: Your Name <your@email.com>
description: 天气查询技能，支持全球城市天气查询和未来几天预报
category: utility
tags:
  - weather
  - forecast
  - utility

triggers:
  - "天气"
  - "weather"
  - "温度"
  - "下雨"
  - "天气预报"

permissions:
  required:
    - network-http
optional:
    - location-access

config:
  default_city: "北京"
  api_key_env: "WEATHER_API_KEY"   # 从环境变量读取
  units: "metric"                  # metric / imperial
  
requirements:
  python: []
  npm: []                          # 如需 Node.js 依赖
```

## 第二步：实现技能逻辑

```python title="skill.py"
"""
天气查询技能
支持查询当前天气和未来几天的天气预报。
"""

import httpx
from typing import Optional
from dataclasses import dataclass

from lightclaw.agent.skills.base import BaseSkill, tool


@dataclass
class WeatherData:
    """天气数据结构"""
    city: str
    temperature: float
    humidity: int
    description: str
    wind_speed: float
    feels_like: float


class WeatherQuerySkill(BaseSkill):
    """天气查询技能"""
    
    name = "weather-query"
    version = "1.0.0"
    
    def __init__(self, config: dict = None):
        super().__init__(config or {})
        self.default_city = self.config.get("default_city", "北京")
        self.units = self.config.get("units", "metric")
        
        # 从环境变量获取 API Key
        self.api_key = self._get_api_key()
    
    @tool(
        name="get_current_weather",
        description="查询指定城市的当前天气状况",
        parameters={
            "city": {
                "type": "string",
                "description": "城市名称，如 '北京'、'上海'、'New York'"
            },
        },
    )
    async def get_current_weather(self, city: str = None) -> dict:
        """获取指定城市的实时天气"""
        city = city or self.default_city
        
        try:
            data = await self._fetch_weather(city)
            
            return {
                "success": True,
                "data": {
                    "city": data.city,
                    "temperature": f"{data.temperature}°C",
                    "feels_like": f"{data.feels_like}°C",
                    "humidity": f"{data.humidity}%",
                    "description": data.description,
                    "wind_speed": f"{data.wind_speed} km/h",
                },
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e),
            }
    
    @tool(
        name="get_weather_forecast",
        description="查询指定城市未来几天的天气预报",
        parameters={
            "city": {
                "type": "string",
                "description": "城市名称"
            },
            "days": {
                "type": "integer",
                "description": "预报天数，1-7天",
                "default": 3,
            },
        },
    )
    async def get_weather_forecast(
        self, 
        city: str = None, 
        days: int = 3
    ) -> dict:
        """获取天气预报"""
        if not 1 <= days <= 7:
            return {"success": False, "error": "预报天数必须在 1-7 天之间"}
        
        city = city or self.default_city
        
        try:
            forecasts = await self._fetch_forecast(city, days)
            
            result = {
                "success": True,
                "city": city,
                "forecast": [],
            }
            
            for f in forecasts:
                result["forecast"].append({
                    "date": f["date"],
                    "temp_max": f["temp_max"],
                    "temp_min": f["temp_min"],
                    "description": f["description"],
                    "rain_probability": f.get("rain_prob", 0),
                })
            
            return result
            
        except Exception as e:
            return {"success": False, "error": str(e)}
    
    # ---- 内部方法 ----
    
    async def _fetch_weather(self, city: str) -> WeatherData:
        """调用天气 API 获取当前天气"""
        # 这里使用 Open-Meteo 免费天气 API（无需 Key）
        # 实际项目中可以替换为你选择的天气 API
        url = "https://api.open-meteo.com/v1/forecast"
        params = {
            "latitude": await self._geocode(city),
            "current": "temperature_2m,relative_humidity_2m,weather_code,"
                       "wind_speed_10m,apparent_temperature",
            "timezone": "auto",
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.get(url, params=params)
            response.raise_for_status()
            data = response.json()
            
            current = data["current"]
            
            return WeatherData(
                city=city,
                temperature=current["temperature_2m"],
                humidity=current["relative_humidity_2m"],
                description=self._decode_weather_code(current["weather_code"]),
                wind_speed=current["wind_speed_10m"],
                feels_like=current["apparent_temperature"],
            )
    
    async def _fetch_forecast(self, city: str, days: int) -> list[dict]:
        """获取天气预报"""
        lat = await self._geocode(city)
        url = "https://api.open-meteo.com/v1/forecast"
        params = {
            "latitude": lat,
            "daily": "temperature_2m_max,temperature_2m_min,"
                     "weather_code,precipitation_probability_max",
            "timezone": "auto",
            "forecast_days": days,
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.get(url, params=params)
            response.raise_for_status()
            data = response.json()["daily"]
            
            forecasts = []
            for i in range(len(data["time"])):
                forecasts.append({
                    "date": data["time"][i],
                    "temp_max": f"{data['temperature_2m_max'][i]}°C",
                    "temp_min": f"{data['temperature_2m_min'][i]}°C",
                    "description": self._decode_weather_code(
                        data["weather_code"][i]
                    ),
                    "rain_prob": data["precipitation_probability_max"][i],
                })
            
            return forecasts
    
    async def _geocode(self, city: str) -> float:
        """简单的城市名到纬度的映射（示例用）"""
        # 实际应调用地理编码 API
        common_cities = {
            "北京": 39.9042,
            "上海": 31.2304,
            "广州": 23.1291,
            "深圳": 22.5431,
            "杭州": 30.2741,
            "成都": 30.5728,
        }
        
        if city in common_cities:
            return common_cities[city]
        
        # 默认返回北京的坐标
        return 39.9042
    
    @staticmethod
    def _decode_weather_code(code: int) -> str:
        """WMO 天气编码转中文描述"""
        codes = {
            0: "晴朗",
            1: "大部晴朗",
            2: "多云",
            3: "阴天",
            45: "雾",
            48: "雾凇",
            51: "毛毛雨",
            61: "小雨",
            63: "中雨",
            65: "大雨",
            71: "小雪",
            73: "中雪",
            75: "大雪",
            95: "雷阵雨",
            96: "雷阵雨伴冰雹",
            99: "强雷阵雨",
        }
        return codes.get(code, "未知天气")


# 导出技能实例（供注册使用）
def create_skill(config: dict = None) -> WeatherQuerySkill:
    """工厂函数：创建技能实例"""
    return WeatherQuerySkill(config)
```

## 第三步：添加可选的 Prompt 模板

```markdown title="prompts/system.md"
<!-- 当此技能被激活时追加的系统 Prompt -->

## 天气查询能力
你可以帮助用户查询天气信息和天气预报。

### 使用指南
- 用户询问天气相关问题时主动使用天气工具
- 回复时包含温度、体感温度、湿度等关键信息
- 如果用户没有指定城市，使用默认城市
- 天气预报建议以表格形式呈现

### 回复风格
- 简洁明了，突出关键数据
- 可以根据天气情况给出出行建议（带伞、加衣等）
```

## 第四步：注册和测试

### 本地测试

```bash
# 在技能目录下运行测试
cd my-skill
python -c "
from skill import create_skill
skill = create_skill({'default_city': '深圳'})
result = skill.get_current_weather('上海')
print(result)
"
```

### 注册到 LightClaw

**方式一：复制到技能目录**

```bash
cp -r my-skill ~/.lightclaw/workspace/skills/community/my-skill
```

**方式二：通过 SkillHub 发布后安装**

```bash
lightclaw skill package my-skill
lightclaw skill publish my-skill
# 其他用户可以通过 lightclaw skills install my-skill 安装
```

### 验证技能可用性

```bash
lightclaw skills list
# 应能看到 weather-query 技能

lightclaw mcp tools community.weather-query
# 应能看到 get_current_weather 和 get_weather_forecast 工具
```

## 高级特性

### 异步工具实现

```python
@tool(name="long_running_task")
async def long_running_task(input_data: str) -> str:
    """耗时任务的异步实现"""
    
    # 支持异步 I/O
    async with aiohttp.ClientSession() as session:
        result = await session.post("https://api.example.com/process", json={
            "data": input_data
        })
        return await result.text()
    
    # 支持并行请求
    tasks = [fetch_item(id) for id in item_ids]
    results = await asyncio.gather(*tasks)
    
    return "\n".join(results)
```

### 流式响应

```python
@tool(name="streaming_search")
async def streaming_search(query: str) -> AsyncIterator[str]:
    """流式返回搜索结果"""
    
    async for chunk in search_engine.stream(query):
        yield chunk  # 逐块返回
```

### 技能间协作

```python
@tool(name="plan_trip")
async def plan_trip(destination: str, days: int) -> dict:
    """规划行程（组合多个工具的结果）"""
    
    # 获取天气
    weather = await self.get_current_weather(destination)
    
    # 获取景点信息
    attractions = await self.search_attractions(destination)
    
    # 综合规划
    itinerary = self._generate_itinerary(
        weather=weather,
        attractions=attractions,
        days=days,
    )
    
    return itinerary
```

### 权限声明和使用限制

```yaml
permissions:
  required:
    - network-http          # 需要网络访问
  optional:
    - location-access       # 可能需要位置信息

rate_limit:
  requests_per_minute: 10  # 限流保护
```

## 最佳实践

### 1. 工具设计原则

| 原则 | 说明 |
|------|------|
| **单一职责** | 每个工具只做一件事 |
| **清晰命名** | 名称准确描述功能 |
| **完整文档** | description 要足够详细供 LLM 理解 |
| **类型安全** | 明确定义参数类型和约束 |
| **优雅降级** | 失败时返回有意义的错误信息 |

### 2. 错误处理

```python
@tool
async def safe_operation(self, param: str) -> dict:
    try:
        result = await self.do_something(param)
        return {"status": "ok", "data": result}
    except ValidationError as e:
        return {
            "status": "error", 
            "error_type": "validation_error",
            "message": f"参数无效: {e}",
            "hint": "请检查参数格式是否正确"
        }
    except RateLimitError as e:
        return {
            "status": "error",
            "error_type": "rate_limited",
            "message": "请求过于频繁，请稍后再试",
            "retry_after": e.retry_after_seconds,
        }
    except Exception as e:
        logger.exception(f"Unexpected error in safe_operation: {e}")
        return {
            "status": "error",
            "message": "服务暂时不可用，请联系管理员",
        }
```

### 3. 日志记录

```python
import logging

logger = logging.getLogger(__name__)

@tool
async def logged_operation(self, input_data: str):
    logger.info(f"Operation started: input_length={len(input_data)}")
    
    start_time = time.time()
    result = await self._do_work(input_data)
    elapsed = time.time() - start_time
    
    logger.info(f"Operation completed: elapsed={elapsed:.2f}s, "
                f"output_length={len(str(result))}")
    
    return result
```

## 发布到社区

当你的技能成熟后，可以考虑发布到 SkillHub 让其他用户使用：

```bash
# 1. 确保代码通过测试
lightclaw skill test my-skill

# 2. 打包
lightclaw skill package my-skill

# 3. 评估效果
lightclaw skill evaluate my-skill

# 4. 发布
lightclaw skill publish my-skill
```
