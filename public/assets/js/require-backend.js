require.config({
    urlArgs: "v=" + requirejs.s.contexts._.config.config.site.version,
    packages: [{
        name: 'moment',
        location: '../libs/moment',
        main: 'moment'
    }
    ],
    //在打包压缩时将会把include中的模块合并到主文件中
    include: ['css', 'layer', 'toastr', 'fast', 'backend', 'backend-init', 'table', 'form', 'dragsort', 'drag', 'drop', 'addtabs', 'selectpage'],
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
        'bootstrap-daterangepicker': '../libs/bootstrap-daterangepicker/daterangepicker',
        'bootstrap-select': '../libs/bootstrap-select/dist/js/bootstrap-select.min',
        'bootstrap-select-lang': '../libs/bootstrap-select/dist/js/i18n/defaults-zh_CN',
        'bootstrap-table': '../libs/bootstrap-table/dist/bootstrap-table.min',
        'bootstrap-table-export': '../libs/bootstrap-table/dist/extensions/export/bootstrap-table-export.min',
        'bootstrap-table-mobile': '../libs/bootstrap-table/dist/extensions/mobile/bootstrap-table-mobile',
        'bootstrap-table-lang': '../libs/bootstrap-table/dist/locale/bootstrap-table-zh-CN',
        'tableexport': '../libs/tableExport.jquery.plugin/tableExport.min',
        'dragsort': '../libs/fastadmin-dragsort/jquery.dragsort',
        'sortable': '../libs/Sortable/Sortable.min',
        'addtabs': '../libs/fastadmin-addtabs/jquery.addtabs',
        'slimscroll': '../libs/jquery-slimscroll/jquery.slimscroll',
        'validator-core': '../libs/nice-validator/dist/jquery.validator',
        'validator-lang': '../libs/nice-validator/dist/local/zh-CN',
        'plupload': '../libs/plupload/js/plupload.min',
        'toastr': '../libs/toastr/toastr',
        'jstree': '../libs/jstree/dist/jstree.min',
        'layer': '../libs/fastadmin-layer/dist/layer',
        'cookie': '../libs/jquery.cookie/jquery.cookie',
        'cxselect': '../libs/fastadmin-cxselect/js/jquery.cxselect',
        'template': '../libs/art-template/dist/template-native',
        'selectpage': '../libs/fastadmin-selectpage/selectpage',
        'citypicker': '../libs/fastadmin-citypicker/dist/js/city-picker.min',
        'citypicker-data': '../libs/fastadmin-citypicker/dist/js/city-picker.data',
    },
    // shim依赖配置
    shim: {
        'addons': ['backend'],
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
//        'bootstrap-select': ['css!../libs/bootstrap-select/dist/css/bootstrap-select.min.css',],
        'bootstrap-select-lang': ['bootstrap-select'],
//        'toastr': ['css!../libs/toastr/toastr.min.css'],
        'jstree': ['css!../libs/jstree/dist/themes/default/style.css',],
        'plupload': {
            deps: ['../libs/plupload/js/moxie.min'],
            exports: "plupload"
        },
//        'layer': ['css!../libs/fastadmin-layer/dist/theme/default/layer.css'],
//        'validator-core': ['css!../libs/nice-validator/dist/jquery.validator.css'],
        'validator-lang': ['validator-core'],
//        'selectpage': ['css!../libs/fastadmin-selectpage/selectpage.css'],
        'citypicker': ['citypicker-data', 'css!../libs/fastadmin-citypicker/dist/css/city-picker.css']
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
    paths['backend/'] = 'backend/';
    require.config({paths: paths});

    // 初始化
    $(function () {
        require(['fast'], function (Fast) {
            require(['backend', 'backend-init', 'addons'], function (Backend, undefined, Addons) {
                //加载相应模块
                if (Config.jsname) {
                    require([Config.jsname], function (Controller) {
                        Controller[Config.actionname] != undefined && Controller[Config.actionname]();
                    }, function (e) {
                        console.error(e);
                        // 这里可捕获模块加载的错误
                    });
                }
            });
        });
    });
});
