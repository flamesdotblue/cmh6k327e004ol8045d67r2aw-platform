import Spline from '@splinetool/react-spline';
import { Search } from 'lucide-react';

export default function Hero({ search, onSearchChange }) {
  return (
    <div className="relative h-[72vh] min-h-[520px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/zhZFnwyOYLgqlLWk/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.9),rgba(255,255,255,0.6)_40%,rgba(255,255,255,0.4)_70%,rgba(255,255,255,0.3)_100%)]" />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-4 sm:px-6">
        <div className="mx-auto w-full max-w-2xl text-center">
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-neutral-900">
            Find your next role. Build something great.
          </h1>
          <p className="mt-3 text-neutral-600">
            A modern job board for product teams, engineers, and designers.
          </p>

          <div className="mt-6 flex items-center">
            <div className="relative w-full">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-400">
                <Search size={18} />
              </div>
              <input
                value={search}
                onChange={(e) => onSearchChange?.(e.target.value)}
                placeholder="Search roles, companies, or skills"
                className="w-full rounded-xl border border-neutral-200 bg-white/90 px-10 py-3 text-sm outline-none ring-0 backdrop-blur placeholder:text-neutral-400 focus:border-neutral-300 focus:bg-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
