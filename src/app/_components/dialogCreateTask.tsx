"use client";

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import Modal from "@mui/material/Modal";
import React from "react";
import { useState } from "react";
import { ActionButton } from "./ActionButton";
import { CustomTextField } from "./CustomTextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { PriorityButton } from "./PriorityButton";
import { Id, Task } from "@/types";
import dayjs from "dayjs";
import { useKanBanContext } from "@/context/kanBanContext";

type DialogCreateTaskCardProps = {
  children: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleOpen: () => void;
  handleClose: () => void;
  columnId: Id;
};

export default function DialogCreateTaskCard({
  children,
  handleOpen,
  handleClose,
  open,
  setOpen,
  columnId,
}: DialogCreateTaskCardProps) {
  const [formData, setFormData] = useState<Omit<Task, "id">>({
    title: "",
    description: "",
    date: dayjs().format("DD/MM/YYYY"),
    priority: "ALTA" as Task["priority"],
    columnId,
  });
  const [selectedPriority, setSelectedPriority] = useState<Task["priority"]>("ALTA");
  const { tasks, setTasks } = useKanBanContext();

  function createTask(task: Omit<Task, "id">) {
    const newTask: Task = {
      id: Date.now(),
      ...task,
    };

    setTasks([...tasks, newTask]);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    createTask({
      ...formData,
      columnId,
    });

    setFormData({
      title: "",
      description: "",
      date: dayjs().format("DD/MM/YYYY"),
      priority: "ALTA",
      columnId,
    });
    setSelectedPriority("ALTA");

    handleClose();
  };

  return (
    <React.Fragment>
      {children}
      <Dialog
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            className: "!bg-card-bg [&_*]:!text-white !h-[530px] !w-[375px] !p-6 !m-[22px]",
          },
        }}
      >
        <h1 className="text-[26px] font-semibold mb-4 font-poppins text-ui-text">Novo TaskCard</h1>
        <DialogContent className="p-0!">
          <form onSubmit={handleSubmit} id="task-form" className="h-auto flex flex-col gap-4">
            <CustomTextField
              height="!h-13"
              label="Título da Tarefa"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
            <CustomTextField
              value={formData.description ?? ""}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              multiline
              rows={3}
              height="!h-22"
              label="Descrição"
            />
            <DatePicker
              slotProps={{
                layout: {
                  className: "!bg-card-bg [&_*]:!text-white",
                },
              }}
              onChange={(newValue) => setFormData({ ...formData, date: newValue ? newValue.format("DD/MM/YYYY") : "" })}
              label="Basic date picker"
              defaultValue={dayjs()}
              value={formData.date ? dayjs(formData.date, "DD/MM/YYYY") : null}
              format="DD/MM/YYYY"
              views={["day", "month", "year"]}
            />
            <div>
              <p className="mb-4">Priority</p>
              <div className="flex gap-4">
                <PriorityButton
                  label="ALTA"
                  onClick={() => {
                    setFormData({ ...formData, priority: "ALTA" });
                    setSelectedPriority("ALTA");
                  }}
                  isSelected={selectedPriority === "ALTA"}
                />
                <PriorityButton
                  label="MÉDIA"
                  onClick={() => {
                    setFormData({ ...formData, priority: "MÉDIA" });
                    setSelectedPriority("MÉDIA");
                  }}
                  isSelected={selectedPriority === "MÉDIA"}
                />
                <PriorityButton
                  label="BAIXA"
                  onClick={() => {
                    setFormData({ ...formData, priority: "BAIXA" });
                    setSelectedPriority("BAIXA");
                  }}
                  isSelected={selectedPriority === "BAIXA"}
                />
              </div>
            </div>
          </form>
        </DialogContent>
        <DialogActions className="flex gap-3.75">
          <ActionButton label="CANCELAR" onClick={handleClose} bgColor="red" />
          <ActionButton type="submit" form="task-form" bgColor="gray" label="CRIAR" />
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
