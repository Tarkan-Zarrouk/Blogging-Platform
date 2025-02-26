import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth} from "./Firebase";
export const doCreateUserWithEmailAndPassword = async (email:string, password:string) => {
    return createUserWithEmailAndPassword(auth, email, password);
}
export const doSignInWithEmailAndPassword = async(email:string, password:string) => {
    return signInWithEmailAndPassword(auth, email, password);
}