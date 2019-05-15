/*********************************
 * Themes, rules, and i18n support
 * Locale: Chinese; 中文; TW (Taiwan)
 *********************************/
(function(factory) {
    typeof module === "object" && module.exports ? module.exports = factory( require( "jquery" ) ) :
    typeof define === 'function' && define.amd ? define(['jquery'], factory) :
    factory(jQuery);
}(function($) {

    /* Global configuration
     */
    $.validator.config({
        //stopOnError: true,
        //focusCleanup: true,
        //theme: 'yellow_right',
        //timely: 2,

        // Custom rules
        rules: {
            digits: [/^\d+$/, "請填寫數字"]
            ,letters: [/^[a-z]+$/i, "請填寫字母"]
            ,date: [/^\d{4}-\d{2}-\d{2}$/, "請填寫有效的日期，格式:yyyy-mm-dd"]
            ,time: [/^([01]\d|2[0-3])(:[0-5]\d){1,2}$/, "請填寫有效的時間，00:00到23:59之間"]
            ,email: [/^[\w\+\-]+(\.[\w\+\-]+)*@[a-z\d\-]+(\.[a-z\d\-]+)*\.([a-z]{2,4})$/i, "請填寫有效的電郵"]
            ,url: [/^(https?|s?ftp):\/\/\S+$/i, "請填寫有效的網址"]
            ,accept: function (element, params){
                if (!params) return true;
                var ext = params[0],
                    value = $(element).val();
                return (ext === '*') ||
                       (new RegExp(".(?:" + ext + ")$", "i")).test(value) ||
                       this.renderMsg("只接受{1}後綴的文件", ext.replace(/\|/g, ','));
            }
            
        },

        // Default error messages
        messages: {
            0: "此處",
            fallback: "{0}格式不正確",
            loading: "正在驗證...",
            error: "網絡異常",
            timeout: "請求超時",
            required: "{0}不能為空",
            remote: "{0}已被使用",
            integer: {
                '*': "請填寫整數",
                '+': "請填寫正整數",
                '+0': "請填寫正整數或0",
                '-': "請填寫負整數",
                '-0': "請填寫負整數或0"
            },
            match: {
                eq: "{0}與{1}不一致",
                neq: "{0}與{1}不能相同",
                lt: "{0}必須小於{1}",
                gt: "{0}必須大於{1}",
                lte: "{0}不能大於{1}",
                gte: "{0}不能小於{1}"
            },
            range: {
                rg: "請填寫{1}到{2}的數",
                gte: "請填寫不小於{1}的數",
                lte: "請填寫最大{1}的數",
                gtlt: "請填寫{1}到{2}之間的數",
                gt: "請填寫大於{1}的數",
                lt: "請填寫小於{1}的數"
            },
            checked: {
                eq: "請選擇{1}項",
                rg: "請選擇{1}到{2}項",
                gte: "請至少選擇{1}項",
                lte: "請最多選擇{1}項"
            },
            length: {
                eq: "請填寫{1}個字符",
                rg: "請填寫{1}到{2}個字符",
                gte: "請至少填寫{1}個字符",
                lte: "請最多填寫{1}個字符",
                eq_2: "",
                rg_2: "",
                gte_2: "",
                lte_2: ""
            }
        }
    });

    /* Themes
     */
    var TPL_ARROW = '<span class="n-arrow"><b>◆</b><i>◆</i></span>';
    $.validator.setTheme({
        'simple_right': {
            formClass: 'n-simple',
            msgClass: 'n-right'
        },
        'simple_bottom': {
            formClass: 'n-simple',
            msgClass: 'n-bottom'
        },
        'yellow_top': {
            formClass: 'n-yellow',
            msgClass: 'n-top',
            msgArrow: TPL_ARROW
        },
        'yellow_right': {
            formClass: 'n-yellow',
            msgClass: 'n-right',
            msgArrow: TPL_ARROW
        },
        'yellow_right_effect': {
            formClass: 'n-yellow',
            msgClass: 'n-right',
            msgArrow: TPL_ARROW,
            msgShow: function($msgbox, type){
                var $el = $msgbox.children();
                if ($el.is(':animated')) return;
                if (type === 'error') {
                    $el.css({left: '20px', opacity: 0})
                        .delay(100).show().stop()
                        .animate({left: '-4px', opacity: 1}, 150)
                        .animate({left: '3px'}, 80)
                        .animate({left: 0}, 80);
                } else {
                    $el.css({left: 0, opacity: 1}).fadeIn(200);
                }
            },
            msgHide: function($msgbox, type){
                var $el = $msgbox.children();
                $el.stop().delay(100).show()
                    .animate({left: '20px', opacity: 0}, 300, function(){
                        $msgbox.hide();
                    });
            }
        }
    });
}));
