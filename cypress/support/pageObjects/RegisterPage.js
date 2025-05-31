export class UserRegistration {

    websSelectors = {

        registerLink: "a[class='text-red-500 hover:underline ml-2']",
        fullNameField: "input[placeholder='Full name']",
        emailField: "input[placeholder='Email address']",
        pwdField: '[type="password"]',
        registerBtn: "button[type='submit']",
        registrationSuccess:'.text-gray-700',
        logoutBtn: '.bg-red-500'
        

        

    }

    pageAction = {
        clickRegisterLink: () => cy.get(this.websSelectors.registerLink),
        enterFullName: () => cy.get(this.websSelectors.fullNameField),
        enterEmail: () => cy.get(this.websSelectors.emailField),
        enterPassword: () => cy.get(this.websSelectors.pwdField),
        clickRegisterButton: () => cy.get(this.websSelectors.registerBtn),
        verifyRegistration: () => cy.get(this.websSelectors.registrationSuccess),
        clickLogOutButton: () => cy.get(this.websSelectors.logoutBtn)

    }
}