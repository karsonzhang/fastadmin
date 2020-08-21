define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            $("form.edit-form").data("validator-options", {
                display: function (elem) {
                    return $(elem).closest('tr').find("td:first").text();
                }
            });
            Form.api.bindevent($("form.edit-form"));

            //不可见的元素不验证
            $("form#add-form").data("validator-options", {
                ignore: ':hidden',
                rules: {
                    content: function () {
                        return ['radio', 'checkbox', 'select', 'selects'].indexOf($("#add-form select[name='row[type]']").val()) > -1;
                    },
                    extend: function () {
                        return $("#add-form select[name='row[type]']").val() == 'custom';
                    }
                }
            });
            Form.api.bindevent($("form#add-form"), function (ret) {
                setTimeout(function () {
                    location.reload();
                }, 1500);
            });

            //渲染关联显示字段和存储字段
            var renderselect = function (id, data, defaultvalue) {
                var html = [];
                for (var i = 0; i < data.length; i++) {
                    html.push("<option value='" + data[i].name + "' " + (defaultvalue == data[i].name ? "selected" : "") + " data-subtext='" + data[i].title + "'>" + data[i].name + "</option>");
                }
                var select = $(id);
                $(select).html(html.join(""));
                select.trigger("change");
                if (select.data("selectpicker")) {
                    select.selectpicker('refresh');
                }
            };
            //关联表切换
            $(document).on('change', "#c-selectpage-table", function (e, first) {
                var that = this;
                Fast.api.ajax({
                    url: "general/config/get_fields_list",
                    data: {table: $(that).val()},
                }, function (data, ret) {
                    renderselect("#c-selectpage-primarykey", data.fieldList, first ? $("#c-selectpage-primarykey").data("value") : '');
                    renderselect("#c-selectpage-field", data.fieldList, first ? $("#c-selectpage-field").data("value") : '');
                    return false;
                });
                return false;
            });
            //如果编辑模式则渲染已知数据
            if (['selectpage', 'selectpages'].indexOf($("#c-type").val()) > -1) {
                $("#c-selectpage-table").trigger("change", true);
            }

            //切换类型时
            $(document).on("change", "#c-type", function () {
                var value = $(this).val();
                $(".tf").addClass("hidden");
                $(".tf.tf-" + value).removeClass("hidden");
                if (["selectpage", "selectpages"].indexOf(value) > -1 && $("#c-selectpage-table option").size() == 1) {
                    //异步加载表列表
                    Fast.api.ajax({
                        url: "general/config/get_table_list",
                    }, function (data, ret) {
                        renderselect("#c-selectpage-table", data.tableList);
                        return false;
                    });
                }
            });

            //切换显示隐藏变量字典列表
            $(document).on("change", "form#add-form select[name='row[type]']", function (e) {
                $("#add-content-container").toggleClass("hide", ['select', 'selects', 'checkbox', 'radio'].indexOf($(this).val()) > -1 ? false : true);
            });

            //选择规则
            $(document).on("click", ".rulelist > li > a", function () {
                var ruleArr = $("#rule").val() == '' ? [] : $("#rule").val().split(";");
                var rule = $(this).data("value");
                var index = ruleArr.indexOf(rule);
                if (index > -1) {
                    ruleArr.splice(index, 1);
                } else {
                    ruleArr.push(rule);
                }
                $("#rule").val(ruleArr.join(";"));
                $(this).parent().toggleClass("active");
            });

            //添加向发件人发送测试邮件按钮和方法
            $('input[name="row[mail_from]"]').parent().next().append('<a class="btn btn-info testmail">' + __('Send a test message') + '</a>');
            $(document).on("click", ".testmail", function () {
                var that = this;
                Layer.prompt({title: __('Please input your email'), formType: 0}, function (value, index) {
                    Backend.api.ajax({
                        url: "general/config/emailtest",
                        data: $(that).closest("form").serialize() + "&receiver=" + value
                    });
                });

            });

            //删除配置
            $(document).on("click", ".btn-delcfg", function () {
                var that = this;
                Layer.confirm(__('Are you sure you want to delete this item?'), {
                    icon: 3,
                    title: '提示'
                }, function (index) {
                    Backend.api.ajax({
                        url: "general/config/del",
                        data: {name: $(that).data("name")}
                    }, function () {
                        $(that).closest("tr").remove();
                        Layer.close(index);
                    });
                });

            });
        },
        add: function () {
            Controller.api.bindevent();
        },
        edit: function () {
            Controller.api.bindevent();
        },
        api: {
            bindevent: function () {
                Form.api.bindevent($("form[role=form]"));
            }
        }
    };
    return Controller;
});
