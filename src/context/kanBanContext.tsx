import { defaultColumns, defaultTasks } from "@/exampleCards";
import { Column, Task } from "@/types";
import React, { PropsWithChildren, createContext, useState, useContext } from "react";

interface KanBanContextData {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  columns: Column[];
  setColumns: React.Dispatch<React.SetStateAction<Column[]>>;
}

const KanBanContext = createContext({} as KanBanContextData);

export const KanBanContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(defaultTasks as Task[]);
  const [columns, setColumns] = useState<Column[]>(defaultColumns);

  return (
    <KanBanContext.Provider
      value={{
        tasks,
        setTasks,
        columns,
        setColumns,
      }}
    >
      {children}
    </KanBanContext.Provider>
  );
};

export function useKanBanContext() {
  const context = useContext(KanBanContext);

  if (!context) {
    throw new Error("useStyle must be used within an KanBanContextProvider");
  }

  return context;
}
