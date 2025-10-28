import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Appearance } from "react-native";

type Theme = "light" | "dark";
type ThemeMode = "manual" | "system" | "sunset-sunrise";

interface ThemeContextType {
    theme: Theme;
    themeMode: ThemeMode;
    toggleTheme: () => void;
    setTheme: (theme: Theme) => Promise<void>;
    setThemeMode: (mode: ThemeMode) => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: "light",
    themeMode: "manual",
    toggleTheme: () => { },
    setTheme: async () => { },
    setThemeMode: async () => { },
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setThemeState] = useState<Theme>("light");
    const [themeMode, setThemeModeState] = useState<ThemeMode>("manual");

    // Calculate sunrise/sunset times (simplified: 6am sunrise, 6pm sunset)
    const getSunriseSunsetTheme = (): Theme => {
        const now = new Date();
        const hour = now.getHours();
        // Simple logic: 6am - 6pm is light, 6pm - 6am is dark
        return hour >= 6 && hour < 18 ? "light" : "dark";
    };

    // Get current theme based on mode
    const getCurrentTheme = (): Theme => {
        if (themeMode === "system") {
            return Appearance.getColorScheme() === "dark" ? "dark" : "light";
        } else if (themeMode === "sunset-sunrise") {
            return getSunriseSunsetTheme();
        } else {
            return theme;
        }
    };

    // Load theme from storage
    useEffect(() => {
        const loadSettings = async () => {
            try {
                const savedMode = await AsyncStorage.getItem("themeMode");
                const savedTheme = await AsyncStorage.getItem("theme");
                
                if (savedMode) {
                    setThemeModeState(savedMode as ThemeMode);
                }
                
                if (savedTheme && savedMode === "manual") {
                    setThemeState(savedTheme as Theme);
                }
            } catch (error) {
                console.error("Error loading theme settings:", error);
            }
        };
        loadSettings();
    }, []);

    // Update theme when mode changes
    useEffect(() => {
        if (themeMode !== "manual") {
            const interval = setInterval(() => {
                // This will trigger re-render if theme changes
                setThemeState(getCurrentTheme());
            }, 60000); // Check every minute

            return () => clearInterval(interval);
        }
    }, [themeMode]);

    const toggleTheme = async () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setThemeState(newTheme);
        setThemeModeState("manual");
        await AsyncStorage.setItem("theme", newTheme);
        await AsyncStorage.setItem("themeMode", "manual");
    };

    const setThemeAsync = async (newTheme: Theme) => {
        setThemeState(newTheme);
        setThemeModeState("manual");
        await AsyncStorage.setItem("theme", newTheme);
        await AsyncStorage.setItem("themeMode", "manual");
    };

    const setThemeModeAsync = async (mode: ThemeMode) => {
        setThemeModeState(mode);
        await AsyncStorage.setItem("themeMode", mode);
        
        if (mode === "manual") {
            const savedTheme = await AsyncStorage.getItem("theme");
            if (savedTheme) {
                setThemeState(savedTheme as Theme);
            }
        }
    };

    return (
        <ThemeContext.Provider 
            value={{ 
                theme: getCurrentTheme(),
                themeMode,
                toggleTheme, 
                setTheme: setThemeAsync,
                setThemeMode: setThemeModeAsync,
            }}>
            {children}
        </ThemeContext.Provider>
    );
};
