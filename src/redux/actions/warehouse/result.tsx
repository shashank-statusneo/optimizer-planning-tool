import { RESULT_API } from '../../../services/routes'
import { apiClient } from '../../../services/apiClient'
import {
    resetWarehouseResultData,
    updateResultStartDateValue,
    updateResultEndDateValue,
    postResult,
    postResultSuccess,
    postResultFailed,
    updateResultCategoriesValue,
    updateResultCategoryValue,
    updateResultTableValue,
} from '../../reducer/warehouse/result'

// @ts-ignore
export const resetWarehouseResultState = (payload) => async (dispatch) => {
    console.log('Calling action : resetWarehouseResultState()')
    // @ts-ignore
    await dispatch(resetWarehouseResultData(payload))
}

// @ts-ignore
export const updateResultStartDate = (payload) => async (dispatch) => {
    await dispatch(updateResultStartDateValue(payload))
}

// @ts-ignore
export const updateResultEndDate = (payload) => async (dispatch) => {
    await dispatch(updateResultEndDateValue(payload))
}

// @ts-ignore
export const postResultData = (payload) => async (dispatch) => {
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

// @ts-ignore
export const updateResultCategories = (payload) => async (dispatch) => {
    await dispatch(updateResultCategoriesValue(payload))
}

// @ts-ignore
export const updateResultCategory = (payload) => async (dispatch) => {
    await dispatch(updateResultCategoryValue(payload))
}

// @ts-ignore
export const updateResultTable = (payload) => async (dispatch) => {
    await dispatch(updateResultTableValue(payload))
}
