---
title: Three ways to build parking into a delivery route — and the tradeoff each
  one makes
dek: Most delivery-routing models treat parking as an afterthought, something
  that happens once the vehicle stops. A new reference chapter argues it needs
  to be part of the model from the start — and lays out three ways to do it.
topic: supply-chain
faculty:
  - sara-reed
byline: Sara Reed
date: 2026-01-01
image_tint: steam
featured: false
source_url: https://business.ku.edu/research-and-faculty/analytics-information-operations/research-insights
answer_box: "A reference chapter on incorporating parking into last-mile
  delivery routing models frames the problem as a two-echelon system — vehicle
  routing decisions (including parking) as the first echelon, walking routes
  from a parking spot to customers as the second — and reviews three
  deterministic modeling approaches: cluster-first route-second, a weighted
  activity-based method balancing driving against walking, and a
  parking-time-cost-based method that builds expected parking search time
  directly into routing cost."
series:
  - methodology
journal: Encyclopedia in Operations Management
journal_url: https://www.sciencedirect.com/science/chapter/referencework/abs/pii/B9780443289934000664?via%3Dihub
---
#### Research objective

This chapter examines how parking decisions can be systematically incorporated into last-mile delivery routing models. The goal is to capture the operational trade-offs between vehicle movement and walking-based deliveries by explicitly modeling parking as part of the routing problem, rather than treating it as an exogenous constraint.

#### What the author finds

The chapter conceptualizes last-mile delivery routes as a two-echelon system. The first echelon represents vehicle routing decisions, including where and when to park. In contrast, the second echelon represents walking routes used by delivery personnel to serve customers from a given parking location. The author reviews three deterministic modeling approaches for integrating parking into routing decisions.

The cluster-first route-second approach groups customers to be served from the same parking location before optimizing vehicle routes. The weighted activity-based approach assigns relative weights to driving and walking activities to balance efficiency trade-offs. The parking time cost-based approach directly incorporates expected parking search time, driving time, and walking time into routing cost functions.

Each approach highlights different ways to trade off longer walking distances against the cost and disruption of moving the vehicle to find new parking.

#### Why it matters

Parking availability is a critical and often binding constraint in urban last-mile delivery, affecting travel time, congestion, and delivery efficiency. By formalizing parking as an integral component of routing decisions, this work lays the foundation for more realistic, implementable delivery optimization models.

The chapter offers researchers and practitioners structured ways to account for curb access and walking deliveries, helping logistics operators design routes that better reflect real-world urban conditions and constraints.
