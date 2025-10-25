import { useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Jobs from './components/Jobs';
import PostJobForm from './components/PostJobForm';

const initialJobs = [
  {
    id: crypto.randomUUID(),
    title: 'Frontend Engineer',
    company: 'PixelCraft',
    location: 'Remote',
    type: 'Full-time',
    salary: '$110k – $140k',
    tags: ['React', 'TypeScript', 'Tailwind'],
    description:
      'Build delightful UI, own components, and ship fast in a design-led environment.',
    applicants: 12,
    applied: false,
  },
  {
    id: crypto.randomUUID(),
    title: 'Product Designer',
    company: 'Nova Labs',
    location: 'San Francisco, CA',
    type: 'Hybrid',
    salary: '$120k – $150k',
    tags: ['Figma', 'UX', 'Prototyping'],
    description:
      'Lead end-to-end product design across research, flows, and polished visuals.',
    applicants: 7,
    applied: false,
  },
  {
    id: crypto.randomUUID(),
    title: 'Backend Engineer',
    company: 'DataForge',
    location: 'New York, NY',
    type: 'Onsite',
    salary: '$130k – $170k',
    tags: ['Node.js', 'PostgreSQL', 'AWS'],
    description:
      'Design scalable services and APIs powering real-time analytics experiences.',
    applicants: 4,
    applied: false,
  },
];

export default function App() {
  const [jobs, setJobs] = useState(initialJobs);
  const [search, setSearch] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch = `${job.title} ${job.company} ${job.tags.join(' ')}`
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesLocation = locationFilter
        ? job.location.toLowerCase().includes(locationFilter.toLowerCase())
        : true;
      const matchesType = typeFilter ? job.type === typeFilter : true;
      return matchesSearch && matchesLocation && matchesType;
    });
  }, [jobs, search, locationFilter, typeFilter]);

  function handleAddJob(newJob) {
    setJobs((prev) => [
      {
        id: crypto.randomUUID(),
        applicants: 0,
        applied: false,
        ...newJob,
      },
      ...prev,
    ]);
  }

  function handleApply(jobId, applicant) {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === jobId
          ? {
              ...job,
              applicants: job.applicants + 1,
              applied: true,
              lastApplicant: applicant,
            }
          : job
      )
    );
  }

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <Navbar />
      <main>
        <section id="hero">
          <Hero onSearchChange={setSearch} search={search} />
        </section>

        <section id="jobs" className="relative mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Open Roles</h2>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <input
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                placeholder="Filter by location"
                className="w-full sm:w-64 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none ring-0 focus:border-neutral-300"
              />
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full sm:w-48 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none ring-0 focus:border-neutral-300"
              >
                <option value="">All types</option>
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
                <option>Hybrid</option>
                <option>Onsite</option>
                <option>Remote</option>
              </select>
            </div>
          </div>

          <Jobs jobs={filteredJobs} onApply={handleApply} />
        </section>

        <section id="post" className="border-t border-neutral-100 bg-neutral-50/60">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-16">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-6">Post a Job</h2>
            <PostJobForm onAddJob={handleAddJob} />
          </div>
        </section>
      </main>

      <footer className="border-t border-neutral-100">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 text-sm text-neutral-500 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} WorkGrid. All rights reserved.</p>
          <nav className="flex gap-4">
            <a href="#jobs" className="hover:text-neutral-700">Jobs</a>
            <a href="#post" className="hover:text-neutral-700">Post</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
