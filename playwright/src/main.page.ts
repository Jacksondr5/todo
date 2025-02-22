import { type Page, type Locator, expect } from "@playwright/test";
import { keybindings } from "~/components/help/KeybindingsHelp";
import { NEW_TASK_ID } from "~/contexts/TaskContext";
import { TaskPage } from "./task.page";

export class MainPage {
  readonly page: Page;

  readonly signInButton: Locator;
  readonly taskList: Locator;

  constructor(page: Page) {
    this.page = page;

    this.signInButton = page.getByTestId("sign-in-button");
    this.taskList = page.getByTestId("task-list");
  }

  async goto() {
    await this.page.goto("/");
  }

  async isSignedIn() {
    const buttonText = await this.signInButton.textContent();
    return buttonText === "Sign out";
  }

  async clickSignIn() {
    await this.signInButton.click();
  }

  async verifyPageLoaded() {
    await expect(this.signInButton).toBeVisible();
  }

  async focusTaskList() {
    await this.taskList.focus();
  }

  async addTask(title: string) {
    await this.taskList.focus();
    await this.page.keyboard.press(keybindings.ADD_TODO);
    const focusedElement = this.page.locator("*:focus");
    if (!focusedElement) {
      throw new Error("Failed to focus on new task input");
    }
    const newElementDataTestId =
      await focusedElement.getAttribute("data-testid");
    // Yes, this is testing an internal thing, but it's important to make
    // sure the test is focusing the right thing.
    expect(newElementDataTestId, {
      message: "The test may not be focusing the right element",
    }).toBe(TaskPage.getTaskTitleInputTestId(NEW_TASK_ID));
    await focusedElement.fill(title);
    await focusedElement.press("Control+Enter");

    // Get the last task in the list by finding the last child to the task list
    const newTask = this.taskList.getByRole("listitem").last();
    await expect(newTask, {
      message: "Could not find new task",
    }).toBeVisible();

    // Need to poll this since it's waiting on the DB to come back with the new ID
    let newTaskId = -1;
    await expect(async () => {
      newTaskId = await TaskPage.getTaskId(newTask);
      expect(newTaskId, {
        message:
          "Last task ID should not be -1, this means the test did not wait for the DB to come back with the new ID",
      }).not.toBe(-1);
    }).toPass();

    // Need to return a more specific locator for the task.  If we stick
    // with newTask, it'll ALWAYS be the last task in the list, which
    // is not what you expect when you call this function.
    return this.page.getByTestId(TaskPage.getTaskTestId(newTaskId));
  }
}
