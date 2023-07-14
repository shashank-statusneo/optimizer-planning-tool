import { useEffect } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Container, Grid, Typography } from '@mui/material'
import { PrimaryButton } from '../../components/Buttons'
import { useNavigate } from 'react-router-dom'
import UserSession from '../../services/auth'

const theme = createTheme()

const WelcomePage = () => {
    const navigate = useNavigate()

    useEffect(() => {
        if (!UserSession.isAuthenticated()) {
            navigate('/signin')
        }
    }, [UserSession.isAuthenticated()])

    return (
        <ThemeProvider theme={theme}>
            <Container component='main' maxWidth='md' fixed>
                <Grid
                    container
                    justifyContent='center'
                    alignItems='center'
                    alignContent='center'
                    sx={{ height: '50vh', mt: 5 }}
                    rowSpacing={3}
                >
                    <Grid container item lg={12} justifyContent='center'>
                        <Typography variant='h5' fontWeight='bold'>
                            Welcome to Optimization App
                        </Typography>
                    </Grid>
                    <Grid container item lg={6} justifyContent='center'>
                        <PrimaryButton
                            id='main-app-navigator-btn'
                            label='Proceed To App >'
                            onClick={() => navigate('/warehouse')}
                        />
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    )
}

export default WelcomePage
