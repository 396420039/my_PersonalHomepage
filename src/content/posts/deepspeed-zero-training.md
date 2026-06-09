---
title: "DeepSpeed ZeRO：把训练状态拆到多张 GPU"
date: "2026-06-07"
summary: "ZeRO 分阶段切分优化器状态、梯度和参数，降低单卡显存压力，并可进一步卸载到 CPU 或 NVMe。"
tags: ["DeepSpeed", "分布式训练"]
featured: false
---

数据并行会在每张 GPU 保存完整模型、梯度和优化器状态，模型变大后内存冗余成为主要瓶颈。DeepSpeed ZeRO 通过在数据并行进程之间切分这些状态减少重复。

## 三个阶段

ZeRO-1 切分优化器状态，ZeRO-2 继续切分梯度，ZeRO-3 连模型参数也切分，只在计算需要时收集。阶段越高，显存节省越明显，同时通信和配置复杂度也会上升。

Offload 可以把部分状态放到 CPU 或 NVMe，进一步突破显存限制，但速度会受 PCIe、内存与磁盘带宽影响。参数 bucket、通信重叠和梯度累积需要结合硬件拓扑压测。

## 先估算再训练

在提交长任务前估算参数、梯度、优化器状态和激活值占用，并用短序列小步数验证配置。训练吞吐、收敛质量和故障恢复都应纳入验收。

原始资料：[DeepSpeed ZeRO 文档](https://deepspeed.readthedocs.io/en/latest/zero3.html)。
