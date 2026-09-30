const base = { fill: 'none', stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };

export const ArrowRight = () => (
  <svg viewBox="0 0 20 20" strokeWidth="2" {...base}><path d="M4 10h12M11 5l5 5-5 5" /></svg>
);
export const ArrowLeft = () => (
  <svg viewBox="0 0 20 20" strokeWidth="2" {...base}><path d="M16 10H4M9 5l-5 5 5 5" /></svg>
);
export const Clock = () => (
  <svg viewBox="0 0 20 20" strokeWidth="1.8" {...base}><circle cx="10" cy="10" r="7.5" /><path d="M10 6v4l2.5 2" /></svg>
);
export const List = () => (
  <svg viewBox="0 0 20 20" strokeWidth="1.8" {...base}>
    <path d="M7 5.5h9M7 10h9M7 14.5h9" />
    <circle cx="3.6" cy="5.5" r=".9" fill="currentColor" />
    <circle cx="3.6" cy="10" r=".9" fill="currentColor" />
    <circle cx="3.6" cy="14.5" r=".9" fill="currentColor" />
  </svg>
);
export const Spark = () => (
  <svg viewBox="0 0 20 20" strokeWidth="1.8" {...base}><path d="M10 2.5v4M10 13.5v4M2.5 10h4M13.5 10h4M5 5l2.2 2.2M12.8 12.8L15 15M15 5l-2.2 2.2M7.2 12.8L5 15" /></svg>
);
export const Bulb = () => (
  <svg viewBox="0 0 20 20" strokeWidth="1.8" {...base}><path d="M7.5 15h5M8.3 17.5h3.4M10 2.5a5 5 0 0 0-3 9c.6.5 1 1.2 1 2V14h4v-.5c0-.8.4-1.5 1-2a5 5 0 0 0-3-9z" /></svg>
);
export const Leaf = () => (
  <svg viewBox="0 0 20 20" strokeWidth="1.8" {...base}><path d="M4 16c0-7 4-11 12-12 0 8-4 12-10 12H4zM4 16l6-6" /></svg>
);

export const CHIP_ICONS = [Clock, List, Spark];
