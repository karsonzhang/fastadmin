define(['jquery', 'bootstrap', 'backend', 'form', 'table'], function ($, undefined, Backend, Form, Table) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'order/index',
                    add_url: 'order/add',
                    edit_url: 'order/edit',
                    del_url: 'order/del',
                    multi_url: 'order/multi',
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
                        {field: 'user_id', title: __('User_id')},
                        {field: 'book_id', title: __('Book_id')},
                        {field: 'title', title: __('Title')},
                        {field: 'author', title: __('Author')},
                        {field: 'amount', title: __('Amount')},
                        {field: 'saleamount', title: __('Saleamount')},
                        {field: 'nums', title: __('Nums')},
                        {field: 'payamount', title: __('Payamount')},
                        {field: 'paytime', title: __('Paytime'), formatter: Table.api.formatter.datetime},
                        {field: 'paytype', title: __('Paytype')},
                        {field: 'createtime', title: __('Createtime'), formatter: Table.api.formatter.datetime},
                        {field: 'status', title: __('Status'), formatter: Controller.api.formatter.status},
                        {field: 'operate', title: __('Operate'), events: Table.api.events.operate, formatter: Table.api.formatter.operate}
                    ]
                ]
            });

            // 为表格绑定事件
            Table.api.bindevent(table);

            $(document).on('click', '.btn-filter-paid', function () {
                table.bootstrapTable('refresh', {query: {filter: JSON.stringify({status: 'paid'}), op: JSON.stringify({status: '='})}});
            });

        },
        add: function () {
            Controller.api.bindevent();
        },
        edit: function () {
            Controller.api.bindevent();
        },
        volume: function () {
            Controller.api.bindevent();

            require(['angular', 'angular-app', 'angular-ui-select', 'ngcontrol/volume'], function (angular, app, printapp) {
                angular.bootstrap(document, ["ui.select", "App"]);
            });
        },
        print: function () {
            require(['frontend-ebook'], function (Ebook) {
                window.imageLoaded = Ebook.imageLoaded;
                $(".ebook_container").on("load", "img", function () {
                    $(this).parent().removeClass('img_loading');
                });
                require(['angular', 'angular-app', 'ngcontrol/preface', 'ngcontrol/preview'], function (angular, app) {
                    angular.bootstrap(document, ["App"]);
                });
            });
        },
        api: {
            bindevent: function () {
                Form.api.bindevent($("form[role=form]"));

                $(document).bind("change", "input[name='row[status]']", function(){
                    $("#expressdom").toggleClass("hidden", ['created', 'paid', 'printing', 'deleted'].indexOf($("input[name='row[status]']:checked").val())>-1);
                });
            },
            formatter: {
                icon: function (value, row, index) {
                    //渲染fontawesome图标
                    return '<i class="fa fa-' + value + '"></i> ' + value;
                },
                status: function (value, row, index) {
                    //渲染状态
                    var html = '';
                    if (value == 'created') {
                        html = '<span class="text-purple"><i class="fa fa-circle"></i> ' + __('Created') + '</span>';
                    } else if (value == 'paid') {
                        html = '<a href="/order/volume/ids/' + row['id'] + '" class="btn btn-danger btn-xs btn-dialog" title="' + __('Print') + '"><i class="fa fa-print"></i> ' + __('Paid,Print Now') + '</a>';
                    } else if (value == 'printing') {
                        html = '<span class="text-warning"><i class="fa fa-print"></i> ' + __('Printing') + '</span>';
                    } else if (value == 'delivered') {
                        html = '<span class="text-success"><i class="fa fa-circle"></i> ' + __('Delivered') + '</span>';
                    } else if (value == 'finished') {
                        html = '<span class="text-info"><i class="fa fa-ok"></i> ' + __('Finished') + '</span>';
                    } else if (value == 'deleted') {
                        html = '<span class="text-maroon"><i class="fa fa-remove"></i> ' + __('Deleted') + '</span>';
                    }
                    return html;
                },
            }
        }

    };
    return Controller;
});