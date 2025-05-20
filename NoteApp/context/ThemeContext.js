import React, { createContext, useState, useEffect } from 'react';
import { Appearance, useColorScheme } from 'react-native';

export const ThemeContext = createContext();

const lightTheme = {
  mode: 'light',
  background: '#fff',
  text: '#000',
  primary: '#6200ee',
  // Thêm màu sắc khác nếu cần
};

const darkTheme = {
  mode: 'dark',
  background: '#121212',
  text: '#fff',
  primary: '#bb86fc',
  // Thêm màu sắc khác nếu cần
};

export const ThemeProvider = ({ children }) => {
  const colorScheme = useColorScheme(); // Lấy theme mặc định của hệ thống

  const [theme, setTheme] = useState(colorScheme === 'dark' ? darkTheme : lightTheme);

  useEffect(() => {
    setTheme(colorScheme === 'dark' ? darkTheme : lightTheme);
  }, [colorScheme]);

  const toggleTheme = () => {
    setTheme(theme.mode === 'light' ? darkTheme : lightTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
