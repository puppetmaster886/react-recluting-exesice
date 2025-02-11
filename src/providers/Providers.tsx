"use client";

import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { StoreProvider } from "./StoresProvider";
import ToastError from "@/app/components/ToastError";

const theme = createTheme({
  typography: {
    allVariants: {
      textAlign: "left",
    },
    h5: {
      fontSize: "1.5rem",
      fontWeight: 600,
      color: "#333",
      textAlign: "left",
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "4px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "20px",
          textTransform: "none",
          padding: "8px 16px",
          fontWeight: 600,
          transition: "background-color 0.3s ease",
          "&:hover": {
            backgroundColor: "#1976d2",
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          textAlign: "left",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          // Full width inputs with an elevated look.
          width: "100%",
          borderRadius: "8px",
          backgroundColor: "#fff",
          "& fieldset": {
            borderColor: "#ccc",
          },
          "&:hover fieldset": {
            borderColor: "#1976d2",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#1976d2",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          width: "100%",
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          width: "100%",
          marginTop: "10rem",
          marginBottom: "1rem",
        },
      },
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <ThemeProvider theme={theme}>
        {children}
        <ToastError />
      </ThemeProvider>
    </StoreProvider>
  );
}
