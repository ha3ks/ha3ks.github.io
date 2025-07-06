---
layout: post
title: "HTB Walkthrough - Find The Easy Pass"
author: ha3ks
date: 2023-08-30
tags: blog ctf pentesting re reversing strings walkthrough
category: Reversing
---

Managed to bring this blog post out of the mothballs and get it up.

A quick guide/walkthrough for 'Find The Easy Pass' on HackTheBox

## *Find the Easy Pass:*

Upon opening this challenge you are greeted with the following screen:

[![01](/assets/blog/Reverse_Engineering/HTB-FTEP-01.png)](/assets/blog/Reverse_Engineering/HTB-FTEP-01.png)

Ok, not much to go on, but we can see it has an option to download the relevant files, so lets grab them.

Now I want to point out here that I am not a reverse engineer, yes I have picked and poked at things over the years and I have had some success. Once I download and ran Ghidra and immediately closed it for fear of something new, but alass today I get over that and I actually learn to do something new.

I knew thanks to the unstoppable force that is infosec twitter that 'obviously' the first thing you do when you are looking at an application is run strings on it, so I did:

[![02](/assets/blog/Reverse_Engineering/HTB-FTEP-02.png)](/assets/blog/Reverse_Engineering/HTB-FTEP-02.png)

Now Strings is not the be all and end all of debugging, however I follow many many smart people and from my understanding of this I can see some things that may help me make sense of the program I am looking at.

In the above we can see that there are phrases shown like 'Enter Password', 'Check Password' this gives me hope that we will see 'Password Correct' or similar.

I elect to open the exe in a Test Virtual Machine (safety duh!) and after opening I run the exe and enter a password to be met with:

[![03](/assets/blog/Reverse_Engineering/HTB-FTEP-03.png)](/assets/blog/Reverse_Engineering/HTB-FTEP-03.png)

This again gives me more information to work with and confims the existance of 'Wrong Password' somewhere in the code.

So with a guick search on 'reverse engineering kali tool' I get a result mentioning OllyDbg, now I know I could use something like Ghidra but I want to see how I get on and I can always go back to this and horse around later.

Moving on to install OllyDbg you run:

    sudo apt install ollydbg

(Luckily years of playing around with linux means its easy enough to figure out what the command you want to run might look like)

Because we are looking at an exe file we also need a way to run them in Linux, so lets grab Wine while we are at it:

    sudo apt install wine

Now we have our 'environment' (oh god I can hear the professionals groaning) let's get the file moved to the 'C' drive in OllyDbg.

    cp EasyPass.exe /home/{you}/.wine/drive_c

Finally let's try to open the file in ollydbg:

[![04](/assets/blog/Reverse_Engineering/HTB-FTEP-04.png)](/assets/blog/Reverse_Engineering/HTB-FTEP-04.png)

Ah crap, why didn't it open?

Oh, I see now, A super important part of programming, engineering, hacking... everything! Is reading errors correctly!

It took me a little longer then I am willing to commit to writing to figure out what the issue was, in this case it was missing the 32bit library

[![05](/assets/blog/Reverse_Engineering/HTB-FTEP-05.png)](/assets/blog/Reverse_Engineering/HTB-FTEP-05.png)

A quick little:

    sudo dpkg --add-architecture i386 && apt-get update && apt-get install wine32

And running 'ollydbg' once more and boom, we're away! Let's use the little folder icon and navigate to the exe to open.

The hell am I looking at?

[![06](/assets/blog/Reverse_Engineering/HTB-FTEP-06.png)](/assets/blog/Reverse_Engineering/HTB-FTEP-06.png)

Yes it's 'THAT' screen you have seen in the movies and on the telly box, the hacker screen!!!

Well one of them its missing the black backgrounds and green text but i digress.

I would HIGHLY recommend setting the font so you can read it (also see that 'all' option, use that one so you can read all the windows):

[![07](/assets/blog/Reverse_Engineering/HTB-FTEP-07.png)](/assets/blog/Reverse_Engineering/HTB-FTEP-07.png)

Now that we can read, lets get hunting!

## *Debugging*

So we need to look for our text string 'Wrong Password' as this will likely be where the correct password will be hiding too.

To do this right hand click on the first window and select Search For > All Referenced Text Strings, this will open a new window and show any text strings stored and more importantly right next to each other:

