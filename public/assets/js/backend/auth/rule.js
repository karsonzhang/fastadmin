define(['jquery', 'bootstrap', 'backend', 'table', 'form', 'template'], function ($, undefined, Backend, Table, Form, Template) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                search: true,
                advancedSearch: false,
                pagination: false,
                extend: {
                    "index_url": "auth/rule/index",
                    "add_url": "auth/rule/add",
                    "edit_url": "auth/rule/edit",
                    "del_url": "auth/rule/del",
                    "multi_url": "auth/rule/multi",
                    "table": "auth_rule"
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
                        {field: 'title', title: __('Title'), align: 'left'},
                        {field: 'icon', title: __('Icon'), formatter: Controller.api.formatter.icon},
                        {field: 'name', title: __('Name'), align: 'left'},
                        {field: 'weigh', title: __('Weigh')},
                        {field: 'status', title: __('Status'), formatter: Table.api.formatter.status},
                        {field: 'id', title: '<a href="javascript:;" class="btn btn-primary btn-xs btn-toggle"><i class="fa fa-chevron-down"></i></a>', formatter: Controller.api.formatter.subnode},
                        {field: 'operate', title: __('Operate'), events: Table.api.events.operate, formatter: Table.api.formatter.operate}
                    ]
                ]
            });

            // 为表格绑定事件
            Table.api.bindevent(table);//当内容渲染完成后

            $(document).on("click", ".btn-rebuild", function () {
                Backend.api.layer.confirm(
                        __('Are you sure you want to rebuild node?'),
                        {icon: 3, title: __('Warning'), offset: 0},
                        function (index) {
                            Backend.api.layer.close(index);
                            Backend.api.ajax({url: "auth/rule/rebuild", data: {step: 1}}, function (content) {
                                table.bootstrapTable('refresh');
                                var msg = '<div style="padding:20px;"><div class="alert alert-warning alert-light">' + __('You can change the node name if you want to') + '</div><label>' + __('Node list') + '</label><div id="treeview"></div></div>';
                                Backend.api.layer.open({
                                    type: 1,
                                    content: msg,
                                    area: ['600px', '400px'],
                                    scrollbar: false,
                                    success: function (layero, index) {
                                        require(['jstree'], function () {
                                            $("#treeview", $(layero)).jstree({
                                                "themes": {"stripes": true},
                                                "types": {
                                                    "menu": {
                                                        "icon": "fa fa-folder-open",
                                                        "valid_children": []
                                                    },
                                                    "file": {
                                                        "icon": "fa fa-file-o",
                                                        "valid_children": []
                                                    }
                                                },
                                                "plugins": ["types"],
                                                "core": {
                                                    'check_callback': true,
                                                    "data": content
                                                }
                                            }).bind("select_node.jstree", function (e, data) {
                                                var ref = $("#treeview", layero).jstree(true);
                                                ref.edit(data.node);
                                            });
                                        });
                                    }
                                    ,
                                    btn: [__('OK'), __('Cancel')],
                                    yes: function (index, layero) {
                                        //递归获取所有节点信息
                                        var get_children = function (node) {
                                            var data = [];
                                            $.each(node, function (i, j) {
                                                data.push({id: j.id, name: j.text});
                                                data = data.concat(get_children(j.children));
                                            });
                                            return data;
                                        };
                                        var data = get_children($("#treeview").jstree('get_json'));
                                        Backend.api.ajax({url: "auth/rule/rebuild", data: {step: 2, data: data}}, function (content) {
                                            Backend.api.layer.close(index);
                                            top.location.reload();
                                        });
                                    }
                                });

                            });
                        }
                );
            });
            //默认隐藏所有子节点
            table.on('post-body.bs.table', function (e, settings, json, xhr) {
                $("a.btn[data-id][data-pid][data-pid!=0]").closest("tr").hide();
            });
            //显示隐藏子节点
            $(document.body).on("click", ".btn-node-sub", function (e) {
                var status = typeof status !== 'undefined' ? status : $(this).closest("tr").hasClass("selected");
                $("a.btn[data-pid='" + $(this).data("id") + "']").each(function () {
                    $(this).closest("tr").toggle(status).toggleClass("selected", status);
                    $(this).closest("tr").find("input[type=checkbox]").prop("checked", status);
                    // 展示全部子节点
                    // $(this).trigger("click", status);
                });
                return false;
            });
            $(document.body).on("click", ".btn-toggle", function (e) {
                $("a.btn[data-id][data-pid][data-pid!=0].disabled").closest("tr").hide();
                var that = this;
                var show = $("i", that).hasClass("fa-chevron-down");
                $("i", that).toggleClass("fa-chevron-down", !show);
                $("i", that).toggleClass("fa-chevron-up", show);
                $("a.btn[data-id][data-pid][data-pid!=0]").not('.disabled').closest("tr").toggle(show);
            });
            $(document.body).on("click", ".btn-toggle-all", function (e) {
                var that = this;
                var show = $("i", that).hasClass("fa-plus");
                $("i", that).toggleClass("fa-plus", !show);
                $("i", that).toggleClass("fa-minus", show);
                $("a.btn[data-id][data-pid][data-pid!=0]").closest("tr").toggle(show);
            });
        },
        add: function () {
            Controller.api.bindevent();
        },
        edit: function () {
            Controller.api.bindevent();
        },
        api: {
            formatter: {
                icon: function (value, row, index) {
                    return '<i class="' + value + '"></i>';
                },
                subnode: function (value, row, index) {
                    return '<a href="javascript:;" data-id="' + row['id'] + '" data-pid="' + row['pid'] + '" class="btn btn-primary btn-xs ' + (row['haschild'] == 1 ? '' : 'disabled') + ' btn-node-sub"><i class="fa fa-sitemap"></i></a>';
                }
            },
            bindevent: function () {
                var iconlist = [];
                Form.api.bindevent($("form[role=form]"));
                $(document).on('click', ".btn-search-icon", function () {
                    if (iconlist.length == 0) {
                        $.get(requirejs.s.contexts._.config.config.config.site.cdnurl + "/assets/libs/font-awesome/less/variables.less", function (ret) {
                            var exp = /fa-var-(.*):/ig;
                            var result;
                            while ((result = exp.exec(ret)) != null) {
                                iconlist.push(result[1]);
                            }
                            Layer.open({
                                type: 1,
                                area: ['460px', '300px'], //宽高
                                content: Template('chooseicontpl', {iconlist: iconlist})
                            });
                        });
                    } else {
                        Layer.open({
                            type: 1,
                            area: ['460px', '300px'], //宽高
                            content: Template('chooseicontpl', {iconlist: iconlist})
                        });
                    }
                });
                $(document).on('click', '#chooseicon ul li', function () {
                    $("input[name='row[icon]']").val('fa fa-' + $(this).data("font"));
                    Layer.closeAll();
                });
                $(document).on('keyup', 'input.js-icon-search', function () {
                    $("#chooseicon ul li").show();
                    if ($(this).val() != '') {
                        $("#chooseicon ul li:not([data-font*='" + $(this).val() + "'])").hide();
                    }
                });
            }
        }
    };
    return Controller;
});