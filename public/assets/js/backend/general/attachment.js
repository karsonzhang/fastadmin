define(['jquery', 'bootstrap', 'backend', 'form', 'table', 'config'], function ($, undefined, Backend, Form, Table, Config) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'general/attachment/index',
                    add_url: 'general/attachment/add',
                    edit_url: 'general/attachment/edit',
                    del_url: 'general/attachment/del',
                    multi_url: 'general/attachment/multi',
                    table: 'attachment'
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
                        {field: 'url', title: __('Preview'), formatter: Controller.api.formatter.thumb},
                        {field: 'url', title: __('Url'), formatter: Controller.api.formatter.url},
                        {field: 'imagewidth', title: __('Imagewidth')},
                        {field: 'imageheight', title: __('Imageheight')},
                        {field: 'imagetype', title: __('Imagetype')},
                        {field: 'imageframes', title: __('Imageframes')},
                        {field: 'filesize', title: __('Filesize')},
                        {field: 'mimetype', title: __('Mimetype')},
                        {field: 'createtime', title: __('Createtime'), formatter: Table.api.formatter.datetime},
                        {field: 'operate', title: __('Operate'), events: Table.api.events.operate, formatter: Table.api.formatter.operate}
                    ]
                ],
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
                thumb: function (value, row, index) {
                    //console.log(row);
                    if (row.mimetype.indexOf("image") > -1) {
                        var reg = /ajax\/upload$/;
                        if (reg.test(Config.upload.uploadurl)) {
                            return '<a href="' + Config.upload.cdnurl + value + '" target="_blank"><img src="' + Config.upload.cdnurl + value + '" alt="" style="max-height:90px;max-width:120px"></a>';
                        } else {
                            return '<a href="' + Config.upload.cdnurl + value + '" target="_blank"><img src="' + Config.upload.cdnurl + value + '!/fwfh/50x50" alt=""></a>';
                        }
                    } else {
                        return '无';
                    }
                },
                url: function (value, row, index) {
                    return '<a href="' + Config.upload.cdnurl + value + '" target="_blank" class="label bg-green">' + value + '</a>';
                },
            }
        }

    };
    return Controller;
});