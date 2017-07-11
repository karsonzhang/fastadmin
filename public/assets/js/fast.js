define(['jquery', 'bootstrap', 'toastr', 'layer', 'lang'], function ($, undefined, Toastr, Layer, Lang) {
    var Fast = {
        config: {
            //toastr默认配置
            toastr: {
                "closeButton": true,
                "debug": false,
                "newestOnTop": false,
                "progressBar": false,
                "positionClass": "toast-top-center",
                "preventDuplicates": false,
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "5000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            }
        },
        api: {
            //发送Ajax请求
            ajax: function (options, success, failure) {
                options = typeof options == 'string' ? {url: options} : options;
                var index = Layer.load();
                options = $.extend({
                    type: "POST",
                    dataType: 'json',
                    success: function (ret) {
                        Layer.close(index);
                        if (ret.hasOwnProperty("code")) {
                            var data = ret.hasOwnProperty("data") && ret.data != "" ? ret.data : null;
                            var msg = ret.hasOwnProperty("msg") && ret.msg != "" ? ret.msg : "";
                            if (ret.code === 1) {
                                if (typeof success == 'function') {
                                    var onAfterResult = success.call(undefined, data);
                                    if (!onAfterResult) {
                                        return false;
                                    }
                                }
                                Toastr.success(msg ? msg : __('Operation completed'));
                            } else {
                                Toastr.error(msg ? msg : __('Operation failed'));
                            }
                        } else {
                            Toastr.error(__('Unknown data format'));
                        }
                    }, error: function () {
                        Layer.close(index);
                        if (typeof failure == 'function') {
                            var onAfterResult = failure.call(undefined, data);
                            if (!onAfterResult) {
                                return false;
                            }
                        }
                        Toastr.error(__('Network error'));
                    }
                }, options);
                $.ajax(options);
            },
            //修复URL
            fixurl: function (url) {
                if (url.substr(0, 1) !== "/") {
                    var r = new RegExp('^(?:[a-z]+:)?//', 'i');
                    if (!r.test(url)) {
                        url = Config.moduleurl + "/" + url;
                    }
                }
                return url;
            },
            //获取修复后可访问的cdn链接
            cdnurl: function (url) {
                return /^(?:[a-z]+:)?\/\//i.test(url) ? url : Config.upload.cdnurl + url;
            },
            //查询Url参数
            query: function (name, url) {
                if (!url) {
                    url = window.location.href;
                }
                name = name.replace(/[\[\]]/g, "\\$&");
                var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                        results = regex.exec(url);
                if (!results)
                    return null;
                if (!results[2])
                    return '';
                return decodeURIComponent(results[2].replace(/\+/g, " "));
            },
            //上传文件
            upload: function (file, callback) {
                var data = new FormData();
                data.append("file", file);
                $.ajax({
                    url: "ajax/upload",
                    data: data,
                    cache: false,
                    contentType: false,
                    processData: false,
                    type: 'POST',
                    dataType: 'json',
                    success: function (ret) {
                        if (ret.hasOwnProperty("code")) {
                            var data = ret.hasOwnProperty("data") && ret.data != "" ? ret.data : null;
                            var msg = ret.hasOwnProperty("msg") && ret.msg != "" ? ret.msg : "";
                            if (ret.code === 1) {
                                if (typeof callback == 'function') {
                                    var onAfterResult = success.call(undefined, data);
                                    if (!onAfterResult) {
                                        return false;
                                    }
                                }
                                if ($('.summernote').size() > 0 && data && typeof data.url !== 'undefined') {
                                    $('.summernote').summernote("insertImage", data.url, 'filename');
                                }
                                Toastr.success(__('Operation completed'));
                            } else {
                                Toastr.error(msg ? msg : __('Operation failed'));
                            }
                        } else {
                            Toastr.error(__('Unknown data format'));
                        }
                    }, error: function () {
                        Toastr.error(__('Network error'));
                    }
                });
            },
            open: function (url, title, options) {
                title = title ? title : "";
                url = Fast.api.fixurl(url);
                url = url + (url.indexOf("?") > -1 ? "&" : "?") + "dialog=1";
                var area = [$(window).width() > 800 ? '800px' : '95%', $(window).height() > 600 ? '600px' : '95%'];
                Layer.open($.extend({
                    type: 2,
                    title: title,
                    shadeClose: true,
                    shade: false,
                    maxmin: true,
                    moveOut: true,
                    area: area,
                    content: url,
                    zIndex: Layer.zIndex,
                    skin: 'layui-layer-noborder',
                    success: function (layero, index) {
                        var that = this;
                        //$(layero).removeClass("layui-layer-border");
                        Layer.setTop(layero);
                        var frame = Layer.getChildFrame('html', index);
                        var layerfooter = frame.find(".layer-footer");
                        Fast.api.layerfooter(layero, index, that);

                        //绑定事件
                        if (layerfooter.size() > 0) {
                            // 监听窗口内的元素及属性变化
                            // Firefox和Chrome早期版本中带有前缀
                            var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
                            // 选择目标节点
                            var target = layerfooter[0];
                            // 创建观察者对象
                            var observer = new MutationObserver(function (mutations) {
                                Fast.api.layerfooter(layero, index, that);
                                mutations.forEach(function (mutation) {
                                });
                            });
                            // 配置观察选项:
                            var config = {attributes: true, childList: true, characterData: true, subtree: true}
                            // 传入目标节点和观察选项
                            observer.observe(target, config);
                            // 随后,你还可以停止观察
                            // observer.disconnect();
                        }
                    }
                }, options ? options : {}));
                return false;
            },
            layerfooter: function (layero, index, that) {
                var frame = Layer.getChildFrame('html', index);
                var layerfooter = frame.find(".layer-footer");
                if (layerfooter.size() > 0) {
                    $(".layui-layer-footer", layero).remove();
                    var footer = $("<div />").addClass('layui-layer-btn layui-layer-footer');
                    footer.html(layerfooter.html());
                    if ($(".row", footer).size() === 0) {
                        $(">", footer).wrapAll("<div class='row'></div>");
                    }
                    footer.insertAfter(layero.find('.layui-layer-content'));
                }
                var heg = frame.outerHeight();
                var titHeight = layero.find('.layui-layer-title').outerHeight() || 0;
                var btnHeight = layero.find('.layui-layer-btn').outerHeight() || 0;

                var oldheg = heg + titHeight + btnHeight;
                var maxheg = $(window).height() < 600 ? $(window).height() : 600;
                if (frame.outerWidth() < 768 || that.area[0].indexOf("%") > -1) {
                    maxheg = $(window).height();
                }
                // 如果有.layer-footer或窗口小于600则重新排
                if (layerfooter.size() > 0 || oldheg < maxheg || that.area[0].indexOf("%") > -1) {
                    var footerHeight = layero.find('.layui-layer-footer').outerHeight() || 0;
                    footerHeight = 0;
                    if (oldheg >= maxheg) {
                        heg = Math.min(maxheg, oldheg) - titHeight - btnHeight - footerHeight;
                    }
                    layero.css({height: heg + titHeight + btnHeight + footerHeight});
                    layero.find("iframe").css({height: heg});
                }
                if (layerfooter.size() > 0) {
                    footer.on("click", ".btn", function () {
                        if ($(this).hasClass("disabled") || $(this).parent().hasClass("disabled")) {
                            return;
                        }
                        $(".btn:eq(" + $(this).index() + ")", layerfooter).trigger("click");
                    });
                }
            },
            success: function (options, callback) {
                var type = typeof options === 'function';
                if (type) {
                    callback = options;
                }
                return Layer.msg(__('Operation completed'), $.extend({
                    offset: 0, icon: 1
                }, type ? {} : options), callback);
            },
            error: function (options, callback) {
                var type = typeof options === 'function';
                if (type) {
                    callback = options;
                }
                return Layer.msg(__('Operation failed'), $.extend({
                    offset: 0, icon: 2
                }, type ? {} : options), callback);
            },
            toastr: Toastr,
            layer: Layer
        },
        lang: function () {
            var args = arguments,
                    string = args[0],
                    i = 1;
            string = string.toLowerCase();
            //string = typeof Lang[string] != 'undefined' ? Lang[string] : string;
            if (typeof Lang[string] != 'undefined') {
                if (typeof Lang[string] == 'object')
                    return Lang[string];
                string = Lang[string];
            } else if (string.indexOf('.') !== -1 && false) {
                var arr = string.split('.');
                var current = Lang[arr[0]];
                for (var i = 1; i < arr.length; i++) {
                    current = typeof current[arr[i]] != 'undefined' ? current[arr[i]] : '';
                    if (typeof current != 'object')
                        break;
                }
                if (typeof current == 'object')
                    return current;
                string = current;
            } else {
                string = args[0];
            }
            return string.replace(/%((%)|s|d)/g, function (m) {
                // m is the matched format, e.g. %s, %d
                var val = null;
                if (m[2]) {
                    val = m[2];
                } else {
                    val = args[i];
                    // A switch statement so that the formatter can be extended. Default is %s
                    switch (m) {
                        case '%d':
                            val = parseFloat(val);
                            if (isNaN(val)) {
                                val = 0;
                            }
                            break;
                    }
                    i++;
                }
                return val;
            });
        },
        init: function () {
            // 对相对地址进行处理
            $.ajaxSetup({
                beforeSend: function (xhr, setting) {
                    setting.url = Fast.api.fixurl(setting.url);
                }
            });
            // 绑定ESC关闭窗口事件
            $(window).keyup(function (e) {
                if (e.keyCode == 27) {
                    if ($(".layui-layer").size() > 0) {
                        var index = 0;
                        $(".layui-layer").each(function () {
                            index = Math.max(index, parseInt($(this).attr("times")));
                        });
                        if (index) {
                            Layer.close(index);
                        }
                    }
                }
            });

            //公共代码
            //配置Toastr的参数
            Toastr.options = Fast.config.toastr;
        }
    };
    //将Layer暴露到全局中去
    window.Layer = Layer;
    //将Toastr暴露到全局中去
    window.Toastr = Toastr;
    //将语言方法暴露到全局中去
    window.__ = Fast.lang;
    //将Fast渲染至全局
    window.Fast = Fast;

    //默认初始化执行的代码
    Fast.init();
    return Fast;
});
