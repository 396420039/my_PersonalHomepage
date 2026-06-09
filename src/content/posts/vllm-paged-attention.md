---
title: "vLLM 与 PagedAttention：把 KV Cache 当作分页内存管理"
date: "2026-06-07"
summary: "vLLM 通过分页管理 KV Cache，减少碎片与预留浪费，让更多请求共享有限显存。"
tags: ["vLLM", "推理部署"]
featured: true
---

大模型自回归生成会为每个请求保存 KV Cache。请求长度不同、持续时间不同，传统连续内存分配容易产生碎片，并为最大长度预留大量暂时用不到的显存。

PagedAttention 把 KV Cache 划分成固定大小的块，通过映射表组织逻辑序列与物理块，思路类似操作系统虚拟内存。请求按需获得块，结束后释放，因此显存利用率更高，也更容易支持连续批处理。

## 吞吐来自调度

在线请求随时到达，vLLM 可以在生成步之间把新请求加入批次，而不是等待整个静态批次结束。吞吐提升来自更高的批处理利用率，但高负载下仍要关注排队延迟。

部署时应一起测最大并发、输入输出长度分布、首 token 延迟和每 token 延迟。只看离线 tokens/s，无法代表真实交互体验。

原始资料：[vLLM PagedAttention 设计文档](https://docs.vllm.ai/en/latest/design/paged_attention.html)。
