---
layout: post
author: Dan Murray
title:  "Setting up awesome 'bait' Virtual Machines"
date:   2018-02-27
disqus_identifier: "7 http://ha3ks.tech/blog/?p=7"
---
Virtually, a bit of a blog update post, as some know I am a fan of faffery, I like changing and customising things to my hearts content (one reason I swing between iPhone and Android so often).

One of the things I enjoy doing is spinning up a new Distro of *anything* and seeing what fun things can be done in it. I am an avvid fan of VMWare, its my go to Virtual Machine toy however it is costly getting that licence. You could hack at it and use a crack/keygen, I cant really stop that but I can offer suggestions as to alternatives so I thought it might be nice to load up vBox (Oracle VirtualBox – https://www.virtualbox.org/) and set up a nice dummy machine.
<!--more-->

You could use this for making bait VMs for scam callers as 100 different videos would show you online;

Scammer Hacks Himself – #joseno1fan
Scammer vs Memz Trojan – LOSES HIS SH*T
SCAMMER RATTED! [Getting into a scammer’s PC]
Now may ask ‘why’ you want to run a Virtual Machine? There are many reasons such as application development and testing, farming out certain hardware or machines for certain people to access and use (via a VM Server) with the added bonus of if anything happens you can restore a backup or trash the VM and install a new one.

More professionally you have things like Malware Reversing, you can *occasionally* fuck up your own computer, like that time I ratted myself while learning what Ratting is… so doing that on a machine you can just rip up, throw in the bin and roll a new one in all of about 5 minutes is a win win!

 

Installation:

Spinning up a Virtual Machine is quite easy, you install the software point it to an .iso and it does its thing, you can get these iso’s anywhere and I normally have a handful of Linux machines on hand, but how do you get windows machines? I hear you say. How do you get around having to have a Windows Key? I hear you say.

Easy.

Microsoft, and their ever so awesome resources provide free virtual machines for Internet Explorer/Edge testing.

You can pick these up from here – https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/ and they run Windows 7 – 10 for a veirety of VM Softwares like Virtual Box, VMWare, Hyper V, Parallels (for Mac).

For this example we are looking at Virtual Box and we will pick Windows 10 w/Edge.

Once installed you are greeted with the ‘usual’ Windows 10 desktop, not super appealing but this is a stripped down machine.

 

Adding Schezwan Sauce:

The next step we need to take is making it a little more stealthy.. by stealthy I mean making it look like an actual physical machine. This can be quite a ‘weird’ process however there are apps that can make this easier, I have only been exposed to one for Virtual Box which is VBox Info Modifier.

This runs in DOS on your host machine and allows you to modify parts of the MSInfo of your target machine, though run this while the machine is powered off!!

Bait Note:
Now in ‘bait’ terms, if you a wasting scammers time, it is unlikely this will be necissary however as MSInfo is where they go to ‘usually’ show off ‘viruses’ (trololololol) it might be worth just editing it slightly to make it look as normal as possible

Dependent on the level of I.Q. your scammer may or may not have, you can set this to anything but you might want to tailor it to a machine that can defniately support the hardware you are showing, so running Windows 10 on a Compaq Presario 4122 (My first Windows Machine) is a no no.

In my eaxmple machine ‘Steve’ I set this to a HP ProDesk 400, I did this because it similarly matches my Laptops *humongous* power ~Interestingly Virtual Box pulls hardware data from your machine so in my case the laptop I have is an i3, 8GB Ram beasty… (I miss my i7, 16GB Monster) so if they are ‘good’ they may want to check that your machine is real and it can do the things you want it to ~they are going to coin on eventually.

Once you load up your machine again and check MSInfo you will see it is now set to HP Prodesk 400, yum.

Next up is installing ‘Virtual Box Guest Additions’ which allows you to do some other cool things like drag and drop, shared clipboard and resizable windows.

You can install this via:
-------Image result for install guest additions gif
[![Guest Additions]({{ site.contenturl }}20815.gif)]({{ site.contenturl }}20815.gif)

Bait Note:
– As some scammers like to see whats installed on your machine, seeing ‘Guest Additions’ in your Add/Remove Programs ‘should’ be a sticky outy sore thumb (again depends on I.Q.) to remove this you can open up RegEdit (handily if you screw up its only a VM so you can quickly spin up a new one) and go to “LOCALMACHINE/Software/Microsoft/Windows/Current Verson/Uninstall” in here you can click/highlight VM Guest Additions and hit delete on the keyboard *poof* its gone, if you check the Add/Remove Programs again, its disappeared –
--------tumblr_oipz49YJiO1uorz8zo4_540
[![Magic]({{ site.contenturl }}joker.gif)]({{ site.contenturl }}joker.gif)
 

Finishing Touches:

Ok, now we have a ‘good’ machine and since the ‘tech’ side is out of the way lets get on with making it look used/appealing (dependant on your target audience)

Making it used:
This can be acheived quickly and easily via a multi-software installer like Ninite.

Ninite allows you to pick and choose what software you want installing on your computer and is much much easier then going to the respective site and grabbing the latest version of the App your installing.

You can also look to change the stock wallpaper or leave it,,, or remove it!!

Making it appealing:
We can use similar steps to the above with Ninite and installing a more ‘select’ set of applications but this machine needs to be appealing.

This machine needs to be the one where (in bait terms) your target sees something they want and take it.

A good example of this is Jose’s Video above with a Macro Triggered Payload in a Word Document titled ‘Master Bitcoin Wallets and Passwords’. Since Bitcoin has become more lucrative and exciting then crack just about everyone has some understanding of what it is and they know its important.

So having a bait file like that assures you that they are going to want to open it and they are going to want to view those passwords,,, by enabling macros *sniggers*

The same effect can be attained with a bait application such as Da532s videos where a sprinkle of social engineering also comes into play “the bank asks that this gateway thing is run when making payments to assure it goes through” – Excellent.

These are just my little musings I have had on running Virtual Machines and the rationale behind it.

Personally I run them for shits and giggles.

Likely in the future I will come back to this post and add more to it and discuss other things like VMWare and Parallels.

For now this is a little food for thought on both sides of the VM playfield.