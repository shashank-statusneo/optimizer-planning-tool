import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import { TabContext } from '@mui/lab'
import { Container, Tabs, Tab } from '@mui/material'
import UserSession from '../services/auth'

const AppTabs = () => {
    const [currentTab, setCurrentTab] = useState('warehouse')
    const navigate = useNavigate()
    const location = useLocation()

    const mainMenuTabs: any = {
        warehouse: 'Warehouse',
        inventory: 'Inventory',
        transport: 'Transport',
    }

    const tabsVisibility =
        UserSession.isAuthenticated() &&
        ['warehouse', 'inventory', 'transport'].some((appPath) =>
            location.pathname.includes(appPath),
        )

    return (
        <Container maxWidth='xl'>
            {tabsVisibility && (
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
            )}
        </Container>
    )
}

export default AppTabs
