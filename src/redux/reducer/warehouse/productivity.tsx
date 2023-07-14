import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoading: false,
    message: '',
    productivity_file_name: '',
    productivity_table_data: null,
    flag_productivity_table_updated: false,
}

// @ts-ignore
export const warehouseProductivity = createSlice({
    name: 'warehouseProductivity',
    initialState,
    reducers: {
        resetWarehouseProductivityData(state, action) {
            return {
                ...initialState,
            }
        },

        postProductivity(state, action) {
            return {
                ...state,
                message: '',
                isLoading: true,
            }
        },

        postProductivitySuccess(state, action) {
            return {
                ...state,
                productivity_file_name: action?.payload?.fileName,
                isLoading: false,
            }
        },

        postProductivityFailed(state, action) {
            return {
                ...state,
                message: `Productivity file upload failed : ${
                    action?.payload?.error ? action?.payload?.error : ''
                }`,
                isLoading: false,
            }
        },

        getBenchmarkProductivity(state, action) {
            return {
                ...state,
                isLoading: true,
            }
        },

        getBenchmarkProductivitySuccess(state, action) {
            return {
                ...state,
                productivity_table_data: action?.payload,
                isLoading: false,
            }
        },

        getBenchmarkProductivityFailed(state, action) {
            console.log(action)
            return {
                ...state,
                message: 'Benchmark Productivity fetch failed',
                isLoading: false,
            }
        },

        putBenchmarkProductivity(state, action) {
            return {
                ...state,
                message: '',
                isLoading: true,
            }
        },

        putBenchmarkProductivitySuccess(state, action) {
            return {
                ...state,
                productivity_table_data: action?.payload,
                isLoading: false,
            }
        },

        putBenchmarkProductivityFailed(state, action) {
            return {
                ...state,
                message: 'Benchmark Productivity update failed',
                isLoading: false,
            }
        },

        updateFlagProductivityTableUpdatedValue(state, action) {
            return {
                ...state,
                flag_productivity_table_updated: action?.payload,
            }
        },

        // END PRODUCTIVITY
    },
})

export const {
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
} = warehouseProductivity.actions

export default warehouseProductivity.reducer
