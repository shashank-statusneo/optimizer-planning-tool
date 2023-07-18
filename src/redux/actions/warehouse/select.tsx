import { GET_WAREHOUSE_API } from '../../../services/routes'

import { apiClient } from '../../../services/apiClient'

import {
    resetWarehouseSelectData,
    getWarehouses,
    getWarehousesSuccess,
    getWarehousesFailed,
    updatePlanningWarehouseValue,
    updatePlanningStartDateValue,
    updatePlanningEndDateValue,
} from '../../reducer/warehouse/select'

export const resetWarehouseSelectState =
    (payload: any) =>
    async (dispatch: any): Promise<any> => {
        console.log('Calling action : resetWarehouseSelectState()')
        await dispatch(resetWarehouseSelectData(payload))
    }

export const getWarehouse =
    () =>
    async (dispatch: any): Promise<any> => {
        console.log('Calling action : getWarehouse()')
        await dispatch(getWarehouses())
        try {
            const response = await apiClient.get(GET_WAREHOUSE_API)
            if (response.status === 200) {
                return dispatch(getWarehousesSuccess(response.data))
            }
            return dispatch(getWarehousesFailed(response))
        } catch (err) {
            return dispatch(getWarehousesFailed(err))
        }
    }

export const updatePlanningWarehouse =
    (payload: any) =>
    async (dispatch: any): Promise<any> => {
        await dispatch(updatePlanningWarehouseValue(payload))
    }

export const updatePlanningStartDate =
    (payload: any) =>
    async (dispatch: any): Promise<any> => {
        await dispatch(updatePlanningStartDateValue(payload))
    }

export const updatePlanningEndDate =
    (payload: any) =>
    async (dispatch: any): Promise<any> => {
        await dispatch(updatePlanningEndDateValue(payload))
    }
