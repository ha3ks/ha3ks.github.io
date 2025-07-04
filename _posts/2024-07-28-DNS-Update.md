---
layout: post
title: "DNS Update"
subtitle: "~ Weeklies anyone? ~"
date: 2024-07-28
author: ha3ks
tags: blog updates oscp DNS
category: Blog
---

As many are aware, CrowdStrike one of the biggest EDR suppliers in the world recently pushed out some code that caused an absolute nightmare of epic proportions for businesses... BSOD's here, Bitlocker Recovery there, even Microsoft stepped in to help people getting back online with detailed writeups and guides.

All of this incredibly helpful in the moment.

What isn't helpful? - Ambulance Chasing Andy Jenkinson.

[![eyes](/assets/blog/DNS-update/eyesgrey.jpeg)](/assets/blog/DNS-update/eyesgrey.jpeg)
SOLARWINDS HAS BEEN MENTIONED

If you are playing the ACAJ Drinking Bingo game at home, just consume the bottle and go sleep it off for like a week or something, this is honestly the most tasteless, false narrative, agenda pursuant crap I have ever had the displeasure to be supplied to translate and this entire article is dedicated to the one post. ONE!! - Cripes!

[![1](/assets/blog/DNS-update/1.png)](/assets/blog/DNS-update/1.png)

[![2](/assets/blog/DNS-update/2.png)](/assets/blog/DNS-update/2.png)

There's so much in this I can't even just highlight it as the entire thing would be red but lets take the statements:

> SolarWinds suffered a DNS attack and CrowdStrike worked on the fallout.

Any proof Andy? Specifically that DNS was the attack vector when you know it wasn't as I've seen the post where you admit it was the Orion back end system, in fact screw it I'll paste it in here:

[![3](/assets/blog/DNS-update/3.png)](/assets/blog/DNS-update/3.png)
proof.txt

Yep, Orion. 

Yep, backend. 

Not a thing about DNS but you still tried to make it about DNS and 'insecure' subdomains and 'servers'.

> Since 2021 we have been informing CrowdStrike (and SolarWinds) of their own DNS oversight.

Have you through? You have tipped your hand on this one by showing that your 'informing' of people at companies has been sending them LinkedIn DMs in the vague hope that they aren't busy and will reply to you in an instant.

Most CEO, Fellow, Director, CFO, CTO's are actually busy doing work all day... How you manage to be a big wig at your own company and spend all day on LinkedIn churning up misinformation begs the question 'does any work actually get done or is it all chest puffing?'

> The first attachment below is dated 11 March 2023 at 16:10:52 UTC CrowdStrike had for the first time since inception, secured the Top Level Domain, crowdstrke.com DNS records, servers, and zone.

The proof:

[![4](/assets/blog/DNS-update/4.jpg)](/assets/blog/DNS-update/4.jpg)
DNSViz.net number 1

[![5](/assets/blog/DNS-update/5.jpg)](/assets/blog/DNS-update/5.jpg)
DNSViz.net number 2

Hmmm... 2023 March the 11th, within 5 Minutes CrowdStrike went from 'insecure' to 'secure' without having to wait for any processing...

Let me just spin up 'the machine'

[![tm1](/assets/blog/DNS-update/tm1.gif)](/assets/blog/DNS-update/tm1.gif)
OuttaTime

Would you look at that:

[![6](/assets/blog/DNS-update/6.png)](/assets/blog/DNS-update/6.png)
Revelation 1

It's the exact query you ran and got results for the 'Secure' screenshot, well done Andy! You have proven that CrowdStrike has secure DNSSEC for the domain.

### What about the 'Insecure' one though?

This one I can't find the specific query for, however I can reach out to the owner and query what was ran on that date and time if people want me to.

