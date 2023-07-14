import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoading: false,
    message: '',
    demand_file_name: '',
    demand_table_data: null,
    modified_demand_table_data: null,
    demand_table_cols: null,
    flag_demand_table_updated: false,
}

// @ts-ignore
export const warehouseDemand = createSlice({
    name: 'warehouseDemand',
    initialState,
    reducers: {
        resetWarehouseDemandData(state, action) {
            return {
                ...initialState,
            }
        },

        postDemand(state, action) {
            return {
                ...state,
                message: '',
                isLoading: true,
            }
        },

        postDemandSuccess(state, action) {
            return {
                ...state,
                demand_file_name: action?.payload?.fileName,
                isLoading: false,
            }
        },

        postDemandFailed(state, action) {
            return {
                ...state,
                message: `Demand file upload failed : ${
                    action?.payload?.error ? action?.payload?.error : ''
                }`,
                isLoading: false,
            }
        },

        getDemandForecast(state, action) {
            return {
                ...state,
                message: '',
                isLoading: true,
            }
        },

        getDemandForecastSuccess(state, action) {
            return {
                ...state,
                demand_table_data: action?.payload,
                isLoading: false,
            }
        },

        getDemandForecastFailed(state, action) {
            return {
                ...state,
                message: 'Demand Forecast fetch failed',
                isLoading: false,
            }
        },

        putDemandForecast(state, action) {
            return {
                ...state,
                message: '',
                isLoading: true,
            }
        },

        putDemandForecastSuccess(state, action) {
            return {
                ...state,
                modified_demand_table_data: action?.payload,
                isLoading: false,
            }
        },

        putDemandForecastFailed(state, action) {
            return {
                ...state,
                message: 'Demand Forecsat update failed',
                isLoading: false,
            }
        },

        updateDemandTableDataColValue(state, action) {
            return {
                ...state,
                demand_table_cols: action?.payload,
            }
        },

        updateModifiedDemandTableDataValue(state, action) {
            return {
                ...state,
                modified_demand_table_data: action?.payload,
            }
        },
        updateDemandTableDataValue(state, action) {
            return {
                ...state,
                demand_table_data: action?.payload,
            }
        },

        updateFlagDemandTableUpdatedValue(state, action) {
            return {
                ...state,
                flag_demand_table_updated: action?.payload,
            }
        },
    },
})

export const {
    resetWarehouseDemandData,
    postDemand,
    postDemandSuccess,
    postDemandFailed,
    getDemandForecast,
    getDemandForecastSuccess,
    getDemandForecastFailed,
    putDemandForecast,
    putDemandForecastSuccess,
    putDemandForecastFailed,
    updateDemandTableDataColValue,
    updateModifiedDemandTableDataValue,
    updateDemandTableDataValue,
    updateFlagDemandTableUpdatedValue,
} = warehouseDemand.actions

export default warehouseDemand.reducer
