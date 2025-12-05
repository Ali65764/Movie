import { createContext, useContext, useEffect, useLayoutEffect, useState } from "react";

const ThemeContext = createContext()

const ThemeContextProvider = ({ children }) => {
    const STORAGE_KEY = 'theme-mode'
    const initialTheme = localStorage.getItem(STORAGE_KEY)

    const [theme, setTheme] = useState(initialTheme);

    useLayoutEffect(() => {
        const root = window.document.documentElement

        if (theme === 'dark') {
            root.classList.add("dark")
        }
        else {
            root.classList.remove("dark")
        }

        localStorage.setItem(STORAGE_KEY, theme)
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => prev === 'light' ? "dark" : "light")
    }

    const contextValue ={
        theme,toggleTheme
    }
    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    )
}

const useThemeContext = () => useContext(ThemeContext)
export { useThemeContext, ThemeContextProvider }
