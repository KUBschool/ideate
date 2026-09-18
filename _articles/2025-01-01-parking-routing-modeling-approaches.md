---
title: "Three ways to build parking into a delivery route — and the tradeoff each one makes"
dek: "Most delivery-routing models treat parking as an afterthought, something that happens once the vehicle stops. A new reference chapter argues it needs to be part of the model from the start — and lays out three ways to do it."
topic: supply-chain
series:
  - methodology
faculty:
  - sara-reed
byline: "Sara Reed"
date: 2025-01-01
image_tint: steam
featured: false
source_url: "https://business.ku.edu/research-and-faculty/analytics-information-operations/research-insights"
answer_box: >-
  A reference chapter on incorporating parking into last-mile delivery
  routing models frames the problem as a two-echelon system — vehicle
  routing decisions (including parking) as the first echelon, walking
  routes from a parking spot to customers as the second — and reviews
  three deterministic modeling approaches: cluster-first route-second,
  a weighted activity-based method balancing driving against walking,
  and a parking-time-cost-based method that builds expected parking
  search time directly into routing cost.
---

Most delivery-routing models optimize the drive, then treat parking as whatever happens once the vehicle stops moving. A new reference chapter argues that ordering is backwards — parking isn't an afterthought to the route, it's a constraint that should shape the route from the start.

Sara Reed, assistant professor of business analytics at the University of Kansas, authored "Parking in Routing Last-Mile Deliveries," forthcoming in the Encyclopedia of Operations Management (Elsevier).

## A two-part system: driving, then walking

Reed's framing splits last-mile delivery into two connected layers. The first echelon is the vehicle routing problem itself — including where and when the driver parks. The second echelon is the walking route a delivery person takes from that parking spot out to each customer and back. Treating these as one integrated system, rather than routing the vehicle first and figuring out parking logistics after, is the chapter's core methodological argument.

## Three ways researchers have modeled the tradeoff

The chapter reviews three deterministic approaches, each making a different tradeoff between driving and walking explicit:

**Cluster-first, route-second** groups customers who can reasonably be served from the same parking location before optimizing the vehicle's route between those clusters — solving the walking problem first, then the driving problem around it.

**Weighted activity-based modeling** assigns relative cost weights to driving time versus walking time, letting a planner tune how much the model should favor minimizing vehicle movement against minimizing time spent on foot.

**Parking time cost-based modeling** goes furthest in treating parking as a first-class routing variable, incorporating expected parking search time directly into the routing cost function alongside driving time and walking time — the approach Reed's own empirical work on parking-time routing has built on directly.

> "Parking availability is a critical and often binding constraint in urban last-mile delivery, affecting travel time, congestion, and delivery efficiency."

## The same underlying tradeoff, three different lenses

What ties the three approaches together is a shared tension: every additional minute spent walking from a farther, easier-to-find parking spot is a minute not spent driving to the next stop — and vice versa for a closer spot that's harder to secure. None of the three approaches eliminates that tradeoff; each just makes a different choice about how explicitly and how early in the modeling process to confront it.

## Why the framework matters beyond any one paper

For researchers and logistics practitioners, the chapter's value isn't a single new finding — it's a structured way to think about where parking belongs in a routing model in the first place. Given how much walking time depends on where a vehicle parks, and how much overall delivery efficiency depends on that walking time, formalizing parking as a genuine routing decision rather than an operational detail is a foundational step toward models that actually reflect what drivers are doing on the ground.
