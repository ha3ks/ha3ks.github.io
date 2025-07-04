---
layout: post
title: "Data Centre Tracker"
subtitle: "~ Sick WebDev Brah ~"
date: 2024-10-30
author: ha3ks
tags: development webdev
category: Portfolio
---

## Data Centre Tracker

I've had my eye on making somekind of 'tracker' website for a while.

I never really got a start on it but recently I was able to sit down with Google, ChatGPT and StackOverfow and finally nail some of this down.

The following is my initial try at making a tracker.. think the [PewPewMap](https://threatmap.checkpoint.com/) from [Checkpoint](https://www.checkpoint.com/) but more basic as I don't have 'all the skill' at this time.

## The Map

This project started with being able to get a map to display on a webpage. harder than I thought it would be but I managed to get this to display initially:

[![1](/assets/blog/DataCentreTracker/1.png)](/assets/blog/DataCentreTracker/1.png)

From that I wanted the user to be able to 'interact' with the countries shown but I was not sure exactly what I wanted to display.

Because of that I may use this as a sort of Boiler Plate for a future project like tracking Malware Infections *cough* Malwaretech style *cough*

[![mapgif](/assets/blog/DataCentreTracker/map.gif)](/assets/blog/DataCentreTracker/map.gif)

Ok, so progress is progress.

As an initial little test I asked ChatGPT to list out the coordinates of a few AWS and Azure Datacentres as I would use these as testing points.

After a spot of Googling I was able to remember how to add things like sidebars and options so off to work I got;

[![map2](/assets/blog/DataCentreTracker/map2.gif)](/assets/blog/DataCentreTracker/map2.gif)

And there we go.

I have spotted a little bug in the zoom feature where if you zoom out the points of the DC's drifts so 'Paris' becomes 'in the middle of the sea' 😂😂😂 - I promise I will fix this issue at somepoint, I feel like I am missing a constant between the coordinates and hooking the DCs to them but I'll get there, been learning about making a threat feed and making the map display that (as above) but that's a level of work I've not touched before... better pay that ChatGPT subscription 🤣

As always, if you wish to see the code for this project you can find it on my GitHub.

[Ha3ks - DataCentreTracker Source on Github](https://github.com/ha3ks/DataCentreTracker)

You can also play with it live! 

Literally right now live at [https://ha3ks.github.io/DataCentreTracker/](https://ha3ks.github.io/DataCentreTracker/)

🤙

-------

I don't have any sponsors or anything but if you enjoy my work, or feel sympathy for my wife, then I have set up a [Ko-Fi account](https://ko-fi.com/ha3ks) as well as a [BuyMeACoffee](https://www.buymeacoffee.com/ha3ks) people can donate to.