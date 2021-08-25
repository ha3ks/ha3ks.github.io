---
layout: post
author: Dan Murray
title:  "You did all that, for a free T-shirt?"
date:   2020-03-04 12:00:00
disqus_identifier: "14 http://ha3ks.tech/blog/?p=14"
---
Yup.

Yup sums it up quite nicely.

If you aren’t aware or have been living on Mars; Computer Security, Identity, Freedom and Human Rights are being violated left right and centre.

This was brought more to my attention with all the stuff going on in China with the Corona Virus (COVID-19) (side note: Fuck me, are they or arn’t they telling the truth about the numbers of dead with buildings being sealed etc), as well as Edward Snowdens book ‘Permanent Record’ (though being honest, yes he brought it to our attention with evidence but we all knew it was going on anyway, to what extent and how deep the rabbit hole went, fuck knows).

<!--more-->

So I figured it was time for myself to give back to the internet that ever so lovingly made me who I am and taught me the things I’ve learned over the years.

How best to do this?

* A personal blog? (I don’t get a lot of hits 😥 ).
* Writing on Medium.com?
* Creating Educational Videos for all to view on YouTube but get flagged for copyright so start uploading to PornHub (Shoutout to [@notdan](https://twitter.com/notdan) btw, he’s hilarious).

What could I do? Well.. I learned something and now I’m going to share it with you.

…

<b>SETTING UP A TOR RELAY FOR DUMMIES</b>

Yes, Tor. That thing that thing that West Midlands Police (and the probably copied/rubber stamped NCA logo to make it look official) warned parents about their children in a recent Twitter/News fiasco;

[![Whas_on]({{ site.contenturl }}whats_on.jpg)]({{ site.contenturl }}whats_on.jpg)

<b>“Can you jam with the console cowboys in cyberspace?”</b>

Firstly, yes this poster is absolute garbage and the backlash from the IT Security and Infosec crowd has been absolutely delicious (send me all your memes!!) and the end result? all that has happened is some parents got more scared of their children for using Discord (Game chat app) and whoever commissioned, approved, released and subsequently disappeared off the face of the earth was WRONG!

There are umpteen numbers of reasons that this stuff might be on a machine and its not all doom and gloom.

I can understand where they were coming from, as in they would likely steer wayward children who might be going a black hat route to become white hats and earn a fuck load of money, legally. The way they have done it though, hundreds upon possibly millions of others would be collateral damage from this spectacular mis-fire (probably shouldn’t have mentioned Discord,, you know that game chat app *twists the arrow in their knee a little*)

Bravo West Midlands Policing for this ‘physical piece’ of click bait, thats all it is, it’s just printed out click bait to grab attention and bring new suspicion to kids, I wonder how much of a spike in the google search history was on that day for the items mentioned…

I digress, we want to get back on track to all the hot sexy illegal stuff, yesh yesh,, oh wait,, it’s not illegal,, it might still be hot and sexy but thats down to opinion.

<b>What is Tor?</b>

>The Tor project is a non-profit organisation that conducts research and development into online privacy and anonymity. 
>It is designed to stop people – including government agencies and corporations – learning your location or tracking your browsing habits.

Thats a legit quote, I just copy pasted it and can happily point you to Wikipedia for more info, but in this case I’m not going to, ill let your fingers do the walking.

Tor (software and browser), itself isn’t a bad thing, its what a subset of people do with the anonymity that Tor can provide is the bad thing.

In recent yor the notable thing I can think of from the bad side (basically “the” bad thing) would be the Dark Web, thats what should have been on that poster. Thats the place where any number of things you might want to search for can be found and bought… its not good and I will admit I have accessed it once to query the rabbit hole (back in its hay day) and after finding what can be bought I promptly logged out and microwaved the hard disk,,, fuck that noise!

I did enjoy the piece that Wired did on the rise and fall of The Silk Road, [Part 1](https://www.wired.com/2015/04/silk-road-1/) and [Part 2](https://www.wired.com/2015/05/silk-road-2/) Amazing work and covering just about all I can recall from the events and the Mirth around it.

The thing I am focussing on here however it not illegal activity, it is being a network engineer of sorts. I’m going to put together a relay to help hold up the network. I did query an exit node but thought to myself it might be too much hassle and I didn’t want people to think I was doing illegal stuff <b>*continues torrenting latest episode of South Park*</b>

<b>Why do it?</b>

Long story short, I’m trying to be a nice guy, the internet has been kind to me so far and I wanted to give back.

Also;

[![knowmore]({{ site.contenturl }}knowmore.gif)]({{ site.contenturl }}knowmore.gif)

Heck yeah I wanted to know more. I also wanted to see if I had what it takes to quickly pick something up and push it out to ‘production’ in a timely manner <b>#selfimposeddeadlines</b>

<b>How did you do it?</b>

I am lucky in the sense that I am a nerd and I have lots of nerdy things around me including old computers, in this case, a Laptop.

I got this HP laptop years and years ago, maybe 2008? when it conveniently fell off the back of a lorry (thats slang for legitimately purchased at discount from a company that either over ordered or went bust). After gifting it to my Mrs years later I have found it once more whilst I am sans laptop at the moment and figured ‘you can run anything on old machines (media servers, nas etc) so Im going to whack Ubuntu (gnome for no reason) on it and keep it as a Linux machine.’

This became my key to running my Tor Relay on it also.

I am going to briefly outline the steps I took with this because, if you want to set up a relay or exit node, your milage will vary as all machines are different.

The guide I followed in this process was this: https://helpdeskgeek.com/how-to/how-to-set-up-your-own-tor-relay/

It was that simple, google set up tor relay and boom your away, again I’m not going too deep into this part because it will be different for everyone.

IMPORTANT SIDE NOTE: Make sure you come up with a kick ass name for your relay, my example was from the film Titan A.E. (good film) where Cale calls the recently created/terraformed planet, Planet Bob (The New Earth) – <b>SPOILER</b> – Earth (Prime?) gets screwed in the film.

The relay I was hoping to become was a part of this process thanks to the ‘arm’ command (<b>Anonymizing Relay Monitor</b>) which actually finished off some setup I believe I had missed first time and allowed me to also monitor the traffic directly on the machine;

[![Initial]({{ site.contenturl }}initial.png)]({{ site.contenturl }}initial.png)

Initial ARM load screen

[![Running]({{ site.contenturl }}running.png)]({{ site.contenturl }}running.png)

Running happily away to itself

Oh and again this probably wont happen to you but every so often I would check the machine and be greeted with this mess;

[![Error]({{ site.contenturl }}torerror.png)]({{ site.contenturl }}torerror.png)

Ah yes, that was the problem… it so clear to me now.

hitting any button cleared it back up again.

You can monitor your relay on the following link;

https://metrics.torproject.org/rs.html

You would just need the name of the relay or the unique fingerprint ID

<b>Thats good but what about them errors tho?</b>

I did have errors to start with, I only noticed these after a few hours of the relay being up as I had to let it get settled in, long story short and after every tech support persons favourite fix buddy Google (Stack Exchange is a very close second for me at the moment) I found that some lines in my torrc file were incorrect, I have supplied the appended full part of my file below;

> ORPort 443
> DirPort 80
> Exitpolicy reject :
> Nickname ieditedconfig
> ContactInfo human@
> AccountingStart day 0.00
> AccountingMax 512 MBytes
> RelayBandwidthRate 5120 KBytes
> RelayBandwidthBurst 10240 KBytes
> DisableDebugger- Attachment 0

Another error I had was actually that the version of Tor my machine was running was out of date, i don’t have a screenshot of it so just imagine where it says (Linux 4.4.0-173-generic) as a red block of 2.2, this was resolved by good ‘ol apt-get install tor (surprisingly) and then apt-get update.

<b>What did you learn?</b>

* Old Laptops are old for a reason, technology moves so fast man, so fast. I can see this laptop getting formatted in the future and another copy of Ubuntu going on it for my son (or Kali, lets stir that pot a little more).
* The Tor project is <u>actually a good cause.</u>
* You can do a lot, with a little.
* Nobody cares about your stupid diet.

<b>Why is this post going on about a free T-Shirt?</b>

I was getting to that, The Tor Project, because your helping out and being a nice guy (or gal) they do have a sort of ‘[rewards program](https://2019.www.torproject.org/getinvolved/tshirt.html)‘ where you can get some free swag if contribute to the project, the most common two ways are;

1. Operate a fast [Tor relay](https://2019.www.torproject.org/docs/tor-doc-relay.html.en) that’s been running for the past two months: you are eligible if you allow exits to port 80 and you average 250 KBytes/s traffic, or if you’re not an exit but you average 500 KBytes/s traffic.
2. Help out in [other ways](https://2019.www.torproject.org/getinvolved/volunteer.html.en). [Maintain a translation](https://2019.www.torproject.org/getinvolved/translation.html.en). Write a good [support program and get a lot of people to use it](https://trac.torproject.org/projects/tor/wiki/doc/SupportPrograms). Do research on Tor and anonymity, solve some of [our bugs](https://bugs.torproject.org/), or establish yourself as a Tor advocate.

Would it be cheaper just to buy a shirt and not crap on the electric bill for pennies a month? sure. To make things even easier and cheaper for myself you can actually run a really good relay/node on a [Raspberry Pi model 2/3](https://www.instructables.com/id/Tor-Relay-on-Raspberry-Pi-2/).

<b>Seriously?</b>

Yes, for the sake of a little of my bandwidth which I ‘donated’ to a good cause, giving a little bit of support to the series of tubes (in my case being a relay guy) that is allowing people in harsh regimes, countries with little or no broadband or political shutdowns of public internet and who knows what else.. a chance, even the tiniest of chances to become ‘unknown’/’hidden’ and to get their voice out of the black, or learn something new that may help, help could even be on the way.

…

Also a sweet ass free Tor shirt <b>#represent</b>

[![Shirt]({{ site.contenturl }}roots_black_metallic.jpeg)]({{ site.contenturl }}roots_black_metallic.jpeg)

(also the torrenting thing was a joke, sort of, I do torrent stuff but not stuff that can lead to my ISP giving me a warning email and then not doing anything about it ((which they are not legally obliged to do they just send you the warning then sinkhole the warnings from the copyright holder)). this was an internal joke from a former role I worked at where we would always see people grabbing the same episodes and swearing blind it wasn’t them – <b>SPOILER</b> – it always was).
