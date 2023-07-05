import { useState, useRef, MutableRefObject, useEffect } from 'react'
import { Container, Grid, Typography, InputAdornment } from '@mui/material'

import { createTheme, ThemeProvider } from '@mui/material/styles'

import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'

import { PrimaryButton } from '../../components/Buttons'

import {
    FormBackdropElement,
    FormSnackBarElement,
} from '../../components/FormElements'

import { FormRouteTable } from '../../components/Table'

import { routeSimulationHeaders, routeSampleTableData } from './constants'
import { utils, writeFile } from 'xlsx'

const theme = createTheme()

const RouteResult = () => {
    const dispatch = useAppDispatch()

    const routeOptimizerState = useAppSelector(
        // @ts-ignore
        (state) => state.routeOptimizer,
    )

    const [snackbarState, setSnackbarState] = useState(false)

    useEffect(() => {
        setSnackbarState(true)
    }, [routeOptimizerState.message])

    const DownloadResultData = () => {
        const worksheetData: any = routeSampleTableData

        const worksheet = utils.json_to_sheet(worksheetData)
        worksheet['!cols'] = [{ wch: 10 }, { wch: 9 }, { wch: 21 }]
        const workbook = utils.book_new()
        utils.book_append_sheet(workbook, worksheet, 'Sheet1')

        writeFile(workbook, 'Optimization Result' + '.xlsx')
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component='main' sx={{ flexGrow: 1 }} fixed>
                <FormBackdropElement loader={routeOptimizerState.isLoading} />
                {snackbarState && routeOptimizerState.message && (
                    <FormSnackBarElement
                        message={routeOptimizerState.message}
                        onClose={() => setSnackbarState(false)}
                    />
                )}{' '}
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
                            src='https://maps.google.com/maps?q=india&t=&z=10&ie=UTF8&iwloc=&output=embed'
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
                        <Grid item lg={10}>
                            <FormRouteTable
                                id='route-simulation-result-table'
                                tableHeaders={routeSimulationHeaders}
                                tableData={routeSampleTableData}
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

export default RouteResult
