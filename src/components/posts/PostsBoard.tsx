import { useState } from "react";
import { usePosts, useDeletePost } from "@/feature/posts/hooks";
import { PostFormModal } from "@/components/posts/PostFormModal";
import { PostDetailModal } from "@/components/posts/PostDetailModal";
import { Spinner } from "@/components/ui/spinner";
import { usePostSearch } from "./hooks/usePostSearch";
import { usePostPagination } from "./hooks/usePostPagination";
import { usePostModal } from "./hooks/usePostModal";
import { PostSearchFilters } from "./PostSearchFilters";
import { PostListHeader } from "./PostListHeader";
import { PostList } from "./PostList";
import { PostPagination } from "./PostPagination";

export const PostsBoard = () => {
  const {
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
  } = usePostSearch();

  const { data, isLoading, error } = usePosts(params);
  const deleteMutation = useDeletePost();

  const { handleNextPage, handlePrevPage, hasNextPage, hasPrevPage } =
    usePostPagination(data, setParams);

  const {
    isModalOpen,
    editingPostId,
    setIsModalOpen,
    handleEdit,
    handleCreate,
    handleModalClose,
  } = usePostModal();

  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const handlePostClick = (postId: string) => {
    setSelectedPostId(postId);
    setDetailModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      await deleteMutation.mutateAsync(id);
    }
  };

  return (
    <div className="space-y-6">
      <PostSearchFilters
        search={search}
        onSearchChange={setSearch}
        category={params.category || ""}
        onCategoryChange={handleCategoryChange}
        sort={params.sort || "createdAt"}
        onSortChange={handleSortChange}
        order={params.order || "desc"}
        onOrderChange={handleOrderChange}
        fromDate={fromDate}
        toDate={toDate}
        onFromDateChange={handleFromDateChange}
        onToDateChange={handleToDateChange}
        onDateRangeClear={handleDateRangeClear}
      />

      <PostListHeader
        limit={params.limit || 10}
        limitOptions={limitOptions}
        onLimitChange={handleLimitChange}
        onCreateClick={handleCreate}
      />

      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <Spinner className="size-6" />
        </div>
      )}
      {error && (
        <div className="text-center py-8 text-red-500">
          에러가 발생했습니다.
        </div>
      )}

      {data && (
        <>
          <PostList
            posts={data.items}
            onPostClick={handlePostClick}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isDeleting={deleteMutation.isPending}
            showActions={true}
          />

          <PostPagination
            itemCount={data.items.length}
            hasNextPage={hasNextPage}
            hasPrevPage={hasPrevPage}
            onNextPage={handleNextPage}
            onPrevPage={handlePrevPage}
          />
        </>
      )}

      {/* 게시글 작성/수정 모달 */}
      <PostFormModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        postId={editingPostId}
        onSuccess={handleModalClose}
      />

      {/* 게시글 상세 모달 */}
      <PostDetailModal
        open={detailModalOpen}
        onOpenChange={setDetailModalOpen}
        postId={selectedPostId}
      />
    </div>
  );
};
