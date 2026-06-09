---
title: "模型量化与 QLoRA：省显存不等于零损失"
date: "2026-06-07"
summary: "8-bit 与 4-bit 量化能降低模型内存，QLoRA 进一步在量化基座上训练 Adapter。"
tags: ["模型量化", "QLoRA"]
featured: false
---

量化用更低位宽表示模型权重，减少显存占用和内存带宽压力。8-bit 通常更稳妥，4-bit 节省更多，但不同模型、层和硬件上的精度与速度收益并不相同。

QLoRA 将基础模型以 4-bit 形式加载并冻结，再训练 LoRA Adapter。论文使用 NF4、双重量化和分页优化器，使大模型微调所需显存显著下降。

## 工程检查

量化格式必须被目标推理框架和硬件支持。有些方案只减少存储，却因反量化开销没有提升吞吐。需要分别测首 token 延迟、每 token 延迟、吞吐、显存和任务质量。

校准数据要接近真实请求分布，尤其关注数字推理、代码、长上下文和少数类别。量化前后的评测必须使用同一模型模板与解码参数。

原始资料：[QLoRA 论文](https://arxiv.org/abs/2305.14314) 与 [Transformers bitsandbytes](https://huggingface.co/docs/transformers/quantization/bitsandbytes)。
