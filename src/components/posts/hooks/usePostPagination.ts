import { useState } from "react";
import type { PostResponse } from "@/feature/posts/types";
import type { GetPostsParams } from "@/feature/posts/types";

export const usePostPagination = (
  data: PostResponse | undefined,
  setParams: React.Dispatch<React.SetStateAction<GetPostsParams>>
) => {
  const [currentCursor, setCurrentCursor] = useState<string | null>(null);
  const [cursorHistory, setCursorHistory] = useState<string[]>([]);

  const handleNextPage = () => {
    if (data?.nextCursor) {
      setCursorHistory((prev) => [...prev, currentCursor || ""]);
      setCurrentCursor(data.nextCursor);
      setParams((prev) => ({
        ...prev,
        nextCursor: data.nextCursor || undefined,
        prevCursor: undefined,
      }));
    }
  };

  const handlePrevPage = () => {
    if (cursorHistory.length > 0) {
      const prevCursor = cursorHistory[cursorHistory.length - 1];
      const newHistory = cursorHistory.slice(0, -1);
      setCursorHistory(newHistory);
      setCurrentCursor(prevCursor || null);
      setParams((prev) => ({
        ...prev,
        prevCursor: prevCursor || undefined,
        nextCursor: undefined,
      }));
    }
  };

  return {
    cursorHistory,
    handleNextPage,
    handlePrevPage,
    hasNextPage: !!data?.nextCursor,
    hasPrevPage: cursorHistory.length > 0,
  };
};
