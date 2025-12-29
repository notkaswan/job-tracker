import React from "react";
import { Link } from "react-router";
import { deleteJob } from "./jobs";
import auth from "./auth";

export const JobCard = ({ job }) => {
  const handleDelete = async () => {
    const userId = auth.currentUser.uid;

    if (window.confirm("Delete job?")) await deleteJob(userId, job.id);
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
          Status: <span className="font-medium">{job.status}</span>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <Link to={"/jobs/${job.id}/edit"} className="text-sm">
          Edit
        </Link>
        <button onClick={handleDelete} className="text-sm text-red-600">
          Delete
        </button>
      </div>
    </div>
  );
};
