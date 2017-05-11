define(['jquery', 'bootstrap', 'backend', 'config', 'toastr', 'upload', 'validator'], function ($, undefined, Backend, Config, Toastr, Upload, Validator) {
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
                var type = form.attr("method");
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
                                    if (!Form.api.custom[afterSubmit].call(form, data)) {
                                        return false;
                                    }
                                }
                                //自定义函数
                                if (typeof onAfterSubmit == 'function') {
                                    if (!onAfterSubmit.call(form, data)) {
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
                        Toastr.error(__('Network error'));
                    }, complete: function (e) {
                    }
                });
                return false;
            },
            bindevent: function (form, onBeforeSubmit, onAfterSubmit) {
                form.validator({
                    validClass: 'has-success',
                    invalidClass: 'has-error',
                    bindClassTo: '.form-group',
                    formClass: 'n-default n-bootstrap',
                    msgClass: 'n-right',
                    stopOnError: true,
                    valid: function (ret) {
                        //验证通过提交表单
                        Form.api.submit(form, onBeforeSubmit, function (data) {
                            if (typeof onAfterSubmit == 'function') {
                                if (!onAfterSubmit.call(form, data)) {
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
                });

                //绑定select元素事件
                if ($(".selectpicker", form).size() > 0) {
                    require(['bootstrap-select'], function () {
                        $('.selectpicker', form).selectpicker();
                    });
                }

                if ($(".typeahead").size() > 0 || $(".tagsinput").size() > 0) {
                    require(['bloodhound'], function () {
                        var remotesource = function (input) {
                            return new Bloodhound({
                                datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
                                queryTokenizer: Bloodhound.tokenizers.whitespace,
                                remote: {
                                    url: '/ajax/typeahead?search=%QUERY&field=' + $(input).attr("name"),
                                    wildcard: '%QUERY',
                                    transform: function (ret) {
                                        return ret.data.searchlist;
                                    }
                                }
                            });
                        };

                        //绑定typeahead事件
                        if ($(".typeahead", form).size() > 0) {
                            require(['typeahead'], function () {
                                $(".typeahead", form).each(function () {
                                    $(this).typeahead({
                                        hint: true,
                                        highlight: true,
                                        minLength: 0
                                    }, {
                                        name: 'typeahead',
                                        limit: 20,
                                        displayKey: 'id',
                                        source: remotesource(this),
                                        templates: {
                                            empty: '<li class="notfound">' + __('No matches found') + '</li>',
                                            suggestion: function (item) {
                                                return '<li>' + item.name + '</li>';
                                            }
                                        }
                                    });
                                });
                            });
                        }

                        //绑定tagsinput事件
                        if ($(".tagsinput", form).size() > 0) {
                            require(['bootstrap-tagsinput'], function () {
                                $('.tagsinput', form).each(function () {
                                    $(this).tagsinput({
                                        freeInput: false,
                                        typeaheadjs: {
                                            name: 'tagsinput',
                                            limit: 20,
                                            displayKey: 'name',
                                            valueKey: 'id',
                                            source: remotesource(this),
                                            templates: {
                                                empty: '<li class="notfound">' + __('No matches found') + '</li>',
                                                suggestion: function (item) {
                                                    return '<li>' + item.name + '</li>';
                                                }
                                            }
                                        }
                                    });
                                });
                                $('.bootstrap-tagsinput .twitter-typeahead').css('display', 'inline');
                            });
                        }
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
                                            var url = Config.upload.cdnurl + data.url;
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
            },
            custom: {}
        },
    };
    return Form;
});