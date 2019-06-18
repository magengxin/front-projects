(function () {
    var $loadingValue = $('.loading-value span')

    S.preload([
            'image/section1.jpg',
            'image/sprite.png',
        ],
        function (r) {
            console.log('load resource count:', r)
            $('.loader').hide()
            $('body').removeClass('loading')
        },
        function (p) {
            var p = p && p.toFixed(0)
            $loadingValue.width(p + '%')
        })

}).call(this)

$(function () {

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
            success: function (r) {
                if (r.ret_code == '0') {
                    qunInfo = r.data
                    setQunInfo()
                }
            },
            err: function (err) {
                console.log(err)
            }
        })
    }

    function setQunInfo() {
        $('.to-qq').attr('href', qunInfo.url)
    }

    getQunInfo()

    var $content = $('.content-box')
    $('.tab').on('click', function (e) {
        var $this = $(e.currentTarget)
        $this.addClass('active').siblings().removeClass('active')
        var tag = $this.attr('data-tag')
        if (tag) $content.attr('data-tag', tag)
    })

    var mySwiper

    function setSwiper() {
        mySwiper = new Swiper('.swiper', {
            // initialSlide: 1,
            loop: false,
            direction: 'vertical',
            speed: 400,
            lazyLoading: true,
            grabCursor: true,
            mousewheelControl: true,
            keyboardControl: false,
            simulateTouch: false,
            pagination: '.nav-tabs',
            bulletClass: 'icon-tab',
            bulletActiveClass: 'active',
            paginationBulletRender: function (swiper, index, className) {
                var first = ''
                if (index == 0) {
                    first = '<div class="icon-star first"></div>'
                }
                return '<a href="javascript:" class="tab ' + className + ' ' + className + '-' + (index) + '-hover">' + first + '<div class="icon-star"></div></a>';
            },
            paginationClickable: true,
        });

        window.mySwiper = mySwiper
    }

    setSwiper()

    var duration = 600
    var start = false
    var isLastPage = false
    var first = true

    function checkCopyright(godown) {
        if (start) return
        var index = mySwiper.activeIndex

        if (index < 3) {
            return first = true
        }

        if (first) {
            setTimeout(function () {
                first = false
            }, duration)
            return
        }
        // start = true

        if (godown) {
            if (isLastPage) {
                return isLastPage = true
            }
            isLastPage = true
            // 进入版权信息
            console.log('进入版权信息')
            mySwiper.lockSwipes()
            setCoppyright(true)
        } else {
            if (isLastPage) {
                // 退出版权信息
                console.log('退出版权信息')
                first = true
                isLastPage = false

                mySwiper.unlockSwipes()
                setCoppyright(false)
                return
            }
            return isLastPage = false
        }
        setTimeout(function () {
            start = false
        }, duration)
    }

    $('.swiper').on('mousewheel', function (event) {
        var godown = true
        if (event.deltaY > 0) {
            godown = false
        }

        checkCopyright(godown)
    });

    $('document').keypress(function (e) {
        console.log(e)
        var godown = true
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 40) {
            var godown = true
        } else if (code == 38) {
            godown = false
        }
        console.log(code)
        checkCopyright(godown)
    })

    function setCoppyright(show) {
        if (show) {
            $('.view-index').addClass('show-footer')
        } else {
            $('.view-index').removeClass('show-footer')
        }
    }

    function setNewsBanners() {
        if (!$('.news-banners').length) return
        new Swiper('.news-banners', {
            speed: 400,
            spaceBetween: 0,
            autoplay: 3000,
            loop: true,
            mousewheelControl: true,
            pagination: ".news-banner-page"
        });
    }

    setNewsBanners()

    var width = 0
    var a = $('.kefu p').each(function (i,p) {
        console.log($(p).outerWidth())
        width += $(p).outerWidth()
    })

    console.log(width)

    function setKefu() {
        new Swiper('.kefu', {
            speed: 10000,
            width: width + 40,
            spaceBetween: 0,
            autoplay: 1,
            loop: true,
            mousewheelControl: true,
        });
    }

    setKefu()

    var $videos = $('.videos')
    var $upVideoDialog = $('.dialog-up-video')

    $upVideoDialog.find('.mask').on('click', function () {
        $upVideoDialog.hide().find('.video').empty()
    })

    $videos.on('click', '.video', function () {
        var $this = $(this)
        var video = $this.attr('data-video')
        $upVideoDialog.show().find('.video').html(video)
    })

    var $snapshots = $('.snapshots')
    var $snapshotsDialog = $('.dialog-snapshots')

    $snapshotsDialog.find('.mask').on('click', function () {
        $snapshotsDialog.hide().find('.img').attr('src', 'javascript:')
    })

    $snapshots.on('click', '.image', function () {
        var $this = $(this)
        var src = $this.attr('data-src')
        $snapshotsDialog.show().find('img').attr('src', src)
    })

    var $upVideoBoard = $('.up-videos')
    $('.btn-up-video').click(function () {
        $upVideoBoard.attr('data-tag', 'v')
    })

    $('.btn-snapshots').click(function () {
        // Disabled image will not init swiper
        // Set swiper after images displayed
        setTimeout(setSnapshots, 0)
        $upVideoBoard.attr('data-tag', 's')
    })


    function setSnapshots() {
        new Swiper('.snapshots', {
            speed: 400,
            spaceBetween: 20,
            slidesPerGroup: 4,
            slidesPerView: 4,
            loop: true,
            mousewheelControl: false,
            prevButton: '.icon-s-arrow-left',
            nextButton: '.icon-s-arrow-right',
        });
    }

    function setWutu() {
        new Swiper('.wutu', {
            speed: 400,
            spaceBetween: 0,
            autoplay: 3000,
            loop: true,
            mousewheelControl: false,
            prevButton: '.section4 .icon-arrow-left',
            nextButton: '.section4 .icon-arrow-right',
        });
    }

    setWutu()

    function getJineng(jnStr) {
        var jns = jnStr.split('\n')
        var skills = []
        jns.forEach(function (jn, n) {
            jn = jn.split('|')
            skills.push({
                icon: jn[0],
                desc: jn[2]
            })
        })
        return skills
    }

    var data = []
    var $character = $('#character [class^="caharcter_"]')
    var girlCount = $character.length
    for (var i = 0; i < girlCount; i++) {
        var $g = $character.eq(i)
        var g = {
            r: $g.find('.character_img').val(),
            k: $g.find('.ecy_img').val(),
            name: $g.find('.name').val(),
            audio: $g.find('.audio').val(),
            nickname: $g.find('.nickname').val(),
            xuexing: $g.find('.xuexing').val(),
            birthday: $g.find('.birthday').val(),
            height: $g.find('.height').val(),
            xingzuo: $g.find('.xingzuo').val(),
            techang: $g.find('.techang').val(),
            hobby: $g.find('.hobby').val(),
            team: $g.find('.team').val(),
            jineng: getJineng($g.find('.jineng').val())
        }
        data.push(g)
    }

    var $info = $('.info-board')
    var girlSwiper

    function setGirls() {
        var $pagination = $('.girls-board .wrapper')
        var boxMargin = 6
        if ($(window).outerWidth() < 1440 || $(window).outerHeight() < 800) {
            boxMargin = 5
        }

        var $tabs = $('.girls-board .tab img')
        girlSwiper = new Swiper('.girls', {
            speed: 400,
            spaceBetween: 300,
            // autoplay: 3000,
            loop: false,
            mousewheelControl: false,
            prevButton: '.girls-board .icon-arrow-left',
            nextButton: '.girls-board .icon-arrow-right',
            pagination: '.girls-board .wrapper',
            bulletClass: 'tab',
            bulletActiveClass: 'active',
            preloadImages: false,
            lazyLoading: true,
            // lazyLoadingInPrevNext: true,
            // lazyLoadingOnTransitionStart: true,
            onLazyImageReady: function (swiper, slide, image) {
            },
            onInit: function () {
                $info.html(T.table({girl: data[0]}))
            },
            paginationBulletRender: function (swiper, index, className) {
                var img = $tabs.eq(index).attr('src')
                return '<a href="javascript:" class="tab ' + className + '"><img src="' + img + '"/></a>';
            },
            paginationClickable: true,
            onSlideChangeStart: function (slider) {
                var index = slider.realIndex + 1
                $info.html(T.table({girl: data[slider.realIndex]}))
                var parginationWidth = $pagination.width()
                var parentScrollLeft = $pagination[0].scrollLeft
                var boxWidth = $('.girls-board .tab').outerWidth() + boxMargin
                var offsetX = boxWidth * (index - 1)
                if (offsetX < parentScrollLeft) {
                    $pagination.animate({scrollLeft: offsetX}, 200)
                } else if (parentScrollLeft + parginationWidth < offsetX + 20) {
                    $pagination.animate({scrollLeft: (offsetX + boxWidth) - parginationWidth}, 200)
                }
            }
        });

        var $godown = $('.icon-go-down')
        $godown.click(function () {
            mySwiper.slideNext()
        })
    }

    setGirls()

    $newsContent = $('.news-content')
    $('.news-tabs .tab').hover(function (e) {
        var $this = $(this)
        var tag = $this.attr('data-tag')
        if (!tag) return

        $this.addClass('active').siblings().removeClass('active')
        $newsContent.attr('data-tag', tag)
    })

    $('.icon-turn').click(function (e) {
        $(this).parent().find('.swiper-slide-active .image').toggleClass('active')
    })

    $info.on('mouseover', '.skill', function (e) {
        var $this = $(e.currentTarget)
        $this.addClass('active').siblings().removeClass('active')
        desc = $this.attr('data-desc')
        if (desc) {
            $this.parent().find('.desc').html(desc)
        }
    })

    var $play = $('.icon-play')
    var $dialog = $('.dialog-video')
    var $mask = $('.dialog-video .mask')
    var $video = $('.dialog-video video')
    var $call = $('.icon-btn-call')
    var $dcommit = $('.dialog-commit')
    var $commit = $dcommit.find('.submit')
    var $close = $('.dialog-commit .icon-close')
    var video = $video[0]

    $play.click(function () {
        $dialog.show()
        var play = video.play()
        if (play) {
            play.then(function () {
                console.log('play')
            })
        }
    })

    $call.click(function (e) {
        $dcommit.show()
    })

    $close.click(function (e) {
        $dcommit.hide()
    })

    $mask.click(function (e) {
        $dialog.hide()
        var pause = video.pause()
        if (pause) {
            pause.then(function () {
                console.log('pause')
            })
        }
    })

    // audio

    $info.on('click', '.a-off', function (e) {
        var $this = $(e.currentTarget)
        var audio = $this.parent().find('audio')[0]
        audio.play()

        var $onbtn = $this.next('.a-on')
        $(audio).on('ended', function () {
            off($onbtn)
        })
        $this.hide()
        $onbtn.css('display', 'inline-block')
    })

    function off($this) {
        var audio = $this.parent().find('audio')[0]
        audio.pause()
        $this.hide()
        $this.parent().find('.a-off').css('display', 'inline-block')
    }

    $info.on('click', '.a-on', function (e) {
        off($(e.currentTarget))
    })

    // 倒计时
    function countdown($node) {
        var time = 60
        var tt = Date.now()
        $node.css('pointer-events', 'none')
        var t = setInterval(function () {
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
    $ercode.click(function () {
        if (sendingCode) {
            return toast('正在发送验证码，请稍后')
        }
        var $this = $(this)

        var tag = $('.content-box').attr('data-tag')
        if (!tag) {
            return toast('数据错误')
        }
        var $container = $('.form.' + tag)
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
            success: function (r) {
                sendingCode = false
                if (r.ret_code !== '0') {
                    $this.html('发送验证码')
                    return toast(r.ret_msg)
                }
                // 倒计时
                countdown($this)
            },
            err: function (err) {
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
    $submit.click(function () {
        if (submiting) {
            return toast('正在发送中，请稍后')
        }

        var $this = $(this)

        var tag = $('.content-box').attr('data-tag')
        if (!tag) {
            return toast('数据错误')
        }
        var $container = $('.dialog-commit')

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
            success: function (r) {
                submiting = false
                if (r.ret_code !== '0') {
                    return toast(r.ret_msg)
                }
                $dcommit.hide()
                toast('申请成功')
            },
            err: function (err) {
                submiting = false
                console.log(err)
            }
        })
    })


    $('.wait').click(function (e) {
        e.preventDefault()
        toast('敬请期待')
    })
})