---
title: "LangGraph 状态与持久化：把 Agent 执行过程变成可恢复的图"
date: "2026-06-09"
summary: "状态图不仅描述节点跳转，还要定义状态合并、检查点、线程隔离与失败恢复。"
tags: ["LangGraph", "Agent"]
featured: false
---

LangGraph 用节点和边表达工作流，节点读取并更新共享状态。它适合需要条件分支、循环、人工确认和长时间运行的 Agent，但前提是状态结构设计清楚。

## 状态不是聊天记录的别名

状态中应只保存后续节点真正需要的信息，例如任务目标、结构化计划、工具结果引用、审批结论和错误计数。大段原始文档可以存到外部对象存储，只在状态里保留 id，避免检查点持续膨胀。

Reducer 决定多个节点如何合并同一字段。列表是追加、覆盖还是去重，必须显式定义，否则并行节点容易产生不可预测结果。持久化层通过 thread id 隔离会话，并在节点边界保存检查点，使失败任务可以从最近状态继续。

## 生产关注点

为图版本、状态 schema 和节点输入输出建立兼容策略。工作流升级后，旧检查点未必能直接恢复；需要迁移或固定旧版本执行器。

原始资料：[LangGraph Persistence](https://docs.langchain.com/oss/python/langgraph/persistence) 与 [Graph API](https://docs.langchain.com/oss/python/langgraph/graph-api)。
