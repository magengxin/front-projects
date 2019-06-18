'use strict';

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
var arr1 = [45, 52, 96, 42, 86];
var arr2 = [];
// arr2=arr1.map(function (item) {
//     if (item>=60) {
//         return '及格'
//     }else{
//         return '不及格'
//     }
// })
arr2 = arr1.map(function (item) {
    return item >= 60 ? '及格' : '不及格';
});
console.log(arr2);

/*循环数组，每次都乘2，并返回新数组*/
var arr3 = [12, 33, 23, 55];
var arr4 = [];
arr4 = arr3.map(function (item) {
    return item * 2;
});
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
var arr = [2, 14, 31, 1, 4, 3];
/**
 * tmp 前两个数之和
 * itme 自身的数
 * index 索引，从1开始
 * @type {number|any}
 */
var result = arr.reduce(function (tmp, item, index) {
    if (index !== arr.length - 1) {
        // 不是最后一项，继续相加
        return tmp + item;
    } else {
        // 最后一项将结果除以数组长度
        return parseInt((tmp + item) / arr.length);
    }
});
console.log(result);

/*filter 过滤器 留下符合条件的一部分*/
var arr5 = [23, 323];
var arr6 = arr5.filter(function () {
    return true;
});
console.log(arr6);
/*(2) [23, 323] 因为返回true，所有都返回了*/
var arr7 = [23, 323];
var arr8 = arr6.filter(function () {
    return false;
});
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
var arr55 = [21, 34, 56, 9, 99, 51];
var arr56 = arr55.filter(function (item) {
    return item % 3 == 0;
});
console.log(arr56);

