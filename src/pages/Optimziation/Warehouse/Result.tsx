import { Container, Grid, Paper } from '@mui/material'
import { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks'
import {
    FormMultiDropDown,
    FormLabel,
    FormDateSelector,
    FormCardField,
    FormSubLabel,
    FormDropDown,
} from '../../../components/FormElements'
import { FormGraph, FormTable } from '../../../components/Table'
import { PrimaryButton } from '../../../components/Buttons'

import object from 'lodash'
import { utils, writeFile } from 'xlsx'

import {
    updateResultStartDate,
    updateResultEndDate,
    postResultData,
    updateResultCategory,
    updateResultTable,
} from '../../../redux/actions/warehouse/result'

import dayjs from 'dayjs'
import {
    lineData,
    ResultTableTypes,
    resultCategoryTableHeaders,
    resultDemandTableHeaders,
} from './constants'

import { createTheme, ThemeProvider } from '@mui/material/styles'
const theme = createTheme()

const Result = () => {
    const dispatch = useAppDispatch()

    const warehouseSelectState = useAppSelector(
        // @ts-ignore
        (state) => state.warehouseSelect,
    )

    const warehouseRequirementState = useAppSelector(
        // @ts-ignore
        (state) => state.warehouseRequirement,
    )

    const warehouseResultState = useAppSelector(
        // @ts-ignore
        (state) => state.warehouseResult,
    )

    const [selectedCategory, setSelectedCategory] = useState<any[]>([])

    const [resultChartData, setResultChartData] = useState<any>({})

    const [selectedTable, setSelectedTable] = useState<any>(null)

    const [cardData, setCardData] = useState({
        num_employees_to_be_hired: 0,
        project_fulfillment: 0,
        total_hiring_budget: '',
    })

    const [outputData, setOutputData] = useState<any>(null)
    const [dateWiseTotal, setDateWiseTotal] = useState(null)
    const [totalData, setTotalData] = useState<any>(null)
    const [demandData, setDemandData] = useState<any>(null)

    const handleSelectedCategoryChange = (e: any) => {
        const {
            target: { value },
        } = e
        setSelectedCategory(
            typeof value === 'string' ? value.split(',') : value,
        )
        dispatch(
            // @ts-ignore
            updateResultCategory(
                typeof value === 'string' ? value.split(',') : value,
            ),
        )
    }

    const handleWarehouseStartDateChange = (date: any) => {
        // @ts-ignore
        dispatch(updateResultStartDate(date))
    }
    const handleWarehouseEndDateChange = (date: any) => {
        // @ts-ignore
        dispatch(updateResultEndDate(date))
    }

    const handleSelectedTableChange = (e: any) => {
        setSelectedTable(
            ResultTableTypes.find((obj: any) => {
                return obj.id === e.target.value
            }),
        )
        dispatch(
            // @ts-ignore
            updateResultTable(
                ResultTableTypes.find((obj: any) => {
                    return obj.id === e.target.value
                }),
            ),
        )
    }

    const TotalValueFromResult = (filterDates: any, valueType: any) => {
        return filterDates.map((date: any) => {
            let totalSum = 0
            for (const category of warehouseResultState.result_category) {
                totalSum =
                    totalSum +
                    warehouseResultState.result_demand_vs_fulfillment_data[
                        date
                    ][category][valueType]
            }
            return totalSum
        })
    }

    const fetchData = () => {
        const payload = {
            plan_from_date: dayjs(
                warehouseSelectState.planning_start_date,
            ).format('YYYY-MM-DD'),
            plan_to_date: dayjs(warehouseSelectState.planning_end_date).format(
                'YYYY-MM-DD',
            ),
            num_current_employees:
                warehouseRequirementState.num_current_employees,
            day_working_hours: warehouseRequirementState.day_working_hours,
            warehouse_id: warehouseSelectState.planning_warehouse?.id,
            cost_per_employee_per_month:
                warehouseRequirementState.cost_per_employee_per_month,
            percentage_absent_expected:
                warehouseRequirementState.percentage_absent_expected,
            total_hiring_budget: warehouseRequirementState.total_hiring_budget,
        }
        // @ts-ignore
        dispatch(postResultData(payload))

        dispatch(
            // @ts-ignore
            updateResultStartDate(warehouseSelectState.planning_start_date),
        )
        // @ts-ignore
        dispatch(updateResultEndDate(warehouseSelectState.planning_end_date))

        setSelectedTable(ResultTableTypes[0])
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        const startDate = dayjs(warehouseResultState.result_start_date).format(
            'YYYY-MM-DD',
        )
        const endDate = dayjs(warehouseResultState.result_end_date).format(
            'YYYY-MM-DD',
        )

        if (warehouseResultState.result_demand_vs_fulfillment_data) {
            const filteredDates = Object.keys(
                warehouseResultState.result_demand_vs_fulfillment_data,
            ).filter((date) => {
                if (startDate && endDate) {
                    return date >= startDate && date <= endDate
                } else if (startDate) {
                    return date >= startDate
                } else if (endDate) {
                    return date <= endDate
                }
                return true
            })

            let demands: any = []
            let expected_fulfillments: any = []
            let existing_fulfillments: any = []
            if (warehouseResultState.result_category.length === 0) {
                demands = filteredDates.map(
                    (date) =>
                        warehouseResultState.result_demand_vs_fulfillment_data[
                            date
                        ].total.expected_demand,
                )
                expected_fulfillments = filteredDates.map(
                    (date) =>
                        warehouseResultState.result_demand_vs_fulfillment_data[
                            date
                        ].total.fulfillment_with_total,
                )
                existing_fulfillments = filteredDates.map(
                    (date) =>
                        warehouseResultState.result_demand_vs_fulfillment_data[
                            date
                        ].total.fulfillment_with_current,
                )
            } else {
                demands = TotalValueFromResult(filteredDates, 'expected_demand')
                expected_fulfillments = TotalValueFromResult(
                    filteredDates,
                    'fulfillment_with_total',
                )
                existing_fulfillments = TotalValueFromResult(
                    filteredDates,
                    'fulfillment_with_current',
                )
            }

            const graphData: any = []
            for (let i = 0; i < demands.length; i++) {
                graphData.push({
                    date: filteredDates[i],
                    Demand: demands[i],
                    'Expected Fulfillment': expected_fulfillments[i],
                    'Fulfillment With Existing': existing_fulfillments[i],
                })
            }
            setResultChartData(graphData)
        }

        if (
            warehouseResultState.result_output &&
            warehouseResultState.result_demand_vs_fulfillment_data
        ) {
            const filteredData = Object.keys(warehouseResultState.result_output)
                .filter((date) => {
                    if (startDate && endDate) {
                        return date >= startDate && date <= endDate
                    } else if (startDate) {
                        return date >= startDate
                    } else if (endDate) {
                        return date <= endDate
                    }
                    return true
                })
                .reduce((filtered: any, date) => {
                    const categories = Object.keys(
                        warehouseResultState.result_output[date],
                    )
                    categories.forEach((category) => {
                        if (
                            selectedCategory.length == 0 ||
                            selectedCategory.includes(category)
                        ) {
                            if (!filtered[date]) {
                                filtered[date] = {}
                            }
                            filtered[date][category] =
                                warehouseResultState.result_output[date][
                                    category
                                ]
                        }
                    })
                    return filtered
                }, {})

            const filteredDemandData = Object.keys(
                warehouseResultState.result_demand_vs_fulfillment_data,
            )
                .filter((date) => {
                    if (startDate && endDate) {
                        return date >= startDate && date <= endDate
                    } else if (startDate) {
                        return date >= startDate
                    } else if (endDate) {
                        return date <= endDate
                    }
                    return true
                })
                .reduce((filtered: any, date) => {
                    const categories = Object.keys(
                        warehouseResultState.result_demand_vs_fulfillment_data[
                            date
                        ],
                    )
                    categories.forEach((category) => {
                        if (
                            selectedCategory.length == 0 ||
                            selectedCategory.includes(category)
                        ) {
                            if (!filtered[date]) {
                                filtered[date] = {}
                            }
                            filtered[date][category] =
                                warehouseResultState.result_demand_vs_fulfillment_data[
                                    date
                                ][category]
                        }
                    })
                    return filtered
                }, {})

            const uniqueDates = Object.keys(filteredData).filter(
                (key) => key !== 'total' && key !== 'additional_data',
            )

            const totalData = uniqueDates.reduce(
                (acc, date) => {
                    const categories = Object.keys(filteredData[date])
                    categories.forEach((category) => {
                        acc.num_of_existing_to_deploy +=
                            filteredData[date][
                                category
                            ].num_of_existing_to_deploy
                        acc.num_of_new_to_deploy +=
                            filteredData[date][category].num_of_new_to_deploy
                        acc.total += filteredData[date][category].total
                    })
                    return acc
                },
                {
                    num_of_existing_to_deploy: 0,
                    num_of_new_to_deploy: 0,
                    total: 0,
                },
            )
            setOutputData(filteredData)
            // setDateWiseTotal(dateTotal)
            setTotalData(totalData)
            setDemandData(filteredDemandData)
        }
    }, [
        warehouseResultState.result_demand_vs_fulfillment_data,
        warehouseResultState.result_category,
        warehouseResultState.result_start_date,
        warehouseResultState.result_end_date,
    ])

    useEffect(() => {
        if (outputData && !object.isEmpty(outputData)) {
            const dateTotal: any = {}

            Object.keys(outputData).map((date: any, index: any) => {
                let total_num_existing_to_deploy = 0
                let total_num_new_to_deploy = 0
                let total_category_wise_total = 0
                for (const key of Object.keys(outputData[date])) {
                    total_num_existing_to_deploy +=
                        outputData[date][key].num_of_existing_to_deploy
                    total_num_new_to_deploy +=
                        outputData[date][key].num_of_new_to_deploy
                    total_category_wise_total += outputData[date][key].total
                }
                dateTotal[date] = {
                    total_num_existing_to_deploy: total_num_existing_to_deploy,
                    total_num_new_to_deploy: total_num_new_to_deploy,
                    total_category_wise_total: total_category_wise_total,
                }
            })
            setDateWiseTotal(dateTotal)
        }
    }, [outputData])

    useEffect(() => {
        if (warehouseResultState.result_additional_data) {
            setCardData({
                ...cardData,
                project_fulfillment: warehouseResultState.result_additional_data
                    .project_fulfillment
                    ? warehouseResultState.result_additional_data
                          .project_fulfillment
                    : 0,
                // @ts-ignore
                total_hiring_budget: warehouseResultState.result_additional_data
                    .total_hiring_budget
                    ? ' ' +
                      warehouseResultState.result_additional_data.total_hiring_budget.toLocaleString(
                          'en-IN',
                      )
                    : 0,
            })
        }
    }, [warehouseResultState.result_additional_data])

    const cardItems = [
        {
            value: totalData?.num_of_new_to_deploy
                ? totalData?.num_of_new_to_deploy
                : 0,
            label: 'Num employees to be hired',
        },
        {
            value: cardData?.project_fulfillment,
            label: 'Project fulfillment',
        },
        {
            value: cardData?.total_hiring_budget,
            label: 'Project total expenditure',
        },
    ]

    const ResultSubLabel = `${warehouseResultState.result_warehouse_name}: 
                            ${dayjs(
                                warehouseSelectState.planning_start_date,
                            ).format('DD MMM YYYY')} 
                            to ${dayjs(
                                warehouseSelectState.planning_end_date,
                            ).format('DD MMM YYYY')}`

    const DownloadResultData = (tableType: string) => {
        const worksheetData: any = []

        if (tableType === 'category') {
            for (const date of Object.keys(outputData)) {
                for (const category of Object.keys(outputData[date])) {
                    worksheetData.push({
                        DATE: date,
                        CATEGORY: category,
                        'NUM EXISTING TO DEPLOY':
                            outputData[date][category]
                                .num_of_existing_to_deploy,
                        'NUM NEW TO DEPLOY':
                            outputData[date][category].num_of_new_to_deploy,
                        TOTAL: outputData[date][category].total,
                    })
                }
            }
        } else if (tableType === 'demand') {
            for (const date of Object.keys(demandData)) {
                for (const category of Object.keys(demandData[date]).filter(
                    (obj: any) => obj !== 'total',
                )) {
                    worksheetData.push({
                        DATE: date,
                        CATEGORY: category,
                        'EXPECTED DEMAND':
                            demandData[date][category].expected_demand,
                        'FULLFILLMENT WITH EXISTING EMPLOYEE':
                            demandData[date][category].fulfillment_with_current,
                        'FULLFILLMENT WITH TOTAL EMPLOYEE':
                            demandData[date][category].fulfillment_with_total,
                    })
                }
            }
        }

        const worksheet = utils.json_to_sheet(worksheetData)
        worksheet['!cols'] = [{ wch: 10 }, { wch: 9 }, { wch: 21 }]
        const workbook = utils.book_new()
        utils.book_append_sheet(workbook, worksheet, 'Sheet1')

        tableType === 'category'
            ? writeFile(workbook, 'category-wise-schedule' + '.xlsx')
            : writeFile(workbook, 'demand-wise-schedule' + '.xlsx')
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component='main' sx={{ flexGrow: 1 }} fixed>
                <Grid
                    container
                    direction='column'
                    spacing={8}
                    sx={{ marginTop: '10px' }}
                >
                    <Grid
                        container
                        item
                        justifyContent='center'
                        alignContent='center'
                        alignItems='center'
                    >
                        <Grid item>
                            <FormLabel label='MANPOWER HIRING & DEPLOYMENT PLAN' />
                            <FormSubLabel label={ResultSubLabel} />
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        item
                        justifyContent='center'
                        alignContent='center'
                        alignItems='center'
                    >
                        <Grid
                            container
                            item
                            lg={4}
                            direction='row'
                            justifyContent='center'
                            alignContent='center'
                            alignItems='center'
                        >
                            <Grid item lg={3}>
                                <FormLabel label='Start Date' />
                            </Grid>
                            <Grid item lg={8}>
                                <FormDateSelector
                                    label=''
                                    value={
                                        warehouseResultState.result_start_date
                                    }
                                    onChange={handleWarehouseStartDateChange}
                                    minDate={dayjs()}
                                />
                            </Grid>
                        </Grid>

                        <Grid
                            container
                            item
                            lg={4}
                            direction='row'
                            justifyContent='center'
                            alignContent='center'
                            alignItems='center'
                        >
                            <Grid item lg={3}>
                                <FormLabel label='End Date' />
                            </Grid>
                            <Grid item lg={8}>
                                <FormDateSelector
                                    label=''
                                    value={warehouseResultState.result_end_date}
                                    onChange={handleWarehouseEndDateChange}
                                    minDate={dayjs()}
                                />
                            </Grid>
                        </Grid>

                        <Grid
                            container
                            item
                            lg={4}
                            direction='row'
                            justifyContent='center'
                            alignContent='center'
                            alignItems='center'
                        >
                            <Grid item lg={3}>
                                <FormLabel label='Category' />
                            </Grid>
                            <Grid item lg={8}>
                                <FormMultiDropDown
                                    id='select-category-dropdown'
                                    labelId='select-category-dropdown-input-label'
                                    label=''
                                    value={
                                        warehouseResultState.result_category
                                            ? warehouseResultState.result_category
                                            : selectedCategory
                                    }
                                    data={
                                        warehouseResultState.result_categories
                                            ? warehouseResultState.result_categories
                                            : []
                                    }
                                    onChange={handleSelectedCategoryChange}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        item
                        lg={12}
                        direction='row'
                        justifyContent='center'
                        alignContent='center'
                        alignItems='center'
                    >
                        <FormCardField items={cardItems} />
                    </Grid>

                    <Grid
                        container
                        item
                        justifyContent='center'
                        alignContent='center'
                        alignItems='center'
                        columnSpacing={1}
                        rowSpacing={4}
                    >
                        <Grid
                            container
                            item
                            lg={12}
                            justifyContent='center'
                            alignContent='center'
                            alignItems='center'
                        >
                            <Grid item>
                                <FormLabel label='Expected Demand vs Fulfillment' />
                            </Grid>
                            <Grid item lg={12}>
                                <Paper
                                    sx={{
                                        width: '100%',
                                        height: 350,
                                    }}
                                >
                                    <FormGraph
                                        xLabel='date'
                                        yLabel=''
                                        data={resultChartData}
                                        lineData={lineData}
                                    />
                                </Paper>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            item
                            lg={12}
                            justifyContent='center'
                            alignContent='center'
                            alignItems='center'
                            rowSpacing={2}
                        >
                            <Grid item>
                                <FormLabel label='Deployment Schedule' />
                            </Grid>
                            <Grid
                                container
                                item
                                lg={12}
                                justifyContent='center'
                                alignContent='center'
                                alignItems='center'
                            >
                                <Grid item lg={3}>
                                    <FormLabel label='Select table' />
                                </Grid>
                                <Grid item lg={6}>
                                    <FormDropDown
                                        id='select-table-dropdown'
                                        labelId='select-table-dropdown-input-label'
                                        label=''
                                        value={
                                            warehouseResultState.result_table
                                                ? warehouseResultState.result_table
                                                : selectedTable
                                        }
                                        data={ResultTableTypes}
                                        onChange={handleSelectedTableChange}
                                    />
                                </Grid>
                            </Grid>
                            {outputData &&
                                !object.isEmpty(outputData) &&
                                selectedTable?.id === 1 && (
                                    <Grid
                                        item
                                        container
                                        lg={12}
                                        flex='column'
                                        justifyContent='center'
                                        alignContent='center'
                                        alignItems='center'
                                        rowGap={5}
                                    >
                                        <Grid
                                            item
                                            xs={12}
                                            sx={{ height: '400px' }}
                                        >
                                            <FormTable
                                                id='result-category-wise-data-table'
                                                tableType='category'
                                                tableHeaders={
                                                    resultCategoryTableHeaders
                                                }
                                                tableData={outputData}
                                                total={dateWiseTotal}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <PrimaryButton
                                                id='result-category-wise-data-table-download-btn'
                                                label='DOWNLOAD TABLE AS EXCEL'
                                                onClick={() =>
                                                    DownloadResultData(
                                                        'category',
                                                    )
                                                }
                                                disabled={false}
                                            />
                                        </Grid>
                                    </Grid>
                                )}
                            {demandData &&
                                !object.isEmpty(demandData) &&
                                selectedTable?.id === 2 && (
                                    <Grid
                                        item
                                        container
                                        lg={12}
                                        flex='column'
                                        justifyContent='center'
                                        alignContent='center'
                                        alignItems='center'
                                        rowGap={5}
                                    >
                                        <Grid
                                            item
                                            xs={12}
                                            sx={{ height: '400px' }}
                                        >
                                            <FormTable
                                                id='result-demand-wise-data-table'
                                                tableType='demand'
                                                tableHeaders={
                                                    resultDemandTableHeaders
                                                }
                                                tableData={demandData}
                                                total={null}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <PrimaryButton
                                                id='result-demand-wise-data-table-download-btn'
                                                label='DOWNLOAD TABLE AS EXCEL'
                                                onClick={() =>
                                                    DownloadResultData('demand')
                                                }
                                                disabled={false}
                                            />
                                        </Grid>
                                    </Grid>
                                )}
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    )
}

export default Result
