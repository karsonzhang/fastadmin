define(['jquery', 'bootstrap', 'backend', 'form', 'table'], function ($, undefined, Backend, Form, Table) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'item/index',
                    add_url: 'item/add',
                    edit_url: 'item/edit',
                    del_url: 'item/del',
                    multi_url: 'item/multi',
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
                        {field: 'user_id', title: __('User_id')},
                        {field: 'book_id', title: __('Book_id')},
                        {field: 'origin_id', title: __('Origin_id')},
                        {field: 'type', title: __('Type')},
                        {field: 'year', title: __('Year')},
                        {field: 'month', title: __('Month')},
                        {field: 'recycles', title: __('Recycles')},
                        {field: 'content', title: __('Content')},
                        {field: 'deletetime', title: __('Deletetime'), formatter: Table.api.formatter.datetime},
                        {field: 'createtime', title: __('Createtime'), formatter: Table.api.formatter.datetime},
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