/*forEach 就是普通的循环，第二个参数是可选的，是index*/
var arrForEach = [12, 2, 332, 44];
arrForEach.forEach(function (item, index) {
    console.log(index + ":" + item);
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhcnJheS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8qXHJcbiogRVM25Lit5pWw57uE55qE5bi455So55qE5Zub5Liq5pa55rOVXHJcbipcclxuKiBtYXAtLS0tLeaYoOWwhCDkuIDkuKrlr7nlupTkuIDkuKpcclxuKiByZWR1Y2UtLeaxh+aAuyDkuIDloIblh7rmnaXkuIDkuKpcclxuKiBmaWx0ZXItLei/h+a7pOWZqFxyXG4qIGZvckVhY2gt5b6q546vKOi/reS7oylcclxuKlxyXG4qICovXG5cbi8vIG1hcFxuLyrmsYLkuIDnu4TmiJDnu6nkuK3nmoTlj4rmoLzmlbAqL1xudmFyIGFycjEgPSBbNDUsIDUyLCA5NiwgNDIsIDg2XTtcbnZhciBhcnIyID0gW107XG4vLyBhcnIyPWFycjEubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4vLyAgICAgaWYgKGl0ZW0+PTYwKSB7XG4vLyAgICAgICAgIHJldHVybiAn5Y+K5qC8J1xuLy8gICAgIH1lbHNle1xuLy8gICAgICAgICByZXR1cm4gJ+S4jeWPiuagvCdcbi8vICAgICB9XG4vLyB9KVxuYXJyMiA9IGFycjEubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgcmV0dXJuIGl0ZW0gPj0gNjAgPyAn5Y+K5qC8JyA6ICfkuI3lj4rmoLwnO1xufSk7XG5jb25zb2xlLmxvZyhhcnIyKTtcblxuLyrlvqrnjq/mlbDnu4TvvIzmr4/mrKHpg73kuZgy77yM5bm26L+U5Zue5paw5pWw57uEKi9cbnZhciBhcnIzID0gWzEyLCAzMywgMjMsIDU1XTtcbnZhciBhcnI0ID0gW107XG5hcnI0ID0gYXJyMy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICByZXR1cm4gaXRlbSAqIDI7XG59KTtcbmNvbnNvbGUubG9nKGFycjQpO1xuXG4vL3JlZHVjZVxuLy8gbGV0IGFycj1bMiwxNCwzMSwxLDQsM11cbi8vIGFyci5yZWR1Y2UoZnVuY3Rpb24oYSxiLGMpe1xuLy8gICAgIGFsZXJ0KGErXCIsXCIrYitcIixcIitjKVxuLy8gfSlcblxuLyrmsYLlkowqL1xuLy8gbGV0IGFycj1bMiwxNCwzMSwxLDQsM11cbi8vIGxldCByZXN1bHQ9YXJyLnJlZHVjZShmdW5jdGlvbih0bXAsaXRlbSxpbmRleCl7XG4vLyAgICAgY29uc29sZS5sb2coXCJ0bXA6XCIrdG1wKTtcbi8vICAgICBjb25zb2xlLmxvZyhcIml0ZW06XCIraXRlbSk7XG4vLyAgICAgY29uc29sZS5sb2coXCI9PT09PT09PT09PT09PT09PT09PT09PT09PVwiKTtcbi8vICAgICByZXR1cm4gdG1wK2l0ZW1cbi8vIH0pXG4vLyBjb25zb2xlLmxvZyhyZXN1bHQpXG5cbi8q5rGC5bmz5Z2H5pWwKi9cbnZhciBhcnIgPSBbMiwgMTQsIDMxLCAxLCA0LCAzXTtcbi8qKlxyXG4gKiB0bXAg5YmN5Lik5Liq5pWw5LmL5ZKMXHJcbiAqIGl0bWUg6Ieq6Lqr55qE5pWwXHJcbiAqIGluZGV4IOe0ouW8le+8jOS7jjHlvIDlp4tcclxuICogQHR5cGUge251bWJlcnxhbnl9XHJcbiAqL1xudmFyIHJlc3VsdCA9IGFyci5yZWR1Y2UoZnVuY3Rpb24gKHRtcCwgaXRlbSwgaW5kZXgpIHtcbiAgICBpZiAoaW5kZXggIT09IGFyci5sZW5ndGggLSAxKSB7XG4gICAgICAgIC8vIOS4jeaYr+acgOWQjuS4gOmhue+8jOe7p+e7reebuOWKoFxuICAgICAgICByZXR1cm4gdG1wICsgaXRlbTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyDmnIDlkI7kuIDpobnlsIbnu5PmnpzpmaTku6XmlbDnu4Tplb/luqZcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KCh0bXAgKyBpdGVtKSAvIGFyci5sZW5ndGgpO1xuICAgIH1cbn0pO1xuY29uc29sZS5sb2cocmVzdWx0KTtcblxuLypmaWx0ZXIg6L+H5ruk5ZmoIOeVmeS4i+espuWQiOadoeS7tueahOS4gOmDqOWIhiovXG52YXIgYXJyNSA9IFsyMywgMzIzXTtcbnZhciBhcnI2ID0gYXJyNS5maWx0ZXIoZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0cnVlO1xufSk7XG5jb25zb2xlLmxvZyhhcnI2KTtcbi8qKDIpwqBbMjMsIDMyM10g5Zug5Li66L+U5ZuedHJ1Ze+8jOaJgOaciemDvei/lOWbnuS6hiovXG52YXIgYXJyNyA9IFsyMywgMzIzXTtcbnZhciBhcnI4ID0gYXJyNi5maWx0ZXIoZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBmYWxzZTtcbn0pO1xuY29uc29sZS5sb2coYXJyOCk7XG4vKltdIOWboOS4uui/lOWbnmZhbHNlIO+8jOaJgOaciemDveayoei/lOWbniovXG4vKuWPluWHuuaJgOacieiiqzPmlbTlh7rnmoTmlbAqL1xuLy8gbGV0IGFycjU1ID0gWzIxLCAzNCwgNTYsIDksIDk5LCA1MV1cbi8vIGxldCBhcnI1NiA9IGFycjU1LmZpbHRlcihpdGVtID0+IHtcbi8vICAgICBpZihpdGVtJTM9PTApe1xuLy8gICAgICAgICByZXR1cm4gdHJ1ZVxuLy8gICAgIH1lbHNle1xuLy8gICAgICAgICByZXR1cm4gZmFsc2Vcbi8vICAgICB9XG4vLyB9KVxuLy8gY29uc29sZS5sb2coYXJyNTYpO1xudmFyIGFycjU1ID0gWzIxLCAzNCwgNTYsIDksIDk5LCA1MV07XG52YXIgYXJyNTYgPSBhcnI1NS5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICByZXR1cm4gaXRlbSAlIDMgPT0gMDtcbn0pO1xuY29uc29sZS5sb2coYXJyNTYpO1xuXG4vKmZvckVhY2gg5bCx5piv5pmu6YCa55qE5b6q546v77yM56ys5LqM5Liq5Y+C5pWw5piv5Y+v6YCJ55qE77yM5pivaW5kZXgqL1xudmFyIGFyckZvckVhY2ggPSBbMTIsIDIsIDMzMiwgNDRdO1xuYXJyRm9yRWFjaC5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xuICAgIGNvbnNvbGUubG9nKGluZGV4ICsgXCI6XCIgKyBpdGVtKTtcbn0pOyJdLCJmaWxlIjoiYXJyYXkuanMifQ==
