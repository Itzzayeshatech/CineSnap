import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // In pure UI mode, try to maintain state in localStorage for convenience
    // so refreshes don't instantly log you out during protoyping.
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('mock_user_session');
        return saved ? JSON.parse(saved) : null;
    });
    const [loading, setLoading] = useState(false);

    const login = async (email, password) => {
        // Mock API call
        const res = await api.post('/auth/login', { email, password });
        setUser(res.data);
        localStorage.setItem('mock_user_session', JSON.stringify(res.data));
    };

    const register = async (name, email, password) => {
        const res = await api.post('/auth/register', { name, email, password });
        setUser(res.data);
        localStorage.setItem('mock_user_session', JSON.stringify(res.data));
    };

    const logout = async () => {
        await api.get('/auth/logout');
        setUser(null);
        localStorage.removeItem('mock_user_session');
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
