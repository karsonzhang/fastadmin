define(['jquery', 'bootstrap', 'backend', 'addtabs', 'adminlte', 'form'], function ($, undefined, Backend, undefined, AdminLTE, Form) {
    var Controller = {
        index: function () {
            //双击重新加载页面
            $(document).on("dblclick", ".sidebar-menu li > a", function (e) {
                $("#con_" + $(this).attr("addtabs") + " iframe").attr('src', function (i, val) {
                    return val;
                });
                e.stopPropagation();
            });

            //修复在移除窗口时下拉框不隐藏的BUG
            $(window).on("blur", function () {
                $("[data-toggle='dropdown']").parent().removeClass("open");
                if ($("body").hasClass("sidebar-open")) {
                    $(".sidebar-toggle").trigger("click");
                }
            });

            //快捷搜索
            $(".menuresult").width($("form.sidebar-form > .input-group").width());
            var searchResult = $(".menuresult");
            $("form.sidebar-form").on("blur", "input[name=q]", function () {
                searchResult.addClass("hide");
            }).on("focus", "input[name=q]", function () {
                if ($("a", searchResult).size() > 0) {
                    searchResult.removeClass("hide");
                }
            }).on("keyup", "input[name=q]", function () {
                searchResult.html('');
                var val = $(this).val();
                var html = [];
                if (val != '') {
                    $("ul.sidebar-menu li a[addtabs]:not([href^='javascript:;'])").each(function () {
                        if ($("span:first", this).text().indexOf(val) > -1 || $(this).attr("py").indexOf(val) > -1 || $(this).attr("pinyin").indexOf(val) > -1) {
                            html.push('<a data-url="' + $(this).attr("href") + '" href="javascript:;">' + $("span:first", this).text() + '</a>');
                            if (html.length >= 100) {
                                return false;
                            }
                        }
                    });
                }
                $(searchResult).append(html.join(""));
                if (html.length > 0) {
                    searchResult.removeClass("hide");
                } else {
                    searchResult.addClass("hide");
                }
            });
            //快捷搜索点击事件
            $("form.sidebar-form").on('mousedown click', '.menuresult a[data-url]', function () {
                Backend.api.addtabs($(this).data("url"));
            });

            //切换左侧sidebar显示隐藏
            $(document).on("click fa.event.toggleitem", ".sidebar-menu li > a", function (e) {
                var nextul = $(this).next("ul");
                if (nextul.length == 0 && (!$(this).parent("li").hasClass("treeview") || ($("body").hasClass("multiplenav") && $(this).parent().parent().hasClass("sidebar-menu")))) {
                    $(".sidebar-menu li").removeClass("active");
                }
                //当外部触发隐藏的a时,触发父辈a的事件
                if (!$(this).closest("ul").is(":visible")) {
                    //如果不需要左侧的菜单栏联动可以注释下面一行即可
                    $(this).closest("ul").prev().trigger("click");
                }

                var visible = nextul.is(":visible");
                if (!visible) {
                    $(this).parents("li").addClass("active");
                } else {
                }
                e.stopPropagation();
            });

            //清除缓存
            $(document).on('click', "ul.wipecache li a", function () {
                $.ajax({
                    url: 'ajax/wipecache',
                    dataType: 'json',
                    data: {type: $(this).data("type")},
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

            var multiplenav = $("#secondnav").size() > 0 ? true : false;
            var firstnav = $("#firstnav .nav-addtabs");
            var nav = multiplenav ? $("#secondnav .nav-addtabs") : firstnav;

            //刷新菜单事件
            $(document).on('refresh', '.sidebar-menu', function () {
                Fast.api.ajax({
                    url: 'index/index',
                    data: {action: 'refreshmenu'}
                }, function (data) {
                    $(".sidebar-menu li:not([data-rel='external'])").remove();
                    $(".sidebar-menu").prepend(data.menulist);
                    if (multiplenav) {
                        firstnav.html(data.navlist);
                    }
                    $("li[role='presentation'].active a", nav).trigger('click');
                    return false;
                }, function () {
                    return false;
                });
            });

            if (multiplenav) {
                firstnav.css("overflow", "inherit");
                //一级菜单自适应
                $(window).resize(function () {
                    var siblingsWidth = 0;
                    firstnav.siblings().each(function () {
                        siblingsWidth += $(this).outerWidth();
                    });
                    firstnav.width(firstnav.parent().width() - siblingsWidth);
                    firstnav.refreshAddtabs();
                });

                //点击顶部第一级菜单栏
                firstnav.on("click", "li a", function () {
                    $("li", firstnav).removeClass("active");
                    $(this).closest("li").addClass("active");
                    $(".sidebar-menu > li[pid]").addClass("hidden");
                    if ($(this).attr("url") == "javascript:;") {
                        var sonlist = $(".sidebar-menu > li[pid='" + $(this).attr("addtabs") + "']");
                        sonlist.removeClass("hidden");
                        var sidenav;
                        var last_id = $(this).attr("last-id");
                        if (last_id) {
                            sidenav = $(".sidebar-menu > li[pid='" + $(this).attr("addtabs") + "'] a[addtabs='" + last_id + "']");
                        } else {
                            sidenav = $(".sidebar-menu > li[pid='" + $(this).attr("addtabs") + "']:first > a");
                        }
                        if (sidenav) {
                            sidenav.attr("href") != "javascript:;" && sidenav.trigger('click');
                        }
                    } else {

                    }
                });

                var mobilenav = $(".mobilenav");
                $("#firstnav .nav-addtabs li a").each(function () {
                    mobilenav.append($(this).clone().addClass("btn btn-app"));
                });

                //点击移动端一级菜单
                mobilenav.on("click", "a", function () {
                    $("a", mobilenav).removeClass("active");
                    $(this).addClass("active");
                    $(".sidebar-menu > li[pid]").addClass("hidden");
                    if ($(this).attr("url") == "javascript:;") {
                        var sonlist = $(".sidebar-menu > li[pid='" + $(this).attr("addtabs") + "']");
                        sonlist.removeClass("hidden");
                    }
                });

                //点击左侧菜单栏
                $(document).on('click', '.sidebar-menu li a[addtabs]', function (e) {
                    var parents = $(this).parentsUntil("ul.sidebar-menu", "li");
                    var top = parents[parents.length - 1];
                    var pid = $(top).attr("pid");
                    if (pid) {
                        var obj = $("li a[addtabs=" + pid + "]", firstnav);
                        var last_id = obj.attr("last-id");
                        if (!last_id || last_id != pid) {
                            obj.attr("last-id", $(this).attr("addtabs"));
                            if (!obj.closest("li").hasClass("active")) {
                                obj.trigger("click");
                            }
                        }
                        mobilenav.find("a").removeClass("active");
                        mobilenav.find("a[addtabs='" + pid + "']").addClass("active");
                    }
                });
            }

            //这一行需要放在点击左侧链接事件之前
            var addtabs = Config.referer ? localStorage.getItem("addtabs") : null;

            //绑定tabs事件,如果需要点击强制刷新iframe,则请将iframeForceRefresh置为true,iframeForceRefreshTable只强制刷新表格
            nav.addtabs({iframeHeight: "100%", iframeForceRefresh: false, iframeForceRefreshTable: true, nav: nav});

            if ($("ul.sidebar-menu li.active a").size() > 0) {
                $("ul.sidebar-menu li.active a").trigger("click");
            } else {
                if (multiplenav) {
                    $("li:first > a", firstnav).trigger("click");
                } else {
                    $("ul.sidebar-menu li a[url!='javascript:;']:first").trigger("click");
                }
            }

            //如果是刷新操作则直接返回刷新前的页面
            if (Config.referer) {
                if (Config.referer === $(addtabs).attr("url")) {
                    var active = $("ul.sidebar-menu li a[addtabs=" + $(addtabs).attr("addtabs") + "]");
                    if (multiplenav && active.size() == 0) {
                        active = $("ul li a[addtabs='" + $(addtabs).attr("addtabs") + "']");
                    }
                    if (active.size() > 0) {
                        active.trigger("click");
                    } else {
                        $(addtabs).appendTo(document.body).addClass("hide").trigger("click");
                    }
                } else {
                    //刷新页面后跳到到刷新前的页面
                    Backend.api.addtabs(Config.referer);
                }
            }

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
                "skin-green-light",
                "skin-black-blue",
                "skin-black-purple",
                "skin-black-red",
                "skin-black-green",
                "skin-black-yellow",
                "skin-black-pink",
            ];
            setup();

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

            function change_skin(cls) {
                if (!$("body").hasClass(cls)) {
                    $("body").removeClass(my_skins.join(' ')).addClass(cls);
                    localStorage.setItem('skin', cls);
                    var cssfile = Config.site.cdnurl + "/assets/css/skins/" + cls + ".css";
                    $('head').append('<link rel="stylesheet" href="' + cssfile + '" type="text/css" />');
                }
                return false;
            }

            function setup() {
                var tmp = localStorage.getItem('skin');
                if (tmp && $.inArray(tmp, my_skins) != -1)
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
                        nav.toggleClass("disable-top-badge");
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
                if (nav.hasClass('disable-top-badge')) {
                    $("[data-menu='disable-top-badge']").attr('checked', 'checked');
                }

            }

            $(window).resize();

        },
        login: function () {
            var lastlogin = localStorage.getItem("lastlogin");
            if (lastlogin) {
                lastlogin = JSON.parse(lastlogin);
                $("#profile-img").attr("src", Backend.api.cdnurl(lastlogin.avatar));
                $("#profile-name").val(lastlogin.username);
            }

            //让错误提示框居中
            Fast.config.toastr.positionClass = "toast-top-center";

            //本地验证未通过时提示
            $("#login-form").data("validator-options", {
                invalid: function (form, errors) {
                    $.each(errors, function (i, j) {
                        Toastr.error(j);
                    });
                },
                target: '#errtips'
            });

            //为表单绑定事件
            Form.api.bindevent($("#login-form"), function (data) {
                localStorage.setItem("lastlogin", JSON.stringify({
                    id: data.id,
                    username: data.username,
                    avatar: data.avatar
                }));
                location.href = Backend.api.fixurl(data.url);
            }, function (data) {
                $("input[name=captcha]").next(".input-group-addon").find("img").trigger("click");
            });
        }
    };

    return Controller;
});
