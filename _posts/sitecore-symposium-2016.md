---
title: 'Sitecore Symposium 2016'
excerpt: 'I was fortunate enough to be able to attend Sitecore Symposium this year hosted in New Orleans. It is a two-day event aimed at Sitecore developers, marketers and business users. Sitecore showcases the latest features in the platform, outlining the product roadmap and providing inspiring keynotes.'
coverImage: '/assets/blog/hello-world/cover.jpg'
date: '2016-09-26T12:00:00.000Z'
author:
  name: Tom Dudfield
  picture: '/assets/blog/authors/tim.jpeg'
ogImage:
  url: '/assets/blog/hello-world/cover.jpg'
# tags: development, Sitecore
---

*I was fortunate enough to be able to attend Sitecore Symposium this year hosted in New Orleans. It is a two-day event aimed at Sitecore developers, marketers and business users. Sitecore showcases the latest features in the platform, outlining the product roadmap and providing inspiring keynotes.*

Symposium kicked off in true New Orleans fashion with a jazz band and dancers bursting into the auditorium which was a great way to set the tone for the rest of the event. Michael Seifert, Sitecore’s CEO, led the opening keynote describing how context marketing enables brands to deliver the best experience for consumers. He was joined on stage by Darren Guarnaccia to deliver a series of quick demos showing Sitecore’s latest changes, including enhancements to the Path Analyzer and a new feature known as the Sitecore eXperience Accelerator.

![Keynote](https://tomdudfield.com/content/images/2016/10/sym2.jpg)

The next keynote was by [Jason Silva](https://www.youtube.com/user/ShotsOfAwe), a passionate futurist who captivated the whole room for the next hour. He talked about how exponential growth in biotechnology, nanotechnology and artificial intelligence could lead to a revolution where these converge into technological singularity. This in effect would change humankind and lead to a transhuman time where society would be completely different from what we know today. 

Next up was Lars Nielsen with the developer keynote to give an overview of Sitecore’s technical direction. He talked about how Sitecore has started adopting some of Microsoft’s standard tools and processes. For example, Sitecore now fully supports dependency injection out the box. Lars announced Sitecore’s strategy for moving to .NET Core. Rather than doing a big-bang rewrite, Sitecore is adopting a micro-service architecture which allows them to migrate features to new .NET Core services. This will create a pluggable architecture with commerce being one of the first areas to come under this. Sitecore now has NuGet support, with packages officially available on [MyGet](https://sitecore.myget.org/gallery/sc-packages). This will simplify DLL management across projects and should integrate well with build processes. 

![Developer Keynote](https://tomdudfield.com/content/images/2016/10/sym3.jpg)
 
The next session was on Sitecore Azure and gave a fantastic sneak peek at what is coming in 8.2 Update 1. Sitecore will now have proper Azure support and will deploy as Azure Web Apps. This is a massive shift for Sitecore as it now has a true cloud offering. Behind the scenes Sitecore makes use of Redis to handle session state, Azure search instead of Lucene, and Application Insights to manage metrics and logging of the application. It makes use of Azure scripts to create and setup the various resources and can handle deploying code directly from VSTS.

The session on Sitecore eXperience Accelerator was one of the ones I was most looking forward to because it sounds great in principle, but I wasn’t sure how it would work in practice. Effectively it provides the ability to wireframe within Sitecore, which can then be quickly exported as HTML for design. Once the CSS is complete this can be imported and the design can be applied across the site. This enables content editors to start working on content while the site is being designed and built which has the potential to give huge time savings for delivering Sitecore sites. Under the hood it makes use of 960 grid system and out of the box there are around 80 components available to editors. This can all be extended to add additional components and features. I think this could be very beneficial for brochureware sites, but for large transactional websites it probably won’t be suitable.

![The party](https://tomdudfield.com/content/images/2016/10/sym4.jpg)
 
After a busy first day we were all invited to House of Blues for a night of jazz music, lots of local cuisine and plenty of craft beer. It was a great way to unwind and provided a great setting to network and chat with lots of Sitecore experts.

![Day 2 planning](https://tomdudfield.com/content/images/2016/10/sym5.jpg)
 
Following a busy first day, one of our favourite sessions on the second day was on Sitecore Habitat. The session explained how Habitat is simply a demo of how to implement the Helix standards and practices by Sitecore. This means if you happen not to like Gulp, then feel free to use something else. Helix is available at, helix.sitecore.net, it is Sitecore’s first attempt at providing comprehensive guidance on how to structure projects and content in Sitecore. This should enable developers to create better solutions and make it easier to provide assistance when required.

The next talk covered how Sitecore has changed publishing with version 8.2. This is the first component that Sitecore has moved into a .NET Core service. It covered how the current scheduling process has morphed into a bit of a monster and can lead to extremely long waits for publishes to complete. In comparison the new service runs so quickly it often appears that publishes are instant. I am certainly looking forward to seeing more parts of Sitecore moved to .NET Core.

![Danger mouse](https://tomdudfield.com/content/images/2016/10/sym6.jpg)
 
The closing keynote lead by Lars Nielsen, started with a tongue in cheek role play showing a marketing campaign journey that led an inactive previous customer into purchasing an expensive device in store. This was through a variety of touchpoints including; email, forms, personalisation, apps, iBeacons, xDB data and profiling. This showed off some of Sitecore’s existing features but also showcased some exciting features that are coming to the product, as well as some ideas that are coming from the innovation team. 

Following an amazing couple days in New Orleans, I have come back full of different ideas and plenty of new features that I want to try out. It has been announced that the next Symposium will be held in Las Vegas from October 16-19 2017 and I’m already am looking forward to attending the next one!

![Homeward bound](https://tomdudfield.com/content/images/2016/10/sym7.jpg)