import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../../contexts/ThemeContext";
import i18n from "../../../i18n";

export default function SettingsScreen() {
  const { t } = useTranslation();
  const { theme, themeMode, setTheme, setThemeMode } = useTheme();
  const isDark = theme === "dark";

  const currentLanguage = i18n.language;

  const toggleLanguage = () => {
    const newLang = currentLanguage === "en" ? "zh" : "en";
    i18n.changeLanguage(newLang);
  };

  const toggleTheme = async () => {
    const newTheme = theme === "light" ? "dark" : "light";
    await setTheme(newTheme);
  };

  const handleThemeModeChange = async (mode: "manual" | "system" | "sunset-sunrise") => {
    await setThemeMode(mode);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDark ? "#000" : "#fff",
        padding: 20,
      }}>
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          color: isDark ? "#fff" : "#000",
          marginBottom: 30,
        }}>
        {t("settings")}
      </Text>

      {/* Language Section */}
      <View
        style={{
          backgroundColor: isDark ? "#1a1a1a" : "#f5f5f5",
          borderRadius: 12,
          padding: 16,
          marginBottom: 20,
        }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            color: isDark ? "#fff" : "#000",
            marginBottom: 12,
          }}>
          {t("language")}
        </Text>

        <TouchableOpacity
          onPress={toggleLanguage}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 10,
          }}>
          <Text style={{ fontSize: 16, color: isDark ? "#ccc" : "#666" }}>
            {currentLanguage === "en" ? t("english") : t("chinese")}
          </Text>
          <Text style={{ fontSize: 16, color: "#007AFF" }}>→</Text>
        </TouchableOpacity>
      </View>

      {/* Theme Section */}
      <View
        style={{
          backgroundColor: isDark ? "#1a1a1a" : "#f5f5f5",
          borderRadius: 12,
          padding: 16,
        }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            color: isDark ? "#fff" : "#000",
            marginBottom: 12,
          }}>
          {t("theme")}
        </Text>

        {/* Theme Mode Selection */}
        <View style={{ marginBottom: 16 }}>
          <TouchableOpacity
            onPress={() => handleThemeModeChange("manual")}
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 8,
            }}>
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: themeMode === "manual" ? "#007AFF" : (isDark ? "#666" : "#999"),
                marginRight: 10,
                justifyContent: "center",
                alignItems: "center",
              }}>
              {themeMode === "manual" && (
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: "#007AFF",
                  }}
                />
              )}
            </View>
            <Text style={{ fontSize: 16, color: isDark ? "#fff" : "#000" }}>
              {t("manual")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleThemeModeChange("system")}
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 8,
            }}>
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: themeMode === "system" ? "#007AFF" : (isDark ? "#666" : "#999"),
                marginRight: 10,
                justifyContent: "center",
                alignItems: "center",
              }}>
              {themeMode === "system" && (
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: "#007AFF",
                  }}
                />
              )}
            </View>
            <Text style={{ fontSize: 16, color: isDark ? "#fff" : "#000" }}>
              {t("follow_system")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleThemeModeChange("sunset-sunrise")}
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 8,
            }}>
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: themeMode === "sunset-sunrise" ? "#007AFF" : (isDark ? "#666" : "#999"),
                marginRight: 10,
                justifyContent: "center",
                alignItems: "center",
              }}>
              {themeMode === "sunset-sunrise" && (
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: "#007AFF",
                  }}
                />
              )}
            </View>
            <Text style={{ fontSize: 16, color: isDark ? "#fff" : "#000" }}>
              {t("sunset_sunrise")}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Manual Theme Toggle (only shown in manual mode) */}
        {themeMode === "manual" && (
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <View>
              <Text style={{ fontSize: 16, color: isDark ? "#fff" : "#000" }}>
                {isDark ? t("dark_mode") : t("light_mode")}
              </Text>
              <Text style={{ fontSize: 14, color: isDark ? "#888" : "#999", marginTop: 4 }}>
                {currentLanguage === "zh" 
                  ? (isDark ? "当前为深色模式" : "当前为浅色模式")
                  : (isDark ? "Currently Dark Mode" : "Currently Light Mode")}
              </Text>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: "#767577", true: "#34C759" }}
              thumbColor={isDark ? "#fff" : "#f4f3f4"}
            />
          </View>
        )}
      </View>

      {/* Info Section */}
      <View style={{ marginTop: 40, alignItems: "center" }}>
        <Text style={{ fontSize: 14, color: isDark ? "#666" : "#999" }}>
          RedNote App v1.0.0
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
