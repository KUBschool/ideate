---
title: A better way to catch real signals when some data is noisier than the rest
dek: Standard practice is to standardize noisy data before testing it for
  meaningful patterns — but that can quietly erase the signal you're looking
  for. A new method uses the noise itself as information instead of scrubbing it
  out.
topic: analytics
faculty:
  - trambak-banerjee
byline: Trambak Banerjee
date: 2025-01-29
image: /assets/uploads/mobile-gaming-data.jpeg
image_tint: limestone
featured: false
source_url: https://business.ku.edu/research-and-faculty/analytics-information-operations/research-insights
answer_box: Large-scale hypothesis testing — checking thousands of individual
  units at once for a meaningful effect — commonly standardizes noisy test
  statistics before testing them, which can distort results when variability
  differs systematically across units. A new testing procedure incorporates that
  variability directly, delivering substantially higher detection power while
  maintaining valid error control, including a real-world gain in identifying
  highly engaged users from mobile game data.
journal: Biometrika
journal_url: https://academic.oup.com/biomet/article-abstract/112/2/asaf007/7989294
---
#### Research objective

This study examines how to conduct large-scale multiple-hypothesis testing when test statistics exhibit different levels of variability. In many applications, the variance of a test statistic differs across units and may also be related to the underlying parameter being tested. Common practices such as standardizing test statistics can unintentionally reduce power or distort error control in these settings.

The authors aim to design a testing procedure that explicitly accounts for heteroskedasticity without collapsing the data through rescaling. The objective is to maintain valid false discovery rate control while improving detection power.

#### What the researchers find

The authors develop a new multiple testing procedure that directly incorporates variance information into the testing process. Rather than standardizing test statistics, the method uses a nonparametric empirical Bayes deconvolution approach to model the joint behavior of the signal and its variance.

Theoretical results show that the proposed procedure achieves valid and asymptotically optimal false discovery rate control. Simulation evidence demonstrates that the method delivers substantially higher power than existing approaches across a wide range of heteroskedastic settings. An application to mobile game data shows that the approach improves the detection of highly engaged users.

#### Why it matters

Large-scale testing problems arise in economics, finance, biology, and digital platforms, where variability often differs systematically across observations. Methods that ignore heteroskedasticity or handle it through simple standardization can miss meaningful signals or produce misleading inferences. This study offers a practical framework that uses available variance information to improve discovery while preserving statistical validity.

The results guide researchers and practitioners who need reliable multiple-testing tools in complex, data-rich environments. By improving power without sacrificing error control, the approach enhances decision-making based on large-scale statistical evidence.
