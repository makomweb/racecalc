import { Button } from "./ui/button";
import { Label } from "./ui/label";

type CalculateMode = "distance" | "pace" | "time";

interface ModeSelectorProps {
  currentMode: CalculateMode;
  onChange: (mode: CalculateMode) => void;
}

export default function ModeSelector({
  currentMode,
  onChange,
}: ModeSelectorProps) {
  return (
    <div className="space-y-2">
      <Label className="text-xs font-normal text-slate-600 dark:text-slate-400">
        Calculate
      </Label>
      <div className="grid grid-cols-3 gap-2">
        <Button
          onClick={() => onChange("distance")}
          variant={currentMode === "distance" ? "default" : "outline"}
          size="sm"
          className="text-xs"
        >
          Distance
        </Button>
        <Button
          onClick={() => onChange("pace")}
          variant={currentMode === "pace" ? "default" : "outline"}
          size="sm"
          className="text-xs"
        >
          Pace
        </Button>
        <Button
          onClick={() => onChange("time")}
          variant={currentMode === "time" ? "default" : "outline"}
          size="sm"
          className="text-xs"
        >
          Time
        </Button>
      </div>
    </div>
  );
}
