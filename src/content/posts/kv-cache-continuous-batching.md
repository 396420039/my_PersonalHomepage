---
title: "KV Cache 与连续批处理：大模型在线吞吐的两个关键点"
date: "2026-03-17"
summary: "缓存历史注意力计算减少重复工作，连续批处理则让不同长度请求动态共享 GPU。"
tags: ["KV Cache", "推理优化"]
featured: false
---

自回归模型每生成一个 token，都需要关注此前 token。KV Cache 保存各层历史 token 的 Key 和 Value，后续步骤只计算新 token 的表示，避免重复处理整个前缀。

## 缓存的代价

KV Cache 大小随并发数、序列长度、层数和隐藏维度增长，长上下文服务很容易受显存限制。量化 KV Cache、分页分配和前缀缓存都能降低成本，但需要检查模型支持与质量影响。

传统静态批处理要等待同批次最长请求结束，短请求完成后计算槽位会闲置。连续批处理在每个解码步移除已完成请求并加入新请求，更适合长度差异明显的在线流量。

## 评测方式

同时观察 TTFT、TPOT、端到端 P95、tokens/s 和显存占用。增大并发通常能提高总吞吐，却可能增加排队时间，因此要根据交互式或离线任务设定不同目标。

参考资料：[vLLM Optimization and Tuning](https://docs.vllm.ai/en/latest/configuration/optimization.html)。
