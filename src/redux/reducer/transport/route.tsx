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
    objective: '',
    round_trip_distance: false,
    max_trip_distance: '',
    max_trip_duration: '',
    fixed_component: '',
    variable_component_per_order: '',
    variable_component_per_handling_unit: '',
    infinite_fleet_size: true,
    flag_vehicle_weight_capacity: true,
    flag_vehicle_volumetric_capacity: false,
    flag_vehicle_max_order_capacity: false,
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
        updateObjectiveValue(state, action) {
            return {
                ...state,
                objective: action?.payload,
            }
        },
        updateRoundTripDistanceValue(state, action) {
            return {
                ...state,
                round_trip_distance: action?.payload,
            }
        },
        updateMaxTripDistanceValue(state, action) {
            return {
                ...state,
                max_trip_distance: action?.payload,
            }
        },
        updateMaxTripDurationValue(state, action) {
            return {
                ...state,
                max_trip_duration: action?.payload,
            }
        },
        updateFixedComponentValue(state, action) {
            return {
                ...state,
                fixed_component: action?.payload,
            }
        },
        updateVariableComponentPerOrderValue(state, action) {
            return {
                ...state,
                variable_component_per_order: action?.payload,
            }
        },
        updateVariableComponentPerHandlingUnitValue(state, action) {
            return {
                ...state,
                variable_component_per_handling_unit: action?.payload,
            }
        },

        updateInfiniteFleetSizeValue(state, action) {
            return {
                ...state,
                infinite_fleet_size: action?.payload,
            }
        },

        updateFlagVehicleWeightCapacityValue(state, action) {
            return {
                ...state,
                flag_vehicle_weight_capacity: action?.payload,
            }
        },
        updateFlagVehicleVolumetricCapacityValue(state, action) {
            return {
                ...state,
                flag_vehicle_volumetric_capacity: action?.payload,
            }
        },
        updateFlagVehicleMaxOrderCapacityValue(state, action) {
            return {
                ...state,
                flag_vehicle_max_order_capacity: action?.payload,
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
} = routeOptimizer.actions

export default routeOptimizer.reducer
