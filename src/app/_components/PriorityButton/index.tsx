"use client";

import { ButtonHTMLAttributes } from "react";

export type PriorityButtonProps = {
  onClick?: () => void;
  label: "ALTA" | "MÉDIA" | "BAIXA";
  isSelected?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const priorityColors = {
  ALTA: "border-priority-bgRed",
  MÉDIA: "border-priority-bgYellow",
  BAIXA: "border-priority-bgGreen",
};

const selectedPriorityColors = {
  ALTA: "bg-priority-bgRed",
  MÉDIA: "bg-priority-bgYellow",
  BAIXA: "bg-priority-bgGreen",
};

export function PriorityButton({ onClick, label, isSelected }: PriorityButtonProps) {
  return (
    <button
      className={`${priorityColors[label]} ${isSelected && selectedPriorityColors[label]} cursor-pointer w-[50%] h-9.25 rounded-[20px] border-3 flex justify-center items-center font-poppins text-card-description outline-none md:w-27 text-[14px]`}
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  );
}
