import { Environment } from "../../../support/utils/environs"
import {userLogin } from "../../../support/pageObjects/LoginPage"
const login = new userLogin();
const baseUrl = Environment.getBaseUrl();

describe('User Login', () => {

    beforeEach(() => {
        // Visit base URL before each test
        cy.visit(baseUrl);
        // Navigate to the Shift Manager login page
        login.pageAction.clickshiftManagerLink().click();
    });

    it('TC01 - Successful login with valid credentials', () => {
        // Enter valid registered email
        login.pageAction.enterEmail().type('john@example.com');
        // Enter matching valid password (forced due to element overlap)
        login.pageAction.enterPassword().type('StrongPass123!', { force: true });
        // Click the login button
        login.pageAction.clickLoginButton().click();
        cy.wait(2000); // Wait for dashboard to load
        // Verify user sees the dashboard (Welcome message)
        cy.contains('Welcome').should('be.visible');
        // Log out after successful login
        login.pageAction.clickLogOutButton().click();
    });

    it('TC02 - Login fails with unregistered email', () => {
        // Enter an email not in the system
        login.pageAction.enterEmail().type('john@example.co.uk');
        // Enter a valid password
        login.pageAction.enterPassword().type('StrongPass123!');
        // Attempt login
        login.pageAction.clickLoginButton().click();
        // Verify proper error message is shown
        cy.contains('User does not exist').should('be.visible');
    });

    it('TC03 - Login fails with invalid email format', () => {
        // Enter malformed email (missing '@')
        login.pageAction.enterEmail().type('john');
        // Enter a valid password
        login.pageAction.enterPassword().type('StrongPass123!');
        // Attempt login
        login.pageAction.clickLoginButton().click();
        // Validate native HTML5 email validation triggers
        login.pageAction.enterEmail()
            .invoke('prop', 'validationMessage')
            .should('include', "Please include an '@' in the email address");
    });

    it('TC04 - Login fails with empty fields', () => {
        // Submit form without filling in any fields
        login.pageAction.clickLoginButton().click();
        // Validate error for required fields
        cy.contains('Please enter all fields').should('be.visible');
    });

    it('TC05 - Login fails with missing password', () => {
        // Enter only the email field
        login.pageAction.enterEmail().type('john@example.com');
        // Submit without entering password
        login.pageAction.clickLoginButton().click();
        // Validate appropriate error message is displayed
        cy.contains('Please enter all fields').should('be.visible');
    });

    it('TC06 - User can reset password', () => {
        // Navigate to forgot password page
        login.pageAction.clickforgetPwdLink().click();
        // Enter registered email for password reset
        login.pageAction.enterEmailForgotPwd().type('john@example.com');
        // Submit password reset request
        login.pageAction.clickResetButton().click();
        // Validate reset success message
        cy.contains('A link to reset your password have been sent to your email.').should('be.visible');
    });

    it('TC07 - Logs in with multiple users from fixture', () => {
        // Load multiple login users from fixture JSON
        cy.fixture('loginUsers').then((users) => {
            users.forEach((user) => {
                // Clear and enter email from fixture
                login.pageAction.enterEmail().clear().type(user.email);
                // Clear and enter password from fixture
                login.pageAction.enterPassword().clear().type(user.password);
                // Submit login form
                login.pageAction.clickLoginButton().click();
                // Validate dashboard access
                cy.contains('Welcome').should('be.visible');
                // Log out for next iteration
                cy.contains('Logout').click();
                cy.wait(500); // Allow time before next loop
            });
        });
    });

});
