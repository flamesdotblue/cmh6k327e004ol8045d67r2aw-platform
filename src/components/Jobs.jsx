import { useState } from 'react';
import { Building2, MapPin, Send, User } from 'lucide-react';

function JobCard({ job, onApply }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', note: '' });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email) return;
    onApply(job.id, form);
    setSubmitted(true);
    setOpen(false);
  }

  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-5 transition hover:shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold tracking-tight text-neutral-900">{job.title}</h3>
            <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs text-neutral-700">{job.type}</span>
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-neutral-600">
            <span className="inline-flex items-center gap-1"><Building2 size={16} /> {job.company}</span>
            <span className="inline-flex items-center gap-1"><MapPin size={16} /> {job.location}</span>
            <span className="hidden sm:inline-block">{job.salary}</span>
          </div>
          <p className="mt-3 line-clamp-2 text-sm text-neutral-700">{job.description}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {job.tags?.map((t) => (
              <span key={t} className="rounded-full bg-neutral-50 px-2.5 py-1 text-xs text-neutral-700 border border-neutral-200">{t}</span>
            ))}
          </div>
        </div>
        <div className="flex w-full sm:w-auto flex-col items-stretch sm:items-end gap-2">
          <div className="text-xs text-neutral-500 inline-flex items-center gap-1"><User size={14} /> {job.applicants} applicants</div>
          {job.applied || submitted ? (
            <button
              className="rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm font-medium text-green-700"
              disabled
            >
              Applied
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => setOpen((v) => !v)}
                className="inline-flex items-center gap-2 rounded-md bg-neutral-900 px-3 py-2 text-sm font-medium text-white hover:bg-neutral-800"
              >
                <Send size={16} /> Apply
              </button>
            </div>
          )}
        </div>
      </div>

      {open && (
        <form onSubmit={handleSubmit} className="mt-4 grid gap-3 rounded-lg border border-neutral-200 bg-neutral-50 p-4">
          <div className="grid gap-2 sm:grid-cols-2">
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your name"
              className="rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-neutral-300"
            />
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Email address"
              className="rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-neutral-300"
            />
          </div>
          <textarea
            rows={3}
            value={form.note}
            onChange={(e) => setForm({ ...form, note: e.target.value })}
            placeholder="Brief note or cover letter"
            className="rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-neutral-300"
          />
          <div className="flex items-center justify-between">
            <span className="text-xs text-neutral-500">We'll share your application with the employer.</span>
            <div className="flex gap-2">
              <button type="button" onClick={() => setOpen(false)} className="rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm">Cancel</button>
              <button type="submit" className="rounded-md bg-neutral-900 px-3 py-2 text-sm font-medium text-white hover:bg-neutral-800">Submit</button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default function Jobs({ jobs, onApply }) {
  if (!jobs.length) {
    return (
      <div className="rounded-xl border border-neutral-200 bg-white p-8 text-center text-neutral-600">
        No jobs match your filters.
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:gap-5">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} onApply={onApply} />
      ))}
    </div>
  );
}
