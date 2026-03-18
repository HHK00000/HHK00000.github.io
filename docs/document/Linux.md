## Linux 学习笔记
+ 校验nginx配置是否正确： nginx -t
  + 修改完:vim /usr/local/nginx/conf/vhost/console.browser.qihoo.net.conf 这个文件后，校验一下
+ 重启nginx：nginx -s reload
  + 中间可能会遇到权限不够的问题，输入指令：sudo -s 并输入服务器密码，之后可以
+ 删除文件： rm -rf /xxx 删除服务器根路径下的xxx下所有文件
+ 修改文件权限： chmod -R 777 browser-corp-qihoo-net/
+ 修改文件属组： chown -R 属主名:属组名 文件名
+ 切换到sudo权限： sudo -s  或 sudo -i 
+ 退出sudo权限： exit  或 logout  或 ctrl + D
+ 查看当前所处目录：pwd
+ 访问远程资源：curl
  ```
    curl http://www.baidu.com
    // -o 将结果写入到文件
    curl http://baidu.com -o baidu.html
    // -X 指定请求方式
    curl -XPOST http://www.baidu.com
    // -H 指定请求头
    curl -H 'token:xxx' -H 'a:yyy' http://www.baidu.com
    // -b 携带cookie
    curl -b 'a=123' http://www.baidu.com
    // -c 将返回的cookie写入本地文件
    curl -c xxx.txt http://www.baidu.com
    // -d 请求内容
    curl -d 'a=123&b=456' -XPOST http://baidu.com
    // -e 指定referer
    // -k 跳过SSL检查，不检查服务端的SSL证书是否有效
    // -u 认证
  ```
+ 下载远程文件到本地： wget
  ```
    // -q 安静模式 不会在终端显示下载进度
    // -O 输出到指定文件 -o 表示输出到终端 不指定-o下载后文件名和远程文件名一致
    // --header 指定请求头
    wget http://hanhuankang.com -O hanhuankang.html
  ```
+ 压缩和解压文件：tar
  ```
    // -c是压缩 -x是解压 -z是zip
    // -czvf 压缩文件
    tar -czvf xxx.tar.gz dir1 dir2 file1 file2
    // -xzvf 解压文件
    tar -xzvf xxx.tar.gz -C xxx
  ```
<!-- + 检测进程是否存在： ps -ef | grep docker | wc -l -->
+ cat 查看文件内容
+ netstat 查看网络情况，常用来查找指定端口，或判断端口是否在监听
  ```
    // 查看8080端口
    netstat -anp | grep 8080
  ```
+ mkdir 创建目录
  ```
    mkdir a
    mkdir -p a/b/c 递归创建层级目录，即使上级目录不存在，也不会报错，而是先创建上级目录
  ```
+ rm 删除文件和目录
  ```
    rm a.txt
    rm dir1
    rm -rf dir2
    // 添加 -rf 时 需要非常仔细查看命令是都正确，有时候因为一个不起眼的空格可能就变成 rm -rf / dir2 或者要删除的目录时变量，但是很不幸变量没有正确赋值，这时候 rm -rf 的破坏力是很大的
  ```
+ mv 移动文件或目录
  ```
    // 移动文件或目录，常用来修改文件或目录名
    mv a.txt b.txt
    ma dir1 dir2
  ```
+ cp 复制文件或目录
  ```
    cp a.txt b.txt
    // 复制目录时需要添加 -r，表示递归的意思
    cp -r dir1 dir2
  ```
+ cd 切换目录
+ ll 列出当前目录或指定目录下的文件和目录，有些环境（如docker容器）没有这个命令，用 ls -l 代替
+ man 查看命令帮助文档
  ```
    //查看ls的帮助文档
    man ls
    // 查看文档第一页
    man 1 ls
  ```
+ 使用 CMD 命令 启动 c盘下的nginx
  ```
    // 进入c盘下的文件目录
    c:&& cd c:\tools\nginx
    start nginx
  ```
