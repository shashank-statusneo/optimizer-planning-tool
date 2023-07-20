import { createSlice } from '@reduxjs/toolkit'

// Define a type for the initial state
interface StateType {
    isLoading: boolean
    message: string
    result_id: any
    map_data: string
    table_data: any[]
}

const initialState: StateType = {
    isLoading: false,
    message: '',
    result_id: null,
    map_data: '',
    table_data: [],
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
            console.log(action?.payload?.id)
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
            return {
                ...state,
                map_data: action?.payload?.route_map,
                table_data: action?.payload?.routes,
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
