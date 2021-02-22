import React from 'react';
import { observer } from 'mobx-react';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import {
  GridComponent,
  ToolboxComponent,
  TooltipComponent,
  TitleComponent,
  LegendPlainComponent,
  MarkLineComponent
} from 'echarts/components';
import { SVGRenderer } from 'echarts/renderers';

echarts.use([
  GridComponent,
  ToolboxComponent,
  TooltipComponent,
  TitleComponent,
  LegendPlainComponent,
  MarkLineComponent,
  LineChart,
  SVGRenderer
]);

const RepDelChart = (props) => {

  const { yLabelName, data, q95 } = props;

  const options = {
    textStyle: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
    },
    grid: { top: 40, right: 10, bottom: 40, left: 60 },
    xAxis: {
      type: 'value',
      name: 'Notification time in quarters of the year',
      nameLocation: 'center',
      nameTextStyle: {
        padding: [10, 0, 0, 0],
      },
      boundaryGap: false,
    },
    yAxis: {
      type: 'value',
      name: yLabelName,
      nameLocation: 'center',
      nameGap: 45,
    },
    series: [
      {
        name: data[0].name,
        type: 'line',
        data: data[0].data,
        showSymbol: false,
        areaStyle: {
          opacity: 0.4,
        },
        markLine: {
          data: [[
            {
              name: `95% of cases reported by ${q95} quarters`,
              xAxis: q95,
              y: 40,
            },
            {
              xAxis: q95,
              y: 260,
            }
          ]],
          lineStyle: {
            color: '#69b023'
          },
          label: {
            position: 'start',
            distance: 10,
            formatter: '{a|{b}}',
            rich: {
              a: {
                color: '#fff',
                backgroundColor: '#69b023',
                padding: 5,
                borderRadius: 5
              }
            }
          }
        }
      },
    ],
    tooltip: {
      trigger: 'axis',
      // formatter: (params) => {
      //   return `
      //     Year: ${params[0].axisValue}<br/ >
      //     ${params[0].seriesName}: ${params[0].value}<br />
      //     ${params[1].seriesName}: ${params[1].value} (${params[2].value}, ${params[2].value + params[3].value})<br />
      //   `
      // }
    },
    toolbox: {
      show: true,
      feature: {
        dataZoom: {},
        restore: {},
        saveAsImage: { pixelRatio: 2 },
      },
    },
  };

  return (
    <ReactEchartsCore
      echarts={echarts}
      option={options}
      notMerge={true}
      lazyUpdate={true}
      opts={{}}
    />
  );
};

export default observer(RepDelChart);