+ wget 命令行下载文件
  + 下载该网站上 packs 目录中的所有文件: wget -r -np -nd http://www.linux.com/packs/
    + -np 的作用是不便利父目录，-nd表示不再本机重新创建目录结构
  + 下载整个 http 或 ftp 站点: wget -r -x http://www.linux.com
    + -x 的作用强制建立服务器上一模一样的目录（这个命令会按照递归深度将网站上所有引用的其它网站全都下载下来
    + 可以用 -l number 参数来指定下载的层次，如只下载两层，那么使用 -l 2：wget -r -x -l 2 http://www.linux.com）
  + 选择性只下载某类文件：wget -r -np -nd -accept=iso http:www.linux.com/i386/
    + 表示仅下载i386目录中扩展名为iso的文件，可以指定多个扩展名，以逗号分隔
  + 批量下载：wget -i downloads.txt 
    + 如果需要下载多个文件，那么把需要下载的文件的地址放到 downloads.txt 中，每个文件的URL写一行，然后wget就会自动为你下载所有文件了
  + 断点续传：wget -c -t 100 -T 120 http://www.linux.com/big-file.iso
    + 当文件特别大或者网络慢时，往往一个文件还没有下载完，连接就已经被切断，此时就需要断点续传，wget的断点续传是自动的。
    + -c 选项的作用为断点续传
    + -t 参数表示重试次数，如：-t 100 表示重试100次
    + -T参数表示超时等待时间，例如 -T 120，表示等待 120秒 连接不上就算超时
  + 镜像一个网站：wget -m -k (-H) http://www.linux.com/
    + 如果网站中的图像是放在另外的站点，那么可以使用-H选项
+ df、du Linux系统下查看磁盘与目录的容量
  + df：列出文件系统整体磁盘使用量
  + du：评估文件系统的磁盘使用量（常用语评估目录所占容量）
  + df 参数
    ```
      -a: 列出所有的文件系统
      -k: 以KB容量显示各文件系统
      -m: 以MB容量显示各文件系统
      -h: 以人们较易阅读的GB,MB,KB等格式自行显示
      -H: 以M=1000K代替M-1024K的进位方式
      -T: 连同该分区的文件系统名称(例如 ext3)也列出
      -i: 不同硬盘容量，而以inode的数量来显示
    ```
  + du 参数
    ```
      -a: 列出所有的文件与目录容量，因为默认仅统计目录下面的文件量而已
      -h: 以人们较易读的容量格式(G/M)显示
      -s: 列出总量，而不列出每个个别的目录占用的容量
      -S: 不包括子目录下的总计，与-s有点差别
      -k: 以KB列出容量显示
      -m: 以MB列出容量显示
    ```
+ wc 统计指定文件中的字节数、字数、行数，并将统计结果显示输出  
  + wc --help 可以查看具体命令
  + wc -l filename 就是查看文件里有多少行
  + wc -w filename 查看文件里有多少个word
  + wc -L filename 文件里最长的那一行是多少个字
  ```
    -c: 统计字节数
    -l: 统计行数
    -w: 统计字数
    wc -lcw file1 file2  // 输出两个文件的字节数、行数、字数
    // 使用 ls -lht 命令显示当前目录下的所有文件 其中有一列就时是显示这个文件的大小
  ```
+ uniq 求两个Linux文本文件的交集、并集、差集
  + 交集 sort a.txt b.txt | uniq -d 
  + 并集 sort a.txt b.txt | uniq
  + 差集 sort a.txt b.txt b.txt | uniq -u   // a.txt 对 b.txt 的差集
  + 使用 sort 可以将文件进行排序(sort排序后是为了通过管道交给 uniq 处理，uniq只能处理相邻的行)，
    + 使用sort后面的参数，例如 -n 按照数字格式排序，-i忽略大小写，例如 -r逆序输出等 
  + uniq 为删除文件中重复的行，得到文件中唯一的行
    + 参数 -d 表示的是输出出现次数大于1的内容；参数 -u 表示的是输出出现次数为1的内容
  + 比较两个文件的交并补，并输出为一个新文件
    + 并集 cat file1.txt file2.txt | sort | uniq > file.txt
    + 交集 cat file1.txt file2.txt | sort | uniq -d > file.txt
    + 差集 cat file1.txt file2.txt file2.txt | sort | uniq -u > file.txt
