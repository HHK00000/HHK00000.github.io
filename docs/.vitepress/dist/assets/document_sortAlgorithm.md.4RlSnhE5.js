import{_ as s,c as a,o as p,ae as l}from"./chunks/framework.BTGIOJIj.js";const h=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"document/sortAlgorithm.md","filePath":"document/sortAlgorithm.md"}'),e={name:"document/sortAlgorithm.md"};function i(r,n,c,t,o,g){return p(),a("div",null,n[0]||(n[0]=[l(`<h2 id="冒泡排序" tabindex="-1">冒泡排序 <a class="header-anchor" href="#冒泡排序" aria-label="Permalink to &quot;冒泡排序&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 冒泡排序</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 基本思想：重复遍历要排序的数组，每次比较两个元素的大小，如果顺序错误就交换两个元素的顺序，遍历数组重复进行比较直到排序完成</span></span>
<span class="line"><span>// 基本步骤：1.比较相邻的两个元素。如果第一个比第二个大，则交换位置；</span></span>
<span class="line"><span>// 2.对每一对相邻元素重复第一个步骤，从开始第一对到结尾的最后一对，这样在最后的元素应该会是最大的数；</span></span>
<span class="line"><span>// 3.针对所有的元素重复以上的步骤，除了最后一个；</span></span>
<span class="line"><span>// 4.重复步骤1~3，直到排序完成。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// function bubbleSort (arr) {</span></span>
<span class="line"><span>//   for (let i = 0;i &lt; arr.length - 1;i++) {</span></span>
<span class="line"><span>//     for (let j = i + 1;j &lt; arr.length;j++) {</span></span>
<span class="line"><span>//       if(arr[i] &gt; arr[j]) {</span></span>
<span class="line"><span>//         [arr[i], arr[j]] = [arr[j], arr[i]];</span></span>
<span class="line"><span>//       }</span></span>
<span class="line"><span>//     }</span></span>
<span class="line"><span>//</span><span>     // break;</span><span> //每次循环把一个最小的值放在最前面</span></span>
<span class="line"><span>//   }</span></span>
<span class="line"><span>//   console.log(arr);</span></span>
<span class="line"><span>//   return arr;</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 冒泡排序每轮循环找出一个最大的 选择排序每轮循环找出一个最小的</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function bubbleSort (arr) {</span></span>
<span class="line"><span>  for (let i = 0;i &lt; arr.length;i++){</span></span>
<span class="line"><span>    for(let j  = 0;j &lt; arr.length - 1 -i;j++){</span></span>
<span class="line"><span>      if (arr[j] &gt; arr[j + 1]) {</span></span>
<span class="line"><span>        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    // break;</span><span> // 每次循环把一个最大的值放在最前面</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  console.log(arr);</span></span>
<span class="line"><span>  return arr;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>var arr = [8, 5, 4, 3, 1, 7, 9, 2];</span></span>
<span class="line"><span>bubbleSort(arr);</span></span></code></pre></div><h2 id="快速排序" tabindex="-1">快速排序 <a class="header-anchor" href="#快速排序" aria-label="Permalink to &quot;快速排序&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 快速排序</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 基本思想：是一种对冒泡排序改进的算法，是处理大数据最快的排序算法之一。是一种分治思想的算法，找出一个参考值，通过递归的方式将数据一次分解为包含较小元素和较大元素的不同子序列，不断重复这个步骤直至所有数据都是有序的</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 基本步骤：</span></span>
<span class="line"><span>// 1.选择一个参考元素，将列表分割成两个子序列；</span></span>
<span class="line"><span>// 2.对列表重新排序，将所有小于基准值的元素放在基准值前面，所有大于基准值的元素放在基准值的后面；</span></span>
<span class="line"><span>// 3.分别对较小元素的子序列和较大元素的子序列重复步骤1和2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function quickSort(arr) {</span></span>
<span class="line"><span>  if(arr.length &lt;= 1) return arr;</span></span>
<span class="line"><span>  let temp = arr[0];</span></span>
<span class="line"><span>  let left = [], right = [];</span></span>
<span class="line"><span>  for(var i = 1;i &lt; arr.length;i++){</span></span>
<span class="line"><span>    if(arr[i] &lt; temp) {</span></span>
<span class="line"><span>      left.push(arr[i]);</span></span>
<span class="line"><span>    } else {</span></span>
<span class="line"><span>      right.push(arr[i]);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    // return left.concat(temp).concat(right);</span><span> //一次遍历</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  // return left.concat(temp).concat(right);</span><span> // 一轮遍历</span></span>
<span class="line"><span>  return quickSort(left).concat(temp).concat(quickSort(right)); // 递归处理</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>var arr = [3,2,1,4,2,5,7,2,9,0,5,32,1];</span></span>
<span class="line"><span>console.log(quickSort(arr));</span></span></code></pre></div><h2 id="插入排序" tabindex="-1">插入排序 <a class="header-anchor" href="#插入排序" aria-label="Permalink to &quot;插入排序&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 插入排序</span></span>
<span class="line"><span>// 插入排序是一种简单直观的排序算法</span></span>
<span class="line"><span>// 基本思想：通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。插入排序在实现上，通常采用in-place排序（即只需用到O(1)的额外空间的排序），因而在从后向前扫描过程中，需要反复把已排序元素逐步向后挪位，为最新元素提供插入空间</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 基本步骤：</span></span>
<span class="line"><span>// 1.从第一个元素开始，该元素可以认为已经被排序；</span></span>
<span class="line"><span>// 2.取出下一个元素，在已经排序的元素序列中从后向前扫描；</span></span>
<span class="line"><span>// 3.如果该元素（已排序）大于新元素，将该元素移到下一位置；</span></span>
<span class="line"><span>// 4.重复步骤3，直到找到已排序的元素小于或者等于新元素的位置；</span></span>
<span class="line"><span>// 5.将新元素插入到该位置后；</span></span>
<span class="line"><span>// 6.重复步骤2~5。 </span></span>
<span class="line"><span></span></span>
<span class="line"><span>function insertSort (arr) {</span></span>
<span class="line"><span>  let temp</span></span>
<span class="line"><span>  for(var i = 0;i &lt; arr.length;i++){</span></span>
<span class="line"><span>    temp = arr[i];</span></span>
<span class="line"><span>    for(var j = i;j &gt;= 0;j--){</span></span>
<span class="line"><span>      if (arr[j-1] &gt; temp) {</span></span>
<span class="line"><span>        arr[j] = arr[j-1];</span></span>
<span class="line"><span>      } else {</span></span>
<span class="line"><span>        arr[j] = temp;</span></span>
<span class="line"><span>        break;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  return arr;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>var arr = [3,2,1,4,2,5,7,2,9,0,5,32,1];</span></span>
<span class="line"><span>console.log(insertSort(arr));</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 插入排序改版</span></span>
<span class="line"><span>// function insertSortPro (arr) {</span></span>
<span class="line"><span>//   let temp;</span></span>
<span class="line"><span>//   let arrs = [];</span></span>
<span class="line"><span>//   for (var i = 0;i &lt; arr.length;i++) {</span></span>
<span class="line"><span>//     arrs[i] = arr[i];</span></span>
<span class="line"><span>//     temp = arrs[i];</span></span>
<span class="line"><span>//     for (var j = i;j &gt;= 0;j--) {</span></span>
<span class="line"><span>//       if(arrs[j - 1] &gt; temp) {</span></span>
<span class="line"><span>//         arrs[j] = arrs[j - 1];</span></span>
<span class="line"><span>//       } else {</span></span>
<span class="line"><span>//         arrs[j] = temp;</span></span>
<span class="line"><span>//         break;</span></span>
<span class="line"><span>//       }</span></span>
<span class="line"><span>//     }</span></span>
<span class="line"><span>//   }</span></span>
<span class="line"><span>//   return arrs;</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span>// var arr = [3,2,1,4,2,5,7,2,9,0,5,32,1];</span></span>
<span class="line"><span>// console.log(insertSortPro(arr));</span></span></code></pre></div><h2 id="选择排序" tabindex="-1">选择排序 <a class="header-anchor" href="#选择排序" aria-label="Permalink to &quot;选择排序&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 选择排序</span></span>
<span class="line"><span>// 选择排序是一种简单只管的排序算法</span></span>
<span class="line"><span>// 基本思想：首先在待排序序列中选出最小或最大值，存放在排序序列的起始位置，然后再从剩余未排序元素中继续寻找最小或最大元素，放到已排序序列末尾。以此类推，直到所有元素均排序完毕。</span></span>
<span class="line"><span>// 基本步骤：</span></span>
<span class="line"><span>// 1.初始状态：无序区为R[1..n]，有序区为空；</span></span>
<span class="line"><span>// 2.第i趟排序(i=1,2,3...n-1)开始时，当前有序区和无序区分别为R[1..i-1]和R(i..n）。该趟排序从当前无序区中-选出关键字最小的记录 R[k]，将它与无序区的第1个记录R交换，使R[1..i]和R[i+1..n)分别变为记录个数增加1个的新有序区和记录个数减少1个的新无序区；</span></span>
<span class="line"><span>// 3.n-1趟结束，数组有序化了。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// function selectSort (arr) {</span></span>
<span class="line"><span>//   for (var i = 0;i &lt; arr.length - 1;i++) {</span></span>
<span class="line"><span>//     for(var j = i + 1;j &lt; arr.length;j++) {</span></span>
<span class="line"><span>//       if(arr[j] &lt; arr[i]) {</span></span>
<span class="line"><span>//         [arr[i], arr[j]] = [arr[j], arr[i]];</span></span>
<span class="line"><span>//       }</span></span>
<span class="line"><span>//     }</span></span>
<span class="line"><span>//   }</span></span>
<span class="line"><span>//   return arr;</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span>// var arr = [3,2,1,4,2,5,7,2,9,0,5,32,1];</span></span>
<span class="line"><span>// console.log(selectSort(arr));</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function selectSortPro (arr) {</span></span>
<span class="line"><span>  let minIndex;</span></span>
<span class="line"><span>  for (var i = 0;i &lt; arr.length - 1;i++) {</span></span>
<span class="line"><span>    minIndex = i;</span></span>
<span class="line"><span>    for(var j = i + 1;j &lt; arr.length;j++) {</span></span>
<span class="line"><span>      if(arr[j] &lt; arr[minIndex]) {</span></span>
<span class="line"><span>        minIndex = j;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  return arr;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>var arr = [3,2,1,4,2,5,7,2,9,0,5,32,1];</span></span>
<span class="line"><span>console.log(selectSortPro(arr));</span></span></code></pre></div><h2 id="归并排序" tabindex="-1">归并排序 <a class="header-anchor" href="#归并排序" aria-label="Permalink to &quot;归并排序&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 归并排序</span></span>
<span class="line"><span>// 归并排序是一种借助“归并”进行排序的方法，归并的含义是将两个或两个以上的有序序列归并成一个有序序列的过程</span></span>
<span class="line"><span>// 基本思想：将若干有序序列逐步归并，最终归并为一个有序序列。和选择排序一样，归并排序的性能不收输入数据的影响，但表现比选择排序好得多，因为始终都是O(nlog n)的时间复杂度。代价是需要额外的内存空间</span></span>
<span class="line"><span>// 基本步骤：</span></span>
<span class="line"><span>// 1.把长度为n的输入序列分成两个长度为n/2的子序列；</span></span>
<span class="line"><span>// 2.对这两个子序列分别采用归并排序；</span></span>
<span class="line"><span>// 3.将两个排序好的子序列合并成一个最终的排序序列。</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>function mergeSort (arr) {</span></span>
<span class="line"><span>  if(arr.length &lt; 2) return arr;</span></span>
<span class="line"><span>  let mid, left, right;</span></span>
<span class="line"><span>  mid = Math.floor(arr.length/2);</span></span>
<span class="line"><span>  left = arr.slice(0, mid);</span></span>
<span class="line"><span>  right = arr.slice(mid);</span></span>
<span class="line"><span>  return merge(mergeSort(left), mergeSort(right));</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function merge (left, right) {</span></span>
<span class="line"><span>  let tem = [];</span></span>
<span class="line"><span>  while (left.length &amp;&amp; right.length) {</span></span>
<span class="line"><span>    if(left[0] &lt; right[0]) {</span></span>
<span class="line"><span>      tem.push(left.shift());</span></span>
<span class="line"><span>    } else {</span></span>
<span class="line"><span>      tem.push(right.shift());</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  return tem.concat(left, right);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>var arr = [3,2,1,4,2,5,7,2,9,0,5,32,1];</span></span>
<span class="line"><span>console.log(mergeSort(arr));</span></span></code></pre></div><h2 id="希尔排序" tabindex="-1">希尔排序 <a class="header-anchor" href="#希尔排序" aria-label="Permalink to &quot;希尔排序&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 希尔排序</span></span>
<span class="line"><span>// 希尔排序是插入排序的一种，也称缩小增量排序，是直接插入排序算法的一种更高效的改进版本。希尔排序是非稳定排序算法</span></span>
<span class="line"><span>// 基本思想：把记录按下标的一定增量分组，对每组使用直接插入排序算法排序；随着增量逐渐减少，每组包含的关键词越来越多，当增量减至1时，整个文件恰被分成一组，算法便终止。</span></span>
<span class="line"><span>// 基本步骤：</span></span>
<span class="line"><span>// 1.选择一个增量序列t1，t2，…，tk，其中ti&gt;tj，tk=1；</span></span>
<span class="line"><span>// 2.按增量序列个数k，对序列进行k 趟排序；</span></span>
<span class="line"><span>// 3.每趟排序，根据对应的增量ti，将待排序列分割成若干长度为m 的子序列，分别对各子表进行直接插入排序。仅增量因子为1 时，整个序列作为一个表来处理，表长度即为整个序列的长度。</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>function shellSort(arr) {</span></span>
<span class="line"><span>  let len = arr.length,</span></span>
<span class="line"><span>    gap = ~~(len / 2),</span></span>
<span class="line"><span>    cur;</span></span>
<span class="line"><span>  for (gap; gap &gt; 0; gap = ~~(gap / 2)) {</span></span>
<span class="line"><span>    for (let i = gap; i &lt; len; i++) {</span></span>
<span class="line"><span>      cur = arr[i];</span></span>
<span class="line"><span>      let j = i;</span></span>
<span class="line"><span>      while (j - gap &gt;= 0 &amp;&amp; arr[j - gap] &gt; cur) {</span></span>
<span class="line"><span>        arr[j] = arr[j - gap];</span></span>
<span class="line"><span>        j -= gap;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      arr[j] = cur;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  console.log(arr);</span></span>
<span class="line"><span>  return arr;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>var arr = [8, 9, 1, 7, 2, 3, 5, 4, 6, 0];</span></span>
<span class="line"><span>shellSort(arr);</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>// var arr = [8, 9, 1, 7, 2, 3, 5, 4, 6, 0];</span></span>
<span class="line"><span>// var arr = [3, 5, 1, 6, 0, 8, 9, 4, 7, 2];</span><span> // gap = 5</span></span>
<span class="line"><span>// var arr = [0, 2, 1, 4, 3, 5, 7, 6, 9, 8];</span><span> // gap = 2</span></span>
<span class="line"><span>// var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];</span><span> // gap = 1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// function shellSort(arr) {</span></span>
<span class="line"><span>//   var len = arr.length;</span></span>
<span class="line"><span>//   let time = 0;</span></span>
<span class="line"><span>//   for(let gap = Math.floor(len / 2); gap &gt; 0; gap = Math.floor(gap / 2)) {</span></span>
<span class="line"><span>//       for(let i = gap; i &lt; len;i++) {</span></span>
<span class="line"><span>//           var j = i;</span></span>
<span class="line"><span>//           var current = arr[i];</span></span>
<span class="line"><span>//           while (j - gap &gt;= 0 &amp;&amp; current &lt; arr[j - gap]) {</span></span>
<span class="line"><span>//                arr[j] = arr[j - gap];</span></span>
<span class="line"><span>//                j = j - gap;</span></span>
<span class="line"><span>//           }</span></span>
<span class="line"><span>//           arr[j] = current;</span></span>
<span class="line"><span>//           console.log(\`第\${time}轮，第\${i}小轮，gap、arr、i：\`,gap, i, arr);</span></span>
<span class="line"><span>//       }</span></span>
<span class="line"><span>//       console.log(\`第\${time++}轮，gap、arr：\`,gap,arr);</span></span>
<span class="line"><span>//   }</span></span>
<span class="line"><span>//</span><span>   // console.log(arr);</span></span>
<span class="line"><span>//   return arr;</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// var arr = [8, 9, 1, 7, 2, 3, 5, 4, 6, 0];</span></span>
<span class="line"><span>// shellSort(arr);</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>// function shellSort (arr) {</span></span>
<span class="line"><span>//   var len = arr.length,</span></span>
<span class="line"><span>//     temp,</span></span>
<span class="line"><span>//     gap = 1;</span></span>
<span class="line"><span>//   while(gap &lt; len/3) {</span></span>
<span class="line"><span>//     gap = gap * 3 + 1;</span></span>
<span class="line"><span>//   }</span></span>
<span class="line"><span>//   for (gap;gap &gt; 0;gap = Math.floor(gap/3)) {</span></span>
<span class="line"><span>//     for (var i = gap;i &lt; len;i++) {</span></span>
<span class="line"><span>//       temp = arr[i];</span></span>
<span class="line"><span>//       for(var j = i - gap;j &gt;= 0 &amp;&amp; arr[j] &gt; temp;j -= gap) {</span></span>
<span class="line"><span>//         arr[j + gap] = arr[j];</span></span>
<span class="line"><span>//       }</span></span>
<span class="line"><span>//       arr[j + gap] = temp;</span></span>
<span class="line"><span>//     }</span></span>
<span class="line"><span>//   }</span></span>
<span class="line"><span>//   console.log(arr);</span></span>
<span class="line"><span>//   return arr;</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span>// var arr = [8, 9, 1, 7, 2, 3, 5, 4, 6, 0];</span></span>
<span class="line"><span>// shellSort(arr);</span></span></code></pre></div><h2 id="计数排序" tabindex="-1">计数排序 <a class="header-anchor" href="#计数排序" aria-label="Permalink to &quot;计数排序&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 计数排序</span></span>
<span class="line"><span>// 计数排序是一种稳定的排序算法</span></span>
<span class="line"><span>// 基本思想：使用一个额外的数组C，其中第i个元素是待排序数组A中值等于i的元素的个数。然后根据数组C来将数组A中的元素排到正确的位置。它只能对整数进行排序</span></span>
<span class="line"><span>// 基本步骤</span></span>
<span class="line"><span>// 1.找出待排序的数组中最大和最小的元素；</span></span>
<span class="line"><span>// 2.统计数组中每个值为i的元素出现的次数，存入数组C的第i项；</span></span>
<span class="line"><span>// 3.对所有的计数累加（从C中的第一个元素开始，每一项和前一项相加）；</span></span>
<span class="line"><span>// 4.反向填充目标数组：将每个元素i放在新数组的第C(i)项，每放一个元素就将C(i)减去1.</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 简单版</span></span>
<span class="line"><span>let arr = [3,2,1,2,3,2,0,4,10];</span></span>
<span class="line"><span>function countingSort (arr) {</span></span>
<span class="line"><span>  // 查：</span></span>
<span class="line"><span>  let counts = [];</span></span>
<span class="line"><span>  for(let v of arr) {</span></span>
<span class="line"><span>    counts[v] = (counts[v] || 0) + 1;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  console.log(&#39;counts:&#39;, counts);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 排：</span></span>
<span class="line"><span>  let result = [];</span></span>
<span class="line"><span>  for(let i = 0;i &lt; counts.length;i++) {</span></span>
<span class="line"><span>    let count = counts[i];</span></span>
<span class="line"><span>    console.log(&quot;count--i:&quot;, count, i);</span></span>
<span class="line"><span>    while(count &gt; 0) {</span></span>
<span class="line"><span>      result.push(i);</span></span>
<span class="line"><span>      count--;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  console.log(&#39;result&#39;, result);</span></span>
<span class="line"><span>  return result;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>countingSort(arr);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 兼容负数</span></span>
<span class="line"><span>// let arr = [-3,-2,-1,0,-5,-6];</span></span>
<span class="line"><span>// function countingSort(arr){</span></span>
<span class="line"><span>//   let counts = [],result = [];</span></span>
<span class="line"><span>//   let min = Math.min(...arr);</span></span>
<span class="line"><span>//   for(let v of arr) {</span></span>
<span class="line"><span>//     counts[v-min]=(counts[v-min] || 0) + 1;</span></span>
<span class="line"><span>//   }</span></span>
<span class="line"><span>//   for(let i = 0;i &lt; counts.length;i++){</span></span>
<span class="line"><span>//     if(counts[i]&gt;0){</span></span>
<span class="line"><span>//       result.push(i+min);</span></span>
<span class="line"><span>//     }</span></span>
<span class="line"><span>//   }</span></span>
<span class="line"><span>//   console.log(result);</span></span>
<span class="line"><span>//   return result;</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>// countingSort(arr);</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 复杂版</span></span>
<span class="line"><span>// let arr = [3,2,1,2,3,2,0,4,10];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// function countingSort(arr) {</span></span>
<span class="line"><span>//   let len = arr.length,b = [],c=[],min=max=arr[0];</span></span>
<span class="line"><span>//   for(let i=0;i&lt;len;i++){</span></span>
<span class="line"><span>//     min=min&lt;=arr[i]?min:arr[i];</span></span>
<span class="line"><span>//     max=max&gt;=arr[i]?max:arr[i];</span></span>
<span class="line"><span>//     c[arr[i]] = c[arr[i]] ? c[arr[i]] + 1:1;</span></span>
<span class="line"><span>//   }</span></span>
<span class="line"><span>//   console.log(&quot;c:&quot;,c);</span></span>
<span class="line"><span>//   for(let i=min;i&lt;max;i++){</span></span>
<span class="line"><span>//     c[i+1]=(c[i+1]||0)+(c[i]||0);</span></span>
<span class="line"><span>//   }</span></span>
<span class="line"><span>//   console.log(&#39;c---:&#39;,c);</span></span>
<span class="line"><span>//   for(let i=len-1;i&gt;=0;i--){</span></span>
<span class="line"><span>//     b[c[arr[i]]-1]=arr[i];</span></span>
<span class="line"><span>//     c[arr[i]]--;</span></span>
<span class="line"><span>//     console.log(\`第\${i}轮--c--b：\`,c,b);</span></span>
<span class="line"><span>//   }</span></span>
<span class="line"><span>//   console.log(&quot;b:&quot;,b);</span></span>
<span class="line"><span>//   return b;</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span>// countingSort(arr);</span></span></code></pre></div><h2 id="基数排序" tabindex="-1">基数排序 <a class="header-anchor" href="#基数排序" aria-label="Permalink to &quot;基数排序&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 基数排序</span></span>
<span class="line"><span>// 基数排序也是非比较的排序算法</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 基本思想：按照低位先排序，然后收集；再按照高位排序，然后再收集；依次类推，知道最高位。有些时候属性是有优先级顺序的，先按低优先级排序，再按高优先级排序。最后的次序就是高优先级高的在前，高优先级相同的低优先级高的在前。基数排序基于分别排序，分别收集，所以是稳定的。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 基本步骤：</span></span>
<span class="line"><span>// 1.取得数组中的最大数，并取得位数</span></span>
<span class="line"><span>// 2.arr为原始数组，从最低位开始取每个位组成radix数组；</span></span>
<span class="line"><span>// 3.对radix进行计数排序（利用计数排序适用于小范围数的特点）</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>var arr = [3,2,1,2,3,2,0,4,10];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function radixSort (arr, maxDigit) {</span></span>
<span class="line"><span>  let counter = [],mod = 10,dev=1;</span></span>
<span class="line"><span>  for(let i = 0;i&lt;maxDigit;i++,dev*=10,mod*=10){</span></span>
<span class="line"><span>    for(let j=0;j&lt;arr.length;j++){</span></span>
<span class="line"><span>      // console.log(&quot;arr[j]:&quot;, arr[j]);</span></span>
<span class="line"><span>      let bucket = parseInt((arr[j]%mod)/dev);</span></span>
<span class="line"><span>      // console.log(&quot;bucket:&quot;, bucket);</span></span>
<span class="line"><span>      if(counter[bucket] == null){</span></span>
<span class="line"><span>        counter[bucket]=[];</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      counter[bucket].push(arr[j]);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    // console.log(&#39;第&#39;+i+&#39;轮counter:&#39;,counter);</span></span>
<span class="line"><span>    let pos = 0;</span></span>
<span class="line"><span>    for(let j = 0;j &lt; counter.length;j++){</span></span>
<span class="line"><span>      let value = null;</span></span>
<span class="line"><span>      if(counter[j]!=null){</span></span>
<span class="line"><span>        while((value = counter[j].shift()) != null){</span></span>
<span class="line"><span>          arr[pos++]=value;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    // console.log(&#39;第&#39;+i+&#39;轮arr:&#39;,arr);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  console.log(arr);</span></span>
<span class="line"><span>  return arr;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>radixSort(arr,2);</span></span></code></pre></div>`,16)]))}const d=s(e,[["render",i]]);export{h as __pageData,d as default};
