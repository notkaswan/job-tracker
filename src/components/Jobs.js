import React, { useEffect, useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { deleteJob, getJobsForUser } from "../utils/jobs";
import { JobCard } from "../utils/JobCard";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../utils/auth";

export const Jobs = () => {
  const [loading, setLoading] = useState(true);
  const userId = auth.currentUser.uid;
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userJobs = await getJobsForUser(user.uid);
        setJobs(userJobs);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <p>Loading...</p>;
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Jobs</h1>
      </div>
      <div className="space-y-3">
        {jobs.map((j) => (
          <JobCard key={j.id} job={j} />
        ))}
      </div>
    </div>
  );
};
