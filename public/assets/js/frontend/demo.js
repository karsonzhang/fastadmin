define(['jquery', 'bootstrap', 'frontend'], function ($, undefined, Frontend) {

    var Controller = {
        qrcode: function () {
            $("form").submit(function () {
                $("#qrcodeimg").prop("src", Config.moduleurl + "/demo/qrcode?" + $(this).serialize());
                return false;
            });
            $("form").trigger('submit');
        },
        bootstrap: function () {
            //Popover & Tooltip
            $('.bs-component [data-toggle="popover"]').popover();
            $('.bs-component [data-toggle="tooltip"]').tooltip();

            //Toastr
            var i = -1;
            var toastCount = 0;
            var $toastlast;

            var getMessage = function () {
                var msgs = ['My name is Inigo Montoya. You killed my father. Prepare to die!',
                    '<div><input class="input-small" value="textbox"/>&nbsp;<a href="http://johnpapa.net" target="_blank">This is a hyperlink</a></div><div><button type="button" id="okBtn" class="btn btn-primary">Close me</button><button type="button" id="surpriseBtn" class="btn" style="margin: 0 8px 0 8px">Surprise me</button></div>',
                    'Are you the six fingered man?',
                    'Inconceivable!',
                    'I do not think that means what you think it means.',
                    'Have fun storming the castle!'
                ];
                i++;
                if (i === msgs.length) {
                    i = 0;
                }

                return msgs[i];
            };
            $('#showtoast').click(function () {
                var shortCutFunction = $("#toastTypeGroup input:radio:checked").val();
                var msg = $('#message').val();
                var title = $('#title').val() || '';
                var $showDuration = $('#showDuration');
                var $hideDuration = $('#hideDuration');
                var $timeOut = $('#timeOut');
                var $extendedTimeOut = $('#extendedTimeOut');
                var $showEasing = $('#showEasing');
                var $hideEasing = $('#hideEasing');
                var $showMethod = $('#showMethod');
                var $hideMethod = $('#hideMethod');
                var toastIndex = toastCount++;

                Toastr.options = {
                    closeButton: $('#closeButton').prop('checked'),
                    debug: $('#debugInfo').prop('checked'),
                    positionClass: $('#positionGroup input:radio:checked').val() || 'toast-top-right',
                    onclick: null
                };

                if ($('#addBehaviorOnToastClick').prop('checked')) {
                    Toastr.options.onclick = function () {
                        alert('You can perform some custom action after a toast goes away');
                    };
                }

                if ($showDuration.val().length) {
                    Toastr.options.showDuration = $showDuration.val();
                }

                if ($hideDuration.val().length) {
                    Toastr.options.hideDuration = $hideDuration.val();
                }

                if ($timeOut.val().length) {
                    Toastr.options.timeOut = $timeOut.val();
                }

                if ($extendedTimeOut.val().length) {
                    Toastr.options.extendedTimeOut = $extendedTimeOut.val();
                }

                if ($showEasing.val().length) {
                    Toastr.options.showEasing = $showEasing.val();
                }

                if ($hideEasing.val().length) {
                    Toastr.options.hideEasing = $hideEasing.val();
                }

                if ($showMethod.val().length) {
                    Toastr.options.showMethod = $showMethod.val();
                }

                if ($hideMethod.val().length) {
                    Toastr.options.hideMethod = $hideMethod.val();
                }

                if (!msg) {
                    msg = getMessage();
                }

                $("#toastrOptions").text("Command: toastr["
                        + shortCutFunction
                        + "](\""
                        + msg
                        + (title ? "\", \"" + title : '')
                        + "\")\n\nToastr.options = "
                        + JSON.stringify(Toastr.options, null, 2)
                        );

                var $toast = Toastr[shortCutFunction](msg, title); // Wire up an event handler to a button in the toast, if it exists
                $toastlast = $toast;
                if ($toast.find('#okBtn').length) {
                    $toast.delegate('#okBtn', 'click', function () {
                        alert('you clicked me. i was toast #' + toastIndex + '. goodbye!');
                        $toast.remove();
                    });
                }
                if ($toast.find('#surpriseBtn').length) {
                    $toast.delegate('#surpriseBtn', 'click', function () {
                        alert('Surprise! you clicked me. i was toast #' + toastIndex + '. You could perform an action here.');
                    });
                }
            });
            function getLastToast() {
                return $toastlast;
            }
            $('#clearlasttoast').click(function () {
                Toastr.clear(getLastToast());
            });
            $('#cleartoasts').click(function () {
                Toastr.clear();
            });
            $(document).on("click", "#dialog-normal", function () {
                BootstrapDialog.show({
                    title: 'Say-hello dialog',
                    message: 'Hi Apple!'
                });
            });
            $(document).on("click", "#dialog-alert", function () {
                BootstrapDialog.alert('Hi Apple!');
            });
            $(document).on("click", "#dialog-confirm", function () {
                BootstrapDialog.confirm('Hi Apple, are you sure?', function (result) {
                    if (result) {
                        alert('Yup.');
                    } else {
                        alert('Nope.');
                    }
                });
            });
        },
    };
    return Controller;
});