
import 'cypress-axe';
import { Environment } from "../../../support/utils/environs";

const baseUrl = Environment.getBaseUrl();

describe('Accessibility Test - Registration Page', () => {
  it('TC02 - Should pass basic accessibility scan on registration form', () => {
    cy.visit(baseUrl);
    cy.injectAxe();
    cy.checkA11y(null, {
      includedImpacts: ['critical'] // You can also scan for 'serious' or 'minor'
    });
  });
});
