Cypress.Commands.add('userLogin', () => {
    cy.get("input[placeholder='Email']").type('baba@example.com')
    cy.get("input[placeholder='Password']").type('StrongPass123!')
    cy.get("button[type='submit']").click()
    cy.wait(4000)
  });