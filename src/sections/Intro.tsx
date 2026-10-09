import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDown, Gauge, Play, Pause } from 'lucide-react';
import { BgVideo, ChapterHead, CountUp, Reveal } from '../components/ui';
import { comparison, divisions, stations } from '../data/content';
import { capexOtherTotal, equipTotal, kbrl, scenarios, simulate, noStress } from '../data/model';

export function Hero() {
  const p = scenarios.conservador.params;
  const inv = equipTotal('conservador') + capexOtherTotal('conservador', false);
  const giro = capexOtherTotal('conservador') - capexOtherTotal('conservador', false);
  const sim = simulate(p, inv, giro, noStress);
  return (
    <header className="hero" id="topo">
      <div className="hero-bg"><BgVideo name="cena-treno" /></div>
      <div className="hero-shade" />
      <div className="hero-inner">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="eyebrow"><span className="bib">START</span>Estudo de viabilidade · outubro de 2026</div>
          <h1>Um box de <em>HYROX</em> no Jardim Itu</h1>
        </motion.div>
        <motion.p className="lead" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
          A modalidade fitness que mais cresce no mundo ainda não tem prova no Sul e, em Porto Alegre, quase nenhum espaço dedicado.
          Este estudo mostra o esporte, o ponto na Rua Gomes de Freitas, o equipamento, quanto custa e o que acontece com o dinheiro em cada cenário.
        </motion.p>
        <motion.div className="hero-kpis" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }}>
          <div className="stat"><span className="v"><CountUp value={inv / 1000} format={(v) => `R$ ${Math.round(v)} mil`} /></span><span className="l">para abrir a porta no cenário conservador, + {kbrl(giro)} de fôlego</span></div>
          <div className="stat"><span className="v"><CountUp value={sim.breakEven} format={(v) => `${Math.round(v)}`} /></span><span className="l">alunos pagam a operação (0,3% do bairro)</span></div>
          <div className="stat"><span className="v">R$ {p.ticket}</span><span className="l">de mensalidade, abaixo dos boxes da região</span></div>
          <div className="stat"><span className="v">220 m²</span><span className="l">de térreo + 80 m² de mezanino, 18 anos como academia</span></div>
        </motion.div>
        <div className="hero-actions">
          <a className="btn" href="#esporte">Começar a apresentação <ArrowDown size={18} /></a>
          <a className="btn ghost" href="#simulador"><Gauge size={18} /> Ir direto ao simulador</a>
        </div>
      </div>
    </header>
  );
}

