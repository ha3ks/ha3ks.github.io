---
layout: post
title: "FUD Fighters 8: The FUD of the Furious"
subtitle: "~ LinkedIn Crosspost ~"
date: 2024-09-07
author: ha3ks
tags: FUD OSINT linkedin DNS
category: FUD
---

[![1](/assets/blog/FUD8/1.png)](/assets/blog/FUD8/1.png)

So it's been a while since I really dug into a good 'ol Ambulance Chasing Andy Jenkinson breakdown.

There are reasons for this and I am going to be brutally honest, I am fucked.

I am tired, exhausted, mentally drained, emotionally destroyed BUT at the same time I cannot fail because I am the wall that stops the buck, the lighthouse in the sea of monsters... If I don't do it, no one else will, they simply can't (this isn't just an AJ post thing as a newborn child can beat Andy in explaining security and why his DNS FUD wont work).
Not to toot my own horn or anything but I have a bottomless bucket of will but even that is starting to show signs of a limit...

I don't often let people see what is going on behind the curtain, I'm a man after all and we don't talk about shit, we just bottle it up for years, have a midlife crisis or a heart attack and thats it.

Society is getting better at opening up though, people are being more open and upfront about things but usually it becomes a torrent of abuse from a smaller party that doesn't understand; see the 'im gay' announcements from years ago that would previously have lead to angry mobs with pitchforks (and in some countries still does) whereas in more modern times people are a little more accepting, and this isn't to take anything away from what people are going through and what their experience has been as it will always be a different time and a different story with its own different 'scars' left on people.

Sorry I am getting a little too deep on this one, as above I am fucked.
Andy has been going unchecked for a few weeks now so let's have a little look at what the Number One Expert in Ambulance Chasing has been doing:

[![2](/assets/blog/FUD8/2.png)](/assets/blog/FUD8/2.png)

Ok so the most recent thing is talking about CVE-2024-44000 - [https://www.bleepingcomputer.com/news/security/litespeed-cache-bug-exposes-6-million-wordpress-sites-to-takeover-attacks/](https://www.bleepingcomputer.com/news/security/litespeed-cache-bug-exposes-6-million-wordpress-sites-to-takeover-attacks/)

The good news is this is patched now (so update!!!) but we need to consider Andy's larger post that is only an hour old, he notes that websites are windows into a network.

No they are not, the are websites Andy... they can be hosted on servers in other countries on completely separate networks or an underwater data centre in the middle of the sea, it is not tenement to direct access to a corporation.

It is interesting to note Andy says "Relying on external providers without thorough oversight opens the door to unauthorized access and potential business disruption" when he uses a third party for his email service.... Microsoft:

[![3](/assets/blog/FUD8/3.png)](/assets/blog/FUD8/3.png)

Ohhhhh.

What if ^ this, is why Andy uses '-com.mail.protection.outlook.com' for EVERYTHING to show its not secure because when he saw it and typed it in it came up with errors...

This would be absolutely fucking hilarious for infosec as a field as a whole because it shows what happens when you put the square peg in the round hole when you don't know what you are talking about in the first place.

Would be too amazing if true but lets see what happens.
Next:

[![4](/assets/blog/FUD8/4.png)](/assets/blog/FUD8/4.png)

Yoda, this man is not.

This is a very broad generalization and what he believes is a clear chain of this leads to this which leads to this which leads to EXPOSED POSITIONS!! ~DRINK!

"Unlawful access leads to cyber crime."

Not exactly, unlawful access could lead to Bug Bounty reporting (and payout), patch management, vulnerability testing and updates to security engineering or BPs

"Criminals leads to cyber crime" is actually true and would follow Andy's chain of thought on this post.

Next:

[![5](/assets/blog/FUD8/5.png)](/assets/blog/FUD8/5.png)

I'm not posting the entire thing as its all rhetoric and rubbish but you know exactly where it's going... TFL incident, Exposed Positions, DNS, NHS hacked, Exposed Positions again, get mad at NCSC, vague end about accountability is long overdue.

So we have the usual *some cyber related problem* throw *its Exposed DNS Positions* at it and hope something sticks... excellent work.

Next;

[![6](/assets/blog/FUD8/6.png)](/assets/blog/FUD8/6.png)

Oh boy this one made me laugh, not only is he mad at the FBI he's also bringing out 'ol faithful M-19-01 out to play ~ DRINK!

There was little to unpack in this one but a part that stood out to me is:

> In 2020 we assisted the Federal Bureau of Investigation (FBI) in the run up to the U.S. Presidential Elections. We offered our assistance and were told - unless it's free, we're not interested. Go figure.

That's likely because they are already aware of who you are and what games you play, putting things behind red bars on your screenshots wont help you here,, and since the services are free they are correctly informing you they are not interested in either case.

Also, its the frigging FBI! why would you poke at the FBI? they maintain 'exposed positions' as a way of catching criminals, have you ever seen cyber operations? I'm talking long documented takedowns of key sites and places to corral would-be and actual hardened criminals into a tightly monitored and exploited system or site? are you stupid?

DNSViz and SSL Check screenshots are completely useless to the FBI.

Next;

[![7](/assets/blog/FUD8/7.png)](/assets/blog/FUD8/7.png)

Ambulance Chase your way right into the Telegram CEO being arrested and released on 6Million bail.

> Privacy and Security should be ensured by all messaging platforms. It is NOT.

Does Andy know that Telegram is not a secure messenger, like at all? does Andy know that Facebook (Meta) owns Whatsapp and guess what... not secure at all.

Signal is, like from the ground up actual security, but thats a little too 'high speed' for Andy.

Next;

[![8](/assets/blog/FUD8/8.png)](/assets/blog/FUD8/8.png)

The US Marshals Service ransomware attack... seems like so long ago now.

Andy really likes to highlight things that are red 'x's or errors but rarely reading them or what they do, take the redirection one as it's easy:

```
Here's how the connection to your site usually works. A user wants to connect to your website, and pokes your server with a request to connect. Your server does the responsible thing and sends a 301 Moved Permanently response to the browser, telling it that the HTTP address it requested needs to be redirected to HTTPS. The user continues on as normal, browsing securely. However, an attacker with control over the connection (as is the case with man-in-the-middle attacks) could easily block the 301 response and take control of that user's browsing session. This is a major issue, as it defeats the purpose of encrypting the site in the first place. - https://www.howtogeek.com/devops/what-is-hsts-and-how-do-you-set-it-up/
```

So......... nothing to do with exposed positions or anything normally in Andy's Ambulance Chasing Lane, it's all about MitM attacks.

Good Job.

Next;

[![9](/assets/blog/FUD8/9.png)](/assets/blog/FUD8/9.png)

JESUS FUCKING CHRIST (sorry all) ANOTHER POST ABOUT SOME HORRIFIC REAL LIFE EVENT AND YOU STILL MAKE IT ABOUT DNS AND MISCONFIGURED SUBDOMAINS AND SERVERS?!?!?!

I'm fairly sure at this point we can actually call you 'tasteless' and 'evil' and it's actually ok and socially acceptable to do that, you monster.

I don't want to go further back through the timelines and checking things.

This man is disgusting.

Why LinkedIn and LinkedIn Help don't take his account away because of the misinformation, disinformation and lies he spreads is a travesty for people who actually use the platform for it's intended purpose let along his way of dealing with criticism is to delete comments and change posts to make him look better...

How much longer must this go on?

I'll run out of Fast and Furious films soon and I would like there to be a happy end for all of this.

-------

So that about wraps up this post, I wasn't really sure where I was going with it but when I saw the plane thing,, I lost my stomach to continue.

Things are 'busy' IRL and I may not be able to make many in depth posts and breakdowns right now but remember I am always watching and always protecting.

Be safe and hug your loved ones, tell them you love them.

🤙

-------

I don't have any sponsors or anything but if you enjoy my work, or feel sympathy for my wife, then I have set up a [Ko-Fi account](https://ko-fi.com/ha3ks) as well as a [BuyMeACoffee](https://www.buymeacoffee.com/ha3ks) people can donate to.