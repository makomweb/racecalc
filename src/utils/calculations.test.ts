import { describe, it, expect } from 'vitest';
import {
  timeToSeconds,
  secondsToTime,
  paceToSeconds,
  secondsToPace,
  calculatePace,
  calculateDistance,
  calculateTime,
} from './calculations';

describe('Time conversion utilities', () => {
  describe('timeToSeconds', () => {
    it('should convert HH:MM:SS to seconds', () => {
      expect(timeToSeconds('01:30:45')).toBe(5445);
      expect(timeToSeconds('00:05:30')).toBe(330);
      expect(timeToSeconds('02:00:00')).toBe(7200);
    });

    it('should handle MM:SS format', () => {
      expect(timeToSeconds('05:30')).toBe(330);
      expect(timeToSeconds('10:00')).toBe(600);
    });

    it('should return 0 for empty string', () => {
      expect(timeToSeconds('')).toBe(0);
    });
  });

  describe('secondsToTime', () => {
    it('should convert seconds to HH:MM:SS', () => {
      expect(secondsToTime(5445)).toBe('01:30:45');
      expect(secondsToTime(330)).toBe('00:05:30');
      expect(secondsToTime(7200)).toBe('02:00:00');
    });

    it('should return 00:00:00 for negative values', () => {
      expect(secondsToTime(-100)).toBe('00:00:00');
    });
  });

  describe('paceToSeconds', () => {
    it('should convert MM:SS to seconds', () => {
      expect(paceToSeconds('05:30')).toBe(330);
      expect(paceToSeconds('06:00')).toBe(360);
      expect(paceToSeconds('00:45')).toBe(45);
    });

    it('should return 0 for empty string', () => {
      expect(paceToSeconds('')).toBe(0);
    });
  });

  describe('secondsToPace', () => {
    it('should convert seconds to MM:SS', () => {
      expect(secondsToPace(330)).toBe('05:30');
      expect(secondsToPace(360)).toBe('06:00');
      expect(secondsToPace(45)).toBe('00:45');
    });

    it('should return 00:00 for negative values', () => {
      expect(secondsToPace(-100)).toBe('00:00');
    });
  });
});

describe('Pace calculations', () => {
  describe('calculatePace', () => {
    it('should calculate pace from time and distance', () => {
      // 10km in 50 minutes (3000 seconds) = 5:00 min/km
      expect(calculatePace(3000, 10)).toBe('05:00');
      
      // 5km in 25 minutes (1500 seconds) = 5:00 min/km
      expect(calculatePace(1500, 5)).toBe('05:00');
    });

    it('should return 00:00 for invalid values', () => {
      expect(calculatePace(0, 10)).toBe('00:00');
      expect(calculatePace(3000, 0)).toBe('00:00');
    });
  });

  describe('calculateDistance', () => {
    it('should calculate distance from time and pace', () => {
      // 50 minutes at 5:00 min/km = 10km
      expect(calculateDistance(3000, 300)).toBe('10.00');
      
      // 30 minutes at 6:00 min/km = 5km
      expect(calculateDistance(1800, 360)).toBe('5.00');
    });

    it('should return 0 for invalid values', () => {
      expect(calculateDistance(0, 300)).toBe('0');
      expect(calculateDistance(3000, 0)).toBe('0');
    });
  });

  describe('calculateTime', () => {
    it('should calculate time from distance and pace', () => {
      // 10km at 5:00 min/km = 50 minutes (3000 seconds)
      expect(calculateTime(10, 300)).toBe('00:50:00');
      
      // 5km at 6:00 min/km = 30 minutes (1800 seconds)
      expect(calculateTime(5, 360)).toBe('00:30:00');
    });

    it('should return 00:00:00 for invalid values', () => {
      expect(calculateTime(0, 300)).toBe('00:00:00');
      expect(calculateTime(10, 0)).toBe('00:00:00');
    });
  });

  describe('calculations consistency', () => {
    it('should maintain consistency when calculating all three values', () => {
      const distance = 10; // km
      const paceStr = '05:30'; // min/km
      const paceSeconds = paceToSeconds(paceStr);
      
      // Calculate expected time
      const timeStr = calculateTime(distance, paceSeconds);
      const timeSeconds = timeToSeconds(timeStr);
      
      // Calculate back to distance
      const calculatedDistance = parseFloat(calculateDistance(timeSeconds, paceSeconds));
      
      expect(calculatedDistance).toBeCloseTo(distance, 1);
    });
  });
});
