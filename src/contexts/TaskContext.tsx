"use client";

import { type ReactNode, createContext, useContext, useState } from "react";
import { useEditing } from "~/contexts/EditingContext";
import { type ClientTask } from "~/lib/types";
import { api } from "~/trpc/react";

type Action =
  | { type: "new-task" }
  | { type: "create"; value: { title: string; createdAt: Date } }
  | { type: "edit-title"; taskId: number; value: string }
  | { type: "edit-description"; taskId: number; value: string }
  | { type: "edit-blocked"; taskId: number; value: boolean }
  | { type: "edit-important"; taskId: number; value: boolean | undefined }
  | { type: "edit-urgent"; taskId: number; value: boolean | undefined }
  | { type: "edit-done"; taskId: number; value: boolean }
  | { type: "delete-task"; taskId: number };

export const NEW_TASK_ID = -1;

type TaskContextType = {
  dispatch: (action: Action) => void;
  tasks: ClientTask[];
  // This is used to keep track of the task that is currently focused
  focusedTaskId?: number;
  setFocusedTaskId: (taskId?: number) => void;
  // This is used when the context wants to target a task for focus
  targetTaskId?: number;
  setTargetTaskId: (taskId?: number) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [taskData] = api.todo.get.useSuspenseQuery();
  const [tasks, setTasks] = useState(taskData);
  const [focusedTaskId, setFocusedTaskId] = useState<number | undefined>(
    undefined,
  );
  const [targetTaskId, setTargetTaskId] = useState<number | undefined>(
    undefined,
  );
  const { setEditingState } = useEditing();

  const createTask = api.todo.create.useMutation({
    onSuccess: (id, variables) => {
      // Update the task with the new id
      setTasks(
        tasks.map((task) =>
          task.createdAt === variables.createdAt ? { ...task, id } : task,
        ),
      );
    },
  });
  const setTitle = api.todo.setTitle.useMutation();
  const setDescription = api.todo.setDescription.useMutation();
  const setIsBlocked = api.todo.setIsBlocked.useMutation();
  const setIsImportant = api.todo.setIsImportant.useMutation();
  const setIsUrgent = api.todo.setIsUrgent.useMutation();
  const setIsDone = api.todo.setIsDone.useMutation();
  const deleteTask = api.todo.delete.useMutation();
  const dispatch = (action: Action) => {
    switch (action.type) {
      case "new-task":
        setTasks([
          ...tasks,
          {
            createdAt: new Date(),
            description: undefined,
            id: NEW_TASK_ID,
            isBlocked: false,
            isDone: false,
            isImportant: undefined,
            isUrgent: undefined,
            title: "",
          },
        ]);
        break;
      case "create":
        setTasks(
          tasks.map((task) =>
            task.createdAt === action.value.createdAt
              ? { ...task, title: action.value.title }
              : task,
          ),
        );
        setEditingState(undefined);
        createTask.mutate({
          createdAt: action.value.createdAt,
          title: action.value.title,
        });
        break;
      case "edit-title":
        setTitle.mutate({ id: action.taskId, title: action.value });
        setTasks(
          tasks.map((task) =>
            task.id === action.taskId ? { ...task, title: action.value } : task,
          ),
        );
        setEditingState(undefined);
        break;
      case "edit-description":
        setDescription.mutate({ id: action.taskId, description: action.value });
        setTasks(
          tasks.map((task) =>
            task.id === action.taskId
              ? { ...task, description: action.value }
              : task,
          ),
        );
        setEditingState(undefined);
        break;
      case "edit-blocked":
        setIsBlocked.mutate({ id: action.taskId, isBlocked: action.value });
        setTasks(
          tasks.map((task) =>
            task.id === action.taskId
              ? { ...task, isBlocked: action.value }
              : task,
          ),
        );
        break;
      case "edit-important":
        setIsImportant.mutate({ id: action.taskId, isImportant: action.value });
        setTasks(
          tasks.map((task) =>
            task.id === action.taskId
              ? { ...task, isImportant: action.value }
              : task,
          ),
        );
        break;
      case "edit-urgent":
        setIsUrgent.mutate({ id: action.taskId, isUrgent: action.value });
        setTasks(
          tasks.map((task) =>
            task.id === action.taskId
              ? { ...task, isUrgent: action.value }
              : task,
          ),
        );
        break;
      case "edit-done":
        setIsDone.mutate({ id: action.taskId, isDone: action.value });
        setTasks(
          tasks.map((task) =>
            task.id === action.taskId
              ? { ...task, isDone: action.value }
              : task,
          ),
        );
        break;
      case "delete-task":
        deleteTask.mutate({ id: action.taskId });
        // Get the ID of the task after the deleted task
        const deletedIndex = tasks.findIndex(
          (task) => task.id === action.taskId,
        );
        const nextIndex =
          deletedIndex === tasks.length - 1
            ? deletedIndex - 1
            : deletedIndex + 1;
        const nextTaskId = tasks[nextIndex]?.id;
        setTasks(tasks.filter((task) => task.id !== action.taskId));
        if (!nextTaskId) console.warn("No next task found");
        setTargetTaskId(nextTaskId);
        break;
      default:
        throw new Error("Invalid action");
    }
  };
  return (
    <TaskContext.Provider
      value={{
        dispatch,
        focusedTaskId,
        setFocusedTaskId,
        setTargetTaskId,
        targetTaskId,
        tasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
}
