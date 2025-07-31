import { useState } from "react";
const Settings = () => {
  const [themeMode, setThemeMode] = useState("light");
  console.log("Settings component rendered", themeMode);

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };
  return <button onClick={toggleTheme}>切换主题</button>;
};

export default Settings;
