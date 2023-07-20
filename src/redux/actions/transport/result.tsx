import { ROUTE_PLAN_API } from '../../../services/routes'
import { apiClient } from '../../../services/apiClient'

import {
    resetRouteOptimizerResultData,
    postRouteResult,
    postRouteResultSuccess,
    postRouteResultFailed,
    getRouteResult,
    getRouteResultSuccess,
    getRouteResultFailed,
} from '../../reducer/transport/result'

// @ts-ignore
export const resetRouteOptimizerResultState = (payload) => async (dispatch) => {
    console.log('Calling action : resetRouteOptimizerResultState()')
    // @ts-ignore
    await dispatch(resetRouteOptimizerResultData(payload))
}

export const createRoutePlan =
    (payload: any) =>
    async (dispatch: any): Promise<any> => {
        console.log('Calling action : createRoutePlan()')
        // @ts-ignore
        await dispatch(postRouteResult())
        try {
            const response = await apiClient.post(ROUTE_PLAN_API, payload)
            if (response.data && response.status === 201) {
                return dispatch(postRouteResultSuccess(response.data))
            }
            return dispatch(postRouteResultFailed(response))
        } catch (err) {
            return dispatch(postRouteResultFailed(err))
        }
    }

export const getRoutePlan =
    (payload: any) =>
    async (dispatch: any): Promise<any> => {
        console.log('Calling action : getRoutePlan()')
        // @ts-ignore
        await dispatch(getRouteResult())
        try {
            const response = await apiClient.get(`${ROUTE_PLAN_API}/${payload}`)
            if (response.data && response.status === 200) {
                return dispatch(getRouteResultSuccess(response.data))
            }
            return dispatch(getRouteResultFailed(response))
        } catch (err) {
            return dispatch(getRouteResultFailed(err))
        }
    }
