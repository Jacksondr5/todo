"use client";

import { useEffect, useRef } from "react";
import { Important } from "./svg/Important";
import { Urgent } from "./svg/Urgent";
import { TaskInput } from "./TaskInput";
import { cn } from "~/lib/utils";
import { type EditingState, useEditing } from "../contexts/EditingContext";
import { NEW_TASK_ID, useTasks } from "~/contexts/TaskContext";
import { keybindings } from "./help/KeybindingsHelp";
export type TaskProps = {
  createdAt: Date;
  description?: string;
  id: number;
  isBlocked: boolean;
  isDone: boolean;
  isImportant?: boolean;
  isUrgent?: boolean;
  title: string;
};

export const Task = ({
  createdAt,
  description,
  id,
  isBlocked,
  isDone,
  isImportant,
  isUrgent,
  title,
}: TaskProps) => {
  const { editingState, setEditingState } = useEditing();
  const { dispatch, focusedTaskId } = useTasks();

  const taskRef = useRef<HTMLLIElement>(null);
  const titleEditRef = useRef<HTMLInputElement>(null);
  const descriptionEditRef = useRef<HTMLTextAreaElement>(null);

  const handleTitleChange = (value: string) => {
    if (id === NEW_TASK_ID) {
      dispatch({ type: "create", value: { createdAt, title: value } });
    } else {
      dispatch({ type: "edit-title", taskId: id, value });
    }
    taskRef.current?.focus();
  };

  const handleDescriptionChange = (value: string) => {
    dispatch({ type: "edit-description", taskId: id, value });
    taskRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLLIElement>) => {
    if (editingState) {
      return;
    }

    // Prevent default if we handle the key
    if (/^[iedqbu]/.test(e.key)) {
      e.preventDefault();
    }

    if (e.key === keybindings.EDIT_IMPORTANCE) {
      switch (isImportant) {
        case true:
          dispatch({ type: "edit-important", taskId: id, value: false });
          break;
        case false:
          dispatch({ type: "edit-important", taskId: id, value: undefined });
          break;
        case undefined:
          dispatch({ type: "edit-important", taskId: id, value: true });
          break;
      }
    } else if (e.key === keybindings.EDIT_URGENCY) {
      switch (isUrgent) {
        case true:
          dispatch({ type: "edit-urgent", taskId: id, value: false });
          break;
        case false:
          dispatch({ type: "edit-urgent", taskId: id, value: undefined });
          break;
        case undefined:
          dispatch({ type: "edit-urgent", taskId: id, value: true });
          break;
      }
    } else if (e.key === keybindings.TOGGLE_BLOCKED) {
      dispatch({ type: "edit-blocked", taskId: id, value: !isBlocked });
    } else if (e.key === keybindings.EDIT_TITLE) {
      setEditingState({
        target: "title",
        taskCreatedAtTimestamp: createdAt.toISOString(),
      });
      titleEditRef.current?.focus();
    } else if (e.key === keybindings.EDIT_DESCRIPTION) {
      setEditingState({
        target: "description",
        taskCreatedAtTimestamp: createdAt.toISOString(),
      });
      descriptionEditRef.current?.focus();
    } else if (e.key === keybindings.TOGGLE_DONE) {
      dispatch({ type: "edit-done", taskId: id, value: !isDone });
    } else if (e.key === keybindings.DELETE_TODO) {
      dispatch({ type: "delete-task", taskId: id });
    }
  };

  useEffect(() => {
    // When a new task is created, focus the title input
    if (id === NEW_TASK_ID) {
      setEditingState({
        target: "title",
        taskCreatedAtTimestamp: createdAt.toISOString(),
      });
      titleEditRef.current?.focus();
    } else if (id === focusedTaskId) {
      taskRef.current?.focus();
    }
    // This is fine, we only need to run this when the task is created or focused
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, focusedTaskId]);

  return (
    <TaskView
      createdAt={createdAt}
      description={description}
      descriptionEditRef={descriptionEditRef}
      editingState={editingState}
      handleDescriptionChange={handleDescriptionChange}
      handleKeyDown={handleKeyDown}
      handleTitleChange={handleTitleChange}
      id={id}
      isBlocked={isBlocked}
      isDone={isDone}
      isImportant={isImportant}
      isUrgent={isUrgent}
      title={title}
      titleEditRef={titleEditRef}
      taskRef={taskRef}
    />
  );
};

export type TaskViewProps = TaskProps & {
  descriptionEditRef: React.RefObject<HTMLTextAreaElement | null>;
  editingState: EditingState | undefined;
  handleDescriptionChange: (value: string) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLLIElement>) => void;
  handleTitleChange: (value: string) => void;
  taskRef: React.RefObject<HTMLLIElement | null>;
  titleEditRef: React.RefObject<HTMLInputElement | null>;
};

export const TaskView = ({
  createdAt,
  description,
  id,
  isBlocked,
  isDone,
  isImportant,
  isUrgent,
  title,
  editingState,
  handleKeyDown,
  handleTitleChange,
  handleDescriptionChange,
  titleEditRef,
  descriptionEditRef,
  taskRef,
}: TaskViewProps) => {
  return (
    <li
      className={cn(
        "flex w-full flex-col gap-2 rounded-md border px-4 py-2 text-olive-12 focus:outline-2",
        "border-olive-6 bg-olive-2 focus:bg-olive-5 focus:outline-olive-7",
        isBlocked && "border-red-6 bg-red-2 focus:bg-red-5 focus:outline-red-7",
        isDone &&
          "border-grass-6 bg-grass-3 focus:bg-grass-5 focus:outline-grass-7",
      )}
      data-testid={`task-${id}`}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      ref={taskRef}
    >
      <div className="flex items-center justify-between gap-2">
        {editingState?.taskCreatedAtTimestamp === createdAt.toISOString() &&
        editingState?.target === "title" ? (
          <TaskInput
            dataTestId={`task-${id}-title-input`}
            defaultValue={title}
            onChange={handleTitleChange}
            ref={titleEditRef}
            type="input"
          />
        ) : (
          <h3
            className="text-base font-medium"
            data-testid={`task-${id}-title`}
          >
            {title}
          </h3>
        )}
        <div className="flex items-center gap-2">
          {isUrgent !== undefined && (
            <Urgent
              dataTestId={`task-${id}-urgent`}
              isUrgent={isUrgent}
              size="medium"
            />
          )}
          {isImportant !== undefined && (
            <Important
              dataTestId={`task-${id}-important`}
              isImportant={isImportant}
              size="medium"
            />
          )}
        </div>
      </div>
      {editingState?.taskCreatedAtTimestamp === createdAt.toISOString() &&
      editingState?.target === "description" ? (
        <TaskInput
          dataTestId={`task-${id}-description-textarea`}
          defaultValue={description ?? ""}
          onChange={handleDescriptionChange}
          ref={descriptionEditRef}
          type="textarea"
        />
      ) : (
        description && (
          <div className="ml-2" data-testid={`task-${id}-description`}>
            {description.split("\n").map((line, index) => (
              <p key={index} className="text-base font-light">
                {line}
              </p>
            ))}
          </div>
        )
      )}
    </li>
  );
};
