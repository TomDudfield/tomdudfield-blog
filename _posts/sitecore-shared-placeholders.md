---
title: 'Sitecore shared placeholders'
excerpt: 'Having recently attended SUGCON Europe 2016 in Copenhagen, I arrived back in Bournemouth buzzing with different ideas that we could make use of at Redweb.'
coverImage: 
  src: '/assets/sitecore-shared-placeholders/atomic-design.png'
  width: '1024'
  height: '768'
date: '2016-06-09T12:00:00.000Z'
author:
  name: Tom Dudfield
  picture: '/assets/blog/authors/tim.jpeg'
ogImage:
  url: '/assets/sitecore-shared-placeholders/atomic-design.png'
tags: [ 'development', 'Sitecore' ]
draft: 'false'
---

*Having recently attended SUGCON Europe 2016 in Copenhagen, I arrived back in Bournemouth buzzing with different ideas that we could make use of at Redweb.*

One of my favourite talks was *Atomic Design To The Max* by [Tim Braga](https://twitter.com/tbraga01). Tim talked about the journey his team had taken at Collette to implement [Atomic Design](https://allthingssitecore.com/2016/04/25/atomic-design-collette-style/).

They faced a challenge while implementing Atomic Design for their new header and footer. The problem with Sitecore, is that normally you statically bind the header and footer to a placeholder to avoid content editors having to set it on individual pages. The downside is you lose some of Sitecore's nice features such as A/B testing and personalisation. It also means you can't make use of Dynamic Placeholders that Atomic Design is heavily reliant on (hopefully one day Sitecore will add Dynamic Placeholders into the core product).

Tim has come up with a [solution for Sitecore 7](https://allthingssitecore.com/2016/04/25/atomic-design-engineering-challenge/) that allows content editors to set header and footer renderings on a Home item which is then shared across all other items.

When implementing this on a Sitecore 8 solution, I ran into issues where the code didn't behave as expected, so I've had to tweak the code to get it working. I've taken the opportunity to enhance it slightly, you can now control the *placeholder names* and *Home Item ID* within configuration. I have also removed the need for the *JS* changes by adding another Sitecore pipeline - *RemoveSharedRenderings*.

```csharp
using System.Collections.Generic;
using System.Linq;
using System.Xml.Linq;
using Sitecore;
using Sitecore.Data;
using Sitecore.Data.Fields;
using Sitecore.Data.Items;
using Sitecore.Diagnostics;
using Sitecore.Mvc.Extensions;
using Sitecore.Mvc.Pipelines.Response.GetXmlBasedLayoutDefinition;
using Sitecore.Mvc.Presentation;

namespace Library.DotNet.Sc.Pipelines.GetXmlBasedLayoutDefinition
{
    public class GetFromLayoutFieldWithSharedPlaceholders : GetFromLayoutField
    {
        private readonly List<string> _placeholders = new List<string>();

        public void AddPlaceholder(string placeholders)
        {
            if (!string.IsNullOrEmpty(placeholders))
            {
                _placeholders.Add(placeholders);
            }
        }

        public string HomeItemTemplateId { get; set; }

        public override void Process(GetXmlBasedLayoutDefinitionArgs args)
        {
            if (args.Result == null)
            {
                XElement content = GetFromField(args);
                if (content != null)
                {
                    Item item = PageContext.Current.Item;
                    if (item != null && item.TemplateID != new ID(HomeItemTemplateId))
                    {
                        Log.Debug("GetFromLayoutField - Process : Not on homepage");
                        Item homeItem = Context.Database.GetItem(Context.Site.StartPath);
                        if (homeItem != null)
                        {
                            Field homePageLayoutField = homeItem.Fields[FieldIDs.LayoutField];
                            if (homePageLayoutField != null)
                            {
                                string fieldValue = LayoutField.GetFieldValue(homePageLayoutField);
                                if (!fieldValue.IsWhiteSpaceOrNull())
                                {
                                    XElement homePageLayout = XDocument.Parse(fieldValue).Root;
                                    XElement dXElement = content.Element("d");
                                    if (dXElement != null && homePageLayout != null)
                                    {
                                        XElement dXElementInHomePageLayout = homePageLayout.Element("d");
                                        if (dXElementInHomePageLayout != null)
                                        {
                                            var layoutElements = dXElementInHomePageLayout.Elements().ToList();

                                            foreach (var placeholder in _placeholders)
                                            {
                                                dXElement.Add(ExtractContentsFromLayout(layoutElements, placeholder));
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                args.Result = content;
            }
        }
        
        private List<XElement> ExtractContentsFromLayout(IEnumerable<XElement> layoutElements, string placeholder)
        {
            Log.Debug(string.Format("GetFromLayoutField - Process : Starting to extract for placeholder {0}:", placeholder));

            List<XElement> elements = new List<XElement>();

            if (layoutElements.Any())
            {
                foreach (XElement element in layoutElements)
                {
                    if (element.HasAttributes)
                    {
                        if (element.Attribute("ph") != null)
                        {
                            string value = element.Attribute("ph").Value.ToLowerInvariant();
                            if (!string.IsNullOrEmpty(value) && (value.StartsWith("/" + placeholder.ToLowerInvariant()) || value.Equals(placeholder.ToLowerInvariant())))
                            {
                                elements.Add(element);
                            }
                        }
                    }
                }
            }
            Log.Debug("GetFromLayoutField - Process : Done with extract");

            return elements;
        }
    }
}
```