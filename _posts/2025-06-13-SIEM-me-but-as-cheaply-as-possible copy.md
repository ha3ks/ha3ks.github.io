---
layout: post
title: "SIEM me, but as cheaply as possible"
author: ha3ks
date: 2025-06-13
tags: blog SIEM opensource
category: Blog
---

As I've decided to take a more in depth approach to my blog I wanted to start making new posts on different things; things that I'm interested in, things that excite me, things that I feel like I should be doing for the most part.

As such today I'm looking at the open source SIEM (which stands for Security Information and Event Management) software called [Wazuh](https://wazuh.com/).

Since Wazuh is free and it's open source it does make things a little bit easier for me because I don't have hundreds upon thousands of pounds to be spending on things, Accordingly the entire environment that I'm building for this little project is going to be made from virtual machines in this case I'm using VMware

## Prerequisites:

* Installation media(s) - Windows and Ubuntu for me
* Hardware - To run it, laptop will do!
* Software - In this case, VMWare (yes I know F Broadcom)
Now that we have all that out the way let's get cracking.

## Getting Started

Initially you'll want to get your virtual machines set up firstly I'm not bothering using any kind of virtual firewall or virtual router I'm literally just building a Windows 11 evaluation edition machine and one ubuntu 'server' in this case it's version 24.04 .02 LTS.

As you can set things up how you want all I have done is leave everything as default, but on the Ubuntu Server I did enable SSH access so I can access it from my host machines terminal

## Quick and Dirty

### Server/Dashboard Machine (Ubuntu)

As I want to use all defaults for this to make life a lot quicker and easier I'm just going to copy the quick start installation from Wazuh's Quickstart Guide

For my example, I run the quick start which is this snip of code:

```
curl -sO https://packages.wazuh.com/4.12/wazuh-install.sh && sudo bash ./wazuh-install.sh -a
```

Once that completes you should see an output similar to this:

[![complete](/assets/blog/SIEM-me/complete.png)](/assets/blog/SIEM-me/complete.png)

Which gives you an 'address' for the Dashboard to view as well as an Username and Password (definately write that down a moment). If you see this though, excellent lets move onto step 2, if not check your log files and see what's going wrong. Wazuh has a pretty darned good Documentation page as well as a Discord for questions.

For example: Durning the first 4 times (yes 4!!) I tried this install, it kept falling over at the dashboard. It would not install the dashboard no matter what I did, I checked the logs and it was moaning about disk space so I increased the VM, and again, and checked the documantation, and again and again then for run 5 just went balls to the wall and massively overprovisioned it... success.

Now that's taken care of let's make sure we can log in and see the actual dashboard:

[![dashboard](/assets/blog/SIEM-me/dashboard.png)](/assets/blog/SIEM-me/dashboard.png)

Ah much better, if you want to you can do things like add users, change passwords etc etc but now let's move onto a VM victim/user machine

### Endpoint Machine (Windows)

For the windows endpoint the installation is actually quite simple all you have to do at least in this case anyway is download the agent software and run the install, after which you will be prompted by default to open the agent config, in this you can add your 'servers' IP address:

[![windowsagent](/assets/blog/SIEM-me/windowsagent.png)](/assets/blog/SIEM-me/windowsagent.png)

Now that's running lets take a look back at the dashboard:

[![server1](/assets/blog/SIEM-me/server1.png)](/assets/blog/SIEM-me/server1.png)

Ok we have an agent showing now, you can click it

[![server2](/assets/blog/SIEM-me/server2.png)](/assets/blog/SIEM-me/server2.png)

And see what it is and what its getting up to and well as things like Compliance, Events, how it squares up with the MITRE framework... theres loads in here and I have barely touched anything yet!

[![server3](/assets/blog/SIEM-me/server3.png)](/assets/blog/SIEM-me/server3.png)

Stupid simple, definately simplified because I want to play with this but I wanted to take you along for the ride.

## Takeaways:
* Sometimes things don't work the first time you try them. Failure is enevetable but when you do fail, make sure you fail forward!
* Dashboards are ALWAYS cool!
* I stil dont know what I am doing but at least I am having fun!


Peace

🤙

-------

I don't have any sponsors or anything but if you enjoy my work, or feel sympathy for my wife, then I have set up a [Ko-Fi account](https://ko-fi.com/ha3ks) as well as a [BuyMeACoffee](https://www.buymeacoffee.com/ha3ks) people can donate to.