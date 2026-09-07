import { createTheme } from "@mui/material/styles";

export type ThemeMode = "light" | "dark";

export function createAppTheme(mode: ThemeMode) {
  return createTheme({
    palette: {
      mode,

      primary: {
        main: "#1976d2",
      },

      background: {
        default: mode === "light" ? "#f5f7fb" : "#121212",
        paper: mode === "light" ? "#ffffff" : "#1e1e1e",
      },
    },

    shape: {
      borderRadius: 10,
    },

    typography: {
      fontFamily: "Arial, sans-serif",
    },
  });
}

export const theme = createAppTheme("light");
