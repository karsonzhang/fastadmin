define(['jquery', 'bootstrap', 'plupload', 'template'], function ($, undefined, Plupload, Template) {
    var Upload = {
        list: {},
        config: {
            container: document.body,
            classname: '.plupload:not([initialized])',
            previewtpl: '<li class="col-xs-3"><a href="<%=fullurl%>" data-url="<%=url%>" target="_blank" class="thumbnail"><img src="<%=fullurl%>" class="img-responsive"></a><a href="javascript:;" class="btn btn-danger btn-xs btn-trash"><i class="fa fa-trash"></i></a></li>',
        },
        events: {
            //上传成功的回调
            onUploadSuccess: function (ret, onUploadSuccess, button) {
                var data = typeof ret.data !== 'undefined' ? ret.data : null;
                //上传成功后回调
                if (button) {
                    //如果有文本框则填充
                    var input_id = $(button).data("input-id") ? $(button).data("input-id") : "";
                    if (input_id) {
                        var urlArr = [];
                        var inputObj = $("#" + input_id);
                        if ($(button).data("multiple") && inputObj.val() !== "") {
                            urlArr.push(inputObj.val());
                        }
                        urlArr.push(data.url);
                        inputObj.val(urlArr.join(",")).trigger("change");
                    }
                    //如果有回调函数
                    var onDomUploadSuccess = $(button).data("upload-success");
                    if (onDomUploadSuccess) {
                        if (typeof onDomUploadSuccess !== 'function' && typeof Upload.api.custom[onDomUploadSuccess] === 'function') {
                            onDomUploadSuccess = Upload.api.custom[onDomUploadSuccess];
                        }
                        if (typeof onDomUploadSuccess === 'function') {
                            var result = onDomUploadSuccess.call(button, data, ret);
                            if (result === false)
                                return;
                        }
                    }
                }

                if (typeof onUploadSuccess === 'function') {
                    var result = onUploadSuccess.call(button, data, ret);
                    if (result === false)
                        return;
                }
            },
            //上传错误的回调
            onUploadError: function (ret, onUploadError, button) {
                var data = typeof ret.data !== 'undefined' ? ret.data : null;
                if (button) {
                    var onDomUploadError = $(button).data("upload-error");
                    if (onDomUploadError) {
                        if (typeof onDomUploadError !== 'function' && typeof Upload.api.custom[onDomUploadError] === 'function') {
                            onDomUploadError = Upload.api.custom[onDomUploadError];
                        }
                        if (typeof onDomUploadError === 'function') {
                            var result = onDomUploadError.call(button, data, ret);
                            if (result === false)
                                return;
                        }
                    }
                }

                if (typeof onUploadError === 'function') {
                    var result = onUploadError.call(button, data, ret);
                    if (result === false) {
                        return;
                    }
                }
                Toastr.error(ret.msg + "(code:" + ret.code + ")");
            },
            //服务器响应数据后
            onUploadResponse: function (response) {
                try {
                    var ret = typeof response === 'object' ? response : JSON.parse(response);
                    if (!ret.hasOwnProperty('code')) {
                        $.extend(ret, {code: -2, msg: response, data: null});
                    }
                } catch (e) {
                    var ret = {code: -1, msg: e.message, data: null};
                }
                return ret;
            }
        },
        api: {
            //Plupload上传
            plupload: function (element, onUploadSuccess, onUploadError) {
                element = typeof element === 'undefined' ? Upload.config.classname : element;
                $(element, Upload.config.container).each(function () {
                    $(this).attr("initialized", true);
                    var that = this;
                    var id = $(this).prop("id");
                    var url = $(this).data("url");
                    var maxsize = $(this).data("maxsize");
                    var mimetype = $(this).data("mimetype");
                    var multipart = $(this).data("multipart");
                    var multiple = $(this).data("multiple");

                    //填充ID
                    var input_id = $(that).data("input-id") ? $(that).data("input-id") : "";
                    //预览ID
                    var preview_id = $(that).data("preview-id") ? $(that).data("preview-id") : "";

                    //上传URL
                    url = url ? url : Config.upload.uploadurl;
                    url = Fast.api.fixurl(url);
                    //最大可上传
                    maxsize = typeof maxsize !== "undefined" ? maxsize : Config.upload.maxsize;
                    //文件类型
                    mimetype = typeof mimetype !== "undefined" ? mimetype : Config.upload.mimetype;
                    //请求的表单参数
                    multipart = typeof multipart !== "undefined" ? multipart : Config.upload.multipart;
                    //是否支持批量上传
                    multiple = typeof multiple !== "undefined" ? multiple : Config.upload.multiple;
                    //生成Plupload实例
                    Upload.list[id] = new Plupload.Uploader({
                        runtimes: 'html5,flash,silverlight,html4',
                        multi_selection: multiple, //是否允许多选批量上传
                        browse_button: id, // 浏览按钮的ID
                        container: $(this).parent().get(0), //取按钮的上级元素
                        flash_swf_url: '/assets/libs/plupload/js/Moxie.swf',
                        silverlight_xap_url: '/assets/libs/plupload/js/Moxie.xap',
                        filters: {
                            max_file_size: maxsize,
                            mime_types: mimetype
                        },
                        url: url,
                        multipart_params: multipart,
                        init: {
                            PostInit: function () {

                            },
                            FilesAdded: function (up, files) {
                                var button = up.settings.button;
                                $(button).data("bakup-html", $(button).html());
                                //添加后立即上传
                                setTimeout(function () {
                                    up.start();
                                }, 1);
                            },
                            UploadProgress: function (up, file) {
                                var button = up.settings.button;
                                //这里可以改成其它的表现形式
                                //document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
                                $(button).prop("disabled", true).html("<i class='fa fa-upload'></i> " + __('Upload') + file.percent + "%");
                            },
                            FileUploaded: function (up, file, info) {
                                var button = up.settings.button;
                                //还原按钮文字及状态
                                $(button).prop("disabled", false).html($(button).data("bakup-html"));
                                var ret = Upload.events.onUploadResponse(info.response);
                                if (ret.code === 1) {
                                    Upload.events.onUploadSuccess(ret, onUploadSuccess, button);
                                } else {
                                    Upload.events.onUploadError(ret, onUploadError, button);
                                }
                            },
                            Error: function (up, err) {
                                var button = up.settings.button;
                                $(button).prop("disabled", false).html($(button).data("bakup-html"));
                                var ret = {code: err.code, msg: err.message, data: null};
                                Upload.events.onUploadError(ret, onUploadError, button);
                            }
                        },
                        onUploadSuccess: onUploadSuccess,
                        onUploadError: onUploadError,
                        button: that
                    });

                    //拖动排序
                    if (preview_id && multiple) {
                        require(['dragsort'], function () {
                            $("#" + preview_id).dragsort({
                                dragSelector: "li",
                                dragEnd: function () {
                                    $("#" + preview_id).trigger("fa.preview.change");
                                },
                                placeHolderTemplate: '<li class="col-xs-3"></li>'
                            });
                        });
                    }
                    if (preview_id && input_id) {
                        $(document.body).on("keyup change", "#" + input_id, function () {
                            var inputStr = $("#" + input_id).val();
                            var inputArr = inputStr.split(/\,/);
                            $("#" + preview_id).empty();
                            var tpl = $("#" + preview_id).data("template") ? $("#" + preview_id).data("template") : "";
                            $.each(inputArr, function (i, j) {
                                if (!j) {
                                    return true;
                                }
                                var data = {url: j, fullurl: Fast.api.cdnurl(j), data: $(that).data()};
                                var html = tpl ? Template(tpl, data) : Template.render(Upload.config.previewtpl, data);
                                $("#" + preview_id).append(html);
                            });
                        });
                        $("#" + input_id).trigger("keyup");
                    }
                    if (preview_id) {
                        // 监听事件
                        $(document.body).on("fa.preview.change", "#" + preview_id, function () {
                            var urlArr = new Array();
                            $("#" + preview_id + " [data-url]").each(function (i, j) {
                                urlArr.push($(this).data("url"));
                            });
                            if (input_id) {
                                $("#" + input_id).val(urlArr.join(","));
                            }
                        });
                        // 移除按钮事件
                        $(document.body).on("click", "#" + preview_id + " .btn-trash", function () {
                            $(this).closest("li").remove();
                            $("#" + preview_id).trigger("fa.preview.change");
                        });
                    }
                    Upload.list[id].init();
                });
            },
            // AJAX异步上传
            send: function (file, onUploadSuccess, onUploadError) {
                var data = new FormData();
                data.append("file", file);
                $.each(Config.upload.multipart, function (k, v) {
                    data.append(k, v);
                });
                $.ajax({
                    url: Config.upload.uploadurl,
                    data: data,
                    cache: false,
                    contentType: false,
                    processData: false,
                    type: 'POST',
                    success: function (ret) {
                        ret = Upload.events.onUploadResponse(ret);
                        if (ret.code === 1) {
                            Upload.events.onUploadSuccess(ret, onUploadSuccess);
                        } else {
                            Upload.events.onUploadError(ret, onUploadError);
                        }
                    }, error: function (e) {
                        var ret = {code: 500, msg: e.message, data: null};
                        Upload.events.onUploadError(ret, onUploadError);
                    }
                });
            },
            custom: {
                //自定义上传完成回调
                afteruploadcallback: function (response) {
                    console.log(this, response);
                    alert("Custom Callback,Response URL:" + response.url);
                },
            },
        }
    };

    return Upload;
});