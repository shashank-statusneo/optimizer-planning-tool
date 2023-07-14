import { apiClient } from '../../../services/apiClient'
import { ALGORITHM_API } from '../../../services/routes'

import {
    postAlgorithmApi,
    postAlgorithmApiSuccess,
    postAlgorithmApiFailed,
    updateInventoryStartDateValue,
    updateInventoryEndDateValue,
} from '../../reducer/inventory/result'

// @ts-ignore
export const algorithmApi = (payload) => async (dispatch) => {
    console.log('Calling action: algorithmApi()')

    // @ts-ignore
    await dispatch(postAlgorithmApi())
    try {
        const response = await apiClient.post(ALGORITHM_API, payload)
        if (response.data && response.status === 200) {
            return dispatch(postAlgorithmApiSuccess(response.data))
        }
        return dispatch(postAlgorithmApiFailed(response))
    } catch (err) {
        return dispatch(postAlgorithmApiFailed(err))
    }
}

// @ts-ignore
export const updateInventoryStartDate = (payload) => async (dispatch) => {
    await dispatch(updateInventoryStartDateValue(payload))
}

// @ts-ignore
export const updateInventoryEndDate = (payload) => async (dispatch) => {
    await dispatch(updateInventoryEndDateValue(payload))
}
