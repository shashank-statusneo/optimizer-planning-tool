import dayjs from 'dayjs'

import {
    FormBackdropElement,
    FormSnackBarElement,
    FormAlertElement,
    FormTextField,
    FormLabel,
    FormSubText,
    FormSubLabel,
    FormSubLabel2,
    FormSwitchBtn,
    FormDropDown,
    FormMultiDropDown,
    FormDateSelector,
    InventoryFormCard,
    FormCardField,
    FormRadioButton,
    CustomFormRadioButton,
} from '../../src/components/FormElements'

// FormBackdropElement
describe('Tests Form Backdrop element', () => {
    it('Should not render', () => {
        cy.mount(<FormBackdropElement loader={false} />)

        cy.get('svg').should('not.be.visible')
    })
    it('Should render', () => {
        cy.mount(<FormBackdropElement loader={true} />)
        cy.get('svg').should('be.visible')
    })
})

// FormSnackBarElement
describe('Tests Form Snackbar element', () => {
    it('Correct message should render', () => {
        const onCloseSpy = cy.spy().as('onCloseSpy')

        cy.mount(
            <FormSnackBarElement
                message={'Correct Error Message'}
                onClose={onCloseSpy}
            />,
        )

        cy.get('div').contains('Correct Error Message').should('exist')
    })

    it('Incorrect message should render', () => {
        const onCloseSpy = cy.spy().as('onCloseSpy')

        cy.mount(
            <FormSnackBarElement
                message={'Correct Error Message'}
                onClose={onCloseSpy}
            />,
        )

        cy.get('div').contains('Incorrect Error Message').should('not.exist')
    })

    it('Should close after 6000 ms', () => {
        const onCloseSpy = cy.spy().as('onCloseSpy')

        cy.mount(
            <FormSnackBarElement
                message={'Error Message'}
                onClose={onCloseSpy}
            />,
        )

        cy.wait(6000)
        cy.get('@onCloseSpy').should('have.been.called')
    })

    it('Should not close before 6000 ms', () => {
        const onCloseSpy = cy.spy().as('onCloseSpy')

        cy.mount(
            <FormSnackBarElement
                message={'Error Message'}
                onClose={onCloseSpy}
            />,
        )

        // checked for only 1000 ms as cypress waits for another 4000 ms to timeout
        cy.wait(1000)
        cy.get('@onCloseSpy').should('not.have.been.called')
    })
})

// FormAlertElement
describe('Tests Form Alert element', () => {
    it('Should not render', () => {
        const onClickSpy1 = cy.spy().as('onClickSpy1')
        const onClickSpy2 = cy.spy().as('onClickSpy2')
        const onCloseSpy = cy.spy().as('onCloseSpy')

        cy.mount(
            <FormAlertElement
                id='alert-id'
                label='Alert label'
                title='Alert title'
                open={false}
                onClose={onCloseSpy}
                content='Alert content'
                buttons={[
                    { label: 'Option 1', onClick: onClickSpy1 },
                    { label: 'Option 2', onClick: onClickSpy2 },
                ]}
            />,
        )

        cy.get('#alert-id').should('not.exist')
    })
    it('Should render', () => {
        const onClickSpy1 = cy.spy().as('onClickSpy1')
        const onClickSpy2 = cy.spy().as('onClickSpy2')
        const onCloseSpy = cy.spy().as('onCloseSpy')

        cy.mount(
            <FormAlertElement
                id='alert-id'
                label='Alert label'
                title='Alert title'
                open={true}
                onClose={onCloseSpy}
                content='Alert content'
                buttons={[
                    { label: 'Option 1', onClick: onClickSpy1 },
                    { label: 'Option 2', onClick: onClickSpy2 },
                ]}
            />,
        )

        cy.get('#alert-id').should('exist').contains('Alert title')
    })

    it('Options should work', () => {
        const onClickSpy1 = cy.spy().as('onClickSpy1')
        const onClickSpy2 = cy.spy().as('onClickSpy2')
        const onCloseSpy = cy.spy().as('onCloseSpy')

        cy.mount(
            <FormAlertElement
                id='alert-id'
                label='Alert label'
                title='Alert title'
                open={true}
                onClose={onCloseSpy}
                content='Alert content'
                buttons={[
                    { label: 'Option 1', onClick: onClickSpy1 },
                    { label: 'Option 2', onClick: onClickSpy2 },
                ]}
            />,
        )

        cy.get('button')
            .contains('Option 1')
            .should('exist')
            .should('not.be.disabled')
            .click()
        cy.get('button')
            .contains('Option 2')
            .should('exist')
            .should('not.be.disabled')
            .click()
        cy.get('button').contains('Option 3').should('not.exist')

        cy.get('@onClickSpy1').should('have.been.called')
        cy.get('@onClickSpy2').should('have.been.called')
    })
})

