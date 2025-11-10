import { CATEGORY_OPTIONS_WITH_ALL } from "@/constants/posts";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import type { Category } from "@/feature/shared/types";

const SORT_OPTIONS: { value: "createdAt" | "title"; label: string }[] = [
  { value: "createdAt", label: "작성일" },
  { value: "title", label: "제목" },
];

const ORDER_OPTIONS: { value: "asc" | "desc"; label: string }[] = [
  { value: "desc", label: "내림차순" },
  { value: "asc", label: "오름차순" },
];

interface PostSearchFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  category: Category | "";
  onCategoryChange: (category: Category | "") => void;
  sort: "createdAt" | "title";
  onSortChange: (sort: "createdAt" | "title") => void;
  order: "asc" | "desc";
  onOrderChange: (order: "asc" | "desc") => void;
  fromDate?: Date;
  toDate?: Date;
  onFromDateChange: (date: Date | undefined) => void;
  onToDateChange: (date: Date | undefined) => void;
  onDateRangeClear: () => void;
}

export const PostSearchFilters = ({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  sort,
  onSortChange,
  order,
  onOrderChange,
  fromDate,
  toDate,
  onFromDateChange,
  onToDateChange,
  onDateRangeClear,
}: PostSearchFiltersProps) => {
  return (
    <Card>
      <CardContent>
        <FieldGroup>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Field>
              <FieldLabel>검색어</FieldLabel>
              <div className="flex gap-2">
                <Input
                  value={search}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="제목 또는 본문 검색"
                />
              </div>
            </Field>
            <Field>
              <FieldLabel>카테고리</FieldLabel>
              <select
                value={category}
                onChange={(e) =>
                  onCategoryChange(e.target.value as Category | "")
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                {CATEGORY_OPTIONS_WITH_ALL.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field>
              <FieldLabel>정렬 기준</FieldLabel>
              <select
                value={sort}
                onChange={(e) =>
                  onSortChange(e.target.value as "createdAt" | "title")
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field>
              <FieldLabel>정렬방향</FieldLabel>
              <select
                value={order}
                onChange={(e) =>
                  onOrderChange(e.target.value as "asc" | "desc")
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                {ORDER_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Field>
              <FieldLabel>시작 날짜</FieldLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !fromDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {fromDate ? (
                      dayjs(fromDate).format("YYYY-MM-DD")
                    ) : (
                      <span>날짜 선택</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={fromDate}
                    onSelect={onFromDateChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </Field>
            <Field>
              <FieldLabel>종료 날짜</FieldLabel>
              <div className="flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !toDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {toDate ? (
                        dayjs(toDate).format("YYYY-MM-DD")
                      ) : (
                        <span>날짜 선택</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={toDate}
                      onSelect={onToDateChange}
                      initialFocus
                      disabled={(date) => (fromDate ? date < fromDate : false)}
                    />
                  </PopoverContent>
                </Popover>
                {(fromDate || toDate) && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={onDateRangeClear}
                    title="날짜 필터 초기화"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </Field>
          </div>
        </FieldGroup>
      </CardContent>
    </Card>
  );
};
