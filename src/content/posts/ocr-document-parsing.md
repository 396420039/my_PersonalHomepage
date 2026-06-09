---
title: "OCR 文档解析：识别文字只是知识入库的第一步"
date: "2026-06-07"
summary: "企业 PDF 还要处理版面、表格、阅读顺序、页眉页脚与坐标，才能生成可靠的 RAG 文本块。"
tags: ["OCR", "文档解析"]
featured: false
---

扫描 PDF 没有可直接提取的文本，需要 OCR；即使是数字 PDF，也可能存在多栏、表格和复杂阅读顺序。只把所有识别文字按坐标拼接，往往会把标题、正文和表格内容混在一起。

## 解析流水线

首先判断页面是否需要 OCR，再做方向校正、版面检测和文字识别。随后根据标题、段落、表格、图片和页眉页脚等区域恢复阅读顺序，并为每个元素保留页码与坐标。

表格应尽量输出结构化单元格，而不是一串无序文本。页眉页脚和水印需要按跨页重复特征清理。低置信度识别结果应标记出来，避免模型把错误数字当成事实。

## 面向 RAG 的输出

最终块应携带文档名、章节、页码、元素类型和原文坐标。答案引用到某段内容时，系统才能定位回原页面。

参考资料：[PaddleOCR 文档](https://www.paddleocr.ai/main/en/index.html) 与 [PP-StructureV3](https://www.paddleocr.ai/main/en/version3.x/algorithm/PP-StructureV3/PP-StructureV3.html)。
