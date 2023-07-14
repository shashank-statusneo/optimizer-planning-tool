import { apiClient } from '../../../services/apiClient'
import { SIMULATION_API } from '../../../services/routes'

import {
    postSimulationApi,
    postSimulationApiSuccess,
    postSimulationApiFailed,
    updateReorderPointValue,
    updateAvgLeadTimeValue,
    updateReorderQtyValue,
    updateSdOfLeadTimeValue,
} from '../../reducer/inventory/simulator'

// @ts-ignore
export const simulationApi = (payload) => async (dispatch) => {
    console.log('Calling action: simulationApi()')

    // @ts-ignore
    await dispatch(postSimulationApi())
    try {
        const response = await apiClient.post(SIMULATION_API, payload)
        if (response.data && response.status === 200) {
            return dispatch(postSimulationApiSuccess(response.data))
        }
        return dispatch(postSimulationApiFailed(response))
    } catch (err) {
        return dispatch(postSimulationApiFailed(err))
    }
}

// @ts-ignore
export const updateReorderPoint = (payload) => async (dispatch) => {
    await dispatch(updateReorderPointValue(payload))
}

// @ts-ignore
export const updateAvgLeadTime = (payload) => async (dispatch) => {
    await dispatch(updateAvgLeadTimeValue(payload))
}
// @ts-ignore
export const updateReorderQty = (payload) => async (dispatch) => {
    await dispatch(updateReorderQtyValue(payload))
}
// @ts-ignore
export const updateSdOfLeadTime = (payload) => async (dispatch) => {
    await dispatch(updateSdOfLeadTimeValue(payload))
}
