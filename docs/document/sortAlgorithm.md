## 冒泡排序
```
// 冒泡排序

// 基本思想：重复遍历要排序的数组，每次比较两个元素的大小，如果顺序错误就交换两个元素的顺序，遍历数组重复进行比较直到排序完成
// 基本步骤：1.比较相邻的两个元素。如果第一个比第二个大，则交换位置；
// 2.对每一对相邻元素重复第一个步骤，从开始第一对到结尾的最后一对，这样在最后的元素应该会是最大的数；
// 3.针对所有的元素重复以上的步骤，除了最后一个；
// 4.重复步骤1~3，直到排序完成。

// function bubbleSort (arr) {
//   for (let i = 0;i < arr.length - 1;i++) {
//     for (let j = i + 1;j < arr.length;j++) {
//       if(arr[i] > arr[j]) {
//         [arr[i], arr[j]] = [arr[j], arr[i]];
//       }
//     }
//     // break; //每次循环把一个最小的值放在最前面
//   }
//   console.log(arr);
//   return arr;
// }

// 冒泡排序每轮循环找出一个最大的 选择排序每轮循环找出一个最小的

function bubbleSort (arr) {
  for (let i = 0;i < arr.length;i++){
    for(let j  = 0;j < arr.length - 1 -i;j++){
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
    // break; // 每次循环把一个最大的值放在最前面
  }
  console.log(arr);
  return arr;
}
var arr = [8, 5, 4, 3, 1, 7, 9, 2];
bubbleSort(arr);
```

## 快速排序
```
// 快速排序

// 基本思想：是一种对冒泡排序改进的算法，是处理大数据最快的排序算法之一。是一种分治思想的算法，找出一个参考值，通过递归的方式将数据一次分解为包含较小元素和较大元素的不同子序列，不断重复这个步骤直至所有数据都是有序的

// 基本步骤：
// 1.选择一个参考元素，将列表分割成两个子序列；
// 2.对列表重新排序，将所有小于基准值的元素放在基准值前面，所有大于基准值的元素放在基准值的后面；
// 3.分别对较小元素的子序列和较大元素的子序列重复步骤1和2

function quickSort(arr) {
  if(arr.length <= 1) return arr;
  let temp = arr[0];
  let left = [], right = [];
  for(var i = 1;i < arr.length;i++){
    if(arr[i] < temp) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
    // return left.concat(temp).concat(right); //一次遍历
  }
  // return left.concat(temp).concat(right); // 一轮遍历
  return quickSort(left).concat(temp).concat(quickSort(right)); // 递归处理
}

var arr = [3,2,1,4,2,5,7,2,9,0,5,32,1];
console.log(quickSort(arr));
```

## 插入排序
```
// 插入排序
// 插入排序是一种简单直观的排序算法
// 基本思想：通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。插入排序在实现上，通常采用in-place排序（即只需用到O(1)的额外空间的排序），因而在从后向前扫描过程中，需要反复把已排序元素逐步向后挪位，为最新元素提供插入空间

// 基本步骤：
// 1.从第一个元素开始，该元素可以认为已经被排序；
// 2.取出下一个元素，在已经排序的元素序列中从后向前扫描；
// 3.如果该元素（已排序）大于新元素，将该元素移到下一位置；
// 4.重复步骤3，直到找到已排序的元素小于或者等于新元素的位置；
// 5.将新元素插入到该位置后；
// 6.重复步骤2~5。 

function insertSort (arr) {
  let temp
  for(var i = 0;i < arr.length;i++){
    temp = arr[i];
    for(var j = i;j >= 0;j--){
      if (arr[j-1] > temp) {
        arr[j] = arr[j-1];
      } else {
        arr[j] = temp;
        break;
      }
    }
  }
  return arr;
}

var arr = [3,2,1,4,2,5,7,2,9,0,5,32,1];
console.log(insertSort(arr));

// 插入排序改版
// function insertSortPro (arr) {
//   let temp;
//   let arrs = [];
//   for (var i = 0;i < arr.length;i++) {
//     arrs[i] = arr[i];
//     temp = arrs[i];
//     for (var j = i;j >= 0;j--) {
//       if(arrs[j - 1] > temp) {
//         arrs[j] = arrs[j - 1];
//       } else {
//         arrs[j] = temp;
//         break;
//       }
//     }
//   }
//   return arrs;
// }
// var arr = [3,2,1,4,2,5,7,2,9,0,5,32,1];
// console.log(insertSortPro(arr));
```
## 选择排序
```
// 选择排序
// 选择排序是一种简单只管的排序算法
// 基本思想：首先在待排序序列中选出最小或最大值，存放在排序序列的起始位置，然后再从剩余未排序元素中继续寻找最小或最大元素，放到已排序序列末尾。以此类推，直到所有元素均排序完毕。
// 基本步骤：
// 1.初始状态：无序区为R[1..n]，有序区为空；
// 2.第i趟排序(i=1,2,3...n-1)开始时，当前有序区和无序区分别为R[1..i-1]和R(i..n）。该趟排序从当前无序区中-选出关键字最小的记录 R[k]，将它与无序区的第1个记录R交换，使R[1..i]和R[i+1..n)分别变为记录个数增加1个的新有序区和记录个数减少1个的新无序区；
// 3.n-1趟结束，数组有序化了。

// function selectSort (arr) {
//   for (var i = 0;i < arr.length - 1;i++) {
//     for(var j = i + 1;j < arr.length;j++) {
//       if(arr[j] < arr[i]) {
//         [arr[i], arr[j]] = [arr[j], arr[i]];
//       }
//     }
//   }
//   return arr;
// }
// var arr = [3,2,1,4,2,5,7,2,9,0,5,32,1];
// console.log(selectSort(arr));

function selectSortPro (arr) {
  let minIndex;
  for (var i = 0;i < arr.length - 1;i++) {
    minIndex = i;
    for(var j = i + 1;j < arr.length;j++) {
      if(arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  }
  return arr;
}
var arr = [3,2,1,4,2,5,7,2,9,0,5,32,1];
console.log(selectSortPro(arr));
```

