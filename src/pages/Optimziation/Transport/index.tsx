import { useEffect } from 'react'
import { Tabs, Tab, Container, Grid } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'

import { TabContext } from '@mui/lab'
import RouteOptimizer from './Route'
import RouteResult from './Result'
import UserSession from '../../../services/auth'

const Transport = () => {
    const navigate = useNavigate()

    const TransportMenuTabs: any = {
        route: {
            label: 'Route Simulator',
            element: <RouteOptimizer />,
            active: true,
        },
        result: {
            label: 'Simulation Result',
            element: <RouteResult />,
            active: true,
        },
    }

    const ScreenNames = Object.keys(TransportMenuTabs)

    const { pageName = ScreenNames[0] } = useParams()

    useEffect(() => {
        if (!ScreenNames.includes(pageName)) {
            navigate('/transport/route')
        }
    }, [])

    useEffect(() => {
        if (ScreenNames.includes(pageName)) {
            navigate('/transport/route')
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
                            aria-label='Transport Menu Tabs'
                            value={pageName}
                            onChange={(_, value) => {
                                TransportMenuTabs[value].active
                                    ? navigate(`/transport/${value}`)
                                    : null
                            }}
                        >
                            {Object.keys(TransportMenuTabs).map(
                                (value: any, index: any) => (
                                    <Tab
                                        key={index}
                                        value={value}
                                        label={TransportMenuTabs[value].label}
                                        sx={{
                                            fontSize: '1.1rem',
                                        }}
                                        disabled={
                                            !TransportMenuTabs[value].active
                                        }
                                    />
                                ),
                            )}
                        </Tabs>
                    </TabContext>
                    {ScreenNames.includes(pageName) &&
                        TransportMenuTabs[pageName].element}
                </Grid>
            </Grid>
        </Container>
    )
}

export default Transport
