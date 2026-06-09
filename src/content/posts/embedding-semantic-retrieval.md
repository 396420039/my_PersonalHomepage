---
title: "Embedding 语义检索：向量相近不等于业务相关"
date: "2026-05-01"
summary: "选择嵌入模型时要同时考虑领域、语言、距离函数、文本长度和真实查询评测。"
tags: ["Embedding", "RAG"]
featured: false
---

Embedding 把文本映射到稠密向量，语义相近的文本在向量空间中通常更接近。它让“宽带突然断网”和“家庭网络无法连接”即使没有相同关键词，也可能互相召回。

## 建索引前先固定约定

查询和文档必须使用同一模型及相同归一化方式。部分模型要求为 query 和 passage 添加不同前缀；忽略模型卡中的约定会明显降低效果。距离函数也要与训练方式匹配，常见选择包括余弦相似度、内积和欧氏距离。

长文档不能直接依赖一次 embedding。需要按语义结构切分，并保留标题、章节和实体等上下文。升级模型后，旧向量通常不可混用，应通过索引版本完成全量重建和灰度切换。

## 评测比榜单重要

公开榜单只能用于初选。最终应在真实业务问题上测 Recall@K、MRR、延迟和存储成本，并单独检查数字、专有名词与否定表达。

参考资料：[Sentence Transformers 语义搜索](https://www.sbert.net/examples/sentence_transformer/applications/semantic-search/README.html)。
