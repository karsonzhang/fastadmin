define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'page/index',
                    add_url: 'page/add',
                    edit_url: 'page/edit',
                    del_url: 'page/del',
                    multi_url: 'page/multi',
                    table: 'page',
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                sortName: 'weigh',
                columns: [
                    [
                        {field: 'state', checkbox: true},
                        {field: 'id', title: __('Id')},
                        {field: 'category_id', title: __('Category_id')},
                        {field: 'title', title: __('Title')},
                        {field: 'keywords', title: __('Keywords')},
                        {field: 'flag', title: __('Flag'), formatter: Table.api.formatter.flag},
                        {field: 'image', title: __('Image'), formatter: Table.api.formatter.image},
                        {field: 'icon', title: __('Icon'), formatter: Table.api.formatter.icon},
                        {field: 'views', title: __('Views')},
                        {field: 'comments', title: __('Comments')},
                        {field: 'weigh', title: __('Weigh')},
                        {field: 'status', title: __('Status'), formatter: Table.api.formatter.status},
                        {field: 'operate', title: __('Operate'), events: Table.api.events.operate, formatter: Table.api.formatter.operate}
                    ]
                ]
            });

            // 为表格绑定事件
            Table.api.bindevent(table);
            parent.window.Backend.api.sidebar({'auth/admin':44});
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