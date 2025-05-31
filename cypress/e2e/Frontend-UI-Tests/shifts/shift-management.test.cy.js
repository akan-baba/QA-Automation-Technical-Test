import { Environment } from "../../../support/utils/environs";
import { shiftPage } from "../../../support/pageObjects/ShiftPage";

const shift = new shiftPage(); // Instantiate the shift page object
const baseUrl = Environment.getBaseUrl(); // Get the base URL from environment config

describe('Shift manager booking', () => {
    beforeEach(() => {
        // Visit the base URL and log in before each test
        cy.visit(baseUrl);
        cy.userLogin();
    });

    // TC01: Positive test - Post a shift with both valid title and description
    it('TC01-User can post a shift with valid title and description', () => {
        // Enter valid title
        shift.pageAction.enterTitleField().type('Night Shift');
        // Enter valid description
        shift.pageAction.enterdescriptionField().type('Front desk coverage');
        // Click submit button to post shift
        shift.pageAction.clickpostShiftButton().click();
        // Assert that both title and description appear on screen
        cy.contains('Night Shift').should('be.visible');
        cy.contains('Front desk coverage').should('be.visible');
        // Cleanup - delete the shift using last remove-task button
        cy.get('.remove-task').last().click();
    });

    // TC02: Negative test - Posting shift without a title should trigger validation
    it('TC02-Shift posting fails with missing title ', () => {
        // Fill in description but leave out title
        shift.pageAction.enterdescriptionField().type('Front desk coverage');
        // Try to submit the form
        shift.pageAction.clickpostShiftButton().click();
        // Assert HTML5 validation message appears on title input
        shift.pageAction.enterTitleField().invoke('prop', 'validationMessage')
            .should('include', "Please fill out this field.");
    });

    // TC03: Negative test - Posting shift without description should trigger validation
    it('TC03-Shift posting fails with missing description', () => {
        // Fill in title but leave out description
        shift.pageAction.enterTitleField().type('Night Shift');
        // Try to submit the form
        shift.pageAction.clickpostShiftButton().click();
        // Assert HTML5 validation message appears on description input
        shift.pageAction.enterdescriptionField().invoke('prop', 'validationMessage')
            .should('include', "Please fill out this field.");
    });
});