define(['jquery', 'bootstrap', 'backend', 'form', 'table'], function ($, undefined, Backend, Form, Table) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'help/index',
                    add_url: 'help/add',
                    edit_url: 'help/edit',
                    del_url: 'help/del',
                    multi_url: 'help/multi',
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                sortName: 'weigh',
                columns: [
                    [
                        {field: 'state', checkbox: true, },
                        {field: 'id', title: __('Id')},
                        {field: 'category_id', title: __('Category_id')},
                        {field: 'title', title: __('Title')},
                        {field: 'keywords', title: __('Keywords')},
                        {field: 'description', title: __('Description')},
                        {field: 'intro', title: __('Intro')},
                        {field: 'image', title: __('Image'), formatter: Table.api.formatter.image},
                        {field: 'flag', title: __('Flag')},
                        {field: 'outlink', title: __('Outlink')},
                        {field: 'views', title: __('Views')},
                        {field: 'createtime', title: __('Createtime'), formatter: Table.api.formatter.datetime},
                        {field: 'weigh', title: __('Weigh')},
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