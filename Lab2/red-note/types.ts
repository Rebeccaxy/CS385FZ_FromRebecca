import { ImageSourcePropType } from "react-native";

export type Post = {
  id: string;
  title: string;
  img: ImageSourcePropType;
  likes: number;
  liked?: boolean;
  comments: string[];
};


export type User = {
  id: string;
  username: string;
  password: string;
  name: string;
};
