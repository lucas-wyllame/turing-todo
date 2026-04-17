# KanbanTuring – Lista de Tarefas

O KanbanTuring é um app WEB de listagens de tarefas num sistema de kanban, desenvolvida em Next.js com Typescript, tailwind, material-ui e dnd-kit/react, voltada para organização de task.
O sistema permite a movimentação e reodernação de tasks entre colunas, criação de novas colunas e tasks, as taks tem propriedas para informar titulo, descrição, prioridade e data. Este README documenta arquitetura, setup local com Docker, variáveis de ambiente, autenticação unificada, endpoints (com cURLs), dashboards, exportação, pipeline e um roteiro de testes manuais, além de troubleshooting.

---

## Sumário

1. Dependencias
2. Estrutura do Projeto
3. Configuração e Deploy
4. Modelos Principais

---

## 1. Dependencias

| Componente | Versão (ref.) | Função |
|-----------|----------------|--------|
| Next.js | 16.2.3 | Framework |
| Typescript | ^5 | Superset |
| dayjs | ^1.11.20 | Library |
| dnd-kit | ^0.3.2 | Library |
| phosphor-icons | ^2.1.10 | Library |
| mui/material | ^9.0.0 | Library |
| tailwindcss | ^4.2.2 | Framework Css |

---

## 2. Estrutura do Projeto

```
src/
├── app/
│   ├── _components/
│   │   ├── ActionButton/
│   │   │   └── index.tsx
│   │   ├── CustomTextField/
│   │   │   └── index.tsx
│   │   ├── DeleteButton/
│   │   │   └── index.tsx
│   │   ├── PriorityButton/
│   │   │   └── index.tsx
│   │   ├── columnContainer.tsx
│   │   ├── context.tsx
│   │   ├── dialogCreateTask.tsx
│   │   ├── kanbanBoard.tsx
│   │   └── taskCard.tsx
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.module.css
│   └── page.tsx
├── context/
│   └── kanBanContext.tsx
├── icons/
├── exampleCards.ts
└── types.ts
```

---

## 3. Configuração e Deploy

### 3.1 Clonar (Local)

```bash
git clone https://github.com/lucas-wyllame/turing-todo.git
npm run dev
```

Porta: `http://localhost:3000`

### 3.2 Acessar

Link do vercel: `https://turing-todo.vercel.app`  

---

## 4. Modelos Principais

### 4.1 Column

```json
{
  "id": "Date.now()",
  "title": "Column ${columns.length + 1}",
}
```

### 4.2 Task

```json
{
  "id": "Date.now()",
  "title": "Texto Obrigatorio",
  "description": "",
  "priority": "ALTA" | "MÉDIA" | "BAIXA",
  "description": "Texto opcional"
}
```

Mantenedor: Dream Bricks  
Repositório: <https://github.com/DreamBricksOrg/logcenter>
