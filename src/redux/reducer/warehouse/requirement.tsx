import { createSlice } from '@reduxjs/toolkit'

// Define a type for the initial state
interface StateType {
    percentage_absent_expected: number
    num_current_employees: number
    total_hiring_budget: number
    cost_per_employee_per_month: number
    day_working_hours: number
}

const initialState: StateType = {
    percentage_absent_expected: 0,
    num_current_employees: 0,
    total_hiring_budget: 0,
    cost_per_employee_per_month: 0,
    day_working_hours: 0,
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
