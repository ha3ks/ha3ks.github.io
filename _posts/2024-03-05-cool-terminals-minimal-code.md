---
layout: post
title: "Cool Looking Terminals with Minimal Code"
subtitle: "~ Busy ~"
date: 2024-03-05
author: ha3ks
category: blog post
tags: blog updates
finished: true
excerpt_separator: <!--more-->
---

Hey friends, I know it's been a while and truth be told, work has been busy.

The Christmas Rush, the post Christmas 'sell your old stuff/unwanted presents' rush, passing my probation period at work, earning a bonus... all sorts.

Even managed to get some FUD Fighting in there with Mr DNS blaming DNS on everything again as always.

<!--more-->

I wanted to take a moment, to relax, calm down a little and refocus.

I am now the proud owner of 2 laptops again, one for work and one for play (though I need to replace my aging gaming laptop and move away from VMware, damn you Broadcom).

So I freshly paved my gaming laptop the other day, not for selling it, just to purely 'refresh' and start over.

I always set up the same way so nothing much changes through I have streamlined my app installs and wanted to share how I customise my terminal.

Windows 11 has the new version Terminal installed by default, Windows 10 you can grab it from the app store and by default it'll look like this:

[![1](\img\blog\cool-terminals-minimal-code\1.png)](\img\blog\cool-terminals-minimal-code\1.png)

I like mine to have a little more sizzle to look something like this:

[![2](\img\blog\cool-terminals-minimal-code\2.gif)](\img\blog\cool-terminals-minimal-code\2.gif)

I know right, the colours, the icons and suggestions *chefs kiss*

So here's a quick and dirty 'how to'

First we are going to want to get the newset hotness, Powershell from Microsoft. Personally I got mine from the Microsoft Store:

[![3](\img\blog\cool-terminals-minimal-code\3.png)](\img\blog\cool-terminals-minimal-code\3.png)

After that open Terminal and set Windows Terminal to the default terminal and Powershell (The New one) to be the default Profile that get's loaded:

[![4](\img\blog\cool-terminals-minimal-code\4.png)](\img\blog\cool-terminals-minimal-code\4.png)

After that I like to install a custom font which includes glyphs (symbols and shapes to make the prompt look less broken):

[![5](\img\blog\cool-terminals-minimal-code\5.png)](\img\blog\cool-terminals-minimal-code\5.png)

Now the fun part, we need to install some extras (ph-my-posh, PSReadLine, TerminalIcons) and then set up our Prompt to display these when it initally loads up, it's 'Profile'

So in Powershell run:

```
winget install JanDeDobbeleer.OhMyPosh
Install-Module -Name Terminal-Icons -Repository PSGallery
Install-Module PSReadLine -AllowPrerelease -Force
```

Then run $PROFILE or notepad $PROFILE and paste in the following:

```
oh-my-posh init pwsh | Invoke-Expression
Import-Module -Name Terminal-Icons
Import-Module PSReadLine
```

After that save the file Ctrl+S and then close notepad and reload the terminal and, by default you should see the following:

[![6](\img\blog\cool-terminals-minimal-code\6.png)](\img\blog\cool-terminals-minimal-code\6.png)

Next up to add the suggestion history as a dropdown you can select from, run $PROFILE or notepad $PROFILE and paste in the following on the end:

```
Set-PSReadLineOption -PredictionSource History
Set-PSReadLineOption -PredictionViewStyle ListView
Set-PSReadLineOption -EditMode Windows
```

So you should have something similar to this at the end:

```
oh-my-posh init pwsh | Invoke-Expression
Import-Module -Name Terminal-Icons
Import-Module PSReadLine
Set-PSReadLineOption -PredictionSource History
Set-PSReadLineOption -PredictionViewStyle ListView
Set-PSReadLineOption -EditMode Windows
```

Now save the file, reload terminal and watch your terrible spelling mistakes haunt you forever.

I find this super helpful for commands I run often like when I am 'previewing' the blog as I use Rubygems and Jekyll so I can very quickly get the right command:

[![7](\img\blog\cool-terminals-minimal-code\7.png)](\img\blog\cool-terminals-minimal-code\7.png)

And then when I save the document I am working on it rebuilds and upon refreshing the browser I can see the changes I made... no more updating GitHub 15 times because I keep breaking the images.


I hope some people find this helpful.

🤙

-------

I don't have any sponsors or anything but if you enjoy my work, or feel sympathy for my wife, then I have set up a [Ko-Fi account](https://ko-fi.com/ha3ks) as well as a [BuyMeACoffee](https://www.buymeacoffee.com/ha3ks) people can donate to.