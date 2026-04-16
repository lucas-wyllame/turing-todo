"use client";
import { Column, Id, Task } from "@/types";
import { ClockIcon, PlusCircleIcon, TrashIcon } from "@phosphor-icons/react";
import { Card } from "./card";
import { useDroppable } from "@dnd-kit/react";
import { useSortable } from "@dnd-kit/react/sortable";
import { useState } from "react";
import DialogCreateCard from "./dialogCreateTask";

type ColumnContainerProps = {
  column: Column;
  deleteColumn: (id: Id) => void;
  isDropped?: boolean;
  isntOverlay?: boolean;
  index: number;
  updateColumnTitle?: (id: Id, title: string) => void;
  onCreateTask: (task: Omit<Task, "id">) => void;
  deleteTask: (id: Id) => void;
  tasks?: Task[];
};

export function ColumnContainer({
  column,
  deleteColumn,
  isDropped,
  index,
  isntOverlay = false,
  updateColumnTitle,
  onCreateTask,
  tasks,
  deleteTask,
}: ColumnContainerProps) {
  // const { ref } = useDroppable({ id: column.id });
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = useState(false);

  const sortable = useSortable({
    id: column.id,
    index,
    data: {
      type: "column",
      column,
    },
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div
      ref={sortable.ref}
      id="droppable"
      className={`w-75 flex flex-col justify-between bg-column-bg min-h-150 rounded-lg p-4 min-w-82.5 md:min-w-112.5 ${isntOverlay && sortable.isDragging ? "opacity-50" : "opacity-100"} ${sortable.isDragging ? "dragging" : undefined}`}
    >
      <div className="">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3" onClick={() => setEditMode(true)}>
            <div className="flex justify-center rounded-full items-center bg-black px-2 py-1 text-sm">0</div>
            {editMode ? (
              <input
                value={column.title}
                onChange={(e) => updateColumnTitle?.(column.id, e.target.value)}
                autoFocus
                onBlur={() => setEditMode(false)}
                onKeyDown={(e) => {
                  if (e.key !== "Enter") return;
                  setEditMode(false);
                }}
              />
            ) : (
              <h1 className="font-poppins text-ui-text">{column.title}</h1>
            )}
          </div>
          <button onClick={() => deleteColumn(column.id)} className="cursor-pointer">
            <TrashIcon size={24} />
          </button>
        </div>
        <div className="flex flex-col gap-6 max-w-full">
          {!isDropped &&
            tasks?.map((task) => {
              return <Card key={task.id} task={task} deleteTask={deleteTask} />;
            })}
        </div>
      </div>

      <DialogCreateCard
        handleOpen={handleOpen}
        handleClose={handleClose}
        open={open}
        setOpen={setOpen}
        columnId={column.id}
        onCreateTask={onCreateTask}
      >
        <div
          onClick={() => {
            // createTask(column.id);
            handleOpen();
          }}
          className="mt-10 h-15 w-auto cursor-pointer rounded-lg bg-main-bg border-2 border-gray-900 p-4 ring-rose-500 hover:ring-2 flex gap-2 items-center font-poppins"
        >
          <PlusCircleIcon size={32} />
          Criar Tarefa
        </div>
      </DialogCreateCard>
    </div>
  );
}
