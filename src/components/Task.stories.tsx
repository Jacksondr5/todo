import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";

import { TaskView, type TaskViewProps } from "./Task";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Task",
  component: TaskView,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
} satisfies Meta<typeof TaskView>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultProps = {
  createdAt: new Date(),
  id: 1,
  isBlocked: false,
  isDone: false,
  descriptionEditRef: { current: null },
  editingState: undefined,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onDescriptionChange: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onFocus: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onKeyDown: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTitleChange: () => {},
  taskRef: { current: null },
  titleEditRef: { current: null },
} satisfies Omit<TaskViewProps, "title">;

const TaskSet = (props: Partial<TaskViewProps>) => {
  return (
    <div className="flex w-96 flex-col gap-4">
      <TaskView title="Normal" {...defaultProps} {...props} />
      <TaskView
        title="With Description"
        description="This is a description"
        {...defaultProps}
        {...props}
      />
      <TaskView title="Urgent" isUrgent {...defaultProps} {...props} />
      <TaskView
        title="Not Urgent"
        isUrgent={false}
        {...defaultProps}
        {...props}
      />
      <TaskView title="Important" isImportant {...defaultProps} {...props} />
      <TaskView
        title="Not Important"
        isImportant={false}
        {...defaultProps}
        {...props}
      />
      <TaskView
        title="Both"
        isUrgent
        isImportant
        {...defaultProps}
        {...props}
      />
      <TaskView
        title="Both Not"
        isUrgent={false}
        isImportant={false}
        {...defaultProps}
        {...props}
      />
      <TaskView title="Focused" {...defaultProps} {...props} />
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
  args: {} as TaskViewProps,
  render: (args) => <TaskSet {...args} />,
  play,
};

export const Blocked: Story = {
  args: { isBlocked: true } as TaskViewProps,
  render: (args) => <TaskSet {...args} />,
  play,
};

export const Done: Story = {
  args: { isDone: true } as TaskViewProps,
  render: (args) => <TaskSet {...args} />,
  play,
};
