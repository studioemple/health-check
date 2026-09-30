import { INTRO, AREAS, QUESTIONS, OPTIONS } from '../../data/healthCheck';
import { ArrowRight, Leaf, CHIP_ICONS } from './icons';
import * as S from './styles';

export default function Intro({ mode, onStart, onReset }) {
  const label = mode === 'done' ? 'Pogledaj rezultat' : mode === 'resume' ? 'Nastavi gdje ste stali' : 'Započni provjeru';
  const perArea = (ai) => QUESTIONS.filter((q) => q.area === ai).length;

  return (
    <S.Screen>
      <S.IntroGrid>
        <S.IntroCopy>
          <S.Eyebrow>{INTRO.eyebrow}</S.Eyebrow>
          <h1>
            {INTRO.titleStart} <em>{INTRO.titleAccent}</em>
          </h1>
          <S.Lede>{INTRO.lede}</S.Lede>
          <S.Chips>
            {INTRO.chips.map((chip, i) => {
              const Icon = CHIP_ICONS[i] || CHIP_ICONS[0];
              return (
                <S.Chip key={chip}>
                  <Icon />
                  {chip}
                </S.Chip>
              );
            })}
          </S.Chips>
          <S.Checks>
            {INTRO.checks.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </S.Checks>
          <S.CtaRow>
            <S.BtnPrimary type="button" onClick={onStart}>
              {label}
              <ArrowRight />
            </S.BtnPrimary>
            {mode === 'new' ? (
              <S.Hint>Rezultat se računa automatski.</S.Hint>
            ) : (
              <S.BtnGhost type="button" onClick={onReset}>Kreni ispočetka</S.BtnGhost>
            )}
          </S.CtaRow>
        </S.IntroCopy>

        <S.MapCard aria-label="Što provjeravamo">
          <S.MapHead>
            <h3>Što provjeravamo</h3>
            <span>{AREAS.length} područja</span>
          </S.MapHead>
          <S.MapList>
            {AREAS.map((a, i) => (
              <S.MapItem key={a.id} $i={i}>
                <S.MapNum>{i + 1}</S.MapNum>
                <S.MapName>
                  <b>{a.name}</b>
                  <small>{perArea(i)} pitanja</small>
                </S.MapName>
                <S.MiniTicks aria-hidden="true"><i /><i /></S.MiniTicks>
              </S.MapItem>
            ))}
          </S.MapList>
          <S.MapFoot>
            <Leaf />
            {INTRO.mapFoot}
          </S.MapFoot>
        </S.MapCard>
      </S.IntroGrid>

      <S.Howto>
        <div>
          <h3>{INTRO.howtoTitle}</h3>
          <p>{INTRO.howtoText}</p>
          <p>
            {INTRO.howtoNoteStart}
            <b>{INTRO.howtoNoteStrong}</b>
            {INTRO.howtoNoteEnd}
          </p>
        </div>
        <S.Legend aria-label="Bodovanje">
          {OPTIONS.map((o) => (
            <S.LegendRow key={o.value}>
              <span className="pts">{o.value}</span>
              <span className="lab">{o.label}</span>
              <span className="txt">{o.desc}</span>
            </S.LegendRow>
          ))}
        </S.Legend>
      </S.Howto>
    </S.Screen>
  );
}
