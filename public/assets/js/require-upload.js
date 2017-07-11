define(['jquery', 'bootstrap', 'plupload', 'template'], function ($, undefined, Plupload, Template) {
    var Upload = {
        list: {},
        config: {
            container: document.body,
            classname: '.plupload:not([initialized])',
            previewtpl: '<li class="col-xs-3"><a href="<%=fullurl%>" data-url="<%=url%>" target="_blank" class="thumbnail"><img src="<%=fullurl%>" class="img-responsive"></a><a href="javascript:;" class="btn btn-danger btn-xs btn-trash"><i class="fa fa-trash"></i></a></li>',
        },
        api: {
            //Plupload上传
            plupload: function (element, onAfterUpload) {
                element = typeof element == 'undefined' ? Upload.config.classname : element;
                $(element, Upload.config.container).each(function () {
                    $(this).attr("initialized", true);
                    var that = this;
                    var id = $(this).prop("id");
                    var url = $(this).data("url");
                    var maxsize = $(this).data("maxsize");
                    var mimetype = $(this).data("mimetype");
                    var multipart = $(this).data("multipart");
                    var multiple = $(this).data("multiple");
                    //上传URL
                    url = url ? url : Config.upload.uploadurl;
                    url = Fast.api.fixurl(url);
                    //填充ID
                    var input_id = $(that).data("input-id") ? $(that).data("input-id") : "";
                    //预览ID
                    var preview_id = $(that).data("preview-id") ? $(that).data("preview-id") : "";
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
                                Plupload.each(files, function (file) {
                                    //这里可以改成其它的表现形式
                                    //document.getElementById('filelist').innerHTML += '<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ') <b></b></div>';
                                });
                                $(that).data("bakup-html", $(that).html());
                                //添加后立即上传
                                setTimeout(function () {
                                    Upload.list[id].start();
                                }, 1);
                            },
                            UploadProgress: function (up, file) {
                                //这里可以改成其它的表现形式
                                //document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
                                $(that).prop("disabled", true).html("<i class='fa fa-upload'></i> " + __('Upload') + file.percent + "%");
                            },
                            FileUploaded: function (up, file, info) {
                                var options = this.getOption();
                                //还原按钮文字及状态
                                $(that).prop("disabled", false).html($(that).data("bakup-html"));
                                //这里可以改成其它的表现形式
                                //document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML += (' [Url]: ' + '<a href="' + url + '" target="_blank">' + url + '</a>');
                                //这里建议不修改
                                try {
                                    var ret = JSON.parse(info.response);
                                    if (ret.hasOwnProperty('code')) {
                                        ret.data = ret.code == 200 ? ret : ret.data;
                                        ret.code = ret.code == 200 ? 1 : ret.code;
                                        var data = ret.hasOwnProperty("data") && ret.data != "" ? ret.data : null;
                                        var msg = ret.hasOwnProperty("msg") && ret.msg != "" ? ret.msg : "";
                                        if (ret.code === 1) {
                                            if (input_id) {
                                                var urlArr = [];
                                                var inputObj = $("#" + input_id);
                                                if (options.multi_selection && inputObj.val() != "") {
                                                    urlArr.push(inputObj.val());
                                                }
                                                urlArr.push(data.url);
                                                inputObj.val(urlArr.join(",")).trigger("change");
                                            }
                                            var afterUpload = $("#" + id).data("after-upload");
                                            if (afterUpload && typeof Upload.api.custom[afterUpload] == 'function') {
                                                Upload.api.custom[afterUpload].call(that, data);
                                            }
                                            if (typeof onAfterUpload == 'function') {
                                                onAfterUpload.call(that, data);
                                            }
                                        } else {
                                            Toastr.error(msg ? msg : __('Operation failed'));
                                        }
                                    } else {
                                        Toastr.error(e.message + "(code:-2)");
                                    }
                                } catch (e) {
                                    Toastr.error(e.message + "(code:-1)");
                                }
                            },
                            Error: function (up, err) {
                                Toastr.error(err.message + "(code:" + err.code + ")");
                            }
                        }
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
                        //移除按钮事件
                        $(document.body).on("click", "#" + preview_id + " .btn-trash", function () {
                            $(this).closest("li").remove();
                            $("#" + preview_id).trigger("fa.preview.change");
                        });
                    }
                    Upload.list[id].init();
                });
            },
            // AJAX异步上传,主要用于Summernote上传回调
            send: function (file, callback) {
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
                    dataType: 'json',
                    success: function (ret) {
                        if (ret.hasOwnProperty("code")) {
                            ret.data = ret.code == 200 ? ret : ret.data;
                            ret.code = ret.code == 200 ? 1 : ret.code;
                            var data = ret.hasOwnProperty("data") && ret.data != "" ? ret.data : null;
                            var msg = ret.hasOwnProperty("msg") && ret.msg != "" ? ret.msg : "";
                            if (ret.code === 1) {
                                // 如果回调存在,则直接调用回调
                                if (typeof callback == 'function') {
                                    callback.call(this, data);
                                } else {
                                    Toastr.success(msg ? msg : __('Operation completed'));
                                }
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