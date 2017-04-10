define(['jquery', 'bootstrap', 'backend', 'form', 'table'], function ($, undefined, Backend, Form, Table) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'editor/index',
                    add_url: 'editor/add',
                    edit_url: 'editor/edit',
                    del_url: 'editor/del',
                    multi_url: 'editor/multi',
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
{field: 'name', title: __('Name')},
{field: 'wxid', title: __('Wxid')},
{field: 'qrcode', title: __('Qrcode')},
{field: 'createtime', title: __('Createtime'), formatter: Table.api.formatter.datetime},
{field: 'friends', title: __('Friends')},
{field: 'city', title: __('City')},
{field: 'avatar', title: __('Avatar')},
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
            }
        }

    };
    return Controller;
});