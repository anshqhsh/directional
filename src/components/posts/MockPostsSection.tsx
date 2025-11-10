import { useState } from "react";
import { useMockPosts } from "@/feature/mock/hooks";
import { PostList } from "./PostList";
import { PostDetailModal } from "./PostDetailModal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Post } from "@/feature/shared/types";

export const MockPostsSection = () => {
  const [count, setCount] = useState<number>(10);
  const { data: mockPostsData, isLoading } = useMockPosts({ count });
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handlePostClick = (postId: string) => {
    const post = mockPostsData?.items.find((p) => p.id === postId);
    if (post) {
      setSelectedPost(post);
      setDetailModalOpen(true);
    }
  };

  const countOptions = [5, 10, 20, 30, 50, 100, 300, 500];

  return (
    <>
      <div className="mt-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-gray-900">최근 게시글</h2>
          <div className="flex items-center gap-2">
            <label htmlFor="count-select" className="text-sm text-gray-600">
              개수:
            </label>
            <Select
              value={count.toString()}
              onValueChange={(value) => setCount(Number(value))}
            >
              <SelectTrigger id="count-select" className="w-[100px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {countOptions.map((option) => (
                  <SelectItem key={option} value={option.toString()}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        {isLoading ? (
          <div className="text-center py-8">로딩 중...</div>
        ) : mockPostsData && mockPostsData.items.length > 0 ? (
          <div className="overflow-x-auto">
            <PostList
              posts={mockPostsData.items}
              onPostClick={handlePostClick}
              showActions={false}
            />
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            게시글이 없습니다.
          </div>
        )}
      </div>

      {/* 게시글 상세 모달 */}
      <PostDetailModal
        open={detailModalOpen}
        onOpenChange={setDetailModalOpen}
        post={selectedPost}
      />
    </>
  );
};
