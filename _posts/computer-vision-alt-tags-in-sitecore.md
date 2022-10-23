---
title: 'Computer Vision Alt Tags in Sitecore'
excerpt: 'Creating alt text for every image on your site can be a bit of a nuisance. Reviewing each image, coming up with accompanying text and checking each one all takes time, but it is essential. Now what if there was a way to magically suggest alt text when uploading images to Sitecore?'
coverImage: 
  src: '/assets/computer-vision-alt-tags-in-sitecore/barack-3.png'
  width: '640'
  height: '301'
date: '2016-11-28T12:00:00.000Z'
author:
  name: Tom Dudfield
  picture: '/assets/blog/authors/tim.jpeg'
ogImage:
  url: '/assets/computer-vision-alt-tags-in-sitecore/barack-3.png'
tags: [ 'development', 'Sitecore', 'Azure' ]
draft: 'false'
---

*Creating alt text for every image on your site can be a bit of a nuisance. Reviewing each image, coming up with accompanying text and checking each one all takes time, but it is essential. Now what if there was a way to magically suggest alt text when uploading images to Sitecore?*

## Why the fuss?
Alt text (alternative text) is a descriptive phrase that can be attributed to an image. Each image on your website should have alt text. Not only can it improve your SEO (Search Engine Optimisation), it’s absolutely vital for meeting basic accessibility standards. Generally, content editors have to write alt text for each image and check it before publishing. With other priorities or a lack of time, alt text can often fall by the wayside, being forgotten or simply ignored.

## The idea
At Redweb our Innovation lab technologists regularly tinker with new technologies – and it was their [Haiku Camera](https://twitter.com/HaikuCamera) experiment that got us thinking. What if, instead of turning an image into a haiku poem, we could use the technology to read an image and describe it for us? What if we could automate the process of creating alt text?

## How it works
At [Future Decoded](https://futuredecoded.microsoft.com/) Microsoft showed the latest advancements it has made with its [Cognitive Services API's](https://www.microsoft.com/cognitive-services/en-us/apis), in particular the Computer Vision API. This module makes use of the [Describe Image](https://dev.projectoxford.ai/docs/services/56f91f2d778daf23d8ec6739/operations/56f91f2e778daf14a499e1fe) method on the API to generate a description of an image that has been uploaded into Sitecore, this can then be set as the alt text.

![Big Ben {{ w: 731, h: 493 }}](/assets/computer-vision-alt-tags-in-sitecore/bigben.png)

## Show me the code
If you want to compile your own dll or pull the code you can grab the latest code from [GitHub](https://github.com/TomDudfield/AutoAltTags). Otherwise the module is available as a Sitecore package on the [Sitecore Marketplace](https://marketplace.sitecore.net/en/Modules/A/Alt_Tag_Generator.aspx) or is available on [NuGet](https://www.nuget.org/packages/SitecoreAutoAltTags) to install directly into a solution. The module should work with versions 8.0 and above.

You will need to [generate a API key](https://www.microsoft.com/cognitive-services/en-US/subscriptions) for the Computer Vision API and add the key into *AutoAltTags.Config* for the module to work. An alt tag will be generated upon uploading or saving a media item. If an alt tag is already set it won't be overridden. 

## Why bother?
As a developer it is easy to overlook alt text but not only will you be improving your site’s accessibility standards, you could also drastically reduce the amount of effort involved for content editors. With this module alt text will be generated automatically saving considerable time but still providing the ability to tweak the text when it doesn't quite fit.

![Sometimes it doesn't get it quite right {{ w: 700, h: 489 }}](/assets/computer-vision-alt-tags-in-sitecore/theresamay.png)

*Sometimes it needs a little tweaking*