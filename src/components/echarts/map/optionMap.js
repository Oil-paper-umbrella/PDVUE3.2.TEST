import optionPublicFun from '../../../utils/optionPublic.js'
class optionMapFun {
  /**
   * @namespace mapTooltip
   * @author he
   * create in 19-12-12
   */
  mapTooltip() {
    let tooltip = {
      trigger: 'item',
      formatter: '{b}<br/>得分：{c} ',
      textStyle: new optionPublicFun().textStyle("normal"),
    }
    return tooltip;
  }
  /**
   * @namespace mapSeries
   * @param {各地市数据} datas 
   */
  mapSeries(datas) {
    let series = [
      {
        type: 'map',
        // top: '10%',
        mapType: '河南',
        roam: false,//鼠标缩放和平移漫游
        label: {
          normal: {
            show: true,
            textStyle: {
              color: '#fff'
            }
          },
          emphasis: {
            color: 'red'
          }
        },
        data: datas,
        zoom: 1.25
      }
    ]
    return series;
  }
}
export default optionMapFun;