---
layout: post
title: "Technical writing, am I good at it?"
subtitle: "~ Technical writing ~"
date: 2023-08-03
author: ha3ks
category: blog post
tags: blog writing linkedin
finished: true
excerpt_separator: <!--more-->
---

Recently I made an article on LinkedIn, I've done a lot of these over the years I have had an account with them and speaking generally the articles are well received.

People actually like to comment on them, share them and react to them, it's a good feeling when something you have spent some time working on is appreciated by your peers.

Now for the first time someone has commented commending me on my Technical Writing skills.

I never thought I had this skill.

<!--more-->

## The power of Words.

I've never been a cunning linguist, infact I tell a half truth here, I actually did well for 'middle' levelling in my GCSEs for English, so much so I actually did it as one of my choices for my A-Levels (16-18 year old in the UK, in my case I did 16-19 and spent my 'gap' year between secondary school and Uni getting more UCAS points so I could definately go to University #firstinthefamily).

My A-levels went well.

Least I think they did...

Turns out that 3 hour exam where I did so much writing I actually needed a 2nd book, resulted in a double 'U' grading at A-Levels

### FUCK

Yeah that's what I thought, I tried to inquire into this by going to the head of 6th form saying 'there must be a mistake becau...' and I was met with her walking out, looking me dead in the eyes and telling me 'It's your fault that our pass rate curve is broken, yours'.

Well that immediately rubbed me the wrong way and I didtinctly remember telling her 'never mind, c ya' and walking away.

It's been decades now so I've just lived with the two 'U's and said Fu*k it!

## Why are you telling me this Dan?

Well to get back on track, technical writing, turns out I have a bit of a knack for this, I can take the complex and translate it for anyone to follow:

![Tweet](\img\blog\technical_writing\Tweet.png)

Speaking of which I wanted to make a backup of the post, just incase people try to pull it down.

So here we go the article hot off the LinkedIn press, and what do you think? is this a good example of technical writing (least in the beakdown parts).

-------

# 'Smoke and Mirrors' - How Snake Oil peddlers Con Companies and Steal Money

![Article_Banner](\img\blog\technical_writing\andy-banner.jpg)

You will want to put the kettle on for this one, it's a doozy.

## Preamble:

For those who know, I've been in the 'biz' for a while now. I'm entirely sure these posts show the kind of dedication to the cause I have but for a quick recap.

Some dude on the internet 'essentially' blackmails small companies into paying him to secure their services *spoiler, he doesn't he often leaves them off way way worse*.

I first came across him after someone I follow shared his post and disproved his claim within about 5 minutes flat.

I looked into said dude and found he has a long history of pulling this crap.

I started to comment but got shut down so I watched and decided to pop out an article as a warning to folks.

