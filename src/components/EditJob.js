import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getJob, updateJob } from "../utils/jobs";
import JobForm from "./JobForm";

export default function EditJob() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const nav = useNavigate();
  useEffect(() => {
    getJob(id).then(setJob);
  }, [id]);
  async function submit(data) {
    await updateJob(id, data);
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
