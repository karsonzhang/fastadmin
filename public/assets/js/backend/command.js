define(['jquery', 'bootstrap', 'backend', 'table', 'form', 'template'], function ($, undefined, Backend, Table, Form, Template) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'command/index',
                    add_url: 'command/add',
                    edit_url: '',
                    del_url: 'command/del',
                    multi_url: 'command/multi',
                    table: 'command',
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                pk: 'id',
                sortName: 'id',
                columns: [
                    [
                        {checkbox: true},
                        {field: 'id', title: __('Id')},
                        {field: 'type', title: __('Type'), formatter: Table.api.formatter.search},
                        {field: 'type_text', title: __('Type')},
                        {
                            field: 'command', title: __('Command'), formatter: function (value, row, index) {
                                return '<input type="text" class="form-control" value="' + value + '">';
                            }
                        },
                        {
                            field: 'executetime',
                            title: __('Executetime'),
                            operate: 'RANGE',
                            addclass: 'datetimerange',
                            formatter: Table.api.formatter.datetime
                        },
                        {
                            field: 'createtime',
                            title: __('Createtime'),
                            operate: 'RANGE',
                            addclass: 'datetimerange',
                            formatter: Table.api.formatter.datetime
                        },
                        {
                            field: 'updatetime',
                            title: __('Updatetime'),
                            operate: 'RANGE',
                            addclass: 'datetimerange',
                            formatter: Table.api.formatter.datetime
                        },
                        {
                            field: 'status',
                            title: __('Status'),
                            table: table,
                            custom: {"successed": 'success', "failured": 'danger'},
                            searchList: {"successed": __('Successed'), "failured": __('Failured')},
                            formatter: Table.api.formatter.status
                        },
                        {
                            field: 'operate',
                            title: __('Operate'),
                            buttons: [
                                {
                                    name: 'execute',
                                    title: __('Execute again'),
                                    text: __('Execute again'),
                                    url: 'command/execute',
                                    icon: 'fa fa-repeat',
                                    classname: 'btn btn-success btn-xs btn-execute btn-ajax',
                                    success: function (data) {
                                        Layer.alert("<textarea class='form-control' cols='60' rows='5'>" + data.result + "</textarea>", {
                                            title: __("执行结果"),
                                            shadeClose: true
                                        });
                                        table.bootstrapTable('refresh');
                                        return false;
                                    }
                                },
                                {
                                    name: 'execute',
                                    title: __('Detail'),
                                    text: __('Detail'),
                                    url: 'command/detail',
                                    icon: 'fa fa-list',
                                    classname: 'btn btn-info btn-xs btn-execute btn-dialog'
                                }
                            ],
                            table: table,
                            events: Table.api.events.operate,
                            formatter: Table.api.formatter.operate
                        }
                    ]
                ]
            });

            // 为表格绑定事件
            Table.api.bindevent(table);
        },
        add: function () {
            require(['bootstrap-select', 'bootstrap-select-lang']);
            var mainfields = [];
            var relationfields = {};
            var maintable = [];
            var relationtable = [];
            var relationmode = ["belongsto", "hasone"];

            var renderselect = function (select, data) {
                var html = [];
                for (var i = 0; i < data.length; i++) {
                    html.push("<option value='" + data[i] + "'>" + data[i] + "</option>");
                }
                $(select).html(html.join(""));
                select.trigger("change");
                if (select.data("selectpicker")) {
                    select.selectpicker('refresh');
                }
                return select;
            };

            $("select[name=table] option").each(function () {
                maintable.push($(this).val());
            });
            $(document).on('change', "input[name='isrelation']", function () {
                $("#relation-zone").toggleClass("hide", !$(this).prop("checked"));
            });
            $(document).on('change', "select[name='table']", function () {
                var that = this;
                Fast.api.ajax({
                    url: "command/get_field_list",
                    data: {table: $(that).val()},
                }, function (data, ret) {
                    mainfields = data.fieldlist;
                    $("#relation-zone .relation-item").remove();
                    renderselect($("#fields"), mainfields);
                    return false;
                });
                return false;
            });
            $(document).on('click', "a.btn-newrelation", function () {
                var that = this;
                var index = parseInt($(that).data("index")) + 1;
                var content = Template("relationtpl", {index: index});
                content = $(content.replace(/\[index\]/, index));
                $(this).data("index", index);
                $(content).insertBefore($(that).closest(".row"));
                $('select', content).selectpicker();
                var exists = [$("select[name='table']").val()];
                $("select.relationtable").each(function () {
                    exists.push($(this).val());
                });
                relationtable = [];
                $.each(maintable, function (i, j) {
                    if ($.inArray(j, exists) < 0) {
                        relationtable.push(j);
                    }
                });
                renderselect($("select.relationtable", content), relationtable);
                $("select.relationtable", content).trigger("change");
            });
            $(document).on('click', "a.btn-removerelation", function () {
                $(this).closest(".row").remove();
            });
            $(document).on('change', "#relation-zone select.relationmode", function () {
                var table = $("select.relationtable", $(this).closest(".row")).val();
                var that = this;
                Fast.api.ajax({
                    url: "command/get_field_list",
                    data: {table: table},
                }, function (data, ret) {
                    renderselect($(that).closest(".row").find("select.relationprimarykey"), $(that).val() == 'belongsto' ? data.fieldlist : mainfields);
                    renderselect($(that).closest(".row").find("select.relationforeignkey"), $(that).val() == 'hasone' ? data.fieldlist : mainfields);
                    return false;
                });
            });
            $(document).on('change', "#relation-zone select.relationtable", function () {
                var that = this;
                Fast.api.ajax({
                    url: "command/get_field_list",
                    data: {table: $(that).val()},
                }, function (data, ret) {
                    renderselect($(that).closest(".row").find("select.relationmode"), relationmode);
                    renderselect($(that).closest(".row").find("select.relationfields"), mainfields)
                    renderselect($(that).closest(".row").find("select.relationforeignkey"), data.fieldlist)
                    renderselect($(that).closest(".row").find("select.relationfields"), data.fieldlist)
                    return false;
                });
            });
            $(document).on('click', ".btn-command", function () {
                var form = $(this).closest("form");
                var textarea = $("textarea[rel=command]", form);
                textarea.val('');
                Fast.api.ajax({
                    url: "command/command/action/command",
                    data: form.serialize(),
                }, function (data, ret) {
                    textarea.val(data.command);
                    return false;
                });
            });
            $(document).on('click', ".btn-execute", function () {
                var form = $(this).closest("form");
                var textarea = $("textarea[rel=result]", form);
                textarea.val('');
                Fast.api.ajax({
                    url: "command/command/action/execute",
                    data: form.serialize(),
                }, function (data, ret) {
                    textarea.val(data.result);
                    window.parent.$(".toolbar .btn-refresh").trigger('click');
                    top.window.Fast.api.refreshmenu();
                    return false;
                }, function () {
                    window.parent.$(".toolbar .btn-refresh").trigger('click');
                });
            });
            $("select[name='table']").trigger("change");
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
