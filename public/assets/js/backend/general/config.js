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
