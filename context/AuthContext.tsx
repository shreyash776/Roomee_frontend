import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as jwtDecode from "jwt-decode";

interface User {
    id: string;
    name: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (token: string) => Promise<void>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const checkAuth = async () => {
        setIsLoading(true);
        try {
            const token = await AsyncStorage.getItem("authToken");
            if (token) {
                await handleLogin(token);
            } else {
                setIsAuthenticated(false);
                setUser(null);
            }
        } catch (error) {
            console.error("Error checking authentication:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogin = async (token: string) => {
        try {
            await AsyncStorage.setItem("authToken", token);
            console.log("Token before decoding:", token);
    
            const decoded: any = jwtDecode.default
                ? jwtDecode.default(token) 
                : jwtDecode(token);
            
            console.log("Decoded token:", decoded);
    
            if (!decoded || !decoded.id || !decoded.name) {
                throw new Error("Invalid token structure");
            }
    
            setUser({ id: decoded.id, name: decoded.name });
            setIsAuthenticated(true);
        } catch (error) {
            console.error("Login error:", error);
        }
    };
    

    const handleLogout = async () => {
        await AsyncStorage.removeItem("authToken");
        setUser(null);
        setIsAuthenticated(false);
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                isLoading,
                login: handleLogin,
                logout: handleLogout,
                checkAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
