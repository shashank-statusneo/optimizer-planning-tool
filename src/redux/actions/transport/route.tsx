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
