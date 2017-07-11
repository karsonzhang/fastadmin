define(['fast'], function (Fast) {
    var Frontend = {
        api: Fast.api,
        init: function () {
            //发送邮箱验证码
            $(document).on("click", ".btn-email", function (e) {
                var email = $(this).closest("form").find("#email");
                if (email.val() == "") {
                    Layer.alert("邮箱不能为空！");
                    return false;
                }
                var that = this;
                email.isValid(function (v) {
                    if (v) {
                        Frontend.api.ajax({url: "sms/sendemail", data: {type: $(that).data("type"), email: email.val()}}, function () {
                            $(that).val("已发送");
                        });
                    } else {
                        Layer.alert("请确认已经输入了正解的邮箱！");
                    }
                });

                return false;
            });
            //发送手机验证码
            $(document).on("click", ".btn-captcha", function (e) {
                var mobile = $(this).closest("form").find("#mobile");
                if (mobile.val() == "") {
                    Layer.alert("手机号码不能为空！");
                    return false;
                } else if (!mobile.val().match(/^1[3-9]\d{9}$/)) {
                    Layer.alert("请输入正确的手机号码！");
                    return false;
                }
                var that = this;
                mobile.isValid(function (v) {
                    if (v) {
                        $(that).addClass("disabled", true).text("获取中...");
                        var si;
                        Frontend.api.ajax({url: "sms/send", data: {type: $(that).data("type"), mobile: mobile.val()}}, function () {
                            Layer.msg("验证码已发送");
                            clearInterval(si);
                            var seconds = 60;
                            si = setInterval(function () {
                                seconds--;
                                if (seconds <= 0) {
                                    clearInterval(si);
                                    $(that).removeClass("disabled", false).text("获取验证码");
                                } else {
                                    $(that).addClass("disabled", true).text(seconds + "秒后可再次发送");
                                }
                            }, 1000);
                        });
                    } else {
                        Layer.alert("请确认已经输入了正解的手机号！");
                    }
                });

                return false;
            });

        }
    };
    Frontend.api = $.extend(Fast.api, Frontend.api);
    //将Frontend渲染至全局,以便于在子框架中调用
    window.Frontend = Frontend;

    Frontend.init();
    return Frontend;
});
