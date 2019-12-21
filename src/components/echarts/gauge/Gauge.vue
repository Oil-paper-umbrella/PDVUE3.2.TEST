<template>
  <div class="gauge-chart">
    <div id="gauge-container"></div>
  </div>
</template>

<script>
import optionPublicFun from "../../../utils/optionPublic.js";
import echarts from "echarts"
require("echarts/lib/chart/gauge")
require("echarts/lib/component/tooltip")
require("echarts/lib/component/title")
require("echarts/lib/component/legend")
require("echarts/lib/component/toolbox")
require("echarts/lib/component/grid")
export default {
  name: "gauge-chart",
  data() {
    return {
      myChart: {}
    };
  },
  created() {
    this.$nextTick(() => {
      this.gaugeCharts();
      let pd_this = this;
      setInterval(function () {
          pd_this.gaugeCharts();
      },2000);
      this.gaugeCharts();
    });
  },
  methods: {
    gaugeCharts() {
      this.myChart = new optionPublicFun().init("gauge-container");
      var base = +new Date(1968, 9, 3);
      var oneDay = 24 * 3600 * 1000;
      var date = [];
      var data = [Math.random() * 300];
      for (var i = 1; i < 20000; i++) {
        var now = new Date((base += oneDay));
        date.push(
          [now.getFullYear(), now.getMonth() + 1, now.getDate()].join("/")
        );
        data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
      }
      let option = {
        tooltip: {
          trigger: "axis",
          position: function(pt) {
            return [pt[0], "10%"];
          }
        },
        title: {
          left: "center",
          text: "大数据量面积图"
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: "none"
            },
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: date
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, "100%"]
        },
        series: [
          {
            name: "模拟数据",
            type: "line",
            smooth: true,
            symbol: "none",
            sampling: "average",
            itemStyle: {
              color: "rgb(255, 70, 131)"
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(255, 158, 68)"
                },
                {
                  offset: 1,
                  color: "rgb(255, 70, 131)"
                }
              ])
            },
            data: data
          }
        ]
      };
      // option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
      this.myChart.setOption(option, true);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.gauge-chart {
  width: 100%;
  height: 100%;
  #gauge-container {
    width: 100%;
    height: 100%;
  }
}
</style>
