import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from 'db/client';
import { signIn, signOut } from 'next-firebase-auth-cookies';

export const signInWith = async (provider: 'google' | 'github') => {
  const user = await signInWithPopup(
    auth,
    provider === 'google' ? new GoogleAuthProvider() : new GithubAuthProvider()
  );

  await signIn(user);
};

export const handleLogout = async () => {
  await signOut(auth);
};
