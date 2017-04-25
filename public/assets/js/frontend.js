define(['jquery', 'bootstrap', 'toastr', 'layer', 'config'], function ($, undefined, Toastr, Layer, Config) {
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
                    success: function (data) {
                        Frontend.api.layer.close(index);
                        if (data.hasOwnProperty("code")) {
                            var content = data.hasOwnProperty("content") && data.content != "" ? data.content : "";
                            if (data.code == 0) {
                                if (typeof success == 'function') {
                                    var onAfterResult = success.call(undefined, content);
                                    if (!onAfterResult) {
                                        return false;
                                    }
                                }
                                Toastr.success(content ? content : __('Operation completed'));
                            } else {
                                Toastr.error(content ? content : __('Operation failed'));
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
                        url = (Config.moduleurl) + "/" + url;
                    }
                }
                return url;
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
                    success: function (data) {
                        if (data.hasOwnProperty("code")) {
                            var content = data.hasOwnProperty("content") && data.content != "" ? data.content : "";
                            if (data.code == 0) {
                                $('.summernote').summernote("insertImage", data.content, 'filename');
                                Toastr.success(__('Operation completed'));
                            } else {
                                Toastr.error(content ? content : __('Operation failed'));
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
                }, type ? {} : options));
            },
            error: function (options, callback) {
                var type = typeof options === 'function';
                if (type) {
                    callback = options;
                }
                return Frontend.api.layer.msg(__('Operation failed'), $.extend({
                    offset: 0, icon: 2
                }, type ? {} : options));
            },
            toastr: Toastr,
            layer: Layer
        },
        lang: function () {
            var args = arguments,
                    string = args[0],
                    i = 1;
            string = Lang[string] != undefined ? Lang[string] : string;
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
        }
    };
    //将Layer暴露到全局中去
    window.Layer = Layer;
    //将Toastr暴露到全局中去
    window.Toastr = Toastr;
    //将语言方法暴露到全局中去
    window.__ = Frontend.lang;
    //Toastr定义
    Toastr.options = Frontend.config.toastr;
    return Frontend;
});