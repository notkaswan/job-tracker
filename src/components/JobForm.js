import React, { useState } from "react";
export default function JobForm({ initial = {}, onSubmit }) {
  const date = new Date();
  const getTodayDate = new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  )
    .toISOString()
    .split("T")[0];
  const [form, setForm] = useState({
    company: initial.company || "",
    title: initial.title || "",
    jobType: initial.jobType || "Full-time",
    location: initial.location || "",
    appliedDate: initial.appliedDate || getTodayDate,
    status: initial.status || "Applied",
    notes: initial.notes || "",
  });

  function change(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  function submit(e) {
    e.preventDefault();
    onSubmit(form);
  }
  return (
    <form onSubmit={submit} className="space-y-3 bg-white p-6 rounded shadow">
      <div>
        <label className="block text-sm">Company</label>
        <input
          name="company"
          value={form.company}
          onChange={change}
          className="w-full border p-2 rounded"
        />
      </div>
      <div>
        <label className="block text-sm">Job Title</label>
        <input
          name="title"
          value={form.title}
          onChange={change}
          className="wfull border p-2 rounded"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm">Type</label>
          <select
            name="jobType"
            value={form.jobType}
            onChange={change}
            className="w-full border p-2 rounded"
          >
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
            <option>Internship</option>
          </select>
        </div>
        <div>
          <label className="block text-sm">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={change}
            className="w-full border p-2 rounded"
          >
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
            <option>Ghosted</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm">Location</label>
        <input
          name="location"
          value={form.location}
          onChange={change}
          className="w-full border p-2 rounded"
        />
      </div>
      <div>
        <label className="block text-sm">Applied Date</label>
        <input
          type="date"
          name="appliedDate"
          value={form.appliedDate}
          onChange={change}
          max={getTodayDate}
          className="w-full border p-2 rounded"
        />
      </div>
      <div>
        <label className="block text-sm">Notes</label>
        <textarea
          name="notes"
          value={form.notes}
          onChange={change}
          className="w-full border p-2 rounded"
          rows={4}
        />
      </div>
      <div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white
rounded"
        >
          Save
        </button>
      </div>
    </form>
  );
}
