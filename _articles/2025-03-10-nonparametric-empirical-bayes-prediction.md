---
title: "A more reliable way to make predictions when standard statistical assumptions don't hold"
dek: "Most prediction methods for repeated-observation data assume the unexplained differences between subjects follow a tidy bell curve. A new framework drops that assumption — and predicts more accurately when reality doesn't cooperate."
topic: analytics
faculty:
  - trambak-banerjee
byline: "Trambak Banerjee"
date: 2025-03-10
image_tint: steam
featured: false
source_url: "https://business.ku.edu/research-and-faculty/analytics-information-operations/research-insights"
answer_box: >-
  Mixed models — widely used to analyze repeated observations on the
  same firms or individuals over time — typically assume unobserved
  subject-level differences follow a Normal distribution. New research
  introduces an empirical Bayes prediction framework that drops that
  assumption entirely, delivering meaningfully more accurate predictions
  when the true distribution of those differences is skewed, irregular,
  or has multiple peaks rather than the standard bell-curve shape.
---

A lot of applied research — in economics, finance, health, and management alike — leans on mixed models to make predictions from data collected repeatedly on the same firms or people over time. Those models carry a quiet assumption that rarely gets questioned: that whatever makes each subject different from the average follows a clean, symmetric bell curve.

New research asks what happens when that assumption is simply wrong, and builds a prediction method that doesn't need it in the first place.

## Why the standard assumption quietly fails

Trambak Banerjee, assistant professor of business analytics at the University of Kansas, co-authored "Nonparametric Empirical Bayes Prediction in Mixed Models" with Poulami Sharma, published in Statistics and Computing. Standard prediction methods in this setting are only mathematically optimal when unobserved subject-level effects genuinely follow a Normal distribution — a fixed, symmetric shape. When that shape doesn't hold, those same predictors can quietly underperform, with no built-in warning to the analyst using them.

## A framework that doesn't assume the shape in advance

Banerjee's empirical Bayes framework estimates subject-specific effects without committing to any particular distributional shape ahead of time, generalizing the standard predictor rather than replacing it outright. Simulation results show the approach consistently outperforms existing methods once the true distribution departs from Normal — and the gains are largest precisely in the cases that cause the most trouble for standard tools: skewed distributions, or ones with more than one peak. The method also extends cleanly to more complex settings, including dynamic panels and models with multiple layers of unobserved effects.

## Why it matters for anyone using these models to decide something

The practical risk with the standard approach isn't that it fails loudly — it's that it can fail quietly, producing predictions that look reasonable while being measurably worse than they should be, with no obvious signal that anything's wrong. For anyone using mixed-model predictions to actually inform a decision — forecasting firm performance, financial outcomes, or other subject-level trajectories — a method that doesn't depend on an assumption you can't verify in advance is a meaningfully safer default, not just a technical refinement.
