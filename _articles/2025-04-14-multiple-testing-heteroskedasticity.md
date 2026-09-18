---
title: "A better way to catch real signals when some data is noisier than the rest"
dek: "Standard practice is to standardize noisy data before testing it for meaningful patterns — but that can quietly erase the signal you're looking for. A new method uses the noise itself as information instead of scrubbing it out."
topic: analytics
faculty:
  - trambak-banerjee
byline: "Trambak Banerjee"
date: 2025-04-14
image_tint: limestone
featured: false
source_url: "https://business.ku.edu/research-and-faculty/analytics-information-operations/research-insights"
answer_box: >-
  Large-scale hypothesis testing — checking thousands of individual
  units at once for a meaningful effect — commonly standardizes noisy
  test statistics before testing them, which can distort results when
  variability differs systematically across units. A new testing
  procedure incorporates that variability directly, delivering
  substantially higher detection power while maintaining valid error
  control, including a real-world gain in identifying highly engaged
  users from mobile game data.
---

When researchers test thousands of individual units at once for some meaningful effect — genes, financial instruments, individual users on a platform — the units are rarely equally noisy. Some produce much more variable measurements than others. New research argues the standard fix for this, standardizing everything before testing, can do more harm than good.

## The problem with rescaling away the noise

Trambak Banerjee, assistant professor of business analytics at the University of Kansas, co-authored "Large-Scale Multiple Testing of Composite Null Hypotheses Under Heteroskedasticity" with Bowen Gang, published in Biometrika. When variance differs across units — and especially when that variance is itself related to the effect being tested — standardizing test statistics to put everything on the same scale can unintentionally shrink the ability to detect real signal, or distort how well the false discovery rate is actually controlled.

## Using the noise as information, not scrubbing it away

Rather than rescaling the data down to a single comparable unit, Banerjee's method incorporates variance information directly into the testing process, using a nonparametric empirical Bayes approach to model how the signal and its variability behave together. The theoretical results show the procedure achieves valid, and asymptotically optimal, control over the false discovery rate. In simulations spanning a wide range of heteroskedastic conditions, it delivers substantially more detection power than existing approaches — finding real effects that standardized methods miss.

## A concrete payoff: spotting engaged users in noisy data

The paper doesn't stop at simulation. Applied to mobile game data, the method improved detection of highly engaged users — a population that real-world engagement data is exactly the kind of noisy, unevenly-variable setting the method is built for. That's a useful proof point for the broader claim: large-scale testing problems in economics, finance, biology, and digital platforms all tend to share this same structural noisiness, and treating it as information worth using, rather than an inconvenience to standardize away, produces more reliable inference across all of them.
