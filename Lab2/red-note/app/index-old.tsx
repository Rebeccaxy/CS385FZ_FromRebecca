import { Link } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PostCard from "../components/PostCard";
import { useTheme } from "../contexts/ThemeContext";
import { initialPosts } from "../data/posts";
import i18n from "../i18n";
import { Post } from "../types";



export default function HomeScreen() {
  const { t } = useTranslation();

  const { theme, toggleTheme } = useTheme();

  const isDark = theme === "dark";

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "zh" : "en";
    i18n.changeLanguage(newLang);
  };

  const [data, setData] = useState<Post[]>(initialPosts);

  const toggleLike = (id: string): void => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
            ...item, likes: item.likes + (item.liked ? -1 : 1),
            liked: !item.liked
          }
          : item
      )
    );
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: isDark ? "#000" : "#fff",
      }}>
      <View style={{ flexDirection: "row", padding: 16, justifyContent: "space-between", marginBottom: 16 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{t("home")}</Text>
        <Button title={i18n.language === "en" ? "中文" : "EN"} onPress={toggleLanguage} />
        <Button title={isDark ? "☀️" : "🌙"} onPress={toggleTheme} />

      </View>

      <View style={styles.grid}>
        {data.map((item) => (
          <Link
            key={item.id}
            href={{ pathname: "/detail", params: { id: item.id } }}
            asChild>
            <TouchableOpacity>
              <PostCard post={item} onLike={() => toggleLike(item.id)} />
            </TouchableOpacity>
          </Link>
        ))}
      </View>


    </ScrollView>

  );


}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fafafa" },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    color: 'blue',
    textAlign: "center",
    padding: 12,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  scroll: { padding: 10 },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
