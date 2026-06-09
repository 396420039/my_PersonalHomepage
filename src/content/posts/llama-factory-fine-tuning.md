---
title: "LLaMA-Factory 微调工作流：统一配置不代表可以跳过实验设计"
date: "2026-06-06"
summary: "LLaMA-Factory 集成多种模型与训练方法，适合快速实验，但数据模板、超参数和评测仍需显式管理。"
tags: ["LLaMA-Factory", "模型微调"]
featured: false
---

LLaMA-Factory 提供统一 CLI 和 WebUI，支持监督微调、LoRA/QLoRA、偏好优化及多种模型，能减少不同训练框架之间的样板代码。

## 配置里最容易忽略的内容

数据集字段必须正确映射到指令、输入和输出，聊天模型要使用匹配的 template。截断长度会影响长样本，packing 能提高短样本训练效率，但也要确认标签掩码是否符合预期。

学习率、有效 batch size、LoRA rank、训练轮数和 warmup 都应记录。有效 batch size 由单卡 batch、梯度累积和 GPU 数共同决定，迁移机器时不能只复制单个参数。

## 可复现实验

保存基础模型 commit、数据版本、配置文件、随机种子和评测结果。训练结束后先运行离线任务集，再进行服务化性能测试，避免“loss 下降”被误当成业务效果提升。

原始资料：[LLaMA-Factory 官方仓库](https://github.com/hiyouga/LLaMA-Factory)。
