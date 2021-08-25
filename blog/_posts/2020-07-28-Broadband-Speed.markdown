---
layout: post
author: Dan Murray
title:  "Why ISPs *bend the truth* about broadband speeds and why there isn’t much you can do about it."
date:   2020-07-28 12:00:00
disqus_identifier: "19 http://ha3ks.tech/blog/?p=19"
---
I’ve been waiting to release this nugget, for those who don’t know I’ve worked in broadband for years, initially on a technical level moving up to NOC and eventually my own little thing but I digress. I know a thing or two about broadband in a ‘basic sense’ to help others understand how much your ISP doesn’t show you on those fancy signup pages.

So let’s start, you have a new house (congratulations) you want broadband (who wouldn’t) so everyone’s first step is getting broadband is normally a quick google of BEST ISP UK, now this isn’t always the best way to do things, your not looking for the ‘best’ you’re looking for the one that can actually give you broadband (more on this later).

<!--more-->

Instantly you will be greeted by adverts offering blazing speeds and low low prices (thanks SEO) but about 4 or 5 results down you will find the actual ISPs and their signup pages/offers. The Big ones in the UK are normally Virgin, EE, BT/Plusnet and Sky (not Talk Talk they are hacked like every other week).

Most ISP’s will use the existing Telecommunications network (this is where things annoyingly go to shit) so its all OpenReach wiring and sometimes their ISP shiny box at the nearest exchange and then you have Virgin, if you can actually get it, they install their own cable and run their own network right up to your house (whoa!).

Now most ISP’s using OpenReach isn’t too bad of a thing, I just make it out like its a big painful 80 odd year old mistake of corroded copper cables and people firebombing the local exchanges.

WaIt IsN’t OpEnReAcH pArT oF bT sO tHeY hAvE a MaSsIvE mOnOpOlY oN ThE uK?

Yes and No. OFCOM stepped in years ago and forced a split into separate divisions so OpenReach ‘got stuck’ with all the cabling responsibility. What this does mean however is that BT customers aren’t treated better then anyone else who uses the OpenReach Network, there’s no hidden paid for SLA (Service Level Agreement) and you can’t bribe your way to a faster connection (unless you have millions I guess) the only way to do that is if your a business customer and you pay for enhanced care on the line (faster response time to faults, less down time etc, everyone has their own definition of this so if your a business, ask them!)

WhY aRe YoU TaLkInG aBoUt ThE nEtWoRk?

It’s important to understand how the cabling is formed up as this will help explain the speeds part up next.

<b>Speed *Estimates*</b>

So as I said you have googled an ISP and found a really good offer, excellent, now lets have a look at the speeds you could have.

You pop in your post code (if the system realises it is a post code) and through the magic of the internet, much like on Bullseye where we have Jim Bowen showing us:

[![what_could_have_won]({{ site.contenturl }}g0hereswhatyoucouldhavewon_g_White.jpg)]({{ site.contenturl }}g0hereswhatyoucouldhavewon_g_White.jpg)

The checker will show you that you ‘could’ have speeds between XX and XX Mb, holy balls all that speed what ever will you do with yourself.

Let us break that down though, how can the system be so sure? truth is, it isn’t.

