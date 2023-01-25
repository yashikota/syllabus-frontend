import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { ReactNode, useMemo } from "react";
import { usePaletteMode } from "../atom/theme";

export const Theme = ({ children }: { children: ReactNode }) => {
  const mode = usePaletteMode()[0];

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
