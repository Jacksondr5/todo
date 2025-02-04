import { expect, type Locator, type Page } from "@playwright/test";
import { keybindings } from "~/components/help/KeybindingsHelp";
import { NEW_TASK_ID } from "~/contexts/TaskContext";

export class TaskPage {
  readonly page: Page;
  readonly taskLocator: Locator;
  readonly id: number;

  private constructor(taskLocator: Locator, id: number) {
    this.page = taskLocator.page();
    this.taskLocator = taskLocator;
    this.id = id;
  }

  static async fromLocator(taskLocator: Locator) {
    const id = await this.getTaskId(taskLocator);
    return new TaskPage(taskLocator, id);
  }

  static async getTaskId(taskLocator: Locator) {
    const taskId = (await taskLocator.getAttribute("data-testid"))!;
    expect(taskId).toBeDefined();
    expect(taskId, {
      message:
        "Task ID should not be -1, this means the test did not wait for the DB to come back with the new ID",
    }).not.toBe(`task-${NEW_TASK_ID}`);
    expect(taskId, {
      message: `Task ID should be in the format 'task-<id>', got ${taskId}`,
    }).toMatch(/task-\d+$/);
    const taskIdParts = taskId.split("-");
    const taskIdNumber = parseInt(taskIdParts[1] ?? "NaN");
    return taskIdNumber;
  }

  static getTaskTestId(id: number) {
    return `task-${id}`;
  }

  static getTaskTitleInputTestId(id: number) {
    return `task-${id}-title-input`;
  }
  get titleLocator() {
    return this.taskLocator.getByTestId(`task-${this.id}-title`);
  }

  get titleInputLocator() {
    return this.taskLocator.getByTestId(
      TaskPage.getTaskTitleInputTestId(this.id),
    );
  }

  get descriptionLocator() {
    return this.taskLocator.getByTestId(`task-${this.id}-description`);
  }

  get descriptionTextareaLocator() {
    return this.taskLocator.getByTestId(`task-${this.id}-description-textarea`);
  }

  get importanceLocator() {
    return this.taskLocator.getByTestId(`task-${this.id}-important`);
  }

  get urgencyLocator() {
    return this.taskLocator.getByTestId(`task-${this.id}-urgent`);
  }

  async deleteTask() {
    await this.taskLocator.focus();
    await this.page.keyboard.press(keybindings.DELETE_TODO);
    await expect(this.taskLocator, {
      message: `Task ${this.id} should be deleted`,
    }).not.toBeVisible();
    // Wait for the delete request to complete
    await this.page.waitForLoadState("networkidle");
  }

  async toggleImportance() {
    await this.taskLocator.focus();
    await this.page.keyboard.press(keybindings.EDIT_IMPORTANCE);
  }

  async toggleUrgency() {
    await this.taskLocator.focus();
    await this.page.keyboard.press(keybindings.EDIT_URGENCY);
  }

  async toggleDone() {
    await this.taskLocator.focus();
    await this.page.keyboard.press(keybindings.TOGGLE_DONE);
  }

  async toggleBlocked() {
    await this.taskLocator.focus();
    await this.page.keyboard.press(keybindings.TOGGLE_BLOCKED);
  }

  async editTitle(title: string) {
    await this.taskLocator.focus();
    await this.page.keyboard.press(keybindings.EDIT_TITLE);
    await this.titleInputLocator.fill(title);
    await this.page.keyboard.press("Control+Enter");
  }

  async editDescription(description: string) {
    await this.taskLocator.focus();
    await this.page.keyboard.press(keybindings.EDIT_DESCRIPTION);
    await this.descriptionTextareaLocator.fill(description);
    await this.page.keyboard.press("Control+Enter");
  }
}
