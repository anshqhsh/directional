/**
 * 카테고리 상수 및 옵션
 */

import type { Category } from "@/feature/shared/types";

export const CATEGORIES = {
  NOTICE: "NOTICE",
  QNA: "QNA",
  FREE: "FREE",
} as const;

export const CATEGORY_OPTIONS: { value: Category; label: string }[] = [
  { value: CATEGORIES.NOTICE, label: "공지사항" },
  { value: CATEGORIES.QNA, label: "Q&A" },
  { value: CATEGORIES.FREE, label: "자유게시판" },
];

export const CATEGORY_OPTIONS_WITH_ALL: {
  value: Category | "";
  label: string;
}[] = [{ value: "", label: "전체" }, ...CATEGORY_OPTIONS];

export const MAX_TITLE_LENGTH = 80;
export const MAX_BODY_LENGTH = 2000;
export const MAX_TAGS_COUNT = 5;
export const MAX_TAG_LENGTH = 24;

export const RESTRICTED_WORDS = ["캄보디아", "프놈펜", "불법체류"] as const;
