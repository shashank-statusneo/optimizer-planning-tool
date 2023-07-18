import { RESULT_API } from '../../../services/routes'
import { apiClient } from '../../../services/apiClient'
import {
    resetWarehouseResultData,
    updateResultStartDateValue,
    updateResultEndDateValue,
    postResult,
    postResultSuccess,
    postResultFailed,
    updateResultCategoryValue,
    updateResultTableValue,
} from '../../reducer/warehouse/result'

export const resetWarehouseResultState =
    (payload: any) =>
    async (dispatch: any): Promise<any> => {
        console.log('Calling action : resetWarehouseResultState()')
        await dispatch(resetWarehouseResultData(payload))
    }

export const updateResultStartDate =
    (payload: any) =>
    async (dispatch: any): Promise<any> => {
        await dispatch(updateResultStartDateValue(payload))
    }

export const updateResultEndDate =
    (payload: any) =>
    async (dispatch: any): Promise<any> => {
        await dispatch(updateResultEndDateValue(payload))
    }

interface warehouseResultApiSchema {
    plan_from_date: string
    plan_to_date: string
    num_current_employees: number
    day_working_hours: number
    warehouse_id: number
    cost_per_employee_per_month: number
    percentage_absent_expected: number
    total_hiring_budget: number
}

export const postResultData =
    (payload: warehouseResultApiSchema) =>
    async (dispatch: any): Promise<any> => {
        console.log('Calling action : postResultData()')
        // @ts-ignore
        await dispatch(postResult())
        try {
            const response = await apiClient.post(RESULT_API, payload)
            if (response.status === 200) {
                return dispatch(postResultSuccess(response.data))
            }
            return dispatch(postResultFailed(response))
        } catch (err) {
            return dispatch(postResultFailed(err))
        }
    }

export const updateResultCategory =
    (payload: string[]) =>
    async (dispatch: any): Promise<any> => {
        await dispatch(updateResultCategoryValue(payload))
    }

export const updateResultTable =
    (payload: any) =>
    async (dispatch: any): Promise<any> => {
        await dispatch(updateResultTableValue(payload))
    }
