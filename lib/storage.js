// Pamti napredak u pregledniku korisnika (nastavak nakon zatvaranja taba).
const KEY = 'rentlio-health-check-v1';

export function loadProgress() {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function saveProgress(state) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch (e) {
    /* privatni prozor / blokirana pohrana – upitnik radi i bez toga */
  }
}
