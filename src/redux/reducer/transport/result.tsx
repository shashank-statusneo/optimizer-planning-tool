import { createSlice } from '@reduxjs/toolkit'

// Define a type for the initial state
interface StateType {
    isLoading: boolean
    message: string
    result_id: any
    map_data: string
    table_data: any[]
    vehicle_ids: any[]
    order_ids: any[]
}

const initialState: StateType = {
    isLoading: false,
    message: '',
    result_id: null,
    map_data: '',
    table_data: [],
    vehicle_ids: [],
    order_ids: [],
}

export const routeOptimizerResult = createSlice({
    name: 'routeOptimizerResult',
    initialState,
    reducers: {
        resetRouteOptimizerResultData(state, action) {
            return {
                ...initialState,
            }
        },

        postRouteResult(state, action) {
            return {
                ...state,
                message: '',
                isLoading: true,
            }
        },

        postRouteResultSuccess(state, action) {
            return {
                ...state,
                result_id: action?.payload?.id,
                isLoading: false,
            }
        },

        postRouteResultFailed(state, action) {
            return {
                ...state,
                message: 'Create Route Plan Failed',
                isLoading: false,
            }
        },
        getRouteResult(state, action) {
            return {
                ...state,
                message: '',
                isLoading: true,
            }
        },

        getRouteResultSuccess(state, action) {
            const vehicle_ids: any = []
            const order_ids: any = []
            if (action?.payload?.routes && action?.payload?.routes.length > 0) {
                const vehicles = action?.payload?.routes
                    .map((item: any, index: any) => item.vehicle_id)
                    .filter(
                        (value: any, index: any, self: any) =>
                            self.indexOf(value) === index,
                    )
                vehicles.forEach((obj: any, index: any) => {
                    vehicle_ids.push({
                        id: index + 1,
                        name: obj,
                    })
                })
                const orders = action?.payload?.routes
                    .map((item: any) => item.order_id)
                    .filter(
                        (value: any, index: any, self: any) =>
                            self.indexOf(value) === index,
                    )
                orders.forEach((obj: any, index: any) => {
                    order_ids.push({
                        id: index + 1,
                        name: obj,
                    })
                })
            }

            return {
                ...state,
                map_data: action?.payload?.route_map,
                table_data: action?.payload?.routes,
                vehicle_ids: vehicle_ids,
                order_ids: order_ids,
                isLoading: false,
            }
        },

        getRouteResultFailed(state, action) {
            return {
                ...state,
                message: 'Route Result Fetch Failed',
                isLoading: false,
            }
        },
    },
})

export const {
    resetRouteOptimizerResultData,
    postRouteResult,
    postRouteResultSuccess,
    postRouteResultFailed,
    getRouteResult,
    getRouteResultSuccess,
    getRouteResultFailed,
} = routeOptimizerResult.actions

export default routeOptimizerResult.reducer
