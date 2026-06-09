---
title: "LoRA 微调：冻结大模型，只训练低秩增量"
date: "2026-06-07"
summary: "LoRA 用少量可训练参数适配下游任务，降低显存和存储成本，但数据与评测仍决定上限。"
tags: ["LoRA", "模型微调"]
featured: true
---

LoRA 假设模型适配所需的权重变化可以用低秩矩阵表示。训练时冻结基础模型，在部分线性层旁加入两个小矩阵，只更新这些增量参数，因此显著减少可训练参数和优化器状态。

## 关键选择

`rank` 决定适配容量，`alpha` 调整增量缩放，target modules 决定 LoRA 插入哪些层。参数越大不一定越好，应结合任务复杂度和验证集选择。训练数据要覆盖真实指令、边界条件和拒答场景，避免模型只记住固定答案。

多个 LoRA Adapter 可以共享同一基础模型，但上线时要明确基础模型版本、Tokenizer、chat template 和 Adapter 版本。合并权重能简化部署，动态加载则更灵活。

## 先证明需要微调

如果问题来自知识更新，RAG 往往更合适；如果目标是稳定改变格式、风格或领域行为，LoRA 才更有价值。

原始资料：[LoRA 论文](https://arxiv.org/abs/2106.09685) 与 [PEFT LoRA](https://huggingface.co/docs/peft/main/en/developer_guides/lora)。
