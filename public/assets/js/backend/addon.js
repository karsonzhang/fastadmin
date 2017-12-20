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
                search: false,
                showColumns: false,
                showToggle: false,
                showExport: false,
                commonSearch: true,
                searchFormVisible: false,
                pageSize: 12
            });

            // 为表格绑定事件
            Table.api.bindevent(table);

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
                var userinfo = Controller.api.userinfo.get();
                var uid = userinfo ? userinfo.id : 0;
                var token = userinfo ? userinfo.token : '';
                var install = function (name, force) {
                    Fast.api.ajax({
                        url: 'addon/install',
                        data: {name: name, force: force ? 1 : 0, uid: uid, token: token}
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