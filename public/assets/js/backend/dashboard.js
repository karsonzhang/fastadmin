define(['jquery', 'bootstrap', 'backend', 'addtabs', 'table', 'echarts', 'echarts-theme'], function ($, undefined, Backend, Datatable, Table, Echarts) {

    var Controller = {
        index: function () {
            // 基于准备好的dom，初始化echarts实例
            var myChart = Echarts.init(document.getElementById('echart'), 'walden');

            // 指定图表的配置项和数据
            var option = {
                title: {
                    text: '',
                    subtext: ''
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['下单', '成交']
                },
                toolbox: {
                    show: false,
                    feature: {
                        magicType: {show: true, type: ['stack', 'tiled']},
                        saveAsImage: {show: true}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: Orderdata.column
                },
                yAxis: {

                },
                grid: [{
                        left: 'left',
                        top: 'top',
                        right: '10',
                        bottom:30
                    }],
                series: [{
                        name: '成交',
                        type: 'line',
                        smooth: true,
                        areaStyle: {
                            normal: {
                            }
                        },
                        lineStyle: {
                            normal: {
                                width:1.5
                            }
                        },
                        data: Orderdata.paydata
                    },
                    {
                        name: '下单',
                        type: 'line',
                        smooth: true,
                        areaStyle: {
                            normal: {
                            }
                        },
                        lineStyle: {
                            normal: {
                                width:1.5
                            }
                        },
                        data: Orderdata.createdata
                    }]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
            $(window).resize(function(){
               myChart.resize();
            });
        }
    };

    return Controller;
});