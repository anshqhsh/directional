import { api } from "@/lib/axios";
import type {
  MockCoffeeConsumptionResponse,
  MockPostResponse,
  MockTopCoffeeBrandsResponse,
  MockWeeklyMoodTrendResponse,
} from "../types";

export const mockApi = {
  getPosts: (count?: number) => {
    const searchParams = new URLSearchParams();
    if (count) searchParams.append("count", count.toString());
    const queryString = searchParams.toString();
    const url = queryString ? `/mock/posts?${queryString}` : "/mock/posts";
    return api.get<MockPostResponse>(url);
  },
  getCoffeeConsumption: () =>
    api.get<MockCoffeeConsumptionResponse>("/mock/coffee-consumption"),
  getWeeklyMoodTrend: () =>
    api.get<MockWeeklyMoodTrendResponse>("/mock/weekly-mood-trend"),
  getTopCoffeeBrands: () =>
    api.get<MockTopCoffeeBrandsResponse>("/mock/top-coffee-brands"),
};
