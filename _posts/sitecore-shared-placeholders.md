---
title: 'Sitecore shared placeholders'
excerpt: 'Having recently attended SUGCON Europe 2016 in Copenhagen, I arrived back in Bournemouth buzzing with different ideas that we could make use of at Redweb.'
coverImage: '/assets/blog/hello-world/cover.jpg'
date: '2016-06-09T12:00:00.000Z'
author:
  name: Tom Dudfield
  picture: '/assets/blog/authors/tim.jpeg'
ogImage:
  url: '/assets/blog/hello-world/cover.jpg'
tags: [ development, Sitecore ]
---

*Having recently attended SUGCON Europe 2016 in Copenhagen, I arrived back in Bournemouth buzzing with different ideas that we could make use of at Redweb.*

One of my favourite talks was *Atomic Design To The Max* by [Tim Braga](https://twitter.com/tbraga01). Tim talked about the journey his team had taken at Collette to implement [Atomic Design](https://allthingssitecore.com/2016/04/25/atomic-design-collette-style/).

They faced a challenge while implementing Atomic Design for their new header and footer. The problem with Sitecore, is that normally you statically bind the header and footer to a placeholder to avoid content editors having to set it on individual pages. The downside is you lose some of Sitecore's nice features such as A/B testing and personalisation. It also means you can't make use of Dynamic Placeholders that Atomic Design is heavily reliant on (hopefully one day Sitecore will add Dynamic Placeholders into the core product).

Tim has come up with a [solution for Sitecore 7](https://allthingssitecore.com/2016/04/25/atomic-design-engineering-challenge/) that allows content editors to set header and footer renderings on a Home item which is then shared across all other items.

When implementing this on a Sitecore 8 solution, I ran into issues where the code didn't behave as expected, so I've had to tweak the code to get it working. I've taken the opportunity to enhance it slightly, you can now control the *placeholder names* and *Home Item ID* within configuration. I have also removed the need for the *JS* changes by adding another Sitecore pipeline - *RemoveSharedRenderings*.

<script src="https://gist.github.com/TomDudfield/adf05764a8469a93278a16a220e073e1.js"></script>