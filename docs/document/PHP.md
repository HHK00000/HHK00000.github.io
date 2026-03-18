# 记录学习PHP过程中遇到的各种API、常量等
## PHP API
  + addslashes 使用反斜线引用字符串，
    + addslashes(string $str):string 返回字符串，该字符串为了数据库查询语句等的需要在某些字符前加上了反斜线。
    + 这些字符包括：单引号(')、双引号(")、反斜线(\) 与 NUL(null字符)。
  + htmlspecialchars
    + htmlspecialchars -- 将特殊字符串转为 HTML 实体
    + 某类字符在 HTML 中有特殊用处，如需保持愿意，需要用 HTML 实体来表达
    + htmlspecialchars_decode   -- 将特殊的 HTML 实体转换回普通字符
  + intval 获取变量的整数值
    + intval(mixed $value,int $base = 10):int  第二个参数是要转换成的进制数
  + strlen 获取一个字符串的长度
    + strlen( string $string ):int
    + 返回给定字符串 string 的长度
  + explode 使用一个字符串分割另一个字符串
  + implode 将一个一维数组的值转化为字符串
  + str_replace 字符串替换
    + str_replace( mixed $search,mixed $replace,mixed $subject,int $count = ?):mixed
    + 该函数返回一个字符串或者数组。改字符串或数组是将 subject 中全部的 search 都被 replace 替换后的结果。count可选参数，是值被替换发生的次数。
    + 如果没有特殊替换要求，应该使用该函数替换 ereg_replace() 和 preg_replace()
  + strpos 查找字符串首次出现的位置
  + sprintf() 函数 
    + 把百分号(%)符号替换成一个作为参数进行传递的变量
      ```
        <?php 
          $number = 2;
          $str = "ShangHai";
          $txt = sprintf("There are %u million cars in %s.",$number,$str);
          echo $txt;
        ?>
      ```
  + array_map()函数 -- 为数组的每个元素应用回调函数
    + array_map( callback $callback, array $array, array ...$arrays ):array
    + 返回值为数组数组内容为array1的元素按索引顺序调用 callback 后的结果（有更多数组时，还会传入 arrays 的元素）。callback函数形参的数量必须匹配array_map()实参中数组的数量。
      ```
        <?php
          function show_Spanish ($n,$m)
          {
            return "The number {$n} is called {$m} in Spanish";
          }
          $a = [1,2,3,4,5];
          $b = ['uno','dos','tres','cuatro','cinco'];
          $c = array_map('show_Spanish',$a,$b);
          print_r($c);
      ```
      + array_filter 使用回调函数过滤数组元素
  + get_class 返回对象的类名
  + time 返回当前的 Unix 时间戳 -- 返回自 Unix 纪元（格林威治时间 1970年1月1日00:00:00）到当前时间的秒数
    + microtime 返回当前的 Unix 时间戳 微秒数
  + json_encode 对变量进行JSON编码
  + json_decode 对变量进行JSON解码
  + date 格式化一个本地时间/日期 
  + is_numeric 检测变量是否为数字或数字字符串
  + defined 检测某个名称的 常量 是否存在
    + defined( string $name ):bool
    + 如果要检查一个变量是否存在，请使用 isset()
    + defined() 函数仅对constants（常量）有效
    + 如果要检测某个函数是否存在，请使用 function_exists()
    + 如果要检测一个类的某个方法是否存在，可以用 method_exists
  + header 发送原生 HTTP 头
    + header( string $string, bool $replace = true, int $http_response_code = ?):void
    + 注意 hearder() 必须在任何实际输出之前调用，不管是普通HTML标签，还是文件或PHP输出的空行、空格。
    + 携带的信息参数可以是单一字符串，中间以冒号分别则在请求头里面显示未键值对
  + file_put_contents 将一个字符串写入文件  --- 没调用成功
    + file_put_content(string $filename, mixed $data, int $flags = 0,resource $context = ?):int
    + 和一次调用 fopen()、fwrite()、fclose() 功能一样
    + $data 是要写入的数据。类型可以使 string、array或者是 stream资源
    + file_get_contents 获取已存在的目录文件的内容
  + basename 返回路径中的文件名部分
    + dirname 返回路径中的文件名部分
    + pathinfo 返回文件路径的信息
    + realpath 返回规范化的绝对路径名  --- 没有输出
  + fopen  打开文件或者URL，将filename指定的名字资源绑定到一个流上
    + fwrite
    + fclose  关闭一个已打开的文件指针
  + is_int 检测变量是否是整数
    + is_file 判断给定文件名是否为一个正常的文件
    + is_callable 检测一个函数是不是可用的回调函数
  + unlink 删除文件
    + unlink(string $filename, resource $context=?):bool
    + 删除filename，成功时返回 true，失败返回 false
  + call_user_func 把第一个参数作为回调函数调用，其余参数作为回调函数的参数传入,返回值为回调函数的返回值
  + feof(resource $handle) 检测文件指针是否到达文件末尾
    + 如果文件指针到了EOF（文件末尾）或者出错时则返回true，否则返回一个错误（包括 socket 超时），其它情况则返回 false
    + feof函数对于遍历长度未知的数据很有效
  + list() 把数组中的值赋给一组变量 （类似JS的解构赋值）
    + list(mixed $var, ....):array
    ```
      $info = array('coffee','brown','caffeine',);
      list($drink, $color, $power) = $info;
    ```
  + fgets 从文件指针中读取一行
    + fgets(resource $handle, int $length = ?):string
    + 文件指针$handle必须是有效的, 是通过fopen()或fsockopen()打开的，且没有由fclose()关闭的
    + 返回读取了 length - 1 字节后返回的字符串，如果指针中没有更多数据了，则返回false，错误发生时，返回false
  + 
  + preg_match_all 执行一个全局正则表达式匹配
  + serialize  返回一个可存储的值的表示
## 常量