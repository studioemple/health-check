import styled, { css, keyframes } from 'styled-components';

const c = (k) => ({ theme }) => theme.colors[k];
const f = (k) => ({ theme }) => theme.fonts[k];
const bp = (k) => ({ theme }) => theme.bp[k];

/* ───────────── animacije ───────────── */
export const rise = keyframes`
  from { opacity: 0; transform: translateY(22px); }
  to   { opacity: 1; transform: none; }
`;
const riseBack = keyframes`
  from { opacity: 0; transform: translateY(-22px); }
  to   { opacity: 1; transform: none; }
`;
const exitUp = keyframes`
  to { opacity: 0; transform: translateY(-36px) scale(.985); filter: blur(6px); }
`;
const pick = keyframes`
  0% { transform: scale(1); } 30% { transform: scale(.97); } 65% { transform: scale(1.025); } 100% { transform: scale(1); }
`;
const radioPop = keyframes`
  0% { transform: scale(1); } 40% { transform: scale(1.45); } 100% { transform: scale(1); }
`;
const dimOut = keyframes`
  to { opacity: .3; transform: scale(.985); }
`;
const burst = keyframes`
  0% { transform: translate(0,0) scale(1); opacity: 1; }
  80% { opacity: 1; }
  100% { transform: translate(var(--dx), var(--dy)) scale(.2); opacity: 0; }
`;
const wave = keyframes`
  from { transform: scale(.6); opacity: 1; }
  to   { transform: scale(3.6); opacity: 0; }
`;
const fadeIn = keyframes`from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; }`;

const reduced = css`
  @media (prefers-reduced-motion: reduce) {
    animation: none !important;
    transition: none !important;
  }
`;

/* ───────────── okvir ───────────── */
export const Root = styled.div`
  font-family: ${f('primary')};
  color: ${c('navy')};
  background: ${c('white')};
  font-size: 17px;
  line-height: 1.55;
  font-variant-numeric: tabular-nums;
  -webkit-font-smoothing: antialiased;
  scroll-margin-top: var(--hc-sticky-top, 0px);

  *, *::before, *::after { box-sizing: border-box; }
  h1, h2, h3, h4 { margin: 0; text-wrap: balance; }
  p { margin: 0; }
  :focus-visible { outline: 3px solid rgba(0, 159, 227, .45); outline-offset: 3px; border-radius: 8px; }
  ${bp('mobile')} { font-size: 16px; }
`;

export const Container = styled.div`
  max-width: 1150px;
  margin: 0 auto;
  padding: 0 20px;
`;

export const Screen = styled.section`
  padding-block: 48px 80px;
  animation: ${fadeIn} .5s ${({ theme }) => theme.ease.out} both;
  ${reduced}
  ${bp('mobile')} { padding-block: 28px 56px; }
`;

/* ───────────── top bar + timeline ───────────── */
export const Top = styled.div`
  position: sticky;
  top: var(--hc-sticky-top, 0px);
  z-index: 20;
  background: rgba(255, 255, 255, .94);
  backdrop-filter: saturate(1.4) blur(10px);
  -webkit-backdrop-filter: saturate(1.4) blur(10px);
  border-bottom: 1px solid ${c('line')};
`;
export const TopInner = styled(Container)`
  padding-top: 14px;
  padding-bottom: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
export const Bar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-height: 30px;
`;
export const LogoLink = styled.a`
  display: block;
  height: 26px;
  color: ${c('navy')};
  svg { height: 100%; width: auto; display: block; }
  ${bp('mobile')} { height: 22px; }
`;
export const BarTitle = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: ${c('navy')};
`;
export const Status = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 14px;
  color: ${c('text2')};
  white-space: nowrap;
  b { color: ${c('navy')}; font-weight: 700; }
`;
export const HideMobile = styled.span`
  ${bp('mobile')} { display: none; }
`;
export const PillTime = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  border-radius: 999px;
  background: ${c('tint')};
  color: ${c('label')};
  font-weight: 700;
  font-size: 13px;
  svg { width: 14px; height: 14px; }
