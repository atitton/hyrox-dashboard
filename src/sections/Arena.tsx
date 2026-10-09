import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Trophy } from 'lucide-react';
import { BgVideo, ChapterHead, Reveal } from '../components/ui';
import { arena, dealBreakers, expansion, nextSteps, planB, risks, sources, verdict } from '../data/content';

type Vote = 'pro' | 'con' | undefined;

export function Arena() {
  const [round, setRound] = useState(0);
  const [votes, setVotes] = useState<Vote[]>(Array(arena.length).fill(undefined));
  const [showJudge, setShowJudge] = useState(false);
  const r = arena[round];
  const vote = (v: 'pro' | 'con') => { const n = [...votes]; n[round] = n[round] === v ? undefined : v; setVotes(n); };
  const yours = { pro: votes.filter((v) => v === 'pro').length, con: votes.filter((v) => v === 'con').length };
  const judged = { pro: arena.filter((a) => a.judge === 'pro').length, con: arena.filter((a) => a.judge === 'con').length };
  const done = votes.every(Boolean);

  return (
    <section className="chapter" id="riscos">
      <div className="wrap">
        <ChapterHead
          n={8}
          kicker="Arena, riscos e expansão"
          title={<>Dez agentes.<br />Cinco a favor, cinco contra.<br /><span className="accent">Você decide cada round.</span></>}
          lead="Para testar a ideia, cinco agentes defenderam o box e cinco tentaram derrubá-lo, em cinco rounds. Leia os dois lados, clique em quem convenceu você e depois compare com o veredito da Arena."
        />
        <Reveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div className="chip-row" style={{ justifyContent: 'space-between' }}>
              <div className="rounds" role="tablist">
                {arena.map((a, i) => (
                  <button key={a.title} role="tab" aria-selected={i === round} className={i === round ? 'on' : ''} onClick={() => { setRound(i); setShowJudge(false); }}>
                    <span className={`dot ${votes[i] ?? ''}`} /> R{i + 1} · {a.title}
                  </button>
                ))}
              </div>
              <div className="scoreboard">
                <span className="small muted">Seu placar</span>
                <span className="score" style={{ color: '#5fd3a0' }}>{yours.pro}</span>
                <span className="muted">×</span>
                <span className="score" style={{ color: '#ff8a80' }}>{yours.con}</span>
              </div>
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={round} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <h3 style={{ textTransform: 'uppercase', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}><span className="accent">Round {round + 1}</span> · {r.title}</h3>
                <div className="arena-stage">
                  <button className={`fighter pro ${votes[round] === 'pro' ? 'picked' : ''}`} onClick={() => vote('pro')} aria-pressed={votes[round] === 'pro'}>
                    <span className="who">A favor · {r.pro.who}</span>
                    <p>"{r.pro.text}"</p>
                    <span className="small muted">{votes[round] === 'pro' ? '✓ Este me convenceu' : 'Clique se este lado convenceu você'}</span>
                  </button>
                  <div className="vs">VS</div>
                  <button className={`fighter con ${votes[round] === 'con' ? 'picked' : ''}`} onClick={() => vote('con')} aria-pressed={votes[round] === 'con'}>
                    <span className="who">Contra · {r.con.who}</span>
                    <p>"{r.con.text}"</p>
                    <span className="small muted">{votes[round] === 'con' ? '✓ Este me convenceu' : 'Clique se este lado convenceu você'}</span>
                  </button>
                </div>
                <div className="chip-row" style={{ justifyContent: 'space-between' }}>
                  <button className="btn ghost sm" onClick={() => setShowJudge((v) => !v)}>{showJudge ? 'Esconder' : 'Ver'} a decisão da Arena neste round</button>
                  <div className="chip-row">
                    <button className="btn ghost sm" disabled={round === 0} onClick={() => { setRound(round - 1); setShowJudge(false); }} aria-label="Round anterior"><ChevronLeft size={16} /></button>
                    <button className="btn sm" disabled={round === arena.length - 1} onClick={() => { setRound(round + 1); setShowJudge(false); }}>Próximo round <ChevronRight size={16} /></button>
                  </div>
                </div>
                {showJudge && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="verdict-line" style={{ borderColor: r.judge === 'pro' ? '#2f9e6e' : r.judge === 'con' ? '#d64545' : '#d9962b' }}>
                    <b>{r.judge === 'pro' ? 'Ponto para o lado a favor.' : r.judge === 'con' ? 'Ponto para o lado contra.' : 'Empate.'}</b> {r.why}
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>

        <Reveal>
          <div className="panel duo">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <span className="label" style={{ color: 'var(--orange-2)' }}><Trophy size={14} style={{ display: 'inline', verticalAlign: '-2px' }} /> Veredito da Arena · {verdict.score}</span>
              <h3 style={{ textTransform: 'uppercase', fontSize: 'clamp(1.6rem, 3vw, 2.3rem)' }}>{verdict.headline}</h3>
              <p className="muted small">Placar da Arena: {judged.pro} a favor, {judged.con} contra. {done ? `O seu: ${yours.pro} × ${yours.con}${yours.pro > yours.con ? ', você também aprovaria a ideia.' : yours.pro < yours.con ? ', você seria mais cauteloso que a Arena.' : ', empate técnico.'}` : 'Vote nos 5 rounds para comparar com o seu placar.'}</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {verdict.conditions.map((c, i) => (
                <div key={c.t} style={{ display: 'grid', gridTemplateColumns: '40px minmax(0,1fr)', gap: 12, padding: '14px 0', borderTop: '1px solid var(--graphite-3)' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--orange-2)' }}>{i + 1}</span>
                  <div><b>{c.t}</b><p className="small muted">{c.d}</p></div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const level = { baixa: 1, baixo: 1, média: 2, médio: 2, alta: 3, alto: 3 } as Record<string, number>;

export function Risks() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="chapter light">
      <div className="wrap">
        <Reveal>
          <div className="sub-head">
            <div className="label">Riscos</div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>O que pode dar errado <span className="accent">e o que fazer</span></h2>
          </div>
        </Reveal>
        <div className="split risk-split">
          <Reveal>
            <div className="panel">
              <span className="label">Probabilidade × impacto · clique num risco</span>
              <svg viewBox="0 0 340 300" style={{ width: '100%', marginTop: 12 }} role="img" aria-label="Matriz de risco">
                {[1, 2, 3].map((x) => [1, 2, 3].map((y) => {
                  const sev = x + y;
                  return <rect key={`${x}${y}`} x={40 + (x - 1) * 100} y={10 + (3 - y) * 85} width="98" height="83" rx="6" fill={sev >= 5 ? '#f6c9b3' : sev >= 4 ? '#f3dccd' : '#ece8de'} />;
                }))}
                <text x="190" y="290" textAnchor="middle" fontSize="11" fill="#757a84" fontFamily="IBM Plex Mono">PROBABILIDADE →</text>
                <text x="14" y="140" textAnchor="middle" fontSize="11" fill="#757a84" fontFamily="IBM Plex Mono" transform="rotate(-90 14 140)">IMPACTO →</text>
                {risks.map((r, i) => {
                  const x = level[r.p], y = level[r.i];
                  const same = risks.slice(0, i).filter((q) => level[q.p] === x && level[q.i] === y).length;
                  const cx = 60 + (x - 1) * 100 + (same % 3) * 28, cy = 40 + (3 - y) * 85 + Math.floor(same / 3) * 30;
                  return (
                    <g key={r.t} onClick={() => setOpen(i)} style={{ cursor: 'pointer' }}>
                      <circle cx={cx} cy={cy} r={open === i ? 14 : 11} fill={open === i ? '#1c1f25' : '#e8591a'} />
                      <text x={cx} y={cy + 4} textAnchor="middle" fontSize="11" fill="#fff" fontFamily="IBM Plex Mono">{i + 1}</text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </Reveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {risks.map((r, i) => (
              <button key={r.t} className="risk" onClick={() => setOpen(open === i ? null : i)} style={{ textAlign: 'left', cursor: 'pointer', borderColor: open === i ? 'var(--orange)' : undefined }} aria-expanded={open === i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                  <b><span className="mono accent">{i + 1}</span> {r.t}</b>
                  <span className="risk-tags"><span className="chip">prob. {r.p}</span><span className={`chip ${r.i === 'alto' ? 'hot' : ''}`}>impacto {r.i}</span></span>
                </div>
                {open === i && <p className="small" style={{ color: 'var(--on-light-2)' }}>{r.m}</p>}
              </button>
            ))}
          </div>
        </div>
        <Reveal>
          <div className="panel ink duo">
            <div>
              <span className="label" style={{ color: 'var(--orange-2)' }}>Plano B</span>
              <h3 style={{ textTransform: 'uppercase', fontSize: 'clamp(1.5rem, 2.6vw, 2rem)' }}>E se o hype acabar?</h3>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {planB.map((p) => <li key={p} className="check"><span className="accent">→</span><span>{p}</span></li>)}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Expansion() {
  return (
    <section className="chapter mid">
      <div className="wrap">
        <Reveal>
          <div className="chapter-head">
            <div>
              <div className="label">Expansão</div>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>Quando lotar, cresce <span className="accent">para dentro</span> e depois <span className="accent">para fora</span></h2>
            </div>
            <p className="lead">Os 220 m² têm teto. Quando as turmas enchem, o próximo passo é aumentar o que cada aluno gasta no box. Depois, repetir o modelo em outro bairro.</p>
          </div>
        </Reveal>
        <div className="grid g3">
          {expansion.vertical.map((e, i) => (
            <Reveal key={e.t} delay={(i % 3) * 0.06}>
              <div className="panel" style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 8 }}>
                <h4 style={{ textTransform: 'uppercase' }}>{e.t}</h4>
                <p className="small muted" style={{ flex: 1 }}>{e.d}</p>
                <span className="chip hot" style={{ alignSelf: 'flex-start', whiteSpace: 'normal' }}>{e.v}</span>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="band" style={{ minHeight: 260 }}>
            <BgVideo name="cena-corrida" />
            <div className="band-text">
              <span className="label" style={{ color: 'var(--orange-2)' }}>Rox Run Club</span>
              <h3 style={{ textTransform: 'uppercase', fontSize: 'clamp(1.5rem, 3vw, 2.3rem)' }}>Sábado de manhã, saindo do box, aberto ao bairro</h3>
              <p className="small" style={{ color: 'var(--on-dark-2)' }}>Corrida gratuita que chama atenção na rua e converte corredores em alunos de força. Custo zero, marketing diário.</p>
            </div>
          </div>
        </Reveal>
        <Reveal>
          <div className="roadmap">
            {expansion.horizontal.map((h) => (
              <div className="road" key={h.year}>
                <span className="label" style={{ color: 'var(--orange-2)' }}>{h.year}</span>
                <h4 style={{ textTransform: 'uppercase' }}>{h.t}</h4>
                <p className="small muted">{h.d}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Finish() {
  return (
    <>
      <section className="chapter light" id="passos">
        <div className="wrap">
          <Reveal>
            <div className="chapter-head">
              <div>
                <div className="eyebrow"><span className="bib">FINISH</span>Próximos passos</div>
                <h2>Antes de assinar o aluguel</h2>
              </div>
              <p className="lead">Os seis passos custam pouco ou nada e respondem às maiores dúvidas em duas a três semanas. Só depois vale gastar com arquiteto, projeto de incêndio e sinal.</p>
            </div>
          </Reveal>
          <div className="split">
            <Reveal><ol className="steps">{nextSteps.map((s) => <li key={s}><span>{s}</span></li>)}</ol></Reveal>
            <Reveal delay={0.1}>
              <div className="panel ink">
                <span className="label" style={{ color: '#ff8a80' }}>Não assina se</span>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, marginTop: 12 }}>
                  {dealBreakers.map((d) => <li key={d} className="check"><span style={{ color: '#ff8a80', fontWeight: 700 }}>✕</span><span>{d}</span></li>)}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      <footer className="foot">
        <div className="wrap">
          <span className="label">Fontes e premissas</span>
          <div className="grid g3" style={{ gap: '8px 24px' }}>
            {sources.map((s) => <div key={s.t} className="small"><b>{s.t}:</b> <span className="muted">{s.s}</span></div>)}
          </div>
          <p className="tiny" style={{ color: 'var(--on-dark-3)' }}>Estimativas próprias, a confirmar com orçamento: obra, valor por aula, ritmo de entrada de alunos, cancelamentos, receitas extras e capital de giro. Preços de equipamento e câmbio mudam rápido; refazer a conta com o aluguel e o orçamento fechados. Fotos de estações geradas por IA para ilustração. Estudo de outubro de 2026.</p>
        </div>
      </footer>
    </>
  );
}
