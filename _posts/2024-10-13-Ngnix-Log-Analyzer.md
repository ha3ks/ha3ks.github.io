---
layout: post
title: "Nginx Log Analyzer"
author: ha3ks
date: 2024-10-13
tags: development DevOps bash python
category: Portfolio
---

## Nginx Log Analyzer

This was a new one for me.

DevOps has always been a thing calling out to me in the background, DevSecOps too as I 'do' security but I figure getting a leg up and doing DevOps-y stuff will absolutely help.

> But what do you do when you don't quite know where to start?

Well a good internet friend reached out to me on LinkedIn many many moons ago and told me all about his history doing security and whatnot before falling into DevOps/DevSecOps/'All the Linux' and more.

Inspired by his words and recommendations I gave a follow/Subscribe to [TechWorldwithNana](https://www.youtube.com/@TechWorldwithNana) she's lovely and has a really good way of teaching as well as some very highly rated and well received series like [Kubernetes in an hour](https://www.youtube.com/watch?v=s_o8dwzRlu4), [Kubernetes Tutorial for Beginners [FULL COURSE in 4 Hours]](https://www.youtube.com/watch?v=X48VuDVv0do) and [Docker Tutorial for Beginners [FULL COURSE in 3 Hours]](https://www.youtube.com/watch?v=3c-iBn73dDE) and more!

Amazing content.

So I started watching, taking notes and doing what I could.

## Then the time passed

Things kinda went onto the back burner for a while, and I mean YEARS! 

So recently with my 'diversify myself' mindset I started some Googling and found myself on [Roadmap.sh](https://roadmap.sh/), specifically The [DevOps Roadmap](https://roadmap.sh/devops) and [DevOps Projects](https://roadmap.sh/devops/projects).

In here I found the first thing I would take a shot at, make an [Nginx Log Analyzer](https://roadmap.sh/projects/nginx-log-analyser)

## More Google

Turns out I do know a thing ot two about Linux and getting system information and details, commands like 'awk', 'sort' 'uniq' and 'sed'.

So I started bashing my keys and ended up making a bash version of the script as well as a Python which I am little more familiar with.

## The Code

Now, all the code is on my [GitHub](https://github.com/ha3ks/Nginx-Log-Analyzer) however because I can, here is the bash code:

```
#!/bin/bash

# Check if run via command line argument
if [ "$#" -ne 1 ]; then
  echo "Usage: $0 <nginx-access-log-file>"
  exit 1
fi

LOG_FILE=$1

# Check if file exists
if [ ! -f "$LOG_FILE" ]; then
  echo "Error: File not found!"
  exit 1
fi

# Top 5 IP addresses
echo "Top 5 IP Addresses:"
awk '{print $1}' "$LOG_FILE" | sort | uniq -c | sort -rn | head -5
echo ""

# Copy Pasta Intensifies
# Top 5 Requested Paths
echo "Top 5 Requested Paths:"
awk '{print $7}' "$LOG_FILE" | sort | uniq -c | sort -rn | head -5
echo ""

# Top 5 Response Status Codes
echo "Top 5 Response Status Codes:"
awk '{print $9}' "$LOG_FILE" | sort | uniq -c | sort -rn | head -5
echo ""

# Top 5 User Agents
echo "Top 5 User Agents:"
awk -F\" '{print $6}' "$LOG_FILE" | sort | uniq -c | sort -rn | head -5
echo ""
```

And the Python;

```
#!/usr/bin/env python3

import re
import sys
from collections import defaultdict
from datetime import datetime

# Regex to match Nginx log format given.
LOG_PATTERN = (
    r'(?P<ip>\d{1,3}(?:\.\d{1,3}){3}) - - \[(?P<time>.*?)\] "(?P<method>[A-Z]+) '
    r'(?P<path>.*?) HTTP/.*?" (?P<status>\d{3}) (?P<size>\d+) "(?P<referrer>.*?)" "(?P<user_agent>.*?)"'
)

# parse a single log line.
def parse_log_line(line):
    match = re.match(LOG_PATTERN, line)
    if match:
        return match.groupdict()
    return None

# Function to analyze the logs.
def analyze_logs(log_file_path):
    ip_counts = defaultdict(int)
    path_counts = defaultdict(int)
    status_counts = defaultdict(int)
    user_agent_counts = defaultdict(int)

    with open(log_file_path, 'r') as log_file:
        for line in log_file:
            data = parse_log_line(line)
            if data:
                ip_counts[data['ip']] += 1
                path_counts[data['path']] += 1
                status_counts[data['status']] += 1
                user_agent_counts[data['user_agent']] += 1

    return {
        "top_ips": sorted(ip_counts.items(), key=lambda x: x[1], reverse=True)[:5],
        "top_paths": sorted(path_counts.items(), key=lambda x: x[1], reverse=True)[:5],
        "top_status_codes": sorted(status_counts.items(), key=lambda x: x[1], reverse=True)[:5],
        "top_user_agents": sorted(user_agent_counts.items(), key=lambda x: x[1], reverse=True)[:5],
    }

# display the top 5 results
def display_analysis(analysis_data):
    print("\nTop 5 IP Addresses:")
    for ip, count in analysis_data['top_ips']:
        print(f"  {ip}: {count} requests")
    
    print("\nTop 5 Requested Paths:")
    for path, count in analysis_data['top_paths']:
        print(f"  {path}: {count} requests")
    
    print("\nTop 5 Response Status Codes:")
    for status, count in analysis_data['top_status_codes']:
        print(f"  {status}: {count} occurrences")
    
    print("\nTop 5 User Agents:")
    for user_agent, count in analysis_data['top_user_agents']:
        print(f"  {user_agent}: {count} requests")

# ability to run via command line argument
if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(f"Usage: {sys.argv[0]} <nginx-access-log-file>")
        sys.exit(1)

    log_file = sys.argv[1]
    analysis = analyze_logs(log_file)
    display_analysis(analysis)
```

Since they provided the log file to work with I just had to go through it and try figure out what kinds of rows and headings my mental *Excel spreadsheet* was going to need.

The [GitHub page](https://github.com/ha3ks/Nginx-Log-Analyzer) also has instructions on how to run these as you need to 'chmod +x' them to make them executable etc.

## Takeaways

Again this was a fun little 'pallet cleanser'. 

It's nice to get behind the keyboard and code to solve a problem but also it's nice to quell any 'Imposter Syndrome' because this 'is' something I know and I just need to 'get it out of my head and onto my keystrokes' so I can come up with something cool and "efficient".

Honestly, little sprints of dev work between the hectic IRL life stuff right now is actually good for the mind and good for the soul.

I would recommend doing some bits and pieces coding every now and again to anyone if you are inclined to code, I also game too when my brain is too stressed, do what works for you.

Be safe all.

🤙

-------

I don't have any sponsors or anything but if you enjoy my work, or feel sympathy for my wife, then I have set up a [Ko-Fi account](https://ko-fi.com/ha3ks) as well as a [BuyMeACoffee](https://www.buymeacoffee.com/ha3ks) people can donate to.