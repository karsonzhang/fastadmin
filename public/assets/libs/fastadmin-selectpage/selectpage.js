/**
 * @summary     SelectPage
 * @desc        Simple and powerful selection plugin
 * @file        selectpage.js
 * @version     2.18
 * @author      TerryZeng
 * @contact     https://terryz.github.io/
 * @license     MIT License
 *
 */
;
(function ($) {
    "use strict";
    /**
     * Default options
     */
    var defaults = {
        /**
         * Data source
         * @type {string|Object}
         *
         * string：server side request url address
         * Object：JSON array，format：[{a:1,b:2,c:3},{...}]
         */
        data: undefined,
        /**
         * Language ('cn', 'en', 'ja', 'es', 'pt-br')
         * @type string
         * @default 'cn'
         */
        lang: 'cn',
        /**
         * Multiple select mode(tags)
         * @type boolean
         * @default false
         */
        multiple: false,
        /**
         * pagination or not
         * @type boolean
         * @default true
         */
        pagination: true,
        /**
         * Show up menu button
         * @type boolean
         * @default true
         */
        dropButton: true,
        /**
         * Result list visible size in pagination bar close
         * @type number
         * @default 10
         */
        listSize: 10,
        /**
         * Show control bar in multiple select mode
         * @type boolean
         * @default true
         */
        multipleControlbar: true,
        /**
         * Max selected item limited in multiple select mode
         * @type number
         * @default 0(unlimited)
         */
        maxSelectLimit: 0,
        /**
         * Select result item to close list, work on multiple select mode
         * @type boolean
         * @default false
         */
        selectToCloseList: false,
        /**
         * Init selected item key, the result will match to option.keyField option
         * @type string 
         */
        initRecord: undefined,
        /**
         * The table parameter in server side mode
         * @type string
         */
        dbTable: 'tbl',
        /**
         * The value field, the value will fill to hidden element
         * @type string
         * @default 'id'
         */
        keyField: 'id',
        /**
         * The show text field, the text will show to input element or tags(multiple mode)
         * @type string
         * @default 'name'
         */
        showField: 'name',
        /**
         * Actually used to search field
         * @type string
         */
        searchField: undefined,
        /**
         * Search type ('AND' or 'OR')
         * @type string
         * @default 'AND'
         */
        andOr: 'AND',
        /**
         * Result sort type
         * @type array - if not set, will default used showField field
         * @example
         * orderBy : ['id desc']
         */
        orderBy: undefined,
        /**
         * Page size
         * @type number
         * @default 10
         */
        pageSize: 10,
        /**
         * Server side request parameters
         * @type function
         * @return object
         * @example params : function(){return {'name':'aa','sex':1};}
         */
        params: undefined,
        /**
         * Custom result list item show text
         * @type function
         * @param data {object} row data
         * @return string
         */
        formatItem: undefined,
        /**
         * Have some highlight item and lost focus, auto select the highlight item
         * @type boolean
         * @default false
         */
        autoFillResult: false,
        /**
         * Auto select first item in show up result list or search result
         * depend on `autoFillResult` option set to true
         * @type boolean
         * @default false
         */
        autoSelectFirst: false,
        /**
         * Whether clear input element text when enter some keywords to search and no result return
         * @type boolean
         * @default true
         */
        noResultClean: true,
        /**
         * Select only mode
         * @type boolean
         */
        selectOnly: false,
        /**
         * Input to search delay time, work on ajax data source
         * @type number
         * @default 0.5
         */
        inputDelay: 0.5,
        /**
         * -----------------------------------------Callback--------------------------------------------
         */
        /**
         * Result list item selected callback
         * @type function
         * @param object - selected item json data
         * @param self   - plugin object
         */
        eSelect: undefined,
        /**
         * Before result list show up callback, you can do anything prepared
         * @param self - plugin object
         */
        eOpen: undefined,
        /**
         * Server side return data convert callback
         * @type function
         * @param data {object} server side return data
         * @param self {object} plugin object
         * @return {object} return data format：
         * @example 
         * {
         *   list : [{name:'aa',sex:1},{name:'bb',sex:1}...],
         *   totalRow : 100
         * }
         */
        eAjaxSuccess: undefined,
        /**
         * Close selected item tag callback (multiple mode)
         * @type function
         * @param removeCount {number} remove item count
         * @param self {object} plugin object
         */
        eTagRemove: undefined,
        /**
         * Clear selected item callback(single select mode)
         * @type function
         * @param self {object} plugin object
         */
        eClear: undefined
    };


    /**
     * SelectPage class definition
     * @constructor
     * @param {Object} input - input element
     * @param {Object} option
     */
    var SelectPage = function (input, option) {
        //特殊字段处理
        $.each({data: 'source', keyField: 'primaryKey', showField: 'field', pageSize: 'perPage'}, function (i, j) {
            if (typeof option[j] !== 'undefined') {
                option[i] = option[j];
                delete option[j];
            }
        });
        this.setOption(option);
        this.setLanguage();
        this.setCssClass();
        this.setProp();
        this.setElem(input);

        this.setButtonAttrDefault();
        this.setInitRecord();

        this.eDropdownButton();
        this.eInput();
        this.eWhole();
    };
    /**
     * Plugin version number
     */
    SelectPage.version = '2.18';
    /**
     * Plugin object cache key
     */
    SelectPage.dataKey = 'selectPageObject';
    /**
     * Options set
     * @param {Object} option
     */
    SelectPage.prototype.setOption = function (option) {
        //use showField to default
        option.searchField = option.searchField || option.showField;

        option.andOr = option.andOr.toUpperCase();
        if (option.andOr !== 'AND' && option.andOr !== 'OR')
            option.andOr = 'AND';

        //support multiple field set
        var arr = ['searchField'];
        for (var i = 0; i < arr.length; i++) {
            option[arr[i]] = this.strToArray(option[arr[i]]);
        }

        //set default order field
        option.orderBy = option.orderBy || option.showField;

        //set multiple order field
        //example:  [ ['id', 'ASC'], ['name', 'DESC'] ]
        option.orderBy = this.setOrderbyOption(option.orderBy, option.showField);
        //close auto fill result and auto select first in multiple mode and select item not close list
        if (option.multiple && !option.selectToCloseList) {
            option.autoFillResult = false;
            option.autoSelectFirst = false;
        }
        //show all item when pagination bar close, limited 200
        if (!option.pagination)
            option.pageSize = 200;
        if ($.type(option.listSize) !== 'number' || option.listSize < 0)
            option.listSize = 10;

        this.option = option;
    };

    /**
     * String convert to array
     * @param str {string}
     * @return {Array}
     */
    SelectPage.prototype.strToArray = function (str) {
        if (!str)
            return '';
        return str.replace(/[\s　]+/g, '').split(',');
    };

    /**
     * Set order field
     * @param {Array} arg_order
     * @param {string} arg_field
     * @return {Array}
     */
    SelectPage.prototype.setOrderbyOption = function (arg_order, arg_field) {
        var arr = [], orders = [];
        if (typeof arg_order == 'object') {
            for (var i = 0; i < arg_order.length; i++) {
                orders = $.trim(arg_order[i]).split(' ');
                arr[i] = (orders.length == 2) ? orders : [orders[0], 'ASC'];
            }
        } else {
            orders = $.trim(arg_order).split(' ');
            arr[0] = (orders.length == 2) ? orders : (orders[0].match(/^(ASC|DESC)$/i)) ? [arg_field, orders[0]] : [orders[0], 'ASC'];
        }
        return arr;
    };

    /**
     * i18n
     */
    SelectPage.prototype.setLanguage = function () {
        var message, p = this.option;
        switch (p.lang) {
            // English
            case 'en':
                message = {
                    add_btn: 'Add button',
                    add_title: 'add a box',
                    del_btn: 'Del button',
                    del_title: 'delete a box',
                    next: 'Next',
                    next_title: 'Next' + p.pageSize + ' (Right key)',
                    prev: 'Prev',
                    prev_title: 'Prev' + p.pageSize + ' (Left key)',
                    first_title: 'First (Shift + Left key)',
                    last_title: 'Last (Shift + Right key)',
                    get_all_btn: 'Get All (Down key)',
                    get_all_alt: '(button)',
                    close_btn: 'Close (Tab key)',
                    close_alt: '(button)',
                    loading: 'loading...',
                    loading_alt: '(loading)',
                    page_info: 'page_num of page_count',
                    select_ng: 'Attention : Please choose from among the list.',
                    select_ok: 'OK : Correctly selected.',
                    not_found: 'not found',
                    ajax_error: 'An error occurred while connecting to server.',
                    clear: 'Clear content',
                    select_all: 'Select current page',
                    unselect_all: 'Clear current page',
                    clear_all: 'Clear all selected',
                    max_selected: 'You can only select up to max_selected_limit items'
                };
                break;
                // 中文
            case 'cn':
            default:
                message = {
                    add_btn: '添加按钮',
                    add_title: '添加区域',
                    del_btn: '删除按钮',
                    del_title: '删除区域',
                    next: '下一页',
                    next_title: '下' + p.pageSize + ' (→)',
                    prev: '上一页',
                    prev_title: '上' + p.pageSize + ' (←)',
                    first_title: '首页 (Shift + ←)',
                    last_title: '尾页 (Shift + →)',
                    get_all_btn: '获得全部 (↓)',
                    get_all_alt: '(按钮)',
                    close_btn: '关闭 (Tab键)',
                    close_alt: '(按钮)',
                    loading: '读取中...',
                    loading_alt: '(读取中)',
                    page_info: '第 page_num 页(共page_count页)',
                    select_ng: '请注意：请从列表中选择.',
                    select_ok: 'OK : 已经选择.',
                    not_found: '无查询结果',
                    ajax_error: '连接到服务器时发生错误！',
                    clear: '清除内容',
                    select_all: '选择当前页项目',
                    unselect_all: '取消选择当前页项目',
                    clear_all: '清除全部已选择项目',
                    max_selected: '最多只能选择 max_selected_limit 个项目'
                };
                break;
        }
        this.message = message;
    };

    /**
     * Css classname defined
     */
    SelectPage.prototype.setCssClass = function () {
        var css_class = {
            container: 'sp_container',
            container_open: 'sp_container_open',
            re_area: 'sp_result_area',
            result_open: 'sp_result_area_open',
            control_box: 'sp_control_box',
            //multiple select mode
            element_box: 'sp_element_box',
            navi: 'sp_navi',
            //result list
            results: 'sp_results',
            re_off: 'sp_results_off',
            select: 'sp_over',
            select_ok: 'sp_select_ok',
            select_ng: 'sp_select_ng',
            selected: 'sp_selected',
            input_off: 'sp_input_off',
            message_box: 'sp_message_box',
            disabled: 'sp_disabled',

            button: 'sp_button',
            btn_on: 'sp_btn_on',
            btn_out: 'sp_btn_out',
            input: 'sp_input',
            clear_btn: 'sp_clear_btn',
            align_right: 'sp_align_right'
        };
        this.css_class = css_class;
    };

    /**
     * Plugin inner properties
     */
    SelectPage.prototype.setProp = function () {
        this.prop = {
            //input disabled status
            disabled: false,
            current_page: 1,
            //total page
            max_page: 1,
            //ajax data loading status
            is_loading: false,
            xhr: false,
            key_paging: false,
            key_select: false,
            //last selected item value
            prev_value: '',
            //last selected item text
            selected_text: '',
            last_input_time: undefined,
            init_set: false
        };
        this.template = {
            tag: {
                content: '<li class="selected_tag" itemvalue="#item_value#">#item_text#<span class="tag_close"><i class="spfont sp-close"></i></span></li>',
                textKey: '#item_text#',
                valueKey: '#item_value#'
            },
            page: {
                current: 'page_num',
                total: 'page_count'
            },
            msg: {
                maxSelectLimit: 'max_selected_limit'
            }
        };
    };

    /**
     * Get the actual width/height of invisible DOM elements with jQuery.
     * Source code come from dreamerslab/jquery.actual
     * @param element
     * @param method
     * @returns {*}
     */
    SelectPage.prototype.elementRealSize = function (element, method) {
        var defaults = {
            absolute: false,
            clone: false,
            includeMargin: false,
            display: 'block'
        };
        var configs = defaults, $target = element.eq(0), fix, restore, tmp = [], style = '', $hidden;

        fix = function () {
            // get all hidden parents
            $hidden = $target.parents().addBack().filter(':hidden');
            style += 'visibility: hidden !important; display: ' + configs.display + ' !important; ';

            if (configs.absolute === true)
                style += 'position: absolute !important;';

            // save the origin style props
            // set the hidden el css to be got the actual value later
            $hidden.each(function () {
                // Save original style. If no style was set, attr() returns undefined
                var $this = $(this), thisStyle = $this.attr('style');
                tmp.push(thisStyle);
                // Retain as much of the original style as possible, if there is one
                $this.attr('style', thisStyle ? thisStyle + ';' + style : style);
            });
        };

        restore = function () {
            // restore origin style values
            $hidden.each(function (i) {
                var $this = $(this), _tmp = tmp[ i ];

                if (_tmp === undefined)
                    $this.removeAttr('style');
                else
                    $this.attr('style', _tmp);
            });
        };

        fix();
        // get the actual value with user specific methed
        // it can be 'width', 'height', 'outerWidth', 'innerWidth'... etc
        // configs.includeMargin only works for 'outerWidth' and 'outerHeight'
        var actual = /(outer)/.test(method) ?
                $target[ method ](configs.includeMargin) :
                $target[ method ]();

        restore();
        // IMPORTANT, this plugin only return the value of the first element
        return actual;
    };

    /**
     * Dom building
     * @param {Object} combo_input - original input element
     */
    SelectPage.prototype.setElem = function (combo_input) {
        // 1. build Dom object
        var elem = {}, p = this.option, css = this.css_class, msg = this.message, input = $(combo_input);
        var orgWidth = input.outerWidth();
        // fix input width in hidden situation
        if (orgWidth <= 0)
            orgWidth = this.elementRealSize(input, 'outerWidth');
        if (orgWidth < 150)
            orgWidth = 150;

        elem.combo_input = input.attr({'autocomplete': 'off'}).addClass(css.input).wrap('<div>');
        if (p.selectOnly)
            elem.combo_input.prop('readonly', true);
        elem.container = elem.combo_input.parent().addClass(css.container);
        if (elem.combo_input.prop('disabled')) {
            if (p.multiple)
                elem.container.addClass(css.disabled);
            else
                elem.combo_input.addClass(css.input_off);
        }

        // set outer box width
        elem.container.width(orgWidth);

        elem.button = $('<div>').addClass(css.button);
        //drop down button
        elem.dropdown = $('<span class="sp_caret"></span>');
        //clear button 'X' in single mode
        elem.clear_btn = $('<div>').html($('<i>').addClass('spfont sp-close')).addClass(css.clear_btn).attr('title', msg.clear);
        if (!p.dropButton)
            elem.clear_btn.addClass(css.align_right);

        //main box in multiple mode
        elem.element_box = $('<ul>').addClass(css.element_box);
        if (p.multiple && p.multipleControlbar)
            elem.control = $('<div>').addClass(css.control_box);
        //result list box
        elem.result_area = $('<div>').addClass(css.re_area);
        //pagination bar
        if (p.pagination)
            elem.navi = $('<div>').addClass('sp_pagination').append('<ul>');
        elem.results = $('<ul>').addClass(css.results);

        var namePrefix = '_text',
                input_id = elem.combo_input.attr('id') || elem.combo_input.attr('name'),
                input_name = elem.combo_input.attr('name') || 'selectPage',
                hidden_name = input_name,
                hidden_id = input_id;

        //switch the id and name attributes of input/hidden element
        elem.hidden = $('<input type="hidden" class="sp_hidden" />').attr({
            name: hidden_name,
            id: hidden_id
        }).val('');
        elem.combo_input.attr({
            name: input_name + namePrefix,
            id: input_id + namePrefix
        });

        // 2. DOM element put
        elem.container.append(elem.hidden);
        if (p.dropButton) {
            elem.container.append(elem.button)
            elem.button.append(elem.dropdown);
        }
        $(document.body).append(elem.result_area);
        elem.result_area.append(elem.results);
        if (p.pagination)
            elem.result_area.append(elem.navi);

        //Multiple select mode
        if (p.multiple) {
            if (p.multipleControlbar) {
                elem.control.append('<button type="button" class="btn btn-default sp_clear_all" ><i class="spfont sp-clear"></i></button>');
                elem.control.append('<button type="button" class="btn btn-default sp_unselect_all" ><i class="spfont sp-unselect-all"></i></button>');
                elem.control.append('<button type="button" class="btn btn-default sp_select_all" ><i class="spfont sp-select-all"></i></button>');
                elem.control_text = $('<p>');
                elem.control.append(elem.control_text);
                elem.result_area.prepend(elem.control);
            }
            elem.container.addClass('sp_container_combo');
            elem.combo_input.addClass('sp_combo_input').before(elem.element_box);
            var li = $('<li>').addClass('input_box');
            li.append(elem.combo_input);
            elem.element_box.append(li);
            if (elem.combo_input.attr('placeholder'))
                elem.combo_input.attr('placeholder_bak', elem.combo_input.attr('placeholder'));
        }

        this.elem = elem;
    };

    /**
     * Drop down button set to default
     */
    SelectPage.prototype.setButtonAttrDefault = function () {
        /*
         if (this.option.selectOnly) {
         if ($(this.elem.combo_input).val() !== '') {
         if ($(this.elem.hidden).val() !== '') {
         //选择条件
         $(this.elem.combo_input).attr('title', this.message.select_ok).removeClass(this.css_class.select_ng).addClass(this.css_class.select_ok);
         } else {
         //输入方式
         $(this.elem.combo_input).attr('title', this.message.select_ng).removeClass(this.css_class.select_ok).addClass(this.css_class.select_ng);
         }
         } else {
         $(this.elem.hidden).val('');
         $(this.elem.combo_input).removeAttr('title').removeClass(this.css_class.select_ng);
         }
         }
         */
        //this.elem.button.attr('title', this.message.get_all_btn);
        if (this.option.dropButton)
            this.elem.button.attr('title', this.message.close_btn);
    };

    /**
     * Set item need selected after init
     * set selected item ways:
     * <input value="key">
     * <input data-init="key">
     */
    SelectPage.prototype.setInitRecord = function (refresh) {
        var self = this, p = self.option, el = self.elem, key = '';
        if ($.type(el.combo_input.data('init')) != 'undefined')
            p.initRecord = String(el.combo_input.data('init'));
        //data-init and value attribute can be init plugin selected item
        //but, if set data-init and value attribute in the same time, plugin will choose data-init attribute first
        if (!refresh && !p.initRecord && el.combo_input.val())
            p.initRecord = el.combo_input.val();
        el.combo_input.val('');
        if (!refresh)
            el.hidden.val(p.initRecord);
        key = refresh && el.hidden.val() ? el.hidden.val() : p.initRecord;
        if (key) {
            if (typeof p.data === 'object') {
                var data = new Array();
                var keyarr = key.split(',');
                $.each(keyarr, function (index, row) {
                    for (var i = 0; i < p.data.length; i++) {
                        if (p.data[i][p.keyField] == row) {
                            data.push(p.data[i]);
                            break;
                        }
                    }
                });
                if (!p.multiple && data.length > 1)
                    data = [data[0]];
                self.afterInit(self, data);
            } else {//ajax data source mode to init selected item
                $.ajax({
                    dataType: 'json',
                    type: 'POST',
                    url: p.data,
                    data: {
                        searchTable: p.dbTable,
                        searchKey: p.keyField,
                        searchValue: key,
                        orderBy: p.orderBy,
                        showField: p.showField,
                        keyField: p.keyField,
                        keyValue: key,
                        searchField: p.searchField
                    },
                    success: function (json) {
                        var d = null;
                        if (p.eAjaxSuccess && $.isFunction(p.eAjaxSuccess))
                            d = p.eAjaxSuccess(json);
                        self.afterInit(self, d.list);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        self.ajaxErrorNotify(self, errorThrown);
                    }
                });
            }
        }
    };

    /**
     * Selected item set to plugin
     * @param {Object} self
     * @param {Object} data - selected item data
     */
    SelectPage.prototype.afterInit = function (self, data) {
        if (!data || ($.isArray(data) && data.length === 0))
            return;
        if (!$.isArray(data))
            data = [data];
        var p = self.option, css = self.css_class;

        var getText = function (row) {
            var text = row[p.showField];
            if (p.formatItem && $.isFunction(p.formatItem)) {
                try {
                    text = p.formatItem(row);
                } catch (e) {
                }
            }
            return text;
        };

        if (p.multiple) {
            self.prop.init_set = true;
            self.clearAll(self);
            $.each(data, function (i, row) {
                var item = {text: getText(row), value: row[p.keyField]};
                if (!self.isAlreadySelected(self, item))
                    self.addNewTag(self, item);
            });
            self.tagValuesSet(self);
            self.inputResize(self);
            console.log(self.elem.hidden.blur());
            self.prop.init_set = false;
        } else {
            var row = data[0];
            self.elem.combo_input.val(getText(row));
            self.elem.hidden.val(row[p.keyField]);
            self.prop.prev_value = getText(row);
            self.prop.selected_text = getText(row);
            if (p.selectOnly) {
                self.elem.combo_input.attr('title', self.message.select_ok).removeClass(css.select_ng).addClass(css.select_ok);
            }
            self.putClearButton();
        }
    };

    /**
     * Drop down button event bind
     */
    SelectPage.prototype.eDropdownButton = function () {
        var self = this;
        if (self.option.dropButton) {
            self.elem.button.mouseup(function (ev) {
                ev.stopPropagation();
                if (self.elem.result_area.is(':hidden') && !self.elem.combo_input.prop('disabled')) {
                    self.elem.combo_input.focus();
                } else
                    self.hideResults(self);
            });
        }
    };

    /**
     * Events bind
     */
    SelectPage.prototype.eInput = function () {
        var self = this, p = self.option, el = self.elem, msg = self.message;
        var showList = function () {
            self.prop.page_move = false;
            self.suggest(self);
            self.setCssFocusedInput(self);
        };
        el.combo_input.keyup(function (e) {
            self.processKey(self, e);
        }).keydown(function (e) {
            self.processControl(self, e);
        }).focus(function (e) {
            //When focus on input, show the result list
            if (el.result_area.is(':hidden')) {
                e.stopPropagation();
                self.prop.first_show = true;
                showList();
            }
        });
        el.container.on('click.SelectPage', 'div.' + self.css_class.clear_btn, function (e) {
            e.stopPropagation();
            if (!self.disabled(self)) {
                self.clearAll(self);
                self.elem.hidden.change();
                if (p.eClear && $.isFunction(p.eClear))
                    p.eClear(self);
            }
        });
        el.result_area.on('mousedown.SelectPage', function (e) {
            e.stopPropagation();
        });
        if (p.multiple) {
            if (p.multipleControlbar) {
                //Select all item of current page
                el.control.find('.sp_select_all').on('click.SelectPage', function (e) {
                    self.selectAllLine(self);
                }).hover(function () {
                    el.control_text.html(msg.select_all);
                }, function () {
                    el.control_text.html('');
                });
                //Cancel select all item of current page
                el.control.find('.sp_unselect_all').on('click.SelectPage', function (e) {
                    self.unSelectAllLine(self);
                }).hover(function () {
                    el.control_text.html(msg.unselect_all);
                }, function () {
                    el.control_text.html('');
                });
                //Clear all selected item
                el.control.find('.sp_clear_all').on('click.SelectPage', function (e) {
                    self.clearAll(self);
                }).hover(function () {
                    el.control_text.html(msg.clear_all);
                }, function () {
                    el.control_text.html('');
                });
            }
            el.element_box.on('click.SelectPage', function (e) {
                var srcEl = e.target || e.srcElement;
                if ($(srcEl).is('ul'))
                    el.combo_input.focus();
            });
            //Tag close
            el.element_box.on('click.SelectPage', 'span.tag_close', function () {
                var li = $(this).closest('li');
                self.removeTag(self, li);
                showList();
                if (p.eTagRemove && $.isFunction(p.eTagRemove))
                    p.eTagRemove(1, self);
            });
            self.inputResize(self);
        }
    };

    /**
     * Out of plugin area click event handler
     */
    SelectPage.prototype.eWhole = function () {
        var self = this, css = self.css_class;
        var cleanContent = function (obj) {
            obj.elem.combo_input.val('');
            if (!obj.option.multiple)
                obj.elem.hidden.val('');
            obj.prop.selected_text = '';
        };

        //Out of plugin area
        $(document.body).off('mousedown.selectPage').on('mousedown.selectPage', function (e) {
            var ele = e.target || e.srcElement;
            var sp = $(ele).closest('div.' + css.container);
            //Open status result list
            $('div.' + css.container + '.' + css.container_open).each(function () {
                if (this == sp[0])
                    return;
                var $this = $(this), d = $this.find('input.' + css.input).data(SelectPage.dataKey);

                if (!d.elem.combo_input.val() && d.elem.hidden.val() && !d.option.multiple) {
                    d.prop.current_page = 1;//reset page to 1
                    cleanContent(d);
                    d.hideResults(d);
                    return true;
                }
                if (d.elem.results.find('li').not('.' + css.message_box).size()) {
                    if (d.option.autoFillResult) {
                        //have selected item, then hide result list
                        if (d.elem.hidden.val())
                            d.hideResults(d);
                        else if (d.elem.results.find('li.sp_over').size()) {
                            //no one selected and have highlight item, select the highlight item
                            d.selectCurrentLine(d, true);
                        } else if (d.option.autoSelectFirst) {
                            //no one selected, no one highlight, select the first item
                            d.nextLine(d);
                            d.selectCurrentLine(d, true);
                        } else
                            d.hideResults(d);
                    } else
                        d.hideResults(d);
                } else {
                    //when no one item match, clear search keywords
                    if (d.option.noResultClean)
                        cleanContent(d);
                    else {
                        if (!d.option.multiple)
                            d.elem.hidden.val('');
                    }
                    d.hideResults(d);
                }
            });
        });
    };

    /**
     * Result list event bind
     */
    SelectPage.prototype.eResultList = function () {
        var self = this, css = this.css_class;
        self.elem.results.children('li').hover(function () {
            if (self.prop.key_select) {
                self.prop.key_select = false;
                return;
            }
            if (!$(this).hasClass(css.selected) && !$(this).hasClass(css.message_box)) {
                $(this).addClass(css.select);
                self.setCssFocusedResults(self);
            }
        }, function () {
            $(this).removeClass(css.select);
        }).click(function (e) {
            if (self.prop.key_select) {
                self.prop.key_select = false;
                return;
            }
            e.preventDefault();
            e.stopPropagation();

            if (!$(this).hasClass(css.selected))
                self.selectCurrentLine(self, false);
        });
    };

    /**
     * Reposition result list when list beyond the visible area
     */
    SelectPage.prototype.eScroll = function () {
        var self = this, css = this.css_class;
        $(window).on('scroll.SelectPage', function (e) {
            $('div.' + css.container + '.' + css.container_open).each(function () {
                var $this = $(this), d = $this.find('input.' + css.input).data(SelectPage.dataKey),
                        offset = d.elem.result_area.offset(),
                        screenScrollTop = $(window).scrollTop(),
                        docHeight = $(document).height(),
                        viewHeight = $(window).height(),
                        listHeight = d.elem.result_area.outerHeight(),
                        listBottom = offset.top + listHeight,
                        hasOverflow = docHeight > viewHeight,
                        down = d.elem.result_area.hasClass('shadowDown');
                if (hasOverflow) {
                    if (down) {//open down
                        if (listBottom > (viewHeight + screenScrollTop))
                            d.calcResultsSize(d);
                    } else {//open up
                        if (offset.top < screenScrollTop)
                            d.calcResultsSize(d);
                    }
                }
            });
        });
    };

    /**
     * Page bar button event bind
     */
    SelectPage.prototype.ePaging = function () {
        var self = this;
        if (!self.option.pagination)
            return;
        self.elem.navi.find('li.csFirstPage').off('click').on('click', function (ev) {
            //$(self.elem.combo_input).focus();
            ev.preventDefault();
            self.firstPage(self);
        });

        self.elem.navi.find('li.csPreviousPage').off('click').on('click', function (ev) {
            //$(self.elem.combo_input).focus();
            ev.preventDefault();
            self.prevPage(self);
        });

        self.elem.navi.find('li.csNextPage').off('click').on('click', function (ev) {
            //$(self.elem.combo_input).focus();
            ev.preventDefault();
            self.nextPage(self);
        });

        self.elem.navi.find('li.csLastPage').off('click').on('click', function (ev) {
            //$(self.elem.combo_input).focus();
            ev.preventDefault();
            self.lastPage(self);
        });
    };

    /**
     * Ajax request fail
     * @param {Object} self
     * @param {string} errorThrown
     */
    SelectPage.prototype.ajaxErrorNotify = function (self, errorThrown) {
        self.showMessage(self.message.ajax_error);
    };

    /**
     * Message box
     * @param {Object} self
     * @param msg {string} the text need to show
     */
    SelectPage.prototype.showMessage = function (self, msg) {
        if (!msg)
            return;
        var msgLi = '<li class="' + self.css_class.message_box + '"><i class="spfont sp-warning"></i> ' + msg + '</li>';
        self.elem.results.empty().append(msgLi).show();
        self.calcResultsSize(self);
        self.setOpenStatus(self, true);
        self.elem.control.hide();
        if (self.option.pagination)
            self.elem.navi.hide();
    };

    /**
     * @desc Scroll
     * @param {Object} self
     * @param {boolean} enforce
     */
    SelectPage.prototype.scrollWindow = function (self, enforce) {
        var current_result = self.getCurrentLine(self),
                target_top = (current_result && !enforce) ? current_result.offset().top : self.elem.container.offset().top,
                target_size;

        self.prop.size_li = self.elem.results.children('li:first').outerHeight();
        target_size = self.prop.size_li;

        var gap, client_height = $(window).height(),
                scroll_top = $(window).scrollTop(),
                scroll_bottom = scroll_top + client_height - target_size;
        if (current_result.length) {
            if (target_top < scroll_top || target_size > client_height) {
                //scroll to top
                gap = target_top - scroll_top;
            } else if (target_top > scroll_bottom) {
                //scroll down
                gap = target_top - scroll_bottom;
            } else
                return; //do not scroll
        } else if (target_top < scroll_top)
            gap = target_top - scroll_top;
        window.scrollBy(0, gap);
    };
    /**
     * change css class by status
     * @param self
     * @param status {boolean} true: open, false: close
     */
    SelectPage.prototype.setOpenStatus = function (self, status) {
        var el = self.elem, css = self.css_class;
        if (status) {
            el.container.addClass(css.container_open);
            el.result_area.addClass(css.result_open);
        } else {
            el.container.removeClass(css.container_open);
            el.result_area.removeClass(css.result_open);
        }
    };

    /**
     * input element in focus css class set
     * @param {Object} self
     */
    SelectPage.prototype.setCssFocusedInput = function (self) {
        //$(self.elem.results).addClass(self.css_class.re_off);
        //$(self.elem.combo_input).removeClass(self.css_class.input_off);
    };

    /**
     * set result list get focus and input element lost focus
     * @param {Object} self
     */
    SelectPage.prototype.setCssFocusedResults = function (self) {
        //$(self.elem.results).removeClass(self.css_class.re_off);
        //$(self.elem.combo_input).addClass(self.css_class.input_off);
    };

    /**
     * Quick search input keywords listener
     * @param {Object} self
     */
    SelectPage.prototype.checkValue = function (self) {
        var now_value = self.elem.combo_input.val();
        if (now_value != self.prop.prev_value) {
            self.prop.prev_value = now_value;
            self.prop.first_show = false;

            if (self.option.selectOnly)
                self.setButtonAttrDefault();
            if (!self.option.multiple && !now_value) {
                self.elem.combo_input.val('');
                self.elem.hidden.val('');
                self.elem.clear_btn.remove();
            }

            self.suggest(self);
        }
    };

    /**
     * Input handle（regular input）
     * @param {Object} self
     * @param {Object} e - event object
     */
    SelectPage.prototype.processKey = function (self, e) {
        if ($.inArray(e.keyCode, [37, 38, 39, 40, 27, 9, 13]) === -1) {
            if (e.keyCode != 16)
                self.setCssFocusedInput(self); // except Shift(16)
            self.inputResize(self);
            if ($.type(self.option.data) === 'string') {
                self.prop.last_input_time = e.timeStamp;
                setTimeout(function () {
                    if ((e.timeStamp - self.prop.last_input_time) === 0)
                        self.checkValue(self);
                }, self.option.inputDelay * 1000);
            } else {
                self.checkValue(self);
            }
        }
    }

    /**
     * Input handle（control key）
     * @param {Object} self
     * @param {Object} e - event object
     */
    SelectPage.prototype.processControl = function (self, e) {
        if (($.inArray(e.keyCode, [37, 38, 39, 40, 27, 9]) > -1 && self.elem.result_area.is(':visible')) ||
                ($.inArray(e.keyCode, [13, 9]) > -1 && self.getCurrentLine(self))) {
            e.preventDefault();
            e.stopPropagation();
            e.cancelBubble = true;
            e.returnValue = false;
            switch (e.keyCode) {
                case 37:// left
                    if (e.shiftKey)
                        self.firstPage(self);
                    else
                        self.prevPage(self);
                    break;
                case 38:// up
                    self.prop.key_select = true;
                    self.prevLine(self);
                    break;
                case 39:// right
                    if (e.shiftKey)
                        self.lastPage(self);
                    else
                        self.nextPage(self);
                    break;
                case 40:// down
                    if (self.elem.results.children('li').length) {
                        self.prop.key_select = true;
                        self.nextLine(self);
                    } else
                        self.suggest(self);
                    break;
                case 9:// tab
                    self.prop.key_paging = true;
                    self.selectCurrentLine(self, true);
                    //self.hideResults(self);
                    break;
                case 13:// return
                    self.selectCurrentLine(self, true);
                    break;
                case 27://  escape
                    self.prop.key_paging = true;
                    self.hideResults(self);
                    break;
            }
        }
    };

    /**
     * Abort Ajax request
     * @param {Object} self
     */
    SelectPage.prototype.abortAjax = function (self) {
        if (self.prop.xhr) {
            self.prop.xhr.abort();
            self.prop.xhr = false;
        }
    };

    /**
     * Suggest result of search keywords
     * @param {Object} self
     */
    SelectPage.prototype.suggest = function (self) {
        var q_word, val = $.trim(self.elem.combo_input.val());
        if (self.option.multiple)
            q_word = val;
        else {
            if (val && val === self.prop.selected_text)
                q_word = '';
            else
                q_word = val;
        }
        q_word = q_word.split(/[\s　]+/);

        //Before show up result list callback
        if (self.option.eOpen && $.isFunction(self.option.eOpen))
            self.option.eOpen.call(self);

        self.abortAjax(self);
        //self.setLoading(self);
        var which_page_num = self.prop.current_page || 1;

        if (typeof self.option.data == 'object')
            self.searchForJson(self, q_word, which_page_num);
        else
            self.searchForDb(self, q_word, which_page_num);
    };

    /**
     * Loading
     * @param {Object} self
     */
    SelectPage.prototype.setLoading = function (self) {
        if (self.elem.results.html() === '') {
            //self.calcResultsSize(self);
            self.setOpenStatus(self, true);
        }
    };

    /**
     * Search for ajax
     * @param {Object} self
     * @param {Array} q_word - query keyword
     * @param {number} which_page_num - target page number
     */
    SelectPage.prototype.searchForDb = function (self, q_word, which_page_num) {
        var p = self.option;
        if (!p.eAjaxSuccess || !$.isFunction(p.eAjaxSuccess))
            self.hideResults(self);
        var _paramsFunc = p.params, _params = {}, searchKey = p.searchField;
        //when have new query keyword, then reset page number to 1.
        if (q_word.length && q_word[0] && q_word[0] !== self.prop.prev_value)
            which_page_num = 1;
        var _orgParams = {
            q_word: q_word,
            pageNumber: which_page_num,
            pageSize: p.pageSize,
            andOr: p.andOr,
            orderBy: p.orderBy,
            searchTable: p.dbTable,
            showField: self.option.showField,
            keyField: self.option.keyField,
            searchField: self.option.searchField
        };
        _orgParams[searchKey] = q_word[0];
        if (_paramsFunc) {
            var result = $.isFunction(_paramsFunc) ? _paramsFunc() : _paramsFunc;
            if (result && $.isPlainObject(result)) {
                _params = $.extend({}, _orgParams, result);
            } else {
                _params = _orgParams;
            }
        } else
            _params = _orgParams;
        self.prop.xhr = $.ajax({
            dataType: 'json',
            url: p.data,
            type: 'POST',
            data: _params,
            success: function (returnData) {
                if (!returnData || !$.isPlainObject(returnData)) {
                    self.hideResults(self);
                    self.ajaxErrorNotify(self, errorThrown);
                    return;
                }
                var data = {}, json = {};
                try {
                    data = p.eAjaxSuccess(returnData);
                    json.originalResult = data.list;
                    json.cnt_whole = data.totalRow;
                } catch (e) {
                    self.showMessage(self, self.message.ajax_error);
                    return;
                }
                if(self.elem.navi) {
                    $(self.elem.navi).toggleClass("hide", json.cnt_whole <= json.originalResult.length);
                }
                
                json.candidate = [];
                json.keyField = [];
                if (typeof json.originalResult != 'object') {
                    self.prop.xhr = null;
                    self.notFoundSearch(self);
                    return;
                }
                json.cnt_page = json.originalResult.length;
                for (var i = 0; i < json.cnt_page; i++) {
                    for (var key in json.originalResult[i]) {
                        if (key == p.keyField) {
                            json.keyField.push(json.originalResult[i][key]);
                        }
                        if (key == p.showField) {
                            json.candidate.push(json.originalResult[i][key]);
                        }
                    }
                }
                self.prepareResults(self, json, q_word, which_page_num);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (textStatus != 'abort') {
                    self.hideResults(self);
                    self.ajaxErrorNotify(self, errorThrown);
                }
            },
            complete: function () {
                self.prop.xhr = null;
            }
        });
    };

    /**
     * Search for json data source
     * @param {Object} self
     * @param {Array} q_word
     * @param {number} which_page_num
     */
    SelectPage.prototype.searchForJson = function (self, q_word, which_page_num) {
        var p = self.option, matched = [], esc_q = [], sorted = [], json = {}, i = 0, arr_reg = [];

        //query keyword filter
        do {
            //'/\W/g'正则代表全部不是字母，数字，下划线，汉字的字符
            //将非法字符进行转义
            esc_q[i] = q_word[i].replace(/\W/g, '\\$&').toString();
            arr_reg[i] = new RegExp(esc_q[i], 'gi');
            i++;
        } while (i < q_word.length);

        // SELECT * FROM data WHERE field LIKE q_word;
        for (i = 0; i < p.data.length; i++) {
            var flag = false, row = p.data[i], itemText;
            for (var j = 0; j < arr_reg.length; j++) {
                itemText = row[p.searchField];
                if (p.formatItem && $.isFunction(p.formatItem))
                    itemText = p.formatItem(row);
                if (itemText.match(arr_reg[j])) {
                    flag = true;
                    if (p.andOr == 'OR')
                        break;
                } else {
                    flag = false;
                    if (p.andOr == 'AND')
                        break;
                }
            }
            if (flag)
                matched.push(row);
        }

        // (CASE WHEN ...) then く order some column
        var reg1 = new RegExp('^' + esc_q[0] + '$', 'gi'),
                reg2 = new RegExp('^' + esc_q[0], 'gi'),
                matched1 = [], matched2 = [], matched3 = [];
        for (i = 0; i < matched.length; i++) {
            var orderField = p.orderBy[0][0];
            var orderValue = String(matched[i][orderField]);
            if (orderValue.match(reg1)) {
                matched1.push(matched[i]);
            } else if (orderValue.match(reg2)) {
                matched2.push(matched[i]);
            } else {
                matched3.push(matched[i]);
            }
        }

        if (p.orderBy[0][1].match(/^asc$/i)) {
            matched1 = self.sortAsc(self, matched1);
            matched2 = self.sortAsc(self, matched2);
            matched3 = self.sortAsc(self, matched3);
        } else {
            matched1 = self.sortDesc(self, matched1);
            matched2 = self.sortDesc(self, matched2);
            matched3 = self.sortDesc(self, matched3);
        }
        sorted = sorted.concat(matched1).concat(matched2).concat(matched3);

        /*
         if (sorted.length === undefined || sorted.length === 0 ) {
         self.notFoundSearch(self);
         return;
         }
         */
        json.cnt_whole = sorted.length;
        //page_move used to distinguish between init plugin or page moving
        if (!self.prop.page_move) {
            //only single mode can be used page number relocation
            if (!p.multiple) {
                //get selected item belong page number
                var currentValue = self.elem.hidden.val();
                if ($.type(currentValue) !== 'undefined' && $.trim(currentValue) !== '') {
                    var index = 0;
                    $.each(sorted, function (i, row) {
                        if (row[p.keyField] == currentValue) {
                            index = i + 1;
                            return false;
                        }
                    });
                    which_page_num = Math.ceil(index / p.pageSize);
                    if (which_page_num < 1)
                        which_page_num = 1;
                    self.prop.current_page = which_page_num;
                }
            }
        } else {
            //set page number to 1 when result number less then page size
            if (sorted.length <= ((which_page_num - 1) * p.pageSize)) {
                which_page_num = 1;
                self.prop.current_page = 1;
            }
        }

        //LIMIT xx OFFSET xx
        var start = (which_page_num - 1) * p.pageSize, end = start + p.pageSize;
        //save original data
        json.originalResult = [];
        //after data filter handle
        for (i = start; i < end; i++) {
            if (sorted[i] === undefined)
                break;
            json.originalResult.push(sorted[i]);
            for (var key in sorted[i]) {
                if (key == p.keyField) {
                    if (json.keyField === undefined)
                        json.keyField = [];
                    json.keyField.push(sorted[i][key]);
                }
                if (key == p.showField) {
                    if (json.candidate === undefined)
                        json.candidate = [];
                    json.candidate.push(sorted[i][key]);
                }
            }
        }

        if (json.candidate === undefined)
            json.candidate = [];
        json.cnt_page = json.candidate.length;
        self.prepareResults(self, json, q_word, which_page_num);
    };

    /**
     * Set order asc
     * @param {Object} self
     * @param {Array} arr - result array
     */
    SelectPage.prototype.sortAsc = function (self, arr) {
        arr.sort(function (a, b) {
            var valA = a[self.option.orderBy[0][0]], valB = b[self.option.orderBy[0][0]];
            return $.type(valA) === 'number' ? valA - valB : String(valA).localeCompare(String(valB));
        });
        return arr;
    };

    /**
     * Set order desc
     * @param {Object} self
     * @param {Array} arr - result array
     */
    SelectPage.prototype.sortDesc = function (self, arr) {
        arr.sort(function (a, b) {
            var valA = a[self.option.orderBy[0][0]], valB = b[self.option.orderBy[0][0]];
            return $.type(valA) === 'number' ? valB - valA : String(valB).localeCompare(String(valA));
        });
        return arr;
    };

    /**
     * Not result found handle
     * @param {Object} self
     */
    SelectPage.prototype.notFoundSearch = function (self) {
        self.elem.results.empty();
        self.calcResultsSize(self);
        self.setOpenStatus(self, true);
        self.setCssFocusedInput(self);
    };

    /**
     * Prepare data to show
     * @param {Object} self
     * @param {Object} json - data result
     * @param {Array} q_word - query keyword
     * @param {number} which_page_num - target page number
     */
    SelectPage.prototype.prepareResults = function (self, json, q_word, which_page_num) {
        if (self.option.pagination)
            self.setNavi(self, json.cnt_whole, json.cnt_page, which_page_num);

        if (!json.keyField)
            json.keyField = false;

        if (self.option.selectOnly && json.candidate.length === 1 && json.candidate[0] == q_word[0]) {
            self.elem.hidden.val(json.keyField[0]);
            this.setButtonAttrDefault();
        }
        var is_query = false;
        if (q_word && q_word.length && q_word[0])
            is_query = true;
        self.displayResults(self, json, is_query);
    };

    /**
     * Build page bar
     * @param {Object} self
     * @param {number} cnt_whole - total record count
     * @param {number} cnt_page
     * @param {number} page_num - current page number
     */
    SelectPage.prototype.setNavi = function (self, cnt_whole, cnt_page, page_num) {
        var msg = self.message;
        /**
         * build pagination bar
         */
        var buildPageNav = function (self, pagebar, page_num, last_page) {
            var updatePageInfo = function () {
                var pageInfo = msg.page_info;
                return pageInfo.replace(self.template.page.current, page_num).replace(self.template.page.total, last_page);
            };
            if (pagebar.find('li').size() === 0) {
                pagebar.hide().empty();
                var iconFist = 'spfont sp-first',
                        iconPrev = 'spfont sp-previous',
                        iconNext = 'spfont sp-next',
                        iconLast = 'spfont sp-last';

                pagebar.append('<li class="csFirstPage" title="' + msg.first_title + '" ><a href="javascript:void(0);"> <i class="' + iconFist + '"></i> </a></li>');
                pagebar.append('<li class="csPreviousPage" title="' + msg.prev_title + '" ><a href="javascript:void(0);"><i class="' + iconPrev + '"></i></a></li>');
                //pagination information
                pagebar.append('<li class="pageInfoBox"><a href="javascript:void(0);"> ' + updatePageInfo() + ' </a></li>');

                pagebar.append('<li class="csNextPage" title="' + msg.next_title + '" ><a href="javascript:void(0);"><i class="' + iconNext + '"></i></a></li>');
                pagebar.append('<li class="csLastPage" title="' + msg.last_title + '" ><a href="javascript:void(0);"> <i class="' + iconLast + '"></i> </a></li>');
                pagebar.show();
            } else {
                pagebar.find('li.pageInfoBox a').html(updatePageInfo());
            }
        };

        var pagebar = self.elem.navi.find('ul'),
                last_page = Math.ceil(cnt_whole / self.option.pageSize); //calculate total page
        if (last_page === 0)
            page_num = 0;
        else {
            if (last_page < page_num)
                page_num = last_page;
            else if (page_num === 0)
                page_num = 1;
        }
        self.prop.current_page = page_num;//update current page number
        self.prop.max_page = last_page;//update page count
        buildPageNav(self, pagebar, page_num, last_page);

        //update paging status
        var dClass = 'disabled',
                first = pagebar.find('li.csFirstPage'),
                previous = pagebar.find('li.csPreviousPage'),
                next = pagebar.find('li.csNextPage'),
                last = pagebar.find('li.csLastPage');
        //first and previous
        if (page_num === 1 || page_num === 0) {
            if (!first.hasClass(dClass))
                first.addClass(dClass);
            if (!previous.hasClass(dClass))
                previous.addClass(dClass);
        } else {
            if (first.hasClass(dClass))
                first.removeClass(dClass);
            if (previous.hasClass(dClass))
                previous.removeClass(dClass);
        }
        //next and last
        if (page_num === last_page || last_page === 0) {
            if (!next.hasClass(dClass))
                next.addClass(dClass);
            if (!last.hasClass(dClass))
                last.addClass(dClass);
        } else {
            if (next.hasClass(dClass))
                next.removeClass(dClass);
            if (last.hasClass(dClass))
                last.removeClass(dClass);
        }

        if (last_page > 1)
            self.ePaging(); //pagination event bind
    };

    /**
     * Render result list
     * @param {Object} self
     * @param {Object} json - result data
     * @param {boolean} is_query - used to different from search to open and just click to open
     */
    SelectPage.prototype.displayResults = function (self, json, is_query) {
        var p = self.option, el = self.elem;
        el.results.hide().empty();
        if (p.multiple && $.type(p.maxSelectLimit) === 'number' && p.maxSelectLimit > 0) {
            var selectedSize = el.element_box.find('li.selected_tag').size();
            if (selectedSize > 0 && selectedSize >= p.maxSelectLimit) {
                var msg = self.message.max_selected;
                self.showMessage(self, msg.replace(self.template.msg.maxSelectLimit, p.maxSelectLimit));
                return;
            }
        }

        if (json.candidate.length) {
            var arr_candidate = json.candidate,
                    arr_primary_key = json.keyField,
                    keystr = el.hidden.val(),
                    keyArr = keystr ? keystr.split(',') : new Array(),
                    itemText = '';
            for (var i = 0; i < arr_candidate.length; i++) {
                if (p.formatItem && $.isFunction(p.formatItem)) {
                    try {
                        itemText = p.formatItem(json.originalResult[i]);
                    } catch (e) {
                        console.error('formatItem内容格式化函数内容设置不正确！');
                        itemText = arr_candidate[i];
                    }
                } else
                    itemText = arr_candidate[i];
                var list = $('<li>').html(itemText).attr({
                    pkey: arr_primary_key[i]
                });
                if (!p.formatItem)
                    list.attr('title', itemText);

                //Set selected item highlight
                if ($.inArray(arr_primary_key[i].toString(), keyArr) !== -1) {
                    list.addClass(self.css_class.selected);
                }
                //cache item data
                list.data('dataObj', json.originalResult[i]);
                el.results.append(list);
            }
        } else {
            var li = '<li class="' + self.css_class.message_box + '"><i class="spfont sp-warning"></i> ' +
                    self.message.not_found + '</li>';
            el.results.append(li);
        }
        el.results.show();

        if (p.multiple && p.multipleControlbar)
            el.control.show();
        if (p.pagination)
            el.navi.show();
        self.calcResultsSize(self);
        self.setOpenStatus(self, true);

        //Result item event bind
        self.eResultList();
        //scrolling listen
        self.eScroll();
        //auto highlight first item in search, have result and set autoSelectFirst to true situation
        if (is_query && json.candidate.length && p.autoSelectFirst)
            self.nextLine(self);
    };

    /**
     * Calculate result list size and position
     * @param {Object} self
     */
    SelectPage.prototype.calcResultsSize = function (self) {
        var p = self.option, el = self.elem;
        var rePosition = function () {
            if (el.container.css('position') === 'static') {
                // position: static
                var offset = el.combo_input.offset();
                el.result_area.css({
                    top: offset.top + el.combo_input.outerHeight() + 'px',
                    left: offset.left + 'px'
                });
            } else {
                if (!p.pagination) {
                    var itemHeight = el.results.find('li:first').outerHeight(true),
                            listHeight = itemHeight * p.listSize;
                    el.results.css({
                        'max-height': listHeight,
                        'overflow-y': 'auto'
                    });
                }

                //handle result list show up side(left, right, up or down)
                var docWidth = $(document).width(),
                        docHeight = $(document).height(), //the document full height
                        viewHeight = $(window).height(), //browser visible area height
                        offset = el.container.offset(),
                        screenScrollTop = $(window).scrollTop(),
                        listWidth = el.result_area.outerWidth(),
                        //result list height
                        listHeight = el.result_area.outerHeight(),
                        //default left used input element left
                        defaultLeft = offset.left, //p.multiple ? -1 : 0;
                        //input element height
                        inputHeight = el.container.outerHeight(),
                        left = (offset.left + listWidth) > docWidth ?
                        defaultLeft - (listWidth - el.container.outerWidth()) :
                        defaultLeft,
                        //the actual top coordinate of input element(outer div)
                        screenTop = offset.top, //$(el.container).scrollTop();//offset.top - screenScrollTop;
                        top = 0, dist = 5, //set distance between input element and result list
                        //the actual top coordinate of result list
                        listBottom = screenTop + inputHeight + listHeight + dist,
                        hasOverflow = docHeight > viewHeight;

                if ((screenTop - screenScrollTop - dist > listHeight) &&
                        (hasOverflow && listBottom > (viewHeight + screenScrollTop)) ||
                        (!hasOverflow && listBottom > viewHeight)) {
                    //open up
                    top = offset.top - listHeight - dist;
                    el.result_area.removeClass('shadowUp shadowDown').addClass('shadowUp');
                } else {
                    //open down
                    top = offset.top + (p.multiple ? el.container.outerHeight() : inputHeight);
                    el.result_area.removeClass('shadowUp shadowDown').addClass('shadowDown');
                    top += dist;
                }
                return {
                    top: top + 'px', left: left + 'px'
                };
            }
        };
        if (el.result_area.is(':visible')) {
            el.result_area.css(rePosition());
        } else {
            var pss = rePosition();
            el.result_area.css(pss).show(1, function () {
                var repss = rePosition();
                if (pss.top !== repss.top || pss.left !== repss.left)
                    el.result_area.css(repss);
            });
        }
    };

    /**
     * hide result list
     * @param {Object} self
     */
    SelectPage.prototype.hideResults = function (self) {
        if (self.prop.key_paging) {
            self.scrollWindow(self, true);
            self.prop.key_paging = false;
        }
        self.setCssFocusedInput(self);

        if (self.option.autoFillResult) {
            //self.selectCurrentLine(self, true);
        }

        self.elem.results.empty();
        self.elem.result_area.hide();
        self.setOpenStatus(self, false);
        //unbind window scroll listen
        $(window).off('scroll.SelectPage');

        self.abortAjax(self);
        self.setButtonAttrDefault();
    };

    /**
     * set plugin to disabled / enabled
     * @param self
     * @param disabled
     */
    SelectPage.prototype.disabled = function (self, disabled) {
        var p = self.option, el = self.elem;
        if ($.type(disabled) === 'undefined')
            return el.combo_input.prop('disabled');
        if ($.type(disabled) === 'boolean') {
            el.combo_input.prop('disabled', disabled);
            if (disabled)
                el.container.addClass(self.css_class.disabled);
            else
                el.container.removeClass(self.css_class.disabled);
        }
    };

    /**
     * Go fist page
     * @param {Object} self
     */
    SelectPage.prototype.firstPage = function (self) {
        if (self.prop.current_page > 1) {
            self.prop.current_page = 1;
            self.prop.page_move = true;
            self.suggest(self);
        }
    };

    /**
     * Go previous page
     * @param {Object} self
     */
    SelectPage.prototype.prevPage = function (self) {
        if (self.prop.current_page > 1) {
            self.prop.current_page--;
            self.prop.page_move = true;
            self.suggest(self);
        }
    };

    /**
     * Go next page
     * @param {Object} self
     */
    SelectPage.prototype.nextPage = function (self) {
        if (self.prop.current_page < self.prop.max_page) {
            self.prop.current_page++;
            self.prop.page_move = true;
            self.suggest(self);
        }
    };

    /**
     * Go last page
     * @param {Object} self
     */
    SelectPage.prototype.lastPage = function (self) {
        if (self.prop.current_page < self.prop.max_page) {
            self.prop.current_page = self.prop.max_page;
            self.prop.page_move = true;
            self.suggest(self);
        }
    };
    /**
     * do something after select/unSelect action
     * @param {Object} self
     */
    SelectPage.prototype.afterAction = function (self) {
        self.inputResize(self);
        self.elem.combo_input.change();
        self.setCssFocusedInput(self);
        if (self.prop.init_set)
            return;
        if (self.option.multiple) {
            if (self.option.selectToCloseList) {
                self.hideResults(self);
                self.elem.combo_input.blur();
            } else {
                self.suggest(self);
                self.elem.combo_input.focus();
            }
        } else {
            self.hideResults(self);
            self.elem.combo_input.blur();
        }
    };

    /**
     * Select current list item
     * @param {Object} self
     * @param {boolean} is_enter_key
     */
    SelectPage.prototype.selectCurrentLine = function (self, is_enter_key) {
        self.scrollWindow(self, true);

        var p = self.option, current = self.getCurrentLine(self);
        if (current) {
            if (!p.multiple) {
                self.elem.combo_input.val(current.text());
                self.elem.hidden.val(current.attr('pkey'));
            } else {
                //build tags in multiple selection mode
                self.elem.combo_input.val('');
                var item = {text: current.text(), value: current.attr('pkey')};
                if (!self.isAlreadySelected(self, item)) {
                    self.addNewTag(self, item);
                    self.tagValuesSet(self);
                }
            }

            if (p.selectOnly)
                self.setButtonAttrDefault();

            //Select item callback
            if (p.eSelect && $.isFunction(p.eSelect))
                p.eSelect(current.data('dataObj'), self);

            self.prop.prev_value = self.elem.combo_input.val();
            self.prop.selected_text = self.elem.combo_input.val();

            self.putClearButton();
        }
        self.afterAction(self);
    };
    /**
     * Show clear button when item selected in single selection mode
     */
    SelectPage.prototype.putClearButton = function () {
        if (!this.option.multiple && !this.elem.combo_input.prop('disabled'))
            this.elem.container.append(this.elem.clear_btn);
    };
    /**
     * Select all list item
     * @param {Object} self
     */
    SelectPage.prototype.selectAllLine = function (self) {
        var p = self.option, jsonarr = new Array();
        self.elem.results.find('li').each(function (i, row) {
            var $row = $(row);
            var item = {text: $row.text(), value: $row.attr('pkey')};
            if (!self.isAlreadySelected(self, item)) {
                self.addNewTag(self, item);
                self.tagValuesSet(self);
            }
            jsonarr.push($row.data('dataObj'));
            //limited max selected items
            if ($.type(p.maxSelectLimit) === 'number' &&
                    p.maxSelectLimit > 0 &&
                    p.maxSelectLimit === self.elem.element_box.find('li.selected_tag').size()) {
                return false;
            }
        });
        if (p.eSelect && $.isFunction(p.eSelect))
            p.eSelect(jsonarr, self);
        self.afterAction(self);
    };
    /**
     * Cancel select all item in current page
     * @param {Object} self
     */
    SelectPage.prototype.unSelectAllLine = function (self) {
        var p = self.option, size = self.elem.results.find('li').size();
        self.elem.results.find('li').each(function (i, row) {
            var key = $(row).attr('pkey');
            var tag = self.elem.element_box.find('li.selected_tag[itemvalue="' + key + '"]');
            self.removeTag(self, tag);
        });
        self.afterAction(self);
        if (p.eTagRemove && $.isFunction(p.eTagRemove))
            p.eTagRemove(size, self);
    };
    /**
     * Clear all selected items
     * @param {Object} self
     */
    SelectPage.prototype.clearAll = function (self) {
        var p = self.option, size = 0;
        if (p.multiple) {
            size = self.elem.element_box.find('li.selected_tag').size();
            self.elem.element_box.find('li.selected_tag').remove();
        }
        self.reset(self);
        self.afterAction(self);

        if (!p.multiple)
            self.elem.clear_btn.remove();
        if (p.multiple) {
            if (p.eTagRemove && $.isFunction(p.eTagRemove))
                p.eTagRemove(size, self);
        }
    };

    /**
     * reset
     */
    SelectPage.prototype.reset = function (self) {
        self.elem.combo_input.val('');
        self.elem.hidden.val('');
        self.prop.prev_value = '';
        self.prop.selected_text = '';
        self.prop.current_page = 1;
    };

    /**
     * Get current highlight item
     * @param {Object} self
     */
    SelectPage.prototype.getCurrentLine = function (self) {
        if (self.elem.result_area.is(':hidden'))
            return false;
        var obj = self.elem.results.find('li.' + self.css_class.select);
        if (obj.size())
            return obj;
        else
            return false;
    };

    /**
     * Check the result item is already selected or not
     * @param {Object} self
     * @param {Object} item - item info
     */
    SelectPage.prototype.isAlreadySelected = function (self, item) {
        var isExist = false;
        if (item.value) {
            var keys = self.elem.hidden.val();
            if (keys) {
                var karr = keys.split(',');
                if (karr && karr.length && $.inArray(item.value, karr) != -1)
                    isExist = true;
            }
        }
        return isExist;
    };

    /**
     * Add a new tag in multiple selection mode
     * @param {Object} self
     * @param {Object} item
     */
    SelectPage.prototype.addNewTag = function (self, item) {
        if (!self.option.multiple || !item)
            return;
        var tmp = self.template.tag.content, tag;
        tmp = tmp.replace(self.template.tag.textKey, item.text);
        tmp = tmp.replace(self.template.tag.valueKey, item.value);
        tag = $(tmp);
        if (self.elem.combo_input.prop('disabled'))
            tag.find('span.tag_close').hide();
        self.elem.combo_input.closest('li').before(tag);
    };
    /**
     * Remove a tag in multiple selection mode
     * @param {Object} self
     * @param {Object} item
     */
    SelectPage.prototype.removeTag = function (self, item) {
        var key = $(item).attr('itemvalue');
        var keys = self.elem.hidden.val();
        if ($.type(key) != 'undefined' && keys) {
            var keyarr = keys.split(','),
                    index = $.inArray(key.toString(), keyarr);
            if (index != -1) {
                keyarr.splice(index, 1);
                self.elem.hidden.val(keyarr.toString());
            }
        }
        $(item).remove();
        self.afterAction(self);
    };

    /**
     * Selected item value(keyField) put in to hidden element
     * @param {Object} self
     */
    SelectPage.prototype.tagValuesSet = function (self) {
        if (!self.option.multiple)
            return;
        var tags = self.elem.element_box.find('li.selected_tag');
        if (tags && tags.size()) {
            var result = new Array();
            $.each(tags, function (i, li) {
                var v = $(li).attr('itemvalue');
                if ($.type(v) !== 'undefined')
                    result.push(v);
            });
            if (result.length) {
                self.elem.hidden.val(result.join(','));
            }
        }
    };

    /**
     * auto resize input element width in multiple select mode
     * @param {Object} self
     */
    SelectPage.prototype.inputResize = function (self) {
        if (!self.option.multiple)
            return;
        var width = '',
                inputLi = self.elem.combo_input.closest('li');
        var setDefaultSize = function (self, inputLi) {
            inputLi.removeClass('full_width');
            var minimumWidth = self.elem.combo_input.val().length + 1,
                    width = (minimumWidth * 0.75) + 'em';
            self.elem.combo_input.css('width', width).removeAttr('placeholder');
        };
        if (self.elem.element_box.find('li.selected_tag').size() === 0) {
            if (self.elem.combo_input.attr('placeholder_bak')) {
                if (!inputLi.hasClass('full_width'))
                    inputLi.addClass('full_width');
                self.elem.combo_input.attr('placeholder', self.elem.combo_input.attr('placeholder_bak')).removeAttr('style');
            } else
                setDefaultSize(self, inputLi);
        } else
            setDefaultSize(self, inputLi);
    };

    /**
     * Move to next line
     * @param {Object} self
     */
    SelectPage.prototype.nextLine = function (self) {
        var obj = self.getCurrentLine(self), idx;
        if (!obj)
            idx = -1;
        else {
            idx = self.elem.results.children('li').index(obj);
            obj.removeClass(self.css_class.select);
        }
        idx++;
        if (idx < self.elem.results.children('li').length) {
            var next = self.elem.results.children('li').eq(idx);
            next.addClass(self.css_class.select);
            self.setCssFocusedResults(self);
        } else
            self.setCssFocusedInput(self);
        self.scrollWindow(self, false);
    };

    /**
     * Move to previous line
     * @param {Object} self
     */
    SelectPage.prototype.prevLine = function (self) {
        var obj = self.getCurrentLine(self), idx;
        if (!obj)
            idx = self.elem.results.children('li').length;
        else {
            idx = self.elem.results.children('li').index(obj);
            obj.removeClass(self.css_class.select);
        }
        idx--;
        if (idx > -1) {
            var prev = self.elem.results.children('li').eq(idx);
            prev.addClass(self.css_class.select);
            self.setCssFocusedResults(self);
        } else
            self.setCssFocusedInput(self);
        self.scrollWindow(self, false);
    };


    /**
     * SelectPage plugin definition
     * @global
     * @param option {Object} init plugin option
     */
    function Plugin(option) {
        return this.each(function () {
            var $this = $(this),
                    data = $this.data(SelectPage.dataKey),
                    params = $.extend({}, defaults, $this.data(), data && data.option, typeof option === 'object' && option);
            if (!data)
                $this.data(SelectPage.dataKey, (data = new SelectPage(this, params)));
        });
    }

    /**
     * Get plugin object
     * @param {object} obj 
     * @returns 
     */
    function getPlugin(obj) {
        return $(obj).closest('div.sp_container').find('input.sp_input');
    }

    /**
     * Clear all selected item
     */
    function ClearSelected() {
        return this.each(function () {
            var $this = getPlugin(this),
                    data = $this.data(SelectPage.dataKey);
            if (data) {
                data.prop.init_set = true;
                data.clearAll(data);
                data.prop.init_set = false;
            }
        });
    }

    /**
     * Refresh result list
     * use case:
     * 1.use $(obj).val('xxx') to modify selectpage selected item key
     * 2.refresh selected item show content/tag text
     */
    function SelectedRefresh() {
        return this.each(function () {
            var $this = getPlugin(this),
                    data = $this.data(SelectPage.dataKey);
            if (data && data.elem.hidden.val())
                data.setInitRecord(true);
        });
    }

    /**
     * Modify plugin datasource, only work on json datasource mode
     * @param {array} data - new datasource
     * @example
     * [{name:'aa',sex:1},{name:'bb',sex:0},{...}]
     */
    function ModifyDataSource(data) {
        return this.each(function () {
            if (data && $.isArray(data)) {
                var $this = getPlugin(this),
                        plugin = $this.data(SelectPage.dataKey);
                if (plugin) {
                    plugin.clearAll(plugin);
                    plugin.option.data = data;
                }
            }
        });
    }

    /**
     * Get plugin disabled status or Modify plugin disabled status
     * @param disabled {boolean} set disabled status
     */
    function PluginDisabled(disabled) {
        var status = false;
        this.each(function () {
            var $this = getPlugin(this),
                    plugin = $this.data(SelectPage.dataKey);
            if (plugin) {
                if ($.type(disabled) !== 'undefined')
                    plugin.disabled(plugin, disabled);
                else
                    status = plugin.disabled(plugin);
            }
        });
        return status;
    }

    /**
     * Get selected item text
     * @returns {string}
     */
    function GetInputText() {
        var str = '';
        this.each(function () {
            var $this = getPlugin(this), data = $this.data(SelectPage.dataKey);
            if (data) {
                if (data.option.multiple) {
                    var tags = [];
                    data.elem.element_box.find('li.selected_tag').each(function (i, tag) {
                        tags.push($(tag).text());
                    });
                    str += tags.toString();
                } else {
                    str += data.elem.combo_input.val();
                }
            }
        });
        return str;
    }

    var old = $.fn.selectPage;

    $.fn.selectPage = Plugin;
    $.fn.selectPage.Constructor = SelectPage;
    $.fn.selectPageClear = ClearSelected;
    $.fn.selectPageRefresh = SelectedRefresh;
    $.fn.selectPageData = ModifyDataSource;
    $.fn.selectPageDisabled = PluginDisabled;
    $.fn.selectPageText = GetInputText;

    // SelectPage no conflict
    // =================
    $.fn.selectPage.noConflict = function () {
        $.fn.selectPage = old;
        return this;
    };
})(window.jQuery);
