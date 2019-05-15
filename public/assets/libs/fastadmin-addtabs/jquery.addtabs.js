/**
 * http://git.oschina.net/hbbcs/bootStrap-addTabs
 * Created by joe on 2015-12-19.
 * Modified by Karson
 */

(function ($) {

    $.fn.addtabs = function (options) {
        var obj = $(this);
        options = $.extend({
            content: '', //直接指定所有页面TABS内容
            close: true, //是否可以关闭
            monitor: 'body', //监视的区域
            nav: '.nav-addtabs',
            tab: '.tab-addtabs',
            iframeUse: true, //使用iframe还是ajax
            iframeHeight: $(window).height() - 50, //固定TAB中IFRAME高度,根据需要自己修改
            iframeForceRefresh: false, //点击后强制加载对应的iframe
            iframeForceRefreshTable: false, //点击后强制刷新对应的iframe中的table
            callback: function () {
                //关闭后回调函数
            }
        }, options || {});
        var navobj = $(options.nav);
        var tabobj = $(options.tab);
        if (history.pushState) {
            //浏览器前进后退事件
            $(window).on("popstate", function (e) {
                var state = e.originalEvent.state;
                if (state) {
                    $("a[addtabs=" + state.id + "]", options.monitor).data("pushstate", true).trigger("click");
                }
            });
        }
        $(options.monitor).on('click', '[addtabs]', function (e) {
            if ($(this).attr('url').indexOf("javascript:") !== 0) {
                if ($(this).is("a")) {
                    e.preventDefault();
                }
                var id = $(this).attr('addtabs');
                var title = $(this).attr('title') ? $(this).attr('title') : $.trim($(this).text());
                var url = $(this).attr('url');
                var content = options.content ? options.content : $(this).attr('content');
                var ajax = $(this).attr('ajax') === '1' || $(this).attr('ajax') === 'true';
                var state = ({
                    url: url, title: title, id: id, content: content, ajax: ajax
                });

                document.title = title;
                if (history.pushState && !$(this).data("pushstate")) {
                    var pushurl = url.indexOf("ref=addtabs") === -1 ? (url + (url.indexOf("?") > -1 ? "&" : "?") + "ref=addtabs") : url;
                    try {
                        window.history.pushState(state, title, pushurl);
                    } catch (e) {

                    }
                }
                $(this).data("pushstate", null);
                _add.call(this, {
                    id: id,
                    title: $(this).attr('title') ? $(this).attr('title') : $(this).html(),
                    content: content,
                    url: url,
                    ajax: ajax
                });
            }
        });

        navobj.on('click', '.close-tab', function () {
            var id = $(this).prev("a").attr("aria-controls");
            _close(id);
            return false;
        });
        navobj.on('dblclick', 'li[role=presentation]', function () {
            $(this).find(".close-tab").trigger("click");
        });
        navobj.on('click', 'li[role=presentation]', function () {
            $("a[addtabs=" + $("a", this).attr("node-id") + "]").trigger("click");
        });

        $(window).resize(function () {
            if (typeof options.nav === 'object') {
                var siblingsWidth = 0;
                navobj.siblings().each(function () {
                    siblingsWidth += $(this).outerWidth();
                });
                navobj.width(navobj.parent().width() - siblingsWidth);
            } else {
                $("#nav").width($("#header").find("> .navbar").width() - $(".sidebar-toggle").outerWidth() - $(".navbar-custom-menu").outerWidth() - 20);
            }
            _drop();
        });

        var _add = function (opts) {
            var id, tabid, conid, url;
            id = opts.id;
            tabid = 'tab_' + opts.id;
            conid = 'con_' + opts.id;
            url = opts.url;
            url += (opts.url.indexOf("?") > -1 ? "&addtabs=1" : "?addtabs=1");

            var tabitem = $('#' + tabid, navobj);
            var conitem = $('#' + conid, tabobj);

            navobj.find("[role='presentation']").removeClass('active');
            tabobj.find("[role='tabpanel']").removeClass('active');

            //如果TAB不存在，创建一个新的TAB
            if (tabitem.size() === 0) {
                //创建新TAB的title
                tabitem = $('<li role="presentation" id="' + tabid + '"><a href="#' + conid + '" node-id="' + opts.id + '" aria-controls="' + id + '" role="tab" data-toggle="tab">' + opts.title + '</a></li>');
                //是否允许关闭
                if (options.close && $("li", navobj).size() > 0) {
                    tabitem.append(' <i class="close-tab fa fa-remove"></i>');
                }
                if (conitem.size() === 0) {
                    //创建新TAB的内容
                    conitem = $('<div role="tabpanel" class="tab-pane" id="' + conid + '"></div>');
                    //是否指定TAB内容
                    if (opts.content) {
                        conitem.append(opts.content);
                    } else if (options.iframeUse && !opts.ajax) {//没有内容，使用IFRAME打开链接
                        var height = options.iframeHeight;
                        conitem.append('<iframe src="' + url + '" width="100%" height="' + height + '" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling-x="no" scrolling-y="auto" allowtransparency="yes"></iframe></div>');
                    } else {
                        $.get(url, function (data) {
                            conitem.append(data);
                        });
                    }
                    tabobj.append(conitem);
                }
                //加入TABS
                if ($('.tabdrop li', navobj).size() > 0) {
                    $('.tabdrop ul', navobj).append(tabitem);
                } else {
                    navobj.append(tabitem);
                }
            } else {
                //强制刷新iframe
                if (options.iframeForceRefresh) {
                    $("#" + conid + " iframe").attr('src', function (i, val) {
                        return val;
                    });
                } else if (options.iframeForceRefreshTable) {
                    try {
                        //检测iframe中是否存在刷新按钮
                        if ($("#" + conid + " iframe").contents().find(".btn-refresh").size() > 0) {
                            $("#" + conid + " iframe")[0].contentWindow.$(".btn-refresh").trigger("click");
                        }
                    } catch (e) {

                    }
                }
            }
            localStorage.setItem("addtabs", $(this).prop('outerHTML'));
            //激活TAB
            tabitem.addClass('active');
            conitem.addClass("active");
            _drop();
        };

        var _close = function (id) {
            var tabid = 'tab_' + id;
            var conid = 'con_' + id;
            var tabitem = $('#' + tabid, navobj);
            var conitem = $('#' + conid, tabobj);
            //如果关闭的是当前激活的TAB，激活他的前一个TAB
            if (obj.find("li.active").not('.tabdrop').attr('id') === tabid) {
                var prev = tabitem.prev().not(".tabdrop");
                var next = tabitem.next().not(".tabdrop");
                if (prev.size() > 0) {
                    prev.find('a').trigger("click");
                } else if (next.size() > 0) {
                    next.find('a').trigger("click");
                } else {
                    $(">li:not(.tabdrop):last > a", navobj).trigger('click');
                }
            }
            //关闭TAB
            tabitem.remove();
            conitem.remove();
            _drop();
            options.callback();
        };

        var _drop = function () {
            navobj.refreshAddtabs();
        };
    };
    //刷新Addtabs
    $.fn.refreshAddtabs = function () {
        var navobj = $(this);
        var dropdown = $(".tabdrop", navobj);
        if (dropdown.size() === 0) {
            dropdown = $('<li class="dropdown pull-right hide tabdrop"><a class="dropdown-toggle" data-toggle="dropdown" href="javascript:;">' +
                '<i class="glyphicon glyphicon-align-justify"></i>' +
                ' <b class="caret"></b></a><ul class="dropdown-menu"></ul></li>');
            dropdown.prependTo(navobj);
        }

        //检测是否有下拉样式
        if (navobj.parent().is('.tabs-below')) {
            dropdown.addClass('dropup');
        }

        var collection = 0;
        var maxwidth = navobj.width() - 65;

        var liwidth = 0;
        //检查超过一行的标签页
        var litabs = navobj.append(dropdown.find('li')).find('>li').not('.tabdrop');
        var totalwidth = 0;
        litabs.each(function () {
            totalwidth += $(this).outerWidth(true);
        });
        if (navobj.width() < totalwidth) {
            litabs.each(function () {
                liwidth += $(this).outerWidth(true);
                if (liwidth > maxwidth) {
                    dropdown.find('ul').append($(this));
                    collection++;
                }
            });
            if (collection > 0) {
                dropdown.removeClass('hide');
                if (dropdown.find('.active').length === 1) {
                    dropdown.addClass('active');
                } else {
                    dropdown.removeClass('active');
                }
            }
        } else {
            dropdown.addClass('hide');
        }

    };
})(jQuery);