[FUD Fighters: What is DNS, and why does 'that bloke'​ go on about it?](https://www.linkedin.com/pulse/fud-fighters-what-dns-why-does-bloke-go-dan-murray)

This article surprisingly got a lot of attention. I broke down how DNS works so anyone can understand it and then went on to explain what FUD (Fear, Uncertainty and Doubt) is and why it is used to sell people modern Snake Oil Miracle Cure Potions.

Fast forwards a little and the people got big mad at it. so out came article the second:

[FUD Fighters : 2Fast 2DNS](https://www.linkedin.com/pulse/fud-fighters-2fast-2dns-dan-murray/)

This one more focused on when a child is told 'no' and they run off to their parent so the parent steps in and does some shouting and threatening expecting to get things their way... then don't.

Then things went quiet for a while...

All was bliss and wonder till I clicked on an old bookmark I had for a certain hashtag search query on LinkedIn and I found that the parent from above had maliciously attacked me while they blocked me (so I can't fight back), not only that but they were tagging people and companies left right and centre to make as much noise and fuss as possible to show that the toys had all officially been thrown out of the pram and if they are going down they are taking down as many good people as they can with them.

Step in Article 3, my response to this attack.

[FUD Fighters 3 - Tokyo DNS](https://www.linkedin.com/pulse/fud-fighters-3-tokyo-dns-dan-murray/)

Contained within is also an interesting point about the people who always comment on his posts, or share them... so many followers/sock accounts all fanning his vanity as the defacto expert on DNS and why he wins all the awards he pays for.

I also pointed out that these 'people' are all a copy of the other, lofty C types no actual employer in their history you can search for, all they do all day is share each others misinformation and clamor to approve others... peculiar.

Well strap in because it's time for article 4 in this series.

## Crap, I normally Fast and Furious these things... wasn't 4 set before the first one so technically time travel?

Yes it's time to get this one rolling and we are going to take a look at the site he uses most (besides google for new computer threats he can claim are DNS *see MoveIT, cl0p, anything really*.)

Step in [DNSViz.net](https://dnsviz.net/)

## What does DNSViz actually do?

What does DNSViz actually do?

> DNSViz is a tool for visualizing the status of a DNS zone. It was designed as a resource for understanding and troubleshooting deployment of the DNS Security Extensions (DNSSEC). It provides a visual analysis of the DNSSEC authentication chain for a domain name and its resolution path in the DNS namespace, and it lists configuration errors detected by the tool. 

Name on the tin, pop in a domain name and this tool will do some work checking the DNSSEC of the domain and give you results and a graph showing how things connect/spider to eachother.

Simple and clean, I love it when you have a simple tool that does the specific thing you want, if it ain't broken don't fix it.

## Why does Andy always show results with errors?

Interesting isn't it? Every time something new comes out as being a problem Andy is right there on the bleeding edge with all the screenshots, all the 'proof' and all the hate towards Microsoft for not updating 'their' DNS Servers and his following laps it up and shares it and comments why he's a genius and you must be snubbed by Microsoft because you always point out they are wrong.

Bleh, idiots.

## The Game afoot

So what do we need to do in order to disprove the biggest tool in the box, I mean biggest website in this tool *wink*, is show what happens when you use tools wrong;

![Wrong tool Fool!](\img\blog\technical_writing\tool.jpg)

How can we 'influence' DNSVis to show us errors?

Well our lord and savior [Gary Cox, CISSP](https://www.linkedin.com/in/gcox1/) pointed this out on one of my previous posts explaining why is happening:

> As I know you are all detail oriented folks here is the methodology… he tests a domain name that contains the text of whatever company he wants to call out, but without actually being a domain name that's related to the company in question. These are NXDOMAIN responses, and so in addition to showing no DNSSEC security (because it's Microsoft and they haven't secured outlook[.]com) it also contains a bunch of errors related to nonexistence. He then redacts everything except the company name and posts it as if it's relevant.

I ran my site through DNSViz because I am a badass, also to help prove this point:

![ha3ks.com its awesome 9 out of 10 dentists agree](\img\blog\technical_writing\ha3ksDNS1.png)

As you can see above, secured, updated and the Warnings are for "DNSSEC specification prohibits signing with DS records that use digest algorithm 1 (SHA-1)." so more modern only, super cereal secure.

All good right?

Let me try something...

!["You've got Red on you."](\img\blog\technical_writing\ha3ksDNS2.png)

Well I'll be darned!

I simply added some red lines to my site in DNSViz and suddenly there are new failures and errors 😱😱😱

## HOLY CRAP IS HE ONTO SOMETHING?!?!?!?!

Huh?

The wha?

Oh I'm sorry.

It's a smear on the lens let me get that off for you *licks fingertip and rubs*

![Eh, best I can do, must be on of them, permanent markers he uses...](\img\blog\technical_writing\ha3ksDNS3.png)

Well that's weird isn't it?

Seems that by adding some extra gunk onto the domain name it brings back some errors and people who don't know how DNS resolution works would probably soil their trousers looking at red 'Errors' and yellow 'Warning' messages.

It seems you can type anything you want into DNSViz and whack '.mail.protection.outlook.com' on the end and it'll give you a variety of errors.

## Game afoot? Nah let's play a game!

Let's take a recent-ish post from from Andy:

![Don't worry, I used DNS to get this screenshot, he will never know!](\img\blog\technical_writing\schwab1.png)

And his screenshot:

![urgh, even the screenshots are ugly, where's the class and pizzaz](\img\blog\technical_writing\schwab2.png)

Now lets run the address plus '.mail.protection.outlook.com', removing Andy's red mark:

![Dat timestamp though, almost like its an unique identifier for when that specific query was ran ...... 👀👀](\img\blog\technical_writing\schwab3.png)

Hmmm.

Now one more, just the actual domain none of that extra crap:

![Tada!](\img\blog\technical_writing\schwab4.png)

It's actually 'secure'.

Elementary my dear reader this case has been solved.

![Sherlock and Elementray were damn good modern interpretations of the story, also Johnny Lee Miller is HOOOOT! and suprisingly shirtless a bunch in it.](\img\blog\technical_writing\elementray.gif)

```
"The cat's out of the bag Mr. Turner" - Davey Jones, Pirates of the Caribbean: Dead Man's Chest 
```

Now you know how it works.

The secret sauce to his Snake Oil and how his grift works, least this explains why every thing in the entire world he blames on Microsoft because Outlook is a Microsoft product and because now he can trick people into believing him.

## Why does he have a hard on for Microsoft though?

Honestly, no clue.

It's not like Microsoft invented DNS, that was [Paul Mockapetris](https://www.linkedin.com/in/paulmockapetris/) - [Paul Mockapetris - Wikipedia](https://en.wikipedia.org/wiki/Paul_Mockapetris) so why doesn't he 'have the face on' to Paul?

Is it because Microsoft is a big 'faceless company' that he can shout at all day and they can ignore because it's really easy to ignore him?
Was he carrying his lunch plate to the table and Microsoft tripped him up so he fell over spilling his plate of food and making a big mess on the floor while all these Cisco, Dell and HP servers that had Microsoft badges stood around silently laughing at him with their big massive server cabinet selves?

Who knows.

Handily its not like this is trade secrets or anything, its just futzing DNSViz to show errors and calling it a day.

## Why don't more people speak up?

This is a tough one, you see people do call out his tactics. I have proof that he will just say 'thanks' as a statement to close down a comment thread on a post and move onto other comments where he can get the last word in and 'win'.

If you become a nuisance to him like for example commenting on each of his posts as they come up questioning things like 'how did the malware get into the machine'. he will just block you and then continue spreading his misinformation and FUD to capture more victims and steal their money.

### Side Rant:

Why does his company site have 4 employees:

[Cybersec Innovation Partners](https://www.cybersecip.com/about-cip)

Yet companies house shows they all resigned and moved on:

[Companies House](https://find-and-update.company-information.service.gov.uk/company/11465050/officers)

why doesn't the site get updated to reflect this? If he is too lazy to change the site, what else is he slacking off on?

And before anyone chelps up, this is public information. Not illegal or nefarious, you can even see their money under the 'Filings' tab.

Very weird.

### Back on track now

I have several unconfirmed reports (I can't confirm them because that would involve finding the people/companies and interviewing them, getting permissions and forms signed) of his actions.

Of the few brave that have spoken up they are now scared to <u>publicly acknowledge</u>, like or comment on my posts on these matters <u>for fear of Andy finding out and then hounding their current employer claiming that they are bullying him when infact they are clicking 'like' on an article or a post</u>.

I had to underline the above to really stress the point, he's <u>scaring people</u>, <u>good people</u>, <u>professionals</u> in this field into submission.

That's being a <u>bastard</u>.

One action does not equal another, and people can like and comment on whatever they want as it is their right to think and do what they please. Do you think he goes on Facebook and when people react with heart emojis to posts he goes and gets stroppy with them too?

You can't control everyone and <u>you can't harass women Mr Jenkinson.</u> - Oh yes, I've been told about that one too, and others...

## Why am I unafraid of this?

Honestly, I've been like this my whole life, I'm the wall that stops the buck, the light in the darkness, the person who stands when others can't.

Let's grab a gif that explains it.

![You and me both Cap.](\img\blog\technical_writing\icandothisallday.gif)

It doesn't effect me, like at all.


I have no current employer and any employer in my history isn't going to give two s**ts about the things I say on the internet as they know I am direct, correct and more importantly, no longer their concern.

I mean when it comes to an internet throw down of fact and fiction, who would you pick?

The person who looks into things and comes up with absolutely amazing articles, memes, friendship and advice + teaching for free!

Or

The dude with the tinfoil DNS hat <u>who misspelled Microsoft on his own fud peddling article which has his own companies headed paper</u>?

![Credit to 'Microsoft DNS server 6423' for sharing this to me.](\img\blog\technical_writing\microsft.png)

I rest my case.

Well, for now anyway, I'm entirely sure Andy will get the face on with me again now and possibly even get Alister to construct another hit piece on me (seriously check out that Tokyo DNS article, it's a heavy hitter).

My thoughts;

![Caption says it all doesn't it.](\img\blog\technical_writing\shame.gif)

## Final thoughts

Well to finish this one off I wanted to explain why I have written things the way I have.

I have a weirdly 'educational' way of writing things, very logic based and simple to understand and share, kinda an offshoot of how Randall Munroe does things in XKCD with 'Thing Explainer' - Randall Munroe's 'Thing Explainer': the smartphone [WIRED UK](https://www.wired.co.uk/article/xkcd-thing-explainer-smartphone).

I want to make my brain farts accessible to everyone so anyone can understand what is happening and specifically why it is happening.

Exposing charlatans is one thing, but being able to explain it in a way that a person can tell another person clearly and easily, and they can tell someone, and they can tell someone, its a good system.

If Andy wanted to 'come clean' and show everyone that he is infact a good guy he would share the screenshots without any redaction, I've just shown it's not trade secrets or anything.

That we can all see that he definitely isn't just playing nice to smaller companies and then charging a fortune for a report.

....

In the meantime I'll keep doing what I do, working to get a role and work my ass off when I get there.

I have dreams you know.

I actually want to work for Microsoft (awaits Andy's post saying that I am bias because I want to work for the company that he hates).

I want to get a role there and grow as a person and as a developer or as a hacker helping keep the internet secure for everyone.

### Will I get there?

Dunno, I mean hopefully right? hope don't stop the wheel from turning.

But that's my dream and what I am working toward.

Though if you work at Microsoft and think I am a 'cool guy' feel free to reach out and maybe we can work something out 😉

-------


I don't have any sponsors or anything but if you enjoy my work, or feel sympathy for my wife, then I have set up a [Ko-Fi account](https://ko-fi.com/ha3ks) as well as a [BuyMeACoffee](https://www.buymeacoffee.com/ha3ks) people can donate to.