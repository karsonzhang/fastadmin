define(['jquery', 'bootstrap', 'backend', 'table', 'form', 'template'], function ($, undefined, Backend, Table, Form, Template) {
    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: Config.api_url ? Config.api_url + '/addon/index' : "addon/downloaded",
                    add_url: '',
                    edit_url: '',
                    del_url: '',
                    multi_url: ''
                }
            });

            var table = $("#table");

            // 弹窗自适应宽高
            var area = Fast.config.openArea != undefined ? Fast.config.openArea : [$(window).width() > 800 ? '800px' : '95%', $(window).height() > 600 ? '600px' : '95%'];

            table.on('load-success.bs.table', function (e, json) {
                if (json && typeof json.category != 'undefined' && $(".nav-category li").size() == 2) {
                    $.each(json.category, function (i, j) {
                        $("<li><a href='javascript:;' data-id='" + j.id + "'>" + j.name + "</a></li>").insertBefore($(".nav-category li:last"));
                    });
                }
            });
            table.on('load-error.bs.table', function (e, status, res) {
                if (status == 404 && $(".btn-switch.active").data("type") != "local") {
                    Layer.confirm(__('Store now available tips'), {
                        title: __('Warmtips'),
                        btn: [__('Switch to the local'), __('Try to reload')]
                    }, function (index) {
                        layer.close(index);
                        $(".panel .nav-tabs").hide();
                        $(".toolbar > *:not(:first)").hide();
                        $(".btn-switch[data-type='local']").trigger("click");
                    }, function (index) {
                        layer.close(index);
                        table.bootstrapTable('refresh');
                    });
                    return false;
                }
            });
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

            $("#faupload-addon").data("params", function () {
                var userinfo = Controller.api.userinfo.get();
                return {
                    uid: userinfo ? userinfo.id : '',
                    token: userinfo ? userinfo.token : '',
                    version: Config.faversion
                };
            });

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                queryParams: function (params) {
                    var userinfo = Controller.api.userinfo.get();
                    $.extend(params, {
                        uid: userinfo ? userinfo.id : '',
                        token: userinfo ? userinfo.token : '',
                        version: Config.faversion
                    });
                    return params;
                },
                columns: [
                    [
                        {field: 'id', title: 'ID', operate: false, visible: false},
                        {
                            field: 'home',
                            title: __('Index'),
                            width: '50px',
                            formatter: Controller.api.formatter.home
                        },
                        {field: 'name', title: __('Name'), operate: false, visible: false, width: '120px'},
                        {
                            field: 'title',
                            title: __('Title'),
                            operate: 'LIKE',
                            align: 'left',
                            formatter: Controller.api.formatter.title
                        },
                        {field: 'intro', title: __('Intro'), operate: 'LIKE', align: 'left', class: 'visible-lg'},
                        {
                            field: 'author',
                            title: __('Author'),
                            operate: 'LIKE',
                            width: '100px',
                            formatter: Controller.api.formatter.author
                        },
                        {
                            field: 'price',
                            title: __('Price'),
                            operate: 'LIKE',
                            width: '100px',
                            align: 'center',
                            formatter: Controller.api.formatter.price
                        },
                        {
                            field: 'downloads',
                            title: __('Downloads'),
                            operate: 'LIKE',
                            width: '80px',
                            align: 'center',
                            formatter: Controller.api.formatter.downloads
                        },
                        {
                            field: 'version',
                            title: __('Version'),
                            operate: 'LIKE',
                            width: '80px',
                            align: 'center',
                            formatter: Controller.api.formatter.version
                        },
                        {
                            field: 'toggle',
                            title: __('Status'),
                            width: '80px',
                            formatter: Controller.api.formatter.toggle
                        },
                        {
                            field: 'id',
                            title: __('Operate'),
                            align: 'center',
                            table: table,
                            formatter: Controller.api.formatter.operate,
                            align: 'right'
                        },
                    ]
                ],
                responseHandler: function (res) {
                    $.each(res.rows, function (i, j) {
                        j.addon = typeof Config.addons[j.name] != 'undefined' ? Config.addons[j.name] : null;
                    });
                    return res;
                },
                dataType: 'jsonp',
                templateView: false,
                clickToSelect: false,
                search: true,
                showColumns: false,
                showToggle: false,
                showExport: false,
                showSearch: false,
                commonSearch: true,
                searchFormVisible: true,
                searchFormTemplate: 'searchformtpl',
                pageSize: 50,
            });

            // 为表格绑定事件
            Table.api.bindevent(table);

            // 离线安装
            require(['upload'], function (Upload) {
                Upload.api.upload("#faupload-addon", function (data, ret) {
                    Config['addons'][data.addon.name] = data.addon;
                    Toastr.success(ret.msg);
                    operate(data.addon.name, 'enable', false);
                    return false;
                }, function (data, ret) {
                    if (ret.msg && ret.msg.match(/(login|登录)/g)) {
                        return Layer.alert(ret.msg, {
                            title: __('Warning'),
                            btn: [__('Login now')],
                            yes: function (index, layero) {
                                $(".btn-userinfo").trigger("click");
                            }
                        });
                    }
                });

                //检测是否登录
                $(document).on("mousedown", "#faupload-addon", function (e) {
                    var userinfo = Controller.api.userinfo.get();
                    var uid = userinfo ? userinfo.id : 0;

                    if (parseInt(uid) === 0) {
                        $(".btn-userinfo").trigger("click");
                        return false;
                    }
                });
            });

            // 查看插件首页
            $(document).on("click", ".btn-addonindex", function () {
                if ($(this).attr("href") == 'javascript:;') {
                    Layer.msg(__('Not installed tips'), {icon: 7});
                } else if ($(this).closest(".operate").find("a.btn-enable").size() > 0) {
                    Layer.msg(__('Not enabled tips'), {icon: 7});
                    return false;
                }
            });

            // 切换
            $(document).on("click", ".btn-switch", function () {
                $(".btn-switch").removeClass("active");
                $(this).addClass("active");
                $("form.form-commonsearch input[name='type']").val($(this).data("type"));
                table.bootstrapTable('refresh', {url: ($(this).data("url") ? $(this).data("url") : $.fn.bootstrapTable.defaults.extend.index_url), pageNumber: 1});
                return false;
            });
            $(document).on("click", ".nav-category li a", function () {
                $(".nav-category li").removeClass("active");
                $(this).parent().addClass("active");
                $("form.form-commonsearch input[name='category_id']").val($(this).data("id"));
                table.bootstrapTable('refresh', {url: $(this).data("url"), pageNumber: 1});
                return false;
            });
            var tables = [];
            $(document).on("click", "#droptables", function () {
                if ($(this).prop("checked")) {
                    Fast.api.ajax({
                        url: "addon/get_table_list",
                        async: false,
                        data: {name: $(this).data("name")}
                    }, function (data) {
                        tables = data.tables;
                        return false;
                    });
                    var html;
                    html = tables.length > 0 ? '<div class="alert alert-warning-light droptablestips" style="max-width:480px;max-height:300px;overflow-y: auto;">' + __('The following data tables will be deleted') + '：<br>' + tables.join("<br>") + '</div>'
                        : '<div class="alert alert-warning-light droptablestips">' + __('The Addon did not create a data table') + '</div>';
                    $(html).insertAfter($(this).closest("p"));
                } else {
                    $(".droptablestips").remove();
                }
                $(window).resize();
            });

            // 会员信息
            $(document).on("click", ".btn-userinfo", function (e, name, version) {
                var that = this;
                var area = [$(window).width() > 800 ? '500px' : '95%', $(window).height() > 600 ? '400px' : '95%'];
                var userinfo = Controller.api.userinfo.get();
                if (!userinfo) {
                    Layer.open({
                        content: Template("logintpl", {}),
                        zIndex: 99,
                        area: area,
                        title: __('Login FastAdmin'),
                        resize: false,
                        btn: [__('Login'), __('Register')],
                        yes: function (index, layero) {
                            Fast.api.ajax({
                                url: Config.api_url + '/user/login',
                                dataType: 'jsonp',
                                data: {
                                    account: $("#inputAccount", layero).val(),
                                    password: $("#inputPassword", layero).val(),
                                    _method: 'POST'
                                }
                            }, function (data, ret) {
                                Controller.api.userinfo.set(data);
                                Layer.closeAll();
                                Layer.alert(ret.msg);
                            }, function (data, ret) {
                            });
                        },
                        btn2: function () {
                            return false;
                        },
                        success: function (layero, index) {
                            this.checkEnterKey = function (event) {
                                if (event.keyCode === 13) {
                                    $(".layui-layer-btn0").trigger("click");
                                    return false;
                                }
                            };
                            $(document).on('keydown', this.checkEnterKey);
                            $(".layui-layer-btn1", layero).prop("href", "http://www.fastadmin.net/user/register.html").prop("target", "_blank");
                        },
                        end: function () {
                            $(document).off('keydown', this.checkEnterKey);
                        }
                    });
                } else {
                    Fast.api.ajax({
                        url: Config.api_url + '/user/index',
                        dataType: 'jsonp',
                        data: {
                            user_id: userinfo.id,
                            token: userinfo.token,
                        }
                    }, function (data) {
                        Layer.open({
                            content: Template("userinfotpl", userinfo),
                            area: area,
                            title: __('Userinfo'),
                            resize: false,
                            btn: [__('Logout'), __('Cancel')],
                            yes: function () {
                                Fast.api.ajax({
                                    url: Config.api_url + '/user/logout',
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
                        return false;
                    }, function (data) {
                        Controller.api.userinfo.set(null);
                        $(that).trigger('click');
                        return false;
                    });

                }
            });

            var install = function (name, version, force) {
                var userinfo = Controller.api.userinfo.get();
                var uid = userinfo ? userinfo.id : 0;
                var token = userinfo ? userinfo.token : '';
                Fast.api.ajax({
                    url: 'addon/install',
                    data: {
                        name: name,
                        force: force ? 1 : 0,
                        uid: uid,
                        token: token,
                        version: version,
                        faversion: Config.faversion
                    }
                }, function (data, ret) {
                    Layer.closeAll();
                    Config['addons'][data.addon.name] = ret.data.addon;
                    Layer.alert(__('Online installed tips'), {
                        btn: [__('OK')],
                        title: __('Warning'),
                        icon: 1
                    });
                    Controller.api.refresh(table, name);
                }, function (data, ret) {
                    //如果是需要购买的插件则弹出二维码提示
                    if (ret && ret.code === -1) {
                        //扫码支付
                        Layer.open({
                            content: Template("paytpl", ret.data),
                            shade: 0.8,
                            area: area,
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
                        //如果登录已经超时,重新提醒登录
                        if (uid && uid != ret.data.uid) {
                            Controller.api.userinfo.set(null);
                            $(".operate[data-name='" + name + "'] .btn-install").trigger("click");
                            return;
                        }
                        top.Fast.api.open(ret.data.payurl, __('Pay now'), {
                            area: area,
                            end: function () {
                                top.Layer.alert(__('Pay tips'));
                            }
                        });
                    } else if (ret && ret.code === -3) {
                        //插件目录发现影响全局的文件
                        Layer.open({
                            content: Template("conflicttpl", ret.data),
                            shade: 0.8,
                            area: area,
                            title: __('Warning'),
                            btn: [__('Continue install'), __('Cancel')],
                            end: function () {

                            },
                            yes: function () {
                                install(name, version, true);
                            }
                        });

                    } else {
                        Layer.alert(ret.msg);
                    }
                    return false;
                });
            };

            var uninstall = function (name, force, droptables) {
                Fast.api.ajax({
                    url: 'addon/uninstall',
                    data: {name: name, force: force ? 1 : 0, droptables: droptables ? 1 : 0}
                }, function (data, ret) {
                    delete Config['addons'][name];
                    Layer.closeAll();
                    Controller.api.refresh(table, name);
                }, function (data, ret) {
                    if (ret && ret.code === -3) {
                        //插件目录发现影响全局的文件
                        Layer.open({
                            content: Template("conflicttpl", ret.data),
                            shade: 0.8,
                            area: area,
                            title: __('Warning'),
                            btn: [__('Continue uninstall'), __('Cancel')],
                            end: function () {

                            },
                            yes: function () {
                                uninstall(name, true, droptables);
                            }
                        });

                    } else {
                        Layer.alert(ret.msg);
                    }
                    return false;
                });
            };

            var operate = function (name, action, force) {
                Fast.api.ajax({
                    url: 'addon/state',
                    data: {name: name, action: action, force: force ? 1 : 0}
                }, function (data, ret) {
                    var addon = Config['addons'][name];
                    addon.state = action === 'enable' ? 1 : 0;
                    Layer.closeAll();
                    Controller.api.refresh(table, name);
                }, function (data, ret) {
                    if (ret && ret.code === -3) {
                        //插件目录发现影响全局的文件
                        Layer.open({
                            content: Template("conflicttpl", ret.data),
                            shade: 0.8,
                            area: area,
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

            var upgrade = function (name, version) {
                var userinfo = Controller.api.userinfo.get();
                var uid = userinfo ? userinfo.id : 0;
                var token = userinfo ? userinfo.token : '';
                Fast.api.ajax({
                    url: 'addon/upgrade',
                    data: {name: name, uid: uid, token: token, version: version, faversion: Config.faversion}
                }, function (data, ret) {
                    Config['addons'][name] = data.addon;
                    Layer.closeAll();
                    Controller.api.refresh(table, name);
                }, function (data, ret) {
                    Layer.alert(ret.msg);
                    return false;
                });
            };

            // 点击安装
            $(document).on("click", ".btn-install", function () {
                var that = this;
                var name = $(this).closest(".operate").data("name");
                var version = $(this).data("version");

                var userinfo = Controller.api.userinfo.get();
                var uid = userinfo ? userinfo.id : 0;

                if (parseInt(uid) === 0) {
                    return Layer.alert(__('Not login tips'), {
                        title: __('Warning'),
                        btn: [__('Login now')],
                        yes: function (index, layero) {
                            $(".btn-userinfo").trigger("click", name, version);
                        },
                        btn2: function () {
                            install(name, version, false);
                        }
                    });
                }
                install(name, version, false);
            });

            // 点击卸载
            $(document).on("click", ".btn-uninstall", function () {
                var name = $(this).closest(".operate").data('name');
                if (Config['addons'][name].state == 1) {
                    Layer.alert(__('Please disable the add before trying to uninstall'), {icon: 7});
                    return false;
                }
                Template.helper("__", __);
                Layer.confirm(Template("uninstalltpl", {addon: Config['addons'][name]}), {focusBtn: false}, function (index, layero) {
                    uninstall(name, false, $("input[name='droptables']", layero).prop("checked"));
                });
            });

            // 点击配置
            $(document).on("click", ".btn-config", function () {
                var name = $(this).closest(".operate").data("name");
                Fast.api.open("addon/config?name=" + name, __('Setting'));
            });

            // 点击启用/禁用
            $(document).on("click", ".btn-enable,.btn-disable", function () {
                var name = $(this).data("name");
                var action = $(this).data("action");
                operate(name, action, false);
            });

            // 点击升级
            $(document).on("click", ".btn-upgrade", function () {
                var name = $(this).closest(".operate").data('name');
                if (Config['addons'][name].state == 1) {
                    Layer.alert(__('Please disable the add before trying to upgrade'), {icon: 7});
                    return false;
                }
                var version = $(this).data("version");

                Layer.confirm(__('Upgrade tips', Config['addons'][name].title), function () {
                    upgrade(name, version);
                });
            });

            $(document).on("click", ".operate .btn-group .dropdown-toggle", function () {
                $(this).closest(".btn-group").toggleClass("dropup", $(document).height() - $(this).offset().top <= 200);
            });

            $(document).on("click", ".view-screenshots", function () {
                var row = Table.api.getrowbyindex(table, parseInt($(this).data("index")));
                var data = [];
                $.each(row.screenshots, function (i, j) {
                    data.push({
                        "src": j
                    });
                });
                var json = {
                    "title": row.title,
                    "data": data
                };
                top.Layer.photos(top.JSON.parse(JSON.stringify({photos: json})));
            });
        },
        add: function () {
            Controller.api.bindevent();
        },
        config: function () {
            Controller.api.bindevent();
        },
        api: {
            formatter: {
                title: function (value, row, index) {
                    var title = '<a class="title" href="' + row.url + '" data-toggle="tooltip" title="' + __('View addon home page') + '" target="_blank">' + value + '</a>';
                    if (row.screenshots && row.screenshots.length > 0) {
                        title += ' <a href="javascript:;" data-index="' + index + '" class="view-screenshots text-success" title="' + __('View addon screenshots') + '" data-toggle="tooltip"><i class="fa fa-image"></i></a>';
                    }
                    return title;
                },
                operate: function (value, row, index) {
                    return Template("operatetpl", {item: row, index: index});
                },
                toggle: function (value, row, index) {
                    if (!row.addon) {
                        return '';
                    }
                    return '<a href="javascript:;" data-toggle="tooltip" title="' + __('Click to toggle status') + '" class="btn btn-toggle btn-' + (row.addon.state == 1 ? "disable" : "enable") + '" data-action="' + (row.addon.state == 1 ? "disable" : "enable") + '" data-name="' + row.name + '"><i class="fa ' + (row.addon.state == 0 ? 'fa-toggle-on fa-rotate-180 text-gray' : 'fa-toggle-on text-success') + ' fa-2x"></i></a>';
                },
                author: function (value, row, index) {
                    var url = 'javascript:';
                    if (typeof row.homepage !== 'undefined') {
                        url = row.homepage;
                    } else if (typeof row.qq !== 'undefined' && row.qq) {
                        url = 'https://wpa.qq.com/msgrd?v=3&uin=' + row.qq + '&site=fastadmin.net&menu=yes';
                    }
                    return '<a href="' + url + '" target="_blank" data-toggle="tooltip" class="text-primary">' + value + '</a>';
                },
                price: function (value, row, index) {
                    if (isNaN(value)) {
                        return value;
                    }
                    return parseFloat(value) == 0 ? '<span class="text-success">' + __('Free') + '</span>' : '<span class="text-danger">￥' + value + '</span>';
                },
                downloads: function (value, row, index) {
                    return value;
                },
                version: function (value, row, index) {
                    return row.addon && row.addon.version != row.version ? '<a href="' + row.url + '?version=' + row.version + '" target="_blank"><span class="releasetips text-primary" data-toggle="tooltip" title="' + __('New version tips', row.version) + '">' + row.addon.version + '<i></i></span></a>' : row.version;
                },
                home: function (value, row, index) {
                    return row.addon && parseInt(row.addon.state) > 0 ? '<a href="' + row.addon.url + '" data-toggle="tooltip" title="' + __('View addon index page') + '" target="_blank"><i class="fa fa-home text-primary"></i></a>' : '<a href="javascript:;"><i class="fa fa-home text-gray"></i></a>';
                },
            },
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
            },
            refresh: function (table, name) {
                //刷新左侧边栏
                Fast.api.refreshmenu();

                //刷新行数据
                if ($(".operate[data-name='" + name + "']").length > 0) {
                    var index = $(".operate[data-name='" + name + "']").closest("tr[data-index]").data("index");
                    var row = Table.api.getrowbyindex(table, index);
                    row.addon = typeof Config['addons'][name] !== 'undefined' ? Config['addons'][name] : undefined;
                    table.bootstrapTable("updateRow", {index: index, row: row});
                } else if ($(".btn-switch.active").data("type") == "local") {
                    $(".btn-refresh").trigger("click");
                }
            }
        }
    };
    return Controller;
});
