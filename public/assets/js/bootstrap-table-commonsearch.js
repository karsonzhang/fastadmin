/**
 * @author: pppscn <35696959@qq.com>
 * @version: v0.0.1
 *
 * @update 2017-05-07 <http://git.oschina.net/pp/fastadmin>
 */

!function ($) {
    'use strict';

    var firstLoad = false;

    var sprintf = $.fn.bootstrapTable.utils.sprintf;

    var showCommonSearch = function (pColumns, that) {

        var vFormCommon = createFormCommon(pColumns, that), timeoutId = 0;

        var vModal = sprintf("<div id=\"commonSearchModalContent_%s\" class=\"well bs-component\">", that.options.idTable);
        vModal += vFormCommon.join('');
        vModal += "</div>";
        $("#myTabContent").before($(vModal));

        if (that.options.sidePagination != 'server' || !that.options.url) {
            $('#' + that.options.idForm).off('keyup blur', 'input').on('keyup blur', 'input', function (event) {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(function () {
                    that.onColumnCommonSearch(event);
                }, that.options.searchTimeOut);
            });
        }

        //绑定日期时间元素事件
        var form = $("#" + that.options.idForm);
        if ($(".datetimepicker", form).size() > 0) {
            require(['bootstrap-datetimepicker'], function () {
                $('.datetimepicker', form).parent().css('position', 'relative');
                $('.datetimepicker', form).datetimepicker({
                    //format: 'YYYY-MM-DD',
                    icons: {
                        time: 'fa fa-clock-o',
                        date: 'fa fa-calendar',
                        up: 'fa fa-chevron-up',
                        down: 'fa fa-chevron-down',
                        previous: 'fa fa-chevron-left',
                        next: 'fa fa-chevron-right',
                        today: 'fa fa-history',
                        clear: 'fa fa-trash',
                        close: 'fa fa-remove'
                    },
                    showTodayButton: true,
                    showClose: true
                });
            });
        }

        // 提交搜索
        $("#btnSubmitCommon" + "_" + that.options.idTable).click(function (event) {
            that.onColumnCommonSearch();
        });

        // 重置搜索
        $("#btnResetCommon" + "_" + that.options.idTable).click(function () {
            $("#commonSearchModalContent" + "_" + that.options.idTable + " form")[0].reset();
            that.onColumnCommonSearch();
        });

    };

    var createFormCommon = function (pColumns, that) {
        var htmlForm = [];
        var opList = ['=', '>', '>=', '<', '<=', '!=', 'LIKE', 'LIKE %...%', 'NOT LIKE', 'IN(...)', 'NOT IN(...)', 'BETWEEN', 'NOT BETWEEN', 'IS NULL', 'IS NOT NULL'];
        //var selectList = [];
        //for (var i = 0; i < opList.length; i++) {
        //    selectList.push("<option value='" + opList[i] + "'>" + opList[i] + "</option>");
        //}
        //var selectHtml = selectList.join('');
        htmlForm.push(sprintf('<form class="form-inline" id="%s" action="%s" >', that.options.idForm, that.options.actionForm));
        htmlForm.push('<fieldset>');
        if (that.options.titleForm.length > 0)
            htmlForm.push(sprintf("<legend>%s</legend>", that.options.titleForm));
        for (var i in pColumns) {
            var vObjCol = pColumns[i];
            if (!vObjCol.checkbox && vObjCol.field !== 'operate' && vObjCol.visible && vObjCol.searchable && vObjCol.operate !== false) {
                htmlForm.push('<div class="form-group" style="margin:0 5px;">');
                htmlForm.push(sprintf('<label for="%s" class="control-label" style="padding:0 10px">%s</label>', vObjCol.field, vObjCol.title));
                if (that.options.sidePagination == 'server' && that.options.url) {
                    //htmlForm.push('<div class="col-sm-2">');
                    //htmlForm.push(sprintf('<select class="form-control" name="field-%s" data-name="%s">%s</select>', vObjCol.field, vObjCol.field, selectHtml));
                    vObjCol.operate = (typeof vObjCol.operate === 'undefined' || $.inArray(vObjCol.operate, opList) === -1) ? '=' : vObjCol.operate;
                    htmlForm.push(sprintf('<input type="hidden" class="form-control operate" name="field-%s" data-name="%s" value="%s" readonly>', vObjCol.field, vObjCol.field, vObjCol.operate));
                    //htmlForm.push('</div>');
                }

                //htmlForm.push('<div class="col-sm-8">');
                var style = typeof vObjCol.style === 'undefined' ? '' : sprintf('style="%s"', vObjCol.style);
                if (vObjCol.searchList) {
                    if (typeof vObjCol.searchList == 'function') {
                        htmlForm.push(vObjCol.searchList.call(this, vObjCol));
                    } else {
                        var isArray = vObjCol.searchList.constructor === Array;
                        var searchList = [];
                        searchList.push(sprintf('<option value="">%s</option>', $.fn.bootstrapTable.locales.formatCommonChoose()));
                        $.each(vObjCol.searchList, function (key, value) {
                            searchList.push("<option value='" + (isArray ? value : key) + "'>" + value + "</option>");
                        });
                        htmlForm.push(sprintf('<select class="form-control" name="%s" %s>%s</select>', vObjCol.field, style, searchList.join('')));
                    }
                } else {
                    var placeholder = typeof vObjCol.placeholder === 'undefined' ? vObjCol.title : vObjCol.placeholder;
                    var type = typeof vObjCol.type === 'undefined' ? 'text' : vObjCol.type;
                    var addclass = typeof vObjCol.addclass === 'undefined' ? 'form-control' : 'form-control ' + vObjCol.addclass;
                    var data = typeof vObjCol.data === 'undefined' ? '' : vObjCol.data;
                    htmlForm.push(sprintf('<input type="%s" class="%s" name="%s" placeholder="%s" id="%s" %s %s>', type, addclass, vObjCol.field, placeholder, vObjCol.field, style, data));
                    var reg = /BETWEEN$/;
                    if (reg.test(vObjCol.operate)) {
                        htmlForm.push(sprintf('&nbsp;-&nbsp;<input type="%s" class="%s" name="%s" placeholder="%s" id="%s" %s %s>', type, addclass, vObjCol.field, placeholder, vObjCol.field, style, data));
                    }
                }

                //htmlForm.push('</div>');
                htmlForm.push('</div>');
            }
        }

        htmlForm.push('<div class="form-group" style="margin:0 5px;">');
        htmlForm.push(createFormBtn(that).join(''));
        htmlForm.push('</div>');
        htmlForm.push('</fieldset>');
        htmlForm.push('</form>');

        return htmlForm;
    };

    var createFormBtn = function (that) {
        var htmlBtn = [];
        var searchSubmit = that.options.formatCommonSubmitButton();
        var searchReset = that.options.formatCommonResetButton();
        var searchClose = that.options.formatCommonCloseButton();
        htmlBtn.push('<div class="form-group">');
        htmlBtn.push('<div class="col-sm-12 text-center">');
        if (that.options.sidePagination == 'server' && that.options.url) {
            htmlBtn.push(sprintf('<button type="button" id="btnSubmitCommon%s" class="btn btn-success" >%s</button> ', "_" + that.options.idTable, searchSubmit));
            htmlBtn.push(sprintf('<button type="button" id="btnResetCommon%s" class="btn btn-default" >%s</button> ', "_" + that.options.idTable, searchReset));
        } else {
            htmlBtn.push(sprintf('<button type="button" id="btnCloseCommon%s" data-dismiss="modal" class="btn btn-default" >%s</button> ', "_" + that.options.idTable, searchClose));
        }
        htmlBtn.push('</div>');
        htmlBtn.push('</div>');
        return htmlBtn;
    };

    $.extend($.fn.bootstrapTable.defaults, {
        commonSearch: false,
        idForm: 'commonSearch',
        titleForm: __("Common search"),
        actionForm: '',
        idTable: undefined,
        onColumnCommonSearch: function (field, text) {
            return false;
        }
    });

    $.extend($.fn.bootstrapTable.defaults.icons, {
        commonSearchIcon: 'glyphicon-search'
    });

    $.extend($.fn.bootstrapTable.Constructor.EVENTS, {
        'column-common-search.bs.table': 'onColumnCommonSearch'
    });

    $.extend($.fn.bootstrapTable.locales, {
        formatCommonSearch: function () {
            return __("Common search");
        },
        formatCommonSubmitButton: function () {
            return __("Submit");
        },
        formatCommonResetButton: function () {
            return __("Reset");
        },
        formatCommonCloseButton: function () {
            return __("Close");
        },
        formatCommonChoose: function () {
            return __("Choose");
        }
    });

    $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales);

    var BootstrapTable = $.fn.bootstrapTable.Constructor,
            _initToolbar = BootstrapTable.prototype.initToolbar,
            _load = BootstrapTable.prototype.load,
            _initSearch = BootstrapTable.prototype.initSearch;

    BootstrapTable.prototype.initToolbar = function () {
        _initToolbar.apply(this, Array.prototype.slice.apply(arguments));

        if (!this.options.search) {
            return;
        }

        if (!this.options.commonSearch) {
            return;
        }

        if (!this.options.idTable) {
            return;
        }

        var that = this;

        showCommonSearch(that.columns, that);
    };

    BootstrapTable.prototype.load = function (data) {
        _load.apply(this, Array.prototype.slice.apply(arguments));

        if (!this.options.commonSearch) {
            return;
        }

        if (typeof this.options.idTable === 'undefined') {
            return;
        } else {
            if (!firstLoad) {
                var height = parseInt($(".bootstrap-table").height());
                height += 10;
                $("#" + this.options.idTable).bootstrapTable("resetView", {height: height});
                firstLoad = true;
            }
        }
    };

    BootstrapTable.prototype.initSearch = function () {
        _initSearch.apply(this, Array.prototype.slice.apply(arguments));

        if (!this.options.commonSearch) {
            return;
        }

        var that = this;
        var fp = $.isEmptyObject(this.filterColumnsPartial) ? null : this.filterColumnsPartial;
        this.data = fp ? $.grep(this.data, function (item, i) {
            for (var key in fp) {
                var fval = fp[key].toLowerCase();
                var value = item[key];
                value = $.fn.bootstrapTable.utils.calculateObjectValue(that.header,
                        that.header.formatters[$.inArray(key, that.header.fields)],
                        [value, item, i], value);

                if (!($.inArray(key, that.header.fields) !== -1 &&
                        (typeof value === 'string' || typeof value === 'number') &&
                        (value + '').toLowerCase().indexOf(fval) !== -1)) {
                    return false;
                }
            }
            return true;
        }) : this.data;
    };

    BootstrapTable.prototype.onColumnCommonSearch = function (event) {
        if (typeof event === 'undefined') {
            var op = {};
            var filter = {};
            $("#commonSearchModalContent_" + this.options.idTable + " input.operate").each(function () {
                var name = $(this).data("name");
                var sym = $(this).val();
                var obj = $("[name='" + name + "']");
                if (obj.size() == 0)
                    return true;
                if (obj.size() > 1) {
                    if (/BETWEEN$/.test(sym)) {
                        var value_begin = $.trim($("[name='" + name + "']:first").val()), value_end = $.trim($("[name='" + name + "']:last").val());
                        if (!value_begin.length || !value_end.length) {
                            return true;
                        }
                        //datetime类型字段转换成时间戳
                        if ($("[name='" + name + "']:first").attr('type') === 'datetime') {
                            var datetimestamp = Date.parse(value_begin).toString();
                            value_begin = datetimestamp.substr(0, datetimestamp.length - 3) - 28800; //TODO:Date.parse导致的时区差

                            datetimestamp = Date.parse(value_end).toString();
                            value_end = datetimestamp.substr(0, datetimestamp.length - 3) - 28800; //TODO:Date.parse导致的时区差
                        }
                        var value = value_begin + ',' + value_end;
                    } else {
                        var value = $("[name='" + name + "']:checked").val();
                    }
                } else {
                    var value = obj.val();
                }

                if (value == '' && sym.indexOf("NULL") == -1) {
                    return true;
                }

                op[name] = sym;
                filter[name] = value;
            });
            // 追加查询关键字
            this.options.pageNumber = 1;
            this.options.queryParams = function (params) {
                return {
                    search: params.search,
                    sort: params.sort,
                    order: params.order,
                    filter: JSON.stringify(filter),
                    op: JSON.stringify(op),
                    offset: params.offset,
                    limit: params.limit,
                };
            };
            this.refresh({query: {filter: JSON.stringify(filter), op: JSON.stringify(op)}});

        } else {
            var text = $.trim($(event.currentTarget).val());
            var $field = $(event.currentTarget)[0].id;

            if ($.isEmptyObject(this.filterColumnsPartial)) {
                this.filterColumnsPartial = {};
            }
            if (text) {
                this.filterColumnsPartial[$field] = text;
            } else {
                delete this.filterColumnsPartial[$field];
            }
            this.options.pageNumber = 1;
            this.onSearch(event);
//        this.updatePagination();
            this.trigger('column-common-search', $field, text);
        }
    };
}(jQuery);
