import {
    UPLOAD_PRODUCTIVITY_FILE_API,
    BENCHMARK_PRODUCTIVITY_API,
} from '../../../services/routes'

import { apiClient, apiClientForForm } from '../../../services/apiClient'

import {
    resetWarehouseProductivityData,
    postProductivity,
    postProductivitySuccess,
    postProductivityFailed,
    getBenchmarkProductivity,
    getBenchmarkProductivitySuccess,
    getBenchmarkProductivityFailed,
    putBenchmarkProductivity,
    putBenchmarkProductivitySuccess,
    putBenchmarkProductivityFailed,
    updateFlagProductivityTableUpdatedValue,
} from '../../reducer/warehouse/productivity'

export const resetWarehouseProductivityState =
    // @ts-ignore
    (payload) => async (dispatch) => {
        console.log('Calling action : resetWarehouseProductivityState()')
        // @ts-ignore
        await dispatch(resetWarehouseProductivityData(payload))
    }

export const uploadProductivityFile =
    // @ts-ignore
    (payload, id, fileName) => async (dispatch) => {
        console.log('Calling action : uploadProductivityFile()')
        // @ts-ignore
        await dispatch(postProductivity())
        try {
            const response = await apiClientForForm.post(
                `${UPLOAD_PRODUCTIVITY_FILE_API}/${id}`,
                payload,
            )
            if (response.status === 201) {
                response.data.fileName = fileName
                await dispatch(postProductivitySuccess(response.data))
                return dispatch(getBenchmarkProductivityData(id))
            }
            return dispatch(postProductivityFailed(response))
        } catch (err: any) {
            const error = err?.response?.data ? err?.response?.data : err
            return dispatch(postProductivityFailed(error))
        }
    }

// @ts-ignore
export const getBenchmarkProductivityData = (id) => async (dispatch) => {
    console.log('Calling action : getBenchmarkProductivityData()')
    // @ts-ignore
    await dispatch(getBenchmarkProductivity())
    try {
        const response = await apiClient.get(
            `${BENCHMARK_PRODUCTIVITY_API}/${id}`,
        )
        if (response.status === 200) {
            return dispatch(getBenchmarkProductivitySuccess(response.data))
        }
        return dispatch(getBenchmarkProductivityFailed(response))
    } catch (err) {
        return dispatch(getBenchmarkProductivityFailed(err))
    }
}

export const putBenchmarkProductivityData =
    // @ts-ignore
    (payload, data) => async (dispatch) => {
        console.log('Calling action : putBenchmarkProductivityData()')
        // @ts-ignore
        await dispatch(putBenchmarkProductivity())
        try {
            const response = await apiClient.put(
                BENCHMARK_PRODUCTIVITY_API,
                payload,
            )
            if (response.status === 200) {
                return dispatch(putBenchmarkProductivitySuccess(data))
            }
            return dispatch(putBenchmarkProductivityFailed(response))
        } catch (err) {
            return dispatch(putBenchmarkProductivityFailed(err))
        }
    }

export const updateFlagProductivityTableUpdated =
    // @ts-ignore
    (payload) => async (dispatch) => {
        await dispatch(updateFlagProductivityTableUpdatedValue(payload))
    }
