
export class userLogin {

    webSelectors = {
      shiftManagerLink: '.text-2xl > .text-blue-700',
      emailField: "input[placeholder='Email']",
      passwordField:"input[placeholder='Password']",
      loginButton:"button[type='submit']",
      logOutButton:".bg-red-500",
      forgotPwdLink: "a[class='text-sm text-blue-500 hover:underline']",
      forgotPasswordEmailfield: "input[placeholder='Enter your email']",
      resetButton: "button[class='p-2 rounded-md shadow-md bg-indigo-700 text-white px-5 mt-10 disabled:bg-indigo-500']"
      
    }

    pageAction = {
        clickshiftManagerLink: () => cy.get(this.webSelectors.shiftManagerLink),
        enterEmail: () => cy.get(this.webSelectors.emailField),
        enterPassword: () => cy.get(this.webSelectors.passwordField),
        clickLoginButton: () => cy.get(this.webSelectors.loginButton),
        clickLogOutButton: () => cy.get(this.webSelectors.logOutButton),
        clickforgetPwdLink: () => cy.get(this.webSelectors.forgotPwdLink),
        enterEmailForgotPwd: () => cy.get(this.webSelectors.forgotPasswordEmailfield),
        clickResetButton: () => cy.get(this.webSelectors.resetButton)


    }
}