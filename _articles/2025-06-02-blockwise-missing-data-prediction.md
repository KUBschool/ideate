---
title: "Making good predictions when huge chunks of your data are simply missing"
dek: "Survey data and merged databases don't fail gracefully — they go missing in whole blocks at a time, not scattered individual gaps. A new modeling approach makes reliable predictions anyway, without deleting data or guessing at what's missing."
topic: analytics
faculty:
  - karthik-srinivasan
byline: "Karthik Srinivasan"
date: 2025-06-02
image_tint: limestone
featured: false
source_url: "https://business.ku.edu/research-and-faculty/analytics-information-operations/research-insights"
answer_box: >-
  A blockwise reduced modeling approach for datasets with large,
  structured gaps in the data — common in survey research and
  multi-source databases — trains multiple models on overlapping
  subsets of available information and matches each new observation to
  the most appropriate model, avoiding both large-scale data deletion
  and imputation. The approach outperformed common alternatives across
  simulated and real datasets, with stable predictions even when
  missing data was substantial, and scaled efficiently as data size grew.
---

Most missing-data techniques assume the gaps are scattered — a few random blanks sprinkled across an otherwise complete dataset. Real-world data often doesn't miss that way. Surveys with optional sections, or databases merged from multiple sources, tend to go missing in whole structured blocks at once. New research builds a method specifically for that messier, more common reality.

## The usual fixes don't fit blockwise gaps well

Karthik Srinivasan, associate professor of business analytics at the University of Kansas, co-authored "A Reduced Modeling Approach for Making Predictions with Incomplete Data Having Blockwise Missing Patterns" with F. Currim and S. Ram, published in INFORMS Journal on Data Science. The standard responses to missing data — dropping incomplete records or imputing estimated values in their place — both come with real costs when the gaps are large and structured: dropping records can waste enormous amounts of otherwise-usable data, and imputation means predictions partly rest on values nobody actually observed.

## Matching each observation to the model that fits what it actually has

The team's blockwise reduced modeling approach sidesteps both tradeoffs by training multiple models on overlapping subsets of the available data, then matching each new observation to whichever trained model best fits the specific fields that observation actually has present. Rather than forcing every prediction through one model built for complete data, the method routes each case to a model built around the information that's genuinely there.

## Reliable even when the gaps are large

Testing across both simulated and real datasets with blockwise missing patterns, the approach delivered stronger predictive performance than common alternatives, with the improvement holding for both simpler and more complex underlying prediction models. Performance stayed stable even when the share of missing data was substantial, and the method scaled efficiently as dataset size grew — a meaningful practical detail, since many of the settings where blockwise missingness shows up (integrated databases, large health and social-data sources) are exactly the settings where scalability matters most. For analysts working with data that never was going to be complete, the finding is a genuine alternative to the usual choice between throwing data away and guessing at what isn't there.
