export type Id = string | number;
export type Priority = "BAIXA" | "MÉDIA" | "ALTA";

export type Column = {
  id: Id;
  title: string;
};

export type Task = {
  id: Id;
  columnId: Id;
  title: string;
  description?: string;
  date: string;
  priority: Priority;
};
