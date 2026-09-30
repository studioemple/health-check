import { useEffect, useState } from 'react';
import { AREAS, BANDS, RESULTS, DEMO_URL, CTA_LABEL, RENTLIO_URL } from '../../data/healthCheck';
import {
  MAX_SCORE, MAX_AREA_SCORE, totalScore, areaScores, bandFor, priorityOrder, strongAreas,
} from '../../lib/scoring';
import RentlioOneLogo from './RentlioOneLogo';
import { ArrowRight } from './icons';
import * as S from './styles';

const R = 96;
const CIRC = 2 * Math.PI * R;

function useCountUp(target, run) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVal(target);
      return undefined;
    }
    let raf;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / 1100);
      setVal(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run]);
  return val;
}

function HelpCard({ areaIndex, rank, score }) {
  const area = AREAS[areaIndex];
  const h = area.help;
  const lead = rank === 0;
  const level = score <= 1 ? RESULTS.levelLow : score < MAX_AREA_SCORE ? RESULTS.levelMid : '';
  return (
    <S.Help $lead={lead}>
      <S.HelpSide $lead={lead}>
        <span className="rank">{lead ? 'Najveća razlika' : `Prioritet ${rank + 1}`}</span>
        <h3>{area.name}</h3>
        <S.HelpScore>
          <span className="dots" aria-hidden="true">
            {[0, 1, 2, 3].map((k) => <i key={k} className={k < score ? 'on' : ''} />)}
          </span>
          {score} / {MAX_AREA_SCORE}
        </S.HelpScore>
        {level && <p className="level">{level}</p>}
      </S.HelpSide>
      <S.HelpMain>
        <h4>{h.headline}</h4>
        <p>{h.text}</p>
        <S.Gains>
          {h.gains.map((g) => <li key={g}>{g}</li>)}
        </S.Gains>
        {h.proof && (
          <S.Proof>
            <b>{h.proof.what}</b>
            <figcaption>{h.proof.who} · {RESULTS.proofSuffix}</figcaption>
          </S.Proof>
        )}
        <S.Feat>
          <span className="label">{RESULTS.featLabel}</span>
          <div className="tags">{h.features.map((f) => <span key={f}>{f}</span>)}</div>
          <span className="note">{h.featNote}</span>
        </S.Feat>
      </S.HelpMain>
    </S.Help>
  );
}

export default function Results({ answers, task, onRestart, onCta }) {
  const t = totalScore(answers);
  const band = bandFor(t);
  const scores = areaScores(answers);
  const order = priorityOrder(scores);
  const strong = strongAreas(scores);
  const top = order.slice(0, 2).map((i) => AREAS[i].name.toLowerCase());
  const topFeatures = [...new Set(order.slice(0, 2).flatMap((i) => AREAS[i].help.features))].slice(0, 4);

  const [go, setGo] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setGo(true)));
    return () => cancelAnimationFrame(id);
  }, []);
  const shown = useCountUp(t, go);
  const markerLeft = `${Math.min(98.5, Math.max(1.5, (t / MAX_SCORE) * 100))}%`;
  const taskText = (task || '').trim();

  return (
    <S.Screen>
      <S.Res>
        <S.ScoreHero>
          <S.Ring role="img" aria-label={`Ukupni rezultat ${t} od ${MAX_SCORE}`}>
            <svg viewBox="0 0 220 220">
              <circle className="trk" cx="110" cy="110" r={R} fill="none" strokeWidth="14" />
              <circle
                className="val"
                cx="110" cy="110" r={R} fill="none" strokeWidth="14" strokeLinecap="round"
                strokeDasharray={CIRC}
                strokeDashoffset={go ? CIRC * (1 - t / MAX_SCORE) : CIRC}
              />
            </svg>
            <S.RingNum>
              <b>{shown}</b>
              <span>od {MAX_SCORE} boda</span>
            </S.RingNum>
          </S.Ring>
          <S.BandCopy>
            <S.BandBadge $tone={band.tone}>{band.min}–{band.max} bodova</S.BandBadge>
            <h1>{band.label}</h1>
            <p>{band.text}</p>
            <S.Scale aria-hidden="true">
              <S.ScaleTrack>
                {BANDS.map((b) => <span key={b.tone} className={b === band ? 'on' : ''} />)}
                <S.ScaleMarker style={{ left: go ? markerLeft : '0%' }} />
              </S.ScaleTrack>
              <S.ScaleLabels>
                {BANDS.map((b) => <span key={b.tone}>{b.min}–{b.max}</span>)}
              </S.ScaleLabels>
            </S.Scale>
          </S.BandCopy>
        </S.ScoreHero>

        <div>
          <S.SecHead>
            <S.Eyebrow>{RESULTS.areasEyebrow}</S.Eyebrow>
            <h2>{RESULTS.areasTitle}</h2>
          </S.SecHead>
          <S.Areas>
            {AREAS.map((a, i) => {
              const weak = order[0] === i;
              return (
                <S.ARow key={a.id}>
                  <span className="name">
                    <span className="n">{i + 1}.</span>
                    {a.name}
                    {weak && <S.Flag>Prvi fokus</S.Flag>}
                  </span>
                  <span className="score">{scores[i]}<small> / {MAX_AREA_SCORE}</small></span>
                  <S.ABar $weak={weak}>
                    {[0, 1, 2, 3].map((k) => <span key={k} className={k < scores[i] ? 'on' : ''} />)}
                  </S.ABar>
                </S.ARow>
              );
            })}
          </S.Areas>
        </div>

        <div>
          <S.SecHead>
            <S.Eyebrow>{RESULTS.helpEyebrow}</S.Eyebrow>
            <h2>{order.length ? RESULTS.helpTitle : RESULTS.allGoodTitle}</h2>
            <p>{order.length ? RESULTS.helpLede : RESULTS.allGoodLede}</p>
          </S.SecHead>
          <S.Helps>
            {order.length
              ? order.map((ai, rank) => <HelpCard key={ai} areaIndex={ai} rank={rank} score={scores[ai]} />)
              : <HelpCard areaIndex={4} rank={0} score={scores[4]} />}
          </S.Helps>
          {strong.length > 0 && order.length > 0 && (
            <S.Strong>
              <span className="label">{RESULTS.strongLabel}</span>
              <div className="tags">{strong.map((i) => <span key={i}>{AREAS[i].name}</span>)}</div>
            </S.Strong>
          )}
        </div>

        <S.Final>
          <div>
            <span className="eyebrow">{RESULTS.ctaEyebrow}</span>
            <h2>{RESULTS.ctaTitle}</h2>
            <p>
              {order.length ? `${RESULTS.ctaTop}${top.join(' i ')}.` : RESULTS.ctaAllGood}
              {taskText && ` ${RESULTS.ctaTask}„${taskText}”.`}
            </p>
            {topFeatures.length > 0 && (
              <div className="tags">{topFeatures.map((f) => <span key={f}>{f}</span>)}</div>
            )}
          </div>
          <S.BtnWhite href={DEMO_URL} target="_blank" rel="noopener" onClick={onCta}>
            {CTA_LABEL}
            <ArrowRight />
          </S.BtnWhite>
        </S.Final>

        <S.Restart>
          <S.BtnGhost type="button" onClick={onRestart}>{RESULTS.restart}</S.BtnGhost>
        </S.Restart>

        <S.EndLogo>
          <a href={RENTLIO_URL} target="_blank" rel="noopener noreferrer" aria-label="Rentlio ONE">
            <RentlioOneLogo />
          </a>
          <p>{RESULTS.endline}</p>
        </S.EndLogo>
      </S.Res>
    </S.Screen>
  );
}
