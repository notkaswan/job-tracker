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
  return (
    <div className="bg-white p-4 rounded shadow flex justify-between items-start">
      <div>
        <div className="font-semibold">
          {job.title} - {job.company}
        </div>
        <div className="text-sm text-gray-600">
          {job.location} , {job.jobType}
        </div>
        <div className="mt-2 text-sm">
          Status:
          <span className="font-medium p-2">
            <select
              value={job.status}
              className="mt-2 border rounded px-2 py-1"
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
