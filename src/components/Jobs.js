import React, { useEffect, useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { deleteJob, getJobsForUser, subscribeToJobs } from "../utils/jobs";
import { JobCard } from "../utils/JobCard";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../utils/auth";
import { sortJobs } from "../utils/sortJobs";

export const Jobs = () => {
  const [loading, setLoading] = useState(true);
  const userId = auth.currentUser.uid;
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userJobs = await getJobsForUser(user.uid);
        setJobs(sortJobs(userJobs));
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  useEffect(() => {
    let unsubscribeJobs = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        unsubscribeJobs = subscribeToJobs(user.uid, (jobs) => {
          setJobs(sortJobs(jobs));
        });
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeJobs) unsubscribeJobs();
    };
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
