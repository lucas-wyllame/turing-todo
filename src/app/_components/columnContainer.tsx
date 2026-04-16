"use client";
import { Column, Id, Task } from "@/types";
import { ClockIcon, PlusCircleIcon, TrashIcon } from "@phosphor-icons/react";
import { useDroppable } from "@dnd-kit/react";
import { useSortable } from "@dnd-kit/react/sortable";
import { useState } from "react";
import DialogCreateTaskCard from "./dialogCreateTask";
import { useTasksContext } from "@/context/tasksContext";
import { DeleteButton } from "./DeleteButton";
import { TaskCard } from "./taskCard";
import { CollisionPriority } from "@dnd-kit/abstract";

type ColumnContainerProps = {
  column: Column;
  deleteColumn: (id: Id) => void;
  isDropped?: boolean;
  isntOverlay?: boolean;
  index: number;
  updateColumnTitle?: (id: Id, title: string) => void;
  columnsLength: number;
};

export function ColumnContainer({
  column,
  deleteColumn,
  isDropped,
  index,
  isntOverlay = false,
  updateColumnTitle,
  columnsLength,
}: ColumnContainerProps) {
  // const { ref } = useDroppable({ id: column.id });
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = useState(false);
  const { tasks, setTasks } = useTasksContext();

  // const sortable = useSortable({
  //   id: column.id,
  //   index,
  //   data: {
  //     type: "column",
  //     column,
  //   },
  //   disabled: columnsLength === 1,
  // });

  const droppable = useDroppable({
    id: column.id,
    type: "column",
    data: {
      type: "column",
    },
    accept: "task",
    collisionPriority: CollisionPriority.Low,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function deleteTask(id: Id) {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  }

  const filteredTasks = tasks.filter((task) => task.columnId === column.id);

  const taskLength = filteredTasks.length;

  return (
    <div
      // ref={sortable.ref}
      ref={droppable.ref}
      className={`w-75 flex flex-col justify-between bg-column-bg min-h-150 rounded-lg p-4 min-w-82.5 md:min-w-112.5 overflow-y-scroll`}
    >
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3" onClick={() => setEditMode(true)}>
            <div className="flex justify-center rounded-full items-center bg-black px-2 py-1 text-sm">{taskLength}</div>
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
          <DeleteButton onDelete={() => deleteColumn(column.id)} />
        </div>
        <div className="flex flex-col gap-6 max-w-full">
          {filteredTasks?.map((task, index) => {
            return <TaskCard key={task.id} task={task} deleteTask={deleteTask} index={index} column={column} isntOverlay />;
          })}
        </div>
      </div>

      <DialogCreateTaskCard handleOpen={handleOpen} handleClose={handleClose} open={open} setOpen={setOpen} columnId={column.id}>
        <div
          onClick={() => {
            handleOpen();
          }}
          className="mt-10 h-15 w-auto cursor-pointer rounded-lg bg-main-bg border-2 border-gray-900 p-4 ring-rose-500 hover:ring-2 flex gap-2 items-center font-poppins"
        >
          <PlusCircleIcon size={32} />
          Criar Tarefa
        </div>
      </DialogCreateTaskCard>
    </div>
  );
}
