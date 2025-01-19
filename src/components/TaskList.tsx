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
      className="mx-2 mt-18 flex h-full w-[calc(100%-1rem)] flex-col items-center border-2 border-grass-3 px-3 py-6 md:mx-20 md:w-[calc(100%-10rem)] md:px-6 md:py-6"
      tabIndex={0}
      ref={listRef}
      onKeyDown={handleKeyDown}
    >
      <div className="flex w-full flex-col items-center justify-center gap-2 md:w-5/6 xl:w-1/2">
        {tasks.map((task) => (
          // Use createdAt as the key to avoid losing focus when a new task is created
          <Task key={task.createdAt.toISOString()} {...task} />
        ))}
      </div>
    </div>
  );
};