export function Sport() {
  const [sel, setSel] = useState(0);
  const [playing, setPlaying] = useState(false);
  const s = stations[sel];

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setSel((i) => (i + 1) % stations.length), 4200);
    return () => clearInterval(t);
  }, [playing]);

  return (
    <section className="chapter light" id="esporte">
      <div className="wrap">
        <ChapterHead
          n={1}
          kicker="O esporte"
          title={<>8 km de corrida.<br />8 estações.<br /><span className="accent">Uma prova igual no mundo todo.</span></>}
          lead={<>HYROX é uma corrida de condicionamento. O atleta corre 1 km, entra numa área coberta, faz um exercício funcional, sai e corre mais 1 km. Repete isso 8 vezes. Criado em 2017 em Hamburgo, na Alemanha, tem o mesmo percurso, os mesmos pesos e o mesmo equipamento em Nova York, Berlim ou São Paulo, então o tempo de cada um vira uma meta que dá para comparar e melhorar.</>}
        />

        <Reveal>
          <div className="race">
            <div className="chip-row" style={{ justifyContent: 'space-between' }}>
              <span className="label">Clique numa estação para ver como funciona</span>
              <button className="btn ghost sm" onClick={() => setPlaying((v) => !v)}>
                {playing ? <><Pause size={14} /> Pausar</> : <><Play size={14} /> Percorrer a prova</>}
              </button>
            </div>
            <div className="race-strip" role="tablist" aria-label="Estações da prova">
              {stations.map((st, i) => (
                <FragmentPair key={st.n}>
                  <div className={`race-run ${i <= sel ? 'past' : ''}`} title={`Corrida ${i + 1}: 1 km`} />
                  <button role="tab" aria-selected={i === sel} className={`race-st ${i === sel ? 'on' : ''}`} onClick={() => { setSel(i); setPlaying(false); }}>
                    <b>{st.n}</b><span>{st.name}</span>
                  </button>
                </FragmentPair>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={s.n} className="race-detail" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }}>
                <div className="race-media">
                  {s.video ? <BgVideo name={s.video} /> : <img src={`media/${s.img}.webp`} alt={`${s.name}: ${s.pt}`} />}
                  <span className="chip hot tag" style={{ background: 'var(--graphite)' }}>Corrida {s.n} · 1 km → Estação {s.n}</span>
                </div>
                <div className="race-body">
                  <div>
                    <div className="label" style={{ color: 'var(--orange-2)' }}>Estação {s.n} de 8 · {s.distance}</div>
                    <h3 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', textTransform: 'uppercase' }}>{s.name}</h3>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--on-dark-2)' }}>({s.pt})</p>
                  </div>
                  <p>{s.how}</p>
                  <p className="muted small"><b style={{ color: 'var(--on-dark)' }}>Trabalha:</b> {s.works}</p>
                  <div className="kv">
                    <div><span className="label">Open homens</span><b>{s.openM}</b></div>
                    <div><span className="label">Open mulheres</span><b>{s.openW}</b></div>
                    <div><span className="label">Pro</span><b>{s.pro}</b></div>
                  </div>
                  <p className="small muted">No box: <b style={{ color: 'var(--on-dark)' }}>{s.equipment}</b></p>
                </div>
              </motion.div>
            </AnimatePresence>
            <p className="tiny" style={{ color: 'var(--on-light-3)' }}>Pesos de trenó incluem o próprio trenó. Entre a corrida e a estação existe a "Roxzone", a área de transição, onde o cronômetro continua rodando. Fotos ilustrativas geradas por IA; o vídeo do trenó é a cena do projeto.</p>
          </div>
        </Reveal>

        <div className="split">
          <Reveal>
            <div className="sub-head">
              <div className="label">Para quem é</div>
              <h3 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', textTransform: 'uppercase' }}>Iniciante consegue fazer. Atleta consegue se destruir.</h3>
              <p className="muted">Não tem levantamento olímpico nem ginástica. Correr, empurrar, puxar, carregar e agachar são movimentos que qualquer pessoa entende no primeiro dia. O que muda de um iniciante para um atleta é o peso, a velocidade e a divisão. Uma prova Open leva de 1h a 1h30 para a maioria; os melhores do mundo fecham abaixo de 1 hora.</p>
              <p className="muted">É isso que faz o HYROX juntar o público da corrida de rua e o da academia, que antes tinha medo do CrossFit.</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid g2">
              {divisions.map((d) => (
                <div className="panel" key={d.name}>
                  <h4 style={{ textTransform: 'uppercase' }}>{d.name}</h4>
                  <p className="muted small">{d.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="sub-head" style={{ marginBottom: 16 }}>
            <div className="label">Comparação</div>
            <h3 style={{ textTransform: 'uppercase' }}>Onde o HYROX se encaixa</h3>
          </div>
          <div className="scroll-x panel" style={{ padding: 0 }}>
            <table className="t" style={{ minWidth: 640 }}>
              <thead><tr><th></th>{comparison.cols.map((c, i) => <th key={c} style={i === 0 ? { color: 'var(--orange-ink)' } : undefined}>{c}</th>)}</tr></thead>
              <tbody>
                {comparison.rows.map((r) => (
                  <tr key={r.label}>
                    <td style={{ fontWeight: 600 }}>{r.label}</td>
                    {r.vals.map((v, i) => <td key={i} style={i === 0 ? { fontWeight: 600 } : { color: 'var(--on-light-2)' }}>{v}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FragmentPair({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
