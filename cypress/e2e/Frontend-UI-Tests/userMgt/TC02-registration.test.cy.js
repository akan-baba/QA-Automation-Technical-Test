
import { Environment } from "../../../support/utils/environs"
import { UserRegistration } from "../../../support/pageObjects/RegisterPage"
import { faker } from "@faker-js/faker";
const userRegistration = new UserRegistration();
const baseUrl = Environment.getBaseUrl();
const email = faker.internet.email();
const randomName = faker.person.fullName();

describe('User Registration Form', () => {
    // Runs before each test case to load the base URL and navigate to the registration page
    beforeEach(() => {
        cy.visit(baseUrl); // Visit the application's base URL
        userRegistration.pageAction.clickRegisterLink().click(); // Click the Register link
    });

    // TC01: Positive test – successful registration with valid details
    it('TC01-User can register with valid name, email, and password', () => {
        userRegistration.pageAction.enterFullName().type(randomName); // Enter a valid full name
        userRegistration.pageAction.enterEmail().clear().type(email); // Enter a valid unique email
        userRegistration.pageAction.enterPassword().clear().type('New57hue%&*'); // Enter a strong password
        userRegistration.pageAction.clickRegisterButton().click(); // Submit the registration form
        cy.wait(1000); // Wait for the welcome message to render
        userRegistration.pageAction.verifyRegistration().should('contain', 'Welcome'); // Assert welcome message appears
        userRegistration.pageAction.clickLogOutButton().click(); // Log out after successful registration
    });

    // TC02: Negative test – registration fails when email field is left blank
    it('TC02-Registration fails with missing required fields (no email)', () => {
        userRegistration.pageAction.enterFullName().type(randomName); // Enter full name
        userRegistration.pageAction.enterEmail().clear(); // Leave email blank
        userRegistration.pageAction.enterPassword().clear().type('New57hue%&*'); // Enter password
        userRegistration.pageAction.clickRegisterButton().click(); // Submit form
        cy.contains(/(Expected a string|Please enter all fields)/).should('be.visible'); // Assert validation error message
    });

    // TC03: Negative test – invalid email format should trigger validation error
    it('TC03-Registration fails with invalid email format ', () => {
        userRegistration.pageAction.enterFullName().type(randomName); // Enter full name
        userRegistration.pageAction.enterEmail().clear().type('joe.com'); // Enter malformed email
        userRegistration.pageAction.enterPassword().clear().type('New57hue%&*'); // Enter password
        userRegistration.pageAction.clickRegisterButton().click(); // Submit form
        userRegistration.pageAction.enterEmail()
            .invoke('prop', 'validationMessage')
            .should('include', "Please include an '@' in the email address"); // Assert native HTML5 validation
    });

    // TC04: Negative test – weak password should not be accepted
    it('TC04-Registration fails when password is too weak', () => {
        const randomName = faker.person.fullName(); // Generate random name
        const email = faker.internet.email(); // Generate random email
        userRegistration.pageAction.enterFullName().type(randomName); // Enter name
        userRegistration.pageAction.enterEmail().clear().type(email); // Enter email
        userRegistration.pageAction.enterPassword().clear().type('red123'); // Enter weak password
        userRegistration.pageAction.clickRegisterButton().click(); // Submit form
        cy.wait(1000); // Wait for error
        cy.contains('Please enter a strong password').should('be.visible'); // Assert error message
    });

    // TC05: Negative test – registration should fail if email is already in use
    it('TC05-Registration fails if the email is already registered', () => {
        userRegistration.pageAction.enterFullName().type('Joy Doe'); // Enter known user name
        userRegistration.pageAction.enterEmail().clear().type('joy@example.com'); // Enter existing user email
        userRegistration.pageAction.enterPassword().clear().type('StrongPass123!'); // Enter strong password
        userRegistration.pageAction.clickRegisterButton().click(); // Submit form
        cy.contains('User already exists').should('be.visible'); // Assert duplicate email error
    });

    // TC06: Positive test – verify dashboard elements appear after successful registration
    it('TC06–Registration success shows dashboard', () => {
        const randomName = faker.person.fullName(); // Generate name
        const email = faker.internet.email(); // Generate email
        userRegistration.pageAction.enterFullName().type(randomName); // Enter name
        userRegistration.pageAction.enterEmail().clear().type(email); // Enter email
        userRegistration.pageAction.enterPassword().clear().type('New57hue%&*'); // Enter strong password
        userRegistration.pageAction.clickRegisterButton().click(); // Submit form
        cy.wait(1000); // Wait for page load
        userRegistration.pageAction.verifyRegistration().should('contain', 'Welcome'); // Assert welcome message
        cy.contains('No Task Found').should('be.visible'); // Assert dashboard loads with no tasks
    });

    // TC07: Negative test – missing name field should block registration
    it('TC07-Registration fails if name is missing', () => {
        const email = faker.internet.email(); // Generate email
        userRegistration.pageAction.enterEmail().clear().type(email); // Enter email
        userRegistration.pageAction.enterPassword().clear().type('New57hue%&*'); // Enter password
        userRegistration.pageAction.clickRegisterButton().click(); // Submit form without name
        cy.contains('Expected a string but received a undefined').should('be.visible'); // Assert missing name error
    });
});