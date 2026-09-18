---
title: "Treating sales forecasts like autocomplete: a new way to pick the right model at the right time"
dek: "No single forecasting model stays the best choice forever as demand patterns shift. A new framework borrows a trick from text prediction to automatically hand off between models as conditions change."
topic: analytics
faculty:
  - karthik-srinivasan
byline: "Karthik Srinivasan"
date: 2025-02-24
image_tint: steam
featured: false
source_url: "https://business.ku.edu/research-and-faculty/analytics-information-operations/research-insights"
answer_box: >-
  A new framework called TimeSpeaks reframes dynamic forecasting-model
  selection as a sequence-prediction problem, similar to text
  completion, learning from historical sequences of which model
  performed best rather than retraining on full feature sets. Tested
  against public benchmarks and retail case studies, it consistently
  outperformed traditional ensembles, Bayesian model averaging, and
  several state-of-the-art forecasting models, with especially strong
  gains on long-horizon forecasts and varied time series.
---

Enterprise forecasting systems have a problem that never fully goes away: the model that predicted demand well last quarter isn't guaranteed to be the right model this quarter, as seasonality, market conditions, and demand patterns keep shifting underneath it. New research borrows an idea from a very different field to solve it.

## Forecasting as a sequence-prediction problem

Karthik Srinivasan, associate professor of business analytics at the University of Kansas, co-authored "Dynamic Model Selection in Enterprise Forecasting Systems Using Sequence Modeling" with J. Jiang and K. K. Bandeli, published in Decision Support Systems. Rather than repeatedly retraining or re-tuning forecasting models against full feature sets — the conventional approach — the team's framework, called TimeSpeaks, treats the problem the way a language model treats text completion: learning from the historical sequence of which model performed best at each point in time, and predicting which one is likely to perform best next.

## Built on two different sequence architectures

TimeSpeaks is implemented using two distinct sequence-modeling approaches — a BiLSTM-based model and a transformer-based model called TimeXer — giving the team a way to compare architectures rather than betting the whole framework on one. Tested across public forecasting benchmarks, including the M4 competition and store sales datasets, plus two real retail case studies, TimeSpeaks consistently outperformed traditional ensemble methods, Bayesian model averaging, direct-loss estimators, and several state-of-the-art global forecasting models. The advantage was most pronounced in exactly the conditions that tend to break simpler approaches: long-horizon forecasts and datasets with highly varied, heterogeneous time series.

## Built for how forecasting actually runs at scale

The practical appeal for enterprise use is less about squeezing out marginal accuracy gains and more about fit with how large-scale forecasting operations actually function. A company running thousands of simultaneous forecasts doesn't have the luxury of manually retuning models as conditions drift — it needs a system that adapts on its own. By focusing on the temporal pattern of which model wins, rather than repeatedly reprocessing full data streams, TimeSpeaks offers a structured, scalable way to keep forecasts accurate without constant manual intervention — a workflow that aligns naturally with how enterprise MLOps pipelines already operate.
