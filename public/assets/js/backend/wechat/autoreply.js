define(['jquery', 'bootstrap', 'backend', 'form', 'table'], function ($, undefined, Backend, Form, Table) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'wechat/autoreply/index',
                    add_url: 'wechat/autoreply/add',
                    edit_url: 'wechat/autoreply/edit',
                    del_url: 'wechat/autoreply/del',
                    multi_url: 'wechat/autoreply/multi',
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
                        {field: 'id', title: __('Id')},
                        {field: 'title', title: __('Title')},
                        {field: 'text', title: __('Text')},
                        {field: 'eventkey', title: __('Event key')},
                        {field: 'remark', title: __('Remark')},
                        {field: 'createtime', title: __('Create time'), formatter: Table.api.formatter.datetime},
                        {field: 'updatetime', title: __('Update time'), formatter: Table.api.formatter.datetime},
                        {field: 'status', title: __('Status'), formatter: Table.api.formatter.status},
                        {field: 'operate', title: __('Operate'), events: Table.api.events.operate, formatter: Table.api.formatter.operate}
                    ]
                ]
            });

            // 为表格绑定事件
            Table.api.bindevent(table);

        },
        add: function () {
            Controller.api.bindevent();
        },
        edit: function () {
            Controller.api.bindevent();
        },
        api: {
            bindevent: function () {
                Form.api.bindevent($("form[role=form]"));

                $(document).on('click', "#select-resources", function () {
                    var key = $("input[name='row[eventkey]']").val();
                    Backend.api.open($(this).attr("href") + "?callback=refreshkey&key=" + key, __('Select'), {area: ['90%', '90%']});
                    return false;
                });

                $(document).on('click', "#add-resources", function () {
                    Backend.api.open($(this).attr("href") + "?callback=refreshkey&key=", __('Add'), {area: ['90%', '90%']});
                    return false;
                });
                window.refreshkey = function (data) {
                    $("input[name='row[eventkey]']").val(data.eventkey).trigger("change");
                    layer.closeAll();
                    var keytitle = data.title;
                    var cont = $(".clickbox .create-click:first");
                    $(".keytitle", cont).remove();
                    if (keytitle) {
                        cont.append('<div class="keytitle">资源名:' + keytitle + '</div>');
                    }
                };
            }
        }

    };
    return Controller;
});