import React, { createContext, useEffect, useState } from 'react';
export const ThemeDarkLightContext = createContext();
const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(null);
    useEffect(() => {
        if (localStorage.getItem("c_art_THEME") === 'dark') {
            setTheme("dark")
        } else if (localStorage.getItem("c_art_THEME") === 'light') {
            setTheme('light')
        } else {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                setTheme("dark")
            } else {
                setTheme("light")
            }
        }
    }, [])


    useEffect(() => {
        if (theme === "dark") {
            // localStorage.setItem("c_art_THEME", "dark")
            // document.documentElement.classList.add("dark")
        } else if (theme === "light") {
            localStorage.setItem("c_art_THEME", "light")
            document.documentElement.classList.remove("dark")
        }
    }, [theme])


    return (
        <ThemeDarkLightContext.Provider value={{ theme, setTheme }}>
            <>
            { children }
            </>
        </ThemeDarkLightContext.Provider>
    )
};

export default ThemeProvider;