define(['jquery', 'bootstrap', 'moment', 'moment/locale/zh-cn', 'bootstrap-table', 'bootstrap-table-lang', 'bootstrap-table-export', 'bootstrap-table-commonsearch', 'bootstrap-table-template', 'bootstrap-table-jumpto', 'bootstrap-table-fixed-columns'], function ($, undefined, Moment) {
    var Table = {
        list: {},
        // Bootstrap-table 基础配置
        defaults: {
            url: '',
            sidePagination: 'server',
            method: 'get', //请求方法
            toolbar: ".toolbar", //工具栏
            search: true, //是否启用快速搜索
            cache: false,
            commonSearch: true, //是否启用通用搜索
            searchFormVisible: false, //是否始终显示搜索表单
            titleForm: '', //为空则不显示标题，不定义默认显示：普通搜索
            idTable: 'commonTable',
            showExport: true,
            exportDataType: "auto",
            exportTypes: ['json', 'xml', 'csv', 'txt', 'doc', 'excel'],
            exportOptions: {
                fileName: 'export_' + Moment().format("YYYY-MM-DD"),
                preventInjection: false,
                mso: {
                    onMsoNumberFormat: function (cell, row, col) {
                        return !isNaN($(cell).text()) ? '\\@' : '';
                    },
                },
                ignoreColumn: [0, 'operate'] //默认不导出第一列(checkbox)与操作(operate)列
            },
            pageSize: localStorage.getItem("pagesize") || 10,
            pageList: [10, 15, 20, 25, 50, 'All'],
            pagination: true,
            clickToSelect: true, //是否启用点击选中
            dblClickToEdit: true, //是否启用双击编辑
            singleSelect: false, //是否启用单选
            showRefresh: false,
            showJumpto: true,
            locale: Config.language == 'zh-cn' ? 'zh-CN' : 'en-US',
            showToggle: true,
            showColumns: true,
            pk: 'id',
            sortName: 'id',
            sortOrder: 'desc',
            paginationFirstText: __("First"),
            paginationPreText: __("Previous"),
            paginationNextText: __("Next"),
            paginationLastText: __("Last"),
            cardView: false, //卡片视图
            iosCardView: true, //ios卡片视图
            checkOnInit: true, //是否在初始化时判断
            escape: true, //是否对内容进行转义
            fixDropdownPosition: true, //是否修复下拉的定位
            selectedIds: [],
            selectedData: [],
            extend: {
                index_url: '',
                add_url: '',
                edit_url: '',
                del_url: '',
                import_url: '',
                multi_url: '',
                dragsort_url: 'ajax/weigh',
            }
        },
        // Bootstrap-table 列配置
        columnDefaults: {
            align: 'center',
            valign: 'middle',
        },
        config: {
            checkboxtd: 'tbody>tr>td.bs-checkbox',
            toolbar: '.toolbar',
            refreshbtn: '.btn-refresh',
            addbtn: '.btn-add',
            editbtn: '.btn-edit',
            delbtn: '.btn-del',
            importbtn: '.btn-import',
            multibtn: '.btn-multi',
            disabledbtn: '.btn-disabled',
            editonebtn: '.btn-editone',
            restoreonebtn: '.btn-restoreone',
            destroyonebtn: '.btn-destroyone',
            restoreallbtn: '.btn-restoreall',
            destroyallbtn: '.btn-destroyall',
            dragsortfield: 'weigh',
        },
        button: {
            edit: {
                name: 'edit',
                icon: 'fa fa-pencil',
                title: __('Edit'),
                extend: 'data-toggle="tooltip"',
                classname: 'btn btn-xs btn-success btn-editone'
            },
            del: {
                name: 'del',
                icon: 'fa fa-trash',
                title: __('Del'),
                extend: 'data-toggle="tooltip"',
                classname: 'btn btn-xs btn-danger btn-delone'
            },
            dragsort: {
                name: 'dragsort',
                icon: 'fa fa-arrows',
                title: __('Drag to sort'),
                extend: 'data-toggle="tooltip"',
                classname: 'btn btn-xs btn-primary btn-dragsort'
            }
        },
        api: {
            init: function (defaults, columnDefaults, locales) {
                defaults = defaults ? defaults : {};
                columnDefaults = columnDefaults ? columnDefaults : {};
                locales = locales ? locales : {};
                $.fn.bootstrapTable.Constructor.prototype.getSelectItem = function () {
                    return this.$selectItem;
                };
                // 写入bootstrap-table默认配置
                $.extend(true, $.fn.bootstrapTable.defaults, Table.defaults, defaults);
                // 写入bootstrap-table column配置
                $.extend($.fn.bootstrapTable.columnDefaults, Table.columnDefaults, columnDefaults);
                // 写入bootstrap-table locale配置
                $.extend($.fn.bootstrapTable.locales[Table.defaults.locale], {
                    formatCommonSearch: function () {
                        return __('Common search');
                    },
                    formatCommonSubmitButton: function () {
                        return __('Submit');
                    },
                    formatCommonResetButton: function () {
                        return __('Reset');
                    },
                    formatCommonCloseButton: function () {
                        return __('Close');
                    },
                    formatCommonChoose: function () {
                        return __('Choose');
                    },
                    formatJumpto: function () {
                        return __('Go');
                    }
                }, locales);
                // 如果是iOS设备则判断是否启用卡片视图
                if ($.fn.bootstrapTable.defaults.iosCardView && navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
                    Table.defaults.cardView = true;
                    $.fn.bootstrapTable.defaults.cardView = true;
                }
                if (typeof defaults.exportTypes != 'undefined') {
                    $.fn.bootstrapTable.defaults.exportTypes = defaults.exportTypes;
                }
            },
            // 绑定事件
            bindevent: function (table) {
                //Bootstrap-table的父元素,包含table,toolbar,pagnation
                var parenttable = table.closest('.bootstrap-table');
                //Bootstrap-table配置
                var options = table.bootstrapTable('getOptions');
                //Bootstrap操作区
                var toolbar = $(options.toolbar, parenttable);
                //跨页提示按钮
                var tipsBtn = $(".btn-selected-tips", parenttable);
                if (tipsBtn.size() === 0) {
                    tipsBtn = $('<a href="javascript:" class="btn btn-warning-light btn-selected-tips hide" data-animation="false" data-toggle="tooltip" data-title="' + __("Click to uncheck all") + '"><i class="fa fa-info-circle"></i> ' + __("Multiple selection mode: %s checked", "<b>0</b>") + '</a>').appendTo(toolbar);
                }
                //点击提示按钮
                tipsBtn.off("click").on("click", function (e) {
                    table.trigger("uncheckbox");
                    table.bootstrapTable("refresh");
                });
                //当刷新表格时
                table.on('uncheckbox', function (status, res, e) {
                    options.selectedIds = [];
                    options.selectedData = [];
                    tipsBtn.tooltip('hide');
                    tipsBtn.addClass('hide');
                });
                //表格加载出错时
                table.on('load-error.bs.table', function (status, res, e) {
                    if (e.status === 0) {
                        return;
                    }
                    Toastr.error(__('Unknown data format'));
                });
                //当加载数据成功时
                table.on('load-success.bs.table', function (e, data) {
                    if (typeof data.rows === 'undefined' && typeof data.code != 'undefined') {
                        Toastr.error(data.msg);
                    }
                });
                //当刷新表格时
                table.on('refresh.bs.table', function (e, settings, data) {
                    $(Table.config.refreshbtn, toolbar).find(".fa").addClass("fa-spin");
                });
                //当表格分页变更时
                table.on('page-change.bs.table', function (e, page, pagesize) {
                    if (!isNaN(pagesize)) {
                        localStorage.setItem("pagesize", pagesize);
                    }
                });
                //当执行搜索时
                table.on('search.bs.table common-search.bs.table', function (e, settings, data) {
                    table.trigger("uncheckbox");
                });
                if (options.dblClickToEdit) {
                    //当双击单元格时
                    table.on('dbl-click-row.bs.table', function (e, row, element, field) {
                        $(Table.config.editonebtn, element).trigger("click");
                    });
                }
                //渲染内容前
                table.on('pre-body.bs.table', function (e, data) {
                    if (options.maintainSelected) {
                        $.each(data, function (i, row) {
                            row[options.stateField] = $.inArray(row[options.pk], options.selectedIds) > -1;
                        });
                    }
                });
                //当内容渲染完成后
                table.on('post-body.bs.table', function (e, data) {
                    $(Table.config.refreshbtn, toolbar).find(".fa").removeClass("fa-spin");
                    if ($(Table.config.checkboxtd + ":first", table).find("input[type='checkbox'][data-index]").size() > 0) {
                        // 拖拽选择,需要重新绑定事件
                        require(['drag', 'drop'], function () {
                            var checkboxtd = $(Table.config.checkboxtd, table);
                            checkboxtd.drag("start", function (ev, dd) {
                                return $('<div class="selection" />').css('opacity', .65).appendTo(document.body);
                            }).drag(function (ev, dd) {
                                $(dd.proxy).css({
                                    top: Math.min(ev.pageY, dd.startY),
                                    left: Math.min(ev.pageX, dd.startX),
                                    height: Math.abs(ev.pageY - dd.startY),
                                    width: Math.abs(ev.pageX - dd.startX)
                                });
                            }).drag("end", function (ev, dd) {
                                $(dd.proxy).remove();
                            });
                            checkboxtd.drop("start", function () {
                                Table.api.toggleattr(this);
                            }).drop(function () {
                                // Table.api.toggleattr(this);
                            }).drop("end", function (e) {
                                var that = this;
                                setTimeout(function () {
                                    if (e.type === 'mousemove') {
                                        Table.api.toggleattr(that);
                                    }
                                }, 0);
                            });
                            $.drop({
                                multi: true
                            });
                        });
                    }
                });
                var exportDataType = options.exportDataType;
                // 处理选中筛选框后按钮的状态统一变更
                table.on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table post-body.bs.table', function (e) {
                    var allIds = [];
                    $.each(table.bootstrapTable("getData"), function (i, item) {
                        allIds.push(typeof item[options.pk] != 'undefined' ? item[options.pk] : '');
                    });
                    var selectedIds = Table.api.selectedids(table, true),
                        selectedData = Table.api.selecteddata(table, true);
                    //开启分页checkbox分页记忆
                    if (options.maintainSelected) {
                        options.selectedIds = options.selectedIds.filter(function (element, index, self) {
                            return $.inArray(element, allIds) === -1;
                        }).concat(selectedIds);
                        options.selectedData = options.selectedData.filter(function (element, index, self) {
                            return $.inArray(element[options.pk], allIds) === -1;
                        }).concat(selectedData);
                        if (options.selectedIds.length > selectedIds.length) {
                            $("b", tipsBtn).text(options.selectedIds.length);
                            tipsBtn.removeClass('hide');
                        } else {
                            tipsBtn.addClass('hide');
                        }
                    } else {
                        options.selectedIds = selectedIds;
                        options.selectedData = selectedData;
                    }
                    //如果导出类型为auto时则自动判断
                    if (exportDataType === 'auto') {
                        options.exportDataType = selectedIds.length > 0 ? 'selected' : 'all';
                    }
                    $(Table.config.disabledbtn, toolbar).toggleClass('disabled', !options.selectedIds.length);
                });
                // 绑定TAB事件
                $('.panel-heading [data-field] a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                    var field = $(this).closest("[data-field]").data("field");
                    var value = $(this).data("value");
                    var object = $("[name='" + field + "']", table.closest(".bootstrap-table").find(".commonsearch-table"));
                    if (object.prop('tagName') == "SELECT") {
                        $("option[value='" + value + "']", object).prop("selected", true);
                    } else {
                        object.val(value);
                    }
                    table.trigger("uncheckbox");
                    table.bootstrapTable('refresh', {pageNumber: 1});
                    return false;
                });
                // 刷新按钮事件
                toolbar.on('click', Table.config.refreshbtn, function () {
                    table.bootstrapTable('refresh');
                });
                // 添加按钮事件
                toolbar.on('click', Table.config.addbtn, function () {
                    var ids = Table.api.selectedids(table);
                    var url = options.extend.add_url;
                    if (url.indexOf("{ids}") !== -1) {
                        url = Table.api.replaceurl(url, {ids: ids.length > 0 ? ids.join(",") : 0}, table);
                    }
                    Fast.api.open(url, $(this).data("original-title") || $(this).attr("title") || __('Add'), $(this).data() || {});
                });
                // 导入按钮事件
                if ($(Table.config.importbtn, toolbar).size() > 0) {
                    require(['upload'], function (Upload) {
                        Upload.api.upload($(Table.config.importbtn, toolbar), function (data, ret) {
                            Fast.api.ajax({
                                url: options.extend.import_url,
                                data: {file: data.url},
                            }, function (data, ret) {
                                table.trigger("uncheckbox");
                                table.bootstrapTable('refresh');
                            });
                        });
                    });
                }
                // 批量编辑按钮事件
                toolbar.on('click', Table.config.editbtn, function () {
                    var that = this;
                    var ids = Table.api.selectedids(table);
                    if (ids.length > 10) {
                        return;
                    }
                    var title = $(that).data('title') || $(that).attr("title") || __('Edit');
                    var data = $(that).data() || {};
                    delete data.title;
                    //循环弹出多个编辑框
                    $.each(Table.api.selecteddata(table), function (index, row) {
                        var url = options.extend.edit_url;
                        row = $.extend({}, row ? row : {}, {ids: row[options.pk]});
                        url = Table.api.replaceurl(url, row, table);
                        Fast.api.open(url, typeof title === 'function' ? title.call(table, row) : title, data);
                    });
                });
                //清空回收站
                $(document).on('click', Table.config.destroyallbtn, function () {
                    var that = this;
                    Layer.confirm(__('Are you sure you want to truncate?'), function () {
                        var url = $(that).data("url") ? $(that).data("url") : $(that).attr("href");
                        Fast.api.ajax(url, function () {
                            Layer.closeAll();
                            table.trigger("uncheckbox");
                            table.bootstrapTable('refresh');
                        }, function () {
                            Layer.closeAll();
                        });
                    });
                    return false;
                });
                //全部还原
                $(document).on('click', Table.config.restoreallbtn, function () {
                    var that = this;
                    var url = $(that).data("url") ? $(that).data("url") : $(that).attr("href");
                    Fast.api.ajax(url, function () {
                        Layer.closeAll();
                        table.trigger("uncheckbox");
                        table.bootstrapTable('refresh');
                    }, function () {
                        Layer.closeAll();
                    });
                    return false;
                });
                //销毁或删除
                $(document).on('click', Table.config.restoreonebtn + ',' + Table.config.destroyonebtn, function () {
                    var that = this;
                    var url = $(that).data("url") ? $(that).data("url") : $(that).attr("href");
                    var row = Fast.api.getrowbyindex(table, $(that).data("row-index"));
                    Fast.api.ajax({
                        url: url,
                        data: {ids: row[options.pk]}
                    }, function () {
                        table.trigger("uncheckbox");
                        table.bootstrapTable('refresh');
                    });
                    return false;
                });
                // 批量操作按钮事件
                toolbar.on('click', Table.config.multibtn, function () {
                    var ids = Table.api.selectedids(table);
                    Table.api.multi($(this).data("action"), ids, table, this);
                });
                // 批量删除按钮事件
                toolbar.on('click', Table.config.delbtn, function () {
                    var that = this;
                    var ids = Table.api.selectedids(table);
                    Layer.confirm(
                        __('Are you sure you want to delete the %s selected item?', ids.length),
                        {icon: 3, title: __('Warning'), offset: 0, shadeClose: true},
                        function (index) {
                            Table.api.multi("del", ids, table, that);
                            Layer.close(index);
                        }
                    );
                });
                // 拖拽排序
                require(['dragsort'], function () {
                    //绑定拖动排序
                    $("tbody", table).dragsort({
                        itemSelector: 'tr:visible',
                        dragSelector: "a.btn-dragsort",
                        dragEnd: function (a, b) {
                            var element = $("a.btn-dragsort", this);
                            var data = table.bootstrapTable('getData');
                            var current = data[parseInt($(this).data("index"))];
                            var options = table.bootstrapTable('getOptions');
                            //改变的值和改变的ID集合
                            var ids = $.map($("tbody tr:visible", table), function (tr) {
                                return data[parseInt($(tr).data("index"))][options.pk];
                            });
                            var changeid = current[options.pk];
                            var pid = typeof current.pid != 'undefined' ? current.pid : '';
                            var params = {
                                url: table.bootstrapTable('getOptions').extend.dragsort_url,
                                data: {
                                    ids: ids.join(','),
                                    changeid: changeid,
                                    pid: pid,
                                    field: Table.config.dragsortfield,
                                    orderway: options.sortOrder,
                                    table: options.extend.table,
                                    pk: options.pk
                                }
                            };
                            Fast.api.ajax(params, function (data, ret) {
                                var success = $(element).data("success") || $.noop;
                                if (typeof success === 'function') {
                                    if (false === success.call(element, data, ret)) {
                                        return false;
                                    }
                                }
                                table.bootstrapTable('refresh');
                            }, function (data, ret) {
                                var error = $(element).data("error") || $.noop;
                                if (typeof error === 'function') {
                                    if (false === error.call(element, data, ret)) {
                                        return false;
                                    }
                                }
                                table.bootstrapTable('refresh');
                            });
                        },
                        placeHolderTemplate: ""
                    });
                });
                table.on("click", "input[data-id][name='checkbox']", function (e) {
                    var ids = $(this).data("id");
                    table.bootstrapTable($(this).prop("checked") ? 'checkBy' : 'uncheckBy', {field: options.pk, values: [ids]});
                });
                table.on("click", "[data-id].btn-change", function (e) {
                    e.preventDefault();
                    var changer = $.proxy(function () {
                        Table.api.multi($(this).data("action") ? $(this).data("action") : '', [$(this).data("id")], table, this);
                    }, this);
                    if (typeof $(this).data("confirm") !== 'undefined') {
                        Layer.confirm($(this).data("confirm"), function (index) {
                            changer();
                            Layer.close(index);
                        });
                    } else {
                        changer();
                    }
                });
                table.on("click", "[data-id].btn-edit", function (e) {
                    e.preventDefault();
                    var ids = $(this).data("id");
                    var row = Table.api.getrowbyid(table, ids);
                    row.ids = ids;
                    var url = Table.api.replaceurl(options.extend.edit_url, row, table);
                    Fast.api.open(url, $(this).data("original-title") || $(this).attr("title") || __('Edit'), $(this).data() || {});
                });
                table.on("click", "[data-id].btn-del", function (e) {
                    e.preventDefault();
                    var id = $(this).data("id");
                    var that = this;
                    Layer.confirm(
                        __('Are you sure you want to delete this item?'),
                        {icon: 3, title: __('Warning'), shadeClose: true},
                        function (index) {
                            Table.api.multi("del", id, table, that);
                            Layer.close(index);
                        }
                    );
                });

                //修复dropdown定位溢出的情况
                if (options.fixDropdownPosition) {
                    var tableBody = table.closest(".fixed-table-body");
                    table.on('show.bs.dropdown fa.event.refreshdropdown', ".btn-group", function (e) {
                        var dropdownMenu = $(".dropdown-menu", this);
                        var btnGroup = $(this);
                        var isPullRight = dropdownMenu.hasClass("pull-right") || dropdownMenu.hasClass("dropdown-menu-right");
                        var left, top, position;
                        if (dropdownMenu.outerHeight() + btnGroup.outerHeight() > tableBody.outerHeight() - 41) {
                            position = 'fixed';
                            top = btnGroup.offset().top - $(window).scrollTop() + btnGroup.outerHeight();
                            left = isPullRight ? btnGroup.offset().left + btnGroup.outerWidth() - dropdownMenu.outerWidth() : btnGroup.offset().left;
                        } else {
                            if (btnGroup.offset().top + btnGroup.outerHeight() + dropdownMenu.outerHeight() > tableBody.offset().top + tableBody.outerHeight() - 30) {
                                position = 'absolute';
                                left = isPullRight ? -(dropdownMenu.outerWidth() - btnGroup.outerWidth()) : 0;
                                top = -(dropdownMenu.outerHeight() + 3);
                            }
                        }
                        if (left || top) {
                            dropdownMenu.css({
                                position: position, left: left, top: top, right: 'inherit'
                            });
                        }
                    });
                    var checkdropdown = function () {
                        if ($(".btn-group.open", table).length > 0 && $(".btn-group.open .dropdown-menu", table).css("position") == 'fixed') {
                            $(".btn-group.open", table).trigger("fa.event.refreshdropdown");
                        }
                    };
                    $(window).on("scroll", function () {
                        checkdropdown();
                    });
                    tableBody.on("scroll", function () {
                        checkdropdown();
                    });
                }

                var id = table.attr("id");
                Table.list[id] = table;
                return table;
            },
            // 批量操作请求
            multi: function (action, ids, table, element) {
                var options = table.bootstrapTable('getOptions');
                var data = element ? $(element).data() : {};
                ids = ($.isArray(ids) ? ids.join(",") : ids);
                var url = typeof data.url !== "undefined" ? data.url : (action == "del" ? options.extend.del_url : options.extend.multi_url);
                var params = typeof data.params !== "undefined" ? (typeof data.params == 'object' ? $.param(data.params) : data.params) : '';
                options = {url: url, data: {action: action, ids: ids, params: params}};
                Fast.api.ajax(options, function (data, ret) {
                    table.trigger("uncheckbox");
                    var success = $(element).data("success") || $.noop;
                    if (typeof success === 'function') {
                        if (false === success.call(element, data, ret)) {
                            return false;
                        }
                    }
                    table.bootstrapTable('refresh');
                }, function (data, ret) {
                    var error = $(element).data("error") || $.noop;
                    if (typeof error === 'function') {
                        if (false === error.call(element, data, ret)) {
                            return false;
                        }
                    }
                });
            },
            // 单元格元素事件
            events: {
                operate: {
                    'click .btn-editone': function (e, value, row, index) {
                        e.stopPropagation();
                        e.preventDefault();
                        var table = $(this).closest('table');
                        var options = table.bootstrapTable('getOptions');
                        var ids = row[options.pk];
                        row = $.extend({}, row ? row : {}, {ids: ids});
                        var url = options.extend.edit_url;
                        Fast.api.open(Table.api.replaceurl(url, row, table), $(this).data("original-title") || $(this).attr("title") || __('Edit'), $(this).data() || {});
                    },
                    'click .btn-delone': function (e, value, row, index) {
                        e.stopPropagation();
                        e.preventDefault();
                        var that = this;
                        var top = $(that).offset().top - $(window).scrollTop();
                        var left = $(that).offset().left - $(window).scrollLeft() - 260;
                        if (top + 154 > $(window).height()) {
                            top = top - 154;
                        }
                        if ($(window).width() < 480) {
                            top = left = undefined;
                        }
                        Layer.confirm(
                            __('Are you sure you want to delete this item?'),
                            {icon: 3, title: __('Warning'), offset: [top, left], shadeClose: true},
                            function (index) {
                                var table = $(that).closest('table');
                                var options = table.bootstrapTable('getOptions');
                                Table.api.multi("del", row[options.pk], table, that);
                                Layer.close(index);
                            }
                        );
                    }
                },//单元格图片预览
                image: {
                    'click .img-center': function (e, value, row, index) {
                        var data = [];
                        value = value === null ? '' : value.toString();
                        var arr = value != '' ? value.split(",") : [];
                        $.each(arr, function (index, value) {
                            data.push({
                                src: Fast.api.cdnurl(value),
                            });
                        });
                        Layer.photos({
                            photos: {
                                "start": $(this).parent().index(),
                                "data": data
                            },
                            anim: 5 //0-6的选择，指定弹出图片动画类型，默认随机（请注意，3.0之前的版本用shift参数）
                        });
                    },
                }
            },
            // 单元格数据格式化
            formatter: {
                icon: function (value, row, index) {
                    value = value === null ? '' : value.toString();
                    value = value.indexOf(" ") > -1 ? value : "fa fa-" + value;
                    //渲染fontawesome图标
                    return '<i class="' + value + '"></i> ' + value;
                },
                image: function (value, row, index) {
                    value = value == null || value.length === 0 ? '' : value.toString();
                    value = value ? value : '/assets/img/blank.gif';
                    var classname = typeof this.classname !== 'undefined' ? this.classname : 'img-sm img-center';
                    return '<a href="javascript:"><img class="' + classname + '" src="' + Fast.api.cdnurl(value) + '" /></a>';
                },
                images: function (value, row, index) {
                    value = value == null || value.length === 0 ? '' : value.toString();
                    var classname = typeof this.classname !== 'undefined' ? this.classname : 'img-sm img-center';
                    var arr = value != '' ? value.split(',') : [];
                    var html = [];
                    $.each(arr, function (i, value) {
                        value = value ? value : '/assets/img/blank.gif';
                        html.push('<a href="javascript:"><img class="' + classname + '" src="' + Fast.api.cdnurl(value) + '" /></a>');
                    });
                    return html.join(' ');
                },
                content: function (value, row, index) {
                    var width = this.width != undefined ? (this.width.match(/^\d+$/) ? this.width + "px" : this.width) : "250px";
                    return "<div style='white-space: nowrap; text-overflow:ellipsis; overflow: hidden; max-width:" + width + ";'>" + value + "</div>";
                },
                status: function (value, row, index) {
                    var custom = {normal: 'success', hidden: 'gray', deleted: 'danger', locked: 'info'};
                    if (typeof this.custom !== 'undefined') {
                        custom = $.extend(custom, this.custom);
                    }
                    this.custom = custom;
                    this.icon = 'fa fa-circle';
                    return Table.api.formatter.normal.call(this, value, row, index);
                },
                normal: function (value, row, index) {
                    var colorArr = ["primary", "success", "danger", "warning", "info", "gray", "red", "yellow", "aqua", "blue", "navy", "teal", "olive", "lime", "fuchsia", "purple", "maroon"];
                    var custom = {};
                    if (typeof this.custom !== 'undefined') {
                        custom = $.extend(custom, this.custom);
                    }
                    value = value == null || value.length === 0 ? '' : value.toString();
                    var keys = typeof this.searchList === 'object' ? Object.keys(this.searchList) : [];
                    var index = keys.indexOf(value);
                    var color = value && typeof custom[value] !== 'undefined' ? custom[value] : null;
                    var display = index > -1 ? this.searchList[value] : null;
                    var icon = typeof this.icon !== 'undefined' ? this.icon : null;
                    if (!color) {
                        color = index > -1 && typeof colorArr[index] !== 'undefined' ? colorArr[index] : 'primary';
                    }
                    if (!display) {
                        display = __(value.charAt(0).toUpperCase() + value.slice(1));
                    }
                    var html = '<span class="text-' + color + '">' + (icon ? '<i class="' + icon + '"></i> ' : '') + display + '</span>';
                    if (this.operate != false) {
                        html = '<a href="javascript:;" class="searchit" data-toggle="tooltip" title="' + __('Click to search %s', display) + '" data-field="' + this.field + '" data-value="' + value + '">' + html + '</a>';
                    }
                    return html;
                },
                toggle: function (value, row, index) {
                    var table = this.table;
                    var options = table ? table.bootstrapTable('getOptions') : {};
                    var pk = options.pk || "id";
                    var color = typeof this.color !== 'undefined' ? this.color : 'success';
                    var yes = typeof this.yes !== 'undefined' ? this.yes : 1;
                    var no = typeof this.no !== 'undefined' ? this.no : 0;
                    var url = typeof this.url !== 'undefined' ? this.url : '';
                    var confirm = '';
                    var disable = false;
                    if (typeof this.confirm !== "undefined") {
                        confirm = typeof this.confirm === "function" ? this.confirm.call(this, value, row, index) : this.confirm;
                    }
                    if (typeof this.disable !== "undefined") {
                        disable = typeof this.disable === "function" ? this.disable.call(this, value, row, index) : this.disable;
                    }
                    return "<a href='javascript:;' data-toggle='tooltip' title='" + __('Click to toggle') + "' class='btn-change " + (disable ? 'btn disabled no-padding' : '') + "' data-index='" + index + "' data-id='"
                        + row[pk] + "' " + (url ? "data-url='" + url + "'" : "") + (confirm ? "data-confirm='" + confirm + "'" : "") + " data-params='" + this.field + "=" + (value == yes ? no : yes) + "'><i class='fa fa-toggle-on text-success text-" + color + " " + (value == yes ? '' : 'fa-flip-horizontal text-gray') + " fa-2x'></i></a>";
                },
                url: function (value, row, index) {
                    value = value == null || value.length === 0 ? '' : value.toString();
                    return '<div class="input-group input-group-sm" style="width:250px;margin:0 auto;"><input type="text" class="form-control input-sm" value="' + value + '"><span class="input-group-btn input-group-sm"><a href="' + value + '" target="_blank" class="btn btn-default btn-sm"><i class="fa fa-link"></i></a></span></div>';
                },
                search: function (value, row, index) {
                    var field = this.field;
                    if (typeof this.customField !== 'undefined' && typeof row[this.customField] !== 'undefined') {
                        value = row[this.customField];
                        field = this.customField;
                    }
                    return '<a href="javascript:;" class="searchit" data-toggle="tooltip" title="' + __('Click to search %s', value) + '" data-field="' + field + '" data-value="' + value + '">' + value + '</a>';
                },
                addtabs: function (value, row, index) {
                    var url = Table.api.replaceurl(this.url || '', row, this.table);
                    var title = this.atitle ? this.atitle : __("Search %s", value);
                    return '<a href="' + Fast.api.fixurl(url) + '" class="addtabsit" data-value="' + value + '" title="' + title + '">' + value + '</a>';
                },
                dialog: function (value, row, index) {
                    var url = Table.api.replaceurl(this.url || '', row, this.table);
                    var title = this.atitle ? this.atitle : __("View %s", value);
                    return '<a href="' + Fast.api.fixurl(url) + '" class="dialogit" data-value="' + value + '" title="' + title + '">' + value + '</a>';
                },
                flag: function (value, row, index) {
                    var that = this;
                    value = value == null || value.length === 0 ? '' : value.toString();
                    var colorArr = {index: 'success', hot: 'warning', recommend: 'danger', 'new': 'info'};
                    //如果字段列有定义custom
                    if (typeof this.custom !== 'undefined') {
                        colorArr = $.extend(colorArr, this.custom);
                    }
                    var field = this.field;
                    if (typeof this.customField !== 'undefined' && typeof row[this.customField] !== 'undefined') {
                        value = row[this.customField];
                        field = this.customField;
                    }

                    //渲染Flag
                    var html = [];
                    var arr = value != '' ? value.split(',') : [];
                    var color, display, label;
                    $.each(arr, function (i, value) {
                        value = value == null || value.length === 0 ? '' : value.toString();
                        if (value == '')
                            return true;
                        color = value && typeof colorArr[value] !== 'undefined' ? colorArr[value] : 'primary';
                        display = typeof that.searchList !== 'undefined' && typeof that.searchList[value] !== 'undefined' ? that.searchList[value] : __(value.charAt(0).toUpperCase() + value.slice(1));
                        label = '<span class="label label-' + color + '">' + display + '</span>';
                        if (that.operate) {
                            html.push('<a href="javascript:;" class="searchit" data-toggle="tooltip" title="' + __('Click to search %s', display) + '" data-field="' + field + '" data-value="' + value + '">' + label + '</a>');
                        } else {
                            html.push(label);
                        }
                    });
                    return html.join(' ');
                },
                label: function (value, row, index) {
                    return Table.api.formatter.flag.call(this, value, row, index);
                },
                datetime: function (value, row, index) {
                    var datetimeFormat = typeof this.datetimeFormat === 'undefined' ? 'YYYY-MM-DD HH:mm:ss' : this.datetimeFormat;
                    if (isNaN(value)) {
                        return value ? Moment(value).format(datetimeFormat) : __('None');
                    } else {
                        return value ? Moment(parseInt(value) * 1000).format(datetimeFormat) : __('None');
                    }
                },
                operate: function (value, row, index) {
                    var table = this.table;
                    // 操作配置
                    var options = table ? table.bootstrapTable('getOptions') : {};
                    // 默认按钮组
                    var buttons = $.extend([], this.buttons || []);
                    // 所有按钮名称
                    var names = [];
                    buttons.forEach(function (item) {
                        names.push(item.name);
                    });
                    if (options.extend.dragsort_url !== '' && names.indexOf('dragsort') === -1) {
                        buttons.push(Table.button.dragsort);
                    }
                    if (options.extend.edit_url !== '' && names.indexOf('edit') === -1) {
                        Table.button.edit.url = options.extend.edit_url;
                        buttons.push(Table.button.edit);
                    }
                    if (options.extend.del_url !== '' && names.indexOf('del') === -1) {
                        buttons.push(Table.button.del);
                    }
                    return Table.api.buttonlink(this, buttons, value, row, index, 'operate');
                }
                ,
                buttons: function (value, row, index) {
                    // 默认按钮组
                    var buttons = $.extend([], this.buttons || []);
                    return Table.api.buttonlink(this, buttons, value, row, index, 'buttons');
                }
            },
            buttonlink: function (column, buttons, value, row, index, type) {
                var table = column.table;
                type = typeof type === 'undefined' ? 'buttons' : type;
                var options = table ? table.bootstrapTable('getOptions') : {};
                var html = [];
                var hidden, visible, disable, url, classname, icon, text, title, refresh, confirm, extend,
                    dropdown, link;
                var fieldIndex = column.fieldIndex;
                var dropdowns = {};

                $.each(buttons, function (i, j) {
                    if (type === 'operate') {
                        if (j.name === 'dragsort' && typeof row[Table.config.dragsortfield] === 'undefined') {
                            return true;
                        }
                        if (['add', 'edit', 'del', 'multi', 'dragsort'].indexOf(j.name) > -1 && !options.extend[j.name + "_url"]) {
                            return true;
                        }
                    }
                    var attr = table.data(type + "-" + j.name);
                    if (typeof attr === 'undefined' || attr) {
                        hidden = typeof j.hidden === 'function' ? j.hidden.call(table, row, j) : (typeof j.hidden !== 'undefined' ? j.hidden : false);
                        if (hidden) {
                            return true;
                        }
                        visible = typeof j.visible === 'function' ? j.visible.call(table, row, j) : (typeof j.visible !== 'undefined' ? j.visible : true);
                        if (!visible) {
                            return true;
                        }
                        dropdown = j.dropdown ? j.dropdown : '';
                        url = j.url ? j.url : '';
                        url = typeof url === 'function' ? url.call(table, row, j) : (url ? Fast.api.fixurl(Table.api.replaceurl(url, row, table)) : 'javascript:;');
                        classname = j.classname ? j.classname : 'btn-primary btn-' + name + 'one';
                        icon = j.icon ? j.icon : '';
                        text = typeof j.text === 'function' ? j.text.call(table, row, j) : j.text ? j.text : '';
                        title = typeof j.title === 'function' ? j.title.call(table, row, j) : j.title ? j.title : text;
                        refresh = j.refresh ? 'data-refresh="' + j.refresh + '"' : '';
                        confirm = typeof j.confirm === 'function' ? j.confirm.call(table, row, j) : (typeof j.confirm !== 'undefined' ? j.confirm : false);
                        confirm = confirm ? 'data-confirm="' + confirm + '"' : '';
                        extend = j.extend ? j.extend : '';
                        disable = typeof j.disable === 'function' ? j.disable.call(table, row, j) : (typeof j.disable !== 'undefined' ? j.disable : false);
                        if (disable) {
                            classname = classname + ' disabled';
                        }
                        link = '<a href="' + url + '" class="' + classname + '" ' + (confirm ? confirm + ' ' : '') + (refresh ? refresh + ' ' : '') + extend + ' title="' + title + '" data-table-id="' + (table ? table.attr("id") : '') + '" data-field-index="' + fieldIndex + '" data-row-index="' + index + '" data-button-index="' + i + '"><i class="' + icon + '"></i>' + (text ? ' ' + text : '') + '</a>';
                        if (dropdown) {
                            if (typeof dropdowns[dropdown] == 'undefined') {
                                dropdowns[dropdown] = [];
                            }
                            dropdowns[dropdown].push(link);
                        } else {
                            html.push(link);
                        }
                    }
                });
                if (!$.isEmptyObject(dropdowns)) {
                    var dropdownHtml = [];
                    $.each(dropdowns, function (i, j) {
                        dropdownHtml.push('<div class="btn-group"><button type="button" class="btn btn-primary dropdown-toggle btn-xs" data-toggle="dropdown">' + i + '</button><button type="button" class="btn btn-primary dropdown-toggle btn-xs" data-toggle="dropdown"><span class="caret"></span></button><ul class="dropdown-menu dropdown-menu-right"><li>' + j.join('</li><li>') + '</li></ul></div>');
                    });
                    html.unshift(dropdownHtml);
                }
                return html.join(' ');
            },
            //替换URL中的数据
            replaceurl: function (url, row, table) {
                var options = table ? table.bootstrapTable('getOptions') : null;
                var ids = options ? row[options.pk] : 0;
                row.ids = ids ? ids : (typeof row.ids !== 'undefined' ? row.ids : 0);
                url = url == null || url.length === 0 ? '' : url.toString();
                //自动添加ids参数
                url = !url.match(/\{ids\}/i) ? url + (url.match(/(\?|&)+/) ? "&ids=" : "/ids/") + '{ids}' : url;
                url = url.replace(/\{(.*?)\}/gi, function (matched) {
                    matched = matched.substring(1, matched.length - 1);
                    if (matched.indexOf(".") !== -1) {
                        var temp = row;
                        var arr = matched.split(/\./);
                        for (var i = 0; i < arr.length; i++) {
                            if (typeof temp[arr[i]] !== 'undefined') {
                                temp = temp[arr[i]];
                            }
                        }
                        return typeof temp === 'object' ? '' : temp;
                    }
                    return row[matched];
                });
                return url;
            },
            // 获取选中的条目ID集合
            selectedids: function (table, current) {
                var options = table.bootstrapTable('getOptions');
                //如果有设置翻页记忆模式
                if (!current && options.maintainSelected) {
                    return options.selectedIds;
                }
                return $.map(table.bootstrapTable('getSelections'), function (row) {
                    return row[options.pk];
                });
            },
            //获取选中的数据
            selecteddata: function (table, current) {
                var options = table.bootstrapTable('getOptions');
                //如果有设置翻页记忆模式
                if (!current && options.maintainSelected) {
                    return options.selectedData;
                }
                return table.bootstrapTable('getSelections');
            },
            // 切换复选框状态
            toggleattr: function (table) {
                $("input[type='checkbox']", table).trigger('click');
            },
            // 根据行索引获取行数据
            getrowdata: function (table, index) {
                index = parseInt(index);
                var data = table.bootstrapTable('getData');
                return typeof data[index] !== 'undefined' ? data[index] : null;
            },
            // 根据行索引获取行数据
            getrowbyindex: function (table, index) {
                return Table.api.getrowdata(table, index);
            },
            // 根据主键ID获取行数据
            getrowbyid: function (table, id) {
                var row = {};
                var options = table.bootstrapTable("getOptions");
                $.each(Table.api.selecteddata(table), function (i, j) {
                    if (j[options.pk] == id) {
                        row = j;
                        return false;
                    }
                });
                return row;
            }
        },
    };
    return Table;
});
