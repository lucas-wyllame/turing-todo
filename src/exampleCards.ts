import { Task } from "./types";

export const defaultColumns = [
  { id: "todo", title: "To Do" },
  { id: "doing", title: "Doing" },
  { id: "qa", title: "QA" },
  { id: "done", title: "Done" },
];

export const defaultTasks = [
  {
    id: 1,
    title: "Testar Navegadores",
    description: "Verificar compatibilidade em diferentes navegadores.",
    columnId: "todo",
    date: "16/04/2025",
    priority: "ALTA",
  },
  {
    id: 2,
    title: "Atualizar Bibliotecas",
    description: "Manter libs atualizadas por segurança.",
    columnId: "todo",
    date: "25/04/2026",
    priority: "BAIXA",
  },
  {
    id: 3,
    title: "Implementar Animações",
    description: "Melhorar UX com transições.",
    columnId: "todo",
    date: "25/04/2026",
    priority: "MÉDIA",
  },
  {
    id: 4,
    title: "Refatorar Componentes",
    description: "Melhorar organização do código.",
    columnId: "doing",
    date: "10/04/2026",
    priority: "MÉDIA",
  },
  {
    id: 5,
    title: "Testes QA",
    description: "Validar funcionalidades principais.",
    columnId: "qa",
    date: "15/04/2026",
    priority: "ALTA",
  },
  {
    id: 6,
    title: "Deploy Final",
    description: "Publicar versão final.",
    columnId: "done",
    date: "25/08/2026",
    priority: "BAIXA",
  },
];
