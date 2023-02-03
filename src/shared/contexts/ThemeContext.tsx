import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { LightTheme, DarkTheme } from './../themes';
import { ThemeProvider } from '@mui/material/styles';
import { Box } from "@mui/material";

interface IAppThemeContextData {
    themeName: 'light' | 'dark'
    toggleTheme: () => void;
}
const AppThemeContext = createContext({} as IAppThemeContextData);

export const useAppThemeContext = () => {
    return useContext(AppThemeContext);
}

interface IAppThemeProvider {
    children: React.ReactNode;
}

export const AppThemeProvider: React.FC<IAppThemeProvider> = ({ children }) => {
    const [themeName, setThemeName] = useState<'light' | 'dark'>('light');

    const toggleTheme = useCallback(() => {
        setThemeName(oldThemeName => oldThemeName === 'light' ? 'dark' : 'light')
    }, []);

    const theme = useMemo(() => {
        if (themeName === 'light') return LightTheme;

        return DarkTheme;
    }, [themeName]);

    return (
        <AppThemeContext.Provider value={{ themeName, toggleTheme }}>
            <ThemeProvider theme={theme}>
                <Box width='100vw' height='100vh' bgcolor={theme.palette.background.default}>
                    {children}
                </Box>
            </ThemeProvider>
        </AppThemeContext.Provider>
    );
}