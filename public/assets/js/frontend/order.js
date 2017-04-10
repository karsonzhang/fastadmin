define(['jquery', 'bootstrap', 'frontend', 'frontend-ebook', 'layer', 'config'], function ($, undefined, Frontend, Ebook, Layer, Config) {

    var Controller = {
        index: function () {

        },
        pay: function () {
            this.info();
        },
        info: function () {
            console.log(1332);
            $(document).on('click', '#payorder', function () {
                if (Config.invokejson) {
                    WeixinJSBridge.invoke('getBrandWCPayRequest', Config.invokejson,
                            function (res) {
                                if (res.err_msg == "get_brand_wcpay_request:ok") {
                                    layer.msg('支付成功!', {}, function () {
                                        location.href = "/ebook/shelf";
                                    });
                                }
                            }
                    );
                } else {
                    Layer.msg("请使用微信扫描上方二维码支付!");
                }
            });
            $(document).on('click', '#deleteorder', function () {
                var that = this;
                layer.confirm('确认取消订单？', {
                    btn: ['确定', '取消'] //按钮
                }, function () {
                    Layer.load();
                    $.ajax({
                        url: 'service/delete_order',
                        data: {id: $(that).attr("book-id"), order_id: $(that).attr("order-id")},
                        type: 'post',
                        success: function (ret) {
                            Layer.closeAll('loading');
                            if (ret == 'success') {
                                Layer.msg("取消订单成功!", {icon: 1}, function () {
                                    location.href = '/ebook/shelf';
                                });
                            } else {
                                Ebook.popMessage("取消订单失败!");
                            }
                        }, error: function () {
                            Layer.closeAll('loading');
                            Ebook.popMessage("操作失败!请重试!");
                        }
                    })
                }, function () {

                });

            });
            if (Config.invokejson) {
                var onBridgeReady = function () {
                    if (Config.paynow == 1) {
                        $('#payorder').trigger('click');
                    }
                }
                if (typeof WeixinJSBridge == "undefined") {
                    if (document.addEventListener) {
                        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                    } else if (document.attachEvent) {
                        document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                    }
                } else {
                    onBridgeReady();
                }
            } else {
                if (Config.paynow == 1) {
                    $('#payorder').trigger('click');
                }
            }
        }
    };
    return Controller;
});