---
title: A free tool for a statistical method most software doesn't handle well
dek: Quantile regression is one of the better ways to model how effects differ
  across a population, not just on average — but the software support for doing
  it at scale has lagged. KU researchers built and published a fix.
topic: analytics
faculty:
  - ben-sherwood
  - shaobo-li
byline: Ben Sherwood & Shaobo Li
date: 2025-09-08
image: /assets/uploads/rqpen-filder.jpg
image_tint: limestone
featured: false
source_url: https://business.ku.edu/research-and-faculty/analytics-information-operations/research-insights
answer_box: Quantile regression models how a predictor affects different parts
  of an outcome's distribution — not just its average — which makes it well
  suited to studying heterogeneous effects, but standard high-dimensional
  penalization tools were built for mean regression and don't transfer over
  cleanly. rqPen, an open-source R package, adds lasso, elastic net, adaptive
  lasso, SCAD, and MCP penalties (plus group penalties across quantiles) to
  quantile regression, along with faster Huber-type approximations for large
  datasets.
series:
  - methodology
journal: The R Journal
journal_url: https://journal.r-project.org/articles/RJ-2025-017/
---
#### Research objective

Quantile regression directly models a conditional quantile of interest. The R package rqPen provides penalized quantile regression estimation using the lasso, elastic net, adaptive lasso, SCAD, and MCP penalties.

It also provides extensions to group penalties, both for groups of predictors and grouping variable selection across quantiles. The paper presents the different approaches to penalized quantile regression and how to use the provided methods in rqPen.

#### What the researchers find

The authors demonstrate how to use rqPen, a package that supports lasso, elastic net, adaptive lasso, SCAD, MCP, and several group-based penalties, including penalties that enforce consistent variable selection across quantiles.

The package implements both linear programming methods and Huber-type approximations of the quantile loss to address the non-differentiability of the check function and the computational challenges posed by large data sets. The package, rqPen allows users to estimate multiple quantiles in a single call, select tuning parameters using cross-validation or information criteria, and visualize how coefficient estimates change across quantiles and penalty levels.

#### Why it matters

Quantile regression is a popular approach for robust estimation and modeling heterogenous effects. Both issues are important in high-dimensional analysis. A common approach for high-dimensional analysis is to use penalized methods. The package rqPen provides users with the ability to estimate quantile regression models using a variety of penalties that are available for mean regression methods.

In addition, it incorporates penalties that are specific to quantile regression, specifically a group penalty across quantiles. Finally, the package provides users with Huber-type approximations to the quantile loss which decreases the computational cost compared to using the non-differentiable quantile loss.
