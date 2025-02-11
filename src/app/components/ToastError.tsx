// src/components/ToastError.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Snackbar } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useRootStore } from "@/providers/StoresProvider";

const ToastError = observer(() => {
  const { userStore, postStore } = useRootStore();
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (userStore.hasError || postStore.hasError) {
      setErrorMessage(
        userStore.errorValue || postStore.errorValue || "unknown error"
      );
      setOpen(true);
    }
  }, [
    userStore.hasError,
    postStore.hasError,
    userStore.errorValue,
    postStore.errorValue,
  ]);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      message={errorMessage}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    />
  );
});

export default ToastError;
