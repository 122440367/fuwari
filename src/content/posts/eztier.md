前言：本文参考自https://www.xiaoheihe.cn/app/bbs/link/1eaf70264ce8

上一期我们介绍了如何使用zerotier进行内网穿透进而实现杀戮尖塔2的局域网联机，然而实际上效果并未达到预期，仍然经常出现高ping和掉线的情况。为了解决这一问题，我们采用了通过easytier搭建中转服务器的方式来最大可能地降低延迟。本文分服务端和客户端配置两部分，请按需阅读。

**原料工具**：

easytier: https://github.com/EasyTier/EasyTier

一台服务器（用作中转服务器）

*一个清醒的大脑*

*手*

## 一、服务端的配置

### 1.放行 tcp 和 udp 的11010端口

```bash
iptables -I INPUT -p tcp --dport 11010 -j ACCEPT
iptables -I INPUT -p tcp --dport 11010 -j ACCEPT
iptables -I FORWARD -p tcp --dport 11010 -j ACCEPT
iptables -I FORWARD -p udp --dport 11010 -j ACCEPT
```

### 2.创建目录

`mkdir -p /etc/easytier && cd /etc/easytier`

### 3.下载easytier

通过命令行或者ftp将对应的版本下载到服务器上。如作者是 arm 服务器，在此选择 aarch-64。

只需键入 `wget https://ghfast.top/https://github.com/EasyTier/EasyTier/releases/download/v2.4.5/easytier-linux-aarch64-v2.4.5.zip`  

以下载easytier-linux-aarch64-v2.4.5.zip文件。

### 4.解压

`unzip easytier-linux-x86_64-v2.2.4.zip`解压

```bash
mv easytier-linux-aarch64/* . \
&& rm -rf easytier-linux-aarch64 easytier-linux-aarch64-v2.5.0.zip \
&& chmod +x easytier-* \
&& mv easytier-* /usr/bin/
```

特别注意，如果你下的是别的版本，请将第一行的文件夹名和第二行的压缩包名进行替换，可以通过`ls`查看！

### 5.启动 easytier

`easytier-core --network-name <网络名称> --network-secret <密码> `

例如 `easytier-core --network-name lllllll --network-secret abcdef`

### 6.设置后台运行并开机自启动（可选）

##### 6.1创建服务文件

`nano /etc/systemd/system/easytier.service`

写入

```bash
[Unit]
Description=EasyTier Service
After=network.target

[Service]
Type=simple
ExecStart=/usr/bin/easytier-core --network-name lllllll --network-secret abcdef
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

##### 6.2启用服务

```bash
systemctl daemon-reexec
systemctl daemon-reload
systemctl enable easytier
```

##### 6.3启动测试

`systemctl start easytier`

##### 6.4查看状态

`systemctl status easytier`

### 7.固定服务器 ip （可选）

我们可以使用 easytier 官方提供的命令 `easytier-cli node` 进行查询，得到首行的 Virtual IP 就是服务器的虚拟ip。

需要特别注意的是，你需要保证你的 ip 段保持不变，比如 10.10.10.0/24 ，则你可以修改你的服务器 ip 为 10.10.10.121 等等；

修改方法如下：

键入 `nano /etc/systemd/system/easytier.service`

在`ExecStart=/usr/bin/easytier-core --network-name lllllll --network-secret abcdef`后加入`-i <你想要的ip>`

***重启服务***

```bash
systemctl daemon-reload
systemctl restart easytier
```

## 二、客户端的配置

对于 windows 客户端，我们可以直接下载带 gui 界面的版本直接安装。

打开软件，左下角可以切换成中文。

点击右上角的创建新网络

 ![img](https://pan.lecirtus.com/d/OD/Public/%E7%B4%A0%E6%9D%90/6.png?sign=xMmODJoQPXt_WPXUCG15TtZEbn5XCE_MZ1WY6GwAswo=:0)

填入一个虚拟ip地址（或者开启 dhcp）如果（开启 dhcp，服务器重启后客户端的 ip 地址可能改变）

网络名称及密码与配置文件保持一致：比如示例应填 *lllllll* 和 *abcdef*

公共服务器地址就是服务器的公网 ip。

接着 点击最下方的“运行网络”按钮，我们就可以看到当前节点信息了。

## 三、总结

看起来easytier似乎是一个很不错的方式，它为我们提供多种选择，可以自建服务器节点，也可以使用他人搭建的服务器节点。

但是公共服务器的维护似乎有问题，而自己搭建服务又必须有公网 ip，因而有一定的门槛。但是据反映，穿透功能无论是延迟还是稳定性都很不错。（有待进一步测试）
