"use client";

import { Id, Task } from "@/types";
import { useDraggable } from "@dnd-kit/react";
import { ClockIcon, TrashIcon } from "@phosphor-icons/react";
import DialogCreateCard from "./dialogCreateTask";

type CardProps = {
  task: Task;
  deleteTask: (id: Id) => void;
};

export function Card({ task, deleteTask }: CardProps) {
  const { ref } = useDraggable({ id: "draggable" });

  const priorityColors = {
    ALTA: "priority-bgRed",
    MÉDIA: "priority-bgYellow",
    BAIXA: "priority-bgGreen",
  };

  return (
    <div className="bg-card-bg p-4 rounded-lg w-full">
      <h1 className="text-xl font-poppins text-card-title wrap-break-word">{task.title}</h1>
      <h2 className="text-base mt-4 mb-5 wrap-break-word">{task.description}</h2>
      <div className="flex justify-between items-center">
        <div className="text-sm h-8.75 bg-[#1F1F1F] rounded-full flex gap-1 items-center py-5 px-6">
          <ClockIcon size={24} />
          <h3>{task.date}</h3>
        </div>
        <div className={`bg-${priorityColors[task.priority]}  rounded-xl flex justify-center items-center px-4 h-7 w-max`}>
          <h3 className="text-black text-xs font-bold w-max">{task.priority}</h3>
        </div>
        <button onClick={() => deleteTask(task.id)} className="cursor-pointer">
          <TrashIcon size={24} />
        </button>
      </div>
    </div>
  );
}
