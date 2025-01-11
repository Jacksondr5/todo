import { Important } from "../svg/Important";
import { Urgent } from "../svg/Urgent";
import { Input } from "./input";
import { Textarea } from "./textarea";

export const TaskInput = () => {
  return (
    <div className="flex flex-col gap-2 rounded-md border border-grass-7 bg-grass-2 p-2">
      <div className="flex items-center gap-2">
        <Input value="test very long string that just keeps getting bigger and bigger" />
        <Urgent className="h-8" />
        <Important className="h-8" />
      </div>
      <Textarea value="test very long string that just keeps getting bigger and bigger" />
    </div>
  );
};
