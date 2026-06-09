---
title: "LangChain 组件化 RAG：让加载、检索与生成各自可替换"
date: "2026-05-29"
summary: "把 RAG 拆成文档处理、索引、检索和生成组件，才能独立评测并持续替换薄弱环节。"
tags: ["LangChain", "RAG"]
featured: false
---

LangChain 的价值不在于把一次模型调用包得更厚，而在于为模型、文档、向量库、Retriever 和工具提供相对统一的接口。RAG 系统因此可以把不同阶段拆开测试，而不是把所有逻辑塞进一条难以定位问题的链。

## 四个清晰边界

文档加载负责保留来源与权限元数据；切分和索引负责生成可检索单元；Retriever 只返回证据；生成阶段根据证据组织答案并引用来源。每一层都应有独立输入输出，避免更换向量库时连 Prompt 一起重写。

在生产环境里，Retriever 的返回值最好包含文档 id、块 id、分数、原文和元数据。模型输出应与检索结果一起写入 trace，便于判断失败来自“没找到”“排序错误”还是“找到了但没用好”。

## 不要被链隐藏细节

高级封装适合快速验证，但上线前要能看见真实 Prompt、召回候选、重排结果和模型参数。可组合不等于不可观察。

原始资料：[LangChain Retrieval 文档](https://docs.langchain.com/oss/python/langchain/retrieval)。
