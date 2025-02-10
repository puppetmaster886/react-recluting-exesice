"use client";

import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { StoreProvider } from "./StoresProvider";

const theme = createTheme({});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StoreProvider>
  );
}
