import dayjs from 'dayjs'

import {
    updatePlanningWarehouse,
    updatePlanningStartDate,
    updatePlanningEndDate,
} from '../../../../../src/redux/actions/warehouse/select'

describe('Warehouse Demand', () => {
    beforeEach(() => {
        cy.intercept(
            {
                method: 'GET',
                url: `${Cypress.env('apiUrl')}/wmp/demands/*`,
            },
            { fixture: 'warehouse/demand.json' },
        ).as('warehousesDemands')

        cy.logInTestUser()
    })

    it('Should be able to visit Warehouse Demand Page', () => {
        cy.visit('warehouse/demand')

        cy.window()
            .its('store')
            .invoke(
                'dispatch',
                updatePlanningWarehouse({
                    created_at: 'Mon, 14 Aug 2023 14:43:23 GMT',
                    created_by: null,
                    description: 'Warehouse H',
                    id: 1,
                    name: 'Warehouse H',
                    updated_at: null,
                    updated_by: null,
                }),
                'dispatch',
            )
        cy.window()
            .its('store')
            .invoke('dispatch', updatePlanningStartDate(dayjs().add(1, 'day')))
        cy.window()
            .its('store')
            .invoke('dispatch', updatePlanningEndDate(dayjs().add(7, 'day')))

        cy.window().its('store').invoke('getState').as('redux-store')

        cy.wait('@warehousesDemands')
    })
})
