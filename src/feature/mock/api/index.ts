import { api } from "@/lib/axios";
import type {
  MockCoffeeConsumptionResponse,
  MockPostResponse,
  MockTopCoffeeBrandsResponse,
  MockWeeklyMoodTrendResponse,
} from "../types";

export const mockApi = {
  getPosts: () => api.get<MockPostResponse>("/posts"),
  getCoffeeConsumption: () =>
    api.get<MockCoffeeConsumptionResponse>("/coffee-consumption"),
  getWeeklyMoodTrend: () =>
    api.get<MockWeeklyMoodTrendResponse>("/weekly-mood-trend"),
  getTopCoffeeBrands: () =>
    api.get<MockTopCoffeeBrandsResponse>("/top-coffee-brands"),
};