I can however provide these two screenshots from February and April, meaning that Andy (actually let's give him the benefit of the doubt), SOMEONE has been searching this very specific query in DNSViz to get screenshots that show errors.... I wonder who is notorious for doing things like that with DNSViz....

[![7](/assets/blog/DNS-update/7.png)](/assets/blog/DNS-update/7.png)
04/02/2023

[![8](/assets/blog/DNS-update/8.png)](/assets/blog/DNS-update/8.png)
12/04/2023

Interesting...Next.

--- NINJA EDIT--- 

Found the earlier screenshot, Andy just ran the same thing but followed the 'tree' of DNSEC and just showed off an 'INSECURE' option:

[![ninja1](/assets/blog/DNS-update/ninja1.png)](/assets/blog/DNS-update/ninja1.png)
Confirmation of date/time

[![ninja2](/assets/blog/DNS-update/ninja2.png)](/assets/blog/DNS-update/ninja2.png)
The 'INESCURE' Section which is actually secure, Andy you absolute shed.

> DNS is not widely taught which is a huge faux pas due to potential 'surveillance complications and prevention.'

Going to have to ask for proof on this one.

Perhaps you mean to say it is 'not very well understood'? It is taught as it is 'lumped' in with networking but Andy won't actually do any work into looking into even his own claims.

Attachment 3 is Real-Time and has been shared with CrowdStrike over the last three years on numerous occasions.

Proof;

[![9](/assets/blog/DNS-update/9.jpg)](/assets/blog/DNS-update/9.jpg)
Hmmm.

Ok let's take out another time machine and see if we have better luck:

[![tm2](/assets/blog/DNS-update/tm2.gif)](/assets/blog/DNS-update/tm2.gif)

Oh man this machine is way more fun, talked to some pale bald dude in a black cloth, seems obsessed with being beaten in a game...

[![10](/assets/blog/DNS-update/10.png)](/assets/blog/DNS-update/10.png)
Excellent **Guitar Riff**

Ok so we have the EXACT query that was searched at the EXACT date and time of Andy's evidence, ergo, this is what is under the red line.

Doesn't get more 'real time' then that.

> See CISA Emergency Directive M-19-01 first published in January 2019 or Microsoft CVE-2020-1350 on DNS servers exposure and that carried a CVSS of 10 published several months prior to the discovery of the infamous SolarWinds DNS attack.

~ David Attenborough voice ~

"When backed into a corner, we see the DNS FUD Peddler break out it's familiar M-19-01 defense, with an attack ferocity of 100 and an damage rating of 0."

Also back to SolarWinds being a DNS attack - DRINK!

> Facts can be stubborn things. Nonetheless, there they are and in this case, these Facts are causing chaos, costs and losses in hundreds of $billions, impacting our economies, societies, and dramatically destabilizing national security.

Yes, 'Facts can be stubborn things', they don't bend to your will and can be easily used to influence people to follow your blatant misinformation and FUD Peddling tactics.

Facts are solids and the narrative is what joins those solids.

You don't bend your facts to fit your narrative.

> Undoubtedly CrowdStrike have made errors with the critical of DNS.

Big talk calling out CrowdStrike like that, now yes people have been calling for people at the company to be hung, drawn and quartered because of this BSOD issue but I'm not about that life.

To 'err' is to 'human' and in this case, Yes! It was an error and a failing of the pipeline when it comes to code reviews and testing.... Not DNS Andy also you have just a few lines up proved that CrowdStrike(.)com is secure now... so you can just leave them alone you know...

> In March of 2023 CrowdStrike realized their oversight and addressed the TLDs' DNS records, servers, and zone. Sadly, for whatever reason, CrowdStrike, are seemingly happy to ignore the Facts to address ALL DNS records and servers.

... If you mean 'your' screenshots, when we know you tried to make this up and imply that CrowdStrike listened to you.. actually I called it out at the time too;

[link](https://www.linkedin.com/posts/danmurraysec_whitethornshield-crowdstrike-internetsecurity-activity-7095744798011072512-5Z6m/)

> This leaves CrowdStrike and CrowdStrike clients continually exposed, vulnerable, and insecure.

Go on Andy, provide the evidence.

As this sounds a lot like libel... as its in print, learned that from the first Spiderman movie with Tobey Maguire,

Now I am NOT a lawyer, however CrowdStrike has a pretty sizable legal team being the big huge company that they are, as is Microsoft whom you also take pot shots at all day spreading false information and whatnot.

I think the last few years of posts as well as my work in 'translating' them so people can actually understand and exposing the misinformation would be helpful.

I believe it is FINALLY time for LinkedIn to look into this as it has been ongoing for years and is very clearly someone spreading misinformation and lies.

Let's see what happens going forwards, for now Its Sunday and I want to have some fun.

Stay Dangerous friends.

Station!

[![beexcellent](/assets/blog/DNS-update/beexcellent.gif)](/assets/blog/DNS-update/beexcellent.gif)

🤙

-------

I don't have any sponsors or anything but if you enjoy my work, or feel sympathy for my wife, then I have set up a [Ko-Fi account](https://ko-fi.com/ha3ks) as well as a [BuyMeACoffee](https://www.buymeacoffee.com/ha3ks) people can donate to.