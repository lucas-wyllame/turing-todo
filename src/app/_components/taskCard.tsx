"use client";

import { Column, Id, Task } from "@/types";
import { ClockIcon, TrashIcon } from "@phosphor-icons/react";
import DialogCreateTaskCard from "./dialogCreateTask";
import { DeleteButton } from "./DeleteButton";
import { useState } from "react";
import { useTasksContext } from "@/context/tasksContext";
import { useSortable } from "@dnd-kit/react/sortable";

type TaskCardProps = {
  task: Task;
  deleteTask: (id: Id) => void;
  index: number;
  column: Column;
};

export function TaskCard({ task, deleteTask, index, column }: TaskCardProps) {
  const [editMode, setEditMode] = useState(false);
  const { tasks, setTasks } = useTasksContext();
  const [mouseIsOver, setMouseIsOver] = useState(false);

  const priorityColors = {
    ALTA: "priority-bgRed",
    MÉDIA: "priority-bgYellow",
    BAIXA: "priority-bgGreen",
  };

  const sortable = useSortable({
    id: task.id,
    index,
    data: {
      type: "task",
      task,
    },
    group: column.id,
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

  return (
    <div
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
      className="bg-card-bg p-4 rounded-lg w-full"
      ref={sortable.ref}
    >
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
        {mouseIsOver && (
          <div className="absolute right-1 -top-17.5 -translate-y-1/2">
            <DeleteButton onDelete={() => deleteTask(task.id)} />
          </div>
        )}
      </div>
    </div>
  );
}
