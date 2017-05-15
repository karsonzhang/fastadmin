require.config({
    urlArgs: "v=" + requirejs.s.contexts._.config.config.config.site.version,
    packages: [{
            name: 'moment',
            location: '../libs/moment',
            main: 'moment'
        }],
    //在打包压缩时将会把include中的模块合并到主文件中
    include: ['css', 'layer', 'toastr', 'backend', 'table', 'form', 'dragsort', 'drag', 'drop', 'addtabs'],
    paths: {
        'lang': "empty:",
        'config': 'require-config',
        'form': 'require-form',
        'table': 'require-table',
        'upload': 'require-upload',
        'drag': 'jquery.drag.min',
        'drop': 'jquery.drop.min',
        'echarts': 'echarts.min',
        'echarts-theme': 'echarts-theme',
        'adminlte': 'adminlte',
        //
        // 以下的包从bower的libs目录加载
        'jquery': '../libs/jquery/dist/jquery.min',
        'bootstrap': '../libs/bootstrap/dist/js/bootstrap.min',
        'bootstrap-validator': '../libs/bootstrap-validator/dist/validator.min',
        'bootstrap-typeahead': '../libs/bootstrap3-typeahead/bootstrap3-typeahead.min',
        'bootstrap-tagsinput': '../libs/bootstrap-tagsinput/dist/bootstrap-tagsinput.min',
        'bootstrap-dialog': '../libs/bootstrap3-dialog/dist/js/bootstrap-dialog.min',
        'bootstrap-datetimepicker': '../libs/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min',
        'bootstrap-select': '../libs/bootstrap-select/dist/js/bootstrap-select.min',
        'bootstrap-table': '../libs/bootstrap-table/dist/bootstrap-table.min',
        'bootstrap-table-export': '../libs/bootstrap-table/dist/extensions/export/bootstrap-table-export.min',
        'bootstrap-table-mobile': '../libs/bootstrap-table/dist/extensions/mobile/bootstrap-table-mobile',
        'bootstrap-table-advancedsearch': 'bootstrap-table-advancedsearch',
        'bootstrap-table-commonsearch': 'bootstrap-table-commonsearch',
        'bootstrap-table-lang': '../libs/bootstrap-table/dist/locale/bootstrap-table-zh-CN',
        'typeahead': '../libs/typeahead.js/dist/typeahead.jquery.min',
        'bloodhound': '../libs/typeahead.js/dist/bloodhound.min',
        'tableexport': '../libs/tableExport.jquery.plugin/tableExport.min',
        'dropzone': '../libs/dropzone/dist/min/dropzone-amd-module.min',
        'less': '../libs/less/dist/less.min',
        'dragsort': '../libs/dragsort/jquery.dragsort',
        'sortable': '../libs/Sortable/Sortable.min',
        'addtabs': '../libs/jquery-addtabs/jquery.addtabs',
        'slimscroll': '../libs/jquery-slimscroll/jquery.slimscroll',
        'crontab': '../libs/jqcron/src/jqCron.cn',
        'summernote': '../libs/summernote/dist/lang/summernote-zh-CN.min',
        'validator': '../libs/nice-validator/dist/jquery.validator',
        'plupload': '../libs/plupload/js/plupload.min',
        'toastr': '../libs/toastr/toastr',
        'jstree': '../libs/jstree/dist/jstree.min',
        'layer': '../libs/layer/src/layer',
        'cookie': '../libs/jquery.cookie/jquery.cookie',
        'template': '../libs/art-template/dist/template-native',
    },
    // shim依赖配置
    shim: {
        'bootstrap': ['jquery'],
        'bootstrap-table': {
            deps: ['bootstrap', 'css!../libs/bootstrap-table/dist/bootstrap-table.min.css'],
            exports: '$.fn.bootstrapTable'
        },
        'bootstrap-table-lang': {
            deps: ['bootstrap-table'],
            exports: '$.fn.bootstrapTable.defaults'
        },
        'bootstrap-table-export': {
            deps: ['bootstrap-table', 'tableexport'],
            exports: '$.fn.bootstrapTable.defaults'
        },
        'bootstrap-table-mobile': {
            deps: ['bootstrap-table'],
            exports: '$.fn.bootstrapTable.defaults'
        },
        'bootstrap-table-advancedsearch': {
            deps: ['bootstrap-table'],
            exports: '$.fn.bootstrapTable.defaults'
        },
        'bootstrap-table-commonsearch': {
            deps: ['bootstrap-table'],
            exports: '$.fn.bootstrapTable.defaults'
        },
        'tableexport': {
            deps: ['jquery'],
            exports: '$.fn.extend'
        },
        'slimscroll': {
            deps: ['jquery'],
            exports: '$.fn.extend'
        },
        'adminlte': {
            deps: ['bootstrap', 'slimscroll'],
            exports: '$.AdminLTE'
        },
        'typeahead': {
            deps: ['jquery'],
            init: function ($) {
                return require.s.contexts._.registry['typeahead.js'].factory($);
            }
        },
        'crontab': ['../libs/jqcron/src/jqCron', 'css!../libs/jqcron/src/jqCron.css'],
        'bootstrap-checkbox': ['jquery'],
        'bootstrap-radio': ['jquery'],
        'bootstrap-switch': ['jquery'],
        'bootstrap-dialog': ['css!../libs/bootstrap3-dialog/dist/css/bootstrap-dialog.min.css'],
        'bootstrap-datetimepicker': [
            'css!../libs/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css',
            'moment/locale/zh-cn',
        ],
        'bootstrap-tagsinput': [
            'css!../libs/bootstrap-tagsinput/dist/bootstrap-tagsinput-typeahead.css',
            'css!../libs/bootstrap-tagsinput/dist/bootstrap-tagsinput.css',
            'jquery',
            'typeahead'
        ],
        'bootstrap-select': ['css!../libs/bootstrap-select/dist/css/bootstrap-select.min.css', ],
        'summernote': ['../libs/summernote/dist/summernote.min', 'css!../libs/summernote/dist/summernote.css'],
//        'toastr': ['css!../libs/toastr/toastr.min.css'],
        'jstree': ['css!../libs/jstree/dist/themes/default/style.css', ],
        'plupload': {
            deps: [
                '../libs/plupload/js/moxie.min'
            ],
            exports: "plupload"
        },
//        'layer': ['css!../libs/layer/build/skin/default/layer.css'],

    },
    baseUrl: requirejs.s.contexts._.config.config.config.site.cdnurl + '/assets/js/', //资源基础路径
    map: {
        '*': {
            'css': '../libs/require-css/css.min'
        }
    },
    charset: 'utf-8' // 文件编码
});

require(['jquery', 'bootstrap', 'config'], function ($, undefined, Config) {
    // 配置语言包的路径
    var paths = {};
    paths['lang'] = Config.moduleurl + '/ajax/lang?callback=define&controllername=' + Config.controllername;
    // 避免目录冲突
    paths['backend/'] = 'backend/';
    require.config({paths: paths});

    // 初始化
    $(function () {
        require(['backend'], function (Module) {
            // 对相对地址进行处理
            $.ajaxSetup({
                beforeSend: function (xhr, setting) {
                    setting.url = Module.api.fixurl(setting.url);
                }
            });
            // 绑定ESC关闭窗口事件
            $(window).keyup(function (e) {
                if (e.keyCode == 27) {
                    if ($(".layui-layer").size() > 0) {
                        var index = 0;
                        $(".layui-layer").each(function () {
                            index = Math.max(index, parseInt($(this).attr("times")));
                        });
                        if (index) {
                            Module.api.layer.close(index);
                        }
                    }
                }
            });
            //加载相应模块
            require([Config.jsname], function (Controller) {
                Controller[Config.actionname] != undefined && Controller[Config.actionname]();
            }, function (e) {
                console.error(e);
                // 这里可捕获模块加载的错误
            });
        });
    });
});
