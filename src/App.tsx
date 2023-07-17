import { useState } from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
    useNavigate,
    useLocation,
} from 'react-router-dom'
import InventoryOptimizer from './pages/Optimziation/Inventory'
import WareHouse from './pages/Optimziation/Warehouse'
import Transport from './pages/Optimziation/Transport'
import TopBar from './components/TopBar'
import SignIn from './pages/Home/SignIn'
import SignUp from './pages/Home/SignUp'
// import Profile from './pages/Home/profile'
import WelcomePage from './pages/Home/Welcome'
import PageNotFound from './pages/Home/PageNotFound'
import UserSession from './services/auth'

import AppTabs from './components/Tabs'

const App = () => {
    // @ts-ignore
    return (
        <BrowserRouter>
            <TopBar />
            <AppTabs />

            <Routes>
                <Route path='*' element={<PageNotFound />} />

                <Route
                    // exact
                    path='/'
                    element={
                        UserSession.isAuthenticated() ? (
                            <WelcomePage />
                        ) : (
                            <SignIn />
                        )
                    }
                />

                <Route path='/welcome' element={<WelcomePage />} />

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
                {/* <Route path='/profile' element={<Profile />}></Route> */}
            </Routes>
        </BrowserRouter>
    )
}

export default App
