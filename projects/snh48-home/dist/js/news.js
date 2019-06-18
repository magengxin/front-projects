"use strict";

// (function() {
//     var $loadingValue = $('.loading-value span')

//     S.preload([
//             'image/news-top.jpg',
//             'image/sprite-1.png',
//         ],
//         function(r) {
//             console.log('load resource count:', r)
//             $('.loader').hide()
//             $('body').removeClass('loading')
//         },
//         function(p) {
//             var p = p && p.toFixed(0)
//             $loadingValue.width(p + '%')
//         })

// }).call(this)

$(function () {

    var qunInfo = {
        url: "//shang.qq.com/wpa/qunwpa?idkey=594e78830030b5c8d1b1a34fd11f753e4ed6ceb903332b6a3f55c01671428e04",
        ewm: "http://snh48.thedream.cc/dcms_upfiles/32exLwHYKaXOSpfv1495005531.png",
        number: "340920444",
        other: "http://snh48.thedream.cc/dcms_upfiles/ZwqDGMojViHCetcP1495005535.png"
    };

    function getQunInfo() {
        $.ajax({
            type: 'jsonp',
            method: 'GET',
            url: 'http://dcms.thedream.cc/snh48/qq_ewm',
            dataType: 'jsonp',
            success: function success(r) {
                if (r.ret_code == '0') {
                    qunInfo = r.data;
                    setQunInfo();
                }
            },
            err: function err(_err) {
                console.log(_err);
            }
        });
    }

    function setQunInfo() {
        $('.to-qq').attr('href', qunInfo.url);
    }

    getQunInfo();

    var tag = 'ios';
    $('.phone-tabs .tab').on('click', function (e) {
        var $this = $(e.currentTarget);
        $this.addClass('active').siblings().removeClass('active');
        tag = $this.attr('data-tag');
    });

    var $dcommit = $('.dialog-commit');
    var $commit = $dcommit.find('.submit');
    var $close = $('.dialog-commit .icon-close');

    // 倒计时
    function countdown($node) {
        var time = 60;
        var tt = Date.now();
        $node.css('pointer-events', 'none');
        var t = setInterval(function () {
            var current = Date.now();
            var duration = ((current - tt) / 1000).toFixed(0);
            var ls = time - duration;
            if (ls < 0) {
                $node.css('pointer-events', 'all');
                $node.html('获取验证码');
                return clearInterval(t);
            }
            $node.html(ls);
        }, 1000);
    }

    // 获取验证码
    var $ercode = $('.ercode');
    var sendingCode = false;
    $ercode.click(function () {
        if (sendingCode) {
            return toast('正在发送验证码，请稍后');
        }
        var $this = $(this);

        if (!tag) {
            return toast('数据错误');
        }
        var $container = $('.form');
        var $phone = $container.find('.phone');
        var phone = $phone.val().trim();
        if (!phone || phone.length != 11) {
            return toast('请输入手机号');
        }

        sendingCode = true;
        $this.html('发送中');
        $.ajax({
            type: 'jsonp',
            method: 'GET',
            url: 'http://dcms.thedream.cc/snh48/code/send?cell=' + phone,
            dataType: 'jsonp',
            success: function success(r) {
                sendingCode = false;
                if (r.ret_code !== '0') {
                    $this.html('发送验证码');
                    return toast(r.ret_msg);
                }
                // 倒计时
                countdown($this);
            },
            err: function err(_err2) {
                sendingCode = false;
                console.log(_err2);
                $this.html('发送验证码');
                return toast(_err2.ret_msg);
            }
        });
    });

    // 申领首测资格
    var $submit = $('.btn.submit');
    var submiting = false;
    $submit.click(function () {
        if (submiting) {
            return toast('正在发送中，请稍后');
        }

        var $this = $(this);

        if (!tag) {
            return toast('数据错误');
        }
        var $container = $('.content-box');

        var $phone = $container.find('.phone');
        var phone = $phone.val().trim();
        if (!phone || phone.length != 11) {
            return toast('请输入手机号');
        }

        var code = $container.find('.code').val().trim();
        if (!code || code.length != 6) {
            return toast('请输入验证码');
        }

        submiting = true;
        $.ajax({
            type: 'jsonp',
            method: 'POST',
            url: 'http://dcms.thedream.cc/snh48/code/confirm',
            data: {
                cell: phone,
                code: code,
                os: tag == 'android' ? 1 : 2
            },
            dataType: 'jsonp',
            success: function success(r) {
                submiting = false;
                if (r.ret_code !== '0') {
                    return toast(r.ret_msg);
                }
                toast('申请成功');
            },
            err: function err(_err3) {
                submiting = false;
                console.log(_err3);
            }
        });
    });

    if ($('.view-news-detail').length) {
        var getComments = function getComments() {
            if (!hasNext) {
                return toast('没有更多');
            }
            if (sendingCode) {
                return toast('正在加载，亲稍后');
            }

            sendingCode = true;
            $.ajax({
                type: 'GET',
                url: "http://dcms.thedream.cc/snh48/news/comment/paging",
                data: {
                    kid: kid,
                    offset: offset
                },
                dataType: 'jsonp',
                success: function success(r) {
                    console.log(r);
                    sendingCode = false;
                    if (r.ret_code !== '0') {
                        return toast(r.ret_msg);
                    }
                    var list = r.list;
                    hasNext = r.next;
                    var cnt = r.cnt;
                    if (cnt) {
                        $('.conmment-box h2 span').html(cnt);
                    }
                    if (hasNext) {
                        $('.btn-more').css('display', 'block');
                    } else {
                        $('.btn-more').hide();
                    }
                    if (list.length) {
                        offset = r.offset;
                        $('.comments').append(T.comments({ list: list }));
                    }
                },
                err: function err(_err4) {
                    sendingCode = false;
                }
            });
        };

        var kid = $('#kid').val() || 1;
        var offset = 0;
        var hasNext = true;

        sendingCode = false;

        getComments();

        var sending = false;
        $('.commit').click(function () {
            var $this = $(this);

            if (sending) {
                return toast('正在发送，亲稍后');
            }

            var $comment = $('.comment-field input');
            var comment = $comment.val();
            console.log(comment);
            if (!comment) {
                return toast('请输入评论内容');
            }
            if (comment.length > 15) {
                return toast('最多可输入15个字');
            }
            if (comment.length < 2) {
                return toast('最少输入2个字');
            }

            sending = true;
            $.ajax({
                type: 'POST',
                url: "http://dcms.thedream.cc/snh48/news/comment",
                data: {
                    comment: comment,
                    kid: kid,
                    url: location.href
                },
                dataType: 'jsonp',
                success: function success(r) {
                    console.log(r);
                    sending = false;
                    if (r.ret_code !== '0') {
                        return toast(r.ret_msg);
                    }
                    var $new = $('<a class="comment color-red" href="javascript:" data-id="' + r.data_id + '" data-cnt="0")>' + comment + '</a>');
                    if ($('.comments .comment').length) {
                        $new.insertBefore($('.comments .comment').eq(0));
                    } else {
                        $('.comments').append($new);
                    }

                    $comment.val('');
                    toast('发表成功');
                },
                err: function err(_err5) {
                    sending = false;
                }
            });
        });

        var zaning = false;
        $('.conmment-box').on('click', '.comment', function (e) {
            var $this = $(e.currentTarget);
            console.log($this);

            if (zaning) {
                return toast('正在发送，亲稍后');
            }
            var dataId = $this.attr('data-id');
            var cnt = $this.attr('data-cnt');
            cnt = parseInt(cnt);

            if (!dataId) {
                return toast('数据错误');
            }

            zaning = true;
            $.ajax({
                type: 'POST',
                url: "http://dcms.thedream.cc/snh48/news/comment/like",
                data: {
                    kid: kid,
                    data_id: dataId
                },
                dataType: 'jsonp',
                success: function success(r) {
                    console.log(r);
                    zaning = false;
                    if (r.ret_code !== '0') {
                        return toast(r.ret_msg);
                    }
                    toast('点赞成功');
                    cnt++;
                    $this.attr('data-cnt', cnt);
                },
                err: function err(_err6) {
                    zaning = false;
                }
            });
        });

        $('.btn-more').click(function () {
            getComments();
        });
    }

    $('.wait').click(function (e) {
        e.preventDefault();
        toast('敬请期待');
    });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJuZXdzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG4vLyAoZnVuY3Rpb24oKSB7XG4vLyAgICAgdmFyICRsb2FkaW5nVmFsdWUgPSAkKCcubG9hZGluZy12YWx1ZSBzcGFuJylcblxuLy8gICAgIFMucHJlbG9hZChbXG4vLyAgICAgICAgICAgICAnaW1hZ2UvbmV3cy10b3AuanBnJyxcbi8vICAgICAgICAgICAgICdpbWFnZS9zcHJpdGUtMS5wbmcnLFxuLy8gICAgICAgICBdLFxuLy8gICAgICAgICBmdW5jdGlvbihyKSB7XG4vLyAgICAgICAgICAgICBjb25zb2xlLmxvZygnbG9hZCByZXNvdXJjZSBjb3VudDonLCByKVxuLy8gICAgICAgICAgICAgJCgnLmxvYWRlcicpLmhpZGUoKVxuLy8gICAgICAgICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdsb2FkaW5nJylcbi8vICAgICAgICAgfSxcbi8vICAgICAgICAgZnVuY3Rpb24ocCkge1xuLy8gICAgICAgICAgICAgdmFyIHAgPSBwICYmIHAudG9GaXhlZCgwKVxuLy8gICAgICAgICAgICAgJGxvYWRpbmdWYWx1ZS53aWR0aChwICsgJyUnKVxuLy8gICAgICAgICB9KVxuXG4vLyB9KS5jYWxsKHRoaXMpXG5cbiQoZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIHF1bkluZm8gPSB7XG4gICAgICAgIHVybDogXCIvL3NoYW5nLnFxLmNvbS93cGEvcXVud3BhP2lka2V5PTU5NGU3ODgzMDAzMGI1YzhkMWIxYTM0ZmQxMWY3NTNlNGVkNmNlYjkwMzMzMmI2YTNmNTVjMDE2NzE0MjhlMDRcIixcbiAgICAgICAgZXdtOiBcImh0dHA6Ly9zbmg0OC50aGVkcmVhbS5jYy9kY21zX3VwZmlsZXMvMzJleEx3SFlLYVhPU3BmdjE0OTUwMDU1MzEucG5nXCIsXG4gICAgICAgIG51bWJlcjogXCIzNDA5MjA0NDRcIixcbiAgICAgICAgb3RoZXI6IFwiaHR0cDovL3NuaDQ4LnRoZWRyZWFtLmNjL2RjbXNfdXBmaWxlcy9ad3FER01valZpSENldGNQMTQ5NTAwNTUzNS5wbmdcIlxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBnZXRRdW5JbmZvKCkge1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdHlwZTogJ2pzb25wJyxcbiAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICB1cmw6ICdodHRwOi8vZGNtcy50aGVkcmVhbS5jYy9zbmg0OC9xcV9ld20nLFxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29ucCcsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiBzdWNjZXNzKHIpIHtcbiAgICAgICAgICAgICAgICBpZiAoci5yZXRfY29kZSA9PSAnMCcpIHtcbiAgICAgICAgICAgICAgICAgICAgcXVuSW5mbyA9IHIuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgc2V0UXVuSW5mbygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnI6IGZ1bmN0aW9uIGVycihfZXJyKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coX2Vycik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldFF1bkluZm8oKSB7XG4gICAgICAgICQoJy50by1xcScpLmF0dHIoJ2hyZWYnLCBxdW5JbmZvLnVybCk7XG4gICAgfVxuXG4gICAgZ2V0UXVuSW5mbygpO1xuXG4gICAgdmFyIHRhZyA9ICdpb3MnO1xuICAgICQoJy5waG9uZS10YWJzIC50YWInKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICB2YXIgJHRoaXMgPSAkKGUuY3VycmVudFRhcmdldCk7XG4gICAgICAgICR0aGlzLmFkZENsYXNzKCdhY3RpdmUnKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgdGFnID0gJHRoaXMuYXR0cignZGF0YS10YWcnKTtcbiAgICB9KTtcblxuICAgIHZhciAkZGNvbW1pdCA9ICQoJy5kaWFsb2ctY29tbWl0Jyk7XG4gICAgdmFyICRjb21taXQgPSAkZGNvbW1pdC5maW5kKCcuc3VibWl0Jyk7XG4gICAgdmFyICRjbG9zZSA9ICQoJy5kaWFsb2ctY29tbWl0IC5pY29uLWNsb3NlJyk7XG5cbiAgICAvLyDlgJLorqHml7ZcbiAgICBmdW5jdGlvbiBjb3VudGRvd24oJG5vZGUpIHtcbiAgICAgICAgdmFyIHRpbWUgPSA2MDtcbiAgICAgICAgdmFyIHR0ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgJG5vZGUuY3NzKCdwb2ludGVyLWV2ZW50cycsICdub25lJyk7XG4gICAgICAgIHZhciB0ID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGN1cnJlbnQgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgdmFyIGR1cmF0aW9uID0gKChjdXJyZW50IC0gdHQpIC8gMTAwMCkudG9GaXhlZCgwKTtcbiAgICAgICAgICAgIHZhciBscyA9IHRpbWUgLSBkdXJhdGlvbjtcbiAgICAgICAgICAgIGlmIChscyA8IDApIHtcbiAgICAgICAgICAgICAgICAkbm9kZS5jc3MoJ3BvaW50ZXItZXZlbnRzJywgJ2FsbCcpO1xuICAgICAgICAgICAgICAgICRub2RlLmh0bWwoJ+iOt+WPlumqjOivgeeggScpO1xuICAgICAgICAgICAgICAgIHJldHVybiBjbGVhckludGVydmFsKHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJG5vZGUuaHRtbChscyk7XG4gICAgICAgIH0sIDEwMDApO1xuICAgIH1cblxuICAgIC8vIOiOt+WPlumqjOivgeeggVxuICAgIHZhciAkZXJjb2RlID0gJCgnLmVyY29kZScpO1xuICAgIHZhciBzZW5kaW5nQ29kZSA9IGZhbHNlO1xuICAgICRlcmNvZGUuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoc2VuZGluZ0NvZGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0b2FzdCgn5q2j5Zyo5Y+R6YCB6aqM6K+B56CB77yM6K+356iN5ZCOJyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcblxuICAgICAgICBpZiAoIXRhZykge1xuICAgICAgICAgICAgcmV0dXJuIHRvYXN0KCfmlbDmja7plJnor68nKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgJGNvbnRhaW5lciA9ICQoJy5mb3JtJyk7XG4gICAgICAgIHZhciAkcGhvbmUgPSAkY29udGFpbmVyLmZpbmQoJy5waG9uZScpO1xuICAgICAgICB2YXIgcGhvbmUgPSAkcGhvbmUudmFsKCkudHJpbSgpO1xuICAgICAgICBpZiAoIXBob25lIHx8IHBob25lLmxlbmd0aCAhPSAxMSkge1xuICAgICAgICAgICAgcmV0dXJuIHRvYXN0KCfor7fovpPlhaXmiYvmnLrlj7cnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNlbmRpbmdDb2RlID0gdHJ1ZTtcbiAgICAgICAgJHRoaXMuaHRtbCgn5Y+R6YCB5LitJyk7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB0eXBlOiAnanNvbnAnLFxuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgIHVybDogJ2h0dHA6Ly9kY21zLnRoZWRyZWFtLmNjL3NuaDQ4L2NvZGUvc2VuZD9jZWxsPScgKyBwaG9uZSxcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbnAnLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gc3VjY2VzcyhyKSB7XG4gICAgICAgICAgICAgICAgc2VuZGluZ0NvZGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAoci5yZXRfY29kZSAhPT0gJzAnKSB7XG4gICAgICAgICAgICAgICAgICAgICR0aGlzLmh0bWwoJ+WPkemAgemqjOivgeeggScpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdG9hc3Qoci5yZXRfbXNnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8g5YCS6K6h5pe2XG4gICAgICAgICAgICAgICAgY291bnRkb3duKCR0aGlzKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnI6IGZ1bmN0aW9uIGVycihfZXJyMikge1xuICAgICAgICAgICAgICAgIHNlbmRpbmdDb2RlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coX2VycjIpO1xuICAgICAgICAgICAgICAgICR0aGlzLmh0bWwoJ+WPkemAgemqjOivgeeggScpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0b2FzdChfZXJyMi5yZXRfbXNnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyDnlLPpoobpppbmtYvotYTmoLxcbiAgICB2YXIgJHN1Ym1pdCA9ICQoJy5idG4uc3VibWl0Jyk7XG4gICAgdmFyIHN1Ym1pdGluZyA9IGZhbHNlO1xuICAgICRzdWJtaXQuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoc3VibWl0aW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gdG9hc3QoJ+ato+WcqOWPkemAgeS4re+8jOivt+eojeWQjicpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcblxuICAgICAgICBpZiAoIXRhZykge1xuICAgICAgICAgICAgcmV0dXJuIHRvYXN0KCfmlbDmja7plJnor68nKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgJGNvbnRhaW5lciA9ICQoJy5jb250ZW50LWJveCcpO1xuXG4gICAgICAgIHZhciAkcGhvbmUgPSAkY29udGFpbmVyLmZpbmQoJy5waG9uZScpO1xuICAgICAgICB2YXIgcGhvbmUgPSAkcGhvbmUudmFsKCkudHJpbSgpO1xuICAgICAgICBpZiAoIXBob25lIHx8IHBob25lLmxlbmd0aCAhPSAxMSkge1xuICAgICAgICAgICAgcmV0dXJuIHRvYXN0KCfor7fovpPlhaXmiYvmnLrlj7cnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjb2RlID0gJGNvbnRhaW5lci5maW5kKCcuY29kZScpLnZhbCgpLnRyaW0oKTtcbiAgICAgICAgaWYgKCFjb2RlIHx8IGNvZGUubGVuZ3RoICE9IDYpIHtcbiAgICAgICAgICAgIHJldHVybiB0b2FzdCgn6K+36L6T5YWl6aqM6K+B56CBJyk7XG4gICAgICAgIH1cblxuICAgICAgICBzdWJtaXRpbmcgPSB0cnVlO1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdHlwZTogJ2pzb25wJyxcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgdXJsOiAnaHR0cDovL2RjbXMudGhlZHJlYW0uY2Mvc25oNDgvY29kZS9jb25maXJtJyxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBjZWxsOiBwaG9uZSxcbiAgICAgICAgICAgICAgICBjb2RlOiBjb2RlLFxuICAgICAgICAgICAgICAgIG9zOiB0YWcgPT0gJ2FuZHJvaWQnID8gMSA6IDJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb25wJyxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIHN1Y2Nlc3Mocikge1xuICAgICAgICAgICAgICAgIHN1Ym1pdGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmIChyLnJldF9jb2RlICE9PSAnMCcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRvYXN0KHIucmV0X21zZyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRvYXN0KCfnlLPor7fmiJDlip8nKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnI6IGZ1bmN0aW9uIGVycihfZXJyMykge1xuICAgICAgICAgICAgICAgIHN1Ym1pdGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKF9lcnIzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpZiAoJCgnLnZpZXctbmV3cy1kZXRhaWwnKS5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGdldENvbW1lbnRzID0gZnVuY3Rpb24gZ2V0Q29tbWVudHMoKSB7XG4gICAgICAgICAgICBpZiAoIWhhc05leHQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdG9hc3QoJ+ayoeacieabtOWkmicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNlbmRpbmdDb2RlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRvYXN0KCfmraPlnKjliqDovb3vvIzkurLnqI3lkI4nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2VuZGluZ0NvZGUgPSB0cnVlO1xuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnR0VUJyxcbiAgICAgICAgICAgICAgICB1cmw6IFwiaHR0cDovL2RjbXMudGhlZHJlYW0uY2Mvc25oNDgvbmV3cy9jb21tZW50L3BhZ2luZ1wiLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAga2lkOiBraWQsXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldDogb2Zmc2V0XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb25wJyxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiBzdWNjZXNzKHIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocik7XG4gICAgICAgICAgICAgICAgICAgIHNlbmRpbmdDb2RlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyLnJldF9jb2RlICE9PSAnMCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0b2FzdChyLnJldF9tc2cpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHZhciBsaXN0ID0gci5saXN0O1xuICAgICAgICAgICAgICAgICAgICBoYXNOZXh0ID0gci5uZXh0O1xuICAgICAgICAgICAgICAgICAgICB2YXIgY250ID0gci5jbnQ7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5jb25tbWVudC1ib3ggaDIgc3BhbicpLmh0bWwoY250KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoaGFzTmV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmJ0bi1tb3JlJykuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuYnRuLW1vcmUnKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGxpc3QubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXQgPSByLm9mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5jb21tZW50cycpLmFwcGVuZChULmNvbW1lbnRzKHsgbGlzdDogbGlzdCB9KSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycjogZnVuY3Rpb24gZXJyKF9lcnI0KSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbmRpbmdDb2RlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGtpZCA9ICQoJyNraWQnKS52YWwoKSB8fCAxO1xuICAgICAgICB2YXIgb2Zmc2V0ID0gMDtcbiAgICAgICAgdmFyIGhhc05leHQgPSB0cnVlO1xuXG4gICAgICAgIHNlbmRpbmdDb2RlID0gZmFsc2U7XG5cbiAgICAgICAgZ2V0Q29tbWVudHMoKTtcblxuICAgICAgICB2YXIgc2VuZGluZyA9IGZhbHNlO1xuICAgICAgICAkKCcuY29tbWl0JykuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcblxuICAgICAgICAgICAgaWYgKHNlbmRpbmcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdG9hc3QoJ+ato+WcqOWPkemAge+8jOS6sueojeWQjicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgJGNvbW1lbnQgPSAkKCcuY29tbWVudC1maWVsZCBpbnB1dCcpO1xuICAgICAgICAgICAgdmFyIGNvbW1lbnQgPSAkY29tbWVudC52YWwoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGNvbW1lbnQpO1xuICAgICAgICAgICAgaWYgKCFjb21tZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRvYXN0KCfor7fovpPlhaXor4TorrrlhoXlrrknKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjb21tZW50Lmxlbmd0aCA+IDE1KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRvYXN0KCfmnIDlpJrlj6/ovpPlhaUxNeS4quWtlycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNvbW1lbnQubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0b2FzdCgn5pyA5bCR6L6T5YWlMuS4quWtlycpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzZW5kaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICAgICAgICAgIHVybDogXCJodHRwOi8vZGNtcy50aGVkcmVhbS5jYy9zbmg0OC9uZXdzL2NvbW1lbnRcIixcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbW1lbnQ6IGNvbW1lbnQsXG4gICAgICAgICAgICAgICAgICAgIGtpZDoga2lkLFxuICAgICAgICAgICAgICAgICAgICB1cmw6IGxvY2F0aW9uLmhyZWZcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbnAnLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIHN1Y2Nlc3Mocikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyKTtcbiAgICAgICAgICAgICAgICAgICAgc2VuZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoci5yZXRfY29kZSAhPT0gJzAnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdG9hc3Qoci5yZXRfbXNnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB2YXIgJG5ldyA9ICQoJzxhIGNsYXNzPVwiY29tbWVudCBjb2xvci1yZWRcIiBocmVmPVwiamF2YXNjcmlwdDpcIiBkYXRhLWlkPVwiJyArIHIuZGF0YV9pZCArICdcIiBkYXRhLWNudD1cIjBcIik+JyArIGNvbW1lbnQgKyAnPC9hPicpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoJCgnLmNvbW1lbnRzIC5jb21tZW50JykubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkbmV3Lmluc2VydEJlZm9yZSgkKCcuY29tbWVudHMgLmNvbW1lbnQnKS5lcSgwKSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuY29tbWVudHMnKS5hcHBlbmQoJG5ldyk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAkY29tbWVudC52YWwoJycpO1xuICAgICAgICAgICAgICAgICAgICB0b2FzdCgn5Y+R6KGo5oiQ5YqfJyk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnI6IGZ1bmN0aW9uIGVycihfZXJyNSkge1xuICAgICAgICAgICAgICAgICAgICBzZW5kaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciB6YW5pbmcgPSBmYWxzZTtcbiAgICAgICAgJCgnLmNvbm1tZW50LWJveCcpLm9uKCdjbGljaycsICcuY29tbWVudCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICB2YXIgJHRoaXMgPSAkKGUuY3VycmVudFRhcmdldCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygkdGhpcyk7XG5cbiAgICAgICAgICAgIGlmICh6YW5pbmcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdG9hc3QoJ+ato+WcqOWPkemAge+8jOS6sueojeWQjicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGRhdGFJZCA9ICR0aGlzLmF0dHIoJ2RhdGEtaWQnKTtcbiAgICAgICAgICAgIHZhciBjbnQgPSAkdGhpcy5hdHRyKCdkYXRhLWNudCcpO1xuICAgICAgICAgICAgY250ID0gcGFyc2VJbnQoY250KTtcblxuICAgICAgICAgICAgaWYgKCFkYXRhSWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdG9hc3QoJ+aVsOaNrumUmeivrycpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB6YW5pbmcgPSB0cnVlO1xuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgdXJsOiBcImh0dHA6Ly9kY21zLnRoZWRyZWFtLmNjL3NuaDQ4L25ld3MvY29tbWVudC9saWtlXCIsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBraWQ6IGtpZCxcbiAgICAgICAgICAgICAgICAgICAgZGF0YV9pZDogZGF0YUlkXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb25wJyxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiBzdWNjZXNzKHIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocik7XG4gICAgICAgICAgICAgICAgICAgIHphbmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoci5yZXRfY29kZSAhPT0gJzAnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdG9hc3Qoci5yZXRfbXNnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0b2FzdCgn54K56LWe5oiQ5YqfJyk7XG4gICAgICAgICAgICAgICAgICAgIGNudCsrO1xuICAgICAgICAgICAgICAgICAgICAkdGhpcy5hdHRyKCdkYXRhLWNudCcsIGNudCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnI6IGZ1bmN0aW9uIGVycihfZXJyNikge1xuICAgICAgICAgICAgICAgICAgICB6YW5pbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnLmJ0bi1tb3JlJykuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZ2V0Q29tbWVudHMoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgJCgnLndhaXQnKS5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRvYXN0KCfmlazor7fmnJ/lvoUnKTtcbiAgICB9KTtcbn0pOyJdLCJmaWxlIjoibmV3cy5qcyJ9
