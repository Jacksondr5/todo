"use client";

import { Task } from "./Task";
import { useEffect, useRef } from "react";
import { useEditing } from "../contexts/EditingContext";
import { useTasks } from "~/contexts/TaskContext";

export const TaskList = () => {
  const listRef = useRef<HTMLDivElement>(null);
  const { editingState, setEditingState } = useEditing();
  const { dispatch, tasks } = useTasks();

  // Focus the list when it mounts
  useEffect(() => {
    listRef.current?.focus();
  }, [listRef]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (editingState) {
      return;
    }

    if (e.key === "a") {
      dispatch({ type: "new-task" });
    }
    if (e.key === "c") {
      setEditingState(undefined);
    }
  };

  return (
    <div
      className="mx-20 mt-18 flex w-full flex-col items-center border-2 border-grass-3 p-6"
      tabIndex={0}
      ref={listRef}
      onKeyDown={handleKeyDown}
    >
      <div className="flex w-5/6 flex-col items-center justify-center gap-2 xl:w-1/2">
        {tasks.map((task) => (
          // Use createdAt as the key to avoid losing focus when a new task is created
          <Task key={task.createdAt.toISOString()} {...task} />
        ))}
      </div>
    </div>
  );
};
