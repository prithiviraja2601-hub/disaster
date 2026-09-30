import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase only if the config is valid, otherwise don't crash
// so the user can still see the UI before adding their keys.
let app;
let auth;

try {
  if (firebaseConfig.apiKey && firebaseConfig.apiKey !== 'your_api_key') {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
  } else {
    console.warn("⚠️ Firebase configuration missing! Please add credentials to frontend/.env");
    // Create a mock auth object so the app doesn't immediately crash when calling auth.onAuthStateChanged
    auth = {
      onAuthStateChanged: (cb) => { cb(null); return () => {}; },
      currentUser: null
    };
  }
} catch (error) {
  console.error("Firebase initialization failed:", error);
}

export { auth };
