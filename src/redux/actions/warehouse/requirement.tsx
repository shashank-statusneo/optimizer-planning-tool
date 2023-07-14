import {
    resetWarehouseRequirementData,
    updatePercentageAbsentExpectedValue,
    updateNumCurrentEmployeesValue,
    updateTotalHiringBudgetValue,
    updateCostPerEmployeePerMonthValue,
    updateDayWorkingHoursValue,
} from '../../reducer/warehouse/requirement'

// @ts-ignore
export const resetWarehouseRequirementState = (payload) => async (dispatch) => {
    console.log('Calling action : resetWarehouseRequirementState()')
    // @ts-ignore
    await dispatch(resetWarehouseRequirementData(payload))
}

// @ts-ignore
export const updatePercentageAbsentExpected = (payload) => async (dispatch) => {
    await dispatch(updatePercentageAbsentExpectedValue(payload))
}
// @ts-ignore
export const updateNumCurrentEmployees = (payload) => async (dispatch) => {
    await dispatch(updateNumCurrentEmployeesValue(payload))
}
// @ts-ignore
export const updateTotalHiringBudget = (payload) => async (dispatch) => {
    await dispatch(updateTotalHiringBudgetValue(payload))
}
// @ts-ignore
export const updateCostPerEmployeePerMonth = (payload) => async (dispatch) => {
    await dispatch(updateCostPerEmployeePerMonthValue(payload))
}
// @ts-ignore
export const updateDayWorkingHours = (payload) => async (dispatch) => {
    await dispatch(updateDayWorkingHoursValue(payload))
}
