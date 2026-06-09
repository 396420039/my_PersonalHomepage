---
title: "Parent-Child Chunk：用小块召回，用大块回答"
date: "2026-06-08"
summary: "小文本块更容易精确匹配，大父块保留完整语境；两级结构可以兼顾召回与生成。"
tags: ["RAG", "文档切分"]
featured: false
---

文本块太大时，一个向量混入多个主题，检索不够精确；文本块太小时，命中内容又可能缺少定义、条件和结论。Parent-Child Chunk 用两种粒度解决这个矛盾。

## 两级索引方式

先把文档切成较大的父块，再从每个父块生成多个小子块。索引中存子块向量，子块命中后根据 parent id 取回父块，最终把较完整的上下文交给模型。

父子关系必须稳定。文档更新后要避免旧子块指向失效父块，并保留文档版本、章节路径和权限。多个子块命中同一父块时应合并去重，避免上下文重复占用 token。

## 何时有效

它适合规章、手册和长段落知识，不一定适合每条记录本身已很短的 FAQ。父块大小、子块大小和召回数量都应通过检索评测确定。

参考资料：[LangChain ParentDocumentRetriever API](https://python.langchain.com/api_reference/langchain/retrievers/langchain.retrievers.parent_document_retriever.ParentDocumentRetriever.html)。
