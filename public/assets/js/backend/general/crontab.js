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
                        {field: 'type_text', title: __('Type'), operate:false},
                        {field: 'title', title: __('Title')},
                        {field: 'maximums', title: __('Maximums')},
                        {field: 'executes', title: __('Executes')},
                        {field: 'begintime', title: __('Begin time'), formatter: Table.api.formatter.datetime},
                        {field: 'endtime', title: __('End time'), formatter: Table.api.formatter.datetime},
                        {field: 'nexttime', title: __('Next execute time'), formatter: Table.api.formatter.datetime, operate:false},
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
            Controller.api.bindevent();
        },
        edit: function () {
            Controller.api.bindevent();
        },
        api: {
            bindevent: function () {
                $('#schedule').on('valid.field', function (e, result) {
                    $("#pickdays").trigger("change");
                });
                Form.api.bindevent($("form[role=form]"));
                $(document).on("change", "#pickdays", function () {
                    $("#scheduleresult").html(__('Loading'));
                    $.post("general/crontab/get_schedule_future", {schedule: $("#schedule").val(), days:$(this).val()}, function (ret) {
                        $("#scheduleresult").html("");
                        if (typeof ret.futuretime !== 'undefined' && $.isArray(ret.futuretime)) {
                            $.each(ret.futuretime, function (i, j) {
                                $("#scheduleresult").append("<li class='list-group-item'>" + j + "<span class='badge'>" + (i + 1) + "</span></li>");
                            });
                        }
                    }, 'json');

                });
                $("#pickdays").trigger("change");
            }
        }
    };
    return Controller;
});