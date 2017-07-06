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
                        //该列为复选框字段,如果后台的返回state值将会默认选中
                        {field: 'state', checkbox: true, },
                        {field: 'id', title: 'ID', operate: false},
                        //默认隐藏该列
                        {field: 'admin_id', title: __('Admin_id'), visible: false, operate: false},
                        //直接响应搜索
                        {field: 'username', title: __('Username'), formatter: Table.api.formatter.search},
                        //模糊搜索
                        {field: 'title', title: __('Title'), operate: 'LIKE %...%', placeholder: '模糊搜索，*表示任意字符', style: 'width:200px'},
                        //通过Ajax渲染searchList，也可以使用JSON数据
                        {field: 'url', title: __('Url'), align: 'left', searchList: $.getJSON('ajax/typeahead?search=a&field=row[user_id]'), formatter: Controller.api.formatter.url},
                        //点击IP时同时执行搜索此IP,同时普通搜索使用下拉列表的形式
                        {field: 'ip', title: __('IP'), searchList: ['127.0.0.1', '127.0.0.2'], events: Controller.api.events.ip, formatter: Controller.api.formatter.ip},
                        //自定义栏位
                        {field: 'custom', title: __('Custom'), operate: false, formatter: Controller.api.formatter.custom},
                        //browser是一个不存在的字段
                        //通过formatter来渲染数据,同时为它添加上事件
                        {field: 'browser', title: __('Browser'), operate: false, events: Controller.api.events.browser, formatter: Controller.api.formatter.browser},
                        //启用时间段搜索
                        {field: 'createtime', title: __('Create time'), formatter: Table.api.formatter.datetime, operate: 'BETWEEN', type: 'datetime', addclass: 'datetimepicker', data: 'data-date-format="YYYY-MM-DD HH:mm:ss"'},
                        //我们向操作栏额外添加上一个详情按钮,并保留已有的编辑和删除控制,同时为这个按钮添加上点击事件
                        {field: 'operate', title: __('Operate'), events: Controller.api.events.operate, formatter: function (value, row, index) {
                                var detail = '<a class="btn btn-xs btn-success btn-detail">详情</a> ';
                                return detail + Table.api.formatter.operate.call(this, value, row, index, table);
                            }}
                    ],
                ],
                //禁用默认搜索
                search: false,
                //启用普通表单搜索
                commonSearch: true,
                //可以控制是否默认显示搜索单表,false则隐藏,默认为false
                searchFormVisible: true
            });

            //在表格内容渲染完成后回调的事件
            table.on('post-body.bs.table', function (e, settings, json, xhr) {

            });

            // 为表格绑定事件
            Table.api.bindevent(table);

            //指定搜索条件
            $(document).on("click", ".btn-singlesearch", function () {
                var options = table.bootstrapTable('getOptions');
                options.pageNumber = 1;
                options.queryParams = function (params) {
                    return {
                        search: params.search,
                        sort: params.sort,
                        order: params.order,
                        filter: JSON.stringify({admin_id: 1}),
                        op: JSON.stringify({admin_id: '='}),
                        offset: params.offset,
                        limit: params.limit,
                    };
                };
                table.bootstrapTable('refresh', {});
                Toastr.info("当前执行的是自定义搜索");
                return false;
            });

            //获取选中项
            $(document).on("click", ".btn-selected", function () {
                Layer.alert(JSON.stringify(table.bootstrapTable('getSelections')));
            });

            //启动和暂停按钮
            $(document).on("click", ".btn-start,.btn-pause", function () {
                //在table外不可以使用添加.btn-change的方法
                //只能自己调用Table.api.multi实现
                Table.api.multi("changestatus", 0, table, this);
            });

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
            formatter: {//渲染的方法
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
                custom: function (value, row, index) {
                    //添加上btn-change可以自定义请求的URL进行数据处理
                    return '<a class="btn btn-xs btn-danger btn-change" data-url="example/bootstraptable/change" data-id="' + row.id + '">' + __('Locked') + '</a>';
                },
                operate: function (value, row, index) {
                    //返回字符串加上Table.api.formatter.operate的结果
                    //默认需要按需显示排序/编辑/删除按钮,则需要在Table.api.formatter.operate将table传入
                    //传入了table以后如果edit_url为空则不显示编辑按钮,如果del_url为空则不显显删除按钮
                    return '<a class="btn btn-info btn-xs btn-detail"><i class="fa fa-list"></i> ' + __('Detail') + '</a> '
                            + Table.api.formatter.operate(value, row, index, $("#table"));
                },
            },
            events: {//绑定事件的方法
                ip: {
                    //格式为：方法名+空格+DOM元素
                    'click .btn-ip': function (e, value, row, index) {
                        e.stopPropagation();
                        console.log();
                        var container = $("#table").data("bootstrap.table").$container;
                        var options = $("#table").bootstrapTable('getOptions');
                        //这里我们手动将数据填充到表单然后提交
                        $("form.form-commonsearch [name='ip']", container).val(value);
                        $("form.form-commonsearch", container).trigger('submit');
                        Toastr.info("执行了自定义搜索操作");
                    }
                },
                browser: {
                    'click .btn-browser': function (e, value, row, index) {
                        e.stopPropagation();
                        Layer.alert("该行数据为: <code>" + JSON.stringify(row) + "</code>");
                    }
                },
                operate: $.extend({
                    'click .btn-detail': function (e, value, row, index) {
                        e.stopPropagation();
                        Backend.api.open('example/bootstraptable/detail/ids/' + row['id'], __('Detail'));
                    }
                }, Table.api.events.operate)
            }
        }
    };
    return Controller;
});