
/*
* ES6中字符串的常用方法
*
* 1.includes()：返回布尔值，表示是否找到了参数字符串。
* 2.startsWith()：返回布尔值，表示参数字符串是否在原字符串的头部。
* 3.endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部。
*
* 模版字符串 (返单引号 `` )
* */

// includes()用法
let s1 = 'hello world'
console.log(s1.startsWith('hello')); /*true*/
console.log(s1.endsWith('d')); /*true*/
console.log(s1.includes('hello')); /*true*/

// startsWith()
let str1 = 'git.baidu.com'
switch (true){
    case str1.startsWith('www.'):
        console.log('www网址');
        break;
    case str1.startsWith('git.'):
        console.log('git网址');
        break;
    default:
        console.log('其他网址');
}

// endsWith()
let str2 = '1.txt'
switch (true){
    case str2.endsWith('txt'):
        console.log('txt文件');
        break;
    case str2.endsWith('jpg'):
        console.log('jpg文件');
        break;
    default:
        console.log('其他文件');
}

/*模版字符串 */
let x=1;
let y=2;

console.log(`${x}+${y}=${x+y}`);
console.log(`${x}+${y*3}=${x+y*3}`);

let obj ={x:1,y:2}
console.log(`${obj.x+obj.y}`);
/*模版字符串之间还能调用函数*/
function fn() {
    return 'hello world!'
}
console.log(`foo ${fn()} bar`);

let basket={count:'6',onSale:'ES'}
// $('#result').append(
//     'There are <b>' + basket.count + '</b> ' +
//     'items in your basket, ' +
//     '<em>' + basket.onSale +
//     '</em> are on sale!'
// );
/*这才是模版字符串*/
$('#result').append(
    'There are <b>' + `${basket.count}`+ '</b> ' +
    'items in your basket, ' +
    '<em>' +`${basket.onSale}`+
    '</em> are on sale!'
);

