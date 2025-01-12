"use client";

import { useRef, useState } from "react";
import { Important } from "./svg/Important";
import { Urgent } from "./svg/Urgent";
import { TaskInput } from "./TaskInput";
import { cn } from "~/lib/utils";

export type TaskProps = {
  description?: string;
  isBlocked: boolean;
  isDone: boolean;
  isImportant?: boolean;
  isUrgent?: boolean;
  title: string;
  // onChange: (title: string, description?: string) => void;
};

export const Task = ({
  title: initialTitle,
  description: initialDescription,
  isBlocked: initialIsBlocked,
  isDone: initialIsDone,
  isImportant: initialIsImportant,
  isUrgent: initialIsUrgent,
}: TaskProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [isBlocked, setIsBlocked] = useState(initialIsBlocked);
  const [isImportant, setIsImportant] = useState(initialIsImportant);
  const [isUrgent, setIsUrgent] = useState(initialIsUrgent);
  const [isDone, setIsDone] = useState(initialIsDone);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const titleEditRef = useRef<HTMLInputElement>(null);
  const descriptionEditRef = useRef<HTMLTextAreaElement>(null);

  const handleTitleChange = (value: string) => {
    setTitle(value);
    setIsEditingTitle(false);
    ref.current?.focus();
  };

  const handleDescriptionChange = (value: string) => {
    setDescription(value);
    setIsEditingDescription(false);
    ref.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isEditingTitle || isEditingDescription) {
      return;
    }

    if (e.key === "i") {
      switch (isImportant) {
        case true:
          setIsImportant(false);
          break;
        case false:
          setIsImportant(undefined);
          break;
        case undefined:
          setIsImportant(true);
          break;
      }
    } else if (e.key === "u") {
      switch (isUrgent) {
        case true:
          setIsUrgent(false);
          break;
        case false:
          setIsUrgent(undefined);
          break;
        case undefined:
          setIsUrgent(true);
          break;
      }
    } else if (e.key === "b") {
      setIsBlocked(!isBlocked);
    } else if (e.key === "e") {
      setIsEditingTitle(true);
      titleEditRef.current?.focus();
    } else if (e.key === "d") {
      setIsEditingDescription(true);
      descriptionEditRef.current?.focus();
    } else if (e.key === "q") {
      setIsDone(!isDone);
    }
  };

  return (
    <div
      className={cn(
        "flex w-96 flex-col gap-2 rounded-md border p-2 text-olive-12 focus:outline-2",
        "border-olive-6 bg-olive-2 focus:bg-olive-5 focus:outline-olive-7",
        isBlocked && "border-red-6 bg-red-2 focus:bg-red-5 focus:outline-red-7",
        isDone &&
          "border-grass-6 bg-grass-3 focus:bg-grass-5 focus:outline-grass-7",
      )}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      ref={ref}
    >
      <div className="flex items-center justify-between gap-2">
        {isEditingTitle ? (
          <TaskInput
            type="input"
            defaultValue={title}
            onChange={handleTitleChange}
            ref={titleEditRef}
          />
        ) : (
          <h3 className="text-base font-medium">{title}</h3>
        )}
        <div className="flex items-center gap-2">
          {isUrgent !== undefined && (
            <Urgent className="h-6" isUrgent={isUrgent} />
          )}
          {isImportant !== undefined && (
            <Important className="h-6" isImportant={isImportant} />
          )}
        </div>
      </div>
      {isEditingDescription ? (
        <TaskInput
          type="textarea"
          defaultValue={description ?? ""}
          onChange={handleDescriptionChange}
          ref={descriptionEditRef}
        />
      ) : (
        <p className="text-base font-light">{description}</p>
      )}
    </div>
  );
};
