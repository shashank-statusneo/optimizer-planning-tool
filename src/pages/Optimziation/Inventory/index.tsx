import { useEffect } from 'react'
import { Tabs, Tab, Container, Grid } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'

import { TabContext } from '@mui/lab'
import Optimizer from './Optimizer'
import OptimizerResultContainer from './OptimizerResult'
import SimulatorContainer from './Simulator'
import { useAppSelector } from '../../../hooks/redux-hooks'
import UserSession from '../../../services/auth'

const InventoryOptimizer = () => {
    const navigate = useNavigate()

    const inventoryOptimizerState = useAppSelector(
        (state) => state.inventoryOptimizer,
    )

    const inventoryResultState = useAppSelector(
        (state) => state.inventoryResult,
    )

    const InventoryMenuTabs: any = {
        optimizer: {
            label: 'Optimizer',
            element: <Optimizer />,
            active: true,
        },
        result: {
            label: 'Optimizer Result',
            element: <OptimizerResultContainer />,
            active:
                inventoryOptimizerState?.demand_master_id &&
                inventoryOptimizerState?.vendor_master_id &&
                inventoryOptimizerState?.annual_cost &&
                (inventoryOptimizerState.fill_rate ||
                    inventoryOptimizerState.cycle_service_level) &&
                inventoryResultState?.result &&
                inventoryResultState?.policy_detail &&
                inventoryResultState?.simulation_output,
            // active: true
        },
        simulator: {
            label: 'Simulator',
            element: <SimulatorContainer />,
            active:
                inventoryOptimizerState?.demand_master_id &&
                inventoryOptimizerState?.vendor_master_id &&
                inventoryOptimizerState?.annual_cost &&
                (inventoryOptimizerState.fill_rate ||
                    inventoryOptimizerState.cycle_service_level) &&
                inventoryResultState?.result &&
                inventoryResultState?.policy_detail &&
                inventoryResultState?.simulation_output,
        },
    }

    const ScreenNames = Object.keys(InventoryMenuTabs)

    const { pageName = ScreenNames[0] } = useParams()

    useEffect(() => {
        if (!ScreenNames.includes(pageName)) {
            navigate('/inventory/optimizer')
        }
    }, [])

    useEffect(() => {
        if (ScreenNames.includes(pageName)) {
            navigate('/inventory/optimizer')
        }
    }, [])

    useEffect(() => {
        if (!UserSession.isAuthenticated()) {
            navigate('/signin')
        }
    }, [UserSession.isAuthenticated()])

    return (
        <Container maxWidth='xl'>
            <Grid container>
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
                    <TabContext value={pageName}>
                        <Tabs
                            variant='fullWidth'
                            style={{ marginBottom: '20px' }}
                            selectionFollowsFocus
                            aria-label='Inventory Menu Tabs'
                            value={pageName}
                            onChange={(_, value) => {
                                InventoryMenuTabs[value].active
                                    ? navigate(`/inventory/${value}`)
                                    : null
                            }}
                        >
                            {Object.keys(InventoryMenuTabs).map(
                                (value: any, index: any) => (
                                    <Tab
                                        key={index}
                                        value={value}
                                        label={InventoryMenuTabs[value].label}
                                        sx={{
                                            fontSize: '1.1rem',
                                        }}
                                        disabled={
                                            !InventoryMenuTabs[value].active
                                        }
                                    />
                                ),
                            )}
                        </Tabs>
                    </TabContext>
                    {ScreenNames.includes(pageName) &&
                        InventoryMenuTabs[pageName].element}
                </Grid>
            </Grid>
        </Container>
    )
}

export default InventoryOptimizer
