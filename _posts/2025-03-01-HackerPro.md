---
layout: post
title: "ToolTime - HackerPro"
author: ha3ks
date: 2025-03-01
tags: blog pentesting HackerPro
category: Tooling
---

Hey Friends, Lately I've been taking a look at some of the older tooling that we have available as pentesters so I thought I'd have a look at one that I discovered recently, well that's been around for years actually called HackerPro.

## The Tool Itself

[![2](/assets/blog/HackerPro/1.png)](/assets/blog/HackerPro/1.png)

HackerPro is not what the name implies 'a one stop shop for running all your ops' like he would have with Metasploit, Hackertools Pro is more an 'installation service' so you select the items that you want from the menu press the relevant buttons and boom instals that application for you.

This reminds me of the time that I would run [Weaponize Kali](https://github.com/snovvcrash/WeaponizeKali.sh) by [SnovvCrash](https://x.com/snovvcrash) when I got new instals of Kali Linux on the go.

Would it be faster to run just 'sudo apt install nmap' or something like that? Probably yeah, it would be a lot faster but at least this is a more convenient package for people looking to get some relevant tooling installed quickly.

I must admit, the system itself does require an update. It would be better to import it from Python 2.7 to Python 3.12 or whatever the latest one is right now but it does need a chunk of refactoring, I tried to do it in VSCode fixed a bunch of print() errors, then I tried ChatGPT and it complained about file size...

## Installation

For this particular brand of installation we're going to do it via the Windows Subsystem for Linux which basically all Windows computers now run (though it may need to be enabled in 'Turn Windows Features On or Off') so it means you don't necessarily have to spin up a virtual machine every time you want to run this you can just do the following to quickly put together a quick little Ubuntu instal:

## Install Windows Subsystem for Linux - Ubuntu
```
wsl -install -d ubuntu
```
Create account for Ubuntu and once logged in, make sure to upgrade it to the latest version
```
sudo apt-get update && sudo apt dist-upgrade -y && sudo apt autoremove -y
```

## Python 2.7

Now for this particular project we need an older version of python so we're going to instal version 2.7:

To do so you need to run the following commands:
```
sudo apt-get install build-essential
wget https://www.python.org/ftp/python/2.7.18/Python-2.7.18.tgz
tar -xvf Python-2.7.18.tgz
cd Python-2.7.18
./configure --enable-optimizations
make
sudo make install
```

## Install HackerTools Pro
```
cd ~
git clone https://github.com/jaykali/hackerpro.git
sudo cd hackerpro 
chmod +x install.sh
sudo ./install.sh
*Follow the onscreen instructions to install*
```

That is quite literally as easy as that, anytime you want to run HackerPro and install certain applications you can do so just by typing in 'hackerpro' While inside your WSL Ubuntu system.

I may look at doing a complete refactoring into a later version of python and putting it on my Github or something like that but for now I just wanted to bring people's attention to a slightly lesser known tool well installation tool and see how people get on with it other than that enjoy.

Peace

🤙

-------

I don't have any sponsors or anything but if you enjoy my work, or feel sympathy for my wife, then I have set up a [Ko-Fi account](https://ko-fi.com/ha3ks) as well as a [BuyMeACoffee](https://www.buymeacoffee.com/ha3ks) people can donate to.