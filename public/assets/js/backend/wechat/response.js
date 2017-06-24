define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'wechat/response/index',
                    add_url: 'wechat/response/add',
                    edit_url: 'wechat/response/edit',
                    del_url: 'wechat/response/del',
                    multi_url: 'wechat/response/multi',
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                sortName: 'id',
                columns: [
                    [
                        {field: 'state', checkbox: true, },
                        {field: 'id', title: 'ID'},
                        {field: 'type', title: __('Type')},
                        {field: 'title', title: __('Resource title')},
                        {field: 'eventkey', title: __('Event key')},
                        {field: 'status', title: __('Status'), formatter: Table.api.formatter.status, operate:false},
                        {field: 'operate', title: __('Operate'), events: Table.api.events.operate, formatter: Table.api.formatter.operate}
                    ]
                ]
            });

            // 为表格绑定事件
            Table.api.bindevent(table);
        },
        select: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'wechat/response/index',
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                sortName: 'id',
                columns: [
                    [
                        {field: 'state', checkbox: true, },
                        {field: 'id', title: 'ID'},
                        {field: 'type', title: __('Type')},
                        {field: 'title', title: __('Title')},
                        {field: 'event', title: __('Event')},
                        {field: 'status', title: __('Status'), formatter: Table.api.formatter.status, operate:false},
                        {field: 'operate', title: __('Operate'), events: {
                                'click .btn-chooseone': function (e, value, row, index) {
                                    var callback = Backend.api.query('callback');
                                    if (callback) {
                                        parent.window[callback](row);
                                    }
                                },
                            }, formatter: function () {
                                return '<a href="javascript:;" class="btn btn-danger btn-chooseone btn-xs"><i class="fa fa-check"></i> ' + __('Choose') + '</a>';
                            }}
                    ]
                ]
            });

            // 为表格绑定事件
            Table.api.bindevent(table);
        },
        add: function () {
            Form.api.bindevent($("form[role=form]"), null, function (ret) {
                var callback = Backend.api.query('callback');
                if (callback) {
                    parent.window[callback](ret);
                } else {
                    parent.$(".btn-refresh").trigger("click");
                    var index = parent.Layer.getFrameIndex(window.name);
                    parent.Layer.close(index);
                }
            });
            Controller.api.bindevent();
        },
        edit: function () {
            Form.api.bindevent($("form[role=form]"));
            Controller.api.bindevent();
        },
        api: {
            bindevent: function () {
                var getAppFileds = function (app) {
                    var app = apps[app];
                    var appConfig = app['config'];
                    var str = '';
                    for (i in appConfig) {
                        if (appConfig[i]['type'] == 'text' || appConfig[i]['type'] == 'textarea') {
                            var pattern_str = 'pattern ="required" ';
                            var alt = '';
                            if (undefined != appConfig[i]['alt'])
                                alt = appConfig[i]['alt'];
                            if (undefined != appConfig[i]['pattern'])
                                pattern_str = 'pattern ="' + appConfig[i]['pattern'] + '" ';
                            if (appConfig[i]['type'] == 'textarea') {
                                str += '<div class="form-group"><label for="content" class="control-label col-xs-12 col-sm-2">' + appConfig[i]['caption'] + ':</label><div class="col-xs-12 col-sm-8"><textarea class="form-control" name="row[content][' + appConfig[i]['field'] + ']" ' + pattern_str + ' alt="' + alt + '" data-rule="required"></textarea> </div> </div>';
                            } else {
                                str += '<div class="form-group"><label for="content" class="control-label col-xs-12 col-sm-2">' + appConfig[i]['caption'] + ':</label><div class="col-xs-12 col-sm-8"><input class="form-control" name="row[content][' + appConfig[i]['field'] + ']" type="text" ' + pattern_str + ' alt="' + alt + '" data-rule="required"> </div> </div>';
                            }
                        } else {
                            var options = appConfig[i]['options'];
                            options = options.split(',');
                            var option_str = '';
                            if (appConfig[i]['type'] == 'select') {
                                for (o in options) {
                                    var option = options[o];
                                    var item = option.split(':');
                                    option_str += '<option value="' + item[0] + '">' + item[1] + '</option>';
                                }
                                option_str = '<select class="form-control" name="row[content][' + appConfig[i]['field'] + ']">' + option_str + '</select>';
                            } else if (appConfig[i]['type'] == 'checkbox') {
                                for (o in options) {
                                    var option = options[o];
                                    var item = option.split(':');
                                    option_str += '<input type="checkbox" name="row[content][' + appConfig[i]['field'] + '][]" value="' + item[0] + '"> <label>' + item[1] + '</label> ';
                                }

                            } else if (appConfig[i]['type'] == 'radio') {
                                for (o in options) {
                                    var option = options[o];
                                    var item = option.split(':');
                                    option_str += '<input type="radio" name="row[content][' + appConfig[i]['field'] + ']" value="' + item[0] + '"> <label>' + item[1] + '</label> ';
                                }
                            }
                            str += '<div class="form-group"><label for="content" class="control-label col-xs-12 col-sm-2">' + appConfig[i]['caption'] + ':</label><div class="col-xs-12 col-sm-8">' + option_str + ' </div> </div>';
                        }

                    }
                    return str;
                };
                $(document).on('change', "#app", function () {
                    var app = $(this).val();
                    $("#appfields").html(getAppFileds(app));
                    if (datas.app == app) {
                        delete(datas.app);
                        var form = $("form.form-ajax");
                        $.each(datas, function (i, j) {
                            form.field("row[content][" + i + "]" + ($("input[name='row[content][" + i + "][]']", form).size() > 0 ? '[]' : ''), j);
                        });
                    }
                });
                $(document).on('click', "input[name='row[type]']", function () {
                    var type = $(this).val();
                    if (type == 'text') {
                        $("#expand").html('<div class="form-group"><label for="content" class="control-label col-xs-12 col-sm-2">文本内容:</label><div class="col-xs-12 col-sm-8"><textarea class="form-control" name="row[content][content]" data-rule="required"></textarea> <a href="javascript:;" class="btn-insertlink">插入链接</a></div></div>');
                        $("form.form-ajax").field("row[content][content]", datas.content);
                    } else if (type == 'app') {
                        $("#expand").html('<div class="form-group"><label for="content" class="control-label col-xs-12 col-sm-2">应用:</label><div class="col-xs-12 col-sm-8"><select class="form-control" name="row[content][app]" id="app">' + $("select[name=applist]").html() + '</select></div></div><div id="appfields"><div>');
                        $("form.form-ajax").field("row[content][app]", datas.app);
                        $("#app").trigger('change');
                    }
                });
                $(document).on('click', ".btn-insertlink", function () {
                    var textarea = $("textarea[name='row[content][content]']");
                    var cursorPos = textarea.prop('selectionStart');
                    var v = textarea.val();
                    var textBefore = v.substring(0, cursorPos);
                    var textAfter = v.substring(cursorPos, v.length);

                    Layer.prompt({title: '请输入显示的文字', formType: 3}, function (text, index) {
                        Layer.close(index);
                        Layer.prompt({title: '请输入跳转的链接URL(包含http)', formType: 3}, function (link, index) {
                            text = text == '' ? link : text;
                            textarea.val(textBefore + '<a href="' + link + '">' + text + '</a>' + textAfter);
                            Layer.close(index);
                        });
                    });
                });
                $("input[name='row[type]']:checked").trigger("click");
            }
        }
    };
    return Controller;
});