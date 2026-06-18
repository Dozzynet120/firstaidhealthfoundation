import { db } from "../firebase/firebase";
import {
   collection,
   addDoc,
   updateDoc,
   deleteDoc,
   doc,
   serverTimestamp,
   onSnapshot,
} from "firebase/firestore";

const volunteerRef = collection(db, "volunteers");

// ➕ Create volunteer
export const createVolunteer = (data) => {
   return addDoc(volunteerRef, {
      ...data,
      status: "pending",
      createdAt: serverTimestamp(),
   });
};

// 🔥 REAL-TIME LISTENER (KEY UPGRADE)
export const subscribeToVolunteers = (callback) => {
   return onSnapshot(volunteerRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
         id: doc.id,
         ...doc.data(),
      }));

      callback(data);
   });
};

// ✏️ Update status
export const updateVolunteerStatus = (id, status) => {
   return updateDoc(doc(db, "volunteers", id), { status });
};

// ❌ Delete volunteer
export const deleteVolunteer = (id) => {
   return deleteDoc(doc(db, "volunteers", id));
};