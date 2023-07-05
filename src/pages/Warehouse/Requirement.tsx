import { Container, Grid, InputAdornment } from '@mui/material'
import { FormLabel, FormTextField } from '../../components/FormElements'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'

import {
    updatePercentageAbsentExpected,
    updateNumCurrentEmployees,
    updateTotalHiringBudget,
    updateCostPerEmployeePerMonth,
    updateDayWorkingHours,
} from '../../redux/actions/warehouse/requirement'

import { createTheme, ThemeProvider } from '@mui/material/styles'
const theme = createTheme()

const WarehouseRequirement = () => {
    const dispatch = useAppDispatch()

    const warehouseRequirementState = useAppSelector(
        // @ts-ignore
        (state) => state.warehouseRequirement,
    )

    return (
        <ThemeProvider theme={theme}>
            <Container component='main' sx={{ flexGrow: 1 }} fixed>
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
                        <Grid item lg={8}>
                            <FormLabel label='Enter other requirements' />
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        item
                        justifyContent='center'
                        alignContent='center'
                        alignItems='center'
                        spacing={2}
                    >
                        <Grid item lg={4}>
                            <FormLabel label='% of absentees expected' />
                        </Grid>
                        <Grid item lg={3}>
                            <FormTextField
                                id='percent-absentees-textfield'
                                value={
                                    warehouseRequirementState.percentage_absent_expected
                                }
                                type='number'
                                onChange={(e: any) => {
                                    dispatch(
                                        // @ts-ignore
                                        updatePercentageAbsentExpected(
                                            e.target.value,
                                        ),
                                    )
                                }}
                                inputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            %
                                        </InputAdornment>
                                    ),
                                    inputProps: {
                                        min: 0,
                                    },
                                }}
                                error={false}
                                onErrorMessage={''}
                                disabled={false}
                                size={'medium'}
                                sx={{}}
                            />
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        item
                        justifyContent='center'
                        alignContent='center'
                        alignItems='center'
                        spacing={2}
                    >
                        <Grid item lg={4}>
                            <FormLabel label='Number of current employees' />
                        </Grid>
                        <Grid item lg={3}>
                            <FormTextField
                                id='current-employees-textfield'
                                value={
                                    warehouseRequirementState.num_current_employees
                                }
                                type='number'
                                onChange={(e: any) => {
                                    dispatch(
                                        // @ts-ignore
                                        updateNumCurrentEmployees(
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
                                size={'medium'}
                                sx={{}}
                            />
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        item
                        justifyContent='center'
                        alignContent='center'
                        alignItems='center'
                        spacing={2}
                    >
                        <Grid item lg={4}>
                            <FormLabel label='Total hiring budget' />
                        </Grid>
                        <Grid item lg={3}>
                            <FormTextField
                                id='hiring-budget-textfield'
                                value={
                                    warehouseRequirementState.total_hiring_budget
                                }
                                type='number'
                                onChange={(e: any) => {
                                    dispatch(
                                        // @ts-ignore
                                        updateTotalHiringBudget(e.target.value),
                                    )
                                }}
                                inputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            ₹
                                        </InputAdornment>
                                    ),
                                    inputProps: {
                                        min: 0,
                                    },
                                }}
                                error={
                                    warehouseRequirementState.total_hiring_budget <
                                    warehouseRequirementState.cost_per_employee_per_month
                                }
                                onErrorMessage={
                                    'Total Hiring Budget should be more than or equal to Monthly cost per Employee'
                                }
                                disabled={false}
                                size={'medium'}
                                sx={{}}
                            />
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        item
                        justifyContent='center'
                        alignContent='center'
                        alignItems='center'
                        spacing={2}
                    >
                        <Grid item lg={4}>
                            <FormLabel label='Monthly cost per employee' />
                        </Grid>
                        <Grid item lg={3}>
                            <FormTextField
                                id='cost-per-employee-textfield'
                                value={
                                    warehouseRequirementState.cost_per_employee_per_month
                                }
                                type='number'
                                onChange={(e: any) => {
                                    dispatch(
                                        // @ts-ignore
                                        updateCostPerEmployeePerMonth(
                                            e.target.value,
                                        ),
                                    )
                                }}
                                inputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            ₹
                                        </InputAdornment>
                                    ),
                                    inputProps: {
                                        min: 0,
                                    },
                                }}
                                error={false}
                                onErrorMessage={''}
                                disabled={false}
                                size={'medium'}
                                sx={{}}
                            />
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        item
                        justifyContent='center'
                        alignContent='center'
                        alignItems='center'
                        spacing={2}
                    >
                        <Grid item lg={4}>
                            <FormLabel label='Working hours' />
                        </Grid>
                        <Grid item lg={3}>
                            <FormTextField
                                id='working-hours-textfield'
                                value={
                                    warehouseRequirementState.day_working_hours
                                }
                                type='number'
                                onChange={(e: any) => {
                                    dispatch(
                                        // @ts-ignore
                                        updateDayWorkingHours(e.target.value),
                                    )
                                }}
                                inputProps={{
                                    inputProps: {
                                        min: 0,
                                        max: 24,
                                    },
                                }}
                                error={
                                    warehouseRequirementState.day_working_hours >
                                    24
                                }
                                onErrorMessage={
                                    'Working hours should be less than or equal to 24'
                                }
                                disabled={false}
                                size={'medium'}
                                sx={{}}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    )
}

export default WarehouseRequirement
