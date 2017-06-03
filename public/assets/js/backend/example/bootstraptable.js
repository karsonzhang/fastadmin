define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'example/bootstraptable/index',
                    add_url: '',
                    edit_url: '',
                    del_url: 'example/bootstraptable/del',
                    multi_url: '',
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                columns: [
                    [
                        {field: 'state', checkbox: true, },
                        {field: 'id', title: 'ID', operate: false},
                        //使用Table.api.formatter.search可直接响应搜索
                        {field: 'username', title: __('Username'), formatter: Table.api.formatter.search},
                        {field: 'title', title: __('Title'),
                            operate: 'LIKE %...%',
                            placeholder: '模糊搜索，*表示任意字符',
                            style: 'width:200px',
                            process: function (value, arg) {
                                return value.replace(/\*/g, '%');
                            }
                        },
                        {field: 'url', title: __('Url'), align: 'left', formatter: Controller.api.formatter.url},
                        //点击IP时同时执行搜索此IP,同时普通搜索使用下拉列表的形式
                        {field: 'ip', title: __('IP'), searchList: ['127.0.0.1', '127.0.0.2'], events: Controller.api.events.ip, formatter: Controller.api.formatter.ip},
                        //browser是一个不存在的字段
                        //通过formatter来渲染数据,同时为它添加上事件
                        {field: 'browser', title: __('Browser'), operate: false, events: Controller.api.events.browser, formatter: Controller.api.formatter.browser},
                        //启用时间段搜索
                        {field: 'createtime', title: __('Create time'), formatter: Table.api.formatter.datetime, operate: 'BETWEEN', type: 'datetime', addclass: 'datetimepicker', data: 'data-date-format="YYYY-MM-DD HH:mm:ss"'},
                        //我们向操作栏额外添加上一个详情按钮,并保留已有的编辑和删除控制,同时为这个按钮添加上点击事件
                        {field: 'operate', title: __('Operate'), events: Controller.api.events.operate, formatter: Controller.api.formatter.operate}
                    ],
                ],
                //禁用默认搜索
                search: false,
                //启用普通表单搜索
                commonSearch: true,
                //可以控制是否默认显示搜索单表,false则隐藏,默认为false
                searchFormVisible: true
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
            },
            formatter: {
                url: function (value, row, index) {
                    return '<div class="input-group input-group-sm" style="width:250px;"><input type="text" class="form-control input-sm" value="' + value + '"><span class="input-group-btn input-group-sm"><a href="' + value + '" target="_blank" class="btn btn-default btn-sm"><i class="fa fa-link"></i></a></span></div>';
                },
                ip: function (value, row, index) {
                    return '<a class="btn btn-xs btn-ip bg-success"><i class="fa fa-map-marker"></i> ' + value + '</a>';
                },
                browser: function (value, row, index) {
                    //这里我们直接使用row的数据
                    return '<a class="btn btn-xs btn-browser">' + row.useragent.split(" ")[0] + '</a>';
                },
                operate: function (value, row, index) {
                    //返回字符串加上Table.api.formatter.operate的结果
                    //默认需要按需显示排序/编辑/删除按钮,则需要在Table.api.formatter.operate将table传入
                    //传入了table以后如果edit_url为空则不显示编辑按钮,如果del_url为空则不显显删除按钮
                    return '<a class="btn btn-info btn-xs btn-detail">' + __('Detail') + '</a> '
                            + Table.api.formatter.operate(value, row, index, $("#table"));
                },
            },
            events: {
                ip: {
                    'click .btn-ip': function (e, value, row, index) {
                        var options = $("#table").bootstrapTable('getOptions');
                        //这里我们手动将数据填充到表单然后提交
                        $("#commonSearchContent_" + options.idTable + " form input[name='ip']").val(value);
                        $("#commonSearchContent_" + options.idTable + " form").trigger('submit');
                        Toastr.info("执行了自定义搜索操作");
                    }
                },
                browser: {
                    'click .btn-browser': function (e, value, row, index) {
                        Layer.alert("该行数据为: <code>" + JSON.stringify(row) + "</code>");
                    }
                },
                operate: $.extend({
                    'click .btn-detail': function (e, value, row, index) {
                        Backend.api.open('example/bootstraptable/detail/ids/' + row['id'], __('Detail'));
                    }
                }, Table.api.events.operate)
            }
        }
    };
    return Controller;
});