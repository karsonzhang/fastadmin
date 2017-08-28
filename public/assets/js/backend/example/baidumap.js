define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {
    var Controller = {
        index: function () {
            //
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'example/baidumap/index',
                    add_url: 'example/baidumap/add',
                    edit_url: 'example/baidumap/edit',
                    del_url: 'example/baidumap/del',
                    multi_url: 'example/baidumap/multi',
                    table: '',
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
                        {field: 'id', title: 'ID', operate: false},
                        {field: 'admin_id', title: __('Admin_id'), visible: false, operate: false},
                        {field: 'username', title: __('Username'), formatter: Table.api.formatter.search},
                        {field: 'title', title: __('Title')},
                        {field: 'url', title: __('Url'), align: 'left'},
                        {field: 'ip', title: __('IP')},
                        {field: 'createtime', title: __('Create time'), formatter: Table.api.formatter.datetime},
                        {field: 'operate', title: __('Operate'), table:table, events: Table.api.events.operate, formatter: Table.api.formatter.operate}
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
        map: function () {
            Form.api.bindevent($("form[role=form]"));
            //$("<div id='allmap'></div>").appendTo(document.body);
            // 百度地图API功能
            var map = new BMap.Map("allmap");
            var point = new BMap.Point(116.404, 39.915);
            map.centerAndZoom(point, 15);
            var marker = new BMap.Marker(point);  // 创建标注
            map.addOverlay(marker);               // 将标注添加到地图中
            marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画

            map.centerAndZoom(point, 12);

            var geolocation = new BMap.Geolocation();
            geolocation.getCurrentPosition(function (r) {
                if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                    var mk = new BMap.Marker(r.point);
                    map.addOverlay(mk);
                    map.panTo(r.point);
                    //Layer.alert('您的位置：' + r.point.lng + ',' + r.point.lat);
                } else {
                    Layer.alert('failed' + this.getStatus());
                }
            }, {enableHighAccuracy: true});
        },
        api: {
            bindevent: function () {
                Form.api.bindevent($("form[role=form]"));
            }
        }
    };
    return Controller;
});