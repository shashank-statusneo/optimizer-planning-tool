import { useEffect } from 'react'
import { Tabs, Tab, Container, Grid } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'

import { TabContext } from '@mui/lab'
import RouteOptimizer from './Route'
import { useAppSelector } from '../../hooks/redux-hooks'

const Transport = () => {
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
                    <RouteOptimizer />
                </Grid>
            </Grid>
        </Container>
    )
}

export default Transport
