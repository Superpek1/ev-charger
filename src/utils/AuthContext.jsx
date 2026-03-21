import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api/axios'; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    setCurrentUser({ role: 'user' }); 
                }
            } catch (err) {
                console.error("Token ไม่ถูกต้อง:", err);
                localStorage.removeItem('token');
            } finally {
                setLoading(false);
            }
        };
        verifyUser();
    }, []);

    const login = (userData, token) => {
        setCurrentUser(userData);
        localStorage.setItem('token', token);
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ currentUser, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);