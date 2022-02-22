import { initializeApp, cert, getApps, getApp } from 'firebase-admin/app';
import credencial from 'db/credencial.json';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

const app = getApps().length
  ? getApp()
  : initializeApp({
      // @ts-ignore
      credential: cert(credencial),
    });

export const auth = getAuth(app);
export const db = getFirestore(app);
