// One shared sky clock for every view. `touched` is false until the visitor moves
// the scroller, so a view keeps its own moment (the chart's, or now) until then.
import { useSyncExternalStore } from 'react';
import { nowJd, unitDays } from '../engines/skyTime.js';
import { PRECESSION_YEARS, AGE_YEARS } from '../engines/skyTime.js';

const START = nowJd();
export const RANGE = {
  min: START - PRECESSION_YEARS * 365.25,       // a complete cycle back
  max: START + AGE_YEARS * 365.25,              // and one age on, to see Aquarius arrive
};

let state = { jd: START, touched: false, autoStep: 30, trail: 'auto', show: true, unit: 'year', playing: 0 };
const listeners = new Set();
const set = patch => { state = { ...state, ...patch }; listeners.forEach(l => l()); };
const clamp = jd => Math.min(RANGE.max, Math.max(RANGE.min, jd));

export const getSky = () => state;
export const subscribeSky = l => { listeners.add(l); return () => listeners.delete(l); };
export const useSky = () => useSyncExternalStore(subscribeSky, getSky, getSky);

// Move by scrolling: the size of the move sets the ghost stream's spacing (smoothed).
export function scrollSkyTo(jd, stepDays) {
  const next = clamp(jd);
  const d = Math.abs(stepDays ?? next - state.jd);
  set({ jd: next, touched: true, autoStep: d > 0 ? 0.5 * state.autoStep + 0.5 * d : state.autoStep });
}
// Move without changing the spacing: a typed date, the Now button.
export const jumpSkyTo = jd => set({ jd: clamp(jd), touched: true });
export const resetSky = () => set({ jd: nowJd(), touched: false });
export const setSkyOption = patch => set(patch);

// Days between ghost samples for the current setting.
export function trailStepDays(s = state) {
  if (s.trail === 'auto') return Math.min(Math.max(s.autoStep, 0.25), 3652.5 * 100);
  return unitDays(s.trail);
}
