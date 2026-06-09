---
title: "Qwen3 + vLLM 部署：从模型卡到可压测的 OpenAI 兼容服务"
date: "2026-01-12"
summary: "部署前要核对模型模式、聊天模板、精度、并行策略与上下文长度，再用真实流量分布压测。"
tags: ["Qwen3", "vLLM"]
featured: true
---

vLLM 可以把 Qwen3 暴露为 OpenAI 兼容 API，便于现有应用复用客户端。但“服务启动成功”只说明权重可加载，不代表输出格式、性能和资源配置已经正确。

## 启动前的核对

确认模型仓库与 revision，使用匹配的 Tokenizer 和 chat template。根据硬件选择 dtype、tensor parallel size、最大上下文和显存利用率。上下文上限设置过大可能显著压缩并发容量。

Qwen3 模型可能支持 thinking 与 non-thinking 等使用方式，客户端需要按照模型卡和模板控制，而不是依赖未经验证的字符串拼接。LoRA Adapter、量化权重和基础模型也要记录兼容版本。

## 用真实请求压测

按线上输入长度、输出长度和并发分布测试 TTFT、TPOT、P95 延迟、吞吐与错误率。再逐步调整批处理 token 上限、并发序列数和并行配置，避免只用短 Prompt 得出“三倍吞吐”的结论。

原始资料：[Qwen3-32B 模型卡](https://huggingface.co/Qwen/Qwen3-32B) 与 [vLLM OpenAI-Compatible Server](https://docs.vllm.ai/en/latest/serving/openai_compatible_server.html)。
