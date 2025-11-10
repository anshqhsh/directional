import { Button } from "@/components/ui/button";

interface PostPaginationProps {
  itemCount: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  onNextPage: () => void;
  onPrevPage: () => void;
}

export const PostPagination = ({
  itemCount,
  hasNextPage,
  hasPrevPage,
  onNextPage,
  onPrevPage,
}: PostPaginationProps) => {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-500">{itemCount}개 게시글</span>
      <div className="flex gap-2">
        <Button onClick={onPrevPage} disabled={!hasPrevPage} variant="outline">
          이전
        </Button>
        <Button onClick={onNextPage} disabled={!hasNextPage} variant="outline">
          다음
        </Button>
      </div>
    </div>
  );
};
