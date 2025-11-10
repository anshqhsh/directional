import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { validateRestrictedWords } from "@/lib/restrictedWords";
import { CATEGORY_OPTIONS } from "@/constants/posts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  usePostDetail,
  useCreatePost,
  useUpdatePost,
} from "@/feature/posts/hooks";
import type {
  UpdatePostRequest,
  CreatePostRequest,
} from "@/feature/posts/types";
import type { Category } from "@/feature/shared/types";

interface PostFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  postId?: string;
  onSuccess?: () => void;
}

export const PostFormModal = ({
  open,
  onOpenChange,
  postId,
  onSuccess,
}: PostFormModalProps) => {
  const isEdit = !!postId;

  const { data: postData } = usePostDetail(postId || "", {
    enabled: isEdit && open,
  });
  const createMutation = useCreatePost();
  const updateMutation = useUpdatePost();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState<Category>("FREE");
  const [tags, setTags] = useState("");
  const [errors, setErrors] = useState<{
    title?: string;
    body?: string;
    tags?: string;
  }>({});

  useEffect(() => {
    if (postData) {
      setTitle(postData.title);
      setBody(postData.body);
      setCategory(postData.category);
      setTags(postData.tags.join(", "));
    } else if (!isEdit) {
      // 새 글 작성 시 초기화
      setTitle("");
      setBody("");
      setCategory("FREE");
      setTags("");
      setErrors({});
    }
  }, [postData, isEdit, open]);

  const validate = (): boolean => {
    const newErrors: typeof errors = {};

    // 제목 검증
    if (!title.trim()) {
      newErrors.title = "제목을 입력해주세요.";
    } else if (title.length > 80) {
      newErrors.title = "제목은 80자 이하여야 합니다.";
    } else {
      const titleError = validateRestrictedWords(title);
      if (titleError) newErrors.title = titleError;
    }

    // 본문 검증
    if (!body.trim()) {
      newErrors.body = "본문을 입력해주세요.";
    } else if (body.length > 2000) {
      newErrors.body = "본문은 2000자 이하여야 합니다.";
    } else {
      const bodyError = validateRestrictedWords(body);
      if (bodyError) newErrors.body = bodyError;
    }

    // 태그 검증
    const tagArray = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
    const uniqueTags = Array.from(new Set(tagArray));

    if (uniqueTags.length > 5) {
      newErrors.tags = "태그는 최대 5개까지 입력 가능합니다.";
    } else {
      for (const tag of uniqueTags) {
        if (tag.length > 24) {
          newErrors.tags = "각 태그는 24자 이하여야 합니다.";
          break;
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!validate()) {
      return;
    }

    const tagArray = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
    const uniqueTags = Array.from(new Set(tagArray));

    try {
      if (isEdit) {
        const updateData: UpdatePostRequest = {
          title,
          body,
          category,
          tags: uniqueTags,
        };
        await updateMutation.mutateAsync({ id: postId, data: updateData });
      } else {
        const createData: CreatePostRequest = {
          title,
          body,
          category,
          tags: uniqueTags,
        };
        await createMutation.mutateAsync(createData);
      }
      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      console.error("게시글 저장 실패:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? "게시글 수정" : "게시글 작성"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="title">제목 *</FieldLabel>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="제목을 입력하세요 (최대 80자)"
                maxLength={80}
              />
              {errors.title && (
                <p className="text-sm text-red-500 mt-1">{errors.title}</p>
              )}
              <p className="text-sm text-gray-500 mt-1">{title.length}/80</p>
            </Field>

            <Field>
              <FieldLabel htmlFor="category">카테고리 *</FieldLabel>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                {CATEGORY_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </Field>

            <Field>
              <FieldLabel htmlFor="body">본문 *</FieldLabel>
              <textarea
                id="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="본문을 입력하세요 (최대 2000자)"
                maxLength={2000}
                rows={10}
                className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none"
              />
              {errors.body && (
                <p className="text-sm text-red-500 mt-1">{errors.body}</p>
              )}
              <p className="text-sm text-gray-500 mt-1">{body.length}/2000</p>
            </Field>

            <Field>
              <FieldLabel htmlFor="tags">태그</FieldLabel>
              <Input
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="태그를 쉼표로 구분하여 입력하세요 (최대 5개, 각 24자 이내)"
              />
              {errors.tags && (
                <p className="text-sm text-red-500 mt-1">{errors.tags}</p>
              )}
              <p className="text-sm text-gray-500 mt-1">
                태그는 쉼표로 구분하며, 중복은 자동으로 제거됩니다.
              </p>
            </Field>

            <Field>
              <div className="flex gap-2">
                <Button
                  type="submit"
                  disabled={
                    createMutation.isPending || updateMutation.isPending
                  }
                  className="flex-1"
                >
                  {isEdit ? "수정하기" : "작성하기"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                >
                  취소
                </Button>
              </div>
            </Field>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
};
