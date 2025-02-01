import { type Page, type Locator, expect } from "@playwright/test";

export class MainPage {
  readonly page: Page;

  // Navigation elements
  readonly header: Locator;
  readonly navigationMenu: Locator;
  readonly homeLink: Locator;
  readonly dashboardLink: Locator;
  readonly mobileMenuButton: Locator;

  // Authentication elements
  readonly signInButton: Locator;
  readonly signUpButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators
    this.header = page.locator("header");
    this.navigationMenu = page.getByRole("navigation");
    this.homeLink = page.getByRole("link", { name: "Home" });
    this.dashboardLink = page.getByRole("link", { name: "Dashboard" });
    this.mobileMenuButton = page.getByRole("button", { name: /menu/i });
    this.signInButton = page.getByRole("link", { name: /sign in/i });
    this.signUpButton = page.getByRole("link", { name: /sign up/i });
  }

  // Navigation methods
  async goto() {
    await this.page.goto("/");
  }

  async navigateToHome() {
    await this.homeLink.click();
  }

  async navigateToDashboard() {
    await this.dashboardLink.click();
  }

  // Mobile menu methods
  async openMobileMenu() {
    if (await this.mobileMenuButton.isVisible()) {
      await this.mobileMenuButton.click();
    }
  }

  async closeMobileMenu() {
    if (await this.mobileMenuButton.isVisible()) {
      await this.mobileMenuButton.click();
    }
  }

  // Authentication methods
  async clickSignIn() {
    await this.signInButton.click();
  }

  async clickSignUp() {
    await this.signUpButton.click();
  }

  // Verification methods
  async verifyPageLoaded() {
    await expect(this.page).toHaveTitle(/Sweepbot/);
    await expect(this.navigationMenu).toBeVisible();
  }

  async verifyHeaderTheme() {
    await expect(this.header).toHaveClass(/bg-olive-3/);
  }

  async verifyResponsiveDesign() {
    // Check mobile view
    await this.page.setViewportSize({ width: 375, height: 667 });
    await expect(this.mobileMenuButton).toBeVisible();

    // Check desktop view
    await this.page.setViewportSize({ width: 1024, height: 768 });
    await expect(this.mobileMenuButton).toBeHidden();
  }

  async verifyAuthenticationElements() {
    await expect(this.signInButton).toBeVisible();
    await expect(this.signUpButton).toBeVisible();
  }
}
