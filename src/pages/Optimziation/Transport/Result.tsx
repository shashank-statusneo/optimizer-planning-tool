import { useState, useRef, MutableRefObject, useEffect } from 'react'
import { Container, Grid, Typography, InputAdornment } from '@mui/material'

import { createTheme, ThemeProvider } from '@mui/material/styles'

import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks'

import { PrimaryButton } from '../../../components/Buttons'

import {
    FormBackdropElement,
    FormSnackBarElement,
    FormDropDown,
} from '../../../components/FormElements'

import { getRoutePlan } from '../../../redux/actions/transport/result'

import { FormRouteTable } from '../../../components/Table'

import { routeSimulationHeaders, routeSampleTableData } from './constants'
import { utils, writeFile } from 'xlsx'

const theme = createTheme()

const RouteResult = () => {
    const dispatch = useAppDispatch()

    const routeOptimizerState = useAppSelector((state) => state.routeOptimizer)
    const routeResultOptimizerState = useAppSelector(
        (state) => state.routeOptimizerResult,
    )

    const [snackbarState, setSnackbarState] = useState(false)

    const [modifiedResultData, setModifiedResultData] = useState<any>(null)
    const [selectedVehicle, setSelectedVehicle] = useState<any>(null)
    const [selectedOrder, setSelectedOrder] = useState<any>(null)

    useEffect(() => {
        if (routeResultOptimizerState.result_id) {
            dispatch(getRoutePlan(routeResultOptimizerState.result_id))
        }
    }, [])

    useEffect(() => {
        setModifiedResultData(routeResultOptimizerState.table_data)
    }, [routeResultOptimizerState.table_data])

    useEffect(() => {
        setSnackbarState(true)
    }, [routeOptimizerState.message])

    useEffect(() => {
        if (routeResultOptimizerState.table_data) {
            setModifiedResultData(
                routeResultOptimizerState.table_data.filter(
                    (obj: any, index: any) => {
                        if (selectedVehicle && selectedOrder) {
                            return (
                                obj?.vehicle_id == selectedVehicle?.name &&
                                obj?.order_id == selectedOrder.name
                            )
                        } else if (selectedVehicle && !selectedOrder) {
                            return obj?.vehicle_id == selectedVehicle?.name
                        } else if (!selectedVehicle && selectedOrder) {
                            return obj?.order_id == selectedOrder?.name
                        } else {
                            return obj
                        }
                    },
                ),
            )
        }
    }, [selectedVehicle, selectedOrder])

    const DownloadResultData = () => {
        const worksheetData: any = modifiedResultData

        const worksheet = utils.json_to_sheet(worksheetData)
        worksheet['!cols'] = [{ wch: 10 }, { wch: 9 }, { wch: 21 }]
        const workbook = utils.book_new()
        utils.book_append_sheet(workbook, worksheet, 'Sheet1')

        writeFile(workbook, 'Optimization Result' + '.xlsx')
    }

    const handleVehicleChange = (e: any) => {
        setSelectedVehicle(
            routeResultOptimizerState.vehicle_ids.find((obj: any) => {
                return obj.id === e.target.value
            }),
        )
    }

    const handleOrderChange = (e: any) => {
        setSelectedOrder(
            routeResultOptimizerState.order_ids.find((obj: any) => {
                return obj.id === e.target.value
            }),
        )
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component='main' sx={{ flexGrow: 1 }} fixed>
                <FormBackdropElement
                    loader={routeResultOptimizerState.isLoading}
                />
                {snackbarState && routeResultOptimizerState.message && (
                    <FormSnackBarElement
                        message={routeResultOptimizerState.message}
                        onClose={() => setSnackbarState(false)}
                    />
                )}{' '}
                {routeResultOptimizerState.table_data &&
                    modifiedResultData &&
                    routeResultOptimizerState.map_data && (
                        <Grid container direction='column' rowGap={4}>
                            <Grid
                                container
                                item
                                justifyContent='center'
                                alignContent='center'
                                alignItems='flex-start'
                            >
                                <iframe
                                    id='simulation-result-map'
                                    width='100%'
                                    height='450'
                                    src={routeResultOptimizerState.map_data}
                                    style={{ border: 0 }}
                                />
                            </Grid>
                            <Grid
                                container
                                item
                                justifyContent='center'
                                alignContent='center'
                                alignItems='center'
                                rowGap={2}
                            >
                                <Grid
                                    container
                                    item
                                    justifyContent='center'
                                    lg={10}
                                    columnGap={4}
                                    rowGap={2}
                                >
                                    <Grid item lg={4} sm={6} xs={6}>
                                        <FormDropDown
                                            id='select-vehicle-dropdown'
                                            labelId='select-table-vehicle-dropdown-input-label'
                                            label='Select Vehicle'
                                            value={selectedVehicle}
                                            data={
                                                routeResultOptimizerState.vehicle_ids
                                            }
                                            onChange={(e: any) =>
                                                handleVehicleChange(e)
                                            }
                                            displayClearBtn={true}
                                            handleClearClick={() =>
                                                setSelectedVehicle(null)
                                            }
                                        />
                                    </Grid>
                                    <Grid item lg={4} sm={6} xs={6}>
                                        <FormDropDown
                                            id='select-order-dropdown'
                                            labelId='select-table-order-dropdown-input-label'
                                            label='Select Order'
                                            value={selectedOrder}
                                            data={
                                                routeResultOptimizerState.order_ids
                                            }
                                            onChange={(e: any) =>
                                                handleOrderChange(e)
                                            }
                                            displayClearBtn={true}
                                            handleClearClick={() =>
                                                setSelectedOrder(null)
                                            }
                                        />
                                    </Grid>
                                </Grid>

                                <Grid
                                    item
                                    lg={10}
                                    xs={12}
                                    sx={{
                                        height: '400px',
                                    }}
                                >
                                    <FormRouteTable
                                        id='route-simulation-result-table'
                                        tableHeaders={routeSimulationHeaders}
                                        tableData={modifiedResultData}
                                    />
                                </Grid>
                                <Grid item>
                                    <PrimaryButton
                                        id='inventory-result-data-table-download-btn'
                                        label='DOWNLOAD TABLE AS EXCEL'
                                        onClick={() => DownloadResultData()}
                                        disabled={false}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
            </Container>
        </ThemeProvider>
    )
}

export default RouteResult
