import { useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import InventoryOptimizer from './pages/InventoryOptimizer'
import WareHouse from './pages/Warehouse'
import Transport from './pages/Transport'
import TopBar from './components/TopBar'
import SignIn from './pages/Home/SignIn'
import SignUp from './pages/Home/SignUp'
import Profile from './pages/Home/profile'
import WelcomePage from './pages/Home/Welcome'
import PageNotFound from './pages/Home/PageNotFound'
import UserSession from './services/auth'
import { TabContext } from '@mui/lab'
import { Container, Tabs, Tab } from '@mui/material'

const App = () => {
    const [currentTab, setCurrentTab] = useState('warehouse')

    const AppTabs = () => {
        const navigate = useNavigate()

        const mainMenuTabs: any = {
            warehouse: 'Warehouse',
            inventory: 'Inventory',
            transport: 'Transport',
        }

        return (
            <Container maxWidth='xl'>
                <TabContext value={currentTab}>
                    <Tabs
                        variant='fullWidth'
                        style={{ marginBottom: '10px' }}
                        selectionFollowsFocus
                        aria-label='Application Tabs'
                        value={currentTab}
                        onChange={(_, value) => {
                            setCurrentTab(value)
                            navigate(`/${value}`)
                        }}
                    >
                        {Object.keys(mainMenuTabs).map(
                            (value: any, index: any) => (
                                <Tab
                                    key={index}
                                    value={value}
                                    label={mainMenuTabs[value]}
                                    sx={{
                                        fontWeight: 'bold',
                                        fontSize: '1.5rem',
                                    }}
                                />
                            ),
                        )}
                    </Tabs>
                </TabContext>
            </Container>
        )
    }

    // @ts-ignore
    return (
        <BrowserRouter>
            <TopBar />

            {UserSession.isAuthenticated() ? (
                <>
                    <AppTabs />
                </>
            ) : (
                <></>
            )}
            <Routes>
                <Route path='*' element={<PageNotFound/>} />

                <Route
                    // exact
                    path='/'
                    element={UserSession.isAuthenticated() ? <WelcomePage/> : <SignIn />}
                />

                <Route path='/warehouse' element={<WareHouse />} />
                <Route path='/warehouse/:pageName' element={<WareHouse />} />

                <Route
                    path='/inventory'
                    element={<InventoryOptimizer />}
                ></Route>
                <Route
                    path='/inventory/:pageName'
                    element={<InventoryOptimizer />}
                ></Route>

                <Route path='/transport' element={<Transport />}></Route>
                <Route
                    path='/transport/:pageName'
                    element={<Transport />}
                ></Route>

                <Route path='/signin' element={<SignIn />}></Route>
                <Route path='/signup' element={<SignUp />}></Route>
                <Route path='/profile' element={<Profile />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
