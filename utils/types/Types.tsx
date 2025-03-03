export type GeneralUserInfo = {
  fullName: string;
  profilePicture: string;
  uid: string;
};
export type ProfileInfo = {
  email: string;
  fullName: string;
  profilePicture: string;
  description: string;
  pronouns: string;
  followers: number[];
  following: number[];
  posts: string[];
  numberOfFollowers: number;
  numberOfFollowing: number;
  numberOfLikes: number;
  numberOfPosts: number;
  gender: string;
  sexualIdentity: string;
  emailVerified: boolean,
  uid: string,
};
