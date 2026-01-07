import { useEffect, useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { getJobsForUser, subscribeToJobs } from "../utils/jobs";
import { Link } from "react-router";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { JobCard } from "../utils/JobCard";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../utils/auth";
import { sortJobs } from "../utils/sortJobs";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f7f", "#a29bfe"];
export default function Dashboard() {
  const [loading, setLoading] = useState(true);
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
  const counts = jobs.reduce((acc, j) => {
    acc[j.status] = (acc[j.status] || 0) + 1;
    return acc;
  }, {});
  const data = Object.keys(counts).map((k, i) => ({
    name: k,
    value: counts[k],
    color: COLORS[i % COLORS.length],
  }));

  if (loading) return <p>Loading...</p>;
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Link
          to="/jobs/new"
          className="px-4 py-2 bg-blue-600 text-white
rounded"
        >
          Add Job
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          Total Applications:{" "}
          <div className="text-xl font-bold">{jobs.length}</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          Offers:{" "}
          <div className="text-xl font-bold">{counts["Offer"] || 0}</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          Interviews:{" "}
          <div className="text-xl font-bold">{counts["Interview"] || 0}</div>
        </div>
      </div>
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="font-semibold mb-3">Status Breakdown</h2>
        <div style={{ width: "100%", height: 250 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-3">Recent Applications</h2>
        <div className="space-y-3">
          {jobs.slice(0, 5).map((j) => (
            <JobCard key={j.id} job={j} onDelete={() => {}} />
          ))}
        </div>
      </div>
    </div>
  );
}
