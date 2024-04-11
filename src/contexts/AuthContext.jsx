import React, {createContext, useContext, useEffect, useState} from 'react';
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            setUser(decoded);
        }
    }, []);

    const register = async (userData) => {
        try {
            const response = await fetch(`${apiUrl}/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            const data = await response.json();
            if (response.ok) {
                // Handle registration success
                // Consider whether you want to automatically log the user in after registration
                setUser(data);
            } else {
                // Handle registration errors
                console.error('Registration error:', data);
            }
        } catch (error) {
            console.error('Registration exception:', error);
        }
    };

    const login = async (email, password) => {
        try {
            const response = await fetch(`${apiUrl}/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const { token } = await response.json();
            if (response.ok) {
                const decoded = jwtDecode(token);
                setUser(decoded);
                localStorage.setItem('token', token);
            } else {
                console.error('Login error');
            }
        } catch (error) {
            console.error('Login exception:', error);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
    };

    const updateUser = async (userData) => {
        console.log('Updating user with data:', userData);
        try {
            const response = await fetch(`${apiUrl}/users/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const updatedUser = await response.json();
                setUser(updatedUser);
            } else {
                console.error('Update user error:', await response.json());
            }
        } catch (error) {
            console.error('Update user exception:', error);
        }
    };


    const updatePassword = async (passwordData) => {
        try {
            const response = await fetch(`${apiUrl}/users/password`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(passwordData),
            });
            const result = await response.json();
            if (response.ok) {
                logout()

                // Use navigate to redirect to the login page
                window.location.href = '/login';
            } else {
                console.error('Update password error:', result);
            }
        } catch (error) {
            console.error('Update password exception:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, register, login, logout, updateUser, updatePassword }}>
            {children}
        </AuthContext.Provider>
    );

};
