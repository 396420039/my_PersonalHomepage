---
title: "生产级 Prompt Engineering：先写任务契约，再堆技巧"
date: "2026-06-08"
summary: "稳定 Prompt 要明确目标、输入边界、输出契约、证据规则和失败处理，并通过评测集持续回归。"
tags: ["Prompt", "LLM"]
featured: false
---

Prompt Engineering 的核心不是寻找一句神奇指令，而是把任务写成模型可执行、系统可验证的契约。一个完整 Prompt 通常包含角色与目标、输入数据、业务规则、输出格式、示例以及无法完成时的处理方式。

## 让指令可维护

固定指令与用户数据要清楚分隔，避免检索内容或用户文本被误当成系统要求。需要引用知识库时，应要求答案只依据提供的证据，并允许模型在证据不足时明确拒答。

少量高质量示例通常比大量相似示例更有效。示例要覆盖边界条件和常见失败，而不是只展示最理想输入。输出需要被程序消费时，优先使用 JSON Schema 或结构化输出能力。

## 版本与评测

Prompt 应像代码一样有版本、变更记录和回归集。每次修改同时观察任务正确率、格式通过率、延迟和 token 成本，避免只凭几个手工样例宣布优化成功。

参考资料：[OpenAI Prompt engineering](https://platform.openai.com/docs/guides/prompt-engineering)。
