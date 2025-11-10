import { useState } from "react";

export const usePostModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | undefined>();

  const handleEdit = (id: string) => {
    setEditingPostId(id);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setEditingPostId(undefined);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingPostId(undefined);
  };

  return {
    isModalOpen,
    editingPostId,
    setIsModalOpen,
    handleEdit,
    handleCreate,
    handleModalClose,
  };
};

