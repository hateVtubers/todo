import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD1R5-BQPfaOeUNGcuIgSqdTX292aGBJ8M',
  authDomain: 'todo-graphql-ts.firebaseapp.com',
  databaseURL: 'https://todo-graphql-ts-default-rtdb.firebaseio.com',
  projectId: 'todo-graphql-ts',
  storageBucket: 'todo-graphql-ts.appspot.com',
  messagingSenderId: '57795813386',
  appId: '1:57795813386:web:0ab3f2e98708d822e73ff3',
};

export const app = getApps().length
  ? getApps().at(-1)
  : initializeApp(firebaseConfig);

export const auth = getAuth(app);
