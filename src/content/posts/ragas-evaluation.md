---
title: "RAGAS 自动评测：把检索与生成指标分开解释"
date: "2026-01-04"
summary: "Faithfulness、Answer Relevancy 与 Context 指标观察不同故障，分数必须结合人工抽检和固定数据集。"
tags: ["RAGAS", "评测"]
featured: true
---

RAG 系统可能在多个阶段失败：没有召回正确证据、召回了无关内容、模型忽略证据，或回答本身偏离问题。RAGAS 提供一组指标，用于从不同角度分析这些问题。

## 指标不要混读

Faithfulness 关注回答中的陈述是否能由上下文支持；Answer Relevancy 关注答案是否回应问题；Context Precision 和 Context Recall 则评估检索上下文的准确与完整。单一总分会掩盖真正瓶颈。

LLM-as-a-judge 评测具有模型偏差和随机性。应固定评审模型、Prompt、温度与版本，并保留原始判断理由。关键业务场景还要建立人工标注集，定期检查自动分数与人工判断的一致性。

## 持续评测

数据集应包含普通问题、歧义问题、无答案问题和权限边界。每次修改切分、embedding、重排或 Prompt 后运行同一回归集，才能判断收益来自哪里。

原始资料：[RAGAS Metrics](https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/)。
