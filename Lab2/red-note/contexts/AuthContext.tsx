import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { users } from "../data/users";
import { User } from "../types";

interface AuthContextType {
    user: User | null;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    login: async () => false,
    logout: async () => { },
    isAuthenticated: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    // Load user from storage on mount
    useEffect(() => {
        const loadUser = async () => {
            try {
                const userString = await AsyncStorage.getItem("user");
                if (userString) {
                    setUser(JSON.parse(userString));
                }
            } catch (error) {
                console.error("Error loading user:", error);
            }
        };
        loadUser();
    }, []);

    const login = async (username: string, password: string): Promise<boolean> => {
        try {
            const foundUser = users.find(
                (u) => u.username === username && u.password === password
            );

            if (foundUser) {
                setUser(foundUser);
                await AsyncStorage.setItem("user", JSON.stringify(foundUser));
                return true;
            }
            return false;
        } catch (error) {
            console.error("Login error:", error);
            return false;
        }
    };

    const logout = async (): Promise<void> => {
        try {
            setUser(null);
            await AsyncStorage.removeItem("user");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                isAuthenticated: !!user,
            }}>
            {children}
        </AuthContext.Provider>
    );
};
