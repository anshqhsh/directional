/**
 * mock feature 전용 타입
 * 공통 타입은 @/feature/shared/types에서 import
 */

import type { Post } from "@/feature/shared/types";

export interface MockPostResponse {
  items: Post[];
  count: number;
}

export interface CoffeeTeam {
  team: string;
  series: CoffeeDataPoint[];
}

export interface CoffeeDataPoint {
  cups: number; // min : 0
  bugs: number; // min : 0
  productivity: number; // min : 0 max : 100
}

// 멀티라인 차트용 팀별 커피 소비/버그/생산성 목없
export interface MockCoffeeConsumptionResponse {
  teams: CoffeeTeam[];
  count: number;
}

export interface WeeklyMoodItem {
  week: string; // ex) 2024-12-09
  happy: number; // min : 0 max : 100
  tired: number; // min : 0 max : 100
  stressed: number; // min : 0 max : 100
}

export type MockWeeklyMoodTrendResponse = WeeklyMoodItem[];

export interface TopCoffeeBrandItem {
  brand: string;
  popularity: number; // min : 0 max : 100
}

export type MockTopCoffeeBrandsResponse = TopCoffeeBrandItem[];
