import { useState, useCallback } from 'react';
import { Card, CardContent } from './ui/card';
import InputField from './InputField';
import PresetButtons from './PresetButtons';
import type { Preset } from './PresetButtons';
import ModeSelector from './ModeSelector';
import Header from './Header';
import Footer from './Footer';
import {
  timeToSeconds,
  paceToSeconds,
  secondsToTime,
  secondsToPace,
  calculateDistance,
  calculateTime,
} from '../utils/calculations';

type ValidationError = {
  distance?: string;
  pace?: string;
  time?: string;
};

type CalculateMode = 'distance' | 'pace' | 'time';

const PRESETS: Preset[] = [
  { label: '5K', distance: '5.00' },
  { label: '10K', distance: '10.00' },
  { label: 'Half Marathon', distance: '21.10' },
  { label: 'Marathon', distance: '42.20' },
];

export default function Calculator() {
  const [distance, setDistance] = useState('10.00');
  const [pace, setPace] = useState('05:30');
  const [time, setTime] = useState('00:55:00');
  const [calculateMode, setCalculateMode] = useState<CalculateMode>('time');
  const [errors, setErrors] = useState<ValidationError>({});

  const validateTime = (timeStr: string): boolean => {
    if (!timeStr) return false;
    const parts = timeStr.split(':');
    if (parts.length !== 3) return false;
    const [h, m, s] = parts.map(Number);
    return h >= 0 && m < 60 && s < 60 && (h > 0 || m > 0 || s > 0);
  };

  const validatePace = (paceStr: string): boolean => {
    if (!paceStr) return false;
    const parts = paceStr.split(':');
    if (parts.length !== 2) return false;
    const [m, s] = parts.map(Number);
    return m >= 0 && s < 60 && (m > 0 || s > 0);
  };

  const validateDistance = (distStr: string): boolean => {
    const num = parseFloat(distStr);
    return !isNaN(num) && num > 0;
  };

  const handleDistanceChange = useCallback((value: string) => {
    setDistance(value);
    setErrors((prev) => ({ ...prev, distance: undefined }));

    if (value && pace && calculateMode !== 'distance') {
      if (!validateDistance(value)) {
        setErrors((prev) => ({ ...prev, distance: 'Must be positive' }));
        return;
      }

      const paceSeconds = paceToSeconds(pace);
      if (paceSeconds > 0 && calculateMode === 'time') {
        const numValue = parseFloat(value);
        const newTime = calculateTime(numValue, paceSeconds);
        setTime(newTime);
      }
    }
  }, [pace, calculateMode]);

  const handlePaceChange = useCallback((value: string) => {
    setPace(value);
    setErrors((prev) => ({ ...prev, pace: undefined }));

    if (value && distance && calculateMode !== 'pace') {
      if (!validatePace(value)) {
        setErrors((prev) => ({ ...prev, pace: 'MM:SS format' }));
        return;
      }

      const paceSeconds = paceToSeconds(value);
      if (paceSeconds > 0) {
        const numDist = parseFloat(distance);
        if (!isNaN(numDist)) {
          if (calculateMode === 'time') {
            const newTime = calculateTime(numDist, paceSeconds);
            setTime(newTime);
          } else if (calculateMode === 'distance') {
            const timeSeconds = timeToSeconds(time);
            if (timeSeconds > 0) {
              const newDistance = calculateDistance(timeSeconds, paceSeconds);
              setDistance(newDistance);
            }
          }
        }
      }
    }
  }, [distance, time, calculateMode]);

  const handleTimeChange = useCallback((value: string) => {
    setTime(value);
    setErrors((prev) => ({ ...prev, time: undefined }));

    if (value && distance && pace && calculateMode !== 'time') {
      if (!validateTime(value)) {
        setErrors((prev) => ({ ...prev, time: 'HH:MM:SS format' }));
        return;
      }

      const timeSeconds = timeToSeconds(value);
      const paceSeconds = paceToSeconds(pace);

      if (timeSeconds > 0 && paceSeconds > 0) {
        if (calculateMode === 'distance') {
          const newDistance = calculateDistance(timeSeconds, paceSeconds);
          setDistance(newDistance);
        } else if (calculateMode === 'pace') {
          const numDist = parseFloat(distance);
          if (!isNaN(numDist) && numDist > 0) {
            const newPace = secondsToPace(timeSeconds / numDist);
            setPace(newPace);
          }
        }
      }
    }
  }, [distance, pace, calculateMode]);

  const handlePreset = useCallback((presetDistance: string) => {
    setDistance(presetDistance);
    setErrors((prev) => ({ ...prev, distance: undefined }));

    if (pace) {
      const paceSeconds = paceToSeconds(pace);
      if (paceSeconds > 0) {
        const numValue = parseFloat(presetDistance);
        const newTime = calculateTime(numValue, paceSeconds);
        setTime(newTime);
      }
    }
  }, [pace]);

  const incrementDistance = useCallback(() => {
    const num = parseFloat(distance);
    if (!isNaN(num)) {
      const newValue = (num + 0.5).toFixed(2);
      handleDistanceChange(newValue);
    }
  }, [distance, handleDistanceChange]);

  const decrementDistance = useCallback(() => {
    const num = parseFloat(distance);
    if (!isNaN(num) && num > 0.5) {
      const newValue = (num - 0.5).toFixed(2);
      handleDistanceChange(newValue);
    }
  }, [distance, handleDistanceChange]);

  const incrementPace = useCallback(() => {
    const paceSeconds = paceToSeconds(pace);
    if (paceSeconds >= 0) {
      const newSeconds = paceSeconds + 30;
      const newPace = secondsToPace(newSeconds);
      handlePaceChange(newPace);
    }
  }, [pace, handlePaceChange]);

  const decrementPace = useCallback(() => {
    const paceSeconds = paceToSeconds(pace);
    if (paceSeconds > 30) {
      const newSeconds = paceSeconds - 30;
      const newPace = secondsToPace(newSeconds);
      handlePaceChange(newPace);
    }
  }, [pace, handlePaceChange]);

  const incrementTime = useCallback(() => {
    const timeSeconds = timeToSeconds(time);
    const newSeconds = timeSeconds + 300;
    const newTime = secondsToTime(newSeconds);
    handleTimeChange(newTime);
  }, [time, handleTimeChange]);

  const decrementTime = useCallback(() => {
    const timeSeconds = timeToSeconds(time);
    if (timeSeconds > 300) {
      const newSeconds = timeSeconds - 300;
      const newTime = secondsToTime(newSeconds);
      handleTimeChange(newTime);
    }
  }, [time, handleTimeChange]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-950 dark:to-slate-900 flex flex-col">
      <Header />

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <Card className="shadow-lg">
            <CardContent className="pt-6 space-y-5">
              <PresetButtons presets={PRESETS} onPreset={handlePreset} />

              <div className="grid md:grid-cols-3 gap-4">
                <InputField
                  label="Distance (km)"
                  value={distance}
                  placeholder="0.00"
                  onChange={handleDistanceChange}
                  onIncrement={incrementDistance}
                  onDecrement={decrementDistance}
                  error={errors.distance}
                />

                <InputField
                  label="Pace (min/km)"
                  value={pace}
                  placeholder="MM:SS"
                  maxLength={5}
                  onChange={handlePaceChange}
                  onIncrement={incrementPace}
                  onDecrement={decrementPace}
                  error={errors.pace}
                />

                <InputField
                  label="Time (HH:MM:SS)"
                  value={time}
                  placeholder="HH:MM:SS"
                  maxLength={8}
                  onChange={handleTimeChange}
                  onIncrement={incrementTime}
                  onDecrement={decrementTime}
                  error={errors.time}
                />
              </div>

              <ModeSelector currentMode={calculateMode} onChange={setCalculateMode} />
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