`;
export const Timeline = styled.nav`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 8px;
`;
export const Seg = styled.button`
  display: flex;
  flex-direction: column;
  gap: 7px;
  background: none;
  border: 0;
  padding: 0;
  text-align: left;
  min-width: 0;
  cursor: pointer;
  color: inherit;
  &:disabled { cursor: default; }
`;
export const Ticks = styled.span`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3px;
`;
export const Tick = styled.span`
  height: 5px;
  border-radius: 3px;
  transition: background .3s ease;
  background: ${({ $state, theme }) =>
    $state === 'now' ? theme.colors.navy : $state === 'done' ? theme.colors.blue : theme.colors.line};
`;
export const SegLabel = styled.span`
  font-size: 12px;
  font-weight: 700;
  letter-spacing: .01em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ $state, theme }) =>
    $state === 'active' ? theme.colors.navy : $state === 'complete' ? theme.colors.label : theme.colors.text4};
  ${Seg}:not(:disabled):hover & { color: ${c('navy')}; }
  ${bp('mobile')} { display: none; }
`;

/* ───────────── tipografija / zajedničko ───────────── */
export const Eyebrow = styled.span`
  display: block;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: ${c('label')};
`;
export const SecHead = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
  h2 { font-size: clamp(26px, 3vw, 34px); line-height: 1.15; font-weight: 800; letter-spacing: -1px; }
  p { color: ${c('text2')}; max-width: 40em; }
`;

/* ───────────── gumbi (obrasci s rentl.io) ───────────── */
const btnBase = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: 0;
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: 15px 26px;
  font-family: ${f('primary')};
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  text-decoration: none;
  transition: background .3s ease-in-out, color .3s ease-in-out, transform .15s ease, box-shadow .3s ease;
  svg { width: 18px; height: 18px; transition: transform .25s ease; }
  &:hover svg { transform: translateX(3px); }
  &:active { transform: scale(.96); }
