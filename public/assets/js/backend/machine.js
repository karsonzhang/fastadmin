define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'machine/index',
                    add_url: 'machine/add',
                    edit_url: 'machine/edit',
                    del_url: 'machine/del',
                    multi_url: 'machine/multi',
                    table: 'machine',
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                pk: 'id',
                sortName: 'weigh',
                showToggle: false,
                columns: [
                    [
                        {checkbox: true},
                        {field: 'id', title: __('Id')},
                        {field: 'category_id', title: __('Category_id'), visible: false, operate: false},
                        {field: 'depa_id', title: __('Depa_id'), visible: false, operate: false},
                        {field: 'name', title: __('Name')},
                        {field: 'place', title: __('Place'), operate: false},
                        {field: 'spec', title: __('Spec'), operate: false},
                        {field: 'models', title: __('Models'), operate: false},
                        {field: 'origin', title: __('Origin'), operate: false},
                        {field: 'supplier', title: __('Supplier'), visible: false, operate: false},
                        {field: 'power', title: __('Power'), visible: false, operate: false},
                        {field: 'speed', title: __('Speed'), visible: false, operate: false},
                        {field: 'voltage', title: __('Voltage'), visible: false, operate: false},
                        {field: 'current', title: __('Current'), visible: false, operate: false},
                        {field: 'weight', title: __('Weight'), visible: false, operate: false},
                        {field: 'image', title: __('Image'), formatter: Table.api.formatter.image, visible: false, operate: false},
                        {field: 'images', title: __('Images'), formatter: Table.api.formatter.images, visible: false, operate: false},
                        {field: 'attachfile', title: __('Attachfile'), visible: false, operate: false},
                        {field: 'keywords', title: __('Keywords'), visible: false, operate: false},
                        {field: 'description', title: __('Description'), visible: false, operate: false},
                        {field: 'startdate', title: __('Startdate')},
                        {field: 'number', title: __('Number')},
                        {field: 'enabledate', title: __('Enabledate')},
                        {field: 'year', title: __('Year')},
                        {field: 'createtime', title: __('Createtime'), formatter: Table.api.formatter.datetime},
                        {field: 'updatetime', title: __('Updatetime'), formatter: Table.api.formatter.datetime},
                        {field: 'weigh', title: __('Weigh'), operate: false},
                        {field: 'status', title: __('Status'), formatter: Table.api.formatter.status, searchList: {'normal': __('Normal'), 'hidden': __('Hidden')}, style: 'min-width:100px;'},
                        {field: 'state_text', title: __('State'), formatter: Table.api.formatter.statu, searchList: {'0': __('State 0'), '1': __('State 1'), '2': __('State 2')}, style: 'min-width:100px;'},
                        {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate}
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