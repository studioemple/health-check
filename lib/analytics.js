// GTM dataLayer eventi (rentl.io koristi GTM-5Q7HJWB).
// U GTM-u napraviti Custom Event triggere na ove nazive.
export function track(event, params = {}) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

export const EVENTS = {
  start: 'health_check_start',
  answer: 'health_check_answer',
  complete: 'health_check_complete',
  cta: 'health_check_cta_click',
  restart: 'health_check_restart',
};
