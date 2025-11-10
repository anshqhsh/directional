import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Plus } from "lucide-react";

interface PostListHeaderProps {
  limit: number;
  limitOptions: { value: number; label: string }[];
  onLimitChange: (limit: number) => void;
  onCreateClick: () => void;
  showCreateButton?: boolean;
}

export const PostListHeader = ({
  limit,
  limitOptions,
  onLimitChange,
  onCreateClick,
  showCreateButton = true,
}: PostListHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <Select
        value={limit.toString()}
        onValueChange={(value: string) => onLimitChange(Number(value))}
      >
        <SelectTrigger>
          <SelectValue placeholder="페이지 크기" />
        </SelectTrigger>
        <SelectContent>
          {limitOptions.map((option) => (
            <SelectItem key={option.value} value={option.value.toString()}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {showCreateButton && (
        <Button onClick={onCreateClick}>
          <Plus className="w-4 h-4 mr-2" />
          작성하기
        </Button>
      )}
    </div>
  );
};
