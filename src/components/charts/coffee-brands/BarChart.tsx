import { useMemo } from "react";
import ReactECharts from "echarts-for-react";
import { echarts } from "@/lib/echarts";
import { getChartColorPalette } from "@/lib/chart-colors";
import { colorToOklchMap } from "@/constants/colors";
import type { TopCoffeeBrandItem } from "@/feature/mock/types";

interface BarChartProps {
  data: TopCoffeeBrandItem[];
}

export function CoffeeBrandsBarChart({ data }: BarChartProps) {
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
    const sortedData = [...data].sort((a, b) => b.popularity - a.popularity);

    return {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
        formatter: (
          params: Array<{
            name: string;
            value: number;
            color: string;
          }>
        ) => {
          if (!params || params.length === 0) return "";
          const param = params[0];
          return `
            <div>
              <div style="font-weight: 600; color: #374151; margin-bottom: 4px;">${param.name}</div>
              <div style="color: #6b7280;">인기도: ${param.value}%</div>
            </div>
          `;
        },
        backgroundColor: "white",
        borderColor: "transparent",
        textStyle: {
          color: "transparent",
        },
      },
      grid: {
        left: "5%",
        right: "5%",
        bottom: "5%",
        top: "10%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: sortedData.map((item) => item.brand),
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
        name: "인기도 (%)",
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
          name: "인기도",
          type: "bar",
          data: sortedData.map((item) => item.popularity),
          itemStyle: {
            color: chartColors[0],
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: "rgba(0, 0, 0, 0.3)",
            },
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
