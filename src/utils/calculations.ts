/**
 * Time conversion utilities for pace calculator
 */

/**
 * Convert time string (HH:MM:SS) to total seconds
 */
export function timeToSeconds(timeStr: string): number {
  if (!timeStr) return 0;
  
  const parts = timeStr.split(':').map(Number);
  
  if (parts.length === 3) {
    const [hours, minutes, seconds] = parts;
    return hours * 3600 + minutes * 60 + seconds;
  } else if (parts.length === 2) {
    const [minutes, seconds] = parts;
    return minutes * 60 + seconds;
  }
  
  return 0;
}

/**
 * Convert seconds to time string (HH:MM:SS)
 */
export function secondsToTime(totalSeconds: number): string {
  if (totalSeconds < 0) return '00:00:00';
  
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);
  
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

/**
 * Convert pace string (MM:SS) to seconds per km
 */
export function paceToSeconds(paceStr: string): number {
  if (!paceStr) return 0;
  
  const parts = paceStr.split(':').map(Number);
  
  if (parts.length === 2) {
    const [minutes, seconds] = parts;
    return minutes * 60 + seconds;
  }
  
  return 0;
}

/**
 * Convert seconds per km to pace string (MM:SS)
 */
export function secondsToPace(secondsPerKm: number): string {
  if (secondsPerKm < 0) return '00:00';
  
  const minutes = Math.floor(secondsPerKm / 60);
  const seconds = Math.floor(secondsPerKm % 60);
  
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

/**
 * Calculate pace (minutes per km)
 * pace = totalTime / distance
 */
export function calculatePace(totalSeconds: number, distanceKm: number): string {
  if (distanceKm <= 0 || totalSeconds <= 0) return '00:00';
  
  const paceSeconds = totalSeconds / distanceKm;
  return secondsToPace(paceSeconds);
}

/**
 * Calculate distance (km)
 * distance = totalTime / pace
 */
export function calculateDistance(totalSeconds: number, paceSeconds: number): string {
  if (paceSeconds <= 0 || totalSeconds <= 0) return '0';
  
  const distance = totalSeconds / paceSeconds;
  return distance.toFixed(2);
}

/**
 * Calculate total time (seconds)
 * time = distance * pace
 */
export function calculateTime(distanceKm: number, paceSeconds: number): string {
  if (distanceKm <= 0 || paceSeconds <= 0) return '00:00:00';
  
  const totalSeconds = distanceKm * paceSeconds;
  return secondsToTime(totalSeconds);
}
