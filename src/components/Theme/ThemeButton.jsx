import React from 'react';

import sun from '../../assets/images/theme/sun.png'
import moon from '../../assets/images/theme/moon.png'
import useTheme from '../../Hooks/useTheme';

const ThemeButton = () => {
    const {theme,setTheme} = useTheme();
    const handleThemeChange = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <button className="switch_btn w-[50px] h-[24px] " aria-label='thme-change-button' onClick={handleThemeChange}>
            <img src={sun} alt="sun image" />
            <img src={moon} alt="moon image" />
            <input
                type="checkbox"
                className="virtual_btn "
                id="theme_switch"
                checked={theme === "dark"}
                onChange={handleThemeChange}
            />
            <span className="circle"></span>
        </button>
    );
};

export default ThemeButton;