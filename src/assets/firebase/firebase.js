// Firebase core
import { initializeApp } from "firebase/app";

// Firebase services
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

// ✅ Your Firebase config
const firebaseConfig = {
   apiKey: "AIzaSyAU6dBQK34eYzXgU7JZ52NxxMiT8YVyOeE",
   authDomain: "rightaid-health-foundation.firebaseapp.com",
   projectId: "rightaid-health-foundation",
   storageBucket: "rightaid-health-foundation.appspot.com",
   messagingSenderId: "175996509586",
   appId: "1:175996509586:web:3c1f4bbadbb5b2cf8d354b",
   measurementId: "G-7F3FXLY5EX"
};

// ✅ Initialize Firebase app
const app = initializeApp(firebaseConfig);

// ✅ Firebase services export
export const auth = getAuth(app);
export const db = getFirestore(app);

// ⚠️ Analytics - safely initialize only in browser environment
let analytics = null;

// Only initialize analytics if we're in a browser environment
if (typeof window !== "undefined") {
   isSupported()
      .then((supported) => {
         if (supported) {
            analytics = getAnalytics(app);
         }
      })
      .catch((err) => {
         console.log("Analytics not supported:", err);
      });
}

export { analytics };
export default app;