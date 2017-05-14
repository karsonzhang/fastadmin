define(['jquery', 'bootstrap', 'backend', 'addtabs', 'adminlte', 'validator'], function ($, undefined, Backend, undefined, AdminLTE, Form, Validator) {
    var Controller = {
        index: function () {
            //窗口大小改变,修正主窗体最小高度
            $(window).resize(function () {
                $(".tab-addtabs").css("height", $(".content-wrapper").height() + "px");
            });

            //双击重新加载页面
            $(document).on("dblclick", ".sidebar-menu li > a", function (e) {
                $("#tab_" + $(this).attr("addtabs") + " iframe").attr('src', function (i, val) {
                    return val;
                });
                e.stopPropagation();
            });

            //读取FastAdmin的更新信息
            $.ajax({
                url: 'http://demo.fastadmin.net/index/index/news',
                type: 'post',
                dataType: 'jsonp',
                success: function (ret) {
                    $(".notifications-menu > a span").text(ret.new > 0 ? ret.new : '');
                    $(".notifications-menu .footer a").attr("href", ret.url);
                    $.each(ret.newslist, function (i, j) {
                        var item = '<li><a href="' + j.url + '" target="_blank"><i class="' + j.icon + '"></i> ' + j.title + '</a></li>';
                        $(item).appendTo($(".notifications-menu ul.menu"));
                    });
                }
            });

            //读取FastAdmin的Commits信息
            $.ajax({
                url: 'https://api.github.com/repos/karsonzhang/fastadmin/commits?state=open&per_page=10&page=1&sort=updated',
                type: 'get',
                dataType: 'jsonp',
                success: function (ret) {
                    $(".github-commits > a span").text(ret.data.length);
                    $(".github-commits .footer a").attr("href", "https://github.com/karsonzhang/fastadmin/commits/master");

                    var dateDiff = function (hisTime, nowTime) {
                        if (!arguments.length)
                            return '';
                        var arg = arguments,
                                now = arg[1] ? arg[1] : new Date().getTime(),
                                diffValue = now - arg[0],
                                result = '',
                                minute = 1000 * 60,
                                hour = minute * 60,
                                day = hour * 24,
                                halfamonth = day * 15,
                                month = day * 30,
                                year = month * 12,
                                _year = diffValue / year,
                                _month = diffValue / month,
                                _week = diffValue / (7 * day),
                                _day = diffValue / day,
                                _hour = diffValue / hour,
                                _min = diffValue / minute;

                        if (_year >= 1)
                            result = parseInt(_year) + "年前";
                        else if (_month >= 1)
                            result = parseInt(_month) + "个月前";
                        else if (_week >= 1)
                            result = parseInt(_week) + "周前";
                        else if (_day >= 1)
                            result = parseInt(_day) + "天前";
                        else if (_hour >= 1)
                            result = parseInt(_hour) + "个小时前";
                        else if (_min >= 1)
                            result = parseInt(_min) + "分钟前";
                        else
                            result = "刚刚";
                        return result;
                    };
                    $.each(ret.data, function (i, j) {
                        var author = j.author ? j.author : {html_url: "https://github.com/karsonzhang", avatar_url: "/assets/img/avatar.png", login: "Anonymous"};
                        var item = '<li><a href="' + j.html_url + '"><div class="pull-left"><img src="' + author.avatar_url + '" class="img-circle" alt="' + author.login + '"></div><h4>' + author.login + '<small><i class="fa fa-clock-o"></i> ' + dateDiff(new Date(j.commit.committer.date).getTime()) + '</small></h4><p>' + j.commit.message + '</p></a></li>';
                        $(item).appendTo($(".github-commits ul.menu"));
                    });
                }
            });

            //切换左侧sidebar显示隐藏
            $(document).on("click", ".sidebar-menu li > a", function (e) {
                $(".sidebar-menu li").removeClass("active");
                //当外部触发隐藏的a时,触发父辈a的事件
                if (!$(this).closest("ul").is(":visible")) {
                    //如果不需要左侧的菜单栏联动可以注释下面一行即可
                    $(this).closest("ul").prev().trigger("click");
                }

                var visible = $(this).next("ul").is(":visible");
                if (!visible) {
                    $(this).parents("li").addClass("active");
                } else {
                }
                e.stopPropagation();
            });

            //清除缓存
            $(document).on('click', "[data-toggle='wipecache']", function () {
                $.ajax({
                    url: 'ajax/wipecache',
                    dataType: 'json',
                    cache: false,
                    success: function (ret) {
                        if (ret.hasOwnProperty("code")) {
                            var msg = ret.hasOwnProperty("msg") && ret.msg != "" ? ret.msg : "";
                            if (ret.code === 1) {
                                Toastr.success(msg ? msg : __('Wipe cache completed'));
                            } else {
                                Toastr.error(msg ? msg : __('Wipe cache failed'));
                            }
                        } else {
                            Toastr.error(__('Unknown data format'));
                        }
                    }, error: function () {
                        Toastr.error(__('Network error'));
                    }
                });
            });

            //全屏事件
            $(document).on('click', "[data-toggle='fullscreen']", function () {
                var doc = document.documentElement;
                if ($(document.body).hasClass("full-screen")) {
                    $(document.body).removeClass("full-screen");
                    document.exitFullscreen ? document.exitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen && document.webkitExitFullscreen();
                } else {
                    $(document.body).addClass("full-screen");
                    doc.requestFullscreen ? doc.requestFullscreen() : doc.mozRequestFullScreen ? doc.mozRequestFullScreen() : doc.webkitRequestFullscreen ? doc.webkitRequestFullscreen() : doc.msRequestFullscreen && doc.msRequestFullscreen();
                }
            });

            //绑定tabs事件
            $('#nav').addtabs({iframeHeight: "100%"});

            //修复iOS下iframe无法滚动的BUG
            if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
                $(".tab-addtabs").addClass("ios-iframe-fix");
            }

            if (location.hash.indexOf("#!") === 0) {
                var url = decodeURIComponent(location.hash.substring(2));
                //刷新页面后将左侧对应的LI展开
                $("ul.sidebar-menu a[href='" + url + "']").trigger("click");
            } else {
                $("ul.sidebar-menu li.active a").trigger("click");
            }

            /**
             * List of all the available skins
             *
             * @type Array
             */
            var my_skins = [
                "skin-blue",
                "skin-black",
                "skin-red",
                "skin-yellow",
                "skin-purple",
                "skin-green",
                "skin-blue-light",
                "skin-black-light",
                "skin-red-light",
                "skin-yellow-light",
                "skin-purple-light",
                "skin-green-light"
            ];

            setup();

            /**
             * Toggles layout classes
             *
             * @param String cls the layout class to toggle
             * @returns void
             */
            function change_layout(cls) {
                $("body").toggleClass(cls);
                AdminLTE.layout.fixSidebar();
                //Fix the problem with right sidebar and layout boxed
                if (cls == "layout-boxed")
                    AdminLTE.controlSidebar._fix($(".control-sidebar-bg"));
                if ($('body').hasClass('fixed') && cls == 'fixed') {
                    AdminLTE.pushMenu.expandOnHover();
                    AdminLTE.layout.activate();
                }
                AdminLTE.controlSidebar._fix($(".control-sidebar-bg"));
                AdminLTE.controlSidebar._fix($(".control-sidebar"));
            }

            /**
             * Replaces the old skin with the new skin
             * @param String cls the new skin class
             * @returns Boolean false to prevent link's default action
             */
            function change_skin(cls) {
                if (!$("body").hasClass(cls)) {
                    $.each(my_skins, function (i) {
                        $("body").removeClass(my_skins[i]);
                    });

                    $("body").addClass(cls);
                    store('skin', cls);
                    var cssfile = requirejs.s.contexts._.config.config.config.upload.cdnurl + "/assets/css/skins/" + cls + ".css";
                    $('head').append('<link rel="stylesheet" href="' + cssfile + '" type="text/css" />');
                }
                return false;
            }

            /**
             * Store a new settings in the browser
             *
             * @param String name Name of the setting
             * @param String val Value of the setting
             * @returns void
             */
            function store(name, val) {
                if (typeof (Storage) !== "undefined") {
                    localStorage.setItem(name, val);
                } else {
                    window.alert('Please use a modern browser to properly view this template!');
                }
            }

            /**
             * Get a prestored setting
             *
             * @param String name Name of of the setting
             * @returns String The value of the setting | null
             */
            function get(name) {
                if (typeof (Storage) !== "undefined") {
                    return localStorage.getItem(name);
                } else {
                    window.alert('Please use a modern browser to properly view this template!');
                }
            }

            /**
             * Retrieve default settings and apply them to the template
             *
             * @returns void
             */
            function setup() {
                var tmp = get('skin');
                if (tmp && $.inArray(tmp, my_skins))
                    change_skin(tmp);

                // 皮肤切换
                $("[data-skin]").on('click', function (e) {
                    if ($(this).hasClass('knob'))
                        return;
                    e.preventDefault();
                    change_skin($(this).data('skin'));
                });

                // 布局切换
                $("[data-layout]").on('click', function () {
                    change_layout($(this).data('layout'));
                });

                // 切换子菜单显示和菜单小图标的显示
                $("[data-menu]").on('click', function () {
                    if ($(this).data("menu") == 'show-submenu') {
                        $("ul.sidebar-menu").toggleClass("show-submenu");
                    } else {
                        $(".nav-addtabs").toggleClass("disable-top-badge");
                    }
                });

                // 右侧控制栏切换
                $("[data-controlsidebar]").on('click', function () {
                    change_layout($(this).data('controlsidebar'));
                    var slide = !AdminLTE.options.controlSidebarOptions.slide;
                    AdminLTE.options.controlSidebarOptions.slide = slide;
                    if (!slide)
                        $('.control-sidebar').removeClass('control-sidebar-open');
                });

                // 右侧控制栏背景切换
                $("[data-sidebarskin='toggle']").on('click', function () {
                    var sidebar = $(".control-sidebar");
                    if (sidebar.hasClass("control-sidebar-dark")) {
                        sidebar.removeClass("control-sidebar-dark")
                        sidebar.addClass("control-sidebar-light")
                    } else {
                        sidebar.removeClass("control-sidebar-light")
                        sidebar.addClass("control-sidebar-dark")
                    }
                });

                // 菜单栏展开或收起
                $("[data-enable='expandOnHover']").on('click', function () {
                    $(this).attr('disabled', true);
                    AdminLTE.pushMenu.expandOnHover();
                    if (!$('body').hasClass('sidebar-collapse'))
                        $("[data-layout='sidebar-collapse']").click();
                });

                // 重设选项
                if ($('body').hasClass('fixed')) {
                    $("[data-layout='fixed']").attr('checked', 'checked');
                }
                if ($('body').hasClass('layout-boxed')) {
                    $("[data-layout='layout-boxed']").attr('checked', 'checked');
                }
                if ($('body').hasClass('sidebar-collapse')) {
                    $("[data-layout='sidebar-collapse']").attr('checked', 'checked');
                }
                if ($('ul.sidebar-menu').hasClass('show-submenu')) {
                    $("[data-menu='show-submenu']").attr('checked', 'checked');
                }
                if ($('ul.nav-addtabs').hasClass('disable-top-badge')) {
                    $("[data-menu='disable-top-badge']").attr('checked', 'checked');
                }

            }

            $(window).resize();
        },
        login: function () {

            $("#login-form").validator({
                timely: 2, theme: 'yellow_right_effect',
                fields: {
                    username: "required",
                    password: "required",
                },
                valid: function (form) {
                    form.submit();
                }
            });
            $.ajax({
                url: 'ajax/dailybg',
                dataType: 'json',
                success: function (ret) {
                    if (ret.code === 1) {
                        $("body").css("background", "url(" + ret.data.url + ")");
                        $("body").css("background-size", "cover");
                    }
                }
            });
        }
    };

    return Controller;
});