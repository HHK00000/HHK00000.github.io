## 1.启动MYSQL服务器
- 使用 winmysqladmin
- DOS方式下运行 d:/mysql/bin/mysqld （具体路径为mysql安装路径）
- winpty mysql -uroot -p
## 2.进入mysql交互操作界面
- 在DOS方式下，(在mysql安装目录下，如 C:\Program Files\MySQL\MySQL Server 5.5\bin) 运行语句： mysql -u root -p  输入密码即可
## 3.退出MYSQL操作界面
- quit  在mysql>quit提示符下，输入quit可以随时退出交互操作界面
## 4.第一条MYSQL命令
- mysql>select version(),current_date(); 此命令要求mysql服务器输出它的版本号和当前日期
- 练习其它指令：select (20+5)*4;  select (20+5)*4,sin(pi()/3);  --- 如果结尾不加分号，则mysql视为你还会继续输入指令
![Image text](http://hanhuankang.com/images/mysql/mysql01.png)
## 5.多行语句 
- 一条语句可以分成多行输入，直到出现分号“;”为止
- mysql的关键字是不区分大小写的，如：select、from、where、group by、order by、having、update delete、insert into、sum、avg、min、max等等；查询内容是区分大小写的，如表名、字段名、内容等
## 6.查看当前所有数据库
- 使用show语句找出服务上当前存在什么数据库：  mysql>show databases;
## 7.创建一个数据库
- mysql>create databse hhk01; --- 创建一个名为 hhk01 的数据库，注意不同操作系统对大小写的敏感
## 8.选择创建好的数据库
- mysql>use hhk01  --- 此时进入你所创建好的数据库hhk01,注意，不需要加分号
## 9.创建一个数据库表
- 首先看现在数据库中存在什么表： mysql>show tables;
- 创建一个员工的生日表：mysql>create table mytable (name varchar(20),sex char(1)),birth date,birthaddress varchar(20)); 
## 10.显示表的结构
- mysql>describe mytable; 
## 11.查询所有数据
- mysql>select * from mytable;
## 12.增加记录
- mysql>insert into test3 values('abs');
![Image text](http://hanhuankang.com/images/mysql/mysql02.png)
## 13.选择特定行
- mysql>select * from mytable where name = 'tom';
- where的参数指定了检索条件，还可以用组合条件来进行查询：
- mysql> select * from mytable where sex = "f" and birthaddress = "china";
![Image text](http://hanhuankang.com/images/mysql/mysql03.png)
## 14.多表操作
- 创建好两个表格 create table selfinfo (name varchar(20),sex char(1),birth DATE,address varchar(20));  create table scoreinfo (name varchar(20),score char(20));
- 查询单个表格信息：mysql>select * from selfinfo; mysql>select name,sex from selfinfo where name='tom';
- 查询多个表 mysql>select name,score,sex,brith,address from selfinfo,scoreinfo where name=student and name='tom';  --- where name=student表示两个表的这两个字段值相等
![Image text](http://hanhuankang.com/images/mysql/mysql04.png)
## 15.增加一列
## 在table表中增加一列：mysql>alter table scoreinfo add column level char(1);
![Image text](http://hanhuankang.com/images/mysql/mysql05.png)
## 16.修改记录
- mysql>update mytable set birth = "1973-09-02" where name = "tom";
## 17.增加记录

## 18.删除记录
- 删除表中的一条记录： mysql>delete from scoreinfo where name='hanke';
![Image text](http://hanhuankang.com/images/mysql/mysql06.png)
## 19.删除表
- 删除一个或多个表：mysql>drop table scoreinfo,selfinfo;
![Image text](http://hanhuankang.com/images/mysql/mysql07.png)
## 20.数据库的删除
- 查看所有数据库： mysql>show databases;
- 删除数据库：mysql>drop database test,hhk01;
![Image text](http://hanhuankang.com/images/mysql/mysql08.png)
## 21.数据库的备份
- 退回到DOS：mysql>quit
- 使用命令对数据库hhk02进行备份：mysql>mysqldump -u root -pxxx hhk02>hhk02.sql
- 使用命令对数据库hhk02进行还原，先创建一个空数据库hhk03：mysql>mysql -u root -pxxx hhk03<hhk02.sql
- hhk02.sql就是数据库hhk02的备份文件
![Image text](http://hanhuankang.com/images/mysql/mysql09.png)
![Image text](http://hanhuankang.com/images/mysql/mysql10.png)
## 22.用批处理方式使用MySQL
## 23.先用root登录到mysql
## 24.创建一个用户
![Image text](http://hanhuankang.com/images/mysql/mysql20.png)

## Mysql学习笔记02
+ mysql表中添加一列：alter table strategy_factor add  column tzhname1 varchar(255);
  + alter table strategy_factor add  tzhname2 varchar(255) character set utf8 collate utf8_bin not null default '', add  szhname2 varchar(255) character set utf8 collate utf8_bin not null default '';
+ mysql表中删除一列：alter table strategy_factor drop  column tzhname1;
+ mysql表中修改列类型：alter table test modify address char(10); 或者：alter table test change address address  char(40);
+ mysql表中修改列名：alter table test change  column address address1 varchar(30);
+ mysql修改表名：alter table test rename test1;
  + alter table strategy_factor change column  tzhname2 tzhname varchar(255) character set utf8 collate utf8_bin not null default '' comment '项目中文名称',change column  szhname2 szhname varchar(255) character set utf8 collate utf8_bin not null default '' comment '广告位中文名称';
+ mysql更新表内容：update tablename set name = 'hhk', score = 95 where id = 1;
+ mysql表中插入一行：INSERT INTO table_name (列1,列2...) VALUES (值1,值2...)
  + INSERT INTO movie_film_word (film_id,word,type) VALUES (436985, 'haha3', 0);
+ mysql查询某个表的数据条数：select count(*) from movie_film_word;
## Mysql语句中的其他应用
+ concat()函数：将多个字符串连接成一个字符串，返回连接后的字符串
  ```
    select concat(id, name, score) as info from tt2;
    //输出 1小明0
    //添加分隔符
    select concat(id, '.', name, '.', score) as info from tt2;
  ```
+ concat_ws()函数：将多个字符串连接成一个字符串，但可以一次性指定分隔符(concat_ws就是 concat with separator)
  + 语法： concat_ws(separator, str1,str2, ...)  第一个参数为指定分隔符，分隔符不能为null，否则返回结果为null
  ```
    select concat_ws(',', id, name, score) as info from tt2;
  ```
+ group by: 分组函数
  + 聚合函数： sum 求和、max 最大值、min 最小值、avg 平均值、 first 第一条记录、 last 最后一条记录、 count 统计记录数
  + 
  ```
    //取平均数
      select category, avg(num) as average from A group by category;
    //group by all 按多列分组（只有两个列的内容都相同的，才会求和）
      select category, summary, sum(num) as total from A group by all category, summary;
  ```
  + 在有 group by 的语句中，select指定的字段要么就包含在group by 语句的后面，作为分组的依据，要么就包含在聚合函数中
+ group_concat()函数：（将group by 产生的同一个分组中的值链接起来，返回一个字符串结果）
  + 语法： group_concat(distinct[] 要链接的字段 [order by 排序字段 asc/desc] [separator '分隔符'])   -- 通过使用 distinct 可以排除重复值；如果希望排序，可以使用 order by 语句，separator 是一个字符串值，缺省为一个逗号
  ```
    select name, group_concat(id) from tt2 group by name;  //将name相同的元素，输出其name和id，id采用逗号分隔
    select name group_concat(id order by id desc separator '_') from tt2 group by name; // 将name相同的元素全部合并输出，所有id从大到小排序，且用'_'分隔
    select name group_concat(concat_ws('-', id, score) order by id separator '|') from tt2 group by name; // 将name相同的元素全部合并输出，其id、score用 '_'分隔
  ```
+ filed()函数：自定义排序顺序，结合 order by 可以将查询结果集按照参数顺序表返回
  ```
    select * from books where 'books'.'author' in ('李雷', '韩梅梅', '安华') order by filed(author, '李雷', '韩梅梅');
  ```
+ like 运算符：(用于where表达式中，以搜索匹配字段中的指定内容)
  + 语法：where column like pattern
    ```
      select * from users where username like '小%'; // 将用户名形如“小明”、“小王”等的数据找出来
    ```
  + mysql like 语句通常是不区分大小写的，可以使用 binary 来区分大小写
    ```
      select * from users where username like binary '%Azz%';
    ```
  + 当like 加上binary操作符之后，会严格区分英文大小写，因此检索内容如果出现中英文混合且需要忽略英文大小写时，可以使用mysql的upper()和concat()函数
    + upper() 将英文字符转为大写，同ucase()
    + concat() 将多个字符串连接成一个字符串
    ```
      select * from users where upper(username) like binary concat('%',upper('a中文b'),'%');
    ```
  + like运算符要对字段数据进行逐一扫描匹配，实际执行的效率比较差
+ SQL_CALC_FOUND_ROWS
  + 在处理分页程序的时候，会使用limit来限制返回的数量，然后有两种获取分页的方法
    + 方法一：在select 语句中加入 SQL_CALC_FOUND_ROWS选项，然后通过 SELECT FOUND_ROWS();来获取总行数：
      ```
        select sql_calc_found_rows * from table where id > 100 limit 10;
        select found_rows();
      ```
    + 方法二：使用正常SQL语句，然后再用 SELECT COUNT(*)来获取总行数：
      ```
        select * from table where id > 100 limit 10;
        select count(*) from table where id > 100;
      ```
  + 一般来说 sql_calc_found_rows 是比较慢的，sql执行的时间甚至会达到10倍那么夸张
+ 联表删除
  + 删除表 movie_film_tags 中 film_id 字段 与表 movie_film 中的 id 字段 相同，且 movie_film 中 ref_id 以 "360kan" 开头的数据
    ```
      DELETE t1 FROM movie_film_tags t1 WHERE (select t2.ref_id from movie_film t2 where t2.id=t1.film_id) like '360kan%'
    ```
+ 