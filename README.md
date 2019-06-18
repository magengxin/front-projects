# 配置说明

1. lib 内容共用
2. 每个项目必须配置 package.json

``` json

{
    "name": "demo", 
    "version": "0.0.1",
    "description": "demo",
    "main": "index.js",
    "scripts": {},
    "config": {
        "active": true,
        "port": 8080,
        "dist": "/Users/mada/projects/JunMeng/project_statweb/gulp-template/demodist/",
        "spriteNames": ["sprite", "sprite-1"]
    },
    "author": ""
}

```

其中 name 必须唯一。
config.active 控制是否编译当前项目。
config.port 设置项目启动端口。
config.dist 设置项目编译后的文件目录。
config.spriteNames 一个项目中可能存在多个雪碧图，通过填入字符串设置。

此项目添加了ES6的配置，可以使用ES6语法。#   f r o n t - p r o j e c t s  
 