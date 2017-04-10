define(['jquery', 'bootstrap', 'frontend', 'frontend-ebook', 'layer', 'config'], function ($, undefined, Frontend, Ebook, Layer, Config) {

    Ebook.setupMonthNav();
    Ebook.setupFunctionNav();
    Ebook.setupPlayWXVideo();
    var Controller = {
        index: function () {

        },
        buynow: function () {
            var pagecount = parseInt($("#pageCount").text()) + 1;
            var nums = Math.max(1, parseInt($('#nums').val()));
            var amount = 0;

            var get_amount = function () {
                if ($('#printtype').val() == 'fourcolor')
                {
                    amount = pagecount * parseFloat(Config.product['printtype.fourcolor.price']);
                } else if ($('#printtype').val() == 'sixcolor') {
                    amount = pagecount * parseFloat(Config.product['printtype.sixcolor.price']);
                }
                if ($('#bindtype').val() == 'paperback') {
                    amount += parseFloat(Config.product['bindtype.paperback.price']) * parseFloat(Config.product['sale.discount']);
                } else if ($('#bindtype').val() == 'hardback') {
                    amount += parseFloat(Config.product['bindtype.hardback.price']) * parseFloat(Config.product['sale.discount']);
                }
                amount = Math.floor(amount);
                amount *= nums;
                return amount;
            }
            var get_sale_amount = function () {
                return Math.floor(get_amount() * parseFloat(Config.product['sale.discount']));
            }

            var refreshamount = function () {
                $('#total_amount').text('￥' + get_amount());
                $('#sale_amount').text('￥' + get_sale_amount());
                $('#sale_desc').text('');
            }

            $("#buynow_form").submit(function () {
                if (parseInt($('#pageCount').text()) < 20) {
                    layer.msg('您的作品少于20页不能装订成书，请补充内容重新提交。', {time: 3000, icon: 5});
                    return false;
                } else if ($('#address').val() == '' || $('#receiver').val() == '' || $('#mobile').val() == '') {
                    layer.msg('收货地址、收件人和联系方式不能为空。', {time: 3000, icon: 5});
                    return false;
                } else {
                    return true;
                }
            });
            refreshamount();
            //增减数量
            $(document).on('click', 'span[data-type]', function () {
                var spinnums = Math.max(parseInt($('#spinnums').val()), 1);
                $('#spinnums').val($(this).data("type") == 'plus' ? spinnums + 1 : Math.max(spinnums - 1, 1));
                $("input[name=nums]").val($('#spinnums').val());
                nums = Math.max(parseInt($('#spinnums').val()), 1);
                refreshamount();
                $('.spin_minus').toggleClass('minus_disabled', parseInt($('#spinnums').val()) > 1);
            });
            //类型选择
            $(document).on('click', 'span[data-value]', function () {
                var parent = $(this).parent();
                $("input", parent).val($(this).data("value"));
                refreshamount();
                $("span[data-value]", parent).removeClass("selected");
                $(this).addClass("selected");
            });
            if (Config.invokejson) {
                var onBridgeReady = function () {
                    WeixinJSBridge.invoke('editAddress', Config.invokejson,
                            function (res) {
                                if (res.err_msg == "edit_address:ok") {
                                    $("input[name=address]").val(res.proviceFirstStageName + res.addressCitySecondStageName + res.addressCountiesThirdStageName + res.addressDetailInfo);
                                    $("input[name=receiver]").val(res.userName);
                                    $("input[name=mobile]").val(res.telNumber);
                                    $.post('service/save_address', {
                                        address: $("input[name=address]").val(), receiver: $("input[name=receiver]").val(), mobile: $("input[name=mobile]").val()
                                    });
                                }
                            }
                    );
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
            }
            $(".nav_bar .r_bar").html('<a class="btn btn-danger btn-block btn-submit" href="javascript:;"><span class="fa fa-check"></span>&nbsp;提交</a>');
            $(document).on('click', '.btn-submit', function(){
               $("#buynow_form").trigger('submit');
            });
        },
        preview: function () {
            window.imageLoaded = Ebook.imageLoaded;
            $(".ebook_container").on("load", "img", function () {
                $(this).parent().removeClass('img_loading');
            });
            require(['angular', 'angular-app', 'ngcontrol/preface', 'ngcontrol/preview'], function (angular, app) {
                angular.bootstrap(document, ["App"]);
            });

        },
        shelf: function () {
            require(['angular', 'angular-app', 'ngcontrol/shelf'], function (angular, app) {
                angular.bootstrap(document, ["App"]);
            });
        },
        order: function () {
            require(['angular', 'angular-app', 'ngcontrol/order'], function (angular, app) {
                angular.bootstrap(document, ["App"]);
            });
        },
        design: function () {
            require(['angular', 'angular-app', 'ngcontrol/design'], function (angular, app) {
                angular.bootstrap(document, ["App"]);
            });
        },
        preface: function () {
            require(['angular', 'angular-app', 'ngcontrol/preface'], function (angular, app) {
                angular.bootstrap(document, ["App"]);
            });
        },
        make: function () {
            require(['angular', 'angular-app', 'ngcontrol/common'], function (angular, app) {
                angular.bootstrap(document, ["App"]);
            });
        },
        import: function () {
            require(['angular', 'angular-app', 'ngcontrol/common'], function (angular, app) {
                angular.bootstrap(document, ["App"]);
            });
        },
        choosemonth: function () {
            $(document).on("click", "a.month_item", function () {
                var month = $(this).text().substr(0, 2);
                var year = $(this).closest(".month_list").prev().find(".pull-left").text().substr(0, 4);
                var that = $(this);
                layer.load(1);
                $.ajax({
                    type: "POST",
                    url: "/service/" + ($(this).hasClass("deleted") ? "recover_month" : "delete_month"),
                    data: {"year": year, "month": month, "id": bookId},
                    success: function (response) {
                        if (response == "success") {
                            layer.closeAll('loading');
                            that.toggleClass('deleted');
                        } else {
                            layer.msg("操作失败");
                        }
                    },
                    error: function () {
                        layer.closeAll('loading');
                        layer.msg("操作失败");
                    }
                });
            });
            $(document).on("click", ".title_year a", function () {
                var year = $(this).parents().prev().text().substr(0, 4);
                var that = $(this);
                layer.load(1);
                $.ajax({
                    type: "POST",
                    url: "/service/" + ($(this).hasClass("deleted") ? "recover_year" : "delete_year"),
                    data: {"year": year, "id": bookId},
                    success: function (response) {
                        if (response == "success") {
                            var months = $(that).closest(".title_year").next().find("li a")
                            if ($(that).hasClass("deleted")) {
                                months.removeClass("deleted");
                            } else {
                                months.addClass("deleted");
                            }
                            layer.closeAll('loading');
                            that.toggleClass('deleted');
                        } else {
                            layer.msg("操作失败");
                        }
                    },
                    error: function () {
                        layer.closeAll('loading');
                        layer.msg("操作失败");
                    }
                });
            });
        },
        additem: function () {
            if (Ebook.isSupportLocalStorage())
            {
                try {
                    oldContent = localStorage.getItem(backupContentKey);
                    if (oldContent != null)
                        $('#msg_content').val(oldContent);
                } catch (e) {
                }
                Ebook.backupEditContent();
            }

            $('a#save_message').click(function () {
                $('a#save_message').text('保存中...').addClass('disabled');
                $.ajax({
                    type: "POST",
                    url: '/service/add_item/' + bookId,
                    data: $('#add_message').serialize(),
                    success: function (data) {
                        if (data == "success")
                        {
                            $('a#save_message').text('保存').removeClass('disabled');
                            alert('添加信息成功，您可以继续编写下一条。');
                            if (Ebook.isSupportLocalStorage()) {
                                if (timer != null)
                                    clearTimeout(timer);
                                localStorage.removeItem(backupContentKey);
                            }
                            location.reload();
                        } else {
                            $('a#save_message').text('保存').removeClass('disabled');
                            alert("操作失败，请稍后重试");
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown)
                    {
                        $('a#save_message').text('保存').removeClass('disabled');
                        alert("操作失败，请稍后重试");
                    }
                });
            });
            require(["dropzone", "mobiscroll"], function (Dropzone, undefined) {
                $('#msg_time').mobiscroll().calendar({
                    controls: ['calendar', 'date', 'time'],
                    dateFormat: 'yy-mm-dd',
                    timeFormat: 'HH:ii:ss',
                    lang: 'zh',
                    yearSuffix: '年',
                    monthSuffix: '月',
                    daySuffix: '日',
                    display: 'bubble',
                });
                Dropzone.autoDiscover = false;
                $("#upload_photo").dropzone({
                    paramName: "file",
                    url: Config.upload.uploadurl,
                    clickable: true,
                    maxFiles: 1000,
                    maxFilesize: 1000,
                    acceptedFiles: "image/*",
                    previewsContainer: "#upload_preview_area",
                    parallelUploads: 1,
                    dictMaxFilesExceeded: "已超过10张照片",
                    dictFileTooBig: "照片大小不能超过10M",
                    headers: {
                        'Cache-Control': null,
                        'X-Requested-With': null
                    },
                    params: {
                        'policy': Config.upload.multipart.policy,
                        'signature': Config.upload.multipart.signature,
                        'ext-param': '123'
                    },
                    init: function () {
                        $(this.element).addClass("dropzone");
                        this.on("maxfilesreached", function (file) {
                            //this.removeFile(file);
                        });
                        this.on("sending", function (file) {
                            $('a#save_message').text('正在上传图片...').addClass('disabled');
                        });
                        this.on("success", function (file, data) {
                            var r = $.parseJSON(data);
                            if (r.code == 200) {
                                $('#add_message').append("<input type='hidden' name='photos[" + r['sign'] + "][url]' value='" + r['url'] + "'>");
                                $('#add_message').append("<input type='hidden' name='photos[" + r['sign'] + "][width]' value='" + r['image-width'] + "'>");
                                $('#add_message').append("<input type='hidden' name='photos[" + r['sign'] + "][height]' value='" + r['image-height'] + "'>");
                            }
                        });
                        this.on("queuecomplete", function (file) {
                            $('a#save_message').text('保存').removeClass('disabled');
                        });
                        this.on("error", function (file, errorMessage) {
                            layer.msg(errorMessage);
                        });
                    }
                });
            });
        },
        edit: function () {
            var editImage = null;
            var imageWidth = 0;
            var imageHeight = 0;
            var layerWidth = 800;
            var layerHeight = 600;
            var weixinVideoHint = true;
            var checkCanDelete = function (item, id, delete_func) {
                layer.open({
                    type: 0, //page层
                    title: '确认',
                    closeBtn: 0,
                    content: '该信息为<strong style="color:green;">微信小视频</strong>内容，电子书中点击<strong style="color:green;">绿色二维码</strong>可以预览视频。手机扫描成品书中二维码可播放视频(<strong style="color:red;">依赖微信服务</strong>)。<br>确认要删除此信息嘛？',
                    area: '200px',
                    btn: ['删除', '保留'],
                    yes: function (index, layero) {
                        deleteItem(item, id);
                        layer.close(index);
                    },
                    btn2: function (index, layero) {
                        layer.close(index);
                    }
                });
                weixinVideoHint = false;//弹出提示框只出现一次
            };
            var deletePhoto = function (item, photo_id) {
                var item_id = item.closest(".msg_item").attr("id");
                $.ajax({
                    type: "POST",
                    url: '/service/delete_photo/' + bookId,
                    data: {id: bookId, action: "delete_photo", item_id: item_id, photo_id: photo_id},
                    success: function (data) {
                        item.parent().fadeTo(300, 0, function () {
                            item.parent().remove();
                        });
                    },
                    error: function (jqXHR, textStatus, errorThrown)
                    {
                        alert("操作失败，请稍后重试");
                    }
                });
            };
            var deleteItem = function (item, item_id) {
                $.ajax({
                    url: '/service/delete_item/' + bookId,
                    type: "POST",
                    data: {id: bookId, action: "delete_item", item_id: item_id},
                    success: function (response) {
                        var remove_item = item.parent().parent().parent();
                        remove_item.fadeTo(300, 0, function () {
                            remove_item.remove();
                        });
                    },
                    error: function (jqXHR, textStatus, errorThrown)
                    {
                        alert("操作失败，请稍后重试");
                    }
                });
            };
            var initDropzone = function (obj) {
                obj.dropzone({
                    paramName: "file",
                    //url: "/service/upload_photo/" + bookId,
                    url: Config.upload.uploadurl,
                    clickable: true,
                    maxFiles: 1000,
                    maxFilesize: 1000,
                    acceptedFiles: "image/*",
                    previewsContainer: false,
                    parallelUploads: 1,
                    dictMaxFilesExceeded: "已超过10张照片",
                    dictFileTooBig: "照片大小不能超过10M",
                    headers: {
                        'Cache-Control': null,
                        'X-Requested-With': null
                    },
                    params: {
                        'policy': Config.upload.multipart.policy,
                        'signature': Config.upload.multipart.signature,
                        'ext-param': '123'
                    },
                    init: function () {
                        $(this.element).addClass("dropzone");
                        this.old_addedfile = this.defaultOptions.addedfile;
                        this.on("addedfile", function (file) {
                            e = document.createElement('div');
                            $(e).addClass('msg_photo').addClass('dropzone').addClass('dropzone-previews');
                            file.wzw = e;
                            $(this.element).parent().before(e);
                            this.previewsContainer = e;
                            this.old_addedfile(file);
                            this.previewsContainer = false;
                        });
                        //this.on("uploadprogress", function(file, progress, bytesSent) {
                        //$(file.wzw).html(bytesSent);
                        //});
                        this.on("success", function (file, data) {
                            var template = '<div class="msg_photo" id="id_value"><a id="a_id_value" href="path_value"><img class="msg_photo_edit msg_photo_item" src="path_value"></a><a href="javascript:;" class="delete_photo"><span class="fa fa-close"></span></a></div>';
                            var r = $.parseJSON(data);
                            if (r.code == 200) {
                                var item_id = obj.closest(".msg_item").attr("id");
                                $.ajax({
                                    type: "POST",
                                    url: '/service/append_photo/' + bookId,
                                    data: {id: bookId, action: "append_photo", item_id: item_id, width: r['image-width'], height: r['image-height'], url: r['url']},
                                    dataType: 'json',
                                    success: function (data) {
                                        $(file.wzw).replaceWith($(template.replace(/id_value/g, data.id).replace(/path_value/g, Config.upload.cdnurl + r.url).replace(/a_id_value/g, 'a_' + data.id)));
                                    },
                                    error: function ()
                                    {
                                        layer.msg("操作失败，请稍后重试");
                                    }
                                });

                            } else {
                                layer.msg("上传图片失败,请重试");
                            }
                        });
                        this.on("error", function (file, errorMessage) {
                            layer.msg(errorMessage);
                        });
                        this.on("maxfilesreached", function (file) {
                            //this.removeFile(file);
                        });
                    }
                });
            };
            $(document).on('click', '.msg_photo_item', function () {
                var this_item = $(this);
                var item_id = this_item.closest(".msg_item").attr("id");
                var photo_id = $(this).parent().parent().attr('id');
                var imageSrc = $(this).attr("src").split('!')[0];
                var rotate = $(this).attr("data-rotate");
                if (rotate == null)
                    rotate = 0;
                var originalRotate = rotate;
                var html = '<div class="editImageBox">\
            					<image id="wangzw" onload="rotate(getRotate())" data-rotate=' + rotate + ' src="' + imageSrc + '" height = "' + layerHeight * 5 / 7 + '">\
            					<a class="rotate_left_button" href="javascript:void(0)" onclick="javascript:turnLeft();"><span class="fa fa-rotate-left"></span> 向左旋转</a>\
            					<a class="rotate_right_button" href="javascript:void(0)" onclick="javascript:turnRight();"><span class="fa fa-rotate-right"></span> 向右旋转</a>\
            				</div>';
                layer.open({
                    type: 1, //page层
                    area: [layerWidth + 'px', layerHeight + 'px'],
                    title: '编辑照片',
                    shade: 0.6, //遮罩透明度
                    moveType: false,
                    shift: -1, //0-6的动画形式，-1不开启
                    closeBtn: false,
                    btn: ['确定', '取消'],
                    content: html,
                    yes: function (index, layero) {
                        var rotate = getRotate();
                        if (rotate != originalRotate) {
                            var style = new Object();
                            style.rotate = rotate;
                            $.ajax({
                                type: "POST",
                                url: '/service/rotate_photo',
                                data: {id: bookId, action: "rotate_photo", item_id: item_id, photo_id: photo_id, style: JSON.stringify(style)},
                                success: function (data) {
                                    $('#' + photo_id + ' img').attr('src', data).attr("data-rotate", rotate);
                                    layer.close(index);
                                    editImage = null;
                                },
                                error: function (jqXHR, textStatus, errorThrown)
                                {
                                    alert("操作失败，请稍后重试");
                                }
                            });
                        } else {
                            layer.close(index);
                            editImage = null;
                        }
                    },
                    btn2: function (index) {
                        editImage = null;
                        return true;
                    }
                });
                return false;
            });
            $(document).on('click', '.delete_item', function () {
                var this_item = $(this);
                var cur_item_id = $(this).parent().parent().parent().attr('id');
                if (weixinVideoHint && $('.wx_video', this_item.parent().parent()).length > 0) {
                    checkCanDelete(this_item, cur_item_id, deleteItem);
                } else {
                    deleteItem(this_item, cur_item_id);
                }
            });
            $(document).on('click', '.delete_photo', function () {
                var this_item = $(this);
                var photo_id = $(this).parent().attr('id');
                if (weixinVideoHint && $('.wx_video', this_item.parent().parent()).length > 0) {
                    checkCanDelete(this_item, photo_id, deletePhoto);
                } else {
                    deletePhoto(this_item, photo_id);
                }
            });
            require(["dropzone", "mobiscroll"], function (Dropzone, undefined) {
                Dropzone.autoDiscover = false;
                initDropzone($(".upload_photo_form"));
            });
            $(document).on('click', '.edit_text', function () {
                var edit_item = $(this);
                var edit_item_id = $(this).parent().attr('id');
                var defaut_val = $(this).parent().find('.message_edit').text();
                layer.myPrompt({title: "修改信息文字", formType: 2, maxlength: 100000, value: defaut_val}, function (value, index, elem) {
                    if (true) {
                        $.ajax({
                            url: '/service/edit_text/' + bookId,
                            type: "POST",
                            data: {id: bookId, action: "edit_text", item_id: edit_item_id, content: value},
                            success: function (response)
                            {
                                edit_item.parent().find('.message_edit').text(value);
                            },
                            error: function (jqXHR, textStatus, errorThrown)
                            {
                                alert("保存失败，请稍后重试");
                            }
                        });
                        layer.close(index);
                    }
                });
            });
            load_more_res_selector = ".ebook .msg_item";
            load_more_end_string = "没有更多内容了...";
            load_more_res_callback = function (res) {
                initDropzone(res.find(".upload_photo_form"));
            };
            scroll_height_to_load = 50;
            scroll_each_selector = ".msg_item";
            scroll_each_callback = function ($item) {
                $('#nav_title_content').text($item.find('.page_header_title').text());

            };
            Ebook.setupDimension();
            Ebook.setupLoadMore();
            Ebook.setupScrolling();
            if (isMobile) {
                layerWidth = page_width;
                layerHeight = page_height;
            }

            window.getRotate = function () {
                if (editImage == null) {
                    editImage = $("#wangzw")[0];
                    imageWidth = editImage.width;
                    imageHeight = editImage.height;
                    $("#wangzw").css("display", "none");
                }
                return Number(editImage.getAttribute("data-rotate")) || 0;
            }
            window.turnLeft = function () {
                var r = getRotate();
                r -= 90;
                if (r < 0)
                    r = 270;
                rotate(r);
            }

            window.turnRight = function () {
                var r = getRotate();
                r += 90;
                if (r >= 360)
                    r = 0;
                rotate(r);
            }

            window.rotate = function (r) {
                //canvas旋转
                if (editImage == null) {
                    editImage = $("#wangzw")[0];
                    imageWidth = editImage.width;
                    imageHeight = editImage.height;
                    $("#wangzw").css("display", "none");
                }
                var canvas = $("#canvas_wangzw")[0] || document.createElement("canvas");
                canvas.width = layerWidth * 23 / 25;
                canvas.height = layerHeight - 140;
                canvasRate = canvas.height / canvas.width;
                canvas.id = "canvas_wangzw";
                //img.style.position = "absolute";
                //img.style.visibility = "hidden";
                context = canvas.getContext("2d");
                x = 0, y = 0;
                switch (r) {
                    case 0:
                        if (imageHeight / imageWidth > canvasRate)
                        {
                            drawHeight = canvas.height;
                            drawWidth = imageWidth * (drawHeight / imageHeight);
                            x = (canvas.width - drawWidth) / 2;
                            y = 0;
                        } else
                        {
                            drawWidth = canvas.width;
                            drawHeight = imageHeight * (drawWidth / imageWidth);
                            x = 0;
                            y = (canvas.height - drawHeight) / 2;
                        }
                        break;
                    case 90:
                        if (imageWidth / imageHeight > canvasRate)
                        {
                            drawWidth = canvas.height;
                            drawHeight = imageHeight * (drawWidth / imageWidth);
                            x = 0;
                            y = -(drawHeight + canvas.width) / 2;
                        } else
                        {
                            drawHeight = canvas.width;
                            drawWidth = imageWidth * (drawHeight / imageHeight);
                            x = (canvas.height - drawWidth) / 2;
                            y = -drawHeight;
                        }
                        break;
                    case 180:
                        if (imageHeight / imageWidth > canvasRate)
                        {
                            drawHeight = canvas.height;
                            drawWidth = imageWidth * (drawHeight / imageHeight);
                            x = -(drawWidth + canvas.width) / 2;
                            y = -drawHeight;
                        } else
                        {
                            drawWidth = canvas.width;
                            drawHeight = imageHeight * (drawWidth / imageWidth);
                            x = -drawWidth;
                            y = -(drawHeight + canvas.height) / 2;
                        }
                        break;
                    case 270:
                        if (imageWidth / imageHeight > canvasRate)
                        {
                            drawWidth = canvas.height;
                            drawHeight = imageHeight * (drawWidth / imageWidth);
                            x = -drawWidth;
                            y = (canvas.width - drawHeight) / 2;
                        } else
                        {
                            drawHeight = canvas.width;
                            drawWidth = imageWidth * (drawHeight / imageHeight);
                            x = -(drawWidth + canvas.height) / 2;
                            y = 0;
                        }
                        break;
                }

                context.clearRect(0, 0, canvas.width, canvas.height);
                context.save();
                context.rotate(r * Math.PI / 180);
                context.drawImage(editImage, x, y, drawWidth, drawHeight);
                context.restore();
                editImage.parentNode.insertBefore(canvas, editImage.parentNode.childNodes[0]);
                editImage.setAttribute("data-rotate", r);
            };
            layer.myPrompt = function (options, yes) {
                options = options || {};
                if (typeof options === 'function')
                    yes = options;
                var prompt, content = options.formType == 2 ? '<textarea class="layui-layer-input">' + (options.value || '') + '</textarea>' : function () {
                    return '<input type="' + (options.formType == 1 ? 'password' : 'text') + '" class="layui-layer-input" value="' + (options.value || '') + '">';
                }();
                return layer.open($.extend({
                    btn: ['&#x786E;&#x5B9A;', '&#x53D6;&#x6D88;'],
                    content: content,
                    skin: 'layui-layer-prompt',
                    success: function (layero) {
                        prompt = layero.find('.layui-layer-input');
                        prompt.focus();
                    }, yes: function (index) {
                        var value = prompt.val();
                        if (value.length > (options.maxlength || 500)) {
                            layer.tips('&#x6700;&#x591A;&#x8F93;&#x5165;' + (options.maxlength || 500) + '&#x4E2A;&#x5B57;&#x6570;', prompt, {tips: 1});
                        } else {
                            yes && yes(value, index, prompt);
                        }
                    }
                }, options));
            };
        },
        recyclebin: function () {
            $(document).on('click', '.recover_item', function () {
                var this_item = $(this);
                var item_id = $(this).parent().parent().parent().attr('id');
                $.ajax({
                    url: '/service/recover_item/' + bookId,
                    type: "POST",
                    data: {id: bookId, action: "recover_item", item_id: item_id},
                    success: function (response) {
                        var remove_item = this_item.parent().parent().parent();
                        remove_item.fadeTo(300, 0, function () {
                            remove_item.remove();
                        });
                    }
                });
            });
            $(document).on('click', '.recover_photo', function () {
                var this_item = $(this);
                var item_id = $(this).parent().parent().parent().attr('id');
                var photo_id = $(this).parent().attr('id');
                $.ajax({
                    url: '/service/recover_photo/' + bookId,
                    type: "POST",
                    data: {id: bookId, action: "recover_photo", item_id: item_id, photo_id: photo_id},
                    success: function (response) {
                        if (this_item.parent().parent().find('.msg_photo').length == 1) {
                            this_item.parent().parent().parent().fadeTo(300, 0, function () {
                                this_item.parent().parent().parent().remove();
                            });
                        } else {
                            this_item.parent().fadeTo(300, 0, function () {
                                this_item.parent().remove();
                            });
                        }
                    }
                });
            });
        }
    };
    return Controller;
});