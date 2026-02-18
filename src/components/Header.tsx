import { Clock } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <div className="sticky top-0 z-50 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="max-w-2xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <h1 className="text-lg font-bold text-slate-900 dark:text-white">
            Race Calculator
          </h1>
        </div>
        <ThemeToggle />
      </div>
    </div>
  );
}