+ grep
  + grep -n 'word' 'file' -- 返回 'file' 文件中包含 'word' 的所有行
+ sed
  + shell 中最核心的三个命令: grep、sed、awk
  + sed -n '2,$p' a > b -- 把 a 文件的第 2 行到 最后一行，输出到 b 文件,$p代表文件末尾，即最后一行
+ cat
  + cat 查看文件
  ```
    cat test.log | head -n 200  //查看test.log的前200行
    cat test.log | tail -n 200  //查看test.log倒数200行
    cat test.log | grep 'http'  //返回test.log中包含http的所有行
    cat /etc/passwd | grep -A5 root // 查找文件passwd中包含root的 后5行
    cat /etc/passwd | grep -B5 root // 查找文件passwd中包含root的 前5行
  ```
+ echo  输出内容，可以输出内容到文件等
  + echo 'add content'>>/home/data/test.sh 向文件末尾追加数据
  + echo 'add content'>/home/data/test.sh 删除原有内容，并写入当前内容
+ tar 压缩、解压文件
  + 打包成 tar.gz 格式的压缩包: tar -zcvf demo.tar.gz demo/
  + 解压 tar.gz 格式的压缩包： tar zxvf demo.tar.gz
  + 打包成 tar.bz2 格式压缩包：tar -jcvf demo.tar.bz2 demo/
  + 解压 tar.bz2 格式压缩包： tar jxvf demo.tar.bz2
  + 打包成 zip 格式的压缩包：zip -q -r demo.zip demo/
  + 解压 zip 格式的压缩包： unzip demo.zip
+ netstat 查询端口号对应的进程号
  + netstat -tnpl | grep :80
+ ls -l /proc/9970  查看指定进程号的进程信息
+ awk
  <!-- + cat 20210925_v2 | grep '"id": "360kan' | awk -F '"id": "' '{print $2}' | awk -F '"' '{if($2 !/360kan_/)print $1}' | wc -l  // 未能实现效果-->
  + 获取文件 20210925_v2 中，包含 "id": "360kan 的行数: cat 20210925_v2  | grep '"id": "360kan' | awk -F '"id": "' '{print $2}' | awk -F '"' '{print $1}' | wc -l  
+ grep -v
  +  获取文件 20210926_v2 中，包含 "\"id\":\s\"360kan_"，但不包含 "\"unique_id\":\s\"360kan_" 的行数：  grep "\"id\":\s\"360kan_" 20210926_v2 | grep -v "\"unique_id\":\s"360kan_" | wc -l
  + 将文件 20210926_v2 中，包含 "\"id\":\s\"360kan_"，但不包含 "\"unique_id\":\s\"360kan_" 的行，输出到新文件  中： grep "\"id\":\s\"360kan_" 20210926_v2 | grep -v "\"unique_id\":\s"360kan_" > ~/haha.01.txt
  + 将文件 20210926_v2 中，包含 "\"id\":\s\"360kan_"，但不包含 "\"unique_id\":\s\"360kan_", 且不含 "\"category\":\s\"Null\"" 的行，输出到新文件  中： grep "\"id\":\s\"360kan_" 20210926_v2 | grep -v "\"unique_id\":\s\"360kan_" | grep -v "\"category\":\s\"Null\"" > ~/haha.02.txt
+ 查看文件的大小： du -sh ~/haha.01.txt  // 52MB
+ 定时任务 crontab 
  + 查看定时任务： crontab -l
  + 编辑定时任务： crontab -e 
