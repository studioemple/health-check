// Tokeni preuzeti s rentl.io (produkcijski CSS) + brand book.
export const theme = {
  colors: {
    navy: '#0e3151', // Prussian blue – glavni tekst, tamne površine
    navyHover: '#12426e',
    blue: '#009fe3', // Highlight blue – akcent / CTA
    blueHover: '#0088c4',
    blueLight: '#66d1ff',
    label: '#0076b5', // eyebrow na bijeloj pozadini
    green: '#a9cf3a',
    greenInk: '#5f8a10',
    greenTint: '#f2f8e1',
    warm: '#e0703e',
    warmInk: '#b4521f',
    warmTint: '#fdf0e9',
    white: '#ffffff',
    surface: '#f5f9fc',
    tint: '#ecf6ff',
    tint2: '#d5eefb',
    line: '#e2e9f0',
    line2: '#cdd8e3',
    text2: '#536779',
    text3: '#6e8397',
    text4: '#9fadb9',
  },
  fonts: {
    primary: "'Manrope', 'Helvetica Neue', Arial, sans-serif",
    secondary: "'Barlow', 'Helvetica Neue', Arial, sans-serif",
  },
  radius: { sm: '10px', md: '14px', lg: '20px', pill: '24px' },
  shadow:
    '0 1px 2px rgba(14,49,81,.05), 0 8px 24px -12px rgba(14,49,81,.16)',
  ease: {
    out: 'cubic-bezier(.2,.7,.2,1)',
    web: 'cubic-bezier(0.33,0.6,0.38,0.99)',
  },
  bp: {
    tablet: '@media (max-width: 860px)',
    mobile: '@media (max-width: 640px)',
  },
};
