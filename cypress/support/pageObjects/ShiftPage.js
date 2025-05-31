
export class shiftPage {

    webSelector = {
       titleField: '#title',
       descriptionField:'#description',
       postShiftButton: "button[type='submit']"
    }

    pageAction = {
       enterTitleField: () => cy.get(this.webSelector.titleField),
       enterdescriptionField: () => cy.get(this.webSelector.descriptionField),
       clickpostShiftButton: () => cy.get(this.webSelector.postShiftButton)
    }

}