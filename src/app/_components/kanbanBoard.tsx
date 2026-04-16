"use client";

import { Column, Id, Task } from "@/types";
import { PlusCircleIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { ColumnContainer } from "./columnContainer";
import { DropProps } from "./context";
import { DragDropManager, DragDropProvider, DragOverlay } from "@dnd-kit/react";
import { createPortal } from "react-dom";
import { useTasksContext } from "@/context/tasksContext";

export function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>([]);
  const [isDropped, setIsDropped] = useState(false);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const { tasks, setTasks } = useTasksContext();

  function createNewColumn() {
    const newColumn: Column = {
      id: Date.now(),
      title: `Column ${columns.length + 1}`,
    };

    setColumns([...columns, newColumn]);
  }

  function deleteColumn(id: Id) {
    const filteredColumn = columns.filter((column) => column.id !== id);

    setColumns(filteredColumn);
  }

  function updateColumnTitle(id: Id, title: string) {
    const newColumns = columns.map((col) => {
      if (col.id === id) {
        return { ...col, title };
      }
      return col;
    });
    setColumns(newColumns);
  }

  function createTask(task: Omit<Task, "id">) {
    const newTask: Task = {
      id: Date.now(),
      ...task,
    };

    setTasks([...tasks, newTask]);
  }

  function deleteTask(id: Id) {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  }

  console.log(columns);

  return (
    <>
      <div
        onClick={() => createNewColumn()}
        className="h-15 w-82.5 min-w-82.5 cursor-pointer rounded-lg bg-main-bg border-2 border-gray-900 p-4 ring-rose-500 hover:ring-2 flex gap-2 items-center font-poppins"
      >
        <PlusCircleIcon size={32} />
        Adicionar Coluna
      </div>
      <DragDropProvider
        onDragStart={(event, manager) => {
          const { operation } = event;
          console.log(`Started dragging ${operation.source?.id}`);
          console.log("Source data:  start", event.operation.source?.data);
          if (event.operation.source?.data.type === "column") {
            setActiveColumn(event.operation.source?.data.column);
            console.log("activeColumn", activeColumn);

            return;
          }
        }}
        onDragEnd={(event, manager) => {
          const { operation, canceled } = event;
          const { source, target } = operation;
          if (canceled) {
            console.log(`Cancelled dragging ${source?.id}`);

            return;
          }

          if (target) {
            console.log(`Dropped ${source?.id} over ${target.id}`);
            console.log(`Source data:`, source?.data);
            console.log(`Drop position`, operation.position.current);
          }

          setIsDropped(target?.id === "droppable");
        }}
      >
        <div className="m-auto flex gap-10">
          {columns.map((column, index) => {
            return (
              <ColumnContainer
                isntOverlay
                isDropped={isDropped}
                key={column.id}
                deleteColumn={deleteColumn}
                column={column}
                index={index}
                updateColumnTitle={updateColumnTitle}
                onCreateTask={createTask}
                deleteTask={deleteTask}
                tasks={tasks.filter((task) => task.columnId === column.id)}
              />
            );
          })}
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                isDropped={isDropped}
                deleteColumn={deleteColumn}
                column={activeColumn}
                onCreateTask={createTask}
                deleteTask={deleteTask}
                index={0}
                tasks={tasks.filter((task) => task.columnId === activeColumn.id)}
              />
            )}
          </DragOverlay>
        </div>
      </DragDropProvider>
    </>
  );
}
