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

// @ts-ignore
export const resetWarehouseSelectState = (payload) => async (dispatch) => {
    console.log('Calling action : resetWarehouseSelectState()')
    // @ts-ignore
    await dispatch(resetWarehouseSelectData(payload))
}

// @ts-ignore
export const getWarehouse = () => async (dispatch) => {
    console.log('Calling action : getWarehouse()')
    // @ts-ignore
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

// @ts-ignore
export const updatePlanningWarehouse = (payload) => async (dispatch) => {
    await dispatch(updatePlanningWarehouseValue(payload))
}

// @ts-ignore
export const updatePlanningStartDate = (payload) => async (dispatch) => {
    await dispatch(updatePlanningStartDateValue(payload))
}

// @ts-ignore
export const updatePlanningEndDate = (payload) => async (dispatch) => {
    await dispatch(updatePlanningEndDateValue(payload))
}
