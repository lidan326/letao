$(function () {
  var echars1 = echarts.init(document.querySelector('.echarts_left'));

  // 指定图表的配置项和数据
  var option1 = {
    title: {
      text: '2018年注册人数'
    },
    tooltip: {},
    legend: {
      data: ['人数']
    },
    xAxis: {
      data: ["1", "2", "3", "4", "5", "6"]
    },
    yAxis: {},
    series: [{
      name: '销量',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20]
    }]
  };

  // 使用刚指定的配置项和数据显示图表。
  echars1.setOption(option1);



  var echars2 = echarts.init(document.querySelector('.echarts_right'));

  // 指定图表的配置项和数据
  var  option2 = {
    title : {
        text: '某站点用户访问来源',
        subtext: '纯属虚构',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
    },
    series : [
        {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};


  // 使用刚指定的配置项和数据显示图表。
  echars2.setOption(option2);
})