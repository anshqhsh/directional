import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2, Edit2 } from "lucide-react";
import { CATEGORY_OPTIONS_WITH_ALL } from "@/constants/posts";
import { formatDate } from "@/lib/date";
import type { Post } from "@/feature/shared/types";

interface PostListProps {
  posts: Post[];
  onPostClick: (postId: string) => void;
  onEdit?: (postId: string) => void;
  onDelete?: (postId: string) => void;
  isDeleting?: boolean;
  showActions?: boolean;
}

export const PostList = ({
  posts,
  onPostClick,
  onEdit,
  onDelete,
  isDeleting = false,
  showActions = true,
}: PostListProps) => {
  if (posts.length === 0) {
    return (
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">카테고리</TableHead>
                <TableHead>제목</TableHead>
                <TableHead className="w-[200px]">작성일</TableHead>
                <TableHead className="w-[150px]">태그</TableHead>
                <TableHead className="w-[100px]">작성자</TableHead>
                {showActions && (
                  <TableHead className="w-[120px]">작업</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell
                  colSpan={showActions ? 6 : 5}
                  className="text-center py-8"
                >
                  게시글이 없습니다.
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">카테고리</TableHead>
              <TableHead>제목</TableHead>
              <TableHead className="w-[200px]">작성일</TableHead>
              <TableHead className="w-[150px]">태그</TableHead>
              <TableHead className="w-[100px]">작성자</TableHead>
              {showActions && <TableHead className="w-[120px]">작업</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow
                key={post.id}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => onPostClick(post.id)}
              >
                <TableCell>
                  <span className="px-2 py-1 bg-gray-200 rounded text-xs">
                    {
                      CATEGORY_OPTIONS_WITH_ALL.find(
                        (opt) => opt.value === post.category
                      )?.label
                    }
                  </span>
                </TableCell>
                <TableCell className="min-w-0">
                  <div className="break-words">
                    <div className="text-sm font-medium">{post.title}</div>
                  </div>
                </TableCell>
                <TableCell className="text-sm">
                  {formatDate(post.createdAt)}
                </TableCell>
                <TableCell>
                  {post.tags.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 2).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                      {post.tags.length > 2 && (
                        <span className="text-xs text-gray-500">
                          +{post.tags.length - 2}
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="text-gray-400 text-sm">-</span>
                  )}
                </TableCell>
                <TableCell className="text-sm text-gray-600">
                  {post.userId}
                </TableCell>
                {showActions && (
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <div className="flex gap-2">
                      {onEdit && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onEdit(post.id)}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                      )}
                      {onDelete && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onDelete(post.id)}
                          disabled={isDeleting}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
