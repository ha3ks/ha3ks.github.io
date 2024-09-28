---
layout: post
title: "Code to solve problems"
subtitle: "~ Code ~"
date: 2024-09-28
author: ha3ks
tags: blog python code kiss
finished: true
---

I'll be the first to admit, I'm not a very good programmer.

I mean, yeah, I did go to University to do programming and you know the end result of that, I never got a job in programming... We did Visual Basic and Java (Not Javascript) SQL and some other bits that I can't recall.

The SQL was the thing that got me my first job, working in an EPOS company debugging broken till systems, reprinting receipts and doing price changes (or finding half a million pounds in unprocessed card transactions). Just a handful of custom SQL scripts;

[![1](/assets/blog/code-to-solve-problems/1.jpg)](/assets/blog/code-to-solve-problems/1.jpg)

Other then that, with exception to figuring out GreaseMonkey when I worked as a call taker to ensure my tickets were always right and the customer always got the correct information/faults raised (and so I hear these are still used to this day without my permission) I haven't done much 

# The Problem

I recall a while ago I had a very large list of URLs to run through and see what is valid still and what had exired or moved, Now I don't know about you but looking down the barrel of 8500+ urls to check, sucked.

So what could I do to make this process more painless? 

Today I tackeled that problem.

# The Idea

I'm a hacker and a nerd. I watch people playing CTFs, I study, occasionally shitpoit in response to the industries number 1 charlatan in DNS FUD.. I can do something that would help others.... 

Remembering that old adage; "KISS - Keep It Simple Stupid" I had an idea. I'll code up a script that can churn through the long list and spit out the good and the bad.

# The Process

Now I don't know about you, but I haven't properly coded for a while, So instead of sharing the entire process I'm going to skip to the end here.

I used a lot of Google and a fair chunk of my memory because, as turns out, I do remember a lot of what I leared doing the [100 Days of Code: The Complete Python Pro Bootcamp](https://www.udemy.com/course/100-days-of-code/#instructor-1) course by [Dr. Angela Yu](https://www.linkedin.com/in/angela-yu-963a584b/).

I would recommend this if you are a beginner and want to learn at a self paced speed.

Accordingly I thought up a cool name, opened a github repo and got to work.

# The Solution

I recalled a lot of working with files in Python and how I would approach the 'churn' aspect of running through the initial file line by line and going with an 'if' 'else' job.

If the URL responsds (response code 200) then put it in the good stuff pile (later named valid_urls) 
ElSE put the url in the bad pile with a little explanation/error code I can work with (later named invalid_urls)

It's a damn simple solution and it works so I consider it a win.

Accordingly the code is commented to help me remember (and teach others what is doing what)

```
import requests

# Read URLs from a text file
with open('urls.txt', 'r') as url_file:
    urls = url_file.read().splitlines()

# Open two separate files for valid and invalid URLs
with open('valid_urls.txt', 'w') as valid_file, open('invalid_urls.txt', 'w') as invalid_file:
    # Loop through each URL
    for url in urls:
        try:
            # Make a request to the URL
            response = requests.get(url, timeout=10)
            
            # If the response status code is 200-299 (success codes)
            if 200 <= response.status_code < 300:
                valid_file.write(f'{url} - {response.status_code}\n')
                print(f'{url} - {response.status_code} (Valid)')  # Optional: Print the result
            else:
                # If the response code indicates some kind of error
                invalid_file.write(f'{url} - {response.status_code}\n\n')  # Add a blank line after each entry to make it easier to read
                print(f'{url} - {response.status_code} (Invalid)')
        
        except requests.exceptions.RequestException as e:
            # Write URLs that caused an exception (e.g., 404 or connection errors)
            invalid_file.write(f'{url} - Error: {e}\n\n')  # Add a blank line after each entry
            print(f'{url} - Error: {e}')  # Optional: Print the error

# I realise this is basic, it's quick and dirty and I needed it to 'just work'.

```

Now this is the code for the actual main.py on my [GitHub](https://github.com/ha3ks/PageRequestChecker) right now.

As it stands it uses a dependancy of 'requests' so you have to ```pip3 install requests``` before you can run this file.

Could I do it without needing a dependancy? Absolutely

The code below does the same thing but uses Pythons built in features to make requests. I am not putting it on my GitHub I am only putting this code here to show it can be done:

```
import http.client
import urllib.parse

# Read URLs from a text file
with open('urls.txt', 'r') as url_file:
    urls = url_file.read().splitlines()

# Open two separate files for valid and invalid URLs
with open('valid_urls.txt', 'w') as valid_file, open('invalid_urls.txt', 'w') as invalid_file:
    # Loop through each URL
    for url in urls:
        try:
            # Parse the URL
            parsed_url = urllib.parse.urlparse(url)
            conn = http.client.HTTPSConnection(parsed_url.netloc, timeout=10) if parsed_url.scheme == 'https' else http.client.HTTPConnection(parsed_url.netloc, timeout=10)
            
            # Make a request to the server
            conn.request("HEAD", parsed_url.path or "/")
            response = conn.getresponse()
            
            # Check the status code
            if 200 <= response.status < 300:
                valid_file.write(f'{url} - {response.status}\n')
                print(f'{url} - {response.status} (Valid)')  # Optional: Print the result
            else:
                invalid_file.write(f'{url} - {response.status}\n\n')  # Add a blank line after each entry
                print(f'{url} - {response.status} (Invalid)')
            
            conn.close()
        
        except Exception as e:
            # Handle errors like connection failures
            invalid_file.write(f'{url} - Error: {e}\n\n')  # Add a blank line after each entry
            print(f'{url} - Error: {e}')  # Optional: Print the error

```

# Takeaways

Honestly, I enjoyed this.

About half way through the build I remembered that I might not be good at writing code but hot damn can my brain for some reason figure out in "3D Mind Space" what it is doing, what is going through the system and figure out what it's end result is, It can kinda see things before they happen... probably my undiagnosed Autism.

I would recommend when people are getting started with code and trying to get out of 'Tutorial Hell', find a problem.. anything at all, and build a solution to fix that problem. Thats what I just did, and it proves the system works.

Could my silly little PageRequestChecker have greater value? Maybe. If you are doing a bug bounty for example and wanted to run through all the urls you find, something 'KISS' like this, would help you out.

🤙

-------

I don't have any sponsors or anything but if you enjoy my work, or feel sympathy for my wife, then I have set up a [Ko-Fi account](https://ko-fi.com/ha3ks) as well as a [BuyMeACoffee](https://www.buymeacoffee.com/ha3ks) people can donate to.