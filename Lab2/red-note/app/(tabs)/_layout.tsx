import { Tabs } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text } from "react-native";

export default function TabsLayout() {
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "#8E8E93",
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: t("home"),
          tabBarIcon: () => <Text>🏠</Text>,
        }}
      />
      <Tabs.Screen
        name="me"
        options={{
          title: "Me",
          tabBarIcon: () => <Text>👤</Text>,
        }}
      />
    </Tabs>
  );
}
