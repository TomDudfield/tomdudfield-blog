---
title: 'Sitecore 9 and the Sitecore Installation Framework'
excerpt: 'Prior to Sitecore 9, setting up an instance of Sitecore either relied on running the Sitecore installer or extracting a ZIP file and jumping through a few hoops. This process was simplified with the introduction of Sitecore Instance Manager but it was still tedious when configuring different server roles. I will show you how to setup a Sitecore 9 instance, while it is not completely straightforward it is a lot more flexible.'
coverImage: '/assets/sitecore-9-and-sif/Untitled-1.png'
date: '2018-02-08T12:00:00.000Z'
author:
  name: Tom Dudfield
  picture: '/assets/blog/authors/tim.jpeg'
ogImage:
  url: '/assets/sitecore-9-and-sif/Untitled-1.png'
tags: [ development, Sitecore ]
---

*Prior to Sitecore 9, setting up an instance of Sitecore either relied on running the Sitecore installer or extracting a ZIP file and jumping through a few hoops. This process was simplified with the introduction of Sitecore Instance Manager but it was still tedious when configuring different server roles. I will show you how to setup a Sitecore 9 instance, while it is not completely straightforward it is a lot more flexible.*

## Sitecore 9 Requirements
### Base
* IIS 10 (IIS 8.5 is supported but I would recommend moving away from it)
* Windows Server 2016 ideally 64-bit (2012 R2 is supported but best avoided to use IIS 10)
* .NET Framework 4.6.2 or newer
* [Microsoft Visual C++ 2015 Redistributable](https://www.microsoft.com/en-us/download/details.aspx?id=53587)
* Microsoft SQL Server 2016 SP1
* Solr 6.6.2 or an Azure Search instance (if you are deploying to Azure PaaS it is recommended to use the same search provider for development as your hosting platform)

### For development
* Visual Studio 2017 for development
* Windows 10 or Windows Server 2016 ideally 64-bit (8.1 and 2012 R2 are supported but best avoided to use IIS 10)
* At a minimum a 4 core CPU and 16GB RAM, ideally an i7 and 32GB RAM
* At least a dual-monitor setup
* [PowerShell 5.1 or newer](https://www.microsoft.com/en-us/download/details.aspx?id=54616)
* [Web Platform 5.0 Installer](https://www.iis.net/downloads/microsoft/web-platform-installer)

### SIF has the following dependencies
* WebAdministration Module
* Web Deploy 3.6 for Hosting Servers
* URL Rewrite 2.1
* Microsoft SQL Server Data-Tier Application Framework (DacFx) version 2016

### Contained Database Authentication
This needs to be enabled to use Web Deploy Packages

The following should be run in SQL Management Studio

`sp_configure 'contained database authentication', 1;`

`GO`

`RECONFIGURE;`

`GO`

## Solr Setup
The next step is to install and configure Solr, fortunately Jeremy Davis has taken the [pain out of this process and produced a script](https://jermdavis.wordpress.com/2017/10/30/low-effort-solr-installs/) that not only installs Solr it creates and certificate and configures it.

Before running this script, make sure you have 1.8.0_151 64-bit version of JRE installed.

<script src="https://gist.github.com/TomDudfield/d9b666433d8e1ebc335bdd53b76635c4.js"></script>
https://gist.github.com/jermdavis/8d8a79f680505f1074153f02f70b9105#file-install-solr-ps1

## What the SIF?
Sitecore 9 has now introduced the Sitecore Installation Framework (SIF). SIF comprises of a  PowerShell module that supports both local and remote installations of Sitecore. It is fully extensible through JSON configuration and PowerShell scripts which deploy Web Deploy Packages into an environment. It is possible to deploy the entire Sitecore Experience Platform or just Experience Management.

To install SIF you can download and install it from the [Sitecore Gallery](https://sitecore.myget.org/gallery/sc-powershell) using the following PowerShell commands in an administrator shell:
`Register-PSRepository -Name SitecoreGallery -SourceLocation https://sitecore.myget.org/F/sc-powershell/api/v2`

`Install-Module SitecoreInstallFramework`

*If you get a prompt when installing modules from an untrusted repository, press Y and ENTER*

![Sitecore Installation Framework PowerShell](/assets/sitecore-9-and-sif/Untitled-2.png)

For developer installations, it is also required to install the Sitecore Fundamentals module which allows the creation of self-signed certificates for development environments.

`Install-Module SitecoreFundamentals`

*If you get a prompt when installing modules from an untrusted repository, press Y and ENTER*

![Sitecore Fundamentals PowerShell](/assets/sitecore-9-and-sif/2.png)

## Single Server Development Instance
This might have seen like a lot of steps to jump through to get this far however you only need to configure these things once, no matter how many instances of Sitecore you install. Unless you have a very specific scenario, typically you will want an XP Single (XP0) instance for development purposes.

First things first, download the latest version of Sitecore 9 for On-Premises deployment, in my instance, this was *Sitecore 9.0.1 rev. 171219 (WDP XP0 packages).zip*. Once the file is downloaded make sure that you unblock it.

![Unblock Zip](/assets/sitecore-9-and-sif/blocked.png)

Once extracted, go into the extracted files and extract *XP0 Configuration files 9.0.1 rev. 171219.zip* and copy all the files into the root folder alongside the scwdp zip files.

Also, locate your license.xml file and copy it into this directory.

To simply this process Sitecore has provided a PowerShell script to call SIF with the payload JSON. This will need to be adapted to match the configuration of your local environment.

<script src="https://gist.github.com/TomDudfield/d708dcdbad1224eda5a6770c2523f3d4.js"></script>

Save this into the directory and run the script.

![Sitecore Install](/assets/sitecore-9-and-sif/install-1.png)

Once complete you should have a clean Sitecore 9 instance. 

This is the simplest way to get Sitecore installed, for more advanced scenarios the JSON payload or SCWDP's can be adapted to support this. This process can be used for production servers and even to remotely deploy Sitecore, although it is worth turning to the Sitecore official documentation to ensure this process is followed correctly.