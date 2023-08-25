import React, { useRef, MutableRefObject } from 'react'

import {
    PrimaryButton,
    NavigationBtn,
    FormUploadButton,
} from '../../src/components/Buttons'

describe('Tests Button Components', () => {
    it('Checks Primary Button', () => {
        const onClickSpy = cy.spy().as('onClickSpy')

        cy.mount(
            <PrimaryButton
                id='primary-test-btn'
                label='Primary Button'
                onClick={onClickSpy}
                disabled={false}
            />,
        )
        cy.get('button').should('be.visible')
        cy.get('button').should('not.be.disabled')

        cy.mount(
            <PrimaryButton
                id='primary-test-btn'
                label='Primary Button'
                onClick={onClickSpy}
                disabled={true}
            />,
        )
        cy.get('button').should('be.visible')
        cy.get('button').should('be.disabled')
    })

    it('Checks NavigationBtn Button', () => {
        const onClickSpy = cy.spy().as('onClickSpy')

        cy.mount(
            <NavigationBtn
                id='navigation-test-btn'
                label='Navigation Button'
                onClick={onClickSpy}
                disabled={false}
                render={true}
            />,
        )
        cy.get('button').should('not.be.disabled')
        cy.get('button').should('be.visible')

        cy.mount(
            <NavigationBtn
                id='navigation-test-btn'
                label='Navigation Button'
                onClick={onClickSpy}
                disabled={false}
                render={false}
            />,
        )
        cy.get('button').should('not.exist')

        cy.mount(
            <NavigationBtn
                id='navigation-test-btn'
                label='Navigation Button'
                onClick={onClickSpy}
                disabled={true}
                render={true}
            />,
        )
        cy.get('button').should('be.visible')
        cy.get('button').should('be.disabled')
    })

    it('Checks FormUploadButton Button', () => {
        const onClickSpy = cy.spy().as('onClickSpy')
        const testingRef = {}
        cy.mount(
            <FormUploadButton
                id='form-upload-test-btn'
                label='Form Upload Button'
                fileRef={testingRef}
                loader={false}
                onChange={onClickSpy}
                disabled={false}
            />,
        )
        cy.get('button').should('be.visible')
        cy.get('button').should('not.be.disabled')
        cy.get('button').click()

        cy.mount(
            <FormUploadButton
                id='form-upload-test-btn'
                label='Form Upload Button'
                fileRef={testingRef}
                loader={false}
                onChange={onClickSpy}
                disabled={true}
            />,
        )
        cy.get('button').should('be.visible')
        cy.get('button').should('be.disabled')
    })
})
