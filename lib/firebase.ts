import { initializeApp, getApps, getApp } from "firebase/app";
import {
  initializeFirestore,
  persistentLocalCache,
  persistentSingleTabManager,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDnNqyigNa3jiIvootFK5WMZuuvTvJ6y6A",
  authDomain: "rukun-dhijaj.firebaseapp.com",
  projectId: "rukun-dhijaj",
  storageBucket: "rukun-dhijaj.firebasestorage.app",
  messagingSenderId: "632864575016",
  appId: "1:632864575016:web:209f8a30c394a16dc9ef1d",
};

const app =
  getApps().length > 0
    ? getApp()
    : initializeApp(firebaseConfig);

export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentSingleTabManager({}),
  }),
});

export const auth = getAuth(app);

export default app;