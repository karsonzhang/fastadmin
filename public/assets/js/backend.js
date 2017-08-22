define(['fast', 'moment'], function (Fast, Moment) {
    var Backend = {
        api: {
            sidebar: function (params) {
                colorArr = ['red', 'green', 'yellow', 'blue', 'teal', 'orange', 'purple'];
                $colorNums = colorArr.length;
                badgeList = {};
                $.each(params, function (k, v) {
                    $url = Fast.api.fixurl(k);

                    if ($.isArray(v))
                    {
                        $nums = typeof v[0] !== 'undefined' ? v[0] : 0;
                        $color = typeof v[1] !== 'undefined' ? v[1] : colorArr[(!isNaN($nums) ? $nums : $nums.length) % $colorNums];
                        $class = typeof v[2] !== 'undefined' ? v[2] : 'label';
                    } else
                    {
                        $nums = v;
                        $color = colorArr[(!isNaN($nums) ? $nums : $nums.length) % $colorNums];
                        $class = 'label';
                    }
                    //必须nums大于0才显示
                    badgeList[$url] = $nums > 0 ? '<small class="' + $class + ' pull-right bg-' + $color + '">' + $nums + '</small>' : '';
                });
                $.each(badgeList, function (k, v) {
                    var anchor = top.window.$("li a[addtabs][url='" + k + "']");
                    if (anchor) {
                        top.window.$(".pull-right-container", anchor).html(v);
                        top.window.$(".nav-addtabs li a[node-id='" + anchor.attr("addtabs") + "'] .pull-right-container").html(v);
                    }
                });
            },
            addtabs: function (url, title, icon) {
                var dom = "a[url='{url}']"
                var leftlink = top.window.$(dom.replace(/\{url\}/, url));
                if (leftlink.size() > 0) {
                    leftlink.trigger("click");
                } else {
                    url = Fast.api.fixurl(url);
                    leftlink = top.window.$(dom.replace(/\{url\}/, url));
                    if (leftlink.size() > 0) {
                        var event = leftlink.parent().hasClass("active") ? "dblclick" : "click";
                        leftlink.trigger(event);
                    } else {
                        var baseurl = url.substr(0, url.indexOf("?") > -1 ? url.indexOf("?") : url.length);
                        leftlink = top.window.$(dom.replace(/\{url\}/, baseurl));
                        //能找到相对地址
                        if (leftlink.size() > 0) {
                            icon = typeof icon !== 'undefined' ? icon : leftlink.find("i").attr("class");
                            title = typeof title !== 'undefined' ? title : leftlink.find("span:first").text();
                            leftlink.trigger("fa.event.toggleitem");
                        }
                        var navnode = $(".nav-tabs ul li a[node-url='" + url + "']");
                        if (navnode.size() > 0) {
                            navnode.trigger("click");
                        } else {
                            //追加新的tab
                            var id = Math.floor(new Date().valueOf() * Math.random());
                            icon = typeof icon !== 'undefined' ? icon : 'fa fa-circle-o';
                            title = typeof title !== 'undefined' ? title : '';
                            top.window.$("<a />").append('<i class="' + icon + '"></i> <span>' + title + '</span>').prop("href", url).attr({url: url, addtabs: id}).addClass("hide").appendTo(top.window.document.body).trigger("click");
                        }
                    }
                }
            },
            replaceids: function (elem, url) {
                //如果有需要替换ids的
                if (url.indexOf("{ids}") > -1) {
                    var ids = 0;
                    var tableId = $(elem).data("table-id");
                    if (tableId && $(tableId).size() > 0 && $(tableId).data("bootstrap.table")) {
                        var Table = require("table");
                        ids = Table.api.selectedids($(tableId)).join(",");
                    }
                    url = url.replace(/\{ids\}/g, ids);
                }
                return url;
            }
        },
        init: function () {
            //公共代码
            //添加ios-fix兼容iOS下的iframe
            if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
                $("html").addClass("ios-fix");
            }
            //配置Toastr的参数
            Toastr.options.positionClass = Config.controllername === 'index' ? "toast-top-right-index" : "toast-top-right";
            //点击包含.btn-dialog的元素时弹出dialog
            $(document).on('click', '.btn-dialog,.dialogit', function (e) {
                e.preventDefault();
                var options = $(this).data() || {};
                Backend.api.open(Backend.api.replaceids(this, $(this).attr('href')), $(this).attr('title'), options);
            });
            //点击包含.btn-addtabs的元素时新增选项卡
            $(document).on('click', '.btn-addtabs,.addtabsit', function (e) {
                e.preventDefault();
                Backend.api.addtabs(Backend.api.replaceids(this, $(this).attr('href')), $(this).attr("title"));
            });
            //点击包含.btn-ajax的元素时发送Ajax请求
            $(document).on('click', '.btn-ajax,.ajaxit', function (e) {
                e.preventDefault();
                var options = $(this).data();
                if (typeof options.url === 'undefined' && $(this).attr("href")) {
                    options.url = $(this).attr("href");
                }
                options.url = Backend.api.replaceids(this, options.url);
                Backend.api.ajax(options);
            });
            //修复含有fixed-footer类的body边距
            if ($(".fixed-footer").size() > 0) {
                $(document.body).css("padding-bottom", $(".fixed-footer").height());
            }
            //修复不在iframe时layer-footer隐藏的问题
            if ($(".layer-footer").size() > 0 && self === top) {
                $(".layer-footer").show();
            }
        }
    };
    Backend.api = $.extend(Fast.api, Backend.api);
    //将Moment渲染至全局,以便于在子框架中调用
    window.Moment = Moment;
    //将Backend渲染至全局,以便于在子框架中调用
    window.Backend = Backend;

    Backend.init();
    return Backend;
});