import { defaultTasks } from "@/exampleCards";
import { Task } from "@/types";
import React, { PropsWithChildren, createContext, useState, useContext } from "react";

interface TasksContextData {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TasksContext = createContext({} as TasksContextData);

export const TasksContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(defaultTasks as Task[]);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        setTasks,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export function useTasksContext() {
  const context = useContext(TasksContext);

  if (!context) {
    throw new Error("useStyle must be used within an TasksContextProvider");
  }

  return context;
}
