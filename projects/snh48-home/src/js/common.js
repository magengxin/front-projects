/**
 * Created by mada on 2017/3/28.
 */

// AJAX api
(function() {
    var AjaxOption, api, apiRoot, failHandler;
    var S = {}

    window.S = S

    api = {};

    window.S.api = api;

    apiRoot = "http://data.langlive.com/v2/"

    AjaxOption = function(type, data, settings) {
        var k, results, v;
        this.type = type;
        if (type === "POST" || type === "PUT" || type === "DELETE") {
            this.data = data && JSON.stringify(data);
            this.contentType = "application/json";
        } else {
            this.data = data;
        }
        this.cache = false;
        if (settings != null) {
            results = [];
            for (k in settings) {
                v = settings[k];
                results.push(this[k] = v);
            }
            return results;
        }
    };

    failHandler = function(jqxhr) {
        if (jqxhr.status === 401) {
            return S.toast('您尚未登录！');
        }
    };

    var promiseAjax = function(type, url, data, settings, jsonP) {
        if (url.indexOf('http') < 0) {
            url = apiRoot + url
        }
        console.log(url)
        var promise = new Promise(function(resolve, reject) {
            var options = {
                type: type,
                url: url,
                success: function(r) {
                    resolve(r)
                },
                error: function(r) {
                    failHandler(r)
                    reject(r)
                },
                cache: false
            }
            options.dataType = jsonP && "jsonp"
            if (type === "POST" || type === "PUT" || type === "DELETE") {
                options.data = data
                options.contentType = "application/json";
            } else {
                options.data = data;
            }
            $.ajax(options)

        })
        return promise
    }

    api.get = function(url, data, settings) {
        return promiseAjax('GET', url, data, settings, true)
    };

    api.getOrigin = function(url, data, settings) {
        return promiseAjax('GET', url, data, settings, false)
    };

    api.getAbsolute = function(absoluteUrl, data, settings) {
        return Promise.resolve($.ajax(absoluteUrl, new AjaxOption("GET", data, settings)).fail(failHandler));
    };

    api.post = function(url, data, settings) {
        return promiseAjax('POST', url, data, settings, true)
    };

    api.postOrigin = function(url, data, settings) {
        return promiseAjax('POST', url, data, settings, false)
    };

    api.put = function(url, data) {
        return promiseAjax('PUT', url, data, settings, true)
    };

    api.putOrigin = function(url, data) {
        return promiseAjax('PUT', url, data, settings, false)
    };

    api.delete = function(url, data) {
        return promiseAjax('delete', url, data, settings, true)
    };

    api.deleteOrigin = function(url, data) {
        return promiseAjax('delete', url, data, settings, false)
    };

    S.resourceRoot = '/r/';

}).call(this);

// common methods
(function() {
    var isFunc = function(f) {
            return typeof f === 'function';
        }
        //构造器函数
    function resLoader(config) {
        this.option = {
            resourceType: 'image', //资源类型，默认为图片
            baseUrl: './', //基准url
            resources: [], //资源路径数组
            onStart: null, //加载开始回调函数，传入参数total
            onProgress: null, //正在加载回调函数，传入参数currentIndex, total
            onComplete: null //加载完毕回调函数，传入参数total
        }
        if (config) {
            for (i in config) {
                this.option[i] = config[i];
            }
        } else {
            alert('参数错误！');
            return;
        }
        this.status = 0; //加载器的状态，0：未启动   1：正在加载   2：加载完毕
        this.total = this.option.resources.length || 0; //资源总数
        this.currentIndex = 0; //当前正在加载的资源索引
    };

    resLoader.prototype.start = function() {
        this.status = 1;
        var _this = this;
        var baseUrl = this.option.baseUrl;
        for (var i = 0, l = this.option.resources.length; i < l; i++) {
            var r = this.option.resources[i],
                url = '';
            if (r.indexOf('http://') === 0 || r.indexOf('https://') === 0) {
                url = r;
            } else {
                url = baseUrl + r;
            }

            var image = new Image();
            image.onload = function() {
                _this.loaded();
            };
            image.onerror = function() {
                _this.loaded();
            };
            image.src = url;
        }
        if (isFunc(this.option.onStart)) {
            this.option.onStart(this.total);
        }
    }

    resLoader.prototype.loaded = function() {
        if (isFunc(this.option.onProgress)) {
            this.option.onProgress(++this.currentIndex, this.total);
        }
        //加载完毕
        if (this.currentIndex === this.total) {
            if (isFunc(this.option.onComplete)) {
                this.option.onComplete(this.total);
            }
        }
    }

    //暴露公共方法
    window.S.preload = function(resources, done, progress) {
        var loader = new resLoader({
            resources: resources,
            onStart: function(total) {},
            onProgress: function(current, total) {
                // console.log(current + '/' + total);
                var percent = current / total * 100;
                // $('.progressbar').css('width', percent + '%');
                // $('.progresstext .current').text(current);
                // $('.progresstext .total').text(total);
                if (progress && isFunc(progress)) progress(percent)
            },
            onComplete: function(total) {
                if (done && isFunc(done)) done(total)
            }
        });

        loader.start();
    }

    var $toastContainer = $('.toast-container')
    var toastMessage = null

    function toast(message) {
        if (!message) return
        var distance = '100px'
        var speed = 300
        if (message != toastMessage) {
            toastMessage = message
            var $toast = $("<div class='toast' style='opacity: 0;top:" + distance + "'><div class='message'>" + message + "</div></div>")
            $toast.delay(100)
                .appendTo($toastContainer)
                .animate({
                    opacity: 1,
                    top: 0,
                }, speed)

            setTimeout(function() {
                toastMessage = null
                $toast.animate({
                    opacity: 0,
                    top: "-" + distance
                }, speed, function() { $toast.remove() })
            }, 3000)
        }
    }

    window.toast = toast

}).call(this);