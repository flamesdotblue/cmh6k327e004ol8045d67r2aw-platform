import { Briefcase, Plus } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 w-full border-b border-neutral-100 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-14 sm:h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#hero" className="inline-flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-neutral-900 text-white">
            <Briefcase size={18} />
          </span>
          <span className="font-semibold tracking-tight">WorkGrid</span>
        </a>
        <nav className="hidden sm:flex items-center gap-6 text-sm">
          <a href="#jobs" className="text-neutral-600 hover:text-neutral-900">Jobs</a>
          <a href="#post" className="text-neutral-600 hover:text-neutral-900">Post a Job</a>
        </nav>
        <a
          href="#post"
          className="inline-flex items-center gap-2 rounded-md bg-neutral-900 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-neutral-800"
        >
          <Plus size={16} />
          <span>Post</span>
        </a>
      </div>
    </header>
  );
}
