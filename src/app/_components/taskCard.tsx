"use client";

import { Column, Id, Task } from "@/types";
import { ClockIcon, DotsSixIcon, DotsThreeIcon, TrashIcon } from "@phosphor-icons/react";
import DialogCreateTaskCard from "./dialogCreateTask";
import { DeleteButton } from "./DeleteButton";
import { useState } from "react";
import { useSortable } from "@dnd-kit/react/sortable";
import { CollisionPriority } from "@dnd-kit/abstract";
import { Drawer } from "@mui/material";
import { useKanBanContext } from "@/context/kanBanContext";

type TaskCardProps = {
  task: Task;
  deleteTask: (id: Id) => void;
  index: number;
  column: Column;
  isntOverlay?: boolean;
  moveTaskToColumn: (taskId: Id, columnId: Id) => void;
};

export function TaskCard({ task, deleteTask, index, column, isntOverlay = false, moveTaskToColumn }: TaskCardProps) {
  const [editMode, setEditMode] = useState(false);
  const { tasks, setTasks, columns } = useKanBanContext();
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const priorityColors = {
    ALTA: "priority-bgRed",
    MÉDIA: "priority-bgYellow",
    BAIXA: "priority-bgGreen",
  };

  const sortable = useSortable({
    id: task.id,
    index,
    type: "task",
    data: {
      type: "task",
      task,
    },
    collisionPriority: CollisionPriority.High,
  });

  const updateTaskContent = (id: Id, title?: string, description?: string) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, title: title ?? task.title, description: description ?? task.description };
      }
      return task;
    });
    setTasks(newTasks);
  };

  function parseBRDate(dateString: string) {
    const [day, month, year] = dateString.split("/").map(Number);
    return new Date(year, month - 1, day);
  }

  function getDaysRemaining(date: string) {
    const today = new Date();
    const dueDate = parseBRDate(date);

    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);

    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  }

  return (
    <div
      className={`relative bg-card-bg p-4 rounded-lg w-full ${isntOverlay && sortable.isDragging ? "opacity-50" : "opacity-100"}`}
      ref={sortable.ref}
    >
      {getDaysRemaining(task.date) < 5 && <div className="absolute left-0 top-0 h-full w-1 bg-red-500 rounded-l-lg" />}
      {editMode ? (
        <input
          value={task.title}
          onChange={(e) => updateTaskContent(task.id, e.target.value)}
          autoFocus
          onBlur={() => setEditMode(false)}
          onKeyDown={(e) => {
            if (e.key !== "Enter") return;
            setEditMode(false);
          }}
        />
      ) : (
        <h1 onClick={() => setEditMode(true)} className="text-xl font-poppins text-card-title wrap-break-word">
          {task.title}
        </h1>
      )}
      <h2 className="text-base mt-4 mb-5 wrap-break-word">{task.description}</h2>
      <div className="flex justify-between items-center relative">
        <div className="text-sm h-8.75 bg-[#1F1F1F] rounded-full flex gap-1 items-center py-5 px-6">
          <ClockIcon size={24} />
          <h3>{task.date}</h3>
        </div>
        <div
          className={`bg-${priorityColors[task.priority]} rounded-xl flex justify-center items-center px-6 h-10 w-max md:px-10`}
        >
          <h3 className="text-black text-xs font-bold w-max">{task.priority}</h3>
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <DeleteButton onDelete={() => deleteTask(task.id)} />
        <DotsSixIcon
          className="cursor-pointer"
          size={32}
          onClick={() => {
            setOpen(true);
            setSelectedTask(task);
          }}
        />
      </div>
      <Drawer
        anchor="bottom"
        open={open}
        onClose={() => setOpen(false)}
        slotProps={{
          root: {
            className:
              "[&_div]:bg-card-bg [&_*]:!text-white [&_div]:flex [&_div]:justify-center [&_div]:items-center [&_div]:w-full",
          },
        }}
      >
        <div className="p-6 flex flex-col gap-4">
          <h2>Mover para:</h2>

          {columns
            .filter((col) => col.id !== task.columnId)
            .map((col) => (
              <div
                className="bg-main-bg! p-4 rounded-xl"
                key={col.id}
                onClick={() => {
                  if (selectedTask) {
                    moveTaskToColumn(selectedTask.id, col.id);
                    setOpen(false);
                  }
                }}
              >
                {col.title}
              </div>
            ))}
        </div>
      </Drawer>
    </div>
  );
}