// Form FormTextField
describe('Tests Form Text element', () => {
    it('Should render and input should work', () => {
        const onChangeSpy = cy.spy().as('onChangeSpy')

        cy.mount(
            <FormTextField
                id='textfield-id'
                value='Text Field Value'
                type='text'
                label='Text Field Label'
                placeholder='Text Field Placeholder'
                onChange={onChangeSpy}
                error={false}
                onErrorMessage='Text Field on error message'
                disabled={false}
                size={'small'}
            />,
        )

        cy.get('input').should('be.visible')

        cy.get('input').type('New Text')
        cy.get('@onChangeSpy').should('have.been.called')
    })
})

// Form FormLabel
describe('Tests Form Label element', () => {
    it('Should render', () => {
        cy.mount(<FormLabel label='Form Label' />)

        cy.get('h6').contains('Form Label').should('be.visible')
        cy.get('h6').contains('Incorrect Form Label').should('not.exist')
    })
})

// Form FormSubText
describe('Tests Form Subtext element', () => {
    it('Should render', () => {
        cy.mount(<FormSubText subText='Form Subtext' />)

        cy.get('span').contains('Form Subtext').should('be.visible')
        cy.get('span').contains('Incorrect Form Subtext').should('not.exist')
    })
})

// Form FormSubLabel
describe('Tests Form Sub Label element', () => {
    it('Should render', () => {
        cy.mount(<FormSubLabel label='Form Sub Label' />)

        cy.get('h6').contains('Form Sub Label').should('be.visible')
        cy.get('h6').contains('Incorrect Form Sub Label').should('not.exist')
    })
})

// Form FormSubLabel2
describe('Tests Form Sub Label 2 element', () => {
    it('Should render', () => {
        cy.mount(<FormSubLabel2 label='Form Sub Label 2' />)

        cy.get('p').contains('Form Sub Label 2').should('be.visible')
        cy.get('p').contains('Incorrect Form Sub Label 2').should('not.exist')
    })
})

// Form FormSwitchBtn
describe('Tests Form Switch Button element', () => {
    it('Should render as enabled', () => {
        const onChangeSpy = cy.spy().as('onChangeSpy')

        cy.mount(
            <FormSwitchBtn
                label='Form Switch Button Label'
                value={true}
                position='start'
                onChange={onChangeSpy}
                defaultChecked={true}
            />,
        )

        cy.get('input')
            .invoke('prop', 'checked')
            .then((state) => {
                expect(state).to.be.true
            })
    })
    it('Should render as disabled', () => {
        const onChangeSpy = cy.spy().as('onChangeSpy')

        cy.mount(
            <FormSwitchBtn
                label='Form Switch Button Label'
                value={false}
                position='start'
                onChange={onChangeSpy}
                defaultChecked={false}
            />,
        )

        cy.get('input')
            .invoke('prop', 'checked')
            .then((state) => {
                expect(state).to.be.false
            })
    })
    it('Switch should work', () => {
        const onChangeSpy = cy.spy().as('onChangeSpy')

        cy.mount(
            <FormSwitchBtn
                label='Form Switch Button Label'
                value={false}
                position='start'
                onChange={onChangeSpy}
                defaultChecked={false}
            />,
        )

        cy.get('input')
            .invoke('prop', 'checked')
            .then((state) => {
                expect(state).to.be.false
            })

        cy.get('input').click()
        cy.get('@onChangeSpy').should('have.been.called')

        cy.get('input')
            .invoke('prop', 'checked')
            .then((state) => {
                expect(state).to.be.true
            })

        cy.get('input').click()
        cy.get('@onChangeSpy').should('have.been.called')

        cy.get('input')
            .invoke('prop', 'checked')
            .then((state) => {
                expect(state).to.be.false
            })
    })
})

