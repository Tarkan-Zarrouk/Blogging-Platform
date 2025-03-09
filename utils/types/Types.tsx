import { Post } from "../interfaces";

export type GeneralUserInfo = {
  fullName: string;
  profilePicture: string;
  uid: string;
};
export interface ProfileInfo {
  email: string;
  fullName: string;
  profilePicture: string;
  description: string;
  pronouns: string;
  followers: string[];
  following: string[];
  posts: Post[];
  numberOfFollowers: number;
  numberOfFollowing: number;
  numberOfLikes: number;
  numberOfPosts: number;
  gender: string;
  sexualIdentity: string;
  emailVerified: boolean;
  uid: string;
  createdAt: string,
}
