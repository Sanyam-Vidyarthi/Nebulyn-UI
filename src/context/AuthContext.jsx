import { createContext, useContext, useEffect, useState } from 'react';
import { API_BASE_URL } from '../config/api';


const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch user profile from backend using token
    const fetchUserProfile = async (token) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
                return userData;
            } else {
                // Token is invalid or expired
                localStorage.removeItem('token');
                setUser(null);
                return null;
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
            localStorage.removeItem('token');
            setUser(null);
            return null;
        }
    };

    // Check for existing session on mount
    useEffect(() => {
        const initializeAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                await fetchUserProfile(token);
            }
            setLoading(false);
        };

        initializeAuth();
    }, []);

    const signUp = async (data) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: data.username || data.email.split('@')[0],
                    email: data.email,
                    password: data.password,
                }),
            });
            const result = await response.json();

            if (response.ok) {
                // Store token and set user state
                localStorage.setItem('token', result.token);
                setUser({
                    _id: result._id,
                    username: result.username,
                    email: result.email,
                });
                return { data: { user: result }, error: null };
            } else {
                return { data: null, error: { message: result.message } };
            }
        } catch (error) {
            return { data: null, error: { message: error.message } };
        }
    };

    const signIn = async (data) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password,
                }),
            });
            const result = await response.json();

            if (response.ok) {
                // Store token and set user state
                localStorage.setItem('token', result.token);
                setUser({
                    _id: result._id,
                    username: result.username,
                    email: result.email,
                });
                return { data: { user: result }, error: null };
            } else {
                return { data: null, error: { message: result.message } };
            }
        } catch (error) {
            return { data: null, error: { message: error.message } };
        }
    };

    const signOut = async () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const value = {
        signUp,
        signIn,
        signOut,
        user,
        loading,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
