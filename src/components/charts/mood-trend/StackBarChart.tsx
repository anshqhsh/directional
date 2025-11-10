import { useMemo } from "react";
import ReactECharts from "echarts-for-react";
import { echarts } from "@/lib/echarts";
import { getChartColorPalette } from "@/lib/chart-colors";
import { colorToOklchMap } from "@/constants/colors";
import type { WeeklyMoodItem } from "@/feature/mock/types";

interface StackBarChartProps {
  data: WeeklyMoodItem[];
}

export function MoodTrendStackBarChart({ data }: StackBarChartProps) {
  const chartOption = useMemo(() => {
    if (!data || data.length === 0) {
      return {
        title: { text: "데이터가 없습니다" },
        xAxis: { type: "category", data: [] },
        yAxis: { type: "value" },
        series: [],
      };
    }

    const chartColors = getChartColorPalette();
    const sortedData = [...data].sort((a, b) => a.week.localeCompare(b.week));

    return {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
        formatter: (
          params: Array<{
            name: string;
            seriesName: string;
            value: number;
            color: string;
          }>
        ) => {
          if (!params || params.length === 0) return "";
          const week = params[0].name;
          let total = 0;
          let result = `
              <div style="font-weight: 600; color: #374151; margin-bottom: 4px;">${week}</div>
          `;
          params.forEach((param) => {
            total += param.value;
            result += `
              <div style="color: #6b7280; margin-bottom: 2px;">
                <span style="display: inline-block; width: 10px; height: 10px; background: ${param.color}; margin-right: 6px; border-radius: 2px;"></span>
                ${param.seriesName}: ${param.value}%
              </div>
            `;
          });

          result += `
            <div style="margin-top: 4px; padding-top: 4px; border-top: 1px solid #e5e7eb; font-weight: 600; color: #374151;">
              총합: ${total}%
            </div>
          </div>
          `;

          return result;
        },
        backgroundColor: "white",
        borderColor: "transparent",
        textStyle: {
          color: "transparent",
        },
      },
      legend: {
        show: true,
        data: ["행복", "피곤", "스트레스"],
        top: "5%",
        left: "center",
        textStyle: {
          color: colorToOklchMap["gray-700"],
          fontSize: 12,
        },
        itemWidth: 14,
        itemHeight: 14,
      },
      grid: {
        left: "5%",
        right: "5%",
        bottom: "5%",
        top: "15%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: sortedData.map((item) => item.week),
        axisLabel: {
          color: colorToOklchMap["gray-500"],
          rotate: 45,
          interval: 0,
        },
        axisLine: {
          lineStyle: {
            color: colorToOklchMap["gray-200"],
          },
        },
      },
      yAxis: {
        type: "value",
        name: "백분율 (%)",
        nameTextStyle: {
          color: colorToOklchMap["gray-500"],
        },
        min: 0,
        max: 100,
        axisLabel: {
          color: colorToOklchMap["gray-500"],
          formatter: "{value}%",
        },
        axisLine: {
          lineStyle: {
            color: colorToOklchMap["gray-200"],
          },
        },
        splitLine: {
          lineStyle: {
            color: colorToOklchMap["gray-200"],
            opacity: 0.3,
          },
        },
      },
      series: [
        {
          name: "행복",
          type: "bar",
          stack: "total",
          data: sortedData.map((item) => item.happy),
          itemStyle: {
            color: chartColors[1], // green
          },
        },
        {
          name: "피곤",
          type: "bar",
          stack: "total",
          data: sortedData.map((item) => item.tired),
          itemStyle: {
            color: chartColors[2], // yellow
          },
        },
        {
          name: "스트레스",
          type: "bar",
          stack: "total",
          data: sortedData.map((item) => item.stressed),
          itemStyle: {
            color: chartColors[3], // red
          },
        },
      ],
      color: chartColors,
    };
  }, [data]);

  return (
    <div className="w-full h-full">
      <ReactECharts
        echarts={echarts}
        option={chartOption}
        style={{ height: "100%", width: "100%" }}
        notMerge={true}
        lazyUpdate={true}
      />
    </div>
  );
}
