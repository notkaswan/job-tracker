import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import JobForm from "./JobForm";
import { getJob, updateJob } from "../utils/jobs";
import auth from "../utils/auth";

export default function EditJob() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const nav = useNavigate();
  const userId = auth.currentUser.uid;
  useEffect(() => {
    getJob(userId, id).then(setJob);
  }, [id]);
  console.log(id);

  async function submit(data) {
    await updateJob(userId, id, data);
    nav("/jobs");
  }
  if (!job) return <div>Loading...</div>;
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Job</h1>
      <JobForm initial={job} onSubmit={submit} />
    </div>
  );
}
