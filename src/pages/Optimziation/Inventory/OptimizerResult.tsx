import { Grid, SelectChangeEvent, Container, Paper } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import dayjs from 'dayjs'

import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks'

import { lineData, policyTableHeaders } from './constants'
import { PrimaryButton } from '../../../components/Buttons'
import {
    FormDateSelector,
    FormLabel,
    FormDropDown,
    InventoryFormCard,
} from '../../../components/FormElements'
import { FormGraph, FormInventoryTable } from '../../../components/Table'

import {
    updateInventoryStartDate,
    updateInventoryEndDate,
} from '../../../redux/actions/inventory/result'

import { utils, writeFile } from 'xlsx'

const theme = createTheme()

const OptimizerResultContainer = () => {
    const dispatch = useAppDispatch()

    const inventoryResultState = useAppSelector(
        // @ts-ignore
        (state) => state.inventoryResult,
    )

    const handleInventoryStartDateChange = (date: any) => {
        // @ts-ignore
        dispatch(updateInventoryStartDate(date))
    }
    const handleInventoryEndDateChange = (date: any) => {
        // @ts-ignore
        dispatch(updateInventoryEndDate(date))
    }

    const handleVendorChange = (event: SelectChangeEvent) => {
        console.log(event.target.value)
    }

    const VendorList = [
        {
            id: 1,
            name: 'Vendor 1',
        },
        {
            id: 2,
            name: 'Vendor 2',
        },
    ]

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

    const apiPolicyDetail = inventoryResultState.policy_detail

    let totalOrderQty = 0
    let totalCost = 0

    apiPolicyDetail.map((obj: any, key: any) => {
        totalOrderQty = totalOrderQty + obj.reorder_qty
        totalCost = totalCost + obj.cost
    })

    const DownloadResultData = () => {
        const worksheetData: any = apiPolicyDetail

        const worksheet = utils.json_to_sheet(worksheetData)
        worksheet['!cols'] = [{ wch: 10 }, { wch: 9 }, { wch: 21 }]
        const workbook = utils.book_new()
        utils.book_append_sheet(workbook, worksheet, 'Sheet1')

        writeFile(workbook, 'Optimization Result' + '.xlsx')
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component='main' sx={{ flexGrow: 1 }} fixed>
                <Grid
                    container
                    direction='column'
                    alignItems='center'
                    rowGap={5}
                >
                    <Grid container item justifyContent='center' lg={10}>
                        <Grid item lg={3}>
                            <FormDateSelector
                                label='Select From Date'
                                value={
                                    inventoryResultState.inventory_start_date
                                }
                                onChange={handleInventoryStartDateChange}
                                minDate={dayjs()}
                            />
                        </Grid>

                        <Grid item lg={3}>
                            <FormDateSelector
                                label='Select To Date'
                                value={inventoryResultState.inventory_end_date}
                                onChange={handleInventoryEndDateChange}
                                minDate={
                                    inventoryResultState.inventory_start_date >=
                                    dayjs()
                                        ? inventoryResultState.inventory_start_date
                                        : dayjs()
                                }
                            />
                        </Grid>

                        <Grid item lg={4}>
                            <FormDropDown
                                id='select-vendor-dropdown'
                                labelId='select-table-dropdown-input-label'
                                label='Select Vendor'
                                value={null}
                                data={VendorList}
                                onChange={handleVendorChange}
                            />
                        </Grid>
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
                        <Grid item>
                            <FormLabel label='PROJECTION: DEMAND Vs INVENTORY LEVEL' />
                        </Grid>
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
            </Container>
        </ThemeProvider>
    )
}

export default OptimizerResultContainer
