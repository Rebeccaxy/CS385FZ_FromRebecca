import React from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Post } from "../types";


const { width } = Dimensions.get("window");
const CARD_WIDTH = width / 2 - 20;


type Props = {
  post: Post;
  onLike: (id: string) => void;
};

export default function PostCard({ post, onLike }: Props) {
  return (
    <View style={styles.card}>
      <Image source={post.img} style={styles.image} />
      <Text style={styles.title}>{post.title}</Text>

      <TouchableOpacity onPress={() => onLike(post.id)}>
        <Text style={styles.like}>
          {post.liked ? "❤️" : "🤍"} {post.likes}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    margin: 5,
    width: CARD_WIDTH,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  image: { width: "100%", height: 200 },
  content: { padding: 8 },
  title: { fontSize: 14, marginBottom: 6 },
  likeBtn: { flexDirection: "row", alignItems: "center" },
  heart: { fontSize: 16, marginRight: 4 },
  liked: { color: "red" },
  likeText: { fontSize: 14, color: "#333" },
  like: { marginTop: 6, fontSize: 14 },

});
