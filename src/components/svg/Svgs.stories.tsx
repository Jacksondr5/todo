import type { Meta, StoryObj } from "@storybook/react";

import { Delete } from "./Delete";
import { EditDescription } from "./EditDescription";
import { EditTitle } from "./EditTitle";
import { Important } from "./Important";
import { Status } from "./Status";
import { Urgent } from "./Urgent";
import { Add } from "./Add";

const meta = {
  title: "Svgs",
  component: Delete,
} satisfies Meta<typeof Delete>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllIcons: Story = {
  render: () => (
    <div className="grid grid-flow-row grid-cols-12 gap-1 text-center text-xl text-olive-12">
      <div className="col-start-1 row-start-1">Add</div>
      <Add className="col-start-1 row-start-2" />
      <div className="col-start-2 row-start-1">EditTitle</div>
      <EditTitle className="col-start-2 row-start-2" />
      <div className="col-start-3 row-start-1">EditDescription</div>
      <EditDescription className="col-start-3 row-start-2" />
      <div className="col-start-4 row-start-1">Delete</div>
      <Delete className="col-start-4 row-start-2" />

      <div className="col-start-1 row-start-3">Status: in-progress</div>
      <Status className="col-start-1 row-start-4" status="in-progress" />
      <div className="col-start-2 row-start-3">Status: done</div>
      <Status className="col-start-2 row-start-4" status="done" />
      <div className="col-start-3 row-start-3">Status: blocked</div>
      <Status className="col-start-3 row-start-4" status="blocked" />

      <div className="col-start-1 row-start-5">Important: undefined</div>
      <Important className="col-start-1 row-start-6" />
      <div className="col-start-2 row-start-5">Important: true</div>
      <Important className="col-start-2 row-start-6" isImportant />
      <div className="col-start-3 row-start-5">Important: false</div>
      <Important className="col-start-3 row-start-6" isImportant={false} />

      <div className="col-start-1 row-start-7">Urgent: undefined</div>
      <Urgent className="col-start-1 row-start-8" />
      <div className="col-start-2 row-start-7">Urgent: true</div>
      <Urgent className="col-start-2 row-start-8" isUrgent />
      <div className="col-start-3 row-start-7">Urgent: false</div>
      <Urgent className="col-start-3 row-start-8" isUrgent={false} />
    </div>
  ),
};
