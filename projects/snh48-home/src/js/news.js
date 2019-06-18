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

$(function() {

    var qunInfo = {
        url: "//shang.qq.com/wpa/qunwpa?idkey=594e78830030b5c8d1b1a34fd11f753e4ed6ceb903332b6a3f55c01671428e04",
        ewm: "http://snh48.thedream.cc/dcms_upfiles/32exLwHYKaXOSpfv1495005531.png",
        number: "340920444",
        other: "http://snh48.thedream.cc/dcms_upfiles/ZwqDGMojViHCetcP1495005535.png"
    }

    function getQunInfo() {
        $.ajax({
            type: 'jsonp',
            method: 'GET',
            url: 'http://dcms.thedream.cc/snh48/qq_ewm',
            dataType: 'jsonp',
            success: function(r) {
                if (r.ret_code == '0') {
                    qunInfo = r.data
                    setQunInfo()
                }
            },
            err: function(err) {
                console.log(err)
            }
        })
    }

    function setQunInfo() {
        $('.to-qq').attr('href', qunInfo.url)
    }

    getQunInfo()

    var tag = 'ios'
    $('.phone-tabs .tab').on('click', function(e) {
        var $this = $(e.currentTarget)
        $this.addClass('active').siblings().removeClass('active')
        tag = $this.attr('data-tag')
    })

    var $dcommit = $('.dialog-commit')
    var $commit = $dcommit.find('.submit')
    var $close = $('.dialog-commit .icon-close')

    // 倒计时
    function countdown($node) {
        var time = 60
        var tt = Date.now()
        $node.css('pointer-events', 'none')
        var t = setInterval(function() {
            var current = Date.now()
            var duration = ((current - tt) / 1000).toFixed(0)
            var ls = time - duration
            if (ls < 0) {
                $node.css('pointer-events', 'all')
                $node.html('获取验证码')
                return clearInterval(t)
            }
            $node.html(ls)
        }, 1000)
    }

    // 获取验证码
    var $ercode = $('.ercode')
    var sendingCode = false
    $ercode.click(function() {
        if (sendingCode) {
            return toast('正在发送验证码，请稍后')
        }
        var $this = $(this)

        if (!tag) {
            return toast('数据错误')
        }
        var $container = $('.form')
        var $phone = $container.find('.phone')
        var phone = $phone.val().trim()
        if (!phone || phone.length != 11) {
            return toast('请输入手机号')
        }

        sendingCode = true
        $this.html('发送中')
        $.ajax({
            type: 'jsonp',
            method: 'GET',
            url: 'http://dcms.thedream.cc/snh48/code/send?cell=' + phone,
            dataType: 'jsonp',
            success: function(r) {
                sendingCode = false
                if (r.ret_code !== '0') {
                    $this.html('发送验证码')
                    return toast(r.ret_msg)
                }
                // 倒计时
                countdown($this)
            },
            err: function(err) {
                sendingCode = false
                console.log(err)
                $this.html('发送验证码')
                return toast(err.ret_msg)
            }
        })
    })

    // 申领首测资格
    var $submit = $('.btn.submit')
    var submiting = false
    $submit.click(function() {
        if (submiting) {
            return toast('正在发送中，请稍后')
        }

        var $this = $(this)

        if (!tag) {
            return toast('数据错误')
        }
        var $container = $('.content-box')

        var $phone = $container.find('.phone')
        var phone = $phone.val().trim()
        if (!phone || phone.length != 11) {
            return toast('请输入手机号')
        }

        var code = $container.find('.code').val().trim()
        if (!code || code.length != 6) {
            return toast('请输入验证码')
        }

        submiting = true
        $.ajax({
            type: 'jsonp',
            method: 'POST',
            url: 'http://dcms.thedream.cc/snh48/code/confirm',
            data: {
                cell: phone,
                code: code,
                os: tag == 'android' ? 1 : 2,
            },
            dataType: 'jsonp',
            success: function(r) {
                submiting = false
                if (r.ret_code !== '0') {
                    return toast(r.ret_msg)
                }
                toast('申请成功')
            },
            err: function(err) {
                submiting = false
                console.log(err)
            }
        })
    })

    if ($('.view-news-detail').length) {
        var kid = $('#kid').val() || 1
        var offset = 0
        var hasNext = true

        sendingCode = false

        function getComments() {
            if (!hasNext) {
                return toast('没有更多')
            }
            if (sendingCode) {
                return toast('正在加载，亲稍后')
            }

            sendingCode = true
            $.ajax({
                type: 'GET',
                url: "http://dcms.thedream.cc/snh48/news/comment/paging",
                data: {
                    kid: kid,
                    offset: offset
                },
                dataType: 'jsonp',
                success: function(r) {
                    console.log(r)
                    sendingCode = false
                    if (r.ret_code !== '0') {
                        return toast(r.ret_msg)
                    }
                    var list = r.list
                    hasNext = r.next
                    var cnt = r.cnt
                    if (cnt) {
                        $('.conmment-box h2 span').html(cnt)
                    }
                    if (hasNext) {
                        $('.btn-more').css('display', 'block')
                    } else {
                        $('.btn-more').hide()
                    }
                    if (list.length) {
                        offset = r.offset
                        $('.comments').append(T.comments({ list: list }))
                    }
                },
                err: function(err) {
                    sendingCode = false
                }
            })
        }

        getComments()

        var sending = false
        $('.commit').click(function() {
            var $this = $(this)

            if (sending) {
                return toast('正在发送，亲稍后')
            }

            var $comment = $('.comment-field input')
            var comment = $comment.val()
            console.log(comment)
            if (!comment) {
                return toast('请输入评论内容')
            }
            if (comment.length > 15) {
                return toast('最多可输入15个字')
            }
            if (comment.length < 2) {
                return toast('最少输入2个字')
            }

            sending = true
            $.ajax({
                type: 'POST',
                url: "http://dcms.thedream.cc/snh48/news/comment",
                data: {
                    comment: comment,
                    kid: kid,
                    url: location.href
                },
                dataType: 'jsonp',
                success: function(r) {
                    console.log(r)
                    sending = false
                    if (r.ret_code !== '0') {
                        return toast(r.ret_msg)
                    }
                    var $new = $('<a class="comment color-red" href="javascript:" data-id="' + r.data_id + '" data-cnt="0")>' + comment + '</a>')
                    if ($('.comments .comment').length) {
                        $new.insertBefore($('.comments .comment').eq(0))
                    } else {
                        $('.comments').append($new)
                    }

                    $comment.val('')
                    toast('发表成功')
                },
                err: function(err) {
                    sending = false
                }
            })
        })

        var zaning = false
        $('.conmment-box').on('click', '.comment', function(e) {
            var $this = $(e.currentTarget)
            console.log($this)

            if (zaning) {
                return toast('正在发送，亲稍后')
            }
            var dataId = $this.attr('data-id')
            var cnt = $this.attr('data-cnt')
            cnt = parseInt(cnt)

            if (!dataId) {
                return toast('数据错误')
            }

            zaning = true
            $.ajax({
                type: 'POST',
                url: "http://dcms.thedream.cc/snh48/news/comment/like",
                data: {
                    kid: kid,
                    data_id: dataId
                },
                dataType: 'jsonp',
                success: function(r) {
                    console.log(r)
                    zaning = false
                    if (r.ret_code !== '0') {
                        return toast(r.ret_msg)
                    }
                    toast('点赞成功')
                    cnt++
                    $this.attr('data-cnt', cnt)
                },
                err: function(err) {
                    zaning = false
                }
            })
        })

        $('.btn-more').click(function() {
            getComments()
        })
    }


    $('.wait').click(function(e) {
        e.preventDefault()
        toast('敬请期待')
    })
})