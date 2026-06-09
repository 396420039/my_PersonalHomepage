---
title: "A2A 协议：让不同框架的 Agent 交换任务与结果"
date: "2026-02-13"
summary: "A2A 面向 Agent 之间的发现、任务委派与状态更新，与 MCP 的工具和上下文接入侧重点不同。"
tags: ["A2A", "多Agent"]
featured: false
---

企业中的 Agent 可能由不同团队、框架和模型构建。A2A 协议试图为 Agent 发现能力、发送任务、跟踪状态和交换产物提供通用方式，减少点对点定制接口。

## 与 MCP 的分工

MCP 更关注一个 AI 应用如何连接工具和上下文；A2A 更关注一个 Agent 如何把任务交给另一个可独立工作的 Agent。二者可以组合：协调 Agent 通过 A2A 委派旅行规划，旅行 Agent 再通过 MCP 调用地图与酒店工具。

Agent Card 描述服务能力与访问方式，任务具有生命周期和状态，长任务可以持续更新进度或产物。业务实现仍要定义身份认证、租户隔离、超时、取消和费用上限。

多 Agent 不应只是多一次模型调用。只有当子 Agent 拥有独立能力、权限边界或执行周期时，协议化协作才真正有价值。

原始资料：[A2A Protocol Specification](https://a2a-protocol.org/latest/specification/)。
