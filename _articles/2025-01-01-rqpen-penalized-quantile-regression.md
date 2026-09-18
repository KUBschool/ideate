---
title: "A free tool for a statistical method most software doesn't handle well"
dek: "Quantile regression is one of the better ways to model how effects differ across a population, not just on average — but the software support for doing it at scale has lagged. KU researchers built and published a fix."
topic: analytics
series:
  - methodology
faculty:
  - ben-sherwood
  - shaobo-li
byline: "Ben Sherwood & Shaobo Li"
date: 2025-01-01
image_tint: limestone
featured: false
source_url: "https://business.ku.edu/research-and-faculty/analytics-information-operations/research-insights"
answer_box: >-
  Quantile regression models how a predictor affects different parts of
  an outcome's distribution — not just its average — which makes it
  well suited to studying heterogeneous effects, but standard
  high-dimensional penalization tools were built for mean regression
  and don't transfer over cleanly. rqPen, an open-source R package, adds
  lasso, elastic net, adaptive lasso, SCAD, and MCP penalties (plus
  group penalties across quantiles) to quantile regression, along with
  faster Huber-type approximations for large datasets.
---

Most regression tells you how a predictor affects the *average* outcome. Quantile regression asks a more specific question: how does it affect outcomes at the 10th percentile versus the 90th — the tails, not just the middle? That's often exactly what a researcher studying heterogeneous effects actually wants to know. The tooling to do it well at scale, though, has lagged behind what's available for ordinary mean regression.

Ben Sherwood and Shaobo Li, both of the University of Kansas School of Business, co-authored "rqPen: An R Package for Penalized Quantile Regression" with Adam Maidman, published in The R Journal.

## Borrowing high-dimensional tools that weren't built for this

In high-dimensional settings — lots of predictors, not a lot of data relative to them — the standard fix is penalized regression: lasso, elastic net, and similar methods that shrink or eliminate less useful predictors automatically. Those tools are mature and widely available for mean regression. Porting them to quantile regression is nontrivial, partly because the quantile loss function isn't smooth in the way these optimization methods usually expect.

## What rqPen actually adds

rqPen brings the familiar penalty toolkit — lasso, elastic net, adaptive lasso, SCAD, and MCP — to quantile regression, and extends it with penalties designed specifically for the quantile setting: group penalties that can enforce consistent variable selection *across* multiple quantiles at once, rather than treating each quantile as an unrelated model. To handle the computational cost of the non-differentiable quantile loss, the package implements both linear-programming methods and Huber-type approximations, letting users estimate multiple quantiles in a single call, select tuning parameters via cross-validation or information criteria, and visualize how coefficient estimates shift across quantiles and penalty strength.

## Why the group-across-quantiles feature matters most

The most distinctive piece isn't any single penalty type — those largely mirror what's already available for mean regression — it's the ability to enforce a consistent variable-selection pattern across multiple quantiles simultaneously. Without that, a researcher modeling several quantiles at once has to treat each one as its own separate selection problem, which can produce a confusing, inconsistent picture of which variables actually matter. rqPen's group-across-quantiles penalty keeps that picture coherent by design.

## A tool built for a genuinely useful, underserved method

Quantile regression is valuable precisely because effects often aren't uniform — a policy or treatment can matter enormously at one part of a distribution and barely at all elsewhere, a pattern mean regression is structurally blind to. By giving researchers modern, high-dimensional-ready tools for a method that's remained comparatively underserved, rqPen lowers the practical barrier to asking that more precise question in the first place.
