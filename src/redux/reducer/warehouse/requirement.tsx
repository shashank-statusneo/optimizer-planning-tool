import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    percentage_absent_expected: '',
    num_current_employees: '',
    total_hiring_budget: '',
    cost_per_employee_per_month: '',
    day_working_hours: '',
}

// @ts-ignore
export const warehouseRequirement = createSlice({
    name: 'warehouseRequirement',
    initialState,
    reducers: {
        resetWarehouseRequirementData(state, action) {
            return {
                ...initialState,
            }
        },

        updatePercentageAbsentExpectedValue(state, action) {
            return {
                ...state,
                percentage_absent_expected: action?.payload,
            }
        },

        updateNumCurrentEmployeesValue(state, action) {
            return {
                ...state,
                num_current_employees: action?.payload,
            }
        },

        updateTotalHiringBudgetValue(state, action) {
            return {
                ...state,
                total_hiring_budget: action?.payload,
            }
        },

        updateCostPerEmployeePerMonthValue(state, action) {
            return {
                ...state,
                cost_per_employee_per_month: action?.payload,
            }
        },

        updateDayWorkingHoursValue(state, action) {
            return {
                ...state,
                day_working_hours: action?.payload,
            }
        },
    },
})

export const {
    resetWarehouseRequirementData,
    updatePercentageAbsentExpectedValue,
    updateNumCurrentEmployeesValue,
    updateTotalHiringBudgetValue,
    updateCostPerEmployeePerMonthValue,
    updateDayWorkingHoursValue,
} = warehouseRequirement.actions

export default warehouseRequirement.reducer
