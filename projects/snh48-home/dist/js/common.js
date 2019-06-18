"use strict";

/**
 * Created by mada on 2017/3/28.
 */

// AJAX api
(function () {
    var AjaxOption, api, apiRoot, failHandler;
    var S = {};

    window.S = S;

    api = {};

    window.S.api = api;

    apiRoot = "http://data.langlive.com/v2/";

    AjaxOption = function AjaxOption(type, data, settings) {
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

    failHandler = function failHandler(jqxhr) {
        if (jqxhr.status === 401) {
            return S.toast('您尚未登录！');
        }
    };

    var promiseAjax = function promiseAjax(type, url, data, settings, jsonP) {
        if (url.indexOf('http') < 0) {
            url = apiRoot + url;
        }
        console.log(url);
        var promise = new Promise(function (resolve, reject) {
            var options = {
                type: type,
                url: url,
                success: function success(r) {
                    resolve(r);
                },
                error: function error(r) {
                    failHandler(r);
                    reject(r);
                },
                cache: false
            };
            options.dataType = jsonP && "jsonp";
            if (type === "POST" || type === "PUT" || type === "DELETE") {
                options.data = data;
                options.contentType = "application/json";
            } else {
                options.data = data;
            }
            $.ajax(options);
        });
        return promise;
    };

    api.get = function (url, data, settings) {
        return promiseAjax('GET', url, data, settings, true);
    };

    api.getOrigin = function (url, data, settings) {
        return promiseAjax('GET', url, data, settings, false);
    };

    api.getAbsolute = function (absoluteUrl, data, settings) {
        return Promise.resolve($.ajax(absoluteUrl, new AjaxOption("GET", data, settings)).fail(failHandler));
    };

    api.post = function (url, data, settings) {
        return promiseAjax('POST', url, data, settings, true);
    };

    api.postOrigin = function (url, data, settings) {
        return promiseAjax('POST', url, data, settings, false);
    };

    api.put = function (url, data) {
        return promiseAjax('PUT', url, data, settings, true);
    };

    api.putOrigin = function (url, data) {
        return promiseAjax('PUT', url, data, settings, false);
    };

    api.delete = function (url, data) {
        return promiseAjax('delete', url, data, settings, true);
    };

    api.deleteOrigin = function (url, data) {
        return promiseAjax('delete', url, data, settings, false);
    };

    S.resourceRoot = '/r/';
}).call(undefined);

// common methods
(function () {
    var isFunc = function isFunc(f) {
        return typeof f === 'function';
    };
    //构造器函数
    function resLoader(config) {
        this.option = {
            resourceType: 'image', //资源类型，默认为图片
            baseUrl: './', //基准url
            resources: [], //资源路径数组
            onStart: null, //加载开始回调函数，传入参数total
            onProgress: null, //正在加载回调函数，传入参数currentIndex, total
            onComplete: null //加载完毕回调函数，传入参数total
        };
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

    resLoader.prototype.start = function () {
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
            image.onload = function () {
                _this.loaded();
            };
            image.onerror = function () {
                _this.loaded();
            };
            image.src = url;
        }
        if (isFunc(this.option.onStart)) {
            this.option.onStart(this.total);
        }
    };

    resLoader.prototype.loaded = function () {
        if (isFunc(this.option.onProgress)) {
            this.option.onProgress(++this.currentIndex, this.total);
        }
        //加载完毕
        if (this.currentIndex === this.total) {
            if (isFunc(this.option.onComplete)) {
                this.option.onComplete(this.total);
            }
        }
    };

    //暴露公共方法
    window.S.preload = function (resources, done, progress) {
        var loader = new resLoader({
            resources: resources,
            onStart: function onStart(total) {},
            onProgress: function onProgress(current, total) {
                // console.log(current + '/' + total);
                var percent = current / total * 100;
                // $('.progressbar').css('width', percent + '%');
                // $('.progresstext .current').text(current);
                // $('.progresstext .total').text(total);
                if (progress && isFunc(progress)) progress(percent);
            },
            onComplete: function onComplete(total) {
                if (done && isFunc(done)) done(total);
            }
        });

        loader.start();
    };

    var $toastContainer = $('.toast-container');
    var toastMessage = null;

    function toast(message) {
        if (!message) return;
        var distance = '100px';
        var speed = 300;
        if (message != toastMessage) {
            toastMessage = message;
            var $toast = $("<div class='toast' style='opacity: 0;top:" + distance + "'><div class='message'>" + message + "</div></div>");
            $toast.delay(100).appendTo($toastContainer).animate({
                opacity: 1,
                top: 0
            }, speed);

            setTimeout(function () {
                toastMessage = null;
                $toast.animate({
                    opacity: 0,
                    top: "-" + distance
                }, speed, function () {
                    $toast.remove();
                });
            }, 3000);
        }
    }

    window.toast = toast;
}).call(undefined);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjb21tb24uanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxuICogQ3JlYXRlZCBieSBtYWRhIG9uIDIwMTcvMy8yOC5cbiAqL1xuXG4vLyBBSkFYIGFwaVxuKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgQWpheE9wdGlvbiwgYXBpLCBhcGlSb290LCBmYWlsSGFuZGxlcjtcbiAgICB2YXIgUyA9IHt9O1xuXG4gICAgd2luZG93LlMgPSBTO1xuXG4gICAgYXBpID0ge307XG5cbiAgICB3aW5kb3cuUy5hcGkgPSBhcGk7XG5cbiAgICBhcGlSb290ID0gXCJodHRwOi8vZGF0YS5sYW5nbGl2ZS5jb20vdjIvXCI7XG5cbiAgICBBamF4T3B0aW9uID0gZnVuY3Rpb24gQWpheE9wdGlvbih0eXBlLCBkYXRhLCBzZXR0aW5ncykge1xuICAgICAgICB2YXIgaywgcmVzdWx0cywgdjtcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICAgICAgaWYgKHR5cGUgPT09IFwiUE9TVFwiIHx8IHR5cGUgPT09IFwiUFVUXCIgfHwgdHlwZSA9PT0gXCJERUxFVEVcIikge1xuICAgICAgICAgICAgdGhpcy5kYXRhID0gZGF0YSAmJiBKU09OLnN0cmluZ2lmeShkYXRhKTtcbiAgICAgICAgICAgIHRoaXMuY29udGVudFR5cGUgPSBcImFwcGxpY2F0aW9uL2pzb25cIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jYWNoZSA9IGZhbHNlO1xuICAgICAgICBpZiAoc2V0dGluZ3MgIT0gbnVsbCkge1xuICAgICAgICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgICAgICAgZm9yIChrIGluIHNldHRpbmdzKSB7XG4gICAgICAgICAgICAgICAgdiA9IHNldHRpbmdzW2tdO1xuICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaCh0aGlzW2tdID0gdik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBmYWlsSGFuZGxlciA9IGZ1bmN0aW9uIGZhaWxIYW5kbGVyKGpxeGhyKSB7XG4gICAgICAgIGlmIChqcXhoci5zdGF0dXMgPT09IDQwMSkge1xuICAgICAgICAgICAgcmV0dXJuIFMudG9hc3QoJ+aCqOWwmuacqueZu+W9le+8gScpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHZhciBwcm9taXNlQWpheCA9IGZ1bmN0aW9uIHByb21pc2VBamF4KHR5cGUsIHVybCwgZGF0YSwgc2V0dGluZ3MsIGpzb25QKSB7XG4gICAgICAgIGlmICh1cmwuaW5kZXhPZignaHR0cCcpIDwgMCkge1xuICAgICAgICAgICAgdXJsID0gYXBpUm9vdCArIHVybDtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyh1cmwpO1xuICAgICAgICB2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIHR5cGU6IHR5cGUsXG4gICAgICAgICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gc3VjY2VzcyhyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocik7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gZXJyb3Iocikge1xuICAgICAgICAgICAgICAgICAgICBmYWlsSGFuZGxlcihyKTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHIpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY2FjaGU6IGZhbHNlXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgb3B0aW9ucy5kYXRhVHlwZSA9IGpzb25QICYmIFwianNvbnBcIjtcbiAgICAgICAgICAgIGlmICh0eXBlID09PSBcIlBPU1RcIiB8fCB0eXBlID09PSBcIlBVVFwiIHx8IHR5cGUgPT09IFwiREVMRVRFXCIpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEgPSBkYXRhO1xuICAgICAgICAgICAgICAgIG9wdGlvbnMuY29udGVudFR5cGUgPSBcImFwcGxpY2F0aW9uL2pzb25cIjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhID0gZGF0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICQuYWpheChvcHRpb25zKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH07XG5cbiAgICBhcGkuZ2V0ID0gZnVuY3Rpb24gKHVybCwgZGF0YSwgc2V0dGluZ3MpIHtcbiAgICAgICAgcmV0dXJuIHByb21pc2VBamF4KCdHRVQnLCB1cmwsIGRhdGEsIHNldHRpbmdzLCB0cnVlKTtcbiAgICB9O1xuXG4gICAgYXBpLmdldE9yaWdpbiA9IGZ1bmN0aW9uICh1cmwsIGRhdGEsIHNldHRpbmdzKSB7XG4gICAgICAgIHJldHVybiBwcm9taXNlQWpheCgnR0VUJywgdXJsLCBkYXRhLCBzZXR0aW5ncywgZmFsc2UpO1xuICAgIH07XG5cbiAgICBhcGkuZ2V0QWJzb2x1dGUgPSBmdW5jdGlvbiAoYWJzb2x1dGVVcmwsIGRhdGEsIHNldHRpbmdzKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoJC5hamF4KGFic29sdXRlVXJsLCBuZXcgQWpheE9wdGlvbihcIkdFVFwiLCBkYXRhLCBzZXR0aW5ncykpLmZhaWwoZmFpbEhhbmRsZXIpKTtcbiAgICB9O1xuXG4gICAgYXBpLnBvc3QgPSBmdW5jdGlvbiAodXJsLCBkYXRhLCBzZXR0aW5ncykge1xuICAgICAgICByZXR1cm4gcHJvbWlzZUFqYXgoJ1BPU1QnLCB1cmwsIGRhdGEsIHNldHRpbmdzLCB0cnVlKTtcbiAgICB9O1xuXG4gICAgYXBpLnBvc3RPcmlnaW4gPSBmdW5jdGlvbiAodXJsLCBkYXRhLCBzZXR0aW5ncykge1xuICAgICAgICByZXR1cm4gcHJvbWlzZUFqYXgoJ1BPU1QnLCB1cmwsIGRhdGEsIHNldHRpbmdzLCBmYWxzZSk7XG4gICAgfTtcblxuICAgIGFwaS5wdXQgPSBmdW5jdGlvbiAodXJsLCBkYXRhKSB7XG4gICAgICAgIHJldHVybiBwcm9taXNlQWpheCgnUFVUJywgdXJsLCBkYXRhLCBzZXR0aW5ncywgdHJ1ZSk7XG4gICAgfTtcblxuICAgIGFwaS5wdXRPcmlnaW4gPSBmdW5jdGlvbiAodXJsLCBkYXRhKSB7XG4gICAgICAgIHJldHVybiBwcm9taXNlQWpheCgnUFVUJywgdXJsLCBkYXRhLCBzZXR0aW5ncywgZmFsc2UpO1xuICAgIH07XG5cbiAgICBhcGkuZGVsZXRlID0gZnVuY3Rpb24gKHVybCwgZGF0YSkge1xuICAgICAgICByZXR1cm4gcHJvbWlzZUFqYXgoJ2RlbGV0ZScsIHVybCwgZGF0YSwgc2V0dGluZ3MsIHRydWUpO1xuICAgIH07XG5cbiAgICBhcGkuZGVsZXRlT3JpZ2luID0gZnVuY3Rpb24gKHVybCwgZGF0YSkge1xuICAgICAgICByZXR1cm4gcHJvbWlzZUFqYXgoJ2RlbGV0ZScsIHVybCwgZGF0YSwgc2V0dGluZ3MsIGZhbHNlKTtcbiAgICB9O1xuXG4gICAgUy5yZXNvdXJjZVJvb3QgPSAnL3IvJztcbn0pLmNhbGwodW5kZWZpbmVkKTtcblxuLy8gY29tbW9uIG1ldGhvZHNcbihmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGlzRnVuYyA9IGZ1bmN0aW9uIGlzRnVuYyhmKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgZiA9PT0gJ2Z1bmN0aW9uJztcbiAgICB9O1xuICAgIC8v5p6E6YCg5Zmo5Ye95pWwXG4gICAgZnVuY3Rpb24gcmVzTG9hZGVyKGNvbmZpZykge1xuICAgICAgICB0aGlzLm9wdGlvbiA9IHtcbiAgICAgICAgICAgIHJlc291cmNlVHlwZTogJ2ltYWdlJywgLy/otYTmupDnsbvlnovvvIzpu5jorqTkuLrlm77niYdcbiAgICAgICAgICAgIGJhc2VVcmw6ICcuLycsIC8v5Z+65YeGdXJsXG4gICAgICAgICAgICByZXNvdXJjZXM6IFtdLCAvL+i1hOa6kOi3r+W+hOaVsOe7hFxuICAgICAgICAgICAgb25TdGFydDogbnVsbCwgLy/liqDovb3lvIDlp4vlm57osIPlh73mlbDvvIzkvKDlhaXlj4LmlbB0b3RhbFxuICAgICAgICAgICAgb25Qcm9ncmVzczogbnVsbCwgLy/mraPlnKjliqDovb3lm57osIPlh73mlbDvvIzkvKDlhaXlj4LmlbBjdXJyZW50SW5kZXgsIHRvdGFsXG4gICAgICAgICAgICBvbkNvbXBsZXRlOiBudWxsIC8v5Yqg6L295a6M5q+V5Zue6LCD5Ye95pWw77yM5Lyg5YWl5Y+C5pWwdG90YWxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGNvbmZpZykge1xuICAgICAgICAgICAgZm9yIChpIGluIGNvbmZpZykge1xuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uW2ldID0gY29uZmlnW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWxlcnQoJ+WPguaVsOmUmeivr++8gScpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3RhdHVzID0gMDsgLy/liqDovb3lmajnmoTnirbmgIHvvIww77ya5pyq5ZCv5YqoICAgMe+8muato+WcqOWKoOi9vSAgIDLvvJrliqDovb3lrozmr5VcbiAgICAgICAgdGhpcy50b3RhbCA9IHRoaXMub3B0aW9uLnJlc291cmNlcy5sZW5ndGggfHwgMDsgLy/otYTmupDmgLvmlbBcbiAgICAgICAgdGhpcy5jdXJyZW50SW5kZXggPSAwOyAvL+W9k+WJjeato+WcqOWKoOi9veeahOi1hOa6kOe0ouW8lVxuICAgIH07XG5cbiAgICByZXNMb2FkZXIucHJvdG90eXBlLnN0YXJ0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnN0YXR1cyA9IDE7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBiYXNlVXJsID0gdGhpcy5vcHRpb24uYmFzZVVybDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSB0aGlzLm9wdGlvbi5yZXNvdXJjZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgciA9IHRoaXMub3B0aW9uLnJlc291cmNlc1tpXSxcbiAgICAgICAgICAgICAgICB1cmwgPSAnJztcbiAgICAgICAgICAgIGlmIChyLmluZGV4T2YoJ2h0dHA6Ly8nKSA9PT0gMCB8fCByLmluZGV4T2YoJ2h0dHBzOi8vJykgPT09IDApIHtcbiAgICAgICAgICAgICAgICB1cmwgPSByO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB1cmwgPSBiYXNlVXJsICsgcjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICAgICAgICBpbWFnZS5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMubG9hZGVkKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaW1hZ2Uub25lcnJvciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5sb2FkZWQoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpbWFnZS5zcmMgPSB1cmw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzRnVuYyh0aGlzLm9wdGlvbi5vblN0YXJ0KSkge1xuICAgICAgICAgICAgdGhpcy5vcHRpb24ub25TdGFydCh0aGlzLnRvdGFsKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICByZXNMb2FkZXIucHJvdG90eXBlLmxvYWRlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKGlzRnVuYyh0aGlzLm9wdGlvbi5vblByb2dyZXNzKSkge1xuICAgICAgICAgICAgdGhpcy5vcHRpb24ub25Qcm9ncmVzcygrK3RoaXMuY3VycmVudEluZGV4LCB0aGlzLnRvdGFsKTtcbiAgICAgICAgfVxuICAgICAgICAvL+WKoOi9veWujOavlVxuICAgICAgICBpZiAodGhpcy5jdXJyZW50SW5kZXggPT09IHRoaXMudG90YWwpIHtcbiAgICAgICAgICAgIGlmIChpc0Z1bmModGhpcy5vcHRpb24ub25Db21wbGV0ZSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbi5vbkNvbXBsZXRlKHRoaXMudG90YWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8v5pq06Zyy5YWs5YWx5pa55rOVXG4gICAgd2luZG93LlMucHJlbG9hZCA9IGZ1bmN0aW9uIChyZXNvdXJjZXMsIGRvbmUsIHByb2dyZXNzKSB7XG4gICAgICAgIHZhciBsb2FkZXIgPSBuZXcgcmVzTG9hZGVyKHtcbiAgICAgICAgICAgIHJlc291cmNlczogcmVzb3VyY2VzLFxuICAgICAgICAgICAgb25TdGFydDogZnVuY3Rpb24gb25TdGFydCh0b3RhbCkge30sXG4gICAgICAgICAgICBvblByb2dyZXNzOiBmdW5jdGlvbiBvblByb2dyZXNzKGN1cnJlbnQsIHRvdGFsKSB7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coY3VycmVudCArICcvJyArIHRvdGFsKTtcbiAgICAgICAgICAgICAgICB2YXIgcGVyY2VudCA9IGN1cnJlbnQgLyB0b3RhbCAqIDEwMDtcbiAgICAgICAgICAgICAgICAvLyAkKCcucHJvZ3Jlc3NiYXInKS5jc3MoJ3dpZHRoJywgcGVyY2VudCArICclJyk7XG4gICAgICAgICAgICAgICAgLy8gJCgnLnByb2dyZXNzdGV4dCAuY3VycmVudCcpLnRleHQoY3VycmVudCk7XG4gICAgICAgICAgICAgICAgLy8gJCgnLnByb2dyZXNzdGV4dCAudG90YWwnKS50ZXh0KHRvdGFsKTtcbiAgICAgICAgICAgICAgICBpZiAocHJvZ3Jlc3MgJiYgaXNGdW5jKHByb2dyZXNzKSkgcHJvZ3Jlc3MocGVyY2VudCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25Db21wbGV0ZTogZnVuY3Rpb24gb25Db21wbGV0ZSh0b3RhbCkge1xuICAgICAgICAgICAgICAgIGlmIChkb25lICYmIGlzRnVuYyhkb25lKSkgZG9uZSh0b3RhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxvYWRlci5zdGFydCgpO1xuICAgIH07XG5cbiAgICB2YXIgJHRvYXN0Q29udGFpbmVyID0gJCgnLnRvYXN0LWNvbnRhaW5lcicpO1xuICAgIHZhciB0b2FzdE1lc3NhZ2UgPSBudWxsO1xuXG4gICAgZnVuY3Rpb24gdG9hc3QobWVzc2FnZSkge1xuICAgICAgICBpZiAoIW1lc3NhZ2UpIHJldHVybjtcbiAgICAgICAgdmFyIGRpc3RhbmNlID0gJzEwMHB4JztcbiAgICAgICAgdmFyIHNwZWVkID0gMzAwO1xuICAgICAgICBpZiAobWVzc2FnZSAhPSB0b2FzdE1lc3NhZ2UpIHtcbiAgICAgICAgICAgIHRvYXN0TWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgICAgICAgICB2YXIgJHRvYXN0ID0gJChcIjxkaXYgY2xhc3M9J3RvYXN0JyBzdHlsZT0nb3BhY2l0eTogMDt0b3A6XCIgKyBkaXN0YW5jZSArIFwiJz48ZGl2IGNsYXNzPSdtZXNzYWdlJz5cIiArIG1lc3NhZ2UgKyBcIjwvZGl2PjwvZGl2PlwiKTtcbiAgICAgICAgICAgICR0b2FzdC5kZWxheSgxMDApLmFwcGVuZFRvKCR0b2FzdENvbnRhaW5lcikuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgICAgICAgICB0b3A6IDBcbiAgICAgICAgICAgIH0sIHNwZWVkKTtcblxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdG9hc3RNZXNzYWdlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAkdG9hc3QuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgICAgICAgICAgICAgIHRvcDogXCItXCIgKyBkaXN0YW5jZVxuICAgICAgICAgICAgICAgIH0sIHNwZWVkLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICR0b2FzdC5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sIDMwMDApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgd2luZG93LnRvYXN0ID0gdG9hc3Q7XG59KS5jYWxsKHVuZGVmaW5lZCk7Il0sImZpbGUiOiJjb21tb24uanMifQ==
