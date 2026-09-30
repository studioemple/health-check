import { useCallback, useEffect, useRef, useState } from 'react';
import { AREAS, QUESTIONS } from '../../data/healthCheck';
import {
  QUESTION_COUNT, emptyAnswers, answeredCount, firstOpenIndex,
  totalScore, areaScores, bandFor, priorityOrder,
} from '../../lib/scoring';
import { track, EVENTS } from '../../lib/analytics';
import { loadProgress, saveProgress } from '../../lib/storage';
import TopBar from './TopBar';
import Intro from './Intro';
import Question from './Question';
import Reflection from './Reflection';
import Results from './Results';
import * as S from './styles';

// Koraci: 0 = uvod, 1…12 = pitanja, 13 = završni korak, 14 = rezultat
const STEP_REFLECT = QUESTION_COUNT + 1;
const STEP_RESULT = QUESTION_COUNT + 2;

// Trajanje animacije nakon odgovora (ms)
const PICK_MS = 560;
const EXIT_MS = 400;

const PARTICLE_COLORS = ['#009fe3', '#009fe3', '#a9cf3a', '#0e3151', '#66d1ff'];

const initialState = () => ({ step: 0, answers: emptyAnswers(), task: '' });

function makeParticles(x, y) {
  const n = 14;
  return {
    x,
    y,
    dots: Array.from({ length: n }, (_, k) => {
      const ang = (k / n) * Math.PI * 2 + Math.random() * 0.4;
      const dist = 34 + Math.random() * 38;
      return {
        dx: +(Math.cos(ang) * dist).toFixed(1),
        dy: +(Math.sin(ang) * dist).toFixed(1),
        s: +(4 + Math.random() * 6).toFixed(1),
        c: PARTICLE_COLORS[k % PARTICLE_COLORS.length],
      };
    }),
  };
}

/**
 * Rentlio ONE Health Check.
 * @param {boolean} standalone  true = prikazuje Rentlio ONE logo u gornjoj traci (samostalna stranica).
 *                              Na rentl.io postaviti false jer web već ima svoj header.
 */
