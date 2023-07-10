import { FormLabel } from '../../components/FormElements'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Container } from '@mui/material'

const theme = createTheme()

const PageNotFound = () => {
    return (
        <ThemeProvider theme={theme}>
            <Container component='main' sx={{ flexGrow: 1 }} fixed>
                <FormLabel label='Page Not Found' />
            </Container>
        </ThemeProvider>
    )
}

export default PageNotFound
