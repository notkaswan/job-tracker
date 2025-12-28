import auth from "./auth";
import { app } from "./firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
const db = getFirestore(app);
// const jobsCol = collection(db, "users", userId, "jobs");

export async function addJob(userId, jobData) {
  const docRef = await addDoc(collection(db, "users", userId, "jobs"), {
    ...jobData,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

// export async function updateJob(id, data) {
//   const ref = doc(db, "jobs", id);
//   await updateDoc(ref, data);
// }

// export async function deleteJob(id) {
//   await deleteDoc(doc(db, "jobs", id));
// }

// export async function getJob(id) {
//   const snap = await getDoc(doc(db, "users", id, "jobs"));
//   return snap.exists() ? { id: snap.id, ...snap.data() } : null;
// }

export async function getJobsForUser(userId) {
  const jobsRef = collection(db, "users", userId, "jobs");
  const snapshot = await getDocs(jobsRef);
  //   console.log(userId);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  //   const q = query(
  //     jobsCol,
  //     where("userId", "==", userId),
  //     orderBy("createdAt", "dec")
  //   );
  //   const snap = await getDocs(q);
  //   return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}
