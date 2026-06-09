---
title: "MCP 协议边界：统一上下文与工具接入，不替代业务权限"
date: "2026-01-15"
summary: "MCP 用标准消息连接 Host、Client 与 Server，但认证、授权、审计和高风险确认仍需系统设计。"
tags: ["MCP", "协议"]
featured: false
---

Model Context Protocol 为 AI 应用访问工具、资源和 Prompt 提供统一接口。Host 承载用户体验与模型，Client 与具体 Server 建立连接，Server 对外暴露能力。

## 标准化解决什么

工具可以用 schema 描述名称、参数和返回值，资源提供可读取上下文，Prompt 则封装可复用模板。统一协议减少每个 Agent 框架重复适配日历、地图、数据库等服务的成本。

协议不会自动保证安全。Server 只应暴露最小权限能力，敏感参数在服务端再次校验；读取与写入操作要区分风险等级，高风险动作需要明确用户确认。日志中记录调用方、参数摘要、结果和 trace id，但不能泄露密钥与敏感正文。

## 工具设计仍然重要

一个含糊的“万能执行”工具即使符合协议，也很难安全使用。工具应职责单一、错误可解释、结果结构化，并支持超时与取消。

原始资料：[MCP Specification](https://modelcontextprotocol.io/specification/2025-11-25)。
