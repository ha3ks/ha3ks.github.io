---
layout: post
title: "Running a FortiGate in VMWare"
author: ha3ks
date: 2025-08-28
slug: running-a-fortigate-in-vmware
tags: blog VMWare Fortigate
category: Blog
---

It has been some considerable time since I last put up a blog post, I just wanted to go in a different direction for a while, it happens.

The direction has been confusing and has me wondering what my next steps will be...

I love security don't get me wrong, it's the most fun you can have on a computer when you are a nerd and a gamer, but I feel a pull in another direction and as such I want to put up some helpful posts every now and again for people that might want to play with something new.

Recently I undertook some free training from Fortinet... you know that company that constantly has exploits and news cycles, that one.

I felt a little bad about it but as time has gone on I can kinda see where the problem might be and as such my 'I can help' voice took over for a bit...

![1](/assets/blog/FortiVM/1.png){: .align-center }

See.. crazy I know.

So in the last week I've broadened my horizons and learned about AI and Agentic Systems as well as an 'ass load' of Fortinet Cybersecurity content.

From the latter I wanted to share setting up a Fortigate locally on your machine (Via VMware) so you too can have a play and a poke with it, some features are unavailable however you can set things up and run some stuff through it to see what kinds of fun things you can log and track.

## Prerequisites

To install a Fortigate Firewall on VMware Workstation you will first need to register for an Fortinet Support Account so you access the downloads section - [https://support.fortinet.com/Download/VMImages.aspx](https://support.fortinet.com/Download/VMImages.aspx).

Once logged in click on Download > VM Images, Select Product: FortiGate and Select Platform: VMware ESXi and download the Latest Version (7.6.4). 

Be sure to click Download under the 'New deployment of FortiFirewall for VMware FFW_VM64-v7.6.4.F-build3596-FORTINET.out.ovf.zip (111.94 MB)' if this is a new installation or VM, if you already have it installed you can grab the one titled 'Upgrade from previous version of FortiFirewall for VMWare FFW_VM64-v7.6.4.F-build3596-FORTINET.out (112.43 MB)':

![2](/assets/blog/FortiVM/2.png){: .align-center }

Once downloaded you can extract out the files by right clicking and 'Extract All' and let it dump out to your download folder:

![3](/assets/blog/FortiVM/3.png){: .align-center }

## Installation

Now you have done that open VMWare Workstation and select 'Open a Virtual Machine':

![4](/assets/blog/FortiVM/4.png){: .align-center }

Select your 'main' file:

![5](/assets/blog/FortiVM/5.png){: .align-center }

And you'llm need to accept the EULA:

![6](/assets/blog/FortiVM/6.png){: .align-center }

After hitting Next you will get the option to give the VM a name and where it will be stored (I keep everything in a 'Virtual Machines' local folder):

![7](/assets/blog/FortiVM/7.png){: .align-center }

Now some guides will have you change the initial 'Network Adapter' to NAT, run the VM, log into it and then reset it and do it all over again on round2 because of how the VM licence works.

I tried this and completely shafted the install so instead go to the Edit Virtual Machine Settings and under Options, make sure VMware Tools Time Sync, is set to sync with host:

![14](/assets/blog/FortiVM/14.png){: .align-center }

And save it, then boot it up!

It will run its initial auto config, repartition the disk drive etc etc and eventually spit you out at the login screen.

The username is admin, the password is blank... super secure... though when you do log in it asks you to set up a new admin password 😉

![8](/assets/blog/FortiVM/8.png){: .align-center }

## Configuration

Once logged in you can start to do some initial setup, to get this working the following is what I entered:

```bash
get system status  #Displays a ton of information about the current state of the device
```
![9](/assets/blog/FortiVM/9.png){: .align-center }

```bash
show system interface  #Displays the interfaces (ports and access) of the device
```
![10](/assets/blog/FortiVM/10.png){: .align-center }

We need to configure the port and then the default gateway so we can access the device so run the following:

```bash
config system interface

edit port1

set mode static 

set ip (your desired IP in my case it was 192.168.4.200) 255.255.255.0

set allowaccess https http ping ssh

end

config router static

edit 1

set device port1

set gateway (your desired IP in my case it was 192.168.4.199 as 200 was taken)

next

end
```

That will configure the port and gateway so we can log into the router via the web.

The next thing I had an issue with was getting the licence, kept throwing up DNS errors so while we are here, lets configure the DNS:

```bash
config system dns

set primary 8.8.8.8

set secondary 8.8.4.4

end
```

Now to be safe you can reboot the device from the VMware menu up top:

![11](/assets/blog/FortiVM/11.png){: .align-center }

Once rebooted we can try to log in via the web interface with the admin username and password you have created:

![12](/assets/blog/FortiVM/12.png){: .align-center }

Now when you log in you are presented with a setup screen which may also warn that you need a valid licence to use the software, not to worry you can get a free perpetual licence for use from fortigate:

![13](/assets/blog/FortiVM/13.png){: .align-center }

Once 'activated' you should be brought to the 'main menu', the Dashboard of the Fortigate, if not it may take you through a quick little setup side mission but you can skip that part for now.

## Success

Behold! Your Dashboard:

![15](/assets/blog/FortiVM/15.png){: .align-center }

And that it! Following on from this you can follow along with your training to play around with most parts and sections, again some locked off as its only a perm evaluation licence, but still enough to play around to try new things.

Good luck.

Peace

🤙

-------

I don't have any sponsors or anything but if you enjoy my work, or feel sympathy for my wife, then I have set up a [Ko-Fi account](https://ko-fi.com/ha3ks) as well as a [BuyMeACoffee](https://www.buymeacoffee.com/ha3ks) people can donate to.
