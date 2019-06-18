
/*
* ES6中数组的常用的四个方法
*
* map-----映射 一个对应一个
* reduce--汇总 一堆出来一个
* filter--过滤器
* forEach-循环(迭代)
*
* */

// map
/*求一组成绩中的及格数*/
let arr1 = [45, 52, 96, 42, 86];
let arr2 = []
// arr2=arr1.map(function (item) {
//     if (item>=60) {
//         return '及格'
//     }else{
//         return '不及格'
//     }
// })
arr2 = arr1.map(item => item >= 60 ? '及格' : '不及格')
console.log(arr2);

/*循环数组，每次都乘2，并返回新数组*/
let arr3 = [12, 33, 23, 55];
let arr4 = []
arr4 = arr3.map(item => item * 2)
console.log(arr4);


//reduce
// let arr=[2,14,31,1,4,3]
// arr.reduce(function(a,b,c){
//     alert(a+","+b+","+c)
// })

/*求和*/
// let arr=[2,14,31,1,4,3]
// let result=arr.reduce(function(tmp,item,index){
//     console.log("tmp:"+tmp);
//     console.log("item:"+item);
//     console.log("==========================");
//     return tmp+item
// })
// console.log(result)

/*求平均数*/
let arr = [2, 14, 31, 1, 4, 3];
/**
 * tmp 前两个数之和
 * itme 自身的数
 * index 索引，从1开始
 * @type {number|any}
 */
let result = arr.reduce(function (tmp, item, index) {
    if (index !== arr.length - 1) {
        // 不是最后一项，继续相加
        return tmp + item
    } else {
        // 最后一项将结果除以数组长度
        return parseInt((tmp + item) / arr.length)
    }
})
console.log(result)

/*filter 过滤器 留下符合条件的一部分*/
var arr5 = [23, 323];
let arr6 = arr5.filter(() => {
    return true
})
console.log(arr6);
/*(2) [23, 323] 因为返回true，所有都返回了*/
var arr7 = [23, 323];
let arr8 = arr6.filter(() => {
    return false
})
console.log(arr8);
/*[] 因为返回false ，所有都没返回*/
/*取出所有被3整出的数*/
// let arr55 = [21, 34, 56, 9, 99, 51]
// let arr56 = arr55.filter(item => {
//     if(item%3==0){
//         return true
//     }else{
//         return false
//     }
// })
// console.log(arr56);
let arr55 = [21, 34, 56, 9, 99, 51]
let arr56 = arr55.filter(item =>item%3==0)
console.log(arr56);

/*forEach 就是普通的循环，第二个参数是可选的，是index*/
let arrForEach=[12,2,332,44]
arrForEach.forEach((item,index)=>{
    console.log(index+":"+item);
})
