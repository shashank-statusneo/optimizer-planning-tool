import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Container, Grid, Typography } from '@mui/material'

const theme = createTheme()

const PageNotFound = () => {
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
                            Page Not Found
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    )
}

export default PageNotFound