## 归并排序
```
// 归并排序
// 归并排序是一种借助“归并”进行排序的方法，归并的含义是将两个或两个以上的有序序列归并成一个有序序列的过程
// 基本思想：将若干有序序列逐步归并，最终归并为一个有序序列。和选择排序一样，归并排序的性能不收输入数据的影响，但表现比选择排序好得多，因为始终都是O(nlog n)的时间复杂度。代价是需要额外的内存空间
// 基本步骤：
// 1.把长度为n的输入序列分成两个长度为n/2的子序列；
// 2.对这两个子序列分别采用归并排序；
// 3.将两个排序好的子序列合并成一个最终的排序序列。



function mergeSort (arr) {
  if(arr.length < 2) return arr;
  let mid, left, right;
  mid = Math.floor(arr.length/2);
  left = arr.slice(0, mid);
  right = arr.slice(mid);
  return merge(mergeSort(left), mergeSort(right));
}

function merge (left, right) {
  let tem = [];
  while (left.length && right.length) {
    if(left[0] < right[0]) {
      tem.push(left.shift());
    } else {
      tem.push(right.shift());
    }
  }
  return tem.concat(left, right);
}

var arr = [3,2,1,4,2,5,7,2,9,0,5,32,1];
console.log(mergeSort(arr));
```
## 希尔排序
```
// 希尔排序
// 希尔排序是插入排序的一种，也称缩小增量排序，是直接插入排序算法的一种更高效的改进版本。希尔排序是非稳定排序算法
// 基本思想：把记录按下标的一定增量分组，对每组使用直接插入排序算法排序；随着增量逐渐减少，每组包含的关键词越来越多，当增量减至1时，整个文件恰被分成一组，算法便终止。
// 基本步骤：
// 1.选择一个增量序列t1，t2，…，tk，其中ti>tj，tk=1；
// 2.按增量序列个数k，对序列进行k 趟排序；
// 3.每趟排序，根据对应的增量ti，将待排序列分割成若干长度为m 的子序列，分别对各子表进行直接插入排序。仅增量因子为1 时，整个序列作为一个表来处理，表长度即为整个序列的长度。




function shellSort(arr) {
  let len = arr.length,
    gap = ~~(len / 2),
    cur;
  for (gap; gap > 0; gap = ~~(gap / 2)) {
    for (let i = gap; i < len; i++) {
      cur = arr[i];
      let j = i;
      while (j - gap >= 0 && arr[j - gap] > cur) {
        arr[j] = arr[j - gap];
        j -= gap;
      }
      arr[j] = cur;
    }
  }
  console.log(arr);
  return arr;
}

var arr = [8, 9, 1, 7, 2, 3, 5, 4, 6, 0];
shellSort(arr);



// var arr = [8, 9, 1, 7, 2, 3, 5, 4, 6, 0];
// var arr = [3, 5, 1, 6, 0, 8, 9, 4, 7, 2]; // gap = 5
// var arr = [0, 2, 1, 4, 3, 5, 7, 6, 9, 8]; // gap = 2
// var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; // gap = 1

// function shellSort(arr) {
//   var len = arr.length;
//   let time = 0;
//   for(let gap = Math.floor(len / 2); gap > 0; gap = Math.floor(gap / 2)) {
//       for(let i = gap; i < len;i++) {
//           var j = i;
//           var current = arr[i];
//           while (j - gap >= 0 && current < arr[j - gap]) {
//                arr[j] = arr[j - gap];
//                j = j - gap;
//           }
//           arr[j] = current;
//           console.log(`第${time}轮，第${i}小轮，gap、arr、i：`,gap, i, arr);
//       }
//       console.log(`第${time++}轮，gap、arr：`,gap,arr);
//   }
//   // console.log(arr);
//   return arr;
// }

// var arr = [8, 9, 1, 7, 2, 3, 5, 4, 6, 0];
// shellSort(arr);


// function shellSort (arr) {
//   var len = arr.length,
//     temp,
//     gap = 1;
//   while(gap < len/3) {
//     gap = gap * 3 + 1;
//   }
//   for (gap;gap > 0;gap = Math.floor(gap/3)) {
//     for (var i = gap;i < len;i++) {
//       temp = arr[i];
//       for(var j = i - gap;j >= 0 && arr[j] > temp;j -= gap) {
//         arr[j + gap] = arr[j];
//       }
//       arr[j + gap] = temp;
//     }
//   }
//   console.log(arr);
//   return arr;
// }
// var arr = [8, 9, 1, 7, 2, 3, 5, 4, 6, 0];
// shellSort(arr);

```
## 计数排序
```
// 计数排序
// 计数排序是一种稳定的排序算法
// 基本思想：使用一个额外的数组C，其中第i个元素是待排序数组A中值等于i的元素的个数。然后根据数组C来将数组A中的元素排到正确的位置。它只能对整数进行排序
// 基本步骤
// 1.找出待排序的数组中最大和最小的元素；
// 2.统计数组中每个值为i的元素出现的次数，存入数组C的第i项；
// 3.对所有的计数累加（从C中的第一个元素开始，每一项和前一项相加）；
// 4.反向填充目标数组：将每个元素i放在新数组的第C(i)项，每放一个元素就将C(i)减去1.






// 简单版
let arr = [3,2,1,2,3,2,0,4,10];
function countingSort (arr) {
  // 查：
  let counts = [];
  for(let v of arr) {
    counts[v] = (counts[v] || 0) + 1;
  }
  console.log('counts:', counts);

  // 排：
  let result = [];
  for(let i = 0;i < counts.length;i++) {
    let count = counts[i];
    console.log("count--i:", count, i);
    while(count > 0) {
      result.push(i);
      count--;
    }
  }
  console.log('result', result);
  return result;
}

countingSort(arr);

// 兼容负数
// let arr = [-3,-2,-1,0,-5,-6];
// function countingSort(arr){
//   let counts = [],result = [];
//   let min = Math.min(...arr);
//   for(let v of arr) {
//     counts[v-min]=(counts[v-min] || 0) + 1;
//   }
//   for(let i = 0;i < counts.length;i++){
//     if(counts[i]>0){
//       result.push(i+min);
//     }
//   }
//   console.log(result);
//   return result;
// }


// countingSort(arr);


// 复杂版
// let arr = [3,2,1,2,3,2,0,4,10];

// function countingSort(arr) {
//   let len = arr.length,b = [],c=[],min=max=arr[0];
//   for(let i=0;i<len;i++){
//     min=min<=arr[i]?min:arr[i];
//     max=max>=arr[i]?max:arr[i];
//     c[arr[i]] = c[arr[i]] ? c[arr[i]] + 1:1;
//   }
//   console.log("c:",c);
//   for(let i=min;i<max;i++){
//     c[i+1]=(c[i+1]||0)+(c[i]||0);
//   }
//   console.log('c---:',c);
//   for(let i=len-1;i>=0;i--){
//     b[c[arr[i]]-1]=arr[i];
//     c[arr[i]]--;
//     console.log(`第${i}轮--c--b：`,c,b);
//   }
//   console.log("b:",b);
//   return b;
// }
// countingSort(arr);
```
## 基数排序
```
// 基数排序
// 基数排序也是非比较的排序算法

// 基本思想：按照低位先排序，然后收集；再按照高位排序，然后再收集；依次类推，知道最高位。有些时候属性是有优先级顺序的，先按低优先级排序，再按高优先级排序。最后的次序就是高优先级高的在前，高优先级相同的低优先级高的在前。基数排序基于分别排序，分别收集，所以是稳定的。

// 基本步骤：
// 1.取得数组中的最大数，并取得位数
// 2.arr为原始数组，从最低位开始取每个位组成radix数组；
// 3.对radix进行计数排序（利用计数排序适用于小范围数的特点）


var arr = [3,2,1,2,3,2,0,4,10];

function radixSort (arr, maxDigit) {
  let counter = [],mod = 10,dev=1;
  for(let i = 0;i<maxDigit;i++,dev*=10,mod*=10){
    for(let j=0;j<arr.length;j++){
      // console.log("arr[j]:", arr[j]);
      let bucket = parseInt((arr[j]%mod)/dev);
      // console.log("bucket:", bucket);
      if(counter[bucket] == null){
        counter[bucket]=[];
      }
      counter[bucket].push(arr[j]);
    }
    // console.log('第'+i+'轮counter:',counter);
    let pos = 0;
    for(let j = 0;j < counter.length;j++){
      let value = null;
      if(counter[j]!=null){
        while((value = counter[j].shift()) != null){
          arr[pos++]=value;
        }
      }
    }
    // console.log('第'+i+'轮arr:',arr);
  }
  
  console.log(arr);
  return arr;
}

radixSort(arr,2);
```
