import { useState } from 'react';
import { Plus } from 'lucide-react';

export default function PostJobForm({ onAddJob }) {
  const [form, setForm] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Full-time',
    salary: '',
    tags: '',
    description: '',
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.title || !form.company || !form.location) return;

    const payload = {
      title: form.title.trim(),
      company: form.company.trim(),
      location: form.location.trim(),
      type: form.type,
      salary: form.salary || '—',
      tags: form.tags
        ? form.tags
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean)
        : [],
      description: form.description.trim() || 'No description provided.',
    };

    onAddJob?.(payload);
    setForm({ title: '', company: '', location: '', type: 'Full-time', salary: '', tags: '', description: '' });
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <label className="text-sm font-medium">Job title</label>
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="e.g., Senior Frontend Engineer"
            className="rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-neutral-300"
          />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium">Company</label>
          <input
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            placeholder="Your company name"
            className="rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-neutral-300"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="grid gap-2">
          <label className="text-sm font-medium">Location</label>
          <input
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            placeholder="e.g., Remote, NYC, London"
            className="rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-neutral-300"
          />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium">Type</label>
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-neutral-300"
          >
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
            <option>Hybrid</option>
            <option>Onsite</option>
            <option>Remote</option>
          </select>
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium">Salary range</label>
          <input
            value={form.salary}
            onChange={(e) => setForm({ ...form, salary: e.target.value })}
            placeholder="$120k – $150k"
            className="rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-neutral-300"
          />
        </div>
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium">Tags</label>
        <input
          value={form.tags}
          onChange={(e) => setForm({ ...form, tags: e.target.value })}
          placeholder="Comma-separated (React, Node.js, AWS)"
          className="rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-neutral-300"
        />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium">Description</label>
        <textarea
          rows={6}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Describe responsibilities, requirements, and your mission."
          className="rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-neutral-300"
        />
      </div>

      <div className="flex items-center justify-end">
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-neutral-800"
        >
          <Plus size={16} /> Publish Job
        </button>
      </div>
    </form>
  );
}
