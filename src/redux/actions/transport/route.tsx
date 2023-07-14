import { UPLOAD_ROUTE_API } from '../../../services/routes'
import { apiClientForForm } from '../../../services/apiClient'

import {
    resetRouteOptimizerData,
    postRoute,
    postDistanceMatrixSuccess,
    postSourceCoordinatesSuccess,
    postDestinationCoordinatesSuccess,
    postFleetDetailsSuccess,
    postVehicleAvailabiltySuccess,
    postOrderDetailsSuccess,
    postRouteFailed,
    updateObjectiveValue,
    updateRoundTripDistanceValue,
    updateMaxTripDistanceValue,
    updateMaxTripDurationValue,
    updateFixedComponentValue,
    updateVariableComponentPerOrderValue,
    updateVariableComponentPerHandlingUnitValue,
    updateInfiniteFleetSizeValue,
    updateFlagVehicleWeightCapacityValue,
    updateFlagVehicleVolumetricCapacityValue,
    updateFlagVehicleMaxOrderCapacityValue,
} from '../../reducer/transport/route'

// @ts-ignore
export const resetRouteOptimizerState = (payload) => async (dispatch) => {
    console.log('Calling action : resetRouteOptimizerState()')
    // @ts-ignore
    await dispatch(resetRouteOptimizerData(payload))
}

export const uploadRoute =
    // @ts-ignore
    (payload, fileType, fileName) => async (dispatch) => {
        console.log('Calling action : uploadRoute()')
        // @ts-ignore
        await dispatch(postRoute())
        try {
            const response = await apiClientForForm.post(
                UPLOAD_ROUTE_API,
                payload,
            )
            if (response.data && response.status === 201) {
                response.data.fileName = fileName

                switch (fileType) {
                    case 'distance_matrix':
                        return dispatch(
                            postDistanceMatrixSuccess(response.data),
                        )
                    case 'source_coordinates':
                        return dispatch(
                            postSourceCoordinatesSuccess(response.data),
                        )
                    case 'destination_coordinates':
                        return dispatch(
                            postDestinationCoordinatesSuccess(response.data),
                        )
                    case 'fleet_details':
                        return dispatch(postFleetDetailsSuccess(response.data))
                    case 'vehicle_availability':
                        return dispatch(
                            postVehicleAvailabiltySuccess(response.data),
                        )
                    case 'order_details':
                        return dispatch(postOrderDetailsSuccess(response.data))
                }
            }
            return dispatch(postRouteFailed(response))
        } catch (err) {
            return dispatch(postRouteFailed(err))
        }
    }

// @ts-ignore
export const updateObjective = (payload) => async (dispatch) => {
    await dispatch(updateObjectiveValue(payload))
}
// @ts-ignore
export const updateRoundTripDistance = (payload) => async (dispatch) => {
    await dispatch(updateRoundTripDistanceValue(payload))
}

// @ts-ignore
export const updateMaxTripDistance = (payload) => async (dispatch) => {
    await dispatch(updateMaxTripDistanceValue(payload))
}
// @ts-ignore
export const updateMaxTripDuration = (payload) => async (dispatch) => {
    await dispatch(updateMaxTripDurationValue(payload))
}
// @ts-ignore
export const updateFixedComponent = (payload) => async (dispatch) => {
    await dispatch(updateFixedComponentValue(payload))
}

export const updateVariableComponentPerOrder =
    // @ts-ignore
    (payload) => async (dispatch) => {
        await dispatch(updateVariableComponentPerOrderValue(payload))
    }
export const updateVariableComponentPerHandlingUnit =
    // @ts-ignore
    (payload) => async (dispatch) => {
        await dispatch(updateVariableComponentPerHandlingUnitValue(payload))
    }
export const updateInfiniteFleetSize =
    // @ts-ignore
    (payload) => async (dispatch) => {
        await dispatch(updateInfiniteFleetSizeValue(payload))
    }

export const updateFlagVehicleWeightCapacity =
    // @ts-ignore
    (payload) => async (dispatch) => {
        await dispatch(updateFlagVehicleWeightCapacityValue(payload))
    }
export const updateFlagVehicleVolumetricCapacity =
    // @ts-ignore
    (payload) => async (dispatch) => {
        await dispatch(updateFlagVehicleVolumetricCapacityValue(payload))
    }
export const updateFlagVehicleMaxOrderCapacity =
    // @ts-ignore
    (payload) => async (dispatch) => {
        await dispatch(updateFlagVehicleMaxOrderCapacityValue(payload))
    }
