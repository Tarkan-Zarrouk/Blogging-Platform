import {
  createUserWithEmailAndPassword,
  deleteUser,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./Firebase";

export const doCreateUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  return createUserWithEmailAndPassword(auth, email, password);
};
export const doSignInWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  return signInWithEmailAndPassword(auth, email, password);
};
export const doSignOut = async () => {
  return signOut(auth);
};

export const doSendResetEmail = async (email: string) => {
  return sendPasswordResetEmail(auth, email);
};

export const doDeleteUser = async (): Promise<void> => {
  if (auth.currentUser) {
    await deleteUser(auth.currentUser);
  }
};
