import { FormLabel } from '../../components/FormElements'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Container } from '@mui/material'

const theme = createTheme()

const WelcomePage = () => {
    return (
        <ThemeProvider theme={theme}>
            <Container component='main' sx={{ flexGrow: 1 }} fixed>
                <FormLabel label='Welcome to Optimization App' />
            </Container>
        </ThemeProvider>
    )
}

export default WelcomePage
