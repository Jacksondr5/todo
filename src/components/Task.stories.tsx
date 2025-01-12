import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";

import { Task, type TaskProps } from "./Task";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/Task",
  component: Task,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
} satisfies Meta<typeof Task>;

export default meta;
type Story = StoryObj<typeof meta>;

const TaskSet = (props: Partial<TaskProps>) => {
  return (
    <div className="flex flex-col gap-4">
      <Task title="Normal" {...props} />
      <Task title="Urgent" isUrgent {...props} />
      <Task title="Not Urgent" isUrgent={false} {...props} />
      <Task title="Important" isImportant {...props} />
      <Task title="Not Important" isImportant={false} {...props} />
      <Task title="Both" isUrgent isImportant {...props} />
      <Task title="Both Not" isUrgent={false} isImportant={false} {...props} />
      <Task title="Focused" {...props} />
    </div>
  );
};

const play = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
  const canvas = within(canvasElement);
  const task = canvas.getByText("Focused");
  if (task) {
    await userEvent.click(task);
  }
};

export const Active: Story = {
  // Force the args to TaskProps because we set the title in TaskSet
  args: {} as TaskProps,
  render: (args) => <TaskSet {...args} />,
  play,
};

export const Blocked: Story = {
  args: { isBlocked: true } as TaskProps,
  render: (args) => <TaskSet {...args} />,
  play,
};

export const Done: Story = {
  args: { isDone: true } as TaskProps,
  render: (args) => <TaskSet {...args} />,
  play,
};
