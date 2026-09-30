import { AREAS, QUESTIONS, SECONDS_PER_QUESTION, RENTLIO_URL } from '../../data/healthCheck';
import { QUESTION_COUNT, answeredCount, firstOpenIndex, totalScore, MAX_SCORE } from '../../lib/scoring';
import RentlioOneLogo from './RentlioOneLogo';
import { Clock } from './icons';
import * as S from './styles';

export default function TopBar({ step, answers, stepReflect, showLogo, onJump }) {
  const qIdx = step >= 1 && step <= QUESTION_COUNT ? step - 1 : -1;
  const left = QUESTION_COUNT - answeredCount(answers);
  const mins = Math.max(1, Math.ceil((left * SECONDS_PER_QUESTION) / 60));
  const open = firstOpenIndex(answers);

  let status;
  if (step === 0) {
    status = <S.PillTime><Clock />oko 3 min</S.PillTime>;
  } else if (qIdx >= 0) {
    status = (
      <>
        <S.HideMobile>Pitanje <b>{qIdx + 1}</b> / {QUESTION_COUNT}</S.HideMobile>
        <S.PillTime><Clock />{left === 0 ? 'gotovo' : `još ~${mins} min`}</S.PillTime>
      </>
    );
  } else if (step === stepReflect) {
    status = (
      <>
        <S.HideMobile>Završni korak</S.HideMobile>
        <S.PillTime><Clock />još ~1 min</S.PillTime>
      </>
    );
  } else {
    status = (
      <>
        <S.HideMobile>Rezultat</S.HideMobile>
        <S.PillTime>{totalScore(answers)} / {MAX_SCORE} boda</S.PillTime>
      </>
    );
  }

  return (
    <S.Top>
      <S.TopInner>
        <S.Bar>
          {showLogo ? (
            <S.LogoLink href={RENTLIO_URL} target="_blank" rel="noopener noreferrer" aria-label="Rentlio ONE">
              <RentlioOneLogo />
            </S.LogoLink>
          ) : (
            <S.BarTitle>Health Check</S.BarTitle>
          )}
          <S.Status aria-live="polite">{status}</S.Status>
        </S.Bar>
        <S.Timeline aria-label="Napredak po područjima">
          {AREAS.map((area, ai) => {
            const qs = QUESTIONS.map((q, i) => (q.area === ai ? i : -1)).filter((i) => i >= 0);
            const active = qIdx >= 0 && QUESTIONS[qIdx].area === ai;
            const complete = qs.every((i) => answers[i] !== null);
            const reachable = qs[0] <= open;
            const labelState = active ? 'active' : complete ? 'complete' : '';
            return (
              <S.Seg
                key={area.id}
                type="button"
                disabled={!reachable}
                title={area.name}
                aria-label={`${area.name}${complete ? ' – odgovoreno' : ''}`}
                onClick={() => onJump(qs[0] + 1)}
              >
                <S.Ticks>
                  {qs.map((i) => (
                    <S.Tick key={i} $state={i === qIdx ? 'now' : answers[i] !== null ? 'done' : ''} />
                  ))}
                </S.Ticks>
                <S.SegLabel $state={labelState}>{ai + 1}. {area.short}</S.SegLabel>
              </S.Seg>
            );
          })}
        </S.Timeline>
      </S.TopInner>
    </S.Top>
  );
}
