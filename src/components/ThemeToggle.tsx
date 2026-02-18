import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Button } from './ui/button';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const getIcon = () => {
    if (theme === 'light') return <Sun className="w-4 h-4" />;
    if (theme === 'dark') return <Moon className="w-4 h-4" />;
    return <Monitor className="w-4 h-4" />;
  };

  const nextTheme = (): 'light' | 'dark' | 'system' => {
    if (theme === 'light') return 'dark';
    if (theme === 'dark') return 'system';
    return 'light';
  };

  return (
    <Button
      onClick={() => setTheme(nextTheme())}
      variant="outline"
      size="icon"
      className="rounded-full"
      aria-label="Toggle theme"
    >
      {getIcon()}
    </Button>
  );
}
