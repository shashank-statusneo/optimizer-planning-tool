import { useState, useEffect } from 'react'
import { Container, Grid } from '@mui/material'
import WarehouseSelect from './Select'
import WarehouseRequirement from './Requirement'
import BenchmarkProductivity from './Productivity'
import DemandForecast from './Demand'
import Result from './Result'
import { NavigationBtn } from '../../../components/Buttons'
import { useAppSelector } from '../../../hooks/redux-hooks'
import { FormAlertElement } from '../../../components/FormElements'
import dayjs from 'dayjs'
import { useParams, useNavigate } from 'react-router-dom'
import object from 'lodash'
import UserSession from '../../../services/auth'

const WareHouse = () => {
    const navigate = useNavigate()

    const warehouseSelectState = useAppSelector(
        // @ts-ignore
        (state) => state.warehouseSelect,
    )

    const warehouseProductivityState = useAppSelector(
        // @ts-ignore
        (state) => state.warehouseProductivity,
    )

    const warehouseDemandState = useAppSelector(
        // @ts-ignore
        (state) => state.warehouseDemand,
    )

    const warehouseRequirementState = useAppSelector(
        // @ts-ignore
        (state) => state.warehouseRequirement,
    )

    const [alertState, setAlertState] = useState(false)

    const PageToScreen: any = {
        select: {
            element: <WarehouseSelect />,
            previous: null,
            next: 'benchmark',
            complete:
                warehouseSelectState?.planning_warehouse &&
                dayjs(warehouseSelectState.planning_start_date).format(
                    'YYYY-MM-DD',
                ) !== 'Invalid Date' &&
                dayjs(warehouseSelectState.planning_end_date).format(
                    'YYYY-MM-DD',
                ) !== 'Invalid Date' &&
                warehouseSelectState.planning_end_date >=
                    warehouseSelectState.planning_start_date
                    ? true
                    : false,
            prompt: null,
        },
        benchmark: {
            element: <BenchmarkProductivity />,
            previous: 'select',
            next: 'demand',
            complete:
                warehouseProductivityState?.productivity_table_data &&
                warehouseProductivityState?.productivity_table_data.length > 0
                    ? true
                    : false,
            prompt: warehouseProductivityState.flag_productivity_table_updated,
        },
        demand: {
            element: <DemandForecast />,
            previous: 'benchmark',
            next: 'requirement',
            complete:
                warehouseDemandState?.demand_table_data &&
                !object.isEmpty(warehouseDemandState?.demand_table_data)
                    ? true
                    : false,
            prompt: warehouseDemandState.flag_demand_table_updated,
        },
        requirement: {
            element: <WarehouseRequirement />,
            previous: 'demand',
            next: 'result',
            complete:
                warehouseRequirementState?.percentage_absent_expected &&
                warehouseRequirementState?.num_current_employees &&
                warehouseRequirementState?.total_hiring_budget &&
                warehouseRequirementState?.cost_per_employee_per_month &&
                warehouseRequirementState?.total_hiring_budget >=
                    warehouseRequirementState?.cost_per_employee_per_month &&
                warehouseRequirementState?.day_working_hours &&
                warehouseRequirementState?.day_working_hours <= 24
                    ? true
                    : false,
            prompt: null,
        },
        result: {
            element: <Result />,
            previous: 'requirement',
            next: null,
            complete:
                warehouseSelectState?.planning_warehouse &&
                dayjs(warehouseSelectState.planning_start_date).format(
                    'YYYY-MM-DD',
                ) !== 'Invalid Date' &&
                dayjs(warehouseSelectState.planning_end_date).format(
                    'YYYY-MM-DD',
                ) !== 'Invalid Date' &&
                warehouseSelectState.planning_end_date >=
                    warehouseSelectState.planning_start_date &&
                warehouseProductivityState?.productivity_table_data &&
                warehouseProductivityState?.productivity_table_data.length >
                    0 &&
                warehouseDemandState?.demand_table_data &&
                !object.isEmpty(warehouseDemandState?.demand_table_data) &&
                warehouseRequirementState?.percentage_absent_expected &&
                warehouseRequirementState?.num_current_employees &&
                warehouseRequirementState?.total_hiring_budget &&
                warehouseRequirementState?.cost_per_employee_per_month &&
                warehouseRequirementState?.day_working_hours
                    ? true
                    : false,
            prompt: null,
        },
    }
    const ScreenNames = Object.keys(PageToScreen)

    const { pageName = ScreenNames[0] } = useParams()

    useEffect(() => {
        if (!ScreenNames.includes(pageName)) {
            navigate('/warehouse/select')
        }
    }, [])

    useEffect(() => {
        if (
            ScreenNames.includes(pageName) &&
            !PageToScreen[pageName].complete
        ) {
            navigate('/warehouse/select')
        }
    }, [])

    useEffect(() => {
        if (!UserSession.isAuthenticated()) {
            navigate('/signin')
        }
    }, [UserSession.isAuthenticated()])

    const handleNext = () => {
        if (PageToScreen[pageName].prompt) {
            setAlertState(true)
        } else {
            navigate(`/warehouse/${PageToScreen[pageName].next}`)
        }
    }

    const handlePrevious = () => {
        navigate(`/warehouse/${PageToScreen[pageName].previous}`)
    }

    const handleProceed = () => {
        setAlertState(false)
        navigate(`/warehouse/${PageToScreen[pageName].next}`)
    }

    const handleCancel = () => {
        setAlertState(false)
    }
    try {
        return (
            <Container maxWidth='xl'>
                <Grid container>
                    {alertState && (
                        <FormAlertElement
                            open={alertState}
                            onClose={() => setAlertState(false)}
                            label='warehouse-form-save-alert-label'
                            id='warehouse-form-save-alert'
                            title='Review Changes'
                            content='There are unsaved changes! Do you wish to continue?'
                            buttons={[
                                { label: 'Proceed', onClick: handleProceed },
                                { label: 'Cancel', onClick: handleCancel },
                            ]}
                        />
                    )}
                    <Grid item lg={2} md={2} sm={2} bgcolor='#D0E8FD'></Grid>
                    <Grid
                        item
                        lg={10}
                        md={10}
                        sm={10}
                        style={{
                            borderStyle: 'solid',
                            borderWidth: '0.2px',
                            padding: '5px',
                        }}
                    >
                        <Grid item>
                            {ScreenNames.includes(pageName) &&
                                PageToScreen[pageName].element}
                        </Grid>

                        <Grid
                            container
                            item
                            justifyContent='space-between'
                            alignItems='center'
                            sx={{ marginTop: '150px' }}
                        >
                            <Grid item>
                                <NavigationBtn
                                    id='navigation-btn-previous'
                                    label='< Previous'
                                    onClick={handlePrevious}
                                    disabled={false}
                                    render={PageToScreen[pageName].previous}
                                />
                            </Grid>
                            <Grid item>
                                <NavigationBtn
                                    id='navigation-btn-next'
                                    label='Next >'
                                    onClick={handleNext}
                                    disabled={!PageToScreen[pageName].complete}
                                    render={PageToScreen[pageName].next}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        )
    } catch (e) {
        return <></>
    }
}

export default WareHouse
