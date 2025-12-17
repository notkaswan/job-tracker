import React, { useEffect, useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { deleteJob, getJobsForUser } from "../utils/jobs";
import { JobCard } from "../utils/JobCard";

export const Jobs = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    if (!user) return getJobsForUser(user.uid).then(setJobs);
  }, [user]);
  async function handleDelete(id) {
    if (!confirm("Delete job?")) return await deleteJob(id);
    setJobs((prev) => prev.filter((j) => j.id !== id));
  }
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Jobs</h1>
      </div>
      <div className="space-y-3">
        {jobs.map((j) => (
          <JobCard key={j.id} job={j} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};
