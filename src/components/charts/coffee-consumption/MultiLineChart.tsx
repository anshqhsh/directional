import { useMemo } from "react";
import ReactECharts, { type EChartsOption } from "echarts-for-react";
import { echarts } from "@/lib/echarts";
import { getChartColorPalette } from "@/lib/chart-colors";
import { colorToOklchMap } from "@/constants/colors";
import type { MockCoffeeConsumptionResponse } from "@/feature/mock/types";

interface MultiLineChartProps {
  data: MockCoffeeConsumptionResponse | null;
}

export function CoffeeConsumptionMultiLineChart({ data }: MultiLineChartProps) {
  const chartOption = useMemo(() => {
    if (!data || !data.teams || data.teams.length === 0) {
      return {
        title: { text: "데이터가 없습니다" },
        xAxis: { type: "value" },
        yAxis: [{ type: "value" }, { type: "value" }],
        series: [],
      };
    }

    const chartColors = getChartColorPalette();
    const teams = data.teams;

    // 모든 팀의 데이터 포인트에서 커피 잔수 추출 및 정렬
    const allCups = new Set<number>();
    teams.forEach((team) => {
      team.series.forEach((point) => {
        allCups.add(point.cups);
      });
    });

    // 각 팀별로 series 생성
    const series: EChartsOption["series"] = [];
    teams.forEach((team, teamIndex) => {
      const teamColor = chartColors[teamIndex % chartColors.length];

      // 팀의 series를 cups 기준으로 정렬
      const sortedTeamSeries = [...team.series].sort((a, b) => a.cups - b.cups);
      const teamCups = sortedTeamSeries.map((p) => p.cups);
      const teamBugs = sortedTeamSeries.map((p) => p.bugs);
      const teamProductivity = sortedTeamSeries.map((p) => p.productivity);

      // 버그 수 라인 (실선, 원형 마커)
      series.push({
        name: `${team.team} - 버그 수`,
        type: "line",
        yAxisIndex: 0, // 왼쪽 Y축
        data: teamBugs.map((bugs, index) => [teamCups[index], bugs]),
        lineStyle: {
          color: teamColor,
          width: 2,
          type: "solid", // 실선
        },
        itemStyle: {
          color: teamColor,
        },
        symbol: "circle", // 원형 마커
        symbolSize: 8,
        connectNulls: false,
      });

      // 생산성 라인 (점선, 사각형 마커)
      series.push({
        name: `${team.team} - 생산성`,
        type: "line",
        yAxisIndex: 1, // 오른쪽 Y축
        data: teamProductivity.map((prod, index) => [teamCups[index], prod]),
        lineStyle: {
          color: teamColor,
          width: 2,
          type: "dashed", // 점선
        },
        itemStyle: {
          color: teamColor,
        },
        symbol: "rect", // 사각형 마커
        symbolSize: 8,
        connectNulls: false,
      });
    });

    return {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
        },
        formatter: (
          params: Array<{
            name: string;
            seriesName: string;
            value: number | [number, number] | null;
            color: string;
            dataIndex: number;
          }>
        ) => {
          if (!params || params.length === 0) return "";

          // params[0].value는 [cups, yValue] 형태의 배열
          const firstParam = params[0];
          const value = firstParam.value;
          const cups = Array.isArray(value) ? value[0] : 0;

          // 같은 X축 값(커피 잔수)에 해당하는 모든 라인의 데이터 수집
          const bugsLines = params.filter((p) =>
            p.seriesName.includes("버그 수")
          );
          const productivityLines = params.filter((p) =>
            p.seriesName.includes("생산성")
          );

          let result = `
            
              <div style="font-weight: 600; color: #374151; margin-bottom: 4px;">커피 잔수: ${cups}잔/일</div>
          `;

          // 버그 수 표시
          bugsLines.forEach((param) => {
            const val = param.value;
            if (val !== null && Array.isArray(val)) {
              const teamName = param.seriesName.replace(" - 버그 수", "");
              result += `
                <div style="color: #6b7280; margin-bottom: 2px;">
                  <span style="display: inline-block; width: 10px; height: 10px; background: ${
                    param.color
                  }; border-radius: 50%; margin-right: 6px;"></span>
                  ${teamName} - 버그 수: ${Math.round(val[1])}
                </div>
              `;
            }
          });

          // 생산성 표시
          productivityLines.forEach((param) => {
            const val = param.value;
            if (val !== null && Array.isArray(val)) {
              const teamName = param.seriesName.replace(" - 생산성", "");
              result += `
                <div style="color: #6b7280; margin-bottom: 2px;">
                  <span style="display: inline-block; width: 10px; height: 10px; background: ${
                    param.color
                  }; margin-right: 6px;"></span>
                  ${teamName} - 생산성: ${Math.round(val[1])}점
                </div>
              `;
            }
          });

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
        data: series.map((s: EChartsOption["series"]) => s.name),
        top: "5%",
        left: "center",
        textStyle: {
          color: colorToOklchMap["gray-700"],
          fontSize: 12,
        },
        itemWidth: 14,
        itemHeight: 14,
        type: "scroll",
      },
      grid: {
        left: "5%",
        right: "5%",
        bottom: "5%",
        top: "20%",
        containLabel: true,
      },
      xAxis: {
        type: "value",
        name: "커피 섭취량 (잔/일)",
        nameLocation: "middle",
        nameGap: 30,
        min: 1, // 최소값을 1로 설정하여 0잔 제거
        nameTextStyle: {
          color: colorToOklchMap["gray-500"],
        },
        axisLabel: {
          color: colorToOklchMap["gray-500"],
          formatter: "{value}잔",
        },
        axisLine: {
          lineStyle: {
            color: colorToOklchMap["gray-200"],
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: colorToOklchMap["gray-200"],
            opacity: 0.3,
          },
        },
      },
      yAxis: [
        {
          type: "value",
          name: "버그 수",
          nameTextStyle: {
            color: colorToOklchMap["gray-500"],
          },
          position: "left",
          axisLabel: {
            color: colorToOklchMap["gray-500"],
            formatter: "{value}",
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
        {
          type: "value",
          name: "생산성 점수",
          nameTextStyle: {
            color: colorToOklchMap["gray-500"],
          },
          position: "right",
          min: 0,
          max: 100,
          axisLabel: {
            color: colorToOklchMap["gray-500"],
            formatter: "{value}점",
          },
          axisLine: {
            lineStyle: {
              color: colorToOklchMap["gray-200"],
            },
          },
          splitLine: {
            show: false,
          },
        },
      ],
      series,
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
