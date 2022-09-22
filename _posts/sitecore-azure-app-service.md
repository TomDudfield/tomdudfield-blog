---
title: 'Sitecore PaaS using Azure App Services'
excerpt: 'Since Sitecore 6.3 there has been Microsoft Azure support through the separate Sitecore Azure Module.'
coverImage: 
  src: '/assets/sitecore-azure-app-service/Picture1.png'
  width: '1521'
  height: '682'
date: '2018-02-06T12:00:00.000Z'
author:
  name: Tom Dudfield
  picture: '/assets/blog/authors/tim.jpeg'
ogImage:
  url: '/assets/sitecore-azure-app-service/Picture1.png'
tags: [ development, Sitecore, azure ]
---

*Since Sitecore 6.3 there has been Microsoft Azure support through the separate Sitecore Azure Module. This allowed deploying Sitecore sites onto Azure Cloud Services. It required an on-premise management instance from which you could manage Azure farms. While it worked in some scenarios it lacked support for common Sitecore modules and there was still a dependency on having a management instance. The main problem for the module was that it was based on Cloud Services which lack support for common cloud features such as auto-scaling.*

![Azure {{ w: 1359, h: 765 }}](/assets/sitecore-azure-app-service/Picture3.jpg)

## Web Apps
Since the release of Sitecore 8.2 Update 1, Sitecore have deprecated the old module and now provide a new mechanism to deploy in a PaaS setup to Azure using Web Apps. Moving away from Cloud Services to Web Apps, brings reduced costs and better scalability. It also removes the need for an on-premise management instance as everything is provisioned and managed using ARM templates and PowerShell scripting. This makes environments far more disposable as you can provision a new environment in under 30 minutes.

![Web Apps {{ w: 824, h: 455 }}](/assets/sitecore-azure-app-service/Picture2.png)

Out of the box, Sitecore is security hardened when it is provisioned which helps to reduce vulnerabilities. With Web Apps it is possible to enable remote debugging which enables developers to remotely debug web apps from Visual Studio. Unlike a typical IaaS setup where you would often spend time configuring multiple delivery servers, with PaaS you provision just one instance of a server type, then scale it out horizontally using the Azure Portal to create multiple instances. This can be automated by using Azure auto-scaling either vertically or horizontally based on certain thresholds.

Moving to a PaaS environment introduces a few changes to Sitecore deployments. Lucene search is replaced with an instance of Azure Search, which provides a search as a service for Sitecore, in a similar fashion to Solr. Session state is stored by default in a Redis Cache instance which brings performance improvements. The file system of Web Apps should be considered to be very volatile especially if you are regularly deploying using CI, so Application Insights is now used for managing all Sitecore log and telemetry data.

## Marketplace
![Marketplace {{ w: 820, h: 394 }}](/assets/sitecore-azure-app-service/Untitled.png)
It is possible to provision Sitecore directly from the Azure Marketplace, this provides a simple set of dialogs to specify key parameters and license information. There are options for the Sitecore version and numerous topologies like Experience Cloud or Experience Manager. Once entered it then provisions the environment for you, creating all the necessary resources. This method is great for demos or setting up environments that are only needed for a brief time but it lacks an easily repeatable process.

## Azure Toolkit
The other way to provision Sitecore on Azure is using the Azure toolkit and ARM templates provided by Sitecore. This method is far more flexible and can be automated if needed. From the outset, this method seems quite complicated but it doesn't take long to learn while bringing a lot of flexibility. The azure toolkit contains role specific packages to support different Sitecore topologies, config to support Azure App Service, and PowerShell modules for deploying Sitecore solutions. Alongside the Azure Toolkit, there is a Github repo that contains ARM templates and parameters. The files within here are designed to customised then passed into the modules provided by the Toolkit.

For each supported Sitecore version there will be a set of Azure AppService packages alongside the standard installation. These are designed to deploy Sitecore installations into an Azure environment as part of running the Toolkit scripts, they contain web deploy and DACPAC packages. These must be uploaded to Blob storage and referenced during the environment provisioning. It is possible to create your own one from a local Sitecore instance, this can be useful if you are using custom Sitecore modules such as Coveo.

## Summary
![Why {{ w: 1904, h: 1017 }}](/assets/sitecore-azure-app-service/why.png)
The main reason to move to a PaaS setup is to streamline the amount of infrastructure that is needed and to bring efficiencies to the management of this. Effectively you are entrusting the likes of Microsoft to manage and maintain your underlying servers enabling you to just deploy your app into this managed environment. This can significantly reduce costs, not only for the physical hardware but also the time people spend setting up and maintaining platforms. Overall the Sitecore PaaS implementation is a perfect example of how to leverage Microsoft technologies such as PowerShell and ARM Templates to rapidly deploy applications to the cloud. 

PaaS solutions don't suit every situation but this doesn't mean you are excluded from all these cool enhancements. You can still use a combination of these features separately, for example, you can keep on-premise web servers but make use of Azure Search or Redis session state.

I will follow-up with more posts on how to provision a Sitecore 9 PaaS environment and recommended topologies.