"use client";

import { inferProcedureOutput } from "@trpc/server";
import { createContext, useContext, ReactNode, useState } from "react";
import { AppRouter } from "~/server/api/root";
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

export type EditingState = {
  target: "title" | "description";
  taskCreatedAtTimestamp: string;
};

// Define the context type
type EditingContextType = {
  editingState?: EditingState;
  setEditingState: (state?: EditingState) => void;
  dispatch: (action: Action) => void;
  tasks: inferProcedureOutput<AppRouter["todo"]["get"]>;
  focusedTaskId?: number;
  // setFocusedTaskId: (id?: number) => void;
};

// Create context with a default value
const EditingContext = createContext<EditingContextType | undefined>(undefined);

export const NEW_TASK_ID = -1 as const;

// Create provider component
export function EditingProvider({ children }: { children: ReactNode }) {
  const [taskData, taskQuery] = api.todo.get.useSuspenseQuery();
  const [tasks, setTasks] = useState(taskData);
  const [editingState, setEditingState] = useState<EditingState | undefined>(
    undefined,
  );
  const [focusedTaskId, setFocusedTaskId] = useState<number | undefined>(
    undefined,
  );
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
        setFocusedTaskId(nextTaskId);
        break;
      default:
        throw new Error("Invalid action");
    }
  };
  return (
    <EditingContext.Provider
      value={{
        editingState,
        setEditingState,
        tasks,
        dispatch,
        focusedTaskId,
      }}
    >
      {children}
    </EditingContext.Provider>
  );
}

// Create custom hook for using this context
export function useEditing() {
  const context = useContext(EditingContext);
  if (context === undefined) {
    throw new Error("useEditing must be used within a EditingProvider");
  }
  return context;
}
