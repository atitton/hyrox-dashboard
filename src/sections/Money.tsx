import { useMemo } from 'react';
import { ExternalLink, Minus, Plus, RotateCcw, ShoppingCart, Store } from 'lucide-react';
import { ChapterHead, CountUp, Reveal } from '../components/ui';
import { team, licenses } from '../data/content';
import {
  brl, capexOther, equipment, kbrl, opexBreakdown, scenarios,
  type EquipCategory, type ScenarioId, type ScenarioParams,
} from '../data/model';

export type Qty = Record<string, number>;
export type Mode = ScenarioId | 'custom';

const cats: EquipCategory[] = ['Ergômetros', 'Corrida', 'Trenó', 'Carga', 'Estrutura', 'Piso', 'Ambiente'];
const step = (unit: string) => (unit === 'kg' ? 20 : unit === 'm²' ? 10 : 1);

export function Equipment({ mode, setMode, qty, setQty }: { mode: Mode; setMode: (m: Mode) => void; qty: Qty; setQty: (q: Qty) => void }) {
  const total = equipment.reduce((s, e) => s + e.price * (qty[e.id] ?? 0), 0);
  const byCat = useMemo(() => cats.map((c) => ({ c, items: equipment.filter((e) => e.category === c), sub: equipment.filter((e) => e.category === c).reduce((s, e) => s + e.price * (qty[e.id] ?? 0), 0) })), [qty]);
  const preset = (m: ScenarioId) => { setMode(m); setQty(Object.fromEntries(equipment.map((e) => [e.id, e.qty[m]]))); };
  const fill = (k: 'min' | 'ideal') => { setMode('custom'); setQty(Object.fromEntries(equipment.map((e) => [e.id, e[k]]))); };
  const change = (id: string, d: number) => { setMode('custom'); setQty({ ...qty, [id]: Math.max(0, (qty[id] ?? 0) + d) }); };
  const ergs = (qty['ski-brave'] ?? 0) + (qty['ski-c2'] ?? 0) + (qty['row-brave'] ?? 0) + (qty['row-c2'] ?? 0);

  return (
    <section className="chapter light" id="equipamentos" style={{ ['--track-bg' as string]: 'var(--paper-2)' }}>
      <div className="wrap">
        <ChapterHead
          n={5}
          kicker="Equipamentos"
          title={<>Tudo o que a prova exige.<br /><span className="accent">Monte o box item a item.</span></>}
          lead="Cada item mostra o mínimo para a aula funcionar e o ideal para turma cheia sem fila. Escolha um cenário pronto ou ajuste as quantidades: o total alimenta o simulador financeiro lá na frente. Preços de lista com pagamento em até 10×; à vista e em pacote, os fornecedores costumam dar 15 a 20% de desconto."
        />
        <Reveal>
          <div className="chip-row" style={{ justifyContent: 'space-between', gap: 16 }}>
            <div className="seg" role="group" aria-label="Cenário de equipamento">
              <button className={mode === 'conservador' ? 'on' : ''} onClick={() => preset('conservador')}>Conservador</button>
              <button className={mode === 'otimista' ? 'on' : ''} onClick={() => preset('otimista')}>Otimista</button>
              <button className={mode === 'custom' ? 'on' : ''} onClick={() => setMode('custom')}>Personalizado</button>
            </div>
            <div className="chip-row">
              <button className="btn ghost sm" onClick={() => fill('min')}>Tudo no mínimo</button>
              <button className="btn ghost sm" onClick={() => fill('ideal')}>Tudo no ideal</button>
              <button className="btn ghost sm" onClick={() => preset('conservador')} aria-label="Restaurar"><RotateCcw size={14} /></button>
            </div>
          </div>
        </Reveal>
        <div className="split eq-split">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28, minWidth: 0 }}>
            {byCat.map(({ c, items, sub }) => (
              <div className="eq-cat" key={c}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h4 style={{ textTransform: 'uppercase' }}>{c}</h4>
                  <span className="mono small num" style={{ color: 'var(--on-light-2)' }}>{brl(sub)}</span>
                </div>
                {items.map((e) => {
                  const q = qty[e.id] ?? 0;
                  return (
                    <div className={`eq-row ${q === 0 ? 'zero' : ''}`} key={e.id}>
                      {e.img ? <img className="eq-thumb" src={`media/${e.img}.webp`} alt="" loading="lazy" /> : <div className="eq-thumb"><ShoppingCart size={22} /></div>}
                      <div style={{ minWidth: 0 }}>
                        <b>{e.name}</b>
                        <div className="small" style={{ color: 'var(--on-light-2)' }}>{e.pt}</div>
                        <div className="eq-meta">
                          <span className="chip">{e.brand}</span>
                          {e.station && <span className="chip hot">{e.station}</span>}
                          <span className="minideal">mín {e.min} · ideal {e.ideal}{e.unit !== 'un' ? ` ${e.unit}` : ''}</span>
                          <a className="chip" href={e.search} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}><Store size={11} /> loja <ExternalLink size={10} /></a>
                          {e.ml && <a className="chip" href={e.ml} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>Mercado Livre <ExternalLink size={10} /></a>}
                        </div>
                        {(e.note || e.mlRef) && <div className="tiny" style={{ color: 'var(--on-light-3)', marginTop: 4 }}>{e.note}{e.note && e.mlRef ? ' · ' : ''}{e.mlRef && <>No Mercado Livre: {e.mlRef}</>}</div>}
                      </div>
                      <div className="stepper">
                        <button onClick={() => change(e.id, -step(e.unit))} aria-label={`Menos ${e.name}`}><Minus size={14} /></button>
                        <span>{q}</span>
                        <button onClick={() => change(e.id, step(e.unit))} aria-label={`Mais ${e.name}`}><Plus size={14} /></button>
                      </div>
                      <div className="eq-price">
                        <b>{brl(e.price * q)}</b>
                        <span className="tiny" style={{ color: 'var(--on-light-3)' }}>{brl(e.price)}/{e.unit}{e.estimate ? ' · estim.' : ''}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          <div className="sticky-total">
            <div className="panel ink">
              <div className="label">Total em equipamento</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.4rem, 4vw, 3.4rem)', lineHeight: 1.1 }} className="num"><CountUp value={total} format={(v) => brl(v)} /></div>
              <div className="muted small" style={{ marginTop: 8 }}>{ergs} ergômetros de prova · {qty['treadmill'] ?? 0} esteira(s) · {(qty['sled'] ?? 0) + (qty['sled-pro'] ?? 0)} trenós</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 16 }}>
                {byCat.filter((b) => b.sub > 0).map((b) => (
                  <div key={b.c} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 8, fontSize: '0.85rem' }}>
                    <span className="muted">{b.c}</span><span className="num">{kbrl(b.sub)}</span>
                    <div style={{ gridColumn: '1 / -1', height: 4, background: 'var(--graphite-3)', borderRadius: 4 }}><div style={{ width: `${(b.sub / total) * 100}%`, height: '100%', background: 'var(--orange)', borderRadius: 4, transition: 'width .4s' }} /></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="panel">
              <h4 style={{ textTransform: 'uppercase', marginBottom: 6 }}>Brave ou Concept2?</h4>
              <p className="small" style={{ color: 'var(--on-light-2)' }}>SkiErg: R$ 7.990 × R$ 12.990. Remo: R$ 7.899 × R$ 14.990. A prova oficial usa Concept2; ter 1 de cada deixa o aluno simular a prova, e o resto pode ser nacional. Concept2 usado revende por 70 a 80% do valor.</p>
            </div>
            <div className="panel">
              <h4 style={{ textTransform: 'uppercase', marginBottom: 6 }}>A rua no lugar da esteira</h4>
              <p className="small" style={{ color: 'var(--on-light-2)' }}>Cada esteira curva custa R$ 17.990. Para uma turma de 14 correr junta, seriam 4 a 6 esteiras, ou R$ 72 a 108 mil. A rua faz esse papel de graça; no otimista, uma esteira cobre os dias de chuva.</p>
            </div>
          </div>
        </div>
        <p className="tiny" style={{ color: 'var(--on-light-3)' }}>Fornecedores: Brave Fitness (Agudos/SP, fabricação nacional), Live360 (distribuidora Concept2 no Brasil) e anúncios do Mercado Livre como alternativa, inclusive usados. O botão "loja" abre a busca do produto no site do fornecedor. Preços vistos em 08 e 09/10/2026; o frete até Porto Alegre é à parte.</p>
      </div>
    </section>
  );
}

const colors = ['#e8591a', '#f08a4b', '#3b6ea8', '#6b7280', '#9aa0aa', '#c9a227', '#8a5a3c', '#2f9e6e'];

export function Investment({ equipBy, params }: { equipBy: Record<ScenarioId, number>; params: Record<ScenarioId, ScenarioParams> }) {
  const build = (s: ScenarioId) => {
    const parts = [{ label: 'Equipamento', v: equipBy[s] }, ...capexOther.map((c) => ({ label: c.label, v: c.value[s] }))];
    return { parts, total: parts.reduce((a, p) => a + p.v, 0), door: parts.filter((p) => p.label !== 'Capital de giro').reduce((a, p) => a + p.v, 0) };
  };
  const data = { conservador: build('conservador'), otimista: build('otimista') };
  const max = Math.max(data.conservador.total, data.otimista.total);

  return (
    <section className="chapter" id="investimento">
      <div className="wrap">
        <ChapterHead
          n={6}
          kicker="Investimento e custos"
          title={<>Os R$ 120 mil abrem a porta.<br /><span className="accent">O fôlego até encher custa mais.</span></>}
          lead={<>A referência de R$ 120 mil que circulou no mercado está certa para equipamento, obra e papelada do cenário conservador. O que ela não cobre é o período em que o box já paga aluguel e equipe mas ainda não tem alunos suficientes. Esse caixa precisa estar separado antes de abrir.</>}
        />
        <Reveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            {(['conservador', 'otimista'] as ScenarioId[]).map((s) => (
              <div key={s} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 8 }}>
                  <div><h3 style={{ textTransform: 'uppercase' }}>{scenarios[s].name}</h3><span className="muted small">{scenarios[s].tagline}</span></div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem' }} className="num"><CountUp value={data[s].total} format={(v) => kbrl(v)} /></span>
                    <div className="small muted">{kbrl(data[s].door)} para abrir + {kbrl(data[s].total - data[s].door)} de caixa</div>
                  </div>
                </div>
                <div className="stack" style={{ width: `${(data[s].total / max) * 100}%`, minWidth: '60%' }}>
                  {data[s].parts.map((p, i) => <div key={p.label} title={`${p.label}: ${brl(p.v)}`} style={{ width: `${(p.v / data[s].total) * 100}%`, background: colors[i], opacity: p.label === 'Capital de giro' ? 0.55 : 1, backgroundImage: p.label === 'Capital de giro' ? 'repeating-linear-gradient(45deg, transparent 0 6px, rgba(0,0,0,.25) 6px 12px)' : undefined }} />)}
                </div>
              </div>
            ))}
            <div className="stack-legend">
              {data.conservador.parts.map((p, i) => <span key={p.label}><i style={{ background: colors[i] }} />{p.label}</span>)}
            </div>
          </div>
        </Reveal>
        <Reveal>
          <div className="scroll-x panel" style={{ padding: 0 }}>
            <table className="t" style={{ minWidth: 640 }}>
              <thead><tr><th>Para onde vai o dinheiro</th><th className="r">Conservador</th><th className="r">Otimista</th></tr></thead>
              <tbody>
                <tr><td><b>Equipamento</b><div className="small muted">montado no capítulo anterior</div></td><td className="r">{brl(equipBy.conservador)}</td><td className="r">{brl(equipBy.otimista)}</td></tr>
                {capexOther.map((c) => (
                  <tr key={c.id}><td><b>{c.label}</b>{c.estimate && <span className="chip" style={{ marginLeft: 8 }}>estimativa</span>}<div className="small muted">{c.detail}</div></td><td className="r">{brl(c.value.conservador)}</td><td className="r">{brl(c.value.otimista)}</td></tr>
                ))}
                <tr className="total"><td>Total</td><td className="r accent">{brl(data.conservador.total)}</td><td className="r accent">{brl(data.otimista.total)}</td></tr>
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal>
          <div className="sub-head" style={{ marginBottom: 16 }}>
            <div className="label">Custo de todo mês</div>
            <h3 style={{ textTransform: 'uppercase', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}>O que precisa entrar para abrir a porta todo dia</h3>
          </div>
          <div className="grid g2">
            {(['conservador', 'otimista'] as ScenarioId[]).map((s) => {
              const o = opexBreakdown(params[s]);
              return (
                <div className="panel" key={s}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                    <h4 style={{ textTransform: 'uppercase' }}>{scenarios[s].name}</h4>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem' }} className="num accent">{brl(o.total)}</span>
                  </div>
                  <div className="small muted" style={{ marginBottom: 10 }}>{params[s].classesPerDay} aulas por dia útil + {params[s].satClasses} no sábado = {o.classes} aulas/mês</div>
                  {o.lines.map((l) => (
                    <div key={l.label} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: 12, padding: '7px 0', borderTop: '1px solid var(--graphite-3)', fontSize: '0.92rem' }}>
                      <span className="muted">{l.label}</span><span className="num">{brl(l.value)}</span>
                    </div>
                  ))}
                  <div className="small" style={{ marginTop: 10, color: 'var(--on-dark-3)' }}>+ ~10% da receita em imposto (Simples) e taxas de cartão e app.</div>
                </div>
              );
            })}
          </div>
        </Reveal>

        <div className="split">
          <Reveal>
            <div className="panel">
              <div className="label" style={{ marginBottom: 10 }}>Equipe</div>
              {team.map((t) => (
                <div key={t.role} style={{ padding: '12px 0', borderTop: '1px solid var(--graphite-3)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}><b>{t.role} <span className="muted">× {t.qty}</span></b><span className="mono small accent">{t.cost}</span></div>
                  <p className="small muted">{t.d}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="panel">
              <div className="label" style={{ marginBottom: 10 }}>Licenças, nesta ordem</div>
              <ol style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0,1fr))', gap: '10px 16px' }}>
                {licenses.map((l, i) => (
                  <li key={l.t} style={{ borderTop: '1px solid var(--graphite-3)', paddingTop: 8 }}>
                    <b><span className="accent mono">{i + 1}</span> {l.t}</b>
                    <div className="small muted">{l.d}</div>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
