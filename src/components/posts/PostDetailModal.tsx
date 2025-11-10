import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "../ui/separator";
import { CATEGORY_OPTIONS_WITH_ALL } from "@/constants/posts";
import { formatDate } from "@/lib/date";
import { usePostDetail } from "@/feature/posts/hooks";
import type { Post } from "@/feature/shared/types";

interface PostDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  postId?: string | null;
  post?: Post | null;
}

export const PostDetailModal = ({
  open,
  onOpenChange,
  postId,
  post: postProp,
}: PostDetailModalProps) => {
  const { data: postData, isLoading } = usePostDetail(postId || "", {
    enabled: open && !!postId && !postProp,
  });

  const post = postProp || postData;

  if (!open || (!postId && !postProp)) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-left">
            {isLoading && !postProp ? "로딩 중..." : post?.title || ""}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto min-h-0">
          {isLoading && !postProp ? (
            <div className="text-center py-8">로딩 중...</div>
          ) : post ? (
            <div className="space-y-4">
              {/* 카테고리 */}
              <div>
                <span className="px-2 py-1 bg-gray-200 rounded text-xs">
                  {
                    CATEGORY_OPTIONS_WITH_ALL.find(
                      (opt) => opt.value === post.category
                    )?.label
                  }
                </span>
              </div>

              {/* 본문 */}
              <div>
                <div className="text-sm text-gray-700 whitespace-pre-wrap break-words">
                  {post.body}
                </div>
              </div>

              {/* 태그 */}
              {post.tags.length > 0 && (
                <div>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <Separator
                orientation="horizontal"
                className="my-2 bg-gray-300"
              />

              {/* 작성자 정보 */}
              <div className="text-right text-sm text-gray-600">
                <div>
                  작성자: {post.userId} | 작성일: {formatDate(post.createdAt)}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
};
