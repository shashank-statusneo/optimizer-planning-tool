import dayjs from 'dayjs'

const sampleDate = dayjs()

describe('Warehouse Selection', () => {
    beforeEach(() => {
        cy.intercept({
            method: 'GET',
            url: `${Cypress.env('apiUrl')}/wmp/warehouses`,
        }).as('warehouses')

        cy.logInTestUser()
    })

    it('Should be able to visit Warehouse Select Page', () => {
        cy.visit('warehouse/select')
        cy.contains('Select Warehouse')
    })

    it('Warehouses list must be available', () => {
        cy.visit('warehouse/select')

        // check if the api returns correct response
        cy.wait('@warehouses').then((interception) => {
            // 'interception' is an object with properties
            // 'id', 'request' and 'response'
            expect(interception.response).to.have.property('body')
            expect(interception.response?.body).to.be.a('Array')
            expect(interception.response?.body).to.have.lengthOf.greaterThan(0)
        })

        cy.get('#select-warehouse-dropdown').click()

        cy.get('[data-cy="select-element-0"]').as('selectedWarehouse')
        expect('@selectedWarehouse').to.exist
        cy.get('@selectedWarehouse').click()
    })

    it('Should have start and end date selectors', () => {
        cy.visit('warehouse/select')

        cy.get('[data-cy="planning-start-date-selector"]').within(() => {
            cy.get('input').as('startDate') // Only yield inputs within form
        })
        expect('@startDate').to.exist

        cy.get('[data-cy="planning-end-date-selector"]').within(() => {
            cy.get('input').as('endDate') // Only yield inputs within form
        })
        expect('@endDate').to.exist
    })

    it('Next Button should only be enabled with valid input', () => {
        /**
         * Conditions:
         * warehouse must be selected
         * start date should be equal or more than current date
         * end date should be equal or more than start date
         **/

        cy.visit('warehouse/select')

        cy.wait('@warehouses')

        // select next button
        cy.get('button').contains('Next').as('nextBtn')

        cy.get('@nextBtn').should('be.disabled')

        // select warehouse
        cy.get('#select-warehouse-dropdown').click()
        cy.get('[data-cy="select-element-0"]').as('selectedWarehouse')
        cy.get('@selectedWarehouse').click()
        cy.get('@nextBtn').should('be.disabled')

        // select start date
        cy.get('[data-cy="planning-start-date-selector"]').within(() => {
            cy.get('input').as('startDate') // Only yield inputs within form
        })

        // select end date
        cy.get('[data-cy="planning-end-date-selector"]').within(() => {
            cy.get('input').as('endDate') // Only yield inputs within form
        })

        // only start date is selected
        cy.get('@startDate').type(
            `{leftArrow}{leftArrow}${sampleDate
                .add(1, 'day')
                .format('MM/DD/YYYY')}`,
        )
        cy.get('@nextBtn').should('be.disabled')

        cy.get('@startDate').type('{del}{leftArrow}{del}{leftArrow}{del}')

        // only end date is selected
        cy.get('@endDate').type(
            `{leftArrow}{leftArrow}${sampleDate
                .add(1, 'day')
                .format('MM/DD/YYYY')}`,
        )
        cy.get('@nextBtn').should('be.disabled')

        // invalid input
        cy.get('@startDate').type(
            `{leftArrow}{leftArrow}${sampleDate
                .subtract(1, 'day')
                .format('MM/DD/YYYY')}`,
        )
        cy.get('@endDate').type(
            `{leftArrow}{leftArrow}${sampleDate
                .subtract(1, 'day')
                .format('MM/DD/YYYY')}`,
        )
        cy.get('@nextBtn').should('be.disabled')

        // valid input
        cy.get('@startDate').type(
            `{leftArrow}{leftArrow}${sampleDate
                .add(1, 'day')
                .format('MM/DD/YYYY')}`,
        )
        cy.get('@endDate').type(
            `{leftArrow}{leftArrow}${sampleDate
                .add(7, 'day')
                .format('MM/DD/YYYY')}`,
        )
        cy.get('@nextBtn').should('not.be.disabled')
    })
})
