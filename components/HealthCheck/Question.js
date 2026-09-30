import { forwardRef } from 'react';
import { AREAS, QUESTIONS, OPTIONS } from '../../data/healthCheck';
import { QUESTION_COUNT } from '../../lib/scoring';
import { ArrowLeft, Bulb } from './icons';
import * as S from './styles';

/**
 * Jedno pitanje. Animacijski slijed (vodi ga roditelj):
 * phase 'idle' → klik → 'picked' (odabrani odgovor "pukne" + čestice, ostali izblijede)
 * → 'exit' (pitanje se zamuti i ode gore) → sljedeće pitanje ulazi odozdo, redom.
 */
const Question = forwardRef(function Question(
  { index, answer, phase, picked, particles, back, onAnswer, onBack },
  optsRef
) {
  const q = QUESTIONS[index];
  const area = AREAS[q.area];
  const areaQs = QUESTIONS.map((x, i) => (x.area === q.area ? i : -1)).filter((i) => i >= 0);
  const showTip = index === 0 || index === areaQs[areaQs.length - 1];
  const busy = phase !== 'idle';

  return (
    <S.Screen as="section" style={{ animation: 'none' }}>
      <S.Q $exit={phase === 'exit'}>
        <S.QHead $back={back}>
          <S.Kicker>
            <S.AreaTag>
              <i>{q.area + 1}</i>
              {area.name}
            </S.AreaTag>
            <S.QNum>Pitanje {index + 1} od {QUESTION_COUNT}</S.QNum>
          </S.Kicker>
          <h2 id={`hc-q-${index}`}>{q.text}</h2>
        </S.QHead>

        <S.Opts role="radiogroup" aria-labelledby={`hc-q-${index}`} ref={optsRef}>
          {OPTIONS.map((o, i) => {
            const checked = busy ? picked === o.value : answer === o.value;
            return (
              <S.Opt
                key={o.value}
                type="button"
                role="radio"
                aria-checked={checked}
                data-value={o.value}
                $i={i}
                $back={back}
                $chosen={busy && picked === o.value}
                $dim={busy && picked !== o.value}
                onClick={() => onAnswer(o.value)}
              >
                <S.Radio />
                <S.OptMain>
                  <span className="label">{o.label}</span>
                  <span className="desc">{o.desc}</span>
                </S.OptMain>
                <S.Kbd>{i + 1}</S.Kbd>
                {busy && picked === o.value && particles && (
                  <S.Puff style={{ left: particles.x, top: particles.y }} aria-hidden="true">
                    <b />
                    {particles.dots.map((d, k) => (
                      <i
                        key={k}
                        style={{ '--dx': `${d.dx}px`, '--dy': `${d.dy}px`, '--s': `${d.s}px`, '--c': d.c }}
                      />
                    ))}
                  </S.Puff>
                )}
              </S.Opt>
            );
          })}
        </S.Opts>

        {showTip && (
          <S.Insight $back={back}>
            <span className="ic"><Bulb /></span>
            <div>
              <h4>{area.tipTitle}</h4>
              <p>{area.tip}</p>
            </div>
          </S.Insight>
        )}

        <S.Nav $back={back}>
          <S.BtnGhost type="button" onClick={onBack}>
            <ArrowLeft />
            Natrag
          </S.BtnGhost>
          <S.Keys>Odaberite odgovor ili pritisnite 1 · 2 · 3</S.Keys>
        </S.Nav>
      </S.Q>
    </S.Screen>
  );
});

export default Question;
