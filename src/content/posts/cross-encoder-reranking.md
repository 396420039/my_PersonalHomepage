---
title: "Cross-Encoder 重排：把召回候选重新读一遍"
date: "2026-05-10"
summary: "双塔模型负责快速找候选，Cross-Encoder 联合编码问题与文档，用更高计算成本换取更准排序。"
tags: ["RAG", "Rerank"]
featured: false
---

向量检索通常使用双塔模型：问题和文档分别编码，向量可以提前存储，因此检索速度很快。但独立编码会损失细粒度交互，候选顺序不一定最适合最终回答。

Cross-Encoder 把问题和候选文档拼在一起输入模型，直接预测相关性分数。它能关注实体对应、否定关系和条件限制，通常比单纯向量相似度更准确，但无法对全库逐条计算。

## 两阶段检索

第一阶段用 BM25 和向量检索召回几十到几百个候选，第二阶段用 Cross-Encoder 重排，再将前几条证据交给生成模型。候选数量要根据延迟预算评测，过少会限制召回上限，过多会拖慢在线服务。

重排模型也有领域差异。应在真实 query-document 标注集上测 NDCG、MRR 和最终答案指标，而不是只看通用榜单。

参考资料：[Sentence Transformers Retrieve & Re-Rank](https://www.sbert.net/examples/sentence_transformer/applications/retrieve_rerank/README.html)。
