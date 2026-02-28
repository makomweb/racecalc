import { Button } from "./ui/button";

export interface Preset {
  label: string;
  distance: string;
}

interface PresetButtonsProps {
  presets: Preset[];
  onPreset: (distance: string) => void;
}

export default function PresetButtons({
  presets,
  onPreset,
}: PresetButtonsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
      {presets.map((preset) => (
        <Button
          key={preset.label}
          onClick={() => onPreset(preset.distance)}
          variant="secondary"
          className="text-xs"
          size="sm"
        >
          {preset.label}
        </Button>
      ))}
    </div>
  );
}
