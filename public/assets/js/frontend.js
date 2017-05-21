define(['jquery', 'bootstrap', 'toastr', 'layer', 'lang'], function ($, undefined, Toastr, Layer, Lang) {
    var Frontend = {
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
            ajax: function (options, success, failure) {
                var index = Frontend.api.layer.load();
                options = $.extend({
                    type: "POST",
                    dataType: 'json',
                    success: function (ret) {
                        Frontend.api.layer.close(index);
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
                        Frontend.api.layer.close(index);
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
                title = title == undefined ? "" : title;
                url = Frontend.api.fixurl(url);
                url = url + (url.indexOf("?") > -1 ? "&" : "?") + "dialog=1";
                var area;
                if ($(window).width() < 800) {
                    area = ["95%", "95%"];
                } else {
                    area = ['800px', '600px'];
                }
                Frontend.api.layer.open($.extend({
                    type: 2,
                    title: title,
                    shadeClose: true,
                    shade: false,
                    maxmin: true,
                    moveOut: true,
                    area: area,
                    content: url,
                    zIndex: Frontend.api.layer.zIndex,
                    skin: 'layui-layer-noborder',
                    success: function (layero, index) {
                        //$(layero).removeClass("layui-layer-border");
                        Frontend.api.layer.setTop(layero);
                        var frame = Frontend.api.layer.getChildFrame('html', index);
                        var layerfooter = frame.find(".layer-footer");
                        if (layerfooter.size() > 0) {
                            var footer = $("<div />").addClass('layui-layer-footer row');
                            layerfooter.clone(true).removeClass("hidden").appendTo(footer);
                            footer.appendTo(layero.find('.layui-layer-content'));
                        }
                        var heg = frame.outerHeight();
                        var titHeight = layero.find('.layui-layer-title').outerHeight() || 0;
                        var btnHeight = layero.find('.layui-layer-btn').outerHeight() || 0;

                        var oldheg = heg + titHeight + btnHeight;
                        // 如果有.layer-footer或窗口小于600则重新排
                        if (layerfooter.size() > 0 || oldheg < 600) {
                            var footerHeight = layero.find('.layui-layer-footer').outerHeight() || 0;
                            if (oldheg >= 600) {
                                heg = Math.min(600, oldheg) - titHeight - btnHeight - footerHeight;
                            }
                            layero.css({height: heg + titHeight + btnHeight + footerHeight});
                            layero.find("iframe").css({height: heg});
                        }
                        //绑定事件
                        if (layerfooter.size() > 0) {
                            footer.on("click", ".btn", function () {
                                $(".btn:eq(" + $(this).index() + ")", layerfooter).trigger("click");
                            });
                        }
                    }
                }, options ? options : {}));
                return false;
            },
            success: function (options, callback) {
                var type = typeof options === 'function';
                if (type) {
                    callback = options;
                }
                return Frontend.api.layer.msg(__('Operation completed'), $.extend({
                    offset: 0, icon: 1
                }, type ? {} : options), callback);
            },
            error: function (options, callback) {
                var type = typeof options === 'function';
                if (type) {
                    callback = options;
                }
                return Frontend.api.layer.msg(__('Operation failed'), $.extend({
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
            } else if (string.indexOf('.') !== -1) {
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
            //公共代码
            //配置Toastr的参数
            Toastr.options = Frontend.config.toastr;
            
        }
    };
    //将Layer暴露到全局中去
    window.Layer = Layer;
    //将Toastr暴露到全局中去
    window.Toastr = Toastr;
    //将语言方法暴露到全局中去
    window.__ = Frontend.lang;
    //将Frontend渲染至全局,以便于在子框架中调用
    window.Frontend = Frontend;
    
    Frontend.init();
    return Frontend;
});
