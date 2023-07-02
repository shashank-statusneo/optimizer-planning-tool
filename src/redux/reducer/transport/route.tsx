import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoading: false,
    message: '',
    distance_matrix_file_name: '',
    source_coordinate_file_name: '',
    destination_coordinate_file_name: '',
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
    },
})

export const { resetRouteOptimizerData } = routeOptimizer.actions

export default routeOptimizer.reducer
