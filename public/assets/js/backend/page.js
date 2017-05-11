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
                        {field: 'id', title: __('Id'), operate: false},
                        {field: 'category_id', title: __('Category_id'), operate: '='},
                        {field: 'title', title: __('Title'), operate: 'LIKE %...%', placeholder: '标题，模糊搜索，*表示任意字符', style: 'width:200px',
                            process: function (value, arg) {
                                return value.replace(/\*/g, '%'); //仅演示用法
                            }
                        },
                        {field: 'keywords', title: __('Keywords'), operate: 'LIKE %...%', placeholder: '关键字，模糊搜索'},
                        {field: 'flag', title: __('Flag'), formatter: Table.api.formatter.flag, operate: false},
                        {field: 'image', title: __('Image'), formatter: Table.api.formatter.image, operate: false},
                        {field: 'icon', title: __('Icon'), formatter: Table.api.formatter.icon, operate: false},
                        {field: 'views', title: __('Views'), operate: false},
                        {field: 'comments', title: __('Comments'), operate: false},
                        {field: 'weigh', title: __('Weigh'), operate: false},
                        {field: 'status', title: __('Status'), formatter: Table.api.formatter.status, searchList: {'normal': '正常', 'hidden': '隐藏'}, style: 'min-width:100px;'},
                        {field: 'createtime', title: __('Create Time'), formatter: Table.api.formatter.datetime, operate: 'BETWEEN', type: 'datetime', addclass: 'datetimepicker', data: 'data-date-format="YYYY-MM-DD"'},
                        {field: 'operate', title: __('Operate'), events: Table.api.events.operate, formatter: Table.api.formatter.operate}
                    ]
                ],
                //普通搜索
                commonSearch: true,
                titleForm: '', //为空则不显示标题，不定义默认显示：普通搜索
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
                $("form[role=form]").validator({
                    rules: {
                        mobile: [/^1[3-9]\d{9}$/, "请填写有效的手机号"],
                        chinese: [/^[\u0391-\uFFE5]+$/, "请填写中文字符"],
                        // 使用函数定义规则
                        phone: function (elem, param) {
                            return /^1[3458]\d{9}$/.test($(elem).val()) || '请检查手机号格式';
                        },
                        image: function (elem, param) {
                            return /^\/(.*)\.(jpg|jpeg|png|gif)$/.test($(elem).val()) || '请上传有并行的图片文件';
                        }
                    },
                    messages: {
                    },
                    fields: {
                        'row[title]': "required;length(3~16)",
                        'row[image]': "required;image",
                        'row[views]': "required;range[0~100]",
                        'row[content]': "required"
                    },
                });
                Form.api.bindevent($("form[role=form]"));
            }
        }
    };
    return Controller;
});