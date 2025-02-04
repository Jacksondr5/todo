import { expect, test } from "@playwright/test";
import { MainPage } from "../src/main.page";
import { TaskPage } from "../src/task.page";
import { svgColors } from "~/components/svg/utils";

test.use({ storageState: "playwright/.clerk/user.json" });

test.describe("Task list", () => {
  let mainPage: MainPage;

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    await mainPage.goto();
  });

  test("should add a task", async () => {
    const newTaskLocator = await mainPage.addTask("Test add task");
    const task = await TaskPage.fromLocator(newTaskLocator);
    await task.deleteTask();
  });

  test("should toggle importance", async () => {
    const newTaskLocator = await mainPage.addTask(
      "Test toggle importance task",
    );
    const task = await TaskPage.fromLocator(newTaskLocator);
    await task.toggleImportance();
    const importantSvg = task.importanceLocator;
    await expect(importantSvg).toBeVisible();
    await expect(importantSvg).toHaveAttribute("stroke", svgColors.red);
    await task.toggleImportance();
    await expect(importantSvg).toBeVisible();
    await expect(importantSvg).toHaveAttribute("stroke", svgColors.blue);
    await task.toggleImportance();
    await expect(importantSvg).not.toBeVisible();
    await task.deleteTask();
  });

  test("should toggle urgency", async () => {
    const newTaskLocator = await mainPage.addTask("Test toggle urgency task");
    const task = await TaskPage.fromLocator(newTaskLocator);
    await task.toggleUrgency();
    const urgentSvg = task.urgencyLocator;
    await expect(urgentSvg).toBeVisible();
    await expect(urgentSvg).toHaveAttribute("stroke", svgColors.red);
    await task.toggleUrgency();
    await expect(urgentSvg).toBeVisible();
    await expect(urgentSvg).toHaveAttribute("stroke", svgColors.blue);
    await task.toggleUrgency();
    await expect(urgentSvg).not.toBeVisible();
    await task.deleteTask();
  });

  test("should toggle done", async () => {
    const newTaskLocator = await mainPage.addTask("Test toggle donetask");
    const task = await TaskPage.fromLocator(newTaskLocator);
    await task.toggleDone();
    await expect(newTaskLocator).toHaveClass(/bg-grass-3/);
    await task.toggleDone();
    await expect(newTaskLocator).not.toHaveClass(/bg-grass-3/);
    await task.deleteTask();
  });

  test("should toggle blocked", async () => {
    const newTaskLocator = await mainPage.addTask("Test toggle blocked task");
    const task = await TaskPage.fromLocator(newTaskLocator);
    await task.toggleBlocked();
    await expect(newTaskLocator).toHaveClass(/bg-red-2/);
    await task.toggleBlocked();
    await expect(newTaskLocator).not.toHaveClass(/bg-red-2/);
    await task.deleteTask();
  });

  test("should edit title", async () => {
    const newTaskLocator = await mainPage.addTask("Test edit title task");
    const task = await TaskPage.fromLocator(newTaskLocator);
    const newTitle = "New title";
    await task.editTitle(newTitle);
    await expect(task.titleLocator).toHaveText(newTitle);
    await task.deleteTask();
  });

  test("should edit description", async () => {
    const newTaskLocator = await mainPage.addTask("Test edit description task");
    const task = await TaskPage.fromLocator(newTaskLocator);
    const newDescription = "New description";
    await task.editDescription(newDescription);
    await expect(task.descriptionLocator).toHaveText(newDescription);
    await task.deleteTask();
  });
});