[![08](/assets/blog/Reverse_Engineering/HTB-FTEP-08.png)](/assets/blog/Reverse_Engineering/HTB-FTEP-08.png)

If we double click on 'Wrong Password' it takes us back to the initial screen showing this area in the code and with a little scrolling (like 1 click up) we see the other option of 'Good Job. Congratulations'.

This is the area in the code where the magic happens.

Now I need to expand a little here, I want to give a shoutout to [Eddie Kim](https://cranklin.wordpress.com/), someone who I have followed online for years because of his insane coding skills and good humor, don't beleive me? I can still remember being in my first proper office job and reading his blog on setting up an [automated fish feeder](https://cranklin.wordpress.com/2013/07/13/my-fishy-story/) while he took care of his niece's fish.

Long story short, this blog started me in the odds and sodds of coding I have done over the years (The Jarvis project was sick!) and because I follow him I saw his 'recent' video for 3 Software Cracks :

<iframe width="560" height="315" src="https://www.youtube.com/embed/CrH_iVCnMCk?si=RkOuTLiX6FWGfjH7" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

I've watched this through a few times to learn how things work and while I am not an expert after a little searching I have learned a few things like this:

[![09](/assets/blog/Reverse_Engineering/HTB-FTEP-09.png)](/assets/blog/Reverse_Engineering/HTB-FTEP-09.png)

We can see that there is 'JNZ SHORT EasyPass.00454144'. Now JNZ is a conditional jump so if we click on it and then press return you can see it jump in the code to line 00454144 which is the line for 'Wrong Password'.

Hmmm, it would be interesting to see what happens if we 'skip' that part so the program runs without making the call to the 'Wrong Password' section.

To do this we need to create a breakpoint, this is easy to do in OllyDbg because we can double click on the line:

[![10](/assets/blog/Reverse_Engineering/HTB-FTEP-10.png)](/assets/blog/Reverse_Engineering/HTB-FTEP-10.png)

And hit Assemble to compile missing that condition entirely, notice its greyed out now, we also got rid of the JNZ jump after that and it has filled, I guess you could call it 'condition' of wrong password, with NOP then we just have to run the exe in OllyDbg:

[![11](/assets/blog/Reverse_Engineering/HTB-FTEP-11.png)](/assets/blog/Reverse_Engineering/HTB-FTEP-11.png)

Well, it runs!

Now to enter any password which in theory will now give us the result of 'Good Job. Congratulations'

[![12](/assets/blog/Reverse_Engineering/HTB-FTEP-12.png)](/assets/blog/Reverse_Engineering/HTB-FTEP-12.png)

Huh.

Ok, It didn't give us the expected result of 'Good Job. Congratulations' but look what happened in registers, it's changed. If you look at the bottom you can see where in the file it has taken our input of 'asdasd' and it has forged through the rest of the condition to display the correct password which it is expecting, in this case it's:

    "fortran!"

Well hot damn! lets see what happens if we just take that password and throw it into the origional exe in our totally secure and in no way janky test environment:

[![13](/assets/blog/Reverse_Engineering/HTB-FTEP-13.png)](/assets/blog/Reverse_Engineering/HTB-FTEP-13.png)

Well there we have it. Confirmed correct!

Lets throw it into Hack The Box and complete this challenge. remember you need to enter it in the format Hack The Box is expecting:

[![14](/assets/blog/Reverse_Engineering/HTB-FTEP-14.png)](/assets/blog/Reverse_Engineering/HTB-FTEP-14.png)

Congratulations!

We just limped our way through our first reversing challenge!

All in all for myself, this was a lot of fun, I finally got to get back into the swing of things and learn something completely new (you know while also learning about Cobolt Strike in the RTO training/labs/exam).

I may revisit this post in the future and tack on a bit down here about doing the exact same thing but with Ghidra, it could be easier, it could be a nightmare! I just wanted to get this up to start with and see where we go, it's been a long time since I put fingers to keyboard in the effort to better share my knowledge and experiences so this post is just the ticket to that.


-------


I don't have any sponsors or anything but if you enjoy my work, or feel sympathy for my wife, then I have set up a [Ko-Fi account](https://ko-fi.com/ha3ks) as well as a [BuyMeACoffee](https://www.buymeacoffee.com/ha3ks) people can donate to.