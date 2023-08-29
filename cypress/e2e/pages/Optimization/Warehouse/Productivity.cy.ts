describe('Warehouse Productivity', () => {
    beforeEach(() => {
        cy.intercept(
            {
                method: 'GET',
                url: `${Cypress.env('apiUrl')}/wmp/benchmark_productivity/*`,
            },
            { fixture: 'warehouse/benchmark_productivity.json' },
        ).as('warehouses')

        cy.logInTestUser()
    })

    it('Should be able to visit Warehouse Productivity Page', () => {
        cy.visit('warehouse/benchmark')
        cy.contains('Upload benchmark productivity')
    })

    it('Should be able to upload a file', () => {
        cy.visit('warehouse/benchmark')

        // select upload button
        cy.get('button').contains('CHOOSE FILE').as('uploadBtn')

        cy.get('@uploadBtn').should('be.enabled')

        cy.get('@uploadBtn').click()
    })
})
