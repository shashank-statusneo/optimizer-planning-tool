import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoading: false,
    message: '',
    distance_matrix_file_name: '',
    source_coordinates_file_name: '',
    destination_coordinate_file_name: '',
    fleet_details_file_name: '',
    vehicle_availability_file_name: '',
    order_details_file_name: '',
}

export const routeOptimizer = createSlice({
    name: 'routeOptimizer',
    initialState,
    reducers: {
        resetRouteOptimizerData(state, action) {
            return {
                ...initialState,
            }
        },
        postRoute(state, action) {
            return {
                ...state,
                message: '',
                isLoading: true,
            }
        },
        postDistanceMatrixSuccess(state, action) {
            return {
                ...state,
                distance_matrix_file_name: action?.payload?.fileName,
                isLoading: false,
            }
        },
        postSourceCoordinatesSuccess(state, action) {
            return {
                ...state,
                source_coordinates_file_name: action?.payload?.fileName,
                isLoading: false,
            }
        },
        postDestinationCoordinatesSuccess(state, action) {
            return {
                ...state,
                destination_coordinates_file_name: action?.payload?.fileName,
                isLoading: false,
            }
        },
        postFleetDetailsSuccess(state, action) {
            return {
                ...state,
                fleet_details_file_name: action?.payload?.fileName,
                isLoading: false,
            }
        },
        postVehicleAvailabiltySuccess(state, action) {
            return {
                ...state,
                vehicle_availability_file_name: action?.payload?.fileName,
                isLoading: false,
            }
        },
        postOrderDetailsSuccess(state, action) {
            return {
                ...state,
                order_details_file_name: action?.payload?.fileName,
                isLoading: false,
            }
        },
        postRouteFailed(state, action) {
            return {
                ...state,
                message: 'File Upload Failed',
                isLoading: false,
            }
        },
    },
})

export const {
    resetRouteOptimizerData,
    postRoute,
    postDistanceMatrixSuccess,
    postSourceCoordinatesSuccess,
    postDestinationCoordinatesSuccess,
    postFleetDetailsSuccess,
    postVehicleAvailabiltySuccess,
    postOrderDetailsSuccess,
    postRouteFailed,
} = routeOptimizer.actions

export default routeOptimizer.reducer
