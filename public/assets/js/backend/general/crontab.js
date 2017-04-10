define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'general/crontab/index',
                    add_url: 'general/crontab/add',
                    edit_url: 'general/crontab/edit',
                    del_url: 'general/crontab/del',
                    multi_url: 'general/crontab/multi',
                    table: 'crontab'
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
                        {field: 'id', title: 'ID'},
                        {field: 'type', title: __('Type')},
                        {field: 'title', title: __('Title')},
                        {field: 'maximums', title: __('Maximums')},
                        {field: 'executes', title: __('Executes')},
                        {field: 'begintime', title: __('Begin time'), formatter: Table.api.formatter.datetime},
                        {field: 'endtime', title: __('End time'), formatter: Table.api.formatter.datetime},
                        {field: 'executetime', title: __('Execute time'), formatter: Table.api.formatter.datetime},
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
            Form.api.bindevent($("form[role=form]"));
            Controller.api.bindevent();
        },
        edit: function () {
            Form.api.bindevent($("form[role=form]"));
            Controller.api.bindevent();
        },
        api: {
            bindevent: function () {
                $(document).on("click", "#fieldlist .append", function () {

                });
                //拖拽排序
                require(['crontab'], function () {
                    $('#schedulepicker').jqCron({
                        lang: 'cn',
                        default_value: '* * * * 0-2',
                        multiple_dom: true,
                        multiple_month: true,
                        multiple_mins: true,
                        multiple_dow: true,
                        multiple_time_hours: true,
                        multiple_time_minutes: true,
                        no_reset_button: false,
                        bind_to: $("#schedule")
                    });
                });
            }
        }
    };
    return Controller;
});