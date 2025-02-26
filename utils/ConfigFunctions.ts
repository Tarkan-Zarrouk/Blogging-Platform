import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth} from "./Firebase";
export const doCreateUserWithEmailAndPassword = async (email:string, password:string) => {
    return createUserWithEmailAndPassword(auth, email, password);
}