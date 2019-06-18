'use strict';

(function () {
    var $loadingValue = $('.loading-value span');

    S.preload(['image/section1.jpg', 'image/sprite.png'], function (r) {
        console.log('load resource count:', r);
        $('.loader').hide();
        $('body').removeClass('loading');
    }, function (p) {
        var p = p && p.toFixed(0);
        $loadingValue.width(p + '%');
    });
}).call(undefined);

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

    var $content = $('.content-box');
    $('.tab').on('click', function (e) {
        var $this = $(e.currentTarget);
        $this.addClass('active').siblings().removeClass('active');
        var tag = $this.attr('data-tag');
        if (tag) $content.attr('data-tag', tag);
    });

    var mySwiper;

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
            paginationBulletRender: function paginationBulletRender(swiper, index, className) {
                var first = '';
                if (index == 0) {
                    first = '<div class="icon-star first"></div>';
                }
                return '<a href="javascript:" class="tab ' + className + ' ' + className + '-' + index + '-hover">' + first + '<div class="icon-star"></div></a>';
            },
            paginationClickable: true
        });

        window.mySwiper = mySwiper;
    }

    setSwiper();

    var duration = 600;
    var start = false;
    var isLastPage = false;
    var first = true;

    function checkCopyright(godown) {
        if (start) return;
        var index = mySwiper.activeIndex;

        if (index < 3) {
            return first = true;
        }

        if (first) {
            setTimeout(function () {
                first = false;
            }, duration);
            return;
        }
        // start = true

        if (godown) {
            if (isLastPage) {
                return isLastPage = true;
            }
            isLastPage = true;
            // 进入版权信息
            console.log('进入版权信息');
            mySwiper.lockSwipes();
            setCoppyright(true);
        } else {
            if (isLastPage) {
                // 退出版权信息
                console.log('退出版权信息');
                first = true;
                isLastPage = false;

                mySwiper.unlockSwipes();
                setCoppyright(false);
                return;
            }
            return isLastPage = false;
        }
        setTimeout(function () {
            start = false;
        }, duration);
    }

    $('.swiper').on('mousewheel', function (event) {
        var godown = true;
        if (event.deltaY > 0) {
            godown = false;
        }

        checkCopyright(godown);
    });

    $('document').keypress(function (e) {
        console.log(e);
        var godown = true;
        var code = e.keyCode ? e.keyCode : e.which;
        if (code == 40) {
            var godown = true;
        } else if (code == 38) {
            godown = false;
        }
        console.log(code);
        checkCopyright(godown);
    });

    function setCoppyright(show) {
        if (show) {
            $('.view-index').addClass('show-footer');
        } else {
            $('.view-index').removeClass('show-footer');
        }
    }

    function setNewsBanners() {
        if (!$('.news-banners').length) return;
        new Swiper('.news-banners', {
            speed: 400,
            spaceBetween: 0,
            autoplay: 3000,
            loop: true,
            mousewheelControl: true,
            pagination: ".news-banner-page"
        });
    }

    setNewsBanners();

    var width = 0;
    var a = $('.kefu p').each(function (i, p) {
        console.log($(p).outerWidth());
        width += $(p).outerWidth();
    });

    console.log(width);

    function setKefu() {
        new Swiper('.kefu', {
            speed: 10000,
            width: width + 40,
            spaceBetween: 0,
            autoplay: 1,
            loop: true,
            mousewheelControl: true
        });
    }

    setKefu();

    var $videos = $('.videos');
    var $upVideoDialog = $('.dialog-up-video');

    $upVideoDialog.find('.mask').on('click', function () {
        $upVideoDialog.hide().find('.video').empty();
    });

    $videos.on('click', '.video', function () {
        var $this = $(this);
        var video = $this.attr('data-video');
        $upVideoDialog.show().find('.video').html(video);
    });

    var $snapshots = $('.snapshots');
    var $snapshotsDialog = $('.dialog-snapshots');

    $snapshotsDialog.find('.mask').on('click', function () {
        $snapshotsDialog.hide().find('.img').attr('src', 'javascript:');
    });

    $snapshots.on('click', '.image', function () {
        var $this = $(this);
        var src = $this.attr('data-src');
        $snapshotsDialog.show().find('img').attr('src', src);
    });

    var $upVideoBoard = $('.up-videos');
    $('.btn-up-video').click(function () {
        $upVideoBoard.attr('data-tag', 'v');
    });

    $('.btn-snapshots').click(function () {
        // Disabled image will not init swiper
        // Set swiper after images displayed
        setTimeout(setSnapshots, 0);
        $upVideoBoard.attr('data-tag', 's');
    });

    function setSnapshots() {
        new Swiper('.snapshots', {
            speed: 400,
            spaceBetween: 20,
            slidesPerGroup: 4,
            slidesPerView: 4,
            loop: true,
            mousewheelControl: false,
            prevButton: '.icon-s-arrow-left',
            nextButton: '.icon-s-arrow-right'
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
            nextButton: '.section4 .icon-arrow-right'
        });
    }

    setWutu();

    function getJineng(jnStr) {
        var jns = jnStr.split('\n');
        var skills = [];
        jns.forEach(function (jn, n) {
            jn = jn.split('|');
            skills.push({
                icon: jn[0],
                desc: jn[2]
            });
        });
        return skills;
    }

    var data = [];
    var $character = $('#character [class^="caharcter_"]');
    var girlCount = $character.length;
    for (var i = 0; i < girlCount; i++) {
        var $g = $character.eq(i);
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
        };
        data.push(g);
    }

    var $info = $('.info-board');
    var girlSwiper;

    function setGirls() {
        var $pagination = $('.girls-board .wrapper');
        var boxMargin = 6;
        if ($(window).outerWidth() < 1440 || $(window).outerHeight() < 800) {
            boxMargin = 5;
        }

        var $tabs = $('.girls-board .tab img');
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
            onLazyImageReady: function onLazyImageReady(swiper, slide, image) {},
            onInit: function onInit() {
                $info.html(T.table({ girl: data[0] }));
            },
            paginationBulletRender: function paginationBulletRender(swiper, index, className) {
                var img = $tabs.eq(index).attr('src');
                return '<a href="javascript:" class="tab ' + className + '"><img src="' + img + '"/></a>';
            },
            paginationClickable: true,
            onSlideChangeStart: function onSlideChangeStart(slider) {
                var index = slider.realIndex + 1;
                $info.html(T.table({ girl: data[slider.realIndex] }));
                var parginationWidth = $pagination.width();
                var parentScrollLeft = $pagination[0].scrollLeft;
                var boxWidth = $('.girls-board .tab').outerWidth() + boxMargin;
                var offsetX = boxWidth * (index - 1);
                if (offsetX < parentScrollLeft) {
                    $pagination.animate({ scrollLeft: offsetX }, 200);
                } else if (parentScrollLeft + parginationWidth < offsetX + 20) {
                    $pagination.animate({ scrollLeft: offsetX + boxWidth - parginationWidth }, 200);
                }
            }
        });

        var $godown = $('.icon-go-down');
        $godown.click(function () {
            mySwiper.slideNext();
        });
    }

    setGirls();

    $newsContent = $('.news-content');
    $('.news-tabs .tab').hover(function (e) {
        var $this = $(this);
        var tag = $this.attr('data-tag');
        if (!tag) return;

        $this.addClass('active').siblings().removeClass('active');
        $newsContent.attr('data-tag', tag);
    });

    $('.icon-turn').click(function (e) {
        $(this).parent().find('.swiper-slide-active .image').toggleClass('active');
    });

    $info.on('mouseover', '.skill', function (e) {
        var $this = $(e.currentTarget);
        $this.addClass('active').siblings().removeClass('active');
        desc = $this.attr('data-desc');
        if (desc) {
            $this.parent().find('.desc').html(desc);
        }
    });

    var $play = $('.icon-play');
    var $dialog = $('.dialog-video');
    var $mask = $('.dialog-video .mask');
    var $video = $('.dialog-video video');
    var $call = $('.icon-btn-call');
    var $dcommit = $('.dialog-commit');
    var $commit = $dcommit.find('.submit');
    var $close = $('.dialog-commit .icon-close');
    var video = $video[0];

    $play.click(function () {
        $dialog.show();
        var play = video.play();
        if (play) {
            play.then(function () {
                console.log('play');
            });
        }
    });

    $call.click(function (e) {
        $dcommit.show();
    });

    $close.click(function (e) {
        $dcommit.hide();
    });

    $mask.click(function (e) {
        $dialog.hide();
        var pause = video.pause();
        if (pause) {
            pause.then(function () {
                console.log('pause');
            });
        }
    });

    // audio

    $info.on('click', '.a-off', function (e) {
        var $this = $(e.currentTarget);
        var audio = $this.parent().find('audio')[0];
        audio.play();

        var $onbtn = $this.next('.a-on');
        $(audio).on('ended', function () {
            off($onbtn);
        });
        $this.hide();
        $onbtn.css('display', 'inline-block');
    });

    function off($this) {
        var audio = $this.parent().find('audio')[0];
        audio.pause();
        $this.hide();
        $this.parent().find('.a-off').css('display', 'inline-block');
    }

    $info.on('click', '.a-on', function (e) {
        off($(e.currentTarget));
    });

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

        var tag = $('.content-box').attr('data-tag');
        if (!tag) {
            return toast('数据错误');
        }
        var $container = $('.form.' + tag);
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

        var tag = $('.content-box').attr('data-tag');
        if (!tag) {
            return toast('数据错误');
        }
        var $container = $('.dialog-commit');

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
                $dcommit.hide();
                toast('申请成功');
            },
            err: function err(_err3) {
                submiting = false;
                console.log(_err3);
            }
        });
    });

    $('.wait').click(function (e) {
        e.preventDefault();
        toast('敬请期待');
    });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJpbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbihmdW5jdGlvbiAoKSB7XG4gICAgdmFyICRsb2FkaW5nVmFsdWUgPSAkKCcubG9hZGluZy12YWx1ZSBzcGFuJyk7XG5cbiAgICBTLnByZWxvYWQoWydpbWFnZS9zZWN0aW9uMS5qcGcnLCAnaW1hZ2Uvc3ByaXRlLnBuZyddLCBmdW5jdGlvbiAocikge1xuICAgICAgICBjb25zb2xlLmxvZygnbG9hZCByZXNvdXJjZSBjb3VudDonLCByKTtcbiAgICAgICAgJCgnLmxvYWRlcicpLmhpZGUoKTtcbiAgICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdsb2FkaW5nJyk7XG4gICAgfSwgZnVuY3Rpb24gKHApIHtcbiAgICAgICAgdmFyIHAgPSBwICYmIHAudG9GaXhlZCgwKTtcbiAgICAgICAgJGxvYWRpbmdWYWx1ZS53aWR0aChwICsgJyUnKTtcbiAgICB9KTtcbn0pLmNhbGwodW5kZWZpbmVkKTtcblxuJChmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgcXVuSW5mbyA9IHtcbiAgICAgICAgdXJsOiBcIi8vc2hhbmcucXEuY29tL3dwYS9xdW53cGE/aWRrZXk9NTk0ZTc4ODMwMDMwYjVjOGQxYjFhMzRmZDExZjc1M2U0ZWQ2Y2ViOTAzMzMyYjZhM2Y1NWMwMTY3MTQyOGUwNFwiLFxuICAgICAgICBld206IFwiaHR0cDovL3NuaDQ4LnRoZWRyZWFtLmNjL2RjbXNfdXBmaWxlcy8zMmV4THdIWUthWE9TcGZ2MTQ5NTAwNTUzMS5wbmdcIixcbiAgICAgICAgbnVtYmVyOiBcIjM0MDkyMDQ0NFwiLFxuICAgICAgICBvdGhlcjogXCJodHRwOi8vc25oNDgudGhlZHJlYW0uY2MvZGNtc191cGZpbGVzL1p3cURHTW9qVmlIQ2V0Y1AxNDk1MDA1NTM1LnBuZ1wiXG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGdldFF1bkluZm8oKSB7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB0eXBlOiAnanNvbnAnLFxuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgIHVybDogJ2h0dHA6Ly9kY21zLnRoZWRyZWFtLmNjL3NuaDQ4L3FxX2V3bScsXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb25wJyxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIHN1Y2Nlc3Mocikge1xuICAgICAgICAgICAgICAgIGlmIChyLnJldF9jb2RlID09ICcwJykge1xuICAgICAgICAgICAgICAgICAgICBxdW5JbmZvID0gci5kYXRhO1xuICAgICAgICAgICAgICAgICAgICBzZXRRdW5JbmZvKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycjogZnVuY3Rpb24gZXJyKF9lcnIpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhfZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0UXVuSW5mbygpIHtcbiAgICAgICAgJCgnLnRvLXFxJykuYXR0cignaHJlZicsIHF1bkluZm8udXJsKTtcbiAgICB9XG5cbiAgICBnZXRRdW5JbmZvKCk7XG5cbiAgICB2YXIgJGNvbnRlbnQgPSAkKCcuY29udGVudC1ib3gnKTtcbiAgICAkKCcudGFiJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgdmFyICR0aGlzID0gJChlLmN1cnJlbnRUYXJnZXQpO1xuICAgICAgICAkdGhpcy5hZGRDbGFzcygnYWN0aXZlJykuc2libGluZ3MoKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIHZhciB0YWcgPSAkdGhpcy5hdHRyKCdkYXRhLXRhZycpO1xuICAgICAgICBpZiAodGFnKSAkY29udGVudC5hdHRyKCdkYXRhLXRhZycsIHRhZyk7XG4gICAgfSk7XG5cbiAgICB2YXIgbXlTd2lwZXI7XG5cbiAgICBmdW5jdGlvbiBzZXRTd2lwZXIoKSB7XG4gICAgICAgIG15U3dpcGVyID0gbmV3IFN3aXBlcignLnN3aXBlcicsIHtcbiAgICAgICAgICAgIC8vIGluaXRpYWxTbGlkZTogMSxcbiAgICAgICAgICAgIGxvb3A6IGZhbHNlLFxuICAgICAgICAgICAgZGlyZWN0aW9uOiAndmVydGljYWwnLFxuICAgICAgICAgICAgc3BlZWQ6IDQwMCxcbiAgICAgICAgICAgIGxhenlMb2FkaW5nOiB0cnVlLFxuICAgICAgICAgICAgZ3JhYkN1cnNvcjogdHJ1ZSxcbiAgICAgICAgICAgIG1vdXNld2hlZWxDb250cm9sOiB0cnVlLFxuICAgICAgICAgICAga2V5Ym9hcmRDb250cm9sOiBmYWxzZSxcbiAgICAgICAgICAgIHNpbXVsYXRlVG91Y2g6IGZhbHNlLFxuICAgICAgICAgICAgcGFnaW5hdGlvbjogJy5uYXYtdGFicycsXG4gICAgICAgICAgICBidWxsZXRDbGFzczogJ2ljb24tdGFiJyxcbiAgICAgICAgICAgIGJ1bGxldEFjdGl2ZUNsYXNzOiAnYWN0aXZlJyxcbiAgICAgICAgICAgIHBhZ2luYXRpb25CdWxsZXRSZW5kZXI6IGZ1bmN0aW9uIHBhZ2luYXRpb25CdWxsZXRSZW5kZXIoc3dpcGVyLCBpbmRleCwgY2xhc3NOYW1lKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZpcnN0ID0gJyc7XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgZmlyc3QgPSAnPGRpdiBjbGFzcz1cImljb24tc3RhciBmaXJzdFwiPjwvZGl2Pic7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAnPGEgaHJlZj1cImphdmFzY3JpcHQ6XCIgY2xhc3M9XCJ0YWIgJyArIGNsYXNzTmFtZSArICcgJyArIGNsYXNzTmFtZSArICctJyArIGluZGV4ICsgJy1ob3ZlclwiPicgKyBmaXJzdCArICc8ZGl2IGNsYXNzPVwiaWNvbi1zdGFyXCI+PC9kaXY+PC9hPic7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcGFnaW5hdGlvbkNsaWNrYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcblxuICAgICAgICB3aW5kb3cubXlTd2lwZXIgPSBteVN3aXBlcjtcbiAgICB9XG5cbiAgICBzZXRTd2lwZXIoKTtcblxuICAgIHZhciBkdXJhdGlvbiA9IDYwMDtcbiAgICB2YXIgc3RhcnQgPSBmYWxzZTtcbiAgICB2YXIgaXNMYXN0UGFnZSA9IGZhbHNlO1xuICAgIHZhciBmaXJzdCA9IHRydWU7XG5cbiAgICBmdW5jdGlvbiBjaGVja0NvcHlyaWdodChnb2Rvd24pIHtcbiAgICAgICAgaWYgKHN0YXJ0KSByZXR1cm47XG4gICAgICAgIHZhciBpbmRleCA9IG15U3dpcGVyLmFjdGl2ZUluZGV4O1xuXG4gICAgICAgIGlmIChpbmRleCA8IDMpIHtcbiAgICAgICAgICAgIHJldHVybiBmaXJzdCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZmlyc3QpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGZpcnN0ID0gZmFsc2U7XG4gICAgICAgICAgICB9LCBkdXJhdGlvbik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gc3RhcnQgPSB0cnVlXG5cbiAgICAgICAgaWYgKGdvZG93bikge1xuICAgICAgICAgICAgaWYgKGlzTGFzdFBhZ2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXNMYXN0UGFnZSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpc0xhc3RQYWdlID0gdHJ1ZTtcbiAgICAgICAgICAgIC8vIOi/m+WFpeeJiOadg+S/oeaBr1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ+i/m+WFpeeJiOadg+S/oeaBrycpO1xuICAgICAgICAgICAgbXlTd2lwZXIubG9ja1N3aXBlcygpO1xuICAgICAgICAgICAgc2V0Q29wcHlyaWdodCh0cnVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChpc0xhc3RQYWdlKSB7XG4gICAgICAgICAgICAgICAgLy8g6YCA5Ye654mI5p2D5L+h5oGvXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+mAgOWHuueJiOadg+S/oeaBrycpO1xuICAgICAgICAgICAgICAgIGZpcnN0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpc0xhc3RQYWdlID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICBteVN3aXBlci51bmxvY2tTd2lwZXMoKTtcbiAgICAgICAgICAgICAgICBzZXRDb3BweXJpZ2h0KGZhbHNlKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaXNMYXN0UGFnZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc3RhcnQgPSBmYWxzZTtcbiAgICAgICAgfSwgZHVyYXRpb24pO1xuICAgIH1cblxuICAgICQoJy5zd2lwZXInKS5vbignbW91c2V3aGVlbCcsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICB2YXIgZ29kb3duID0gdHJ1ZTtcbiAgICAgICAgaWYgKGV2ZW50LmRlbHRhWSA+IDApIHtcbiAgICAgICAgICAgIGdvZG93biA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgY2hlY2tDb3B5cmlnaHQoZ29kb3duKTtcbiAgICB9KTtcblxuICAgICQoJ2RvY3VtZW50Jykua2V5cHJlc3MoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgIHZhciBnb2Rvd24gPSB0cnVlO1xuICAgICAgICB2YXIgY29kZSA9IGUua2V5Q29kZSA/IGUua2V5Q29kZSA6IGUud2hpY2g7XG4gICAgICAgIGlmIChjb2RlID09IDQwKSB7XG4gICAgICAgICAgICB2YXIgZ29kb3duID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmIChjb2RlID09IDM4KSB7XG4gICAgICAgICAgICBnb2Rvd24gPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhjb2RlKTtcbiAgICAgICAgY2hlY2tDb3B5cmlnaHQoZ29kb3duKTtcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIHNldENvcHB5cmlnaHQoc2hvdykge1xuICAgICAgICBpZiAoc2hvdykge1xuICAgICAgICAgICAgJCgnLnZpZXctaW5kZXgnKS5hZGRDbGFzcygnc2hvdy1mb290ZXInKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoJy52aWV3LWluZGV4JykucmVtb3ZlQ2xhc3MoJ3Nob3ctZm9vdGVyJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXROZXdzQmFubmVycygpIHtcbiAgICAgICAgaWYgKCEkKCcubmV3cy1iYW5uZXJzJykubGVuZ3RoKSByZXR1cm47XG4gICAgICAgIG5ldyBTd2lwZXIoJy5uZXdzLWJhbm5lcnMnLCB7XG4gICAgICAgICAgICBzcGVlZDogNDAwLFxuICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAwLFxuICAgICAgICAgICAgYXV0b3BsYXk6IDMwMDAsXG4gICAgICAgICAgICBsb29wOiB0cnVlLFxuICAgICAgICAgICAgbW91c2V3aGVlbENvbnRyb2w6IHRydWUsXG4gICAgICAgICAgICBwYWdpbmF0aW9uOiBcIi5uZXdzLWJhbm5lci1wYWdlXCJcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2V0TmV3c0Jhbm5lcnMoKTtcblxuICAgIHZhciB3aWR0aCA9IDA7XG4gICAgdmFyIGEgPSAkKCcua2VmdSBwJykuZWFjaChmdW5jdGlvbiAoaSwgcCkge1xuICAgICAgICBjb25zb2xlLmxvZygkKHApLm91dGVyV2lkdGgoKSk7XG4gICAgICAgIHdpZHRoICs9ICQocCkub3V0ZXJXaWR0aCgpO1xuICAgIH0pO1xuXG4gICAgY29uc29sZS5sb2cod2lkdGgpO1xuXG4gICAgZnVuY3Rpb24gc2V0S2VmdSgpIHtcbiAgICAgICAgbmV3IFN3aXBlcignLmtlZnUnLCB7XG4gICAgICAgICAgICBzcGVlZDogMTAwMDAsXG4gICAgICAgICAgICB3aWR0aDogd2lkdGggKyA0MCxcbiAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMCxcbiAgICAgICAgICAgIGF1dG9wbGF5OiAxLFxuICAgICAgICAgICAgbG9vcDogdHJ1ZSxcbiAgICAgICAgICAgIG1vdXNld2hlZWxDb250cm9sOiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNldEtlZnUoKTtcblxuICAgIHZhciAkdmlkZW9zID0gJCgnLnZpZGVvcycpO1xuICAgIHZhciAkdXBWaWRlb0RpYWxvZyA9ICQoJy5kaWFsb2ctdXAtdmlkZW8nKTtcblxuICAgICR1cFZpZGVvRGlhbG9nLmZpbmQoJy5tYXNrJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAkdXBWaWRlb0RpYWxvZy5oaWRlKCkuZmluZCgnLnZpZGVvJykuZW1wdHkoKTtcbiAgICB9KTtcblxuICAgICR2aWRlb3Mub24oJ2NsaWNrJywgJy52aWRlbycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcbiAgICAgICAgdmFyIHZpZGVvID0gJHRoaXMuYXR0cignZGF0YS12aWRlbycpO1xuICAgICAgICAkdXBWaWRlb0RpYWxvZy5zaG93KCkuZmluZCgnLnZpZGVvJykuaHRtbCh2aWRlbyk7XG4gICAgfSk7XG5cbiAgICB2YXIgJHNuYXBzaG90cyA9ICQoJy5zbmFwc2hvdHMnKTtcbiAgICB2YXIgJHNuYXBzaG90c0RpYWxvZyA9ICQoJy5kaWFsb2ctc25hcHNob3RzJyk7XG5cbiAgICAkc25hcHNob3RzRGlhbG9nLmZpbmQoJy5tYXNrJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAkc25hcHNob3RzRGlhbG9nLmhpZGUoKS5maW5kKCcuaW1nJykuYXR0cignc3JjJywgJ2phdmFzY3JpcHQ6Jyk7XG4gICAgfSk7XG5cbiAgICAkc25hcHNob3RzLm9uKCdjbGljaycsICcuaW1hZ2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG4gICAgICAgIHZhciBzcmMgPSAkdGhpcy5hdHRyKCdkYXRhLXNyYycpO1xuICAgICAgICAkc25hcHNob3RzRGlhbG9nLnNob3coKS5maW5kKCdpbWcnKS5hdHRyKCdzcmMnLCBzcmMpO1xuICAgIH0pO1xuXG4gICAgdmFyICR1cFZpZGVvQm9hcmQgPSAkKCcudXAtdmlkZW9zJyk7XG4gICAgJCgnLmJ0bi11cC12aWRlbycpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJHVwVmlkZW9Cb2FyZC5hdHRyKCdkYXRhLXRhZycsICd2Jyk7XG4gICAgfSk7XG5cbiAgICAkKCcuYnRuLXNuYXBzaG90cycpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gRGlzYWJsZWQgaW1hZ2Ugd2lsbCBub3QgaW5pdCBzd2lwZXJcbiAgICAgICAgLy8gU2V0IHN3aXBlciBhZnRlciBpbWFnZXMgZGlzcGxheWVkXG4gICAgICAgIHNldFRpbWVvdXQoc2V0U25hcHNob3RzLCAwKTtcbiAgICAgICAgJHVwVmlkZW9Cb2FyZC5hdHRyKCdkYXRhLXRhZycsICdzJyk7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBzZXRTbmFwc2hvdHMoKSB7XG4gICAgICAgIG5ldyBTd2lwZXIoJy5zbmFwc2hvdHMnLCB7XG4gICAgICAgICAgICBzcGVlZDogNDAwLFxuICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAyMCxcbiAgICAgICAgICAgIHNsaWRlc1Blckdyb3VwOiA0LFxuICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogNCxcbiAgICAgICAgICAgIGxvb3A6IHRydWUsXG4gICAgICAgICAgICBtb3VzZXdoZWVsQ29udHJvbDogZmFsc2UsXG4gICAgICAgICAgICBwcmV2QnV0dG9uOiAnLmljb24tcy1hcnJvdy1sZWZ0JyxcbiAgICAgICAgICAgIG5leHRCdXR0b246ICcuaWNvbi1zLWFycm93LXJpZ2h0J1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRXdXR1KCkge1xuICAgICAgICBuZXcgU3dpcGVyKCcud3V0dScsIHtcbiAgICAgICAgICAgIHNwZWVkOiA0MDAsXG4gICAgICAgICAgICBzcGFjZUJldHdlZW46IDAsXG4gICAgICAgICAgICBhdXRvcGxheTogMzAwMCxcbiAgICAgICAgICAgIGxvb3A6IHRydWUsXG4gICAgICAgICAgICBtb3VzZXdoZWVsQ29udHJvbDogZmFsc2UsXG4gICAgICAgICAgICBwcmV2QnV0dG9uOiAnLnNlY3Rpb240IC5pY29uLWFycm93LWxlZnQnLFxuICAgICAgICAgICAgbmV4dEJ1dHRvbjogJy5zZWN0aW9uNCAuaWNvbi1hcnJvdy1yaWdodCdcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2V0V3V0dSgpO1xuXG4gICAgZnVuY3Rpb24gZ2V0SmluZW5nKGpuU3RyKSB7XG4gICAgICAgIHZhciBqbnMgPSBqblN0ci5zcGxpdCgnXFxuJyk7XG4gICAgICAgIHZhciBza2lsbHMgPSBbXTtcbiAgICAgICAgam5zLmZvckVhY2goZnVuY3Rpb24gKGpuLCBuKSB7XG4gICAgICAgICAgICBqbiA9IGpuLnNwbGl0KCd8Jyk7XG4gICAgICAgICAgICBza2lsbHMucHVzaCh7XG4gICAgICAgICAgICAgICAgaWNvbjogam5bMF0sXG4gICAgICAgICAgICAgICAgZGVzYzogam5bMl1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHNraWxscztcbiAgICB9XG5cbiAgICB2YXIgZGF0YSA9IFtdO1xuICAgIHZhciAkY2hhcmFjdGVyID0gJCgnI2NoYXJhY3RlciBbY2xhc3NePVwiY2FoYXJjdGVyX1wiXScpO1xuICAgIHZhciBnaXJsQ291bnQgPSAkY2hhcmFjdGVyLmxlbmd0aDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGdpcmxDb3VudDsgaSsrKSB7XG4gICAgICAgIHZhciAkZyA9ICRjaGFyYWN0ZXIuZXEoaSk7XG4gICAgICAgIHZhciBnID0ge1xuICAgICAgICAgICAgcjogJGcuZmluZCgnLmNoYXJhY3Rlcl9pbWcnKS52YWwoKSxcbiAgICAgICAgICAgIGs6ICRnLmZpbmQoJy5lY3lfaW1nJykudmFsKCksXG4gICAgICAgICAgICBuYW1lOiAkZy5maW5kKCcubmFtZScpLnZhbCgpLFxuICAgICAgICAgICAgYXVkaW86ICRnLmZpbmQoJy5hdWRpbycpLnZhbCgpLFxuICAgICAgICAgICAgbmlja25hbWU6ICRnLmZpbmQoJy5uaWNrbmFtZScpLnZhbCgpLFxuICAgICAgICAgICAgeHVleGluZzogJGcuZmluZCgnLnh1ZXhpbmcnKS52YWwoKSxcbiAgICAgICAgICAgIGJpcnRoZGF5OiAkZy5maW5kKCcuYmlydGhkYXknKS52YWwoKSxcbiAgICAgICAgICAgIGhlaWdodDogJGcuZmluZCgnLmhlaWdodCcpLnZhbCgpLFxuICAgICAgICAgICAgeGluZ3p1bzogJGcuZmluZCgnLnhpbmd6dW8nKS52YWwoKSxcbiAgICAgICAgICAgIHRlY2hhbmc6ICRnLmZpbmQoJy50ZWNoYW5nJykudmFsKCksXG4gICAgICAgICAgICBob2JieTogJGcuZmluZCgnLmhvYmJ5JykudmFsKCksXG4gICAgICAgICAgICB0ZWFtOiAkZy5maW5kKCcudGVhbScpLnZhbCgpLFxuICAgICAgICAgICAgamluZW5nOiBnZXRKaW5lbmcoJGcuZmluZCgnLmppbmVuZycpLnZhbCgpKVxuICAgICAgICB9O1xuICAgICAgICBkYXRhLnB1c2goZyk7XG4gICAgfVxuXG4gICAgdmFyICRpbmZvID0gJCgnLmluZm8tYm9hcmQnKTtcbiAgICB2YXIgZ2lybFN3aXBlcjtcblxuICAgIGZ1bmN0aW9uIHNldEdpcmxzKCkge1xuICAgICAgICB2YXIgJHBhZ2luYXRpb24gPSAkKCcuZ2lybHMtYm9hcmQgLndyYXBwZXInKTtcbiAgICAgICAgdmFyIGJveE1hcmdpbiA9IDY7XG4gICAgICAgIGlmICgkKHdpbmRvdykub3V0ZXJXaWR0aCgpIDwgMTQ0MCB8fCAkKHdpbmRvdykub3V0ZXJIZWlnaHQoKSA8IDgwMCkge1xuICAgICAgICAgICAgYm94TWFyZ2luID0gNTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciAkdGFicyA9ICQoJy5naXJscy1ib2FyZCAudGFiIGltZycpO1xuICAgICAgICBnaXJsU3dpcGVyID0gbmV3IFN3aXBlcignLmdpcmxzJywge1xuICAgICAgICAgICAgc3BlZWQ6IDQwMCxcbiAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMzAwLFxuICAgICAgICAgICAgLy8gYXV0b3BsYXk6IDMwMDAsXG4gICAgICAgICAgICBsb29wOiBmYWxzZSxcbiAgICAgICAgICAgIG1vdXNld2hlZWxDb250cm9sOiBmYWxzZSxcbiAgICAgICAgICAgIHByZXZCdXR0b246ICcuZ2lybHMtYm9hcmQgLmljb24tYXJyb3ctbGVmdCcsXG4gICAgICAgICAgICBuZXh0QnV0dG9uOiAnLmdpcmxzLWJvYXJkIC5pY29uLWFycm93LXJpZ2h0JyxcbiAgICAgICAgICAgIHBhZ2luYXRpb246ICcuZ2lybHMtYm9hcmQgLndyYXBwZXInLFxuICAgICAgICAgICAgYnVsbGV0Q2xhc3M6ICd0YWInLFxuICAgICAgICAgICAgYnVsbGV0QWN0aXZlQ2xhc3M6ICdhY3RpdmUnLFxuICAgICAgICAgICAgcHJlbG9hZEltYWdlczogZmFsc2UsXG4gICAgICAgICAgICBsYXp5TG9hZGluZzogdHJ1ZSxcbiAgICAgICAgICAgIC8vIGxhenlMb2FkaW5nSW5QcmV2TmV4dDogdHJ1ZSxcbiAgICAgICAgICAgIC8vIGxhenlMb2FkaW5nT25UcmFuc2l0aW9uU3RhcnQ6IHRydWUsXG4gICAgICAgICAgICBvbkxhenlJbWFnZVJlYWR5OiBmdW5jdGlvbiBvbkxhenlJbWFnZVJlYWR5KHN3aXBlciwgc2xpZGUsIGltYWdlKSB7fSxcbiAgICAgICAgICAgIG9uSW5pdDogZnVuY3Rpb24gb25Jbml0KCkge1xuICAgICAgICAgICAgICAgICRpbmZvLmh0bWwoVC50YWJsZSh7IGdpcmw6IGRhdGFbMF0gfSkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBhZ2luYXRpb25CdWxsZXRSZW5kZXI6IGZ1bmN0aW9uIHBhZ2luYXRpb25CdWxsZXRSZW5kZXIoc3dpcGVyLCBpbmRleCwgY2xhc3NOYW1lKSB7XG4gICAgICAgICAgICAgICAgdmFyIGltZyA9ICR0YWJzLmVxKGluZGV4KS5hdHRyKCdzcmMnKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gJzxhIGhyZWY9XCJqYXZhc2NyaXB0OlwiIGNsYXNzPVwidGFiICcgKyBjbGFzc05hbWUgKyAnXCI+PGltZyBzcmM9XCInICsgaW1nICsgJ1wiLz48L2E+JztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwYWdpbmF0aW9uQ2xpY2thYmxlOiB0cnVlLFxuICAgICAgICAgICAgb25TbGlkZUNoYW5nZVN0YXJ0OiBmdW5jdGlvbiBvblNsaWRlQ2hhbmdlU3RhcnQoc2xpZGVyKSB7XG4gICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gc2xpZGVyLnJlYWxJbmRleCArIDE7XG4gICAgICAgICAgICAgICAgJGluZm8uaHRtbChULnRhYmxlKHsgZ2lybDogZGF0YVtzbGlkZXIucmVhbEluZGV4XSB9KSk7XG4gICAgICAgICAgICAgICAgdmFyIHBhcmdpbmF0aW9uV2lkdGggPSAkcGFnaW5hdGlvbi53aWR0aCgpO1xuICAgICAgICAgICAgICAgIHZhciBwYXJlbnRTY3JvbGxMZWZ0ID0gJHBhZ2luYXRpb25bMF0uc2Nyb2xsTGVmdDtcbiAgICAgICAgICAgICAgICB2YXIgYm94V2lkdGggPSAkKCcuZ2lybHMtYm9hcmQgLnRhYicpLm91dGVyV2lkdGgoKSArIGJveE1hcmdpbjtcbiAgICAgICAgICAgICAgICB2YXIgb2Zmc2V0WCA9IGJveFdpZHRoICogKGluZGV4IC0gMSk7XG4gICAgICAgICAgICAgICAgaWYgKG9mZnNldFggPCBwYXJlbnRTY3JvbGxMZWZ0KSB7XG4gICAgICAgICAgICAgICAgICAgICRwYWdpbmF0aW9uLmFuaW1hdGUoeyBzY3JvbGxMZWZ0OiBvZmZzZXRYIH0sIDIwMCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwYXJlbnRTY3JvbGxMZWZ0ICsgcGFyZ2luYXRpb25XaWR0aCA8IG9mZnNldFggKyAyMCkge1xuICAgICAgICAgICAgICAgICAgICAkcGFnaW5hdGlvbi5hbmltYXRlKHsgc2Nyb2xsTGVmdDogb2Zmc2V0WCArIGJveFdpZHRoIC0gcGFyZ2luYXRpb25XaWR0aCB9LCAyMDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyICRnb2Rvd24gPSAkKCcuaWNvbi1nby1kb3duJyk7XG4gICAgICAgICRnb2Rvd24uY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbXlTd2lwZXIuc2xpZGVOZXh0KCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNldEdpcmxzKCk7XG5cbiAgICAkbmV3c0NvbnRlbnQgPSAkKCcubmV3cy1jb250ZW50Jyk7XG4gICAgJCgnLm5ld3MtdGFicyAudGFiJykuaG92ZXIoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcbiAgICAgICAgdmFyIHRhZyA9ICR0aGlzLmF0dHIoJ2RhdGEtdGFnJyk7XG4gICAgICAgIGlmICghdGFnKSByZXR1cm47XG5cbiAgICAgICAgJHRoaXMuYWRkQ2xhc3MoJ2FjdGl2ZScpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAkbmV3c0NvbnRlbnQuYXR0cignZGF0YS10YWcnLCB0YWcpO1xuICAgIH0pO1xuXG4gICAgJCgnLmljb24tdHVybicpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICQodGhpcykucGFyZW50KCkuZmluZCgnLnN3aXBlci1zbGlkZS1hY3RpdmUgLmltYWdlJykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgIH0pO1xuXG4gICAgJGluZm8ub24oJ21vdXNlb3ZlcicsICcuc2tpbGwnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICB2YXIgJHRoaXMgPSAkKGUuY3VycmVudFRhcmdldCk7XG4gICAgICAgICR0aGlzLmFkZENsYXNzKCdhY3RpdmUnKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgZGVzYyA9ICR0aGlzLmF0dHIoJ2RhdGEtZGVzYycpO1xuICAgICAgICBpZiAoZGVzYykge1xuICAgICAgICAgICAgJHRoaXMucGFyZW50KCkuZmluZCgnLmRlc2MnKS5odG1sKGRlc2MpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICB2YXIgJHBsYXkgPSAkKCcuaWNvbi1wbGF5Jyk7XG4gICAgdmFyICRkaWFsb2cgPSAkKCcuZGlhbG9nLXZpZGVvJyk7XG4gICAgdmFyICRtYXNrID0gJCgnLmRpYWxvZy12aWRlbyAubWFzaycpO1xuICAgIHZhciAkdmlkZW8gPSAkKCcuZGlhbG9nLXZpZGVvIHZpZGVvJyk7XG4gICAgdmFyICRjYWxsID0gJCgnLmljb24tYnRuLWNhbGwnKTtcbiAgICB2YXIgJGRjb21taXQgPSAkKCcuZGlhbG9nLWNvbW1pdCcpO1xuICAgIHZhciAkY29tbWl0ID0gJGRjb21taXQuZmluZCgnLnN1Ym1pdCcpO1xuICAgIHZhciAkY2xvc2UgPSAkKCcuZGlhbG9nLWNvbW1pdCAuaWNvbi1jbG9zZScpO1xuICAgIHZhciB2aWRlbyA9ICR2aWRlb1swXTtcblxuICAgICRwbGF5LmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJGRpYWxvZy5zaG93KCk7XG4gICAgICAgIHZhciBwbGF5ID0gdmlkZW8ucGxheSgpO1xuICAgICAgICBpZiAocGxheSkge1xuICAgICAgICAgICAgcGxheS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncGxheScpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgICRjYWxsLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICRkY29tbWl0LnNob3coKTtcbiAgICB9KTtcblxuICAgICRjbG9zZS5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgICAgICAkZGNvbW1pdC5oaWRlKCk7XG4gICAgfSk7XG5cbiAgICAkbWFzay5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgICAgICAkZGlhbG9nLmhpZGUoKTtcbiAgICAgICAgdmFyIHBhdXNlID0gdmlkZW8ucGF1c2UoKTtcbiAgICAgICAgaWYgKHBhdXNlKSB7XG4gICAgICAgICAgICBwYXVzZS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncGF1c2UnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBhdWRpb1xuXG4gICAgJGluZm8ub24oJ2NsaWNrJywgJy5hLW9mZicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHZhciAkdGhpcyA9ICQoZS5jdXJyZW50VGFyZ2V0KTtcbiAgICAgICAgdmFyIGF1ZGlvID0gJHRoaXMucGFyZW50KCkuZmluZCgnYXVkaW8nKVswXTtcbiAgICAgICAgYXVkaW8ucGxheSgpO1xuXG4gICAgICAgIHZhciAkb25idG4gPSAkdGhpcy5uZXh0KCcuYS1vbicpO1xuICAgICAgICAkKGF1ZGlvKS5vbignZW5kZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBvZmYoJG9uYnRuKTtcbiAgICAgICAgfSk7XG4gICAgICAgICR0aGlzLmhpZGUoKTtcbiAgICAgICAgJG9uYnRuLmNzcygnZGlzcGxheScsICdpbmxpbmUtYmxvY2snKTtcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIG9mZigkdGhpcykge1xuICAgICAgICB2YXIgYXVkaW8gPSAkdGhpcy5wYXJlbnQoKS5maW5kKCdhdWRpbycpWzBdO1xuICAgICAgICBhdWRpby5wYXVzZSgpO1xuICAgICAgICAkdGhpcy5oaWRlKCk7XG4gICAgICAgICR0aGlzLnBhcmVudCgpLmZpbmQoJy5hLW9mZicpLmNzcygnZGlzcGxheScsICdpbmxpbmUtYmxvY2snKTtcbiAgICB9XG5cbiAgICAkaW5mby5vbignY2xpY2snLCAnLmEtb24nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBvZmYoJChlLmN1cnJlbnRUYXJnZXQpKTtcbiAgICB9KTtcblxuICAgIC8vIOWAkuiuoeaXtlxuICAgIGZ1bmN0aW9uIGNvdW50ZG93bigkbm9kZSkge1xuICAgICAgICB2YXIgdGltZSA9IDYwO1xuICAgICAgICB2YXIgdHQgPSBEYXRlLm5vdygpO1xuICAgICAgICAkbm9kZS5jc3MoJ3BvaW50ZXItZXZlbnRzJywgJ25vbmUnKTtcbiAgICAgICAgdmFyIHQgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgY3VycmVudCA9IERhdGUubm93KCk7XG4gICAgICAgICAgICB2YXIgZHVyYXRpb24gPSAoKGN1cnJlbnQgLSB0dCkgLyAxMDAwKS50b0ZpeGVkKDApO1xuICAgICAgICAgICAgdmFyIGxzID0gdGltZSAtIGR1cmF0aW9uO1xuICAgICAgICAgICAgaWYgKGxzIDwgMCkge1xuICAgICAgICAgICAgICAgICRub2RlLmNzcygncG9pbnRlci1ldmVudHMnLCAnYWxsJyk7XG4gICAgICAgICAgICAgICAgJG5vZGUuaHRtbCgn6I635Y+W6aqM6K+B56CBJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNsZWFySW50ZXJ2YWwodCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkbm9kZS5odG1sKGxzKTtcbiAgICAgICAgfSwgMTAwMCk7XG4gICAgfVxuXG4gICAgLy8g6I635Y+W6aqM6K+B56CBXG4gICAgdmFyICRlcmNvZGUgPSAkKCcuZXJjb2RlJyk7XG4gICAgdmFyIHNlbmRpbmdDb2RlID0gZmFsc2U7XG4gICAgJGVyY29kZS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChzZW5kaW5nQ29kZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRvYXN0KCfmraPlnKjlj5HpgIHpqozor4HnoIHvvIzor7fnqI3lkI4nKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuXG4gICAgICAgIHZhciB0YWcgPSAkKCcuY29udGVudC1ib3gnKS5hdHRyKCdkYXRhLXRhZycpO1xuICAgICAgICBpZiAoIXRhZykge1xuICAgICAgICAgICAgcmV0dXJuIHRvYXN0KCfmlbDmja7plJnor68nKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgJGNvbnRhaW5lciA9ICQoJy5mb3JtLicgKyB0YWcpO1xuICAgICAgICB2YXIgJHBob25lID0gJGNvbnRhaW5lci5maW5kKCcucGhvbmUnKTtcbiAgICAgICAgdmFyIHBob25lID0gJHBob25lLnZhbCgpLnRyaW0oKTtcbiAgICAgICAgaWYgKCFwaG9uZSB8fCBwaG9uZS5sZW5ndGggIT0gMTEpIHtcbiAgICAgICAgICAgIHJldHVybiB0b2FzdCgn6K+36L6T5YWl5omL5py65Y+3Jyk7XG4gICAgICAgIH1cblxuICAgICAgICBzZW5kaW5nQ29kZSA9IHRydWU7XG4gICAgICAgICR0aGlzLmh0bWwoJ+WPkemAgeS4rScpO1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdHlwZTogJ2pzb25wJyxcbiAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICB1cmw6ICdodHRwOi8vZGNtcy50aGVkcmVhbS5jYy9zbmg0OC9jb2RlL3NlbmQ/Y2VsbD0nICsgcGhvbmUsXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb25wJyxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIHN1Y2Nlc3Mocikge1xuICAgICAgICAgICAgICAgIHNlbmRpbmdDb2RlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYgKHIucmV0X2NvZGUgIT09ICcwJykge1xuICAgICAgICAgICAgICAgICAgICAkdGhpcy5odG1sKCflj5HpgIHpqozor4HnoIEnKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRvYXN0KHIucmV0X21zZyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIOWAkuiuoeaXtlxuICAgICAgICAgICAgICAgIGNvdW50ZG93bigkdGhpcyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyOiBmdW5jdGlvbiBlcnIoX2VycjIpIHtcbiAgICAgICAgICAgICAgICBzZW5kaW5nQ29kZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKF9lcnIyKTtcbiAgICAgICAgICAgICAgICAkdGhpcy5odG1sKCflj5HpgIHpqozor4HnoIEnKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdG9hc3QoX2VycjIucmV0X21zZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy8g55Sz6aKG6aaW5rWL6LWE5qC8XG4gICAgdmFyICRzdWJtaXQgPSAkKCcuYnRuLnN1Ym1pdCcpO1xuICAgIHZhciBzdWJtaXRpbmcgPSBmYWxzZTtcbiAgICAkc3VibWl0LmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHN1Ym1pdGluZykge1xuICAgICAgICAgICAgcmV0dXJuIHRvYXN0KCfmraPlnKjlj5HpgIHkuK3vvIzor7fnqI3lkI4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG5cbiAgICAgICAgdmFyIHRhZyA9ICQoJy5jb250ZW50LWJveCcpLmF0dHIoJ2RhdGEtdGFnJyk7XG4gICAgICAgIGlmICghdGFnKSB7XG4gICAgICAgICAgICByZXR1cm4gdG9hc3QoJ+aVsOaNrumUmeivrycpO1xuICAgICAgICB9XG4gICAgICAgIHZhciAkY29udGFpbmVyID0gJCgnLmRpYWxvZy1jb21taXQnKTtcblxuICAgICAgICB2YXIgJHBob25lID0gJGNvbnRhaW5lci5maW5kKCcucGhvbmUnKTtcbiAgICAgICAgdmFyIHBob25lID0gJHBob25lLnZhbCgpLnRyaW0oKTtcbiAgICAgICAgaWYgKCFwaG9uZSB8fCBwaG9uZS5sZW5ndGggIT0gMTEpIHtcbiAgICAgICAgICAgIHJldHVybiB0b2FzdCgn6K+36L6T5YWl5omL5py65Y+3Jyk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgY29kZSA9ICRjb250YWluZXIuZmluZCgnLmNvZGUnKS52YWwoKS50cmltKCk7XG4gICAgICAgIGlmICghY29kZSB8fCBjb2RlLmxlbmd0aCAhPSA2KSB7XG4gICAgICAgICAgICByZXR1cm4gdG9hc3QoJ+ivt+i+k+WFpemqjOivgeeggScpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3VibWl0aW5nID0gdHJ1ZTtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHR5cGU6ICdqc29ucCcsXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIHVybDogJ2h0dHA6Ly9kY21zLnRoZWRyZWFtLmNjL3NuaDQ4L2NvZGUvY29uZmlybScsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgY2VsbDogcGhvbmUsXG4gICAgICAgICAgICAgICAgY29kZTogY29kZSxcbiAgICAgICAgICAgICAgICBvczogdGFnID09ICdhbmRyb2lkJyA/IDEgOiAyXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29ucCcsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiBzdWNjZXNzKHIpIHtcbiAgICAgICAgICAgICAgICBzdWJtaXRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAoci5yZXRfY29kZSAhPT0gJzAnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0b2FzdChyLnJldF9tc2cpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkZGNvbW1pdC5oaWRlKCk7XG4gICAgICAgICAgICAgICAgdG9hc3QoJ+eUs+ivt+aIkOWKnycpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycjogZnVuY3Rpb24gZXJyKF9lcnIzKSB7XG4gICAgICAgICAgICAgICAgc3VibWl0aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coX2VycjMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgICQoJy53YWl0JykuY2xpY2soZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0b2FzdCgn5pWs6K+35pyf5b6FJyk7XG4gICAgfSk7XG59KTsiXSwiZmlsZSI6ImluZGV4LmpzIn0=
