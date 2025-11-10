import { useState, Suspense, lazy } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useMockTopCoffeeBrands,
  useMockWeeklyMoodTrend,
  useMockCoffeeConsumption,
} from "@/feature/mock/hooks";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Spinner } from "@/components/ui/spinner";

// 차트 컴포넌트 lazy loading
const CoffeeBrandsBarChart = lazy(() =>
  import("@/components/charts/coffee-brands").then((mod) => ({
    default: mod.CoffeeBrandsBarChart,
  }))
);
const CoffeeBrandsDonutChart = lazy(() =>
  import("@/components/charts/coffee-brands").then((mod) => ({
    default: mod.CoffeeBrandsDonutChart,
  }))
);
const MoodTrendStackBarChart = lazy(() =>
  import("@/components/charts/mood-trend").then((mod) => ({
    default: mod.MoodTrendStackBarChart,
  }))
);
const MoodTrendStackAreaChart = lazy(() =>
  import("@/components/charts/mood-trend").then((mod) => ({
    default: mod.MoodTrendStackAreaChart,
  }))
);
const CoffeeConsumptionMultiLineChart = lazy(() =>
  import("@/components/charts/coffee-consumption").then((mod) => ({
    default: mod.CoffeeConsumptionMultiLineChart,
  }))
);

export const ChartsPage = () => {
  const { data: topCoffeeBrandsData, isLoading: isLoadingBrands } =
    useMockTopCoffeeBrands();
  const { data: weeklyMoodTrendData, isLoading: isLoadingMood } =
    useMockWeeklyMoodTrend();
  const { data: coffeeConsumptionData, isLoading: isLoadingConsumption } =
    useMockCoffeeConsumption();

  const [moodChartType, setMoodChartType] = useState<"bar" | "area">("bar");
  const [brandsChartType, setBrandsChartType] = useState<"bar" | "donut">(
    "bar"
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">데이터 시각화</h1>

        <div className="space-y-6">
          {/* Top Coffee Brands */}
          <Card>
            <CardHeader>
              <CardTitle>인기 커피 브랜드</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs
                value={brandsChartType}
                onValueChange={(value: string) =>
                  setBrandsChartType(value as "bar" | "donut")
                }
              >
                <TabsList>
                  <TabsTrigger value="bar">바 차트</TabsTrigger>
                  <TabsTrigger value="donut">도넛 차트</TabsTrigger>
                </TabsList>
                <TabsContent value="bar" className="mt-4">
                  {isLoadingBrands ? (
                    <div className="flex items-center justify-center py-8">
                      <Spinner className="size-6" />
                    </div>
                  ) : topCoffeeBrandsData ? (
                    <Suspense
                      fallback={
                        <div className="flex items-center justify-center py-8">
                          <Spinner className="size-6" />
                        </div>
                      }
                    >
                      <div className="h-96">
                        <CoffeeBrandsBarChart data={topCoffeeBrandsData} />
                      </div>
                    </Suspense>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      데이터가 없습니다.
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="donut" className="mt-4">
                  {isLoadingBrands ? (
                    <div className="flex items-center justify-center py-8">
                      <Spinner className="size-6" />
                    </div>
                  ) : topCoffeeBrandsData ? (
                    <Suspense
                      fallback={
                        <div className="flex items-center justify-center py-8">
                          <Spinner className="size-6" />
                        </div>
                      }
                    >
                      <div className="h-96">
                        <CoffeeBrandsDonutChart data={topCoffeeBrandsData} />
                      </div>
                    </Suspense>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      데이터가 없습니다.
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Weekly Mood Trend */}
          <Card>
            <CardHeader>
              <CardTitle>주간 기분 트렌드</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs
                value={moodChartType}
                onValueChange={(value: string) =>
                  setMoodChartType(value as "bar" | "area")
                }
              >
                <TabsList>
                  <TabsTrigger value="bar">스택형 바 차트</TabsTrigger>
                  <TabsTrigger value="area">스택형 면적 차트</TabsTrigger>
                </TabsList>
                <TabsContent value="bar" className="mt-4">
                  {isLoadingMood ? (
                    <div className="flex items-center justify-center py-8">
                      <Spinner className="size-6" />
                    </div>
                  ) : weeklyMoodTrendData ? (
                    <Suspense
                      fallback={
                        <div className="flex items-center justify-center py-8">
                          <Spinner className="size-6" />
                        </div>
                      }
                    >
                      <div className="h-96">
                        <MoodTrendStackBarChart data={weeklyMoodTrendData} />
                      </div>
                    </Suspense>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      데이터가 없습니다.
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="area" className="mt-4">
                  {isLoadingMood ? (
                    <div className="flex items-center justify-center py-8">
                      <Spinner className="size-6" />
                    </div>
                  ) : weeklyMoodTrendData ? (
                    <Suspense
                      fallback={
                        <div className="flex items-center justify-center py-8">
                          <Spinner className="size-6" />
                        </div>
                      }
                    >
                      <div className="h-96">
                        <MoodTrendStackAreaChart data={weeklyMoodTrendData} />
                      </div>
                    </Suspense>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      데이터가 없습니다.
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Coffee Consumption */}
          <Card>
            <CardHeader>
              <CardTitle>커피 소비량과 생산성</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingConsumption ? (
                <div className="flex items-center justify-center py-8">
                  <Spinner className="size-6" />
                </div>
              ) : coffeeConsumptionData ? (
                <Suspense
                  fallback={
                    <div className="flex items-center justify-center py-8">
                      <Spinner className="size-6" />
                    </div>
                  }
                >
                  <div className="h-96">
                    <CoffeeConsumptionMultiLineChart
                      data={coffeeConsumptionData}
                    />
                  </div>
                </Suspense>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  데이터가 없습니다.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
