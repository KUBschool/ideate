---
title: A more reliable way to make predictions when standard statistical
  assumptions don't hold
dek: Most prediction methods for repeated-observation data assume the
  unexplained differences between subjects follow a tidy bell curve. A new
  framework drops that assumption — and predicts more accurately when reality
  doesn't cooperate.
topic: analytics
faculty:
  - trambak-banerjee
byline: Trambak Banerjee
date: 2024-12-03
image: /assets/uploads/bell-curve.jpeg
image_tint: steam
featured: false
source_url: https://business.ku.edu/research-and-faculty/analytics-information-operations/research-insights
answer_box: Mixed models — widely used to analyze repeated observations on the
  same firms or individuals over time — typically assume unobserved
  subject-level differences follow a Normal distribution. New research
  introduces an empirical Bayes prediction framework that drops that assumption
  entirely, delivering meaningfully more accurate predictions when the true
  distribution of those differences is skewed, irregular, or has multiple peaks
  rather than the standard bell-curve shape.
series:
  - methodology
journal: Statistics and Computing
journal_url: https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4458738
---
#### Research objective

This study examines how predictions can be improved in mixed models when the usual assumptions about random effects are unrealistic. Mixed models are commonly used to analyze repeated observations on the same subjects, such as firms or individuals, over time.

Standard prediction methods assume that unobserved subject-level effects follow a Normal distribution with a fixed structure. The authors aim to develop a prediction approach that does not rely on this restrictive assumption. The goal is to produce more accurate predictions when the true distribution of random effects is unknown or irregular.

#### What the researchers find

The authors introduce a new empirical Bayes prediction framework that estimates subject-specific effects without assuming a specific distribution for them. This approach generalizes the commonly used predictor that is optimal only under Normality. Simulation results show that the proposed method consistently delivers more accurate predictions than existing approaches when the random effects distribution departs from Normality.

The performance gains are especially pronounced in settings with skewed or multimodal unobserved heterogeneity. The method is also shown to extend naturally to more complex models, including dynamic panels and models with multiple sources of unobserved effects.

#### Why it matters

Many applied researchers rely on mixed models for prediction in fields such as economics, finance, health, and management. When standard distributional assumptions are violated, commonly used predictors can perform poorly without users realizing it. This study provides a practical alternative that improves predictive accuracy while remaining broadly applicable.

By reducing reliance on strong modeling assumptions, the approach helps analysts generate more reliable subject-level predictions. This insight is particularly valuable in settings where predictions inform decision-making, such as forecasting firm performance or financial outcomes.
