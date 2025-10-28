import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Button, Image, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { initialPosts } from "../data/posts";

export default function DetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const post = initialPosts.find((p) => p.id === id);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Local state for comments (start with post’s existing comments)
  const [comments, setComments] = useState<string[]>(post?.comments || []);

  // State for input value
  const [newComment, setNewComment] = useState("");

  // Function to add new comment
  const handleAddComment = () => {
    if (newComment.trim().length === 0) return;
    setComments([...comments, newComment]);
    setNewComment(""); // clear input
  };

  if (!post) return <Text style={{ color: isDark ? "#fff" : "#000" }}>Post not found</Text>;

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDark ? "#000" : "#fff" }]}>
      <Image source={post.img} style={styles.image} />
      <Text style={[styles.title, { color: isDark ? "#fff" : "#000" }]}>{post.title}</Text>
      <Text style={[styles.likes, { color: isDark ? "#999" : "#777" }]}>❤️ {post.likes} likes</Text>

      {/* Comment section */}
      <View style={styles.commentSection}>
        <Text style={[styles.commentHeader, { color: isDark ? "#fff" : "#000" }]}>Comments</Text>

        {/* Existing comments */}
        {comments.map((comment, index) => (
          <Text key={index} style={[styles.commentText, { backgroundColor: isDark ? "#1a1a1a" : "#f2f2f2", color: isDark ? "#fff" : "#000" }]}>
            {comment}
          </Text>
        ))}

        {/* Add new comment */}
        <TextInput
          placeholder="Add a comment..."
          placeholderTextColor={isDark ? "#999" : "#777"}
          value={newComment}
          onChangeText={setNewComment}
          style={[styles.input, { 
            backgroundColor: isDark ? "#1a1a1a" : "#fff",
            borderColor: isDark ? "#333" : "#ccc",
            color: isDark ? "#fff" : "#000"
          }]}
        />
        <Button title="Post Comment" onPress={handleAddComment} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 12,
  },
  likes: {
    fontSize: 16,
    marginVertical: 8,
  },
  commentSection: {
    marginTop: 20,
  },
  commentHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  commentText: {
    padding: 8,
    borderRadius: 8,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
});
