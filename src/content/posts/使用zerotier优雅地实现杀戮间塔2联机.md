---
title: 使用zerotier优雅地实现杀戮间塔2联机
published: 2025-3-28T18:55:00.000Z
description: '使用zerotier优雅地实现杀戮间塔2联机'
image: 'https://img.moehu.org/pic.php'
tags: [杀戮尖塔,联机,zerotier,内网穿透]
category: '文章'
draft: false 
lang: ''
---



## 使用zerotier优雅地实现杀戮间塔2联机

杀戮尖塔2在3月6日开启了公开测试，但是联机频繁掉线一直是一个很令人头疼的问题，本文旨在介绍一种通过ip直连的方式实现更稳定（或许）的联机方式。

注：本文只针对steam正版联机，对其他平台并未测试。

原材料准备：

内网穿透：zerotier（zerotier.com）

联机mod：SlayTheSpire2.LAN.Multiplayer（https://www.nexusmods.com/slaythespire2/mods/3）

使用方法：

写在前面：第一、三步只需要一个人操作，其他人可以直接跳过。

#### 1.创建账号

前往zerotier官网（zerotier.com）,点击 **start free** 注册一个账号，以便后续的授权等操作,注册成功后会进入 network 界面，可以留意一下网段。完成后会给出一个授权码，我们可以将此授权码复制妥存。

#### 2.下载与配置zerotier

下载zerotier，安装结束后找到右下角小托盘，右键单击找到 **join new network...** 输入刚才的授权码。

![img](https://pan.lecirtus.com/d/OD/Public/%E7%B4%A0%E6%9D%90/1.png?sign=Clju68nVhoGBw_BXKZ6Vw-zFqVzCkDSBfX8aWwO6D4Y=:0)

加入成功后会创建一个 zerotier one 虚拟网卡

#### 3.设备授权

账号所有者进入network 管理界面，会发现有新的设备，点击设备进入该设备的管理界面，对需要授权的设备点击 **device authorized**。除此之外，还可以对其设置设备名称和描述

![img](https://pan.lecirtus.com/d/OD/Public/%E7%B4%A0%E6%9D%90/2.png?sign=vkFiJffKigf9Dc2q58eeBDXlyupj6Z-f1hIEhhf7E-Q=:0)

#### 4.下载安装联机mod

推荐从n网下载https://www.nexusmods.com/slaythespire2/mods/3

若**安装过模组**，把压缩包里的mods文件夹里的文件复制到根目录下的的mods文件夹里，mp_names.json 放在游戏根目录

若**第一次装模组**，直接将压缩包所有内容解压到游戏根目录下

#### 5.存档替换（可选）

建议先运行一次游戏，会询问是否开启模组，重启游戏后关闭游戏再进行接下来的操作。

可以在设置中查看模组是否被启用。

按 **win + R** ，键入 %appdata%\SlayTheSpire2\steam 回车 ，点开对应你账号的文件夹（一串数字）

![img](https://pan.lecirtus.com/d/OD/Public/%E7%B4%A0%E6%9D%90/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202026-03-28%20174000.png?sign=xQbJkJ9VYLhO0M42fJWkZe_tDe0870i14t2e9l01dp4=:0)

该文件夹下的profile1、profile2、profile3是原版存档，复制想替换的存档，点进 **modded** 文件夹，进入存档文件夹（profile1 or profile2 or profile3）粘贴（覆盖）。

#### 6.启动游戏

发现存档进度恢复，多人联机模式增加局域网联机，点击 **lan 模式**进入多人游戏，可以从上方看到 ip 和端口，下方是内网 ip 和端口，其他玩家可以点击加入多人游戏，右侧输入主机ip进入游戏



