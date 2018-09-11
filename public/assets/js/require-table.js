define(['jquery', 'bootstrap', 'moment', 'moment/locale/zh-cn', 'bootstrap-table', 'bootstrap-table-lang', 'bootstrap-table-export', 'bootstrap-table-commonsearch', 'bootstrap-table-template'], function ($, undefined, Moment) {
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
            exportDataType: "all",
            exportTypes: ['json', 'xml', 'csv', 'txt', 'doc', 'excel'],
            pageSize: 10,
            pageList: [10, 25, 50, 'All'],
            pagination: true,
            clickToSelect: true, //是否启用点击选中
            dblClickToEdit: true, //是否启用双击编辑
            singleSelect: false, //是否启用单选
            showRefresh: false,
            locale: 'zh-CN',
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
            checkOnInit: true, //是否在初始化时判断
            escape: true, //是否对内容进行转义
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
            firsttd: 'tbody tr td:first-child:not(:has(div.card-views))',
            toolbar: '.toolbar',
            refreshbtn: '.btn-refresh',
            addbtn: '.btn-add',
            editbtn: '.btn-edit',
            delbtn: '.btn-del',
            importbtn: '.btn-import',
            multibtn: '.btn-multi',
            disabledbtn: '.btn-disabled',
            editonebtn: '.btn-editone',
            dragsortfield: 'weigh',
        },
        api: {
            init: function (defaults, columnDefaults, locales) {
                defaults = defaults ? defaults : {};
                columnDefaults = columnDefaults ? columnDefaults : {};
                locales = locales ? locales : {};
                // 如果是iOS设备则启用卡片视图
                if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
                    Table.defaults.cardView = true;
                }
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
                    }
                }, locales);
            },
            // 绑定事件
            bindevent: function (table) {
                //Bootstrap-table的父元素,包含table,toolbar,pagnation
                var parenttable = table.closest('.bootstrap-table');
                //Bootstrap-table配置
                var options = table.bootstrapTable('getOptions');
                //Bootstrap操作区
                var toolbar = $(options.toolbar, parenttable);
                //当刷新表格时
                table.on('load-error.bs.table', function (status, res, e) {
                    if (e.status === 0) {
                        return;
                    }
                    Toastr.error(__('Unknown data format'));
                });
                //当刷新表格时
                table.on('refresh.bs.table', function (e, settings, data) {
                    $(Table.config.refreshbtn, toolbar).find(".fa").addClass("fa-spin");
                });
                if (options.dblClickToEdit) {
                    //当双击单元格时
                    table.on('dbl-click-row.bs.table', function (e, row, element, field) {
                        $(Table.config.editonebtn, element).trigger("click");
                    });
                }
                //当内容渲染完成后
                table.on('post-body.bs.table', function (e, settings, json, xhr) {
                    $(Table.config.refreshbtn, toolbar).find(".fa").removeClass("fa-spin");
                    $(Table.config.disabledbtn, toolbar).toggleClass('disabled', true);
                    if ($(Table.config.firsttd, table).find("input[type='checkbox'][data-index]").size() > 0) {
                        // 挺拽选择,需要重新绑定事件
                        require(['drag', 'drop'], function () {
                            $(Table.config.firsttd, table).drag("start", function (ev, dd) {
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
                            $(Table.config.firsttd, table).drop("start", function () {
                                Table.api.toggleattr(this);
                            }).drop(function () {
                                Table.api.toggleattr(this);
                            }).drop("end", function () {
                                Table.api.toggleattr(this);
                            });
                            $.drop({
                                multi: true
                            });
                        });
                    }
                });
                // 处理选中筛选框后按钮的状态统一变更
                table.on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function () {
                    var ids = Table.api.selectedids(table);
                    $(Table.config.disabledbtn, toolbar).toggleClass('disabled', !ids.length);
                });
                // 刷新按钮事件
                $(toolbar).on('click', Table.config.refreshbtn, function () {
                    table.bootstrapTable('refresh');
                });
                // 添加按钮事件
                $(toolbar).on('click', Table.config.addbtn, function () {
                    var ids = Table.api.selectedids(table);
                    var url = options.extend.add_url;
                    if (url.indexOf("{ids}") !== -1) {
                        url = Table.api.replaceurl(url, {ids: ids.length > 0 ? ids.join(",") : 0}, table);
                    }
                    Fast.api.open(url, __('Add'), $(this).data() || {});
                });
                // 导入按钮事件
                if ($(Table.config.importbtn, toolbar).size() > 0) {
                    require(['upload'], function (Upload) {
                        Upload.api.plupload($(Table.config.importbtn, toolbar), function (data, ret) {
                            Fast.api.ajax({
                                url: options.extend.import_url,
                                data: {file: data.url},
                            }, function (data, ret) {
                                table.bootstrapTable('refresh');
                            });
                        });
                    });
                }
                // 批量编辑按钮事件
                $(toolbar).on('click', Table.config.editbtn, function () {
                    var that = this;
                    //循环弹出多个编辑框
                    $.each(table.bootstrapTable('getSelections'), function (index, row) {
                        var url = options.extend.edit_url;
                        row = $.extend({}, row ? row : {}, {ids: row[options.pk]});
                        var url = Table.api.replaceurl(url, row, table);
                        Fast.api.open(url, __('Edit'), $(that).data() || {});
                    });
                });
                // 批量操作按钮事件
                $(toolbar).on('click', Table.config.multibtn, function () {
                    var ids = Table.api.selectedids(table);
                    Table.api.multi($(this).data("action"), ids, table, this);
                });
                // 批量删除按钮事件
                $(toolbar).on('click', Table.config.delbtn, function () {
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
                                    table: options.extend.table
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
                            }, function () {
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
                $(table).on("click", "input[data-id][name='checkbox']", function (e) {
                    var ids = $(this).data("id");
                    var row = Table.api.getrowbyid(table, ids);
                    table.trigger('check.bs.table', [row, this]);
                });
                $(table).on("click", "[data-id].btn-change", function (e) {
                    e.preventDefault();
                    Table.api.multi($(this).data("action") ? $(this).data("action") : '', [$(this).data("id")], table, this);
                });
                $(table).on("click", "[data-id].btn-edit", function (e) {
                    e.preventDefault();
                    var ids = $(this).data("id");
                    var row = Table.api.getrowbyid(table, ids);
                    row.ids = ids;
                    var url = Table.api.replaceurl(options.extend.edit_url, row, table);
                    Fast.api.open(url, __('Edit'), $(this).data() || {});
                });
                $(table).on("click", "[data-id].btn-del", function (e) {
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
                var id = table.attr("id");
                Table.list[id] = table;
                return table;
            },
            // 批量操作请求
            multi: function (action, ids, table, element) {
                var options = table.bootstrapTable('getOptions');
                var data = element ? $(element).data() : {};
                var ids = ($.isArray(ids) ? ids.join(",") : ids);
                var url = typeof data.url !== "undefined" ? data.url : (action == "del" ? options.extend.del_url : options.extend.multi_url);
                url = this.replaceurl(url, {ids: ids}, table);
                var params = typeof data.params !== "undefined" ? (typeof data.params == 'object' ? $.param(data.params) : data.params) : '';
                var options = {url: url, data: {action: action, ids: ids, params: params}};
                Fast.api.ajax(options, function (data, ret) {
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
                        Fast.api.open(Table.api.replaceurl(url, row, table), __('Edit'), $(this).data() || {});
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
                }
            },
            // 单元格数据格式化
            formatter: {
                icon: function (value, row, index) {
                    if (!value)
                        return '';
                    value = value === null ? '' : value.toString();
                    value = value.indexOf(" ") > -1 ? value : "fa fa-" + value;
                    //渲染fontawesome图标
                    return '<i class="' + value + '"></i> ' + value;
                },
                image: function (value, row, index) {
                    value = value ? value : '/assets/img/blank.gif';
                    var classname = typeof this.classname !== 'undefined' ? this.classname : 'img-sm img-center';
                    return '<a href="' + Fast.api.cdnurl(value) + '" target="_blank"><img class="' + classname + '" src="' + Fast.api.cdnurl(value) + '" /></a>';
                },
                images: function (value, row, index) {
                    value = value === null ? '' : value.toString();
                    var classname = typeof this.classname !== 'undefined' ? this.classname : 'img-sm img-center';
                    var arr = value.split(',');
                    var html = [];
                    $.each(arr, function (i, value) {
                        value = value ? value : '/assets/img/blank.gif';
                        html.push('<a href="' + Fast.api.cdnurl(value) + '" target="_blank"><img class="' + classname + '" src="' + Fast.api.cdnurl(value) + '" /></a>');
                    });
                    return html.join(' ');
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
                    value = value === null ? '' : value.toString();
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
                    var color = typeof this.color !== 'undefined' ? this.color : 'success';
                    var yes = typeof this.yes !== 'undefined' ? this.yes : 1;
                    var no = typeof this.no !== 'undefined' ? this.no : 0;
                    return "<a href='javascript:;' data-toggle='tooltip' title='" + __('Click to toggle') + "' class='btn-change' data-id='"
                        + row.id + "' data-params='" + this.field + "=" + (value ? no : yes) + "'><i class='fa fa-toggle-on " + (value == yes ? 'text-' + color : 'fa-flip-horizontal text-gray') + " fa-2x'></i></a>";
                }
                ,
                url: function (value, row, index) {
                    return '<div class="input-group input-group-sm" style="width:250px;margin:0 auto;"><input type="text" class="form-control input-sm" value="' + value + '"><span class="input-group-btn input-group-sm"><a href="' + value + '" target="_blank" class="btn btn-default btn-sm"><i class="fa fa-link"></i></a></span></div>';
                },
                search: function (value, row, index) {
                    return '<a href="javascript:;" class="searchit" data-toggle="tooltip" title="' + __('Click to search %s', value) + '" data-field="' + this.field + '" data-value="' + value + '">' + value + '</a>';
                },
                addtabs: function (value, row, index) {
                    var url = Table.api.replaceurl(this.url, row, this.table);
                    var title = this.atitle ? this.atitle : __("Search %s", value);
                    return '<a href="' + Fast.api.fixurl(url) + '" class="addtabsit" data-value="' + value + '" title="' + title + '">' + value + '</a>';
                },
                dialog: function (value, row, index) {
                    var url = Table.api.replaceurl(this.url, row, this.table);
                    var title = this.atitle ? this.atitle : __("View %s", value);
                    return '<a href="' + Fast.api.fixurl(url) + '" class="dialogit" data-value="' + value + '" title="' + title + '">' + value + '</a>';
                },
                flag: function (value, row, index) {
                    var that = this;
                    value = value === null ? '' : value.toString();
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
                    var arr = value.split(',');
                    $.each(arr, function (i, value) {
                        value = value === null ? '' : value.toString();
                        if (value == '')
                            return true;
                        var color = value && typeof colorArr[value] !== 'undefined' ? colorArr[value] : 'primary';
                        var display = typeof that.searchList !== 'undefined' && typeof that.searchList[value] !== 'undefined' ? that.searchList[value] : __(value.charAt(0).toUpperCase() + value.slice(1));
                        html.push('<a href="javascript:;" class="searchit" data-toggle="tooltip" title="' + __('Click to search %s', display) + '" data-field="' + field + '" data-value="' + value + '"><span class="label label-' + color + '">' + display + '</span></a>');
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
                        buttons.push({
                            name: 'dragsort',
                            icon: 'fa fa-arrows',
                            title: __('Drag to sort'),
                            extend: 'data-toggle="tooltip"',
                            classname: 'btn btn-xs btn-primary btn-dragsort'
                        });
                    }
                    if (options.extend.edit_url !== '' && names.indexOf('edit') === -1) {
                        buttons.push({
                            name: 'edit',
                            icon: 'fa fa-pencil',
                            title: __('Edit'),
                            extend: 'data-toggle="tooltip"',
                            classname: 'btn btn-xs btn-success btn-editone',
                            url: options.extend.edit_url
                        });
                    }
                    if (options.extend.del_url !== '' && names.indexOf('del') === -1) {
                        buttons.push({
                            name: 'del',
                            icon: 'fa fa-trash',
                            title: __('Del'),
                            extend: 'data-toggle="tooltip"',
                            classname: 'btn btn-xs btn-danger btn-delone'
                        });
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
                var hidden, visible, url, classname, icon, text, title, refresh, confirm, extend;
                var fieldIndex = column.fieldIndex;

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
                        hidden = typeof j.hidden === 'function' ? j.hidden.call(table, row, j) : (j.hidden ? j.hidden : false);
                        if (hidden) {
                            return true;
                        }
                        visible = typeof j.visible === 'function' ? j.visible.call(table, row, j) : (j.visible ? j.visible : true);
                        if (!visible) {
                            return true;
                        }
                        url = j.url ? j.url : '';
                        url = typeof url === 'function' ? url.call(table, row, j) : (url ? Fast.api.fixurl(Table.api.replaceurl(url, row, table)) : 'javascript:;');
                        classname = j.classname ? j.classname : 'btn-primary btn-' + name + 'one';
                        icon = j.icon ? j.icon : '';
                        text = j.text ? j.text : '';
                        title = j.title ? j.title : text;
                        refresh = j.refresh ? 'data-refresh="' + j.refresh + '"' : '';
                        confirm = j.confirm ? 'data-confirm="' + j.confirm + '"' : '';
                        extend = j.extend ? j.extend : '';
                        html.push('<a href="' + url + '" class="' + classname + '" ' + (confirm ? confirm + ' ' : '') + (refresh ? refresh + ' ' : '') + extend + ' title="' + title + '" data-table-id="' + (table ? table.attr("id") : '') + '" data-field-index="' + fieldIndex + '" data-row-index="' + index + '" data-button-index="' + i + '"><i class="' + icon + '"></i>' + (text ? ' ' + text : '') + '</a>');
                    }
                });
                return html.join(' ');
            },
            //替换URL中的数据
            replaceurl: function (url, row, table) {
                var options = table ? table.bootstrapTable('getOptions') : null;
                var ids = options ? row[options.pk] : 0;
                row.ids = ids ? ids : (typeof row.ids !== 'undefined' ? row.ids : 0);
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
            selectedids: function (table) {
                var options = table.bootstrapTable('getOptions');
                if (options.templateView) {
                    return $.map($("input[data-id][name='checkbox']:checked"), function (dom) {
                        return $(dom).data("id");
                    });
                } else {
                    return $.map(table.bootstrapTable('getSelections'), function (row) {
                        return row[options.pk];
                    });
                }
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
                $.each(table.bootstrapTable('getData'), function (i, j) {
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
