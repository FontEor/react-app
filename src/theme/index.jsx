import { useState } from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import MainLayout from "@/layout/index.jsx";
import lightTheme from "@/theme/lightTheme.jsx";
import darkTheme from "@/theme/darkTheme.jsx";

// 全局样式，利用当前主题变量
const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.bodyBackgroundColor};
    color: ${(props) => props.theme.textPrimaryColor};
  }
`;
const Theme = () => {
  const [themeMode, setThemeMode] = useState("light");

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={themeMode === "light" ? lightTheme : darkTheme}>
      <>
        <GlobalStyles />
        <MainLayout />
        <button onClick={toggleTheme}>切换主题</button>
      </>
    </ThemeProvider>
  );
};
export default Theme;
