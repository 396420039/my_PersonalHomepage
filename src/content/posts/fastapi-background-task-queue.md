---
title: "后台任务怎么选：FastAPI BackgroundTasks 不是万能队列"
date: "2026-05-30"
summary: "短小的请求后操作可以留在进程内，耗时、可重试和必须完成的任务应进入持久化队列。"
tags: ["FastAPI", "任务队列"]
featured: false
---

FastAPI 的 `BackgroundTasks` 会在响应返回后执行函数，适合写日志、发送低风险通知等轻量工作。它与 Web 进程同生共死，没有持久化、分布式调度和完善的失败恢复能力，因此不适合批量 OCR、知识库重建、模型微调等长任务。

## 判断标准

如果任务失败后必须重试、需要跨机器扩展、执行时间可能超过请求进程生命周期，或者用户需要查询进度，就应使用独立任务队列。接口只负责校验参数并创建任务，Worker 消费任务并更新状态。

任务设计还要考虑幂等性。为每次业务操作生成稳定的幂等键，避免网络重试造成重复建库或重复扣费。状态至少包含 `pending`、`running`、`succeeded`、`failed` 和可诊断的错误信息。

## 一个实用原则

“返回得快”不等于“任务可靠”。是否放进后台，应由完成保证、执行成本和恢复要求决定，而不是由代码写起来是否方便决定。

原始资料：[FastAPI Background Tasks](https://fastapi.tiangolo.com/tutorial/background-tasks/)。