`;
export const BtnPrimary = styled.button`
  ${btnBase}
  color: #fff;
  background: linear-gradient(147deg, #2ab4e0 0%, ${c('blue')} 61%, ${c('blue')} 100%);
  background-size: 200% 100%;
  background-position: 100% 0;
  box-shadow: 0 0 0 1px rgba(42, 180, 224, .6), 0 10px 24px -12px rgba(0, 159, 227, .9);
  &:hover { background-position: 50% 0; background-color: ${c('blueHover')}; }
`;
export const BtnGhost = styled.button`
  ${btnBase}
  background: transparent;
  color: ${c('text2')};
  padding: 15px 8px;
  &:hover { color: ${c('navy')}; }
  &:hover svg { transform: translateX(-3px); }
`;
export const BtnWhite = styled.a`
  ${btnBase}
  position: relative;
  z-index: 1;
  background: #fff;
  color: ${c('navy')};
  &:hover { background: ${c('navy')}; color: #fff; }
`;

/* ───────────── intro ───────────── */
export const IntroGrid = styled.div`
  display: grid;
  grid-template-columns: 1.1fr .9fr;
  gap: 64px;
  align-items: center;
  padding-top: 16px;
  ${bp('tablet')} { grid-template-columns: 1fr; gap: 40px; }
`;
export const IntroCopy = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
  min-width: 0;
  h1 {
    font-size: clamp(40px, 5.6vw, 64px);
    line-height: 1.05;
    font-weight: 800;
    letter-spacing: -2.1px;
  }
  h1 em { font-style: normal; color: ${c('blue')}; }
`;
export const Lede = styled.p`
  font-size: 19px;
  color: ${c('text2')};
  max-width: 34em;
`;
export const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;
export const Chip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 15px;
  border: 1px solid ${c('line')};
  border-radius: 999px;
  font-size: 15px;
  font-weight: 600;
  svg { width: 17px; height: 17px; color: ${c('blue')}; }
`;
const checkBg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath d='M5.5 10.5l3 3 6-7' fill='none' stroke='%235f8a10' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`;
const checkBullet = css`
  display: flex;
  gap: 12px;
  align-items: flex-start;
  &::before {
    content: '';
    flex: none;
    width: 20px;
    height: 20px;
    margin-top: 3px;
    border-radius: 50%;
    background: ${c('greenTint')} ${checkBg} center / 20px no-repeat;
  }
`;
export const Checks = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 10px;
  li { ${checkBullet} }
`;
export const CtaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
  margin-top: 6px;
`;
export const Hint = styled.span`
  font-size: 14px;
  color: ${c('text3')};
`;
export const MapCard = styled.aside`
  border: 1px solid ${c('line')};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: #fff;
  box-shadow: ${({ theme }) => theme.shadow};
  overflow: hidden;
  min-width: 0;
`;
export const MapHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
  padding: 22px 26px 16px;
  h3 { font-size: 20px; font-weight: 800; letter-spacing: -.3px; }
  span { font-size: 14px; color: ${c('text3')}; font-weight: 500; }
`;
export const MapList = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0 12px 12px;
`;
export const MapItem = styled.li`
  display: grid;
  grid-template-columns: 36px 1fr 44px;
  align-items: center;
  gap: 14px;
  padding: 13px 14px;
  border-radius: ${({ theme }) => theme.radius.md};
  &:nth-child(odd) { background: ${c('surface')}; }
  animation: ${rise} .55s ${({ theme }) => theme.ease.web} both;
  animation-delay: ${({ $i }) => $i * 70 + 150}ms;
  ${reduced}
`;
export const MapNum = styled.span`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${c('tint')};
  color: ${c('label')};
  display: grid;
  place-items: center;
  font-weight: 800;
  font-size: 15px;
`;
export const MapName = styled.span`
  display: flex;
  flex-direction: column;
  min-width: 0;
  line-height: 1.3;
  b { font-weight: 700; }
  small { font-size: 14px; color: ${c('text3')}; }
`;
export const MiniTicks = styled.span`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3px;
  i { height: 5px; border-radius: 3px; background: ${c('line')}; }
`;
export const MapFoot = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 26px;
  border-top: 1px solid ${c('line')};
  font-size: 14px;
  color: ${c('text2')};
  background: ${c('surface')};
  svg { width: 18px; height: 18px; color: ${c('greenInk')}; flex: none; }
`;
export const Howto = styled.div`
  margin-top: 64px;
  padding-top: 40px;
  border-top: 1px solid ${c('line')};
  display: grid;
  grid-template-columns: 1fr 1.25fr;
  gap: 40px;
  h3 { font-size: 24px; font-weight: 800; letter-spacing: -.5px; margin-bottom: 10px; }
  p { color: ${c('text2')}; }
  p + p { margin-top: 14px; font-size: 15px; }
  ${bp('tablet')} { grid-template-columns: 1fr; gap: 24px; }
`;
export const Legend = styled.div`
  display: grid;
  gap: 8px;
`;
export const LegendRow = styled.div`
  display: grid;
  grid-template-columns: 44px 132px 1fr;
  align-items: center;
  gap: 14px;
  padding: 12px 16px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${c('surface')};
  .pts { font-size: 26px; font-weight: 800; line-height: 1; color: ${c('blue')}; }
  .lab { font-size: 13px; font-weight: 800; letter-spacing: .08em; }
  .txt { font-size: 15px; color: ${c('text2')}; }
  ${bp('mobile')} {
    grid-template-columns: 34px 1fr;
    gap: 4px 12px;
    .txt { grid-column: 2; }
  }
`;

/* ───────────── pitanje ───────────── */
const stagger = css`
  animation: ${({ $back }) => ($back ? riseBack : rise)} .55s ${({ theme }) => theme.ease.out} both;
  ${reduced}
`;
export const Q = styled.div`
  max-width: 740px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 28px;
  ${({ $exit }) =>
    $exit &&
    css`
      animation: ${exitUp} .42s cubic-bezier(.5, 0, .75, 0) forwards;
      ${reduced}
    `}
`;
export const QHead = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  ${stagger}
  h2 { font-size: clamp(26px, 3.4vw, 36px); line-height: 1.2; font-weight: 800; letter-spacing: -1px; }
  > p { color: ${c('text2')}; }
`;
export const Kicker = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
`;
export const AreaTag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 700;
  padding: 6px 13px 6px 6px;
  border-radius: 999px;
  background: ${c('surface')};
  border: 1px solid ${c('line')};
  i {
    font-style: normal;
    display: grid;
    place-items: center;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: ${c('blue')};
    color: #fff;
    font-size: 13px;
    font-weight: 800;
  }
`;
export const QNum = styled.span`
  font-size: 14px;
  color: ${c('text3')};
  font-weight: 500;
`;
export const Opts = styled.div`
  display: grid;
  gap: 12px;
`;
export const Radio = styled.span`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid ${c('line2')};
  display: grid;
  place-items: center;
  transition: all .18s;
  &::after {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #fff;
    transform: scale(0);
    transition: transform .2s cubic-bezier(.3, 1.6, .5, 1);
  }
`;
export const Opt = styled.button`
  position: relative;
  display: grid;
  grid-template-columns: 26px 1fr auto;
  align-items: center;
  gap: 16px;
  width: 100%;
  text-align: left;
  padding: 18px 20px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1.5px solid ${c('line')};
  background: #fff;
  color: ${c('navy')};
  font-family: ${f('primary')};
  cursor: pointer;
  transition: border-color .18s, background .18s, box-shadow .18s;
  animation: ${({ $back }) => ($back ? riseBack : rise)} .55s ${({ theme }) => theme.ease.out} both;
  animation-delay: ${({ $i }) => 90 + $i * 60}ms;
  ${reduced}

  &:hover { border-color: ${c('line2')}; box-shadow: ${({ theme }) => theme.shadow}; }
  &:focus-visible { outline: 2px solid ${c('blue')}; outline-offset: 2px; }

  &[aria-checked='true'] {
    border-color: ${c('blue')};
    background: ${c('tint')};
    box-shadow: 0 0 0 3px rgba(0, 159, 227, .12);
    ${Radio} { border-color: ${c('blue')}; background: ${c('blue')}; }
    ${Radio}::after { transform: scale(1); }
  }
  ${({ $chosen }) =>
    $chosen &&
    css`
      animation: ${pick} .5s cubic-bezier(.3, 1.4, .5, 1) both !important;
      animation-delay: 0ms !important;
      ${Radio} { animation: ${radioPop} .5s cubic-bezier(.3, 1.6, .5, 1); }
    `}
  ${({ $dim }) =>
    $dim &&
    css`
      animation: ${dimOut} .3s ease forwards !important;
      animation-delay: 0ms !important;
    `}

  ${bp('mobile')} { grid-template-columns: 24px 1fr; padding: 16px; }
`;
export const OptMain = styled.span`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  .label { font-size: 18px; font-weight: 800; letter-spacing: .02em; }
  .desc { font-size: 15px; color: ${c('text2')}; line-height: 1.4; }
`;
export const Kbd = styled.kbd`
  font-family: ${f('primary')};
  font-size: 12px;
  font-weight: 700;
  color: ${c('text3')};
  border: 1px solid ${c('line')};
  border-bottom-width: 2px;
  border-radius: 6px;
  padding: 1px 7px;
  ${bp('mobile')} { display: none; }
`;
export const Puff = styled.span`
  position: absolute;
  width: 0;
  height: 0;
  pointer-events: none;
  z-index: 2;
  b {
    position: absolute;
    left: -14px;
    top: -14px;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 2px solid ${c('blue')};
    animation: ${wave} .6s cubic-bezier(.2, .7, .3, 1) forwards;
  }
  i {
    position: absolute;
    left: 0;
    top: 0;
    width: var(--s);
    height: var(--s);
    margin: calc(var(--s) / -2) 0 0 calc(var(--s) / -2);
    border-radius: 50%;
    background: var(--c);
    animation: ${burst} .7s cubic-bezier(.15, .7, .3, 1) forwards;
  }
  @media (prefers-reduced-motion: reduce) { display: none; }
`;
export const Insight = styled.div`
  display: grid;
  grid-template-columns: 36px 1fr;
  gap: 14px;
  padding: 18px 20px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${c('surface')};
  ${stagger}
  animation-delay: 290ms;
  .ic {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    background: #fff;
    display: grid;
    place-items: center;
    color: ${c('blue')};
    box-shadow: 0 1px 2px rgba(14, 49, 81, .08);
    svg { width: 19px; height: 19px; }
  }
  h4 { font-size: 15px; font-weight: 800; margin-bottom: 4px; }
  p { font-size: 15px; color: ${c('text2')}; }
`;
export const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  ${stagger}
  animation-delay: 330ms;
`;
export const Keys = styled.span`
  font-size: 13px;
  color: ${c('text3')};
  ${bp('mobile')} { display: none; }
`;

/* reflection */
export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  ${stagger}
  animation-delay: 120ms;
  label { font-size: 14px; font-weight: 700; color: ${c('text2')}; }
  textarea {
    font: inherit;
    color: ${c('navy')};
    width: 100%;
    min-height: 120px;
    border: 1.5px solid ${c('line')};
    border-radius: ${({ theme }) => theme.radius.md};
    padding: 14px 16px;
    background: #fff;
    resize: vertical;
    transition: border-color .2s, box-shadow .2s;
  }
  textarea:focus { outline: none; border-color: ${c('blue')}; box-shadow: 0 0 0 3px rgba(0, 159, 227, .14); }
`;
export const Ideas = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  ${stagger}
  animation-delay: 200ms;
  button {
    border: 1px solid ${c('line')};
    background: #fff;
    border-radius: 999px;
    padding: 7px 14px;
    font-family: ${f('primary')};
    font-size: 14px;
    color: ${c('text2')};
    cursor: pointer;
    transition: border-color .2s, color .2s;
  }
  button:hover { border-color: ${c('blue')}; color: ${c('label')}; }
`;

/* ───────────── rezultati ───────────── */
export const Res = styled.div`
  display: flex;
  flex-direction: column;
  gap: 64px;
`;
export const ScoreHero = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 48px;
  align-items: center;
  ${bp('tablet')} { grid-template-columns: 1fr; gap: 28px; justify-items: start; }
`;
export const Ring = styled.div`
  position: relative;
  width: 220px;
  height: 220px;
  svg { width: 100%; height: 100%; transform: rotate(-90deg); }
  .trk { stroke: ${c('line')}; }
  .val { stroke: ${c('blue')}; transition: stroke-dashoffset 1.2s ${({ theme }) => theme.ease.out}; }
  ${bp('mobile')} { width: 180px; height: 180px; }
`;
export const RingNum = styled.div`
  position: absolute;
  inset: 0;
  display: grid;
  place-content: center;
  text-align: center;
  b { font-size: 68px; font-weight: 800; line-height: 1; letter-spacing: -2px; }
  span { font-size: 16px; color: ${c('text3')}; font-weight: 500; margin-top: 4px; }
  ${bp('mobile')} { b { font-size: 56px; } }
`;
export const BandCopy = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
  h1 { font-size: clamp(30px, 4vw, 44px); line-height: 1.12; font-weight: 800; letter-spacing: -1.3px; }
  p { font-size: 18px; color: ${c('text2')}; max-width: 36em; }
`;
const toneMap = {
  low: ['warmTint', 'warmInk'],
  mid: ['tint', 'label'],
  high: ['greenTint', 'greenInk'],
};
export const BandBadge = styled.span`
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: .06em;
  text-transform: uppercase;
  background: ${({ theme, $tone }) => theme.colors[toneMap[$tone][0]]};
  color: ${({ theme, $tone }) => theme.colors[toneMap[$tone][1]]};
  &::before { content: ''; width: 8px; height: 8px; border-radius: 50%; background: currentColor; }
`;
export const Scale = styled.div`
  margin-top: 6px;
  max-width: 520px;
`;
export const ScaleTrack = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 10fr 8fr 7fr;
  gap: 4px;
  height: 8px;
  span { border-radius: 4px; background: ${c('line')}; }
  span.on { background: ${c('navy')}; }
`;
export const ScaleMarker = styled.i`
  position: absolute;
  top: -5px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: ${c('blue')};
  border: 3px solid #fff;
  box-shadow: 0 1px 4px rgba(14, 49, 81, .3);
  transform: translateX(-50%);
  transition: left 1.2s ${({ theme }) => theme.ease.out};
`;
export const ScaleLabels = styled.div`
  display: grid;
  grid-template-columns: 10fr 8fr 7fr;
  gap: 4px;
  margin-top: 8px;
  font-size: 12px;
  color: ${c('text3')};
  font-weight: 700;
`;
export const Areas = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 40px;
  ${bp('tablet')} { grid-template-columns: 1fr; }
`;
export const ARow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px 16px;
  padding: 14px 0;
  border-bottom: 1px solid ${c('line')};
  .name { font-weight: 700; display: flex; align-items: center; gap: 10px; flex-wrap: wrap; min-width: 0; }
  .n { color: ${c('text3')}; font-weight: 500; }
  .score { font-weight: 800; }
  .score small { color: ${c('text3')}; font-weight: 500; font-size: 14px; }
`;
export const ABar = styled.span`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3px;
  span { height: 6px; border-radius: 3px; background: ${c('line')}; }
  span.on { background: ${({ $weak, theme }) => ($weak ? theme.colors.warm : theme.colors.blue)}; }
`;
export const Flag = styled.span`
  font-size: 11px;
  font-weight: 800;
  letter-spacing: .06em;
  text-transform: uppercase;
  color: ${c('warmInk')};
  background: ${c('warmTint')};
  padding: 3px 8px;
  border-radius: 999px;
`;

export const Helps = styled.div`
  display: grid;
  gap: 16px;
`;
export const Help = styled.article`
  display: grid;
  grid-template-columns: 240px 1fr;
  border: 1px solid ${({ $lead, theme }) => ($lead ? theme.colors.blue : theme.colors.line)};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: #fff;
  overflow: hidden;
  ${({ $lead, theme }) => $lead && css`box-shadow: 0 0 0 3px rgba(0, 159, 227, .1), ${theme.shadow};`}
  ${bp('tablet')} { grid-template-columns: 1fr; }
`;
export const HelpSide = styled.div`
  padding: 26px 24px;
  background: ${({ $lead, theme }) => ($lead ? theme.colors.tint : theme.colors.surface)};
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-right: 1px solid ${c('line')};
  .rank {
    font-size: 12px;
    font-weight: 800;
    letter-spacing: .1em;
    text-transform: uppercase;
    color: ${({ $lead, theme }) => ($lead ? theme.colors.label : theme.colors.text3)};
  }
  h3 { font-size: 20px; font-weight: 800; line-height: 1.2; letter-spacing: -.3px; }
  .level { font-size: 14px; color: ${c('text2')}; line-height: 1.45; }
  ${bp('tablet')} { border-right: 0; border-bottom: 1px solid ${c('line')}; padding: 20px; }
`;
export const HelpScore = styled.span`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 700;
  color: ${c('text2')};
  .dots { display: inline-grid; grid-template-columns: repeat(4, 14px); gap: 3px; }
  .dots i { height: 6px; border-radius: 3px; background: ${c('line2')}; }
  .dots i.on { background: ${c('blue')}; }
`;
export const HelpMain = styled.div`
  padding: 26px 28px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-width: 0;
  h4 { font-size: clamp(21px, 2.4vw, 26px); line-height: 1.2; font-weight: 800; letter-spacing: -.6px; }
  > p { color: ${c('text2')}; max-width: 40em; }
  ${bp('tablet')} { padding: 20px; }
`;
export const Gains = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 8px;
  li { ${checkBullet} }
  li::before { margin-top: 2px; }
`;
export const Proof = styled.figure`
  margin: 0;
  padding: 12px 16px;
  border-left: 3px solid ${c('green')};
  background: ${c('greenTint')};
  border-radius: 0 ${({ theme }) => theme.radius.sm} ${({ theme }) => theme.radius.sm} 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
  b { font-weight: 700; }
  figcaption { font-size: 14px; color: ${c('text2')}; }
`;
export const Feat = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 12px;
  padding-top: 14px;
  border-top: 1px dashed ${c('line2')};
  .label { font-size: 12px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; color: ${c('text3')}; }
  .tags { display: flex; flex-wrap: wrap; gap: 6px; }
  .tags span { font-size: 14px; font-weight: 700; color: ${c('label')}; background: ${c('tint')}; padding: 4px 11px; border-radius: 999px; }
  .note { flex-basis: 100%; font-size: 14px; color: ${c('text3')}; }
`;
export const Strong = styled.div`
  margin-top: 18px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 14px;
  .label { font-size: 14px; font-weight: 700; color: ${c('text2')}; }
  .tags { display: flex; flex-wrap: wrap; gap: 6px; }
  .tags span {
    font-size: 14px;
    font-weight: 700;
    color: ${c('greenInk')};
    background: ${c('greenTint')} ${checkBg} 9px center / 16px no-repeat;
    padding: 5px 12px 5px 30px;
    border-radius: 999px;
  }
`;

// Tamni CTA panel – isti obrazac kao blokovi na rentl.io (zaobljena kartica unutar bijele stranice)
export const Final = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 24px;
  padding: 48px;
  background: linear-gradient(120deg, ${c('blue')} 0%, #0088c9 100%);
  color: #fff;
  display: grid;
  grid-template-columns: 1.3fr auto;
  gap: 28px;
  align-items: center;
  &::after {
    content: '';
    position: absolute;
    right: -80px;
    top: -120px;
    width: 340px;
    height: 340px;
    border-radius: 50%;
    background: rgba(255, 255, 255, .1);
  }
  .eyebrow { display: block; font-size: 13px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; color: rgba(255, 255, 255, .8); margin-bottom: 10px; }
  h2 { font-size: clamp(26px, 3.2vw, 36px); font-weight: 800; line-height: 1.15; letter-spacing: -1px; }
  p { margin-top: 10px; color: rgba(255, 255, 255, .9); max-width: 34em; }
  .tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 16px; position: relative; z-index: 1; }
  .tags span { font-size: 14px; font-weight: 700; background: rgba(255, 255, 255, .18); padding: 5px 12px; border-radius: 999px; }
  ${bp('tablet')} { grid-template-columns: 1fr; padding: 32px 26px; }
`;
export const Restart = styled.div`
  display: flex;
  justify-content: center;
`;
export const EndLogo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  padding-block: 72px 16px;
  border-top: 1px solid ${c('line')};
  text-align: center;
  a { display: block; width: min(620px, 100%); color: ${c('navy')}; }
  a svg { width: 100%; height: auto; display: block; }
  p { font-size: 17px; color: ${c('text2')}; max-width: 32em; }
`;
