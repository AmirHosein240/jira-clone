import { useMemo, useState, type ReactNode } from "react";

import { CssBaseline } from "@mui/material";

import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { createAppTheme, type ThemeMode } from "../theme/theme";

import { ThemeModeContext } from "../theme/ThemeModeContext";

interface Props {
  children: ReactNode;
}

const queryClient = new QueryClient();

export default function Providers({ children }: Props) {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const savedMode = localStorage.getItem("theme_mode");

    return savedMode === "dark" ? "dark" : "light";
  });

  const theme = useMemo(() => {
    return createAppTheme(mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode((currentMode) => {
      const nextMode = currentMode === "light" ? "dark" : "light";

      localStorage.setItem("theme_mode", nextMode);

      return nextMode;
    });
  };

  return (
    <ThemeModeContext.Provider
      value={{
        mode,
        toggleTheme,
      }}
    >
      <MuiThemeProvider theme={theme}>
        <CssBaseline />

        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </MuiThemeProvider>
    </ThemeModeContext.Provider>
  );
}
