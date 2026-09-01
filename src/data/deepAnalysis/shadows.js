import { bySign, signOnly } from './_fromRecords.js';

// Keyed by the rising sign; drawn from the sign's own record.
export const RISING_SHADOW = signOnly();

export const VENUS_SHADOW   = bySign('Venus');
export const MARS_SHADOW    = bySign('Mars');
export const MERCURY_SHADOW = bySign('Mercury');
