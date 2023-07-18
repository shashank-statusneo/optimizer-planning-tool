import { useEffect, useState } from 'react'

import { Container, Grid } from '@mui/material'

import {
    FormDropDown,
    FormLabel,
    FormDateSelector,
    FormBackdropElement,
    FormSnackBarElement,
} from '../../../components/FormElements'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks'

import {
    getWarehouse,
    updatePlanningWarehouse,
    updatePlanningStartDate,
    updatePlanningEndDate,
} from '../../../redux/actions/warehouse/select'

import dayjs from 'dayjs'

import { createTheme, ThemeProvider } from '@mui/material/styles'
const theme = createTheme()

const WarehouseSelect = () => {
    const dispatch = useAppDispatch()

    const [selectedWarehouse, setSelectedWarehouse] = useState(null)

    const warehouseSelectState = useAppSelector(
        (state) => state.warehouseSelect,
    )

    const [snackbarState, setSnackbarState] = useState(false)

    const fetchData = () => {
        dispatch(getWarehouse())
    }

    useEffect(() => {
        if (!warehouseSelectState.planning_warehouse) {
            fetchData()
        }
    }, [])

    useEffect(() => {
        if (warehouseSelectState?.warehouses) {
            let warehouseToBeUpdated = null
            if (warehouseSelectState.planning_warehouse) {
                warehouseToBeUpdated = warehouseSelectState.planning_warehouse
            } else if (
                !warehouseSelectState.planning_warehouse &&
                warehouseSelectState?.warehouses[0]
            ) {
                warehouseToBeUpdated = warehouseSelectState?.warehouses[0]
            }
            setSelectedWarehouse(warehouseToBeUpdated)
            dispatch(updatePlanningWarehouse(warehouseToBeUpdated))
        }
    }, [warehouseSelectState.warehouses])

    useEffect(() => {
        setSnackbarState(true)
    }, [warehouseSelectState.message])

    const handleWarehouseChange = (e: any) => {
        setSelectedWarehouse(
            warehouseSelectState.warehouses.find((obj: any) => {
                return obj.id === e.target.value
            }),
        )
        dispatch(
            updatePlanningWarehouse(
                warehouseSelectState.warehouses.find((obj: any) => {
                    return obj.id === e.target.value
                }),
            ),
        )
    }
    const handleWarehouseStartDateChange = (date: any) => {
        // @ts-ignore
        dispatch(updatePlanningStartDate(date))
    }
    const handleWarehouseEndDateChange = (date: any) => {
        // @ts-ignore
        dispatch(updatePlanningEndDate(date))
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component='main' sx={{ flexGrow: 1 }} fixed>
                <FormBackdropElement loader={warehouseSelectState.isLoading} />
                {snackbarState && warehouseSelectState.message && (
                    <FormSnackBarElement
                        message={warehouseSelectState.message}
                        onClose={() => setSnackbarState(false)}
                    />
                )}
                <Grid
                    container
                    direction='column'
                    spacing={2}
                    sx={{ marginTop: '100px' }}
                >
                    <Grid
                        container
                        item
                        justifyContent='center'
                        alignContent='center'
                        alignItems='center'
                    >
                        <Grid item lg={4}>
                            <FormLabel label='Select Warehouse' />
                        </Grid>
                        <Grid item lg={4}>
                            <FormDropDown
                                id='select-warehouse-dropdown'
                                labelId='select-warehouse-dropdown-input-label'
                                label=''
                                value={
                                    warehouseSelectState.planning_warehouse
                                        ? warehouseSelectState.planning_warehouse
                                        : selectedWarehouse
                                }
                                data={
                                    warehouseSelectState?.warehouses
                                        ? warehouseSelectState?.warehouses
                                        : []
                                }
                                onChange={handleWarehouseChange}
                            />
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        item
                        justifyContent='center'
                        alignContent='center'
                        alignItems='center'
                    >
                        <Grid item lg={8}>
                            <FormLabel label='Specify planning horizon' />
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        item
                        justifyContent='center'
                        alignContent='center'
                        alignItems='center'
                    >
                        <Grid item lg={3}>
                            <FormLabel label='Start Date' />
                        </Grid>
                        <Grid item lg={3}>
                            <FormDateSelector
                                label=''
                                value={warehouseSelectState.planning_start_date}
                                onChange={handleWarehouseStartDateChange}
                                minDate={dayjs()}
                            />
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        item
                        justifyContent='center'
                        alignContent='center'
                        alignItems='center'
                    >
                        <Grid item lg={3}>
                            <FormLabel label='End Date' />
                        </Grid>
                        <Grid item lg={3}>
                            <FormDateSelector
                                label=''
                                value={warehouseSelectState.planning_end_date}
                                onChange={handleWarehouseEndDateChange}
                                minDate={
                                    warehouseSelectState?.planning_start_date >=
                                    dayjs()
                                        ? warehouseSelectState.planning_start_date
                                        : dayjs()
                                }
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    )
}

export default WarehouseSelect
