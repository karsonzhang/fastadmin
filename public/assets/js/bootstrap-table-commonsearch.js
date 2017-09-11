/**
 * @author: pppscn <35696959@qq.com>
 * @version: v0.0.1
 *
 * @update 2017-05-07 <http://git.oschina.net/pp/fastadmin>
 * @update 2017-09-09 <http://git.oschina.net/karson/fastadmin>
 */

!function ($) {
    'use strict';

    var ColumnsForSearch = [];

    var sprintf = $.fn.bootstrapTable.utils.sprintf;

    var initCommonSearch = function (pColumns, that) {
        var vFormCommon = createFormCommon(pColumns, that);

        var vModal = sprintf("<div class=\"commonsearch-table %s\">", that.options.searchFormVisible ? "" : "hidden");
        vModal += vFormCommon.join('');
        vModal += "</div>";
        that.$container.prepend($(vModal));
        that.$commonsearch = $(".commonsearch-table", that.$container);
        var form = $("form.form-commonsearch", that.$commonsearch);

        //绑定日期时间元素事件
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

        // 表单提交
        form.on("submit", function (event) {
            event.preventDefault();
            that.onCommonSearch();
            return false;
        });

        // 重置搜索
        form.on("click", "button[type=reset]", function (event) {
            form[0].reset();
            that.onCommonSearch();
        });

    };

    var createFormCommon = function (pColumns, that) {
        var htmlForm = [];
        var opList = ['=', '>', '>=', '<', '<=', '!=', 'LIKE', 'LIKE %...%', 'NOT LIKE', 'IN', 'NOT IN', 'IN(...)', 'NOT IN(...)', 'BETWEEN', 'NOT BETWEEN', 'IS NULL', 'IS NOT NULL'];
        htmlForm.push(sprintf('<form class="form-horizontal form-commonsearch" action="%s" >', that.options.actionForm));
        htmlForm.push('<fieldset>');
        if (that.options.titleForm.length > 0)
            htmlForm.push(sprintf("<legend>%s</legend>", that.options.titleForm));
        htmlForm.push('<div class="row">');
        for (var i in pColumns) {
            var vObjCol = pColumns[i];
            if (!vObjCol.checkbox && vObjCol.field !== 'operate' && vObjCol.searchable && vObjCol.operate !== false) {
                var query = Backend.api.query(vObjCol.field);
                query = query ? query : '';
                vObjCol.defaultValue = that.options.renderDefault && query != '' ? query : (typeof vObjCol.defaultValue === 'undefined' ? '' : vObjCol.defaultValue);
                ColumnsForSearch.push(vObjCol);

                htmlForm.push('<div class="form-group col-xs-12 col-sm-6 col-md-4 col-lg-3">');
                htmlForm.push(sprintf('<label for="%s" class="control-label col-xs-4">%s</label>', vObjCol.field, vObjCol.title));
                htmlForm.push('<div class="col-xs-8">');

                vObjCol.operate = (typeof vObjCol.operate === 'undefined' || $.inArray(vObjCol.operate, opList) === -1) ? '=' : vObjCol.operate;
                htmlForm.push(sprintf('<input type="hidden" class="form-control operate" name="field-%s" data-name="%s" value="%s" readonly>', vObjCol.field, vObjCol.field, vObjCol.operate));

                var style = typeof vObjCol.style === 'undefined' ? '' : sprintf('style="%s"', vObjCol.style);
                if (vObjCol.searchList) {
                    if (typeof vObjCol.searchList === 'object' && typeof vObjCol.searchList.then === 'function') {
                        htmlForm.push(sprintf('<select class="form-control" name="%s" %s>%s</select>', vObjCol.field, style, sprintf('<option value="">%s</option>', that.options.formatCommonChoose())));
                        (function (vObjCol, that) {
                            $.when(vObjCol.searchList).done(function (ret) {

                                var isArray = false;
                                if (ret.data && ret.data.searchlist && $.isArray(ret.data.searchlist)) {
                                    var resultlist = {};
                                    $.each(ret.data.searchlist, function (key, value) {
                                        resultlist[value.id] = value.name;
                                    });
                                } else if (ret.constructor === Array || ret.constructor === Object) {
                                    var resultlist = ret;
                                    isArray = ret.constructor === Array ? true : isArray;
                                }
                                var optionList = [];
                                $.each(resultlist, function (key, value) {
                                    var isSelect = (isArray ? value : key) == vObjCol.defaultValue ? 'selected' : '';
                                    optionList.push(sprintf("<option value='" + (isArray ? value : key) + "' %s>" + value + "</option>", isSelect));
                                });
                                $("form.form-commonsearch select[name='" + vObjCol.field + "']", that.$container).append(optionList.join(''));
                            });
                        })(vObjCol, that);
                    } else if (typeof vObjCol.searchList == 'function') {
                        htmlForm.push(vObjCol.searchList.call(this, vObjCol));
                    } else {
                        var isArray = vObjCol.searchList.constructor === Array;
                        var searchList = [];
                        searchList.push(sprintf('<option value="">%s</option>', that.options.formatCommonChoose()));
                        $.each(vObjCol.searchList, function (key, value) {
                            var isSelect = (isArray ? value : key) == vObjCol.defaultValue ? 'selected' : '';
                            searchList.push(sprintf("<option value='" + (isArray ? value : key) + "' %s>" + value + "</option>", isSelect));
                        });
                        htmlForm.push(sprintf('<select class="form-control" name="%s" %s>%s</select>', vObjCol.field, style, searchList.join('')));
                    }
                } else {
                    var placeholder = typeof vObjCol.placeholder === 'undefined' ? vObjCol.title : vObjCol.placeholder;
                    var type = typeof vObjCol.type === 'undefined' ? 'text' : vObjCol.type;
                    var addclass = typeof vObjCol.addclass === 'undefined' ? 'form-control' : 'form-control ' + vObjCol.addclass;
                    var data = typeof vObjCol.data === 'undefined' ? '' : vObjCol.data;
                    var defaultValue = typeof vObjCol.defaultValue === 'undefined' ? '' : vObjCol.defaultValue;
                    if (/BETWEEN$/.test(vObjCol.operate)) {
                        var defaultValueArr = /^.+|.+$/.test(defaultValue) ? defaultValue.split('|') : ['', ''];
                        htmlForm.push(sprintf('<input type="%s" class="%s" name="%s" value="%s" placeholder="%s" id="%s" %s %s>', type, addclass, vObjCol.field, defaultValueArr[0], placeholder, vObjCol.field, style, data));

                        htmlForm.push('</div>');
                        htmlForm.push('</div>');
                        htmlForm.push('<div class="form-group col-xs-12 col-sm-6 col-md-4 col-lg-3">');
                        htmlForm.push(sprintf('<label for="%s" class="control-label col-xs-4">%s</label>', vObjCol.field, "-"));
                        htmlForm.push('<div class="col-xs-8">');
                        htmlForm.push(sprintf('<input type="%s" class="%s" name="%s" value="%s" placeholder="%s" id="%s" %s %s>', type, addclass, vObjCol.field, defaultValueArr[1], placeholder, vObjCol.field, style, data));
                    } else {
                        htmlForm.push(sprintf('<input type="%s" class="%s" name="%s" value="%s" placeholder="%s" id="%s" %s %s>', type, addclass, vObjCol.field, defaultValue, placeholder, vObjCol.field, style, data));
                    }
                }

                htmlForm.push('</div>');
                htmlForm.push('</div>');
            }
        }
        htmlForm.push('<div class="form-group col-xs-12 col-sm-6 col-md-4 col-lg-3">');
        htmlForm.push(createFormBtn(that).join(''));
        htmlForm.push('</div>');
        htmlForm.push('</div>');
        htmlForm.push('</fieldset>');
        htmlForm.push('</form>');

        return htmlForm;
    };

    var createFormBtn = function (that) {
        var htmlBtn = [];
        var searchSubmit = that.options.formatCommonSubmitButton();
        var searchReset = that.options.formatCommonResetButton();
        htmlBtn.push('<div class="col-sm-8 col-xs-offset-4">');
        htmlBtn.push(sprintf('<button type="submit" class="btn btn-success" >%s</button> ', searchSubmit));
        htmlBtn.push(sprintf('<button type="reset" class="btn btn-default" >%s</button> ', searchReset));
        htmlBtn.push('</div>');
        return htmlBtn;
    };

    var isSearchAvailble = function (that) {

        //只支持服务端搜索
        if (!that.options.commonSearch || that.options.sidePagination != 'server' || !that.options.url) {
            return false;
        }

        return true;
    };

    var getSearchQuery = function (that, removeempty) {
        var op = {};
        var filter = {};
        var value = '';
        $("form.form-commonsearch input.operate", that.$commonsearch).each(function (i) {
            var name = $(this).data("name");
            var sym = $(this).val();
            var obj = $("[name='" + name + "']", that.$commonsearch);
            if (obj.size() == 0)
                return true;
            var vObjCol = ColumnsForSearch[i];
            if (obj.size() > 1) {
                if (/BETWEEN$/.test(sym)) {
                    var value_begin = $.trim($("[name='" + name + "']:first", that.$commonsearch).val()), value_end = $.trim($("[name='" + name + "']:last", that.$commonsearch).val());
                    if (value_begin.length || value_end.length) {
                        if (typeof vObjCol.process === 'function') {
                            value_begin = vObjCol.process(value_begin, 'begin');
                            value_end = vObjCol.process(value_end, 'end');
                        } else if ($("[name='" + name + "']:first", that.$commonsearch).attr('type') === 'datetime') { //datetime类型字段转换成时间戳
                            var Hms = Moment(value_begin).format("HH:mm:ss");
                            value_begin = value_begin ? parseInt(Moment(value_begin) / 1000) : '';
                            value_end = value_end ? parseInt(Moment(value_end) / 1000) : '';
                            if (value_begin === value_end && '00:00:00' === Hms) {
                                value_end += 86399;
                            }
                        }
                        value = value_begin + ',' + value_end;
                    } else {
                        value = '';
                    }
                } else {
                    value = $("[name='" + name + "']:checked", that.$commonsearch).val();
                }
            } else {
                value = (typeof vObjCol.process === 'function') ? vObjCol.process(obj.val()) : (sym == 'LIKE %...%' ? obj.val().replace(/\*/g, '%') : obj.val());
            }
            if (removeempty && value == '' && sym.indexOf("NULL") == -1) {
                return true;
            }

            op[name] = sym;
            filter[name] = value;
        });
        return {op: op, filter: filter};
    };

    var getQueryParams = function (params, searchQuery, removeempty) {
        params.filter = typeof params.filter === 'Object' ? params.filter : (params.filter ? JSON.parse(params.filter) : {});
        params.op = typeof params.op === 'Object' ? params.op : (params.op ? JSON.parse(params.op) : {});
        params.filter = $.extend(params.filter, searchQuery.filter);
        params.op = $.extend(params.op, searchQuery.op);
        //移除empty的值
        if (removeempty) {
            $.each(params.filter, function (i, j) {
                if (j === '') {
                    delete params.filter[i];
                    delete params.op[i];
                }
            });
        }
        params.filter = JSON.stringify(params.filter);
        params.op = JSON.stringify(params.op);
        return params;
    };

    $.extend($.fn.bootstrapTable.defaults, {
        commonSearch: false,
        titleForm: "Common search",
        actionForm: "",
        searchFormVisible: true,
        searchClass: 'searchit',
        renderDefault: true,
        onCommonSearch: function (field, text) {
            return false;
        },
        onPostCommonSearch: function (table) {
            return false;
        }
    });

    $.extend($.fn.bootstrapTable.defaults.icons, {
        commonSearchIcon: 'glyphicon-search'
    });

    $.extend($.fn.bootstrapTable.Constructor.EVENTS, {
        'common-search.bs.table': 'onCommonSearch',
        'post-common-search.bs.table': 'onPostCommonSearch'
    });

    $.extend($.fn.bootstrapTable.locales[$.fn.bootstrapTable.defaults.locale], {
        formatCommonSearch: function () {
            return "Common search";
        },
        formatCommonSubmitButton: function () {
            return "Submit";
        },
        formatCommonResetButton: function () {
            return "Reset";
        },
        formatCommonCloseButton: function () {
            return "Close";
        },
        formatCommonChoose: function () {
            return "Choose";
        }
    });

    $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales);

    var BootstrapTable = $.fn.bootstrapTable.Constructor,
            _initToolbar = BootstrapTable.prototype.initToolbar,
            _load = BootstrapTable.prototype.load,
            _initSearch = BootstrapTable.prototype.initSearch;

    BootstrapTable.prototype.initToolbar = function () {
        _initToolbar.apply(this, Array.prototype.slice.apply(arguments));

        if (!isSearchAvailble(this)) {
            return;
        }

        var that = this,
                html = [];
        html.push(sprintf('<div class="columns-%s pull-%s" style="margin-top:10px;">', this.options.buttonsAlign, this.options.buttonsAlign));
        html.push(sprintf('<button class="btn btn-default%s' + '" type="button" name="commonSearch" title="%s">', that.options.iconSize === undefined ? '' : ' btn-' + that.options.iconSize, that.options.formatCommonSearch()));
        html.push(sprintf('<i class="%s %s"></i>', that.options.iconsPrefix, that.options.icons.commonSearchIcon))
        html.push('</button></div>');

        that.$toolbar.prepend(html.join(''));

        initCommonSearch(that.columns, that);

        that.$toolbar.find('button[name="commonSearch"]')
                .off('click').on('click', function () {
            that.$commonsearch.toggleClass("hidden");
            return;
        });

        that.$container.on("click", "." + that.options.searchClass, function () {
            var obj = $("form [name='" + $(this).data("field") + "']", that.$commonsearch);
            if (obj.size() > 0) {
                obj.val($(this).data("value"));
                $("form", that.$commonsearch).trigger("submit");
            }
        });
        var searchQuery = getSearchQuery(that, true);
        var queryParams = that.options.queryParams;
        //匹配默认搜索值
        this.options.queryParams = function (params) {
            var params = getQueryParams(queryParams(params), searchQuery);
            return params;
        };
        this.trigger('post-common-search', that);

    };

    BootstrapTable.prototype.onCommonSearch = function () {
        var searchQuery = getSearchQuery(this);
        var params = getQueryParams(this.options.queryParams({}), searchQuery, true);
        this.trigger('common-search', this, params, searchQuery);
        this.options.pageNumber = 1;
        this.options.queryParams = function () {
            return params;
        };
        this.refresh({query: params});
    };

    BootstrapTable.prototype.load = function (data) {
        _load.apply(this, Array.prototype.slice.apply(arguments));

        if (!isSearchAvailble(this)) {
            return;
        }
    };

    BootstrapTable.prototype.initSearch = function () {
        _initSearch.apply(this, Array.prototype.slice.apply(arguments));

        if (!isSearchAvailble(this)) {
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
}(jQuery);
