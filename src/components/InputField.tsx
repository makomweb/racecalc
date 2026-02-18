import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Minus, Plus } from 'lucide-react';

interface InputFieldProps {
  label: string;
  value: string;
  placeholder?: string;
  maxLength?: number;
  onChange: (value: string) => void;
  onIncrement: () => void;
  onDecrement: () => void;
  error?: string;
}

export default function InputField({
  label,
  value,
  placeholder,
  maxLength,
  onChange,
  onIncrement,
  onDecrement,
  error,
}: InputFieldProps) {
  return (
    <div className="space-y-2">
      <Label className="text-xs sm:text-sm font-normal text-slate-600 dark:text-slate-400">
        {label}
      </Label>
      <div className="flex gap-2 items-center">
        <Button
          onClick={onDecrement}
          variant="outline"
          size="icon"
          className="h-11 w-11 sm:h-10 sm:w-10"
        >
          <Minus className="w-4 h-4" />
        </Button>
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          className="flex-1 text-center font-mono text-xs sm:text-sm"
        />
        <Button
          onClick={onIncrement}
          variant="outline"
          size="icon"
          className="h-11 w-11 sm:h-10 sm:w-10"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>
      {error && <p className="text-xs text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
}
