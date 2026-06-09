---
title: "Transformers 推理基础：Pipeline 方便，但 Tokenizer 决定真实输入"
date: "2026-05-18"
summary: "快速原型可以从 Pipeline 开始，生产排错则必须理解分词、截断、批处理和模型输入张量。"
tags: ["Transformers", "模型推理"]
featured: false
---

Hugging Face `pipeline` 把预处理、模型前向和后处理封装成统一接口，适合快速验证文本分类、生成和特征提取任务。但线上效果异常时，必须回到 Tokenizer 和模型输入层检查。

## Tokenizer 常见陷阱

截断长度过短会丢失投诉原因或文档结论；批量 padding 过长则浪费显存。分类任务通常需要明确 `max_length`、截断方向和 label 映射，生成任务还要区分输入 token、输出 token 与上下文上限。

模型与 Tokenizer 必须来自兼容版本。新增 special token 后，需要同步调整 embedding；聊天模型还应使用对应 chat template，而不是手写一套看似相同的角色格式。

## 从原型到服务

先用 Pipeline 验证任务可行性，再切到显式 Tokenizer + Model 调用，加入批处理、设备选择、半精度和性能指标。这样既保留开发速度，也不会把关键行为藏在默认值里。

原始资料：[Transformers Pipeline](https://huggingface.co/docs/transformers/main_classes/pipelines) 与 [Tokenizer](https://huggingface.co/docs/transformers/main_classes/tokenizer)。
