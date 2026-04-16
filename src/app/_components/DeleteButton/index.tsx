import { Id } from "@/types";
import { TrashIcon } from "@phosphor-icons/react";

type DeleteButtonProps = {
  onDelete: () => void;
};

export function DeleteButton({ onDelete }: DeleteButtonProps) {
  return (
    <button onClick={onDelete} className="cursor-pointer">
      <TrashIcon size={24} />
    </button>
  );
}
