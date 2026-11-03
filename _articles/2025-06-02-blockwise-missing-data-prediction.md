---
title: Making good predictions when huge chunks of your data are simply missing
dek: Survey data and merged databases don't fail gracefully — they go missing in
  whole blocks at a time, not scattered individual gaps. A new modeling approach
  makes reliable predictions anyway, without deleting data or guessing at what's
  missing.
topic: analytics
faculty:
  - karthik-srinivasan
byline: Karthik Srinivasan
date: 2024-11-26
image: /assets/uploads/missing-data.jpeg
image_tint: limestone
featured: false
source_url: https://business.ku.edu/research-and-faculty/analytics-information-operations/research-insights
answer_box: A blockwise reduced modeling approach for datasets with large,
  structured gaps in the data — common in survey research and multi-source
  databases — trains multiple models on overlapping subsets of available
  information and matches each new observation to the most appropriate model,
  avoiding both large-scale data deletion and imputation. The approach
  outperformed common alternatives across simulated and real datasets, with
  stable predictions even when missing data was substantial, and scaled
  efficiently as data size grew.
journal: INFORMS Journal on Data Science
journal_url: https://pubsonline.informs.org/doi/10.1287/ijds.2022.9016
---
#### Research objective

This study examines how predictive models can be built when datasets contain large, structured gaps rather than a few scattered missing values. The authors focus on situations in which missing data occur in blocks, such as when information comes from multiple sources or from surveys with optional sections. They aim to develop an approach that avoids discarding large amounts of data or imputing missing values with estimates.

More broadly, the study seeks to understand how models can make reliable predictions using only the information that is actually observed.

#### What the researchers find

The researchers find that their proposed blockwise reduced modeling approach delivers stronger predictive performance than common alternatives. By training multiple models on overlapping subsets of available data and matching new observations to the most appropriate model, the approach limits information loss. The method performs well across both simulated and real datasets with blockwise missing patterns.

Results show improvements for both simpler and more complex prediction models, and the approach scales efficiently as data size grows. Overall, predictions remain stable even when the missing data are substantial.

#### Why it matters

Many real-world datasets contain large, systematic gaps that make standard analysis difficult or unreliable. This study offers practical insight into how organizations can still extract useful predictions without relying heavily on data deletion or imputation.

The findings are relevant for analysts and decision-makers working with survey data, integrated databases, or health and social data sources. By preserving more of the original information, the approach supports better decision-making in settings where complete data are rarely available.
