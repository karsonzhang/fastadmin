define(['jquery', 'bootstrap', 'backend', 'table', 'form', 'template'], function ($, undefined, Backend, Table, Form, Template) {
    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: Config.fastadmin.api_url + '/addon/index',
                    add_url: '',
                    edit_url: '',
                    del_url: '',
                    multi_url: ''
                }
            });

            var table = $("#table");

            table.on('post-body.bs.table', function (e, settings, json, xhr) {
                var parenttable = table.closest('.bootstrap-table');
                var d = $(".fixed-table-toolbar", parenttable).find(".search input");
                d.off("keyup drop blur");
                d.on("keyup", function (e) {
                    if (e.keyCode == 13) {
                        var that = this;
                        var options = table.bootstrapTable('getOptions');
                        var queryParams = options.queryParams;
                        options.pageNumber = 1;
                        options.queryParams = function (params) {
                            var params = queryParams(params);
                            params.search = $(that).val();
                            return params;
                        };
                        table.bootstrapTable('refresh', {});
                    }
                });
            });

            Template.helper("Moment", Moment);
            Template.helper("addons", Config['addons']);

            // 初始化表格
            table.bootstrapTable({
                url: location.protocol === "https:" ? "addon/downloaded" : $.fn.bootstrapTable.defaults.extend.index_url,
                columns: [
                    [
                        {field: 'id', title: 'ID', operate: false},
                        {field: 'name', title: __('Name'), operate: false},
                        {field: 'title', title: __('Title'), operate: 'LIKE'}
                    ]
                ],
                dataType: 'jsonp',
                templateView: true,
                search: true,
                showColumns: false,
                showToggle: false,
                showExport: false,
                commonSearch: false,
                searchFormVisible: false,
                pageSize: 12,
                queryParams: function (params) {
                    var filter = params.filter ? JSON.parse(params.filter) : {};
                    var op = params.op ? JSON.parse(params.op) : {};
                    filter.faversion = Config.fastadmin.version;
                    op.faversion = "=";
                    params.filter = JSON.stringify(filter);
                    params.op = JSON.stringify(op);
                    return params;
                }
            });

            // 为表格绑定事件
            Table.api.bindevent(table);

            table.on('click', '.btn-addoninfo', function (event) {
                var index = parseInt($(this).data("index"));
                var data = table.bootstrapTable("getData");
                var item = data[index];
                var addon = typeof Config.addons[item.name] != 'undefined' ? Config.addons[item.name] : null;
                Layer.alert(Template("addoninfotpl", {item: item, addon: addon}), {
                    btn: [__('OK'), __('Donate'), __('Feedback'), __('Document')],
                    title: __('Detail'),
                    area: ['450px', '490px'],
                    btn2: function () {
                        //打赏
                        Layer.open({
                            content: Template("paytpl", {payimg: item.donateimage}),
                            shade: 0.8,
                            area: ['800px', '600px'],
                            skin: 'layui-layer-msg layui-layer-pay',
                            title: false,
                            closeBtn: true,
                            btn: false,
                            resize: false,
                        });
                    },
                    btn3: function () {
                        return false;
                    },
                    btn4: function () {
                        return false;
                    },
                    success: function (layero, index) {
                        $(".layui-layer-btn2", layero).attr("href", "http://forum.fastadmin.net/t/bug?ref=addon&name=" + item.name).attr("target", "_blank");
                        $(".layui-layer-btn3", layero).attr("href", "http://www.fastadmin.net/store/" + item.name + ".html?ref=addon").attr("target", "_blank");
                    }
                });
            });

            // 如果是https则启用提示
            if (location.protocol === "https:") {
                $("#warmtips").removeClass("hide");
                $(".btn-switch,.btn-userinfo").addClass("disabled");
            }

            require(['upload'], function (Upload) {
                Upload.api.plupload("#plupload-addon", function (data, ret) {
                    Config['addons'][data.addon.name] = data.addon;
                    $('.btn-refresh').trigger('click');
                    Toastr.success(ret.msg);
                });
            });

            //查看插件首页
            $(document).on("click", ".btn-addonindex", function () {
                if ($(this).attr("href") == 'javascript:;') {
                    Layer.msg(__('Not installed tips'), {icon: 7});
                } else if ($(this).closest(".operate").find("a.btn-enable").size() > 0) {
                    Layer.msg(__('Not enabled tips'), {icon: 7});
                    return false;
                }
            });
            //切换URL
            $(document).on("click", ".btn-switch", function () {
                $(".btn-switch").removeClass("active");
                $(this).addClass("active");
                table.bootstrapTable('refresh', {url: $(this).data("url"), pageNumber: 1});
            });
            // 会员信息
            $(document).on("click", ".btn-userinfo", function () {
                var userinfo = Controller.api.userinfo.get();
                if (!userinfo) {
                    Layer.open({
                        content: Template("logintpl", {}),
                        area: ['400px', '330px'],
                        title: __('Login FastAdmin'),
                        resize: false,
                        btn: [__('Login'), __('Register')],
                        yes: function (index, layero) {
                            Fast.api.ajax({
                                url: Config.fastadmin.api_url + '/user/login',
                                dataType: 'jsonp',
                                data: {account: $("#inputAccount", layero).val(), password: $("#inputPassword", layero).val(), _method: 'POST'}
                            }, function (data, ret) {
                                Controller.api.userinfo.set(data);
                                Layer.closeAll();
                                Layer.alert(ret.msg);
                            }, function (data, ret) {
                                Layer.alert(ret.msg);
                            });
                        },
                        btn2: function () {
                            return false;
                        },
                        success: function (layero, index) {
                            $(".layui-layer-btn1", layero).prop("href", "http://www.fastadmin.net/user/register.html").prop("target", "_blank");
                        }
                    });
                } else {
                    var userinfo = Controller.api.userinfo.get();
                    if (!userinfo) {
                        Layer.alert(__('You\'re not login'));
                        return false;
                    }
                    Layer.open({
                        content: Template("userinfotpl", userinfo),
                        area: ['400px', '330px'],
                        title: __('Userinfo'),
                        resize: false,
                        btn: [__('Logout'), __('Cancel')],
                        yes: function () {
                            Fast.api.ajax({
                                url: Config.fastadmin.api_url + '/user/logout',
                                dataType: 'jsonp',
                                data: {uid: userinfo.id, token: userinfo.token}
                            }, function (data, ret) {
                                Controller.api.userinfo.set(null);
                                Layer.closeAll();
                                Layer.alert(ret.msg);
                            }, function (data, ret) {
                                Controller.api.userinfo.set(null);
                                Layer.closeAll();
                                Layer.alert(ret.msg);
                            });
                        }
                    });
                }
            });

            // 点击安装
            $(document).on("click", ".btn-install", function () {
                var that = this;
                var name = $(this).closest(".operate").data("name");
                var version = $(this).data("version");
                var userinfo = Controller.api.userinfo.get();
                var uid = userinfo ? userinfo.id : 0;
                var token = userinfo ? userinfo.token : '';
                var install = function (name, force) {
                    Fast.api.ajax({
                        url: 'addon/install',
                        data: {name: name, force: force ? 1 : 0, uid: uid, token: token, version: version, faversion: Config.fastadmin.version}
                    }, function (data, ret) {
                        Layer.closeAll();
                        Config['addons'][data.addon.name] = ret.data.addon;
                        Layer.alert(__('Online installed tips'), {
                            btn: [__('OK'), __('Donate')],
                            title: __('Warning'),
                            icon: 1,
                            btn2: function () {
                                //打赏
                                Layer.open({
                                    content: Template("paytpl", {payimg: $(that).data("donateimage")}),
                                    shade: 0.8,
                                    area: ['800px', '600px'],
                                    skin: 'layui-layer-msg layui-layer-pay',
                                    title: false,
                                    closeBtn: true,
                                    btn: false,
                                    resize: false,
                                });
                            }
                        });
                        $('.btn-refresh').trigger('click');
                    }, function (data, ret) {
                        //如果是需要购买的插件则弹出二维码提示
                        if (ret && ret.code === -1) {
                            //扫码支付
                            Layer.open({
                                content: Template("paytpl", ret.data),
                                shade: 0.8,
                                area: ['800px', '600px'],
                                skin: 'layui-layer-msg layui-layer-pay',
                                title: false,
                                closeBtn: true,
                                btn: false,
                                resize: false,
                                end: function () {
                                    Layer.alert(__('Pay tips'));
                                }
                            });
                        } else if (ret && ret.code === -2) {
                            //跳转支付
                            Layer.alert(__('Pay click tips'), {
                                btn: [__('Pay now'), __('Cancel')],
                                icon: 0,
                                success: function (layero) {
                                    $(".layui-layer-btn0", layero).attr("href", ret.data.payurl).attr("target", "_blank");
                                }
                            }, function () {
                                Layer.alert(__('Pay new window tips'), {icon: 0});
                            });

                        } else if (ret && ret.code === -3) {
                            //插件目录发现影响全局的文件
                            Layer.open({
                                content: Template("conflicttpl", ret.data),
                                shade: 0.8,
                                area: ['800px', '600px'],
                                title: __('Warning'),
                                btn: [__('Continue install'), __('Cancel')],
                                end: function () {

                                },
                                yes: function () {
                                    install(name, true);
                                }
                            });

                        } else {
                            Layer.alert(ret.msg);
                        }
                        return false;
                    });
                };
                if ($(that).data("type") !== 'free') {
                    if (parseInt(uid) === 0) {
                        return Layer.alert(__('Not login tips'), {
                            title: __('Warning'),
                            btn: [__('Login now'), __('Continue install')],
                            yes: function (index, layero) {
                                $(".btn-userinfo").trigger("click");
                            },
                            btn2: function () {
                                install(name, false);
                            }
                        });
                    }
                }
                install(name, false);
            });

            //点击卸载
            $(document).on("click", ".btn-uninstall", function () {
                var name = $(this).closest(".operate").data("name");
                var uninstall = function (name, force) {
                    Fast.api.ajax({
                        url: 'addon/uninstall',
                        data: {name: name, force: force ? 1 : 0}
                    }, function (data, ret) {
                        delete Config['addons'][name];
                        Layer.closeAll();
                        $('.btn-refresh').trigger('click');
                    }, function (data, ret) {
                        if (ret && ret.code === -3) {
                            //插件目录发现影响全局的文件
                            Layer.open({
                                content: Template("conflicttpl", ret.data),
                                shade: 0.8,
                                area: ['800px', '600px'],
                                title: __('Warning'),
                                btn: [__('Continue uninstall'), __('Cancel')],
                                end: function () {

                                },
                                yes: function () {
                                    uninstall(name, true);
                                }
                            });

                        } else {
                            Layer.alert(ret.msg);
                        }
                        return false;
                    });
                };
                Layer.confirm(__('Uninstall tips'), function () {
                    uninstall(name, false);
                });
            });

            //点击配置
            $(document).on("click", ".btn-config", function () {
                var name = $(this).closest(".operate").data("name");
                Fast.api.open("addon/config?name=" + name, __('Setting'));
            });

            //点击启用/禁用
            $(document).on("click", ".btn-enable,.btn-disable", function () {
                var name = $(this).closest(".operate").data("name");
                var action = $(this).data("action");
                var operate = function (name, action, force) {
                    Fast.api.ajax({
                        url: 'addon/state',
                        data: {name: name, action: action, force: force ? 1 : 0}
                    }, function (data, ret) {
                        var addon = Config['addons'][name];
                        addon.state = action === 'enable' ? 1 : 0;
                        Layer.closeAll();
                        $('.btn-refresh').trigger('click');
                    }, function (data, ret) {
                        if (ret && ret.code === -3) {
                            //插件目录发现影响全局的文件
                            Layer.open({
                                content: Template("conflicttpl", ret.data),
                                shade: 0.8,
                                area: ['800px', '600px'],
                                title: __('Warning'),
                                btn: [__('Continue operate'), __('Cancel')],
                                end: function () {

                                },
                                yes: function () {
                                    operate(name, action, true);
                                }
                            });

                        } else {
                            Layer.alert(ret.msg);
                        }
                        return false;
                    });
                };
                operate(name, action, false);
            });

            //点击升级
            $(document).on("click", ".btn-upgrade", function () {
                if ($(this).closest(".operate").find("a.btn-disable").size() > 0) {
                    Layer.alert(__('Please disable addon first'), {icon: 7});
                    return false;
                }
                var name = $(this).closest(".operate").data("name");
                var version = $(this).data("version");
                var userinfo = Controller.api.userinfo.get();
                var uid = userinfo ? userinfo.id : 0;
                var token = userinfo ? userinfo.token : '';
                var upgrade = function (name) {
                    Fast.api.ajax({
                        url: 'addon/upgrade',
                        data: {name: name, uid: uid, token: token, version: version, faversion: Config.fastadmin.version}
                    }, function (data, ret) {
                        Config['addons'][name].version = version;
                        Layer.closeAll();
                        $('.btn-refresh').trigger('click');
                    }, function (data, ret) {
                        Layer.alert(ret.msg);
                        return false;
                    });
                };
                Layer.confirm(__('Upgrade tips'), function () {
                    upgrade(name);
                });
            });

            $(document).on("click", ".operate .btn-group .dropdown-toggle", function () {
                $(this).closest(".btn-group").toggleClass("dropup", $(document).height() - $(this).offset().top <= 200);
            });
        },
        add: function () {
            Controller.api.bindevent();
        },
        config: function () {
            Controller.api.bindevent();
        },
        api: {
            bindevent: function () {
                Form.api.bindevent($("form[role=form]"));
            },
            userinfo: {
                get: function () {
                    var userinfo = localStorage.getItem("fastadmin_userinfo");
                    return userinfo ? JSON.parse(userinfo) : null;
                },
                set: function (data) {
                    if (data) {
                        localStorage.setItem("fastadmin_userinfo", JSON.stringify(data));
                    } else {
                        localStorage.removeItem("fastadmin_userinfo");
                    }
                }
            }
        }
    };
    return Controller;
});