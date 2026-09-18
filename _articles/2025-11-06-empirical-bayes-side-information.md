---
title: "Getting more accurate estimates by finally using the data sitting right next to it"
dek: "Genomics, neuroimaging, and large-scale experiments all generate rich auxiliary data alongside the main measurement researchers care about — and most statistical methods just ignore it. A new approach puts that side information to work."
topic: analytics
faculty:
  - trambak-banerjee
byline: "Trambak Banerjee"
date: 2025-11-06
image_tint: steam
featured: false
source_url: "https://business.ku.edu/research-and-faculty/analytics-information-operations/research-insights"
answer_box: >-
  Standard empirical Bayes estimation methods typically use only the
  primary outcome measurements for each unit, ignoring rich auxiliary
  "side information" that's often collected alongside it. A new
  nonparametric approach integrates that side information directly into
  estimation without requiring assumptions about its underlying
  distribution, converging toward theoretically optimal accuracy while
  outperforming existing methods on both simulated and real data.
---

Modern research in genomics, neuroimaging, finance, and large-scale experimentation routinely generates two kinds of data at once: the primary outcome a study cares about, and a pile of auxiliary "side information" collected alongside it. New research argues that second pile is usually left on the table — and that using it properly produces measurably better estimates.

## Structural information, mostly ignored

Trambak Banerjee, assistant professor of business analytics at the University of Kansas, co-authored "Empirical Bayes Estimation with Side Information: A Nonparametric Integrative Tweedie Approach" with Jiajun Luo, Gourab Mukherjee, and Wenguang Sun, forthcoming in Statistica Sinica. Standard empirical Bayes methods for estimating many related quantities at once — a common problem when the number of parameters is large — typically rely only on the primary outcomes, even when rich multivariate side information about each unit is readily available.

## A method that doesn't need to know the data's shape in advance

The team's approach, called nonparametric integrative Tweedie (NIT), extends classical Tweedie-based estimation to incorporate that side information directly, estimating the gradient of the log marginal density through convex optimization rather than assuming a particular parametric form for the underlying distributions. Theoretical results characterize how the estimator's risk shrinks as sample size grows, showing it converges toward the theoretically optimal "oracle" estimator at an explicit, quantifiable rate.

## A real tradeoff worth knowing about

The analysis surfaces a genuine tradeoff practitioners should understand rather than a free lunch: richer, higher-dimensional side information reduces estimation risk, but it also slows how quickly the method converges toward its best possible performance. Even accounting for that tradeoff, simulation studies and real-data applications show NIT consistently outperforming existing empirical Bayes and integrative methods on estimation accuracy. For fields generating outcome data alongside genuine auxiliary structure — which increasingly describes most large-scale modern research — the finding is a fairly direct argument against continuing to throw that side information away.
