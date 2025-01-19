"use client";

import { useEditing } from "~/contexts/EditingContext";
import { useTasks } from "~/contexts/TaskContext";
import { cn } from "~/lib/utils";
import { Urgent } from "./svg/Urgent";
import { Important } from "./svg/Important";
import { Status } from "./svg/Status";
import { Delete } from "./svg/Delete";
import { EditTitle } from "./svg/EditTitle";
import { EditDescription } from "./svg/EditDescription";
import { Add } from "./svg/Add";

export const MobileBar = () => {
  const { editingState } = useEditing();
  const { focusedTaskId, dispatch, tasks } = useTasks();
  console.log(focusedTaskId);
  const focusedTask = tasks.find((task) => task.id === focusedTaskId);
  return (
    <div
      className={cn(
        "fixed right-0 bottom-0 left-0 h-16 border-t border-olive-6 bg-olive-2 md:hidden",
        editingState && "hidden",
      )}
    >
      {focusedTask && (
        <div className="mx-2 flex h-full items-center justify-center gap-1">
          <Add onClick={() => console.log("add")} />
          <Urgent
            onClick={() =>
              dispatch({
                type: "edit-urgent",
                taskId: focusedTask.id,
                value: !focusedTask.isUrgent,
              })
            }
            isUrgent={focusedTask.isUrgent}
          />
          <Important
            onClick={() =>
              dispatch({
                type: "edit-important",
                taskId: focusedTask.id,
                value: !focusedTask.isImportant,
              })
            }
            isImportant={focusedTask.isImportant}
          />
          <Status
            status={
              focusedTask.isBlocked
                ? "blocked"
                : focusedTask.isDone
                  ? "done"
                  : "in-progress"
            }
            onClick={() => console.log("status")}
          />
          <Delete onClick={() => console.log("delete")} />
          <EditTitle onClick={() => console.log("edit")} />
          <EditDescription onClick={() => console.log("edit")} />
        </div>
      )}
    </div>
  );
};
