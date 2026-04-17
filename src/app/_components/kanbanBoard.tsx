"use client";

import { Column, Id, Task } from "@/types";
import { PlusCircleIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { ColumnContainer } from "./columnContainer";
import { DragDropProvider, DragOverlay } from "@dnd-kit/react";
import { isSortable } from "@dnd-kit/react/sortable";
import { DragOperation, Data } from "@dnd-kit/abstract";
import { Draggable, Droppable } from "@dnd-kit/dom";
import { TaskCard } from "./taskCard";
import { defaultColumns } from "@/exampleCards";
import { useKanBanContext } from "@/context/kanBanContext";

export function KanbanBoard() {
  // const [columns, setColumns] = useState<Column[]>(defaultColumns);
  const [isDropped, setIsDropped] = useState(false);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const { tasks, setTasks, columns, setColumns } = useKanBanContext();
  const [columnOrder, setColumnOrder] = useState(() => Object.keys(tasks));

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

  console.log(columns);

  function moveTask(sourceId: Id, targetId: Id) {
    setTasks((prev) => {
      const sourceIndex = prev.findIndex((task) => task.id === sourceId);
      const targetIndex = prev.findIndex((task) => task.id === targetId);

      if (sourceIndex === -1 || targetIndex === -1) return prev;

      const sourceTask = prev[sourceIndex];
      const targetTask = prev[targetIndex];

      const updated = [...prev];

      // muda coluna se necessário
      updated[sourceIndex] = {
        ...sourceTask,
        columnId: targetTask.columnId,
      };

      // reorder
      const [removed] = updated.splice(sourceIndex, 1);
      updated.splice(targetIndex, 0, removed);

      return updated;
    });
  }

  function moveTaskToColumn(taskId: Id, columnId: Id) {
    setTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, columnId } : task)));
  }

  // const addItemToSection = (id: number, buttonName?: string) => {
  //   setTasks((prev) => {
  //     const mTasks = prev.map((card) => {
  //       if (card.id === id) {
  //         return {
  //           ...card,
  //           status:
  //             sizeScreen < 1024
  //               ? buttonName === "todo"
  //                 ? "todo"
  //                 : buttonName === "toDoing"
  //                   ? "toDoing"
  //                   : buttonName === "qA"
  //                     ? "qA"
  //                     : buttonName === "done"
  //                       ? "done"
  //                       : status
  //               : status,
  //         };
  //       }
  //       return card;
  //     });
  //     return mTasks;
  //   });
  // };

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
          if (event.operation.source?.data.type === "task") {
            setActiveTask(event.operation.source?.data.task);
            console.log("activeTask", activeTask);

            return;
          }
        }}
        onDragMove={(event) => {
          const { source, target } = event.operation;

          if (!target) return;

          // TASK → TASK
          if (source?.data?.type === "task" && target?.data?.type === "task") {
            moveTask(source.id, target.id);
            return;
          }

          // TASK → COLUMN
          if (source?.data?.type === "task" && target?.data?.type === "column") {
            moveTaskToColumn(source.id, target.id);
            return;
          }
          setActiveTask(null);
          setActiveColumn(null);
        }}
      >
        <div className="m-auto flex gap-10 h-149.5">
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
                columnsLength={columns.length}
                moveTaskToColumn={moveTaskToColumn}
              />
            );
          })}
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                isDropped={isDropped}
                deleteColumn={deleteColumn}
                column={activeColumn}
                index={0}
                columnsLength={columns.length}
                moveTaskToColumn={moveTaskToColumn}
              />
            )}
            {activeTask && (
              <TaskCard
                task={activeTask}
                deleteTask={() => {}}
                index={0}
                column={{ id: activeTask.columnId, title: "" }}
                isntOverlay={false}
                moveTaskToColumn={moveTaskToColumn}
              />
            )}
          </DragOverlay>
        </div>
      </DragDropProvider>
    </>
  );
}
