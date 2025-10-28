import { useRouter } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../../contexts/AuthContext";
import { useTheme } from "../../../contexts/ThemeContext";

export default function MeScreen() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDark ? "#000" : "#fff",
        padding: 20,
      }}>
      {user ? (
        // 已登录状态
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 32,
              fontWeight: "bold",
              color: isDark ? "#fff" : "#000",
              marginBottom: 10,
            }}>
            {t("welcome").replace("{{name}}", user.name)}
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: isDark ? "#ccc" : "#666",
              marginBottom: 30,
            }}>
            @{user.username}
          </Text>

          {/* Settings 按钮 */}
          <TouchableOpacity
            style={[styles.button, { backgroundColor: isDark ? "#333" : "#f0f0f0" }]}
            onPress={() => {
              router.push("/(tabs)/me/settings");
            }}>
            <Text style={{ fontSize: 18, color: isDark ? "#fff" : "#000" }}>
              ⚙️ {t("settings")}
            </Text>
          </TouchableOpacity>

          {/* Logout 按钮 */}
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#ff4444", marginTop: 20 }]}
            onPress={handleLogout}>
            <Text style={{ fontSize: 18, color: "#fff" }}>{t("logout")}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // 未登录状态
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: isDark ? "#fff" : "#000",
              marginBottom: 20,
              textAlign: "center",
            }}>
            {t("not_logged_in")}
          </Text>

          <Button
            title={t("login_button")}
            onPress={() => router.push("/login")}
          />

          <Text
            onPress={() => router.push("/register")}
            style={{
              marginTop: 20,
              color: "blue",
              fontSize: 16,
              textAlign: "center",
            }}>
            {t("no_account")}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
});