export default function HealthCheck({ standalone = true }) {
  const [state, setState] = useState(initialState);
  const [back, setBack] = useState(false);
  const [phase, setPhase] = useState('idle'); // idle | picked | exit
  const [picked, setPicked] = useState(null);
  const [particles, setParticles] = useState(null);
  const [ready, setReady] = useState(false);

  const rootRef = useRef(null);
  const optsRef = useRef(null);
  const timers = useRef([]);
  const completedRef = useRef(false);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  // Vrati spremljeni napredak (samo na klijentu, nakon hidratacije)
  useEffect(() => {
    const saved = loadProgress();
    if (saved && Array.isArray(saved.answers) && saved.answers.length === QUESTION_COUNT) {
      setState({ step: 0, answers: saved.answers, task: saved.task || '' });
    }
    setReady(true);
    return clearTimers;
  }, []);

  useEffect(() => {
    if (ready) saveProgress(state);
  }, [state, ready]);

  const scrollTop = () => {
    const el = rootRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const offset = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
    if (window.scrollY > top - offset) {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: Math.max(0, top - offset), behavior: reduce ? 'auto' : 'smooth' });
    }
  };

  const go = useCallback((step) => {
    clearTimers();
    setPhase('idle');
    setPicked(null);
    setParticles(null);
    setState((s) => {
      setBack(step < s.step);
      return { ...s, step };
    });
    scrollTop();
  }, []);

  // Event za završetak (jednom po prolasku)
  useEffect(() => {
    if (state.step !== STEP_RESULT) {
      completedRef.current = false;
      return;
    }
    if (completedRef.current) return;
    completedRef.current = true;
    const scores = areaScores(state.answers);
    const order = priorityOrder(scores);
    track(EVENTS.complete, {
      hc_score: totalScore(state.answers),
      hc_band: bandFor(totalScore(state.answers)).tone,
      hc_weakest_area: order.length ? AREAS[order[0]].id : 'none',
      hc_area_scores: AREAS.reduce((o, a, i) => ({ ...o, [a.id]: scores[i] }), {}),
      hc_task_filled: Boolean(state.task.trim()),
    });
  }, [state.step, state.answers, state.task]);

  const answer = useCallback(
    (qi, value) => {
      if (phase !== 'idle') return;
      setState((s) => {
        const answers = [...s.answers];
        answers[qi] = value;
        return { ...s, answers };
      });
      track(EVENTS.answer, {
        hc_question: qi + 1,
        hc_area: AREAS[QUESTIONS[qi].area].id,
        hc_value: value,
      });

      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setPicked(value);
      setPhase('picked');

      const btn = optsRef.current && optsRef.current.querySelector(`[data-value="${value}"]`);
      const radio = btn && btn.firstElementChild;
      if (btn && radio && !reduce) {
        const r = radio.getBoundingClientRect();
        const o = btn.getBoundingClientRect();
        setParticles(makeParticles(r.left - o.left + r.width / 2, r.top - o.top + r.height / 2));
      }

      clearTimers();
      if (reduce) {
        timers.current.push(setTimeout(() => go(qi + 2), 250));
        return;
      }
      timers.current.push(
        setTimeout(() => {
          setPhase('exit');
          timers.current.push(setTimeout(() => go(qi + 2), EXIT_MS));
        }, PICK_MS)
      );
    },
    [phase, go]
  );

  // Tipkovnica: 1/2/3 odgovor, ← natrag, → dalje (ako je odgovoreno)
  useEffect(() => {
    const onKey = (e) => {
      if (e.target.closest && e.target.closest('textarea, input, select')) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const s = state.step;
      if (s < 1 || s > QUESTION_COUNT) return;
      const map = { 1: 2, 2: 1, 3: 0 };
      if (map[e.key] !== undefined) {
        e.preventDefault();
        answer(s - 1, map[e.key]);
      } else if (e.key === 'ArrowLeft' && phase === 'idle') {
        go(s - 1);
      } else if (e.key === 'ArrowRight' && phase === 'idle' && state.answers[s - 1] !== null) {
        go(s + 1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [state.step, state.answers, phase, answer, go]);

  const count = answeredCount(state.answers);
  const introMode = count === QUESTION_COUNT ? 'done' : count > 0 ? 'resume' : 'new';

  const start = () => {
    if (introMode === 'new') track(EVENTS.start);
    go(introMode === 'done' ? STEP_RESULT : firstOpenIndex(state.answers) + 1);
  };
  const reset = () => {
    track(EVENTS.restart);
    track(EVENTS.start);
    setState({ ...initialState(), step: 0 });
    go(1);
  };

  const { step } = state;
  let screen;
  if (step === 0) {
    screen = <Intro mode={introMode} onStart={start} onReset={reset} />;
  } else if (step <= QUESTION_COUNT) {
    screen = (
      <Question
        key={`q-${step}`}
        ref={optsRef}
        index={step - 1}
        answer={state.answers[step - 1]}
        phase={phase}
        picked={picked}
        particles={particles}
        back={back}
        onAnswer={(v) => answer(step - 1, v)}
        onBack={() => go(step - 1)}
      />
    );
  } else if (step === STEP_REFLECT) {
    screen = (
      <Reflection
        value={state.task}
        back={back}
        onChange={(task) => setState((s) => ({ ...s, task }))}
        onBack={() => go(step - 1)}
        onNext={() => go(STEP_RESULT)}
      />
    );
  } else {
    screen = (
      <Results
        answers={state.answers}
        task={state.task}
        onRestart={reset}
        onCta={() => track(EVENTS.cta, { hc_score: totalScore(state.answers) })}
      />
    );
  }

  return (
    <S.Root ref={rootRef}>
      <TopBar
        step={step}
        answers={state.answers}
        stepReflect={STEP_REFLECT}
        showLogo={standalone}
        onJump={go}
      />
      <S.Container>{screen}</S.Container>
    </S.Root>
  );
}
