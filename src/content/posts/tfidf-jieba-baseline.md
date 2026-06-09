---
title: "TF-IDF + Jieba：中文文本分类最值得保留的可解释基线"
date: "2026-06-06"
summary: "分词、行业词典、n-gram 与线性模型能快速建立可解释基线，也能发现数据泄漏。"
tags: ["TF-IDF", "Jieba"]
featured: false
---

TF-IDF 提高在少量文档中出现、但对当前文本有区分度的词项权重，再配合逻辑回归或线性 SVM 完成分类。它不理解深层语义，却速度快、结果可解释，非常适合作为首个实验。

## 中文场景先处理词

Jieba 分词可以加入行业词典，避免套餐名、地区名和业务术语被错误切开。词级 n-gram 适合固定短语，字符级 n-gram 则对拼写变体更稳健。停用词不能一删了之，“不”“未”等否定词对投诉判断很重要。

查看每个类别权重最高的特征，可以发现模型是否偷看了工单模板、处理人或结果字段。若训练集和测试集来自同一用户或相邻时间，还要警惕重复文本导致虚高分数。

基线的价值不仅是分数，也是为复杂模型提供成本和可解释性参照。

参考资料：[scikit-learn TfidfVectorizer](https://scikit-learn.org/stable/modules/generated/sklearn.feature_extraction.text.TfidfVectorizer.html) 与 [Jieba](https://github.com/fxsjy/jieba)。
