import { ButtonHTMLAttributes } from "react";

export type ActionButtonProps = {
  onClick?: () => void;
  bgColor: "red" | "gray";
  label: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function ActionButton({ onClick, bgColor, label, ...props }: ActionButtonProps) {
  const type = props.type || "button";

  return (
    <button
      type={type}
      className={`ring-rose-500 hover:ring-2 cursor-pointer w-[50%] h-9.25 rounded-[20px] ${bgColor === "red" ? "bg-priority-bgRed" : "bg-main-bg"} flex justify-center items-center font-poppins text-ui-text outline-none md:w-27 text-[14px] font-bold`}
      onClick={onClick}
      {...props}
    >
      {label}
    </button>
  );
}
