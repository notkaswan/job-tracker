import React from "react";
import { Link } from "react-router";
import { deleteJob, updateJobStatus } from "./jobs";
import auth from "./auth";
import { STATUS_OPTIONS } from "../constants/status";

export const JobCard = ({ job }) => {
  const userId = auth.currentUser.uid;
  const handleDelete = async () => {
    if (window.confirm("Delete job?")) await deleteJob(userId, job.id);
  };
  // console.log(job);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    await updateJobStatus(userId, job.id, newStatus);
    // onStatusUpdate(job.id, newStatus);
  };
  const statusColors = {
    Applied: "bg-blue-500/10 text-blue-600",
    Interview: "bg-indigo-500/10 text-indigo-600",
    Offer: "bg-emerald-500/10 text-emerald-600",
    Rejected: "bg-rose-500/10 text-rose-600",
  };
  return (
    <div className="glass rounded-2xl p-5 transition hover:scale-[1.02] hover:shadow-xl">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 ">
            {job.title} - {job.company}
          </h3>
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {job.location} , {job.jobType}
        </div>
        <div className="mt-2 text-sm">
          Status:
          <span className="font-medium p-2">
            <select
              value={job.status}
              className={`px-3 py-1 text-xs font-medium rounded-full ${
                statusColors[job.status]
              }`}
              onChange={handleStatusChange}
            >
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </span>
        </div>
        <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
          Applied on {job.appliedDate}
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <Link to={"/jobs/" + job.id + "/edit"} className="text-sm">
          Edit
        </Link>
        <button onClick={handleDelete} className="text-sm text-red-600">
          Delete
        </button>
      </div>
    </div>
  );
};
