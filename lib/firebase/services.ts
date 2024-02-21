import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import app from "./init";
import {
  getAuth,
  createUserWithEmailAndPassword,
  UserCredential,
  AuthError,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

export const login = async (email: string, password: string): Promise<string> => {
  const auth = getAuth(app);

  try {
    const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const token = await user.getIdToken();
    return token;
  } catch (error) {
    // Assuming error is of type FirebaseError, which is typically the case with Firebase operations
    if (error instanceof Error) {
      const errorCode = (error as AuthError).code;
      const errorMessage = error.message;
      console.error(`Error Code: ${errorCode}, Message: ${errorMessage}`);
      // Consider re-throwing the error or handling it according to your application's needs
      throw error;
    } else {
      // Handle unexpected errors that are not Error instances
      console.error("An unexpected error occurred", error);
      throw new Error("An unexpected error occurred");
    }
  }
};
