define(['jquery', 'bootstrap', 'plupload', 'template'], function ($, undefined, Plupload, Template) {
    var Upload = {
        list: {},
        config: {
            container: document.body,
            classname: '.plupload:not([initialized])',
            previewtpl: '<li class="col-xs-3"><a href="<%=fullurl%>" data-url="<%=url%>" target="_blank" class="thumbnail"><img src="<%=fullurl%>" onerror="this.src=\'https://tool.fastadmin.net/icon/\'+\'<%=fullurl%>\'.split(\'.\').pop()+\'.png\';this.onerror=null;" class="img-responsive"></a><a href="javascript:;" class="btn btn-danger btn-xs btn-trash"><i class="fa fa-trash"></i></a></li>',
        },
        events: {
            //初始化完成
            onPostInit: function (up) {

            },
            //文件添加成功后
            onFileAdded: function (up, files) {
                var button = up.settings.button;
                $(button).data("bakup-html", $(button).html());
                var maxcount = $(button).data("maxcount");
                var input_id = $(button).data("input-id") ? $(button).data("input-id") : "";
                maxcount = typeof maxcount !== "undefined" ? maxcount : 0;
                if (maxcount > 0 && input_id) {
                    var inputObj = $("#" + input_id);
                    if (inputObj.size() > 0) {
                        var value = $.trim(inputObj.val());
                        var nums = value === '' ? 0 : value.split(/\,/).length;
                        var remains = maxcount - nums;
                        if (files.length > remains) {
                            for (var i = 0; i < files.length; i++) {
                                up.removeFile(files[i]);
                            }
                            Toastr.error(__('You can upload up to %d file%s', remains));
                            return false;
                        }
                    }
                }
                //添加后立即上传
                setTimeout(function () {
                    up.start();
                }, 1);
            },
            //上传进行中的回调
            onUploadProgress: function (up, file) {

            },
            //上传之前的回调
            onBeforeUpload: function (up, file) {

            },
            //上传成功的回调
            onUploadSuccess: function (up, ret) {
                var button = up.settings.button;
                var onUploadSuccess = up.settings.onUploadSuccess;
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
            onUploadError: function (up, ret) {
                var button = up.settings.button;
                var onUploadError = up.settings.onUploadError;
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
            },
            //上传全部结束后
            onUploadComplete: function (up, files) {
                var button = up.settings.button;
                var onUploadComplete = up.settings.onUploadComplete;
                if (button) {
                    var onDomUploadComplete = $(button).data("upload-complete");
                    if (onDomUploadComplete) {
                        if (typeof onDomUploadComplete !== 'function' && typeof Upload.api.custom[onDomUploadComplete] === 'function') {
                            onDomUploadComplete = Upload.api.custom[onDomUploadComplete];
                        }
                        if (typeof onDomUploadComplete === 'function') {
                            var result = onDomUploadComplete.call(button, files);
                            if (result === false)
                                return;
                        }
                    }
                }

                if (typeof onUploadComplete === 'function') {
                    var result = onUploadComplete.call(button, files);
                    if (result === false) {
                        return;
                    }
                }
            }
        },
        api: {
            //Plupload上传
            plupload: function (element, onUploadSuccess, onUploadError, onUploadComplete) {
                element = typeof element === 'undefined' ? Upload.config.classname : element;
                $(element, Upload.config.container).each(function () {
                    if ($(this).attr("initialized")) {
                        return true;
                    }
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
                    //最大可上传文件大小
                    maxsize = typeof maxsize !== "undefined" ? maxsize : Config.upload.maxsize;
                    //文件类型
                    mimetype = typeof mimetype !== "undefined" ? mimetype : Config.upload.mimetype;
                    //请求的表单参数
                    multipart = typeof multipart !== "undefined" ? multipart : Config.upload.multipart;
                    //是否支持批量上传
                    multiple = typeof multiple !== "undefined" ? multiple : Config.upload.multiple;
                    var mimetypeArr = new Array();
                    //支持后缀和Mimetype格式,以,分隔
                    if (mimetype && mimetype !== "*" && mimetype.indexOf("/") === -1) {
                        var tempArr = mimetype.split(',');
                        for (var i = 0; i < tempArr.length; i++) {
                            mimetypeArr.push({title: __('Files'), extensions: tempArr[i]});
                        }
                        mimetype = mimetypeArr;
                    }
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
                            mime_types: mimetype,
                        },
                        url: url,
                        multipart_params: $.isArray(multipart) ? {} : multipart,
                        init: {
                            PostInit: Upload.events.onPostInit,
                            FilesAdded: Upload.events.onFileAdded,
                            BeforeUpload: Upload.events.onBeforeUpload,
                            UploadProgress: function (up, file) {
                                var button = up.settings.button;
                                $(button).prop("disabled", true).html("<i class='fa fa-upload'></i> " + __('Upload') + file.percent + "%");
                                Upload.events.onUploadProgress(up, file);
                            },
                            FileUploaded: function (up, file, info) {
                                var button = up.settings.button;
                                //还原按钮文字及状态
                                $(button).prop("disabled", false).html($(button).data("bakup-html"));
                                var ret = Upload.events.onUploadResponse(info.response, info, up, file);
                                file.ret = ret;
                                if (ret.code === 1) {
                                    Upload.events.onUploadSuccess(up, ret, file);
                                } else {
                                    Upload.events.onUploadError(up, ret, file);
                                }
                            },
                            UploadComplete: Upload.events.onUploadComplete,
                            Error: function (up, err) {
                                var button = up.settings.button;
                                $(button).prop("disabled", false).html($(button).data("bakup-html"));
                                var ret = {code: err.code, msg: err.message, data: null};
                                Upload.events.onUploadError(up, ret);
                            }
                        },
                        onUploadSuccess: onUploadSuccess,
                        onUploadError: onUploadError,
                        onUploadComplete: onUploadComplete,
                        button: that
                    });

                    //拖动排序
                    if (preview_id && multiple) {
                        require(['dragsort'], function () {
                            $("#" + preview_id).dragsort({
                                dragSelector: "li a:not(.btn-trash)",
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
                        $("#" + input_id).trigger("change");
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
            send: function (file, onUploadSuccess, onUploadError, onUploadComplete) {
                var index = Layer.msg(__('Uploading'), {offset: 't', time: 0});
                var id = Plupload.guid();
                var _onPostInit = Upload.events.onPostInit;
                Upload.events.onPostInit = function () {
                    // 当加载完成后添加文件并上传
                    Upload.list[id].addFile(file);
                    //Upload.list[id].start();
                };
                $('<button type="button" id="' + id + '" class="btn btn-danger hidden plupload" />').appendTo("body");
                $("#" + id).data("upload-complete", function (files) {
                    Upload.events.onPostInit = _onPostInit;
                    Layer.close(index);
                });
                Upload.api.plupload("#" + id, onUploadSuccess, onUploadError, onUploadComplete);
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