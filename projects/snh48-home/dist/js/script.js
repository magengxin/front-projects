'use strict';

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
var s1 = 'hello world';
console.log(s1.startsWith('hello')); /*true*/
console.log(s1.endsWith('d')); /*true*/
console.log(s1.includes('hello')); /*true*/

// startsWith()
var str1 = 'git.baidu.com';
switch (true) {
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
var str2 = '1.txt';
switch (true) {
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
var x = 1;
var y = 2;

console.log(x + '+' + y + '=' + (x + y));
console.log(x + '+' + y * 3 + '=' + (x + y * 3));

var obj = { x: 1, y: 2 };
console.log('' + (obj.x + obj.y));
/*模版字符串之间还能调用函数*/
function fn() {
    return 'hello world!';
}
console.log('foo ' + fn() + ' bar');

var basket = { count: '6', onSale: 'ES'
    // $('#result').append(
    //     'There are <b>' + basket.count + '</b> ' +
    //     'items in your basket, ' +
    //     '<em>' + basket.onSale +
    //     '</em> are on sale!'
    // );
    /*这才是模版字符串*/
};$('#result').append('There are <b>' + ('' + basket.count) + '</b> ' + 'items in your basket, ' + '<em>' + ('' + basket.onSale) + '</em> are on sale!');
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY3JpcHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vKlxyXG4qIEVTNuS4reWtl+espuS4sueahOW4uOeUqOaWueazlVxyXG4qXHJcbiogMS5pbmNsdWRlcygp77ya6L+U5Zue5biD5bCU5YC877yM6KGo56S65piv5ZCm5om+5Yiw5LqG5Y+C5pWw5a2X56ym5Liy44CCXHJcbiogMi5zdGFydHNXaXRoKCnvvJrov5Tlm57luIPlsJTlgLzvvIzooajnpLrlj4LmlbDlrZfnrKbkuLLmmK/lkKblnKjljp/lrZfnrKbkuLLnmoTlpLTpg6jjgIJcclxuKiAzLmVuZHNXaXRoKCnvvJrov5Tlm57luIPlsJTlgLzvvIzooajnpLrlj4LmlbDlrZfnrKbkuLLmmK/lkKblnKjljp/lrZfnrKbkuLLnmoTlsL7pg6jjgIJcclxuKlxyXG4qIOaooeeJiOWtl+espuS4siAo6L+U5Y2V5byV5Y+3IGBgIClcclxuKiAqL1xuXG4vLyBpbmNsdWRlcygp55So5rOVXG52YXIgczEgPSAnaGVsbG8gd29ybGQnO1xuY29uc29sZS5sb2coczEuc3RhcnRzV2l0aCgnaGVsbG8nKSk7IC8qdHJ1ZSovXG5jb25zb2xlLmxvZyhzMS5lbmRzV2l0aCgnZCcpKTsgLyp0cnVlKi9cbmNvbnNvbGUubG9nKHMxLmluY2x1ZGVzKCdoZWxsbycpKTsgLyp0cnVlKi9cblxuLy8gc3RhcnRzV2l0aCgpXG52YXIgc3RyMSA9ICdnaXQuYmFpZHUuY29tJztcbnN3aXRjaCAodHJ1ZSkge1xuICAgIGNhc2Ugc3RyMS5zdGFydHNXaXRoKCd3d3cuJyk6XG4gICAgICAgIGNvbnNvbGUubG9nKCd3d3fnvZHlnYAnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgY2FzZSBzdHIxLnN0YXJ0c1dpdGgoJ2dpdC4nKTpcbiAgICAgICAgY29uc29sZS5sb2coJ2dpdOe9keWdgCcpO1xuICAgICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgICBjb25zb2xlLmxvZygn5YW25LuW572R5Z2AJyk7XG59XG5cbi8vIGVuZHNXaXRoKClcbnZhciBzdHIyID0gJzEudHh0JztcbnN3aXRjaCAodHJ1ZSkge1xuICAgIGNhc2Ugc3RyMi5lbmRzV2l0aCgndHh0Jyk6XG4gICAgICAgIGNvbnNvbGUubG9nKCd0eHTmlofku7YnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgY2FzZSBzdHIyLmVuZHNXaXRoKCdqcGcnKTpcbiAgICAgICAgY29uc29sZS5sb2coJ2pwZ+aWh+S7ticpO1xuICAgICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgICBjb25zb2xlLmxvZygn5YW25LuW5paH5Lu2Jyk7XG59XG5cbi8q5qih54mI5a2X56ym5LiyICovXG52YXIgeCA9IDE7XG52YXIgeSA9IDI7XG5cbmNvbnNvbGUubG9nKHggKyAnKycgKyB5ICsgJz0nICsgKHggKyB5KSk7XG5jb25zb2xlLmxvZyh4ICsgJysnICsgeSAqIDMgKyAnPScgKyAoeCArIHkgKiAzKSk7XG5cbnZhciBvYmogPSB7IHg6IDEsIHk6IDIgfTtcbmNvbnNvbGUubG9nKCcnICsgKG9iai54ICsgb2JqLnkpKTtcbi8q5qih54mI5a2X56ym5Liy5LmL6Ze06L+Y6IO96LCD55So5Ye95pWwKi9cbmZ1bmN0aW9uIGZuKCkge1xuICAgIHJldHVybiAnaGVsbG8gd29ybGQhJztcbn1cbmNvbnNvbGUubG9nKCdmb28gJyArIGZuKCkgKyAnIGJhcicpO1xuXG52YXIgYmFza2V0ID0geyBjb3VudDogJzYnLCBvblNhbGU6ICdFUydcbiAgICAvLyAkKCcjcmVzdWx0JykuYXBwZW5kKFxuICAgIC8vICAgICAnVGhlcmUgYXJlIDxiPicgKyBiYXNrZXQuY291bnQgKyAnPC9iPiAnICtcbiAgICAvLyAgICAgJ2l0ZW1zIGluIHlvdXIgYmFza2V0LCAnICtcbiAgICAvLyAgICAgJzxlbT4nICsgYmFza2V0Lm9uU2FsZSArXG4gICAgLy8gICAgICc8L2VtPiBhcmUgb24gc2FsZSEnXG4gICAgLy8gKTtcbiAgICAvKui/meaJjeaYr+aooeeJiOWtl+espuS4siovXG59OyQoJyNyZXN1bHQnKS5hcHBlbmQoJ1RoZXJlIGFyZSA8Yj4nICsgKCcnICsgYmFza2V0LmNvdW50KSArICc8L2I+ICcgKyAnaXRlbXMgaW4geW91ciBiYXNrZXQsICcgKyAnPGVtPicgKyAoJycgKyBiYXNrZXQub25TYWxlKSArICc8L2VtPiBhcmUgb24gc2FsZSEnKTsiXSwiZmlsZSI6InNjcmlwdC5qcyJ9
