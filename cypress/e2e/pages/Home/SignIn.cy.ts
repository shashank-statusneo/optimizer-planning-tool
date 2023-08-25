describe('Successfull Login', () => {
    beforeEach(() => {
        cy.visit('signin')
        cy.get('#user-email-textfield').type(Cypress.env('defaultTestEmail'))
        cy.get('#user-password-textfield').type(
            Cypress.env('defaultTestPassword'),
            { log: false },
        )
        cy.get('#sign-in-submit-btn').click()
    })

    it('Should redirect to Welcome Page', () => {
        cy.location('pathname').should('include', '/welcome')
    })
})

describe('Unsuccessfull Login with incorrect password', () => {
    beforeEach(() => {
        cy.visit('signin')
        cy.get('#user-email-textfield').type(Cypress.env('defaultTestEmail'))
        cy.get('#user-password-textfield').type(
            Cypress.env('defaultIncorrectTestPassword'),
            { log: false },
        )
        cy.get('#sign-in-submit-btn').click()
    })

    it('Should throw an error', () => {
        cy.get('#default-snackbar-element').contains('User login failed')
    })

    it('Should throw wrong password error', () => {
        cy.get('#default-snackbar-element').contains('wrong password')
    })

    it('Should not redirect to Welcome Page', () => {
        cy.location('pathname').should('not.include', '/welcome')
    })
})

describe('Unsuccessfull Login with incorrect email', () => {
    beforeEach(() => {
        cy.visit('signin')
        cy.get('#user-email-textfield').type(
            Cypress.env('defaultIncorrectTestEmail'),
        )
        cy.get('#user-password-textfield').type(
            Cypress.env('defaultTestPassword'),
            { log: false },
        )
        cy.get('#sign-in-submit-btn').click()
    })

    it('Should throw an error', () => {
        cy.get('#default-snackbar-element').contains('User login failed')
    })

    it('Should throw user not found error', () => {
        cy.get('#default-snackbar-element').contains('user not found')
    })

    it('Should not redirect to Welcome Page', () => {
        cy.location('pathname').should('not.include', '/welcome')
    })
})
