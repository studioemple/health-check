import { REFLECTION } from '../../data/healthCheck';
import { ArrowLeft, ArrowRight } from './icons';
import * as S from './styles';

export default function Reflection({ value, back, onChange, onBack, onNext }) {
  return (
    <S.Screen style={{ animation: 'none' }}>
      <S.Q>
        <S.QHead $back={back}>
          <S.Kicker>
            <S.AreaTag><i>✓</i>{REFLECTION.tag}</S.AreaTag>
            <S.QNum>Završni korak</S.QNum>
          </S.Kicker>
          <h2>{REFLECTION.title}</h2>
          <p>{REFLECTION.text}</p>
        </S.QHead>
        <S.Field $back={back}>
          <label htmlFor="hc-task">Moj zadatak</label>
          <textarea
            id="hc-task"
            value={value}
            placeholder={REFLECTION.placeholder}
            onChange={(e) => onChange(e.target.value)}
          />
        </S.Field>
        <S.Ideas $back={back} aria-label="Prijedlozi">
          {REFLECTION.ideas.map((idea) => (
            <button key={idea} type="button" onClick={() => onChange(idea)}>{idea}</button>
          ))}
        </S.Ideas>
        <S.Nav $back={back}>
          <S.BtnGhost type="button" onClick={onBack}>
            <ArrowLeft />
            Natrag
          </S.BtnGhost>
          <S.BtnPrimary type="button" onClick={onNext}>
            Pogledaj rezultat
            <ArrowRight />
          </S.BtnPrimary>
        </S.Nav>
      </S.Q>
    </S.Screen>
  );
}
