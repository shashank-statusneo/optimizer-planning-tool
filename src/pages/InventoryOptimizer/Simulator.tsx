import { useState, useEffect } from 'react'
import { Grid, Container, Paper } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'

import { lineData, policyTableHeaders } from './constants'
import { PrimaryButton } from '../../components/Buttons'
import {
    FormLabel,
    FormTextField,
    InventoryFormCard,
    FormSnackBarElement,
    FormBackdropElement,
} from '../../components/FormElements'
import { FormGraph, FormInventoryTable } from '../../components/Table'

import {
    simulationApi,
    updateReorderPoint,
    updateAvgLeadTime,
    updateReorderQty,
    updateSdOfLeadTime,
} from '../../redux/actions/inventory/simulator'
import object from 'lodash'
import { utils, writeFile } from 'xlsx'

const theme = createTheme()

const SimulatorContainer = () => {
    const dispatch = useAppDispatch()

    const inventoryResultState = useAppSelector(
        // @ts-ignore
        (state) => state.inventoryResult,
    )
    const inventorySimulatorState = useAppSelector(
        // @ts-ignore
        (state) => state.inventorySimulator,
    )

    const [snackbarState, setSnackbarState] = useState(false)

    const cardItems = [
        {
            value: inventoryResultState?.result?.total_purchase_value
                ? inventoryResultState?.result?.total_purchase_value
                : 0,
            label: 'Total Purchase Value',
        },
        {
            value: inventoryResultState?.result?.total_purchase_qty
                ? inventoryResultState?.result?.total_purchase_qty
                : 0,
            label: 'Total Purchase Qty',
        },
        {
            value: inventoryResultState?.result?.reorder_point
                ? inventoryResultState?.result?.reorder_point
                : 0,
            label: 'Reorder Point',
        },
        {
            value: inventoryResultState?.result?.reorder_qty
                ? inventoryResultState?.result?.reorder_qty
                : 0,
            label: 'Reorder Qty',
        },
        {
            value: inventoryResultState?.result?.safety_stock
                ? inventoryResultState?.result?.safety_stock
                : 0,
            label: 'Safety Stock',
        },
    ]
    const simulationCardItems = [
        {
            value: inventorySimulatorState?.result?.total_purchase_value
                ? inventorySimulatorState?.result?.total_purchase_value
                : 0,
            label: 'Total Purchase Value',
        },
        {
            value: inventorySimulatorState?.result?.total_purchase_qty
                ? inventorySimulatorState?.result?.total_purchase_qty
                : 0,
            label: 'Total Purchase Qty',
        },
        {
            value: inventorySimulatorState?.result?.reorder_point
                ? inventorySimulatorState?.result?.reorder_point
                : 0,
            label: 'Reorder Point',
        },
        {
            value: inventorySimulatorState?.result?.reorder_qty
                ? inventorySimulatorState?.result?.reorder_qty
                : 0,
            label: 'Reorder Qty',
        },
        {
            value: inventorySimulatorState?.result?.safety_stock
                ? inventorySimulatorState?.result?.safety_stock
                : 0,
            label: 'Safety Stock',
        },
    ]

    const apiPolicyDetail = inventoryResultState.policy_detail
    const simulationApiPolicyDetail = inventorySimulatorState.policy_detail

    let totalOrderQty = 0
    let totalCost = 0
    let simulationTotalOrderQty = 0
    let simulationTotalCost = 0

    apiPolicyDetail.map((obj: any) => {
        totalOrderQty = totalOrderQty + obj.reorder_qty
        totalCost = totalCost + obj.cost
    })
    simulationApiPolicyDetail.map((obj: any) => {
        simulationTotalOrderQty = simulationTotalOrderQty + obj.reorder_qty
        simulationTotalCost = simulationTotalCost + obj.cost
    })

    const DownloadResultData = () => {
        const worksheetData: any = simulationApiPolicyDetail

        const worksheet = utils.json_to_sheet(worksheetData)
        worksheet['!cols'] = [{ wch: 10 }, { wch: 9 }, { wch: 21 }]
        const workbook = utils.book_new()
        utils.book_append_sheet(workbook, worksheet, 'Sheet1')

        writeFile(workbook, 'Simulation Result' + '.xlsx')
    }

    const RunSimulation = () => {
        // @ts-ignore
        dispatch(simulationApi(inventorySimulatorState))
    }

    useEffect(() => {
        setSnackbarState(true)
    }, [inventorySimulatorState.message])

    return (
        <ThemeProvider theme={theme}>
            <Container component='main' sx={{ flexGrow: 1 }} fixed>
                <FormBackdropElement
                    loader={
                        inventorySimulatorState.isLoading ||
                        inventoryResultState.isLoading
                    }
                />
                {snackbarState &&
                    (inventorySimulatorState.message ||
                        inventoryResultState.message) && (
                        <FormSnackBarElement
                            message={inventorySimulatorState.message}
                            onClose={() => setSnackbarState(false)}
                        />
                    )}
                <Grid
                    container
                    direction='column'
                    alignItems='center'
                    rowGap={5}
                >
                    <Grid container item justifyContent='center' lg={10}>
                        <FormLabel label={'BASIC SCENARIO RESULT'} />
                    </Grid>
                    <Grid
                        container
                        item
                        justifyContent='center'
                        lg={12}
                        columnGap={6}
                        rowGap={2}
                    >
                        {cardItems.map((card: any, index: any) => (
                            <InventoryFormCard
                                key={index}
                                value={card.value}
                                label={card.label}
                            />
                        ))}
                    </Grid>
                    <Grid
                        container
                        item
                        justifyContent='center'
                        alignContent='center'
                        alignItems='center'
                        rowGap={2}
                    >
                        <Grid item lg={10}>
                            <Paper
                                sx={{
                                    width: '100%',
                                    height: 350,
                                }}
                            >
                                <FormGraph
                                    xLabel='date'
                                    yLabel='inventory_level'
                                    data={
                                        inventoryResultState.simulation_output
                                    }
                                    lineData={lineData}
                                />
                            </Paper>
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        item
                        justifyContent='center'
                        alignContent='center'
                        alignItems='center'
                        rowGap={2}
                    >
                        <Grid item lg={10}>
                            <FormInventoryTable
                                id='inventory-result-table'
                                tableHeaders={policyTableHeaders}
                                tableData={apiPolicyDetail}
                                totalOrderQty={totalOrderQty}
                                totalCost={totalCost}
                            />
                        </Grid>
                    </Grid>

                    <Grid container item justifyContent='center' lg={10}>
                        <FormLabel label={'SIMULATION'} />
                    </Grid>

                    <Grid
                        container
                        item
                        direction='column'
                        alignContent='center'
                        alignItems='center'
                    >
                        <Grid container item rowGap={3}>
                            <Grid
                                container
                                item
                                alignContent='center'
                                alignItems='center'
                            >
                                <Grid
                                    lg={6}
                                    justifyContent='center'
                                    alignItems='center'
                                    item
                                    container
                                    columnGap={3}
                                >
                                    <FormLabel label='Reorder Point' />
                                    <FormTextField
                                        id='simulator-reorder-point-textfield'
                                        value={
                                            inventorySimulatorState.reorder_point
                                        }
                                        type='number'
                                        onChange={(e: any) => {
                                            dispatch(
                                                // @ts-ignore
                                                updateReorderPoint(
                                                    e.target.value,
                                                ),
                                            )
                                        }}
                                        inputProps={{
                                            inputProps: {
                                                min: 0,
                                            },
                                        }}
                                        error={false}
                                        onErrorMessage={''}
                                        disabled={false}
                                        size={'small'}
                                        sx={{}}
                                    />
                                </Grid>
                                <Grid
                                    lg={6}
                                    justifyContent='center'
                                    alignItems='center'
                                    item
                                    container
                                    columnGap={3}
                                >
                                    <FormLabel label='Avg Lead Time' />
                                    <FormTextField
                                        id='simulator-avg-lead-time-textfield'
                                        value={
                                            inventorySimulatorState.avg_lead_time
                                        }
                                        type='number'
                                        onChange={(e: any) => {
                                            dispatch(
                                                // @ts-ignore
                                                updateAvgLeadTime(
                                                    e.target.value,
                                                ),
                                            )
                                        }}
                                        inputProps={{
                                            inputProps: {
                                                min: 0,
                                            },
                                        }}
                                        error={false}
                                        onErrorMessage={''}
                                        disabled={false}
                                        size={'small'}
                                        sx={{}}
                                    />
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                item
                                alignContent='center'
                                alignItems='center'
                            >
                                <Grid
                                    lg={6}
                                    justifyContent='center'
                                    alignItems='center'
                                    item
                                    container
                                    columnGap={3}
                                >
                                    <FormLabel label='Reorder Qty' />
                                    <FormTextField
                                        id='simulator-reorder-qty-textfield'
                                        value={
                                            inventorySimulatorState.reorder_qty
                                        }
                                        type='number'
                                        onChange={(e: any) => {
                                            dispatch(
                                                // @ts-ignore
                                                updateReorderQty(
                                                    e.target.value,
                                                ),
                                            )
                                        }}
                                        inputProps={{
                                            inputProps: {
                                                min: 0,
                                            },
                                        }}
                                        error={false}
                                        onErrorMessage={''}
                                        disabled={false}
                                        size={'small'}
                                        sx={{}}
                                    />
                                </Grid>
                                <Grid
                                    lg={6}
                                    justifyContent='center'
                                    alignItems='center'
                                    item
                                    container
                                    columnGap={3}
                                >
                                    <FormLabel label='SD of Lead Time' />
                                    <FormTextField
                                        id='simulator-sd-lead-time-textfield'
                                        value={
                                            inventorySimulatorState.sd_of_lead_time
                                        }
                                        type='number'
                                        onChange={(e: any) => {
                                            dispatch(
                                                // @ts-ignore
                                                updateSdOfLeadTime(
                                                    e.target.value,
                                                ),
                                            )
                                        }}
                                        inputProps={{
                                            inputProps: {
                                                min: 0,
                                            },
                                        }}
                                        error={false}
                                        onErrorMessage={''}
                                        disabled={false}
                                        size={'small'}
                                        sx={{}}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item marginY={3}>
                        <PrimaryButton
                            id='simulation-run-btn'
                            label='RUN SIMULATION'
                            onClick={() => RunSimulation()}
                            disabled={
                                !(
                                    inventorySimulatorState?.reorder_point &&
                                    inventorySimulatorState?.avg_lead_time &&
                                    inventorySimulatorState?.reorder_qty &&
                                    inventorySimulatorState.sd_of_lead_time
                                )
                            }
                        />
                    </Grid>

                    {inventorySimulatorState?.result &&
                        !object.isEmpty(inventorySimulatorState?.result) &&
                        inventorySimulatorState?.policy_detail &&
                        inventorySimulatorState?.policy_detail.length > 0 &&
                        inventorySimulatorState?.simulation_output &&
                        inventorySimulatorState?.simulation_output.length >
                            0 && (
                            <>
                                <Grid
                                    container
                                    item
                                    justifyContent='center'
                                    lg={10}
                                >
                                    <FormLabel label={'SIMULATION RESULT'} />
                                </Grid>
                                <Grid
                                    container
                                    item
                                    justifyContent='center'
                                    lg={12}
                                    columnGap={6}
                                    rowGap={2}
                                >
                                    {simulationCardItems.map(
                                        (card: any, index: any) => (
                                            <InventoryFormCard
                                                key={index}
                                                value={card.value}
                                                label={card.label}
                                            />
                                        ),
                                    )}
                                </Grid>
                                <Grid
                                    container
                                    item
                                    justifyContent='center'
                                    alignContent='center'
                                    alignItems='center'
                                    rowGap={2}
                                >
                                    <Grid item lg={10}>
                                        <Paper
                                            sx={{
                                                width: '100%',
                                                height: 350,
                                            }}
                                        >
                                            <FormGraph
                                                xLabel='date'
                                                yLabel='inventory_level'
                                                data={
                                                    inventorySimulatorState.simulation_output
                                                }
                                                lineData={lineData}
                                            />
                                        </Paper>
                                    </Grid>
                                </Grid>

                                <Grid
                                    container
                                    item
                                    justifyContent='center'
                                    alignContent='center'
                                    alignItems='center'
                                    rowGap={2}
                                >
                                    <Grid item lg={10}>
                                        <FormInventoryTable
                                            id='inventory-simulation-result-table'
                                            tableHeaders={policyTableHeaders}
                                            tableData={
                                                simulationApiPolicyDetail
                                            }
                                            totalOrderQty={
                                                simulationTotalOrderQty
                                            }
                                            totalCost={simulationTotalCost}
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
                            </>
                        )}
                </Grid>
            </Container>
        </ThemeProvider>
    )
}

export default SimulatorContainer