Most ISP’s speed checkers are using automated testers and old records to give an idea/average whats available in your <b>postal code area</b>. For those that need to do it manually [SamKnows Broadband](https://availability.samknows.com/broadband/) does the work for you #ISPusedandapproved

Now again this isn’t the speeds per say but it is showing you what is available, take the following example an exchange in a place I lived at one time:

[![SamKnows1]({{ site.contenturl }}2020-07-28-09_22_29-https___availability.samknows.com_broadband_broadband_checker.png)]({{ site.contenturl }}2020-07-28-09_22_29-https___availability.samknows.com_broadband_broadband_checker.png)

So this is showing you the local area and what services are available, notice I could have ADSL broadband (which by now is ‘up to’ 21Mb across the UK), FTTC and FTTP (that’s fibre to the local cabinet near your home (usually) and also if you can afford it you could have it to your property if your ISP offers this (expensive and rare AF).

[![SamKnows2]({{ site.contenturl }}2020-07-28-09_23_33-https___availability.samknows.com_broadband_broadband_checker.png)]({{ site.contenturl }}2020-07-28-09_23_33-https___availability.samknows.com_broadband_broadband_checker.png)

Drilling down a little further on the ADSL side of things notice it shows you how far away from the local exchange you are, 895 meters but TAKE NOTE!! This figure is as the crow flies, a line, it does not represent how far the cabling has to loop around to get to you (could be 4.5km of cable and you’re at the end of it (doomed to a 1Mb connection if that).

[![SamKnows3]({{ site.contenturl }}2020-07-28-09_24_24-https___availability.samknows.com_broadband_broadband_checker.png)]({{ site.contenturl }}2020-07-28-09_24_24-https___availability.samknows.com_broadband_broadband_checker.png)

Then we have a look at the LLU providers, LLU means Local Loop Unbundled, remember earlier I said everyone uses OpenReach wire and some have their own shiny box at the exchange? that’s these folks. They the can control that box (more on this later).
Now this is purely based on the post code so isn’t the most accurate.

If you have a working telephone line at your new house (some don’t and its annoying) then the checkers can run off that and give you a better idea as to the speeds as it can FINALLY take into account the distance from the exchange, any joins in the cable, degradation, junction boxes and finally your test socket (test socket as this all the ISP has an obligation to push broadband to, if your removable face plate is faulty or the upstairs phone extension is faulty and kills your connection then that’s something you have to sort with an electrician (they don’t have to be ex BT that’s just a way of justifying paying more).

<b>The Difference between an ADSL ISP and an LLU one</b>

Ok so the debate between ADSL and LLU, this will rage on I’m sure and this is only my understanding and experience with it.

An ADSL ISP uses OpenReach cabling from A to B, you to them so there isn’t much control over the connection it will run on averages and automated systems to govern the speeds.

An LLU ISP can control that ‘box’ at the exchange, so its OR wire from you to it then its under their control which can be a good thing, but it can also bite you in the ass hard!.

Just because the LLU provider can push a few more buttons and tweak a few more things DOES NOT MEAN that they can give you faster and more reliable broadband, take this as a visual example but it needs tweaking:

[![Good_Fast_Reliable]({{ site.contenturl }}the-minimum-loveable-product-8-638.jpg)]({{ site.contenturl }}the-minimum-loveable-product-8-638.jpg)

Ok so these terms are sort of relative; cheap, fast, good…. cost, speed, reliability.

What you want from a broadband connection is speed and reliability (I’m not saying it costs more just skip that for now) now to make a connection reliable besides having good cable and whatnot is a signal that runs on the line SNR or Signal to Noise Ratio.

I won’t touch too much on this because its a broad subject but this quick link is here [WIKI](https://en.wikipedia.org/wiki/Signal-to-noise_ratio) but the following applies after your connection is put in, this isn’t something that can be faffed with before hand.

So you need a good SNR ratio to have a good broadband speed this is where being LLU is good and bad.

<b>Good</b>

If the person your speaking to about your connection speeds checks and sees your line has been stable (no drops) for a while and the SNR hasn’t automatically updated itself, they push it up or down a bit to help with speed (usual things after like monitor as it might start dropping or might loose speed). They actually help you and get it nice and stable and possibly with a speed boost, YAY!

<b>Bad</b>

You call having issues with your speeds and they have been incorrectly taught that changing the SNR on the line is the fix and whack it up (down) to 6db or lower and yes the speed is increased but what you don’t see is the connection dropping out every 12 seconds and re-authenticating so eventually the exchange kicks in and slows your new speed down again to cope for errors, BOO!

So both good and bad examples here, this is why broadband is sold on averages and estimates.

HoW dO tHe IsPs GeT aWaY wItH tHiS?

Easy, that package your signing up to, notice it says ‘speeds up to XX Mb’ legally that covers them and your broadband could be 1Mb on a top of the line FTTC (Fibre to the Cabinet) 80Mb service and there isn’t much that can be done about it till all the lines and junction boxes are replaced and upgraded by OpenReach. (*If you have a cooling off period be sure to keep an eye on that*)

Note: No, the ISP cant jump on OpenReach’s back and get your cabinet upgraded faster, the schedule of upgrades is a very ‘cards to the chest’ thing with OpenReach and they can only give rough estimates and guidelines.

[![Guidelines...Yar!]({{ site.contenturl }}tenor.gif)]({{ site.contenturl }}tenor.gif)

<b>Next stop on the connection speeds train, Wireless.</b>

Ah wireless, this subject is hotter then a hookers door knob on payday.

All ISPs these days send out their ‘standard router’ which will basically get you on the internet, allow some wired and wireless connections. Some let you use your own (excellent) and some lock it down tighter then a ducks a**hole so you can’t use your own (BOO!!).

Its usually free (cost of Post and Packaging though) and it can sometimes be good, I have personally seen testing being done internally on a few different models to ensure people get something half decent where possible and where that juicy contract with XYZ the router manufacturer has gone.

You can sometimes also pay more to them and get a ‘premium’ feel router with more bells and whistles and features that you may never actually use unless your a pro computer user.

Both will still do the same thing, it will connect with details stored inside it to your chosen ISP and get you up and going so this is another area where speed can suffer and as before your broadband service is sold as ‘up to’ and ‘estimated’ on ‘average’ so you could be getting blazing fast 79Mb at the router but then your Kindle connects to the wireless and suddenly you test the speed and it comes out at 15Mb.

When you pay more for the router normally it has a different wireless chip in it and often more then one radio so 2.4Ghz WiFi and also 5Ghz WiFi so that gets you signal around the house in most cases but like everything it will need tweaking. There isn’t much your ISP can do about your wireless its something you will need to trial and error as <b>IT IS DIFFERENT FOR EVERY HOUSE AND FLAT IN THE WORLD!!</b>.

This is why when you call up saying your having slow speeds normally if the person your chatting with is good the first thing they will ask is how are you testing it? if you say on my iPad they will say to test it wired with a computer or laptop. This is because wireless is susceptible to interference and again will need tweaking.

>I remember the story to the OpenReach REIN engineer (Random Electrical Interference and Noise) ((Sidenote: there’s about 5 in the UK, maybe more now, and they are paid a fortune for the magic they do)) who went out to look at someones connection, I don’t know how they did it but they somehow got one to attend. The customer said it happens at the same time every day but there aren’t any of the normal things nearby like Power Lines or Microwave Transceivers so using his detector box he started walking and looking. After some time it turns out that a nearby neighbour had a Blu-Ray player and every day when he sat down to watch a movie the Blu-Ray Player knocked out everyone’s wireless (I think this is why he was sent actually as it was multiple people in the same area). he knocked on the chaps door and explained who he was and why he was there and after some talking found the cause and told the guy about it, I could be wrong this is all third hand and someone else’s memory but they guy said to the engineer ‘oh, shame that.’ and closed the door in his face. There literally isn’t a single thing that could be done about it.

So Interference is a real thing and it will cut into your WiFi just like thick walls around the home, it’s not a tinfoil hat thing anymore its proven real like UFOs now.

You can eventually settle on something that works and gets good speeds and good coverage and that’s all there is to it, we don’t all have cash to burn on top of the line kit…

[![SUB TO LTT](http://img.youtube.com/vi/5aJ2QAO9PZo/0.jpg)](http://www.youtube.com/watch?v=5aJ2QAO9PZo "I REPLACED my $1000 Wifi....")

dat UniFi kit doe *drools in connectivity*.

I hope this helps some people understand some of the happenings in the background of your broadband connection and its speeds. It’s a little complex a subject but I’m happy to help pass on knowledge where I can and if it helps someone then all the better.

<b>Reference:</b>
* [https://availability.samknows.com/broadband/broadband_checker](https://availability.samknows.com/broadband/broadband_checker)
* [https://www.wightcomputers.co.uk/wp-content/uploads/2013/05/openreach-layout.jpg](https://www.wightcomputers.co.uk/wp-content/uploads/2013/05/openreach-layout.jpg)
* [https://www.trefor.net/wp-content/uploads/2010/07/fttc.jpg](https://www.trefor.net/wp-content/uploads/2010/07/fttc.jpg)
* [https://www.digitaltrends.com/computing/wi-fi-problems-and-solutions/](https://www.digitaltrends.com/computing/wi-fi-problems-and-solutions/)