// Form FormDropDown
describe('Tests Form Drop Down element', () => {
    const value = {
        id: 1,
    }

    const data = [
        {
            id: 1,
            name: 'Option 1',
        },
        {
            id: 2,
            name: 'Option 2',
        },
        {
            id: 3,
            name: 'Option 3',
        },
    ]
    it('Should render and options work', () => {
        const onChangeSpy = cy.spy().as('onChangeSpy')
        const onClearSpy = cy.spy().as('onClearSpy')

        cy.mount(
            <FormDropDown
                id='form-dropdown-id'
                labelId='form-dropdown-label-id'
                label='Form Dropdown Label'
                value={value}
                data={data}
                onChange={onChangeSpy}
                displayClearBtn={true}
                handleClearClick={onClearSpy}
            />,
        )

        cy.get('#form-dropdown-id').should('exist')
        cy.get('div').contains('Option 1').should('exist').click()

        cy.get('ul').should('exist').as('dropDownList')

        cy.get('@dropDownList').children().should('have.lengthOf', 3)

        cy.get('li').contains('Option 2').should('exist').click()
        cy.get('@onChangeSpy').should('have.been.called')

        cy.get('li').contains('Option 3').should('exist').click()
        cy.get('@onChangeSpy').should('have.been.called')

        cy.get('li').contains('Option 4').should('not.exist')
    })
})

// Form FormMultiDropDown
describe('Tests Form Multi Drop Down element', () => {
    const value = ['Option 1', 'Option 2']

    const data = ['Option 1', 'Option 2', 'Option 3', 'Option 4']

    it('Should render and options work', () => {
        const onChangeSpy = cy.spy().as('onChangeSpy')

        cy.mount(
            <FormMultiDropDown
                id='form-multi-dropdown-id'
                labelId='form-multi-dropdown-label-id'
                label='Form Multi Dropdown Label'
                value={value}
                data={data}
                onChange={onChangeSpy}
            />,
        )

        cy.get('#form-multi-dropdown-id').should('exist')
        cy.get('div').contains('Option 1, Option 2').should('exist').click()

        cy.get('ul').should('exist').as('dropDownList')

        cy.get('@dropDownList').children().should('have.lengthOf', 4)

        cy.get('li').contains('Option 3').should('exist').click()
        cy.get('@onChangeSpy').should('have.been.called')

        cy.get('li').contains('Option 4').should('exist').click()
        cy.get('@onChangeSpy').should('have.been.called')

        cy.get('li').contains('Option 5').should('not.exist')
    })
})

// Form FormDateSelector
describe('Tests Form Date Selector element', () => {
    it('Should render and date typing/selection work', () => {
        const onChangeSpy = cy.spy().as('onChangeSpy')

        cy.mount(
            <FormDateSelector
                label='Date Selector Label'
                value={dayjs()}
                onChange={onChangeSpy}
                minDate={dayjs()}
            />,
        )

        cy.get('input')
            .should('exist')
            .should('not.be.disabled')
            .as('dateField')

        cy.get('@dateField').type(
            `{leftArrow}{leftArrow}${dayjs()
                .add(1, 'day')
                .format('MM/DD/YYYY')}`,
        )

        cy.get('@onChangeSpy').should('have.been.called')
        // pop-up does not exist
        cy.get('[data-testid="sentinelEnd"]').should('not.exist')

        cy.get('button')
            .should('exist')
            .should('not.be.disabled')
            .as('dateSelector')

        cy.get('@dateSelector').click()
        // pop-up does exist
        cy.get('[data-testid="sentinelEnd"]').should('exist')

        cy.get('button').last().should('exist').click()
        cy.get('@onChangeSpy').should('have.been.called')
    })
})

