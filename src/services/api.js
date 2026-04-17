// Mock API Layer replacing real Axios requests
const MOCK_DELAY = 800; // Simulated network delay in ms

export const api = {
    // Mock user database
    currentUser: null,

    get: async (endpoint) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (endpoint === '/auth/profile') {
                    if (api.currentUser) resolve({ data: api.currentUser });
                    else reject({ response: { data: { message: "Not authenticated" } } });
                } else if (endpoint === '/auth/logout') {
                    api.currentUser = null;
                    resolve({ data: { success: true } });
                } else {
                    reject(new Error(`Mock endpoint ${endpoint} not implemented for GET`));
                }
            }, MOCK_DELAY);
        });
    },

    post: async (endpoint, payload) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (endpoint === '/auth/login' || endpoint === '/auth/register') {
                    // Instantly mock auth success
                    const mockUser = {
                        _id: 'mock_123',
                        name: payload.name || 'Cosmic Explorer',
                        email: payload.email,
                        role: 'user'
                    };
                    api.currentUser = mockUser;
                    resolve({ data: mockUser });
                } else {
                    reject(new Error(`Mock endpoint ${endpoint} not implemented for POST`));
                }
            }, MOCK_DELAY);
        });
    }
};

export default api;
