import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "db/client";
import { signIn, signOut } from "next-firebase-auth-cookies/auth";
import toast from "react-hot-toast";

export const signInWith = async (provider: "google" | "github") => {
  try {
    const user = await signInWithPopup(
      auth,
      provider === "google"
        ? new GoogleAuthProvider()
        : new GithubAuthProvider()
    );

    await signIn(user);
    toast.success("Signed in successfully");
  } catch (error) {
    // @ts-ignore
    toast.error(error?.code);
  }
};

export const handleLogout = async () => {
  await signOut(auth);
};
