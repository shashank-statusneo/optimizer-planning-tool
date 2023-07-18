import { createSlice } from '@reduxjs/toolkit'

// Define a type for the initial state
interface StateType {
    isLoading: boolean
    message: string
    reorder_point: any
    avg_lead_time: any
    reorder_qty: any
    sd_of_lead_time: any
    result: any
    policy_detail: any[]
    simulation_output: any[]
}

const initialState: StateType = {
    isLoading: false,
    message: '',
    reorder_point: null,
    avg_lead_time: null,
    reorder_qty: null,
    sd_of_lead_time: null,
    result: {},
    policy_detail: [],
    simulation_output: [],
}

export const inventorySimulator = createSlice({
    name: 'inventorySimulator',
    initialState,
    reducers: {
        postSimulationApi(state, action) {
            return {
                ...state,
                message: '',
                isLoading: true,
            }
        },
        postSimulationApiSuccess(state, action) {
            return {
                ...state,
                result: action?.payload?.data?.result,
                policy_detail: action?.payload?.data?.policy_detail,
                simulation_output: action?.payload?.data?.simulation_output,
                isLoading: false,
            }
        },
        postSimulationApiFailed(state, action) {
            return {
                ...state,
                message: 'Simulation API Failed',
                isLoading: false,
            }
        },
        updateReorderPointValue(state, action) {
            return {
                ...state,
                reorder_point: action?.payload,
            }
        },

        updateAvgLeadTimeValue(state, action) {
            return {
                ...state,
                avg_lead_time: action?.payload,
            }
        },
        updateReorderQtyValue(state, action) {
            return {
                ...state,
                reorder_qty: action?.payload,
            }
        },
        updateSdOfLeadTimeValue(state, action) {
            return {
                ...state,
                sd_of_lead_time: action?.payload,
            }
        },
    },
})

export const {
    postSimulationApi,
    postSimulationApiSuccess,
    postSimulationApiFailed,
    updateReorderPointValue,
    updateAvgLeadTimeValue,
    updateReorderQtyValue,
    updateSdOfLeadTimeValue,
} = inventorySimulator.actions

export default inventorySimulator.reducer
