import { faker } from "@faker-js/faker";

describe("smoke tests", () => {
  it("should allow you to register and login", () => {
    const loginForm = {
      fullName: faker.name.fullName(),
      email: `${faker.internet.userName()}@example.com`,
      password: faker.internet.password(),
    };
    cy.then(() => ({ email: loginForm.email })).as("user");

    cy.visitAndCheck("/sign-up");
    // cy.findByRole("link", { name: /sign up/i }).click();

    cy.findByLabelText(/full name/i).type(loginForm.fullName);
    cy.findByRole("textbox", { name: /email/i }).type(loginForm.email);
    cy.findByLabelText(/password/i).type(loginForm.password);
    cy.findByRole("button", { name: /sign in/i }).click();

    cy.findByText(/dashboard/i);
  });
});
