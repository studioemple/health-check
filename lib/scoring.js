import { AREAS, QUESTIONS, BANDS } from '../data/healthCheck';

export const QUESTION_COUNT = QUESTIONS.length; // 12
export const MAX_SCORE = QUESTION_COUNT * 2; // 24
export const MAX_AREA_SCORE = 4;

export const emptyAnswers = () => Array(QUESTION_COUNT).fill(null);

export const answeredCount = (answers) => answers.filter((a) => a !== null).length;

export const firstOpenIndex = (answers) => {
  const i = answers.findIndex((a) => a === null);
  return i === -1 ? QUESTION_COUNT : i;
};

export const totalScore = (answers) => answers.reduce((s, a) => s + (a || 0), 0);

export const areaScores = (answers) =>
  AREAS.map((_, ai) =>
    QUESTIONS.reduce((s, q, qi) => s + (q.area === ai && answers[qi] !== null ? answers[qi] : 0), 0)
  );

export const bandFor = (score) => BANDS.find((b) => score >= b.min && score <= b.max);

/** Indeksi područja ispod maksimuma, od najslabijeg prema jačem (kod izjednačenja redoslijed iz upitnika). */
export const priorityOrder = (scores) =>
  scores
    .map((s, i) => ({ s, i }))
    .filter((o) => o.s < MAX_AREA_SCORE)
    .sort((a, b) => a.s - b.s || a.i - b.i)
    .map((o) => o.i);

export const strongAreas = (scores) =>
  scores.map((s, i) => (s === MAX_AREA_SCORE ? i : -1)).filter((i) => i >= 0);
