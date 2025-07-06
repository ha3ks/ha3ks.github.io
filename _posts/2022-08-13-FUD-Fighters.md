---
layout: post
title: "FUD Fighters: What is DNS, and why does 'that bloke'​ go on about it?"
author: ha3ks
date: 2022-08-13
tags: FUD OSINT linkedin DNS
category: FUD
---

[![1](/assets/blog/FUD1/1.png)](/assets/blog/FUD1/1.png)

I'll tell thee something I learned a long, long time ago.

When working at a certain Sheffield based ISP.. you know the one with the adverts on the tv with the dude from Lancashire who visited said office one time when I worked there for 4 years and looked miserable as sin... THAT one!

I gained a better understanding of how the internet works, specifically the series of tubes and the hamsters that spin the wheels.

I also learned how DNS worked.
Not all the specifics and little nuances, just enough that if a customer asked about it or was confused what it meant I would be able to explain it to them, confidently (full disclosure I could have been telling them absolute bull 💩 as long I was calm and confident I would have passed any QoS (Quality Of Service) checks, my old TL told me so).

## So What is DNS?

DNS for the uninitiated, stands for Domain Name System. For the initiated it is usually that thing that breaks all the time and people in the 'cyber/infosec' field always make fun of:

[![2](/assets/blog/FUD1/2.png)](/assets/blog/FUD1/2.png)

The way to think of DNS is to think of a Phone Book (this is the analogy I made in 2013 to customers):

> If you want to go to a certain website like google, you just type into your browser google.com and it magically takes you there. That is because our DNS server is taking your request to google and "translating" it to an address or phone number of a server somewhere and pointing you to it.

So a giant Phone Book of internet/server addresses.

## With me so far?

Now we ask why is DNS so important?

All computers on the Internet, from your phone or laptop, xbox and the servers that serve content for massive websites, find and communicate with one another by using numbers (and they said math's wasn't important). These numbers are known as IP addresses. 

As my above, when you open a web browser and go to a website, you don't have to remember and enter a long number. Instead, you can enter a domain name like ha3ks.com and still end up in the right place.

All it is doing is taking 'human readable' names and translating it to an IP Address/server to land on, this is the important part because humans.. are lazy (JK).

Now in this blog post thing I am going to put reference here for further reading because the Linux Hints post below is *chefs kiss* perfect as a way of understanding how things connect, it also talks about specific routes and records to give you a little more info on what things mean.

Reference:

[https://linuxhint.com/dns-for-beginners/](https://linuxhint.com/dns-for-beginners/)

## Why am I posting about it?

Well, lets just say it has come to my attention that someone is rather misinformed about DNS (and TLS1.3 and other things) and seems to think blaming Microsoft is the key:

[![3](/assets/blog/FUD1/3.jpg)](/assets/blog/FUD1/3.jpg)

Now I'm not going to name fingers or point names, if you're on twitter it's pretty quick to find out, but things have gone on long enough, and its gotten to the point that people (even idiots like me) need to step up and say 'No, that's not how any of this works'.

FUD or Fear, Uncertainty and Doubt is a system used by the sellers of Snake Oil and it is used as a way to hijack people into buying their crap, you may also refer to it as 'fear mongering'.

Usually the 'seller' is someone who is experienced enough in the field (or read a few books relating to the subject matter) to know the certain buzzwords or key phrases that people want/don't want to hear and capitalizes on it. They throw a wide enough net to catch any outliners that may not know what the buzzwords mean and scare them into buying.

It's that lowest branch of the 'social engineering' tree and it pains me to liken it to something like that because social engineering (people hacking) can be fun.. Have you seen the film 'Now you see me' It's cool the way they made that French Bank Manager think he was robbing his own bank... Frikkin' cool but they got rid of Isla Fisher in the second movie and explained it away by saying she dumped the guy... that's shoddy writing, but if you can get over it they got Harry Potter to star in it and Woody Harrelson to play his own twin... oh wait... writing again... worth a watch if its free though.

## Fighting Slither Oil, with Brains

This is dangerous territory to be in. You being the person that it proving or disproving needs to keep a level head. You need to take the claims someone is making, and test it to hold them accountable.

Now while I don't have the time to go over the entire DNS system with a fine tooth comb:

[![4](/assets/blog/FUD1/4.gif)](/assets/blog/FUD1/4.gif)

I do recall a certain person peddling a 'billion dollar Cyber Goldfinger weapon' that would output AD users in a GUI made in Visual Basic 5.0 (couldn't get his hands on VB6 like the CSI:NY meme).

It was a hot topic for a moment on LinkedIn and [Daniel Card](https://www.linkedin.com/in/thecyberspy/) tore it down and showed how it worked. Me? I cobbled together a script in PowerShell that did the exact same thing and outputted to a CSV. It cost me maybe 30 minutes of time and I wouldn't have the balls to try selling it when its all free anyway... takes a special A Hole to do that.

But back to our DNS guy.

The best thing you can do, you being the reader of this post, who may have no Idea what DNS is or how the internet works... is to seek education and ask questions to 'known' people in the field.

Education is easy, there are resources on the internet now that didn't exist 10, 20 years ago.. You can learn so much so easily 'its probably worth a google'.

The asking known people in the field though... now that's a tough one because from the outside of the looking glass this person purports to be knowledgeable, confident and experienced and you would be suckered in by them.

The best thing to do is ask multiple people, yes its making a lot of work over 'nothing' but you want to spend your money/time wisely. When you want to do a kitchen remodel do you go to the first guys you see or do you shop around?

> Let your money do the takin' and feet do the walkin'

I am more then happy for people to reach out to me and ask questions, I try to answer everything I can and if I can't I will always refer onto others. It's all about being a better person and building better friendships.

Peace <3

🤙

-------

I don't have any sponsors or anything but if you enjoy my work, or feel sympathy for my wife, then I have set up a [Ko-Fi account](https://ko-fi.com/ha3ks) as well as a [BuyMeACoffee](https://www.buymeacoffee.com/ha3ks) people can donate to.