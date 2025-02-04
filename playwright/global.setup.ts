import { clerk, clerkSetup } from "@clerk/testing/playwright";
import { expect, test as setup } from "@playwright/test";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

// Configure Playwright with Clerk
setup("global setup", async ({}) => {
  await clerkSetup();
});

// Define the path to the storage file, which is `user.json`
const authFile = path.join(
  import.meta.dirname,
  "../playwright/.clerk/user.json",
);

setup("authenticate and save state to storage", async ({ page }) => {
  // Perform authentication steps.
  // This example uses a Clerk helper to authenticate
  await clerkSetup();
  await page.goto("/");
  const username = process.env.E2E_CLERK_USER_USERNAME;
  console.log("username", username);
  const password = process.env.E2E_CLERK_USER_PASSWORD;
  if (!username) throw new Error("E2E_CLERK_USER_USERNAME is not set");
  if (!password) throw new Error("E2E_CLERK_USER_PASSWORD is not set");
  await clerk.signIn({
    page,
    signInParams: {
      strategy: "password",
      identifier: username,
      password,
    },
  });
  await expect(page.getByTestId("sign-out-button")).toBeVisible();

  await page.context().storageState({ path: authFile });
});
