"use client";

import { useState } from "react";
import { useEditing } from "~/contexts/EditingContext";
import { TaskInput } from "./TaskInput";

export const BossConversation = () => {
  const { editingState, setEditingState } = useEditing();
  // todo: create a new textarea that will save onBlur and use that instead of the task input.  Then, use this component in an accordion for the conversation list
  const [values, setValues] = useState({
    accomplishments: "",
    challenges: "",
    priorities: "",
    notes: "",
  });

  return (
    <div className="w-full max-w-4xl rounded-lg bg-grass-2 p-6">
      <h2 className="mb-6 text-xl font-semibold text-olive-12">
        Boss Conversation
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-olive-11">
            Accomplishments
          </label>
          <TaskInput
            defaultValue={values.accomplishments}
            onChange={(value) =>
              setValues((prev) => ({ ...prev, accomplishments: value }))
            }
            type="textarea"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-olive-11">
            Challenges
          </label>
          <TaskInput
            defaultValue={values.challenges}
            onChange={(value) =>
              setValues((prev) => ({ ...prev, challenges: value }))
            }
            type="textarea"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-olive-11">
            Priorities
          </label>
          <TaskInput
            defaultValue={values.priorities}
            onChange={(value) =>
              setValues((prev) => ({ ...prev, priorities: value }))
            }
            type="textarea"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-olive-11">Notes</label>
          <TaskInput
            defaultValue={values.notes}
            onChange={(value) =>
              setValues((prev) => ({ ...prev, notes: value }))
            }
            type="textarea"
          />
        </div>
      </div>
    </div>
  );
};
