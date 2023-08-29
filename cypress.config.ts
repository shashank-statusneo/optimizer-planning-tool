import { defineConfig } from 'cypress'
export default defineConfig({
    projectId: 'pzor62',
    env: {
        apiUrl: 'http://localhost:5000/optimization-api',
        authUrl: 'http://localhost:10001/auth',
        defaultTestEmail: 'test@email.com',
        defaultTestPassword: 'test@12345',
        defaultIncorrectTestEmail: 'wrongtest@email.com',
        defaultIncorrectTestPassword: 'test@123456',
    },

    e2e: {
        baseUrl: 'http://localhost:3000/optimization',
    },

    component: {
        devServer: {
            framework: 'create-react-app',
            bundler: 'webpack',
        },
    },
})
