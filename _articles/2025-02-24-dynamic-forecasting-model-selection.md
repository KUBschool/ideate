---
title: "Treating sales forecasts like autocomplete: a new way to pick the right
  model at the right time"
dek: No single forecasting model stays the best choice forever as demand
  patterns shift. A new framework borrows a trick from text prediction to
  automatically hand off between models as conditions change.
topic: analytics
faculty:
  - karthik-srinivasan
byline: Karthik Srinivasan
date: 2025-06-01
image: /assets/uploads/data-forcasting.jpeg
image_tint: steam
featured: false
source_url: https://business.ku.edu/research-and-faculty/analytics-information-operations/research-insights
answer_box: A new framework called TimeSpeaks reframes dynamic forecasting-model
  selection as a sequence-prediction problem, similar to text completion,
  learning from historical sequences of which model performed best rather than
  retraining on full feature sets. Tested against public benchmarks and retail
  case studies, it consistently outperformed traditional ensembles, Bayesian
  model averaging, and several state-of-the-art forecasting models, with
  especially strong gains on long-horizon forecasts and varied time series.
journal: Decision Support Systems
journal_url: https://www.sciencedirect.com/science/article/pii/S0167923625000405
---
#### Research objective

This study develops a new approach to dynamic model selection in large-scale enterprise forecasting systems, where different forecasting models may perform better at various times. The objective is to formalize model flipping and introduce a scalable framework that automatically selects and updates forecasting models for each time series as data patterns evolve.

#### What the researchers find

The authors propose a framework, TimeSpeaks, that reframes dynamic model selection as a sequence-prediction problem akin to text completion in natural language processing. Instead of relying on exogenous inputs or full-feature sets used by candidate forecasting models, TimeSpeaks learns from historical sequences of the best-performing models. The framework is implemented using two sequence models, a BiLSTM-based approach and a transformer-based approach called TimeXer.

Across public benchmarks, including the M4 competition and store sales data, as well as two retail case studies, TimeSpeaks consistently outperforms traditional ensembles, Bayesian model averaging, direct-loss estimators, and several state-of-the-art global forecasting models. The results show especially strong gains in long-horizon forecasting and settings with heterogeneous time series.

#### Why it matters

Enterprise forecasting systems must operate at scale while adapting to changing demand patterns, seasonality, and market conditions. This study shows that dynamic model selection can be improved by focusing on the temporal evolution of model performance rather than repeatedly retraining or tuning models using full data streams. TimeSpeaks offers a practical, scalable solution that aligns well with enterprise MLOps workflows and reduces reliance on exogenous information.

For organizations managing thousands of forecasts simultaneously, the approach provides a structured way to improve accuracy, robustness, and long-term planning performance.
