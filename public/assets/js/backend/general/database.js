define(['jquery', 'bootstrap', 'backend'], function ($, undefined, Backend) {

    var Controller = {
        index: function () {

            //禁止在操作select元素时关闭dropdown的关闭事件
            $("#database").on('click', '.dropdown-menu input, .dropdown-menu label, .dropdown-menu select', function (e) {
                e.stopPropagation();
            });

            //提交时检查是否有删除或清空操作
            $("#database").on("submit", "#sqlexecute", function () {
                var v = $("#sqlquery").val().toLowerCase();
                if ((v.indexOf("delete ") >= 0 || v.indexOf("truncate ") >= 0) && !confirm(__('Are you sure you want to delete or turncate?'))) {
                    return false;
                }
            });

            //事件按钮操作
            $("#database").on("click", "ul#subaction li input", function () {
                $("#topaction").val($(this).attr("rel"));
                return true;
            });

            //窗口变更的时候重设结果栏高度
            $(window).on("resize", function () {
                $("#database .well").height($(window).height() - $("#database #sqlexecute").height() - $("#ribbon").outerHeight() - $(".panel-heading").outerHeight() - 130);
            });

            //修复iOS下iframe无法滚动的BUG
            if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
                $("#resultparent").css({"-webkit-overflow-scrolling": "touch", "overflow": "auto"});
            }

            $(window).resize();
        }
    };
    return Controller;
});