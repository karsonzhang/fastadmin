define(['jquery', 'bootstrap', 'upload', 'validator'], function ($, undefined, Upload, Validator) {
    var Form = {
        config: {
        },
        api: {
            submit: function (form, onBeforeSubmit, onAfterSubmit) {
                if (form.size() == 0)
                    return Toastr.error("表单未初始化完成,无法提交");
                //提交前事件
                var beforeSubmit = form.data("before-submit");
                //元素绑定函数
                if (beforeSubmit && typeof Form.api.custom[beforeSubmit] == 'function') {
                    if (!Form.api.custom[beforeSubmit].call(form)) {
                        return false;
                    }
                }
                //自定义函数
                if (typeof onBeforeSubmit == 'function') {
                    if (!onBeforeSubmit.call(form)) {
                        return false;
                    }
                }
                var type = form.attr("method").toUpperCase();
                type = type && (type == 'GET' || type == 'POST') ? type : 'GET';
                url = form.attr("action");
                url = url ? url : location.href;
                $.ajax({
                    type: type,
                    url: url,
                    data: form.serialize(),
                    dataType: 'json',
                    success: function (ret) {
                        if (ret.hasOwnProperty("code")) {
                            var data = ret.hasOwnProperty("data") && ret.data != "" ? ret.data : null;
                            var msg = ret.hasOwnProperty("msg") && ret.msg != "" ? ret.msg : "";
                            if (ret.code === 1) {
                                $('.form-group', form).removeClass('has-feedback has-success has-error');
                                //成功提交后事件
                                var afterSubmit = form.data("after-submit");
                                //元素绑定函数
                                if (afterSubmit && typeof Form.api.custom[afterSubmit] == 'function') {
                                    if (!Form.api.custom[afterSubmit].call(form, data, ret)) {
                                        return false;
                                    }
                                }
                                //自定义函数
                                if (typeof onAfterSubmit == 'function') {
                                    if (!onAfterSubmit.call(form, data, ret)) {
                                        return false;
                                    }
                                }
                                Toastr.success(msg ? msg : __('Operation completed'));
                            } else {
                                if (data && typeof data === 'object' && typeof data.token !== 'undefined') {
                                    $("input[name='__token__']").val(data.token);
                                }
                                Toastr.error(msg ? msg : __('Operation failed'));
                            }
                        } else {
                            Toastr.error(__('Unknown data format'));
                        }
                    }, error: function () {
                        Toastr.error(__('Network error'));
                    }, complete: function (e) {
                    }
                });
                return false;
            },
            bindevent: function (form, onBeforeSubmit, onAfterSubmit) {
                //绑定表单事件
                form.validator($.extend({
                    validClass: 'has-success',
                    invalidClass: 'has-error',
                    bindClassTo: '.form-group',
                    formClass: 'n-default n-bootstrap',
                    msgClass: 'n-right',
                    stopOnError: true,
                    display: function (elem) {
                        return $(elem).closest('.form-group').find(".control-label").text().replace(/\:/, '');
                    },
                    target: function (input) {
                        var $formitem = $(input).closest('.form-group'),
                                $msgbox = $formitem.find('span.msg-box');
                        if (!$msgbox.length) {
                            return [];
                        }
                        return $msgbox;
                    },
                    valid: function (ret) {
                        //验证通过提交表单
                        Form.api.submit($(ret), onBeforeSubmit, function (data, ret) {
                            if (typeof onAfterSubmit == 'function') {
                                if (!onAfterSubmit.call($(this), data, ret)) {
                                    return false;
                                }
                            }
                            //提示及关闭当前窗口
                            parent.Toastr.success(__('Operation completed'));
                            parent.$(".btn-refresh").trigger("click");
                            var index = parent.Layer.getFrameIndex(window.name);
                            parent.Layer.close(index);
                        });
                        return false;
                    }
                }, form.data("validator-options") || {}));
                
                //移除提交按钮的disabled类
                $(".layer-footer .btn.disabled", form).removeClass("disabled");

                //绑定select元素事件
                if ($(".selectpicker", form).size() > 0) {
                    require(['bootstrap-select', 'bootstrap-select-lang'], function () {
                        $('.selectpicker', form).selectpicker();
                    });
                }

                //绑定selectpage元素事件
                if ($(".selectpage", form).size() > 0) {
                    require(['selectpage'], function () {
                        $('.selectpage', form).selectPage({
                            source: 'ajax/selectpage',
                        });
                    });
                    //给隐藏的元素添加上validate验证触发事件
                    $(form).on("change", ".selectpage-input-hidden", function () {
                        $(this).trigger("validate");
                    });
                }

                //绑定cxselect元素事件
                if ($("[data-toggle='cxselect']").size() > 0) {
                    require(['cxselect'], function () {
                        $.cxSelect.defaults.jsonName = 'name';
                        $.cxSelect.defaults.jsonValue = 'value';
                        $.cxSelect.defaults.jsonSpace = 'data';
                        $("[data-toggle='cxselect']").cxSelect();
                    });
                }

                //绑定日期时间元素事件
                if ($(".datetimepicker", form).size() > 0) {
                    require(['bootstrap-datetimepicker'], function () {
                        $('.datetimepicker', form).parent().css('position', 'relative');
                        $('.datetimepicker', form)
                                .datetimepicker({
                                    format: 'YYYY-MM-DD HH:mm:ss',
                                    icons: {
                                        time: 'fa fa-clock-o',
                                        date: 'fa fa-calendar',
                                        up: 'fa fa-chevron-up',
                                        down: 'fa fa-chevron-down',
                                        previous: 'fa fa-chevron-left',
                                        next: 'fa fa-chevron-right',
                                        today: 'fa fa-history',
                                        clear: 'fa fa-trash',
                                        close: 'fa fa-remove'
                                    },
                                    showTodayButton: true,
                                    showClose: true
                                });
                    });
                }

                //绑定summernote事件
                if ($(".summernote", form).size() > 0) {
                    require(['summernote'], function () {
                        $(".summernote", form).summernote({
                            height: 250,
                            lang: 'zh-CN',
                            fontNames: [
                                'Arial', 'Arial Black', 'Serif', 'Sans', 'Courier',
                                'Courier New', 'Comic Sans MS', 'Helvetica', 'Impact', 'Lucida Grande',
                                "Open Sans", "Hiragino Sans GB", "Microsoft YaHei",
                                '微软雅黑', '宋体', '黑体', '仿宋', '楷体', '幼圆',
                            ],
                            fontNamesIgnoreCheck: [
                                "Open Sans", "Microsoft YaHei",
                                '微软雅黑', '宋体', '黑体', '仿宋', '楷体', '幼圆'
                            ],
                            dialogsInBody: true,
                            callbacks: {
                                onChange: function (contents) {
                                    $(this).val(contents);
                                    $(this).trigger('change');
                                },
                                onInit: function () {
                                },
                                onImageUpload: function (files) {
                                    var that = this;
                                    //依次上传图片
                                    for (var i = 0; i < files.length; i++) {
                                        Upload.api.send(files[i], function (data) {
                                            var url = Fast.api.cdnurl(data.url);
                                            $(that).summernote("insertImage", url, 'filename');
                                        });
                                    }
                                }
                            }
                        });
                    });
                }

                //绑定plupload上传元素事件
                if ($(".plupload", form).size() > 0) {
                    Upload.api.plupload();
                }

                //绑定fachoose选择附件事件
                if ($(".fachoose", form).size() > 0) {
                    $(document).on('click', ".fachoose", function () {
                        var multiple = $(this).data("multiple") ? $(this).data("multiple") : false;
                        var mimetype = $(this).data("mimetype") ? $(this).data("mimetype") : '';
                        Fast.api.open("general/attachment/select?callback=refreshchoose&element_id=" + $(this).attr("id") + "&multiple=" + multiple + "&mimetype=" + mimetype, __('Choose'));
                        return false;
                    });

                    //刷新选择的元素
                    window.refreshchoose = function (id, data, multiple) {
                        var input_id = $("#" + id).data("input-id");
                        if (multiple) {
                            var urlArr = [];
                            var inputObj = $("#" + input_id);
                            if (inputObj.val() != "") {
                                urlArr.push(inputObj.val());
                            }
                            urlArr.push(data.url);
                            inputObj.val(urlArr.join(",")).trigger("change");
                        } else {
                            $("#" + input_id).val(data.url).trigger("change");
                        }
                        Layer.closeAll();
                    };
                }
            },
            custom: {}
        },
    };
    return Form;
});