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

export async function updateJob(userId, jobId, data) {
  const ref = doc(db, "users", userId, "jobs", jobId);
  await updateDoc(ref, data);
}

export async function deleteJob(userId, jobId) {
  await deleteDoc(doc(db, "users", userId, "jobs", jobId));
}

export async function getJob(userId, jobId) {
  const snap = await getDoc(doc(db, "users", userId, "jobs", jobId));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export async function getJobsForUser(userId) {
  const jobsRef = collection(db, "users", userId, "jobs");
  const snapshot = await getDocs(jobsRef);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}
