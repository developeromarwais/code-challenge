import { useState } from "react";

const useDarkMode = (): [boolean, (theme: boolean) => void] => {
    const [theme, setTheme] = useState(false);
    const toggleDarkMode = () => {
        setTheme(!theme)
    }
    return [theme, toggleDarkMode];
}

export default useDarkMode;