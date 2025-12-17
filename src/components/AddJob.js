import { useNavigate } from "react-router";
import { useAuth } from "../utils/AuthContext";
import { addJob } from "../utils/jobs";
import JobForm from "./JobForm";

export default function AddJob() {
  const { user } = useAuth();
  const nav = useNavigate();
  async function submit(data) {
    const payload = {
      ...data,
      userId: user.uid,
      createdAt: new Date().toISOString(),
    };
    await addJob(payload);
    nav("/jobs");
  }
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Add Job</h1>
      <JobForm onSubmit={submit} />
    </div>
  );
}
