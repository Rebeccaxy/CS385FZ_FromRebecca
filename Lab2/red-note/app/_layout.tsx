
import { Stack } from "expo-router";
import React from "react";
import { AuthProvider } from "../contexts/AuthContext";
import { ThemeProvider } from "../contexts/ThemeContext";
import "../i18n";

export default function Layout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Stack>
          <Stack.Screen name="index" options={{ title: "Home" }} />
          <Stack.Screen name="detail" options={{ title: "Detail" }} />
          <Stack.Screen name="login" options={{ title: "Login" }} />
          <Stack.Screen name="register" options={{ title: "Register" }} />

        </Stack>
      </ThemeProvider>
    </AuthProvider>
  );
}



