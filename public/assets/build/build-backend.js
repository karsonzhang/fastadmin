({
    baseUrl: '../js',
    optimizeCss: 'standard',
    optimize: 'none',
    removeCombined: false,
    name: "require-frontend",
    include: ['css', 'layer', 'toastr', 'frontend', 'table', 'form', 'dragsort', 'drag', 'drop', 'addtabs'],
    out: "../js/require-frontend.min.js",
    packages: [{
            name: 'moment',
            location: '../libs/moment',
            main: 'moment'
        }],
    map: {
        '*': {
            'css': '../libs/require-css/css.min'
        }
    },
    paths: {
        'lang': "empty:",
        'config': 'require-config',
        'bootstrap-checkbox': 'bootstrap-checkbox',
        'bootstrap-radio': 'bootstrap-radio',
        'bootstrap-switch': 'bootstrap-switch',
        'form': 'require-form',
        'table': 'require-table',
        'upload': 'require-upload',
        'drag': 'jquery.drag.min',
        'drop': 'jquery.drop.min',
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
        'bootstrap-table-lang': '../libs/bootstrap-table/dist/locale/bootstrap-table-zh-CN',
        'tableexport': '../libs/tableExport.jquery.plugin/tableExport.min',
        'dropzone': '../libs/dropzone/dist/min/dropzone-amd-module.min',
        'less': '../libs/less/dist/less.min',
        'dragsort': '../libs/dragsort/jquery.dragsort',
        'addtabs': '../libs/jquery-addtabs/jquery.addtabs',
        'slimscroll': '../libs/jquery-slimscroll/jquery.slimscroll',
        'crontab': '../libs/jqcron/src/jqCron',
        'crontab-lang': '../libs/jqcron/src/jqCron.cn',
        'validate': '../libs/jquery-validation/dist/jquery.validate.min',
        'plupload': '../libs/plupload/js/plupload.min',
        'summernote': '../libs/summernote/dist/summernote.min',
        'summernote-lang': '../libs/summernote/dist/lang/summernote-zh-CN.min',
        'toastr': '../libs/toastr/toastr',
        'jstree': '../libs/jstree/dist/jstree.min',
        'layer': '../libs/layer/src/layer',
        'echarts': '../libs/echarts/dist/echarts.min',
        'cookie': '../libs/jquery.cookie/jquery.cookie',
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
        'crontab': ['css!../libs/jqcron/src/jqCron.css'],
        'crontab-lang': ['crontab'],
        'bootstrap-checkbox': ['jquery'],
        'bootstrap-radio': ['jquery'],
        'bootstrap-switch': ['jquery'],
        'bootstrap-dialog': ['css!../libs/bootstrap3-dialog/dist/css/bootstrap-dialog.min.css'],
        'bootstrap-datetimepicker': [
            'css!../libs/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css',
            'moment/locale/zh-cn'
        ],
        'bootstrap-tagsinput': [
            'css!../libs/bootstrap-tagsinput/dist/bootstrap-tagsinput-typeahead.css',
            'css!../libs/bootstrap-tagsinput/dist/bootstrap-tagsinput.css',
            'jquery',
            'typeahead'
        ],
        'bootstrap-select': ['css!../libs/bootstrap-select/dist/css/bootstrap-select.min.css', ],
        'summernote': ['css!../libs/summernote/dist/summernote.css'],
        'summernote-lang': ['summernote'],
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
})
