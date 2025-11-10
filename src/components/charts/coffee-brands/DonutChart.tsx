import { useMemo } from "react";
import ReactECharts from "echarts-for-react";
import { echarts } from "@/lib/echarts";
import { getChartColorPalette } from "@/lib/chart-colors";
import { colorToOklchMap } from "@/constants/colors";
import type { TopCoffeeBrandItem } from "@/feature/mock/types";

interface DonutChartProps {
  data: TopCoffeeBrandItem[];
}

export function CoffeeBrandsDonutChart({ data }: DonutChartProps) {
  const chartOption = useMemo(() => {
    if (!data || data.length === 0) {
      return {
        title: { text: "데이터가 없습니다" },
        series: [],
      };
    }

    const chartColors = getChartColorPalette();
    const sortedData = [...data].sort((a, b) => b.popularity - a.popularity);

    return {
      tooltip: {
        trigger: "item",
        formatter: (params: {
          name: string;
          percent: number;
          value: number;
          color: string;
        }) => {
          return `
            <div style="padding: 8px 12px; background: white; border: 1px solid #e5e7eb; border-radius: 6px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); font-size: 12px;">
              <div style="font-weight: 600; color: #374151; margin-bottom: 4px;">
                <span style="color: ${
                  params.color
                }; margin-right: 6px;">●</span>
                ${params.name}
              </div>
              <div style="color: #6b7280;">
                인기도: ${params.value}% (${params.percent.toFixed(1)}%)
              </div>
            </div>
          `;
        },
        backgroundColor: "white",
        borderColor: "transparent",
        textStyle: {
          color: "transparent",
        },
      },
      legend: {
        show: true,
        orient: "vertical",
        left: "left",
        top: "center",
        textStyle: {
          color: colorToOklchMap["gray-700"],
          fontSize: 12,
        },
        itemWidth: 14,
        itemHeight: 14,
        formatter: (name: string) => {
          const item = sortedData.find((d) => d.brand === name);
          if (item) {
            return `${name} (${item.popularity}%)`;
          }
          return name;
        },
      },
      series: [
        {
          name: "커피 브랜드",
          type: "pie",
          radius: ["40%", "70%"], // 도넛 차트
          center: ["60%", "50%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 8,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: false,
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 14,
              fontWeight: "bold",
            },
          },
          data: sortedData.map((item, index) => ({
            name: item.brand,
            value: item.popularity,
            itemStyle: {
              color: chartColors[index % chartColors.length],
            },
          })),
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
