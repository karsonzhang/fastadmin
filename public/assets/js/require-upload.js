define(['jquery', 'bootstrap', 'backend', 'config', 'plupload'], function ($, undefined, Backend, Config, Plupload) {
    var Upload = {
        list: {},
        config: {
            container: document.body,
            classname: '.plupload',
        },
        api: {
            //Plupload上传
            plupload: function (element, onAfterUpload) {
                element = typeof element == 'undefined' ? Upload.config.classname : element;
                $(element, Upload.config.container).each(function () {
                    var that = this;
                    var id = $(this).prop("id");
                    var url = $(this).data("url");
                    var maxsize = $(this).data("maxsize");
                    var mimetype = $(this).data("mimetype");
                    var multipart = $(this).data("multipart");
                    var multiple = $(this).data("multiple");
                    //上传URL
                    url = url ? url : Config.upload.uploadurl;
                    url = Backend.api.fixurl(url);
                    //最大可上传
                    maxsize = maxsize ? maxsize : Config.upload.maxsize;
                    //文件类型
                    mimetype = mimetype ? mimetype : Config.upload.mimetype;
                    //请求的表单参数
                    multipart = multipart ? multipart : Config.upload.multipart;
                    //是否支持批量上传
                    multiple = multiple ? multiple : Config.upload.multiple;
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
                                $(that).prop("disabled", true).html("<i class='fa fa-upload'></i> 上传" + file.percent + "%");
                            },
                            FileUploaded: function (up, file, info) {
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
                                            //$("input[data-plupload-id='" + id + "-text']").val(data.url);
                                            if ($(that).data("input-id")) {
                                                $("input#" + $(that).data("input-id")).val(data.url);
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