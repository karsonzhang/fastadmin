define(['jquery', 'bootstrap', 'backend', 'form', 'table'], function ($, undefined, Backend, Form, Table) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'user_user/index',
                    add_url: 'user_user/add',
                    edit_url: 'user_user/edit',
                    del_url: 'user_user/del',
                    multi_url: 'user_user/multi',
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
                        {field: 'partner_id', title: __('Partner_id')},
                        {field: 'role_id', title: __('Role_id')},
                        {field: 'area_id', title: __('Area_id')},
                        {field: 'editor_id', title: __('Editor_id')},
                        {field: 'level', title: __('Level')},
                        {field: 'star', title: __('Star')},
                        {field: 'username', title: __('Username')},
                        {field: 'nickname', title: __('Nickname')},
                        {field: 'email', title: __('Email')},
                        {field: 'mobile', title: __('Mobile')},
                        {field: 'avatar', title: __('Avatar'), formatter: Table.api.formatter.image},
                        {field: 'gender', title: __('Gender')},
                        {field: 'birthday', title: __('Birthday')},
                        {field: 'score', title: __('Score')},
                        {field: 'prevtime', title: __('Prevtime'), formatter: Table.api.formatter.datetime},
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