// Form InventoryFormCard
describe('Tests Form Inventory card element', () => {
    it('Should render', () => {
        cy.mount(
            <InventoryFormCard
                label='Inventory Card Label'
                value='Inventory Card Value'
            />,
        )

        cy.get('h4').contains('Inventory Card Value').should('exist')
        cy.get('p').contains('Inventory Card Label').should('exist')
    })
})

describe('Tests Form card Field element', () => {
    const items = [
        {
            value: 'Value 1',
            label: 'Label 1',
        },
        {
            value: 'Value 2',
            label: 'Label 2',
        },
        {
            value: 'Value 3',
            label: 'Label 3',
        },
    ]

    it('Should render', () => {
        cy.mount(<FormCardField items={items} />)

        cy.get('h4').contains('Value 1').should('exist')
        cy.get('p').contains('Label 1').should('exist')

        cy.get('h4').contains('Value 2').should('exist')
        cy.get('p').contains('Label 2').should('exist')

        cy.get('h4').contains('Value 3').should('exist')
        cy.get('p').contains('Label 3').should('exist')

        cy.get('h4').contains('Value 4').should('not.exist')
        cy.get('p').contains('Label 4').should('not.exist')
    })
})

describe('Tests Form Radio Button element', () => {
    const options = { option1: 'Option 1', option2: 'Option 2' }

    it('Should render', () => {
        const onChangeSpy = cy.spy().as('onChangeSpy')

        cy.mount(
            <FormRadioButton
                id='form-radio-button-id'
                identifier={true}
                options={options}
                onChange={onChangeSpy}
            />,
        )

        cy.get('input').should('have.lengthOf', 2)

        cy.get('input').last().click()
        cy.get('@onChangeSpy').should('have.been.called')
    })

    it('Options should work', () => {
        const onChangeSpy = cy.spy().as('onChangeSpy')

        cy.mount(
            <FormRadioButton
                id='form-radio-button-id'
                identifier={true}
                options={options}
                onChange={onChangeSpy}
            />,
        )

        cy.get('input').first().should('exist').should('be.checked')

        cy.get('input').last().should('exist').should('not.be.checked')

        cy.mount(
            <FormRadioButton
                id='form-radio-button-id'
                identifier={false}
                options={options}
                onChange={onChangeSpy}
            />,
        )

        cy.get('input').first().should('exist').should('not.be.checked')

        cy.get('input').last().should('exist').should('be.checked')
    })
})

describe('Tests Form Custom Radio Button element', () => {
    it('Should render', () => {
        const onChangeSpy = cy.spy().as('onChangeSpy')

        const onChangeSpy1 = cy.spy().as('onChangeSpy1')
        const onChangeSpy2 = cy.spy().as('onChangeSpy2')
        const options = { option1: 'Option 1', option2: 'Option 2' }

        const textFields = [
            {
                id: 'option-id-one',
                value: 'Option 1',
                type: 'number' as const,
                onChange: onChangeSpy1,
                error: false,
                onErrorMessage: '',
                disabled: false,
                sx: {},
            },
            {
                id: 'option-id-two',
                value: 'Option 2',
                type: 'number' as const,
                onChange: onChangeSpy2,
                error: false,
                onErrorMessage: '',
                disabled: false,
                sx: {},
            },
        ]

        cy.mount(
            <CustomFormRadioButton
                id='form-radio-button-id'
                identifier={true}
                options={options}
                textFieldsProps={textFields}
                onChange={onChangeSpy}
            />,
        )

        cy.get('input').should('have.lengthOf', 4)

        cy.get('input').eq(2).click()
        cy.get('@onChangeSpy').should('have.been.called')
    })
})
