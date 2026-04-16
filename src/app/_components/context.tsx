"use client";

import { DragDropProvider } from "@dnd-kit/react";
import { KanbanBoard } from "./kanbanBoard";
import { useState } from "react";
import { TasksContextProvider } from "@/context/tasksContext";

export type DropProps = {
  isDropped: boolean;
};

export function HomeContent() {
  return (
    <>
      <div className="flex bg-linear-to-r from-turing-purple to-turing-blue w-screen h-22 justify items-center justify-end px-10" />
      <main className="flex flex-col gap-5 container mx-auto px-4 py-8 overflow-x-auto">
        <TasksContextProvider>
          <KanbanBoard />
        </TasksContextProvider>
      </main>
    </>
  );
}
