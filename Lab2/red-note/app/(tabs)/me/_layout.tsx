import { Stack } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { useColorScheme } from "react-native";

export default function MeDrawerLayout() {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: isDark ? "#000" : "#fff",
        },
        headerTintColor: isDark ? "#fff" : "#000",
      }}>
      <Stack.Screen
        name="index"
        options={{
          title: "Me",
          presentation: "card",
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          title: t("settings"),
          presentation: "card",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
