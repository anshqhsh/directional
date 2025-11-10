import { useState, useEffect } from "react";
import type { GetPostsParams } from "@/feature/posts/types";
import type { Category } from "@/feature/shared/types";
import { useDebounce } from "@/hooks/useDebounce";
import dayjs from "dayjs";

export const usePostSearch = () => {
  const [params, setParams] = useState<GetPostsParams>({
    limit: 3,
    sort: "createdAt",
    order: "desc",
  });
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState<Date | undefined>();
  const [toDate, setToDate] = useState<Date | undefined>();
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    setParams((prev) => ({
      ...prev,
      search: debouncedSearch.trim() || undefined,
      nextCursor: undefined,
      prevCursor: undefined,
    }));
  }, [debouncedSearch]);

  // 날짜 필터 처리
  useEffect(() => {
    setParams((prev) => ({
      ...prev,
      from: fromDate ? dayjs(fromDate).startOf("day").toISOString() : undefined,
      to: toDate ? dayjs(toDate).endOf("day").toISOString() : undefined,
      nextCursor: undefined,
      prevCursor: undefined,
    }));
  }, [fromDate, toDate]);

  const handleCategoryChange = (category: Category | "") => {
    setParams((prev) => ({
      ...prev,
      category: category || undefined,
      nextCursor: undefined,
      prevCursor: undefined,
    }));
  };

  const handleSortChange = (sort: "createdAt" | "title") => {
    setParams((prev) => ({
      ...prev,
      sort,
      nextCursor: undefined,
      prevCursor: undefined,
    }));
  };

  const handleOrderChange = (order: "asc" | "desc") => {
    setParams((prev) => ({
      ...prev,
      order,
      nextCursor: undefined,
      prevCursor: undefined,
    }));
  };

  const limitOptions: { value: number; label: string }[] = [
    { value: 3, label: "3" },
    { value: 10, label: "10" },
    { value: 20, label: "20" },
    { value: 50, label: "50" },
    { value: 100, label: "100" },
  ];
  const handleLimitChange = (limit: number) => {
    setParams((prev) => ({
      ...prev,
      limit,
      nextCursor: undefined,
      prevCursor: undefined,
    }));
  };

  const handleFromDateChange = (date: Date | undefined) => {
    setFromDate(date);
  };

  const handleToDateChange = (date: Date | undefined) => {
    setToDate(date);
  };

  const handleDateRangeClear = () => {
    setFromDate(undefined);
    setToDate(undefined);
  };

  return {
    params,
    search,
    setSearch,
    fromDate,
    toDate,
    handleFromDateChange,
    handleToDateChange,
    handleDateRangeClear,
    handleCategoryChange,
    handleSortChange,
    handleOrderChange,
    setParams,
    limitOptions,
    handleLimitChange,
  };
};
