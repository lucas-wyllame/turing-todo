import { ButtonHTMLAttributes } from "react";

export type PriorityButtonProps = {
  onClick?: () => void;
  btnColor: string;
  label: "ALTA" | "MÉDIA" | "BAIXA";
  isSelected?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function PriorityButton({ onClick, btnColor, label, isSelected }: PriorityButtonProps) {
  return (
    <button
      className={`cursor-pointer w-[50%] h-9.25 rounded-[20px] border-3 border-${btnColor} ${isSelected && `bg-${btnColor}`} flex justify-center items-center font-poppins text-card-description outline-none md:w-27 text-[14px]`}
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  );
}
