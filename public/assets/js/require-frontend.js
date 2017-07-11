require.config({
    urlArgs: "v=" + requirejs.s.contexts._.config.config.site.version,
    packages: [{
            name: 'moment',
            location: '../libs/moment',
            main: 'moment'
        }],
    //在打包压缩时将会把include中的模块合并到主文件中
    include: ['css', 'layer', 'toastr', 'fast', 'frontend'],
    paths: {
        'lang': "empty:",
        'form': 'require-form',
        'table': 'require-table',
        'upload': 'require-upload',
        'validator': 'require-validator',
        'drag': 'jquery.drag.min',
        'drop': 'jquery.drop.min',
        'echarts': 'echarts.min',
        'echarts-theme': 'echarts-theme',
        'adminlte': 'adminlte',
        'bootstrap-table-commonsearch': 'bootstrap-table-commonsearch',
        'bootstrap-table-template': 'bootstrap-table-template',
        //
        // 以下的包从bower的libs目录加载
        'jquery': '../libs/jquery/dist/jquery.min',
        'bootstrap': '../libs/bootstrap/dist/js/bootstrap.min',
        'bootstrap-datetimepicker': '../libs/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min',
        'bootstrap-select': '../libs/bootstrap-select/dist/js/bootstrap-select.min',
        'bootstrap-select-lang': '../libs/bootstrap-select/dist/js/i18n/defaults-zh_CN',
        'bootstrap-table': '../libs/bootstrap-table/dist/bootstrap-table.min',
        'bootstrap-table-export': '../libs/bootstrap-table/dist/extensions/export/bootstrap-table-export.min',
        'bootstrap-table-mobile': '../libs/bootstrap-table/dist/extensions/mobile/bootstrap-table-mobile',
        'bootstrap-table-lang': '../libs/bootstrap-table/dist/locale/bootstrap-table-zh-CN',
        'tableexport': '../libs/tableExport.jquery.plugin/tableExport.min',
        'dragsort': '../libs/dragsort/jquery.dragsort',
        'sortable': '../libs/Sortable/Sortable.min',
        'addtabs': '../libs/jquery-addtabs/jquery.addtabs',
        'slimscroll': '../libs/jquery-slimscroll/jquery.slimscroll',
        'summernote': '../libs/summernote/dist/lang/summernote-zh-CN.min',
        'validator-core': '../libs/nice-validator/dist/jquery.validator',
        'validator-lang': '../libs/nice-validator/dist/local/zh-CN',
        'plupload': '../libs/plupload/js/plupload.min',
        'toastr': '../libs/toastr/toastr',
        'jstree': '../libs/jstree/dist/jstree.min',
        'layer': '../libs/layer/src/layer',
        'cookie': '../libs/jquery.cookie/jquery.cookie',
        'cxselect': '../libs/jquery-cxselect/js/jquery.cxselect',
        'template': '../libs/art-template/dist/template-native',
        'selectpage': '../libs/selectpage/selectpage',
    },
    // shim依赖配置
    shim: {
        'bootstrap': ['jquery'],
        'bootstrap-table': {
            deps: [
                'bootstrap',
//                'css!../libs/bootstrap-table/dist/bootstrap-table.min.css'
            ],
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
        'bootstrap-table-template': {
            deps: ['bootstrap-table', 'template'],
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
        'bootstrap-datetimepicker': [
            'moment/locale/zh-cn',
//            'css!../libs/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css',
        ],
        'bootstrap-select': ['css!../libs/bootstrap-select/dist/css/bootstrap-select.min.css', ],
        'bootstrap-select-lang': ['bootstrap-select'],
        'summernote': ['../libs/summernote/dist/summernote.min', 'css!../libs/summernote/dist/summernote.css'],
//        'toastr': ['css!../libs/toastr/toastr.min.css'],
        'jstree': ['css!../libs/jstree/dist/themes/default/style.css', ],
        'plupload': {
            deps: ['../libs/plupload/js/moxie.min'],
            exports: "plupload"
        },
//        'layer': ['css!../libs/layer/build/skin/default/layer.css'],
//        'validator-core': ['css!../libs/nice-validator/dist/jquery.validator.css'],
        'validator-lang': ['validator-core'],
//        'selectpage': ['css!../libs/selectpage/selectpage.css'],
    },
    baseUrl: requirejs.s.contexts._.config.config.site.cdnurl + '/assets/js/', //资源基础路径
    map: {
        '*': {
            'css': '../libs/require-css/css.min'
        }
    },
    waitSeconds: 30,
    charset: 'utf-8' // 文件编码
});

require(['jquery', 'bootstrap'], function ($, undefined) {
    //初始配置
    var Config = requirejs.s.contexts._.config.config;
    //将Config渲染到全局
    window.Config = Config;
    // 配置语言包的路径
    var paths = {};
    paths['lang'] = Config.moduleurl + '/ajax/lang?callback=define&controllername=' + Config.controllername;

    // 避免目录冲突
    paths['frontend/'] = 'frontend/';
    require.config({paths: paths});

    // 初始化
    $(function () {
        require(['frontend'], function (Module) {
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
            if (Config.jsname) {
                require([Config.jsname], function (Controller) {
                    Controller[Config.actionname] != undefined && Controller[Config.actionname]();
                }, function (e) {
                    // 这里可捕获模块加载的错误
                });
            }
        });
    });
});
