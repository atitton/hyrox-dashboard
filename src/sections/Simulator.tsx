import { useMemo, useState } from 'react';
import { Bar, CartesianGrid, Cell, ComposedChart, Line, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { CloudRain, Flame, Home, TrendingDown, UserX, Wallet, Snail } from 'lucide-react';
import { ChapterHead, Reveal, Slider } from '../components/ui';
import { brl, capacityStudents, capexOtherTotal, kbrl, scenarios, simulate, noStress, type ScenarioId, type ScenarioParams, type Stress } from '../data/model';

const stressList: { k: keyof Stress; label: string; d: string; icon: typeof Flame }[] = [
  { k: 'hype', label: 'O hype esfria', d: 'A partir do 2º ano entram metade dos alunos novos e saem 3% a mais por mês', icon: Flame },
  { k: 'slow', label: 'Abertura lenta', d: 'Só 35% dos fundadores esperados e 40% menos matrículas por mês', icon: Snail },
  { k: 'price', label: 'Guerra de preço', d: 'Um concorrente força a mensalidade 15% para baixo', icon: TrendingDown },
  { k: 'rent', label: 'Aluguel +25%', d: 'Reajuste ou renegociação ruim do contrato', icon: Home },
  { k: 'inflation', label: 'Custos +8% ao ano', d: 'Inflação nos custos sem reajustar a mensalidade', icon: CloudRain },
  { k: 'coach', label: 'Head coach sai', d: 'No mês 9 o coach principal sai e 15% da turma vai junto', icon: UserX },
];

export function Simulator({ equipBy, params, setParams }: {
  equipBy: Record<ScenarioId, number>;
  params: Record<ScenarioId, ScenarioParams>;
  setParams: (s: ScenarioId, p: ScenarioParams) => void;
}) {
  const [sel, setSel] = useState<ScenarioId>('conservador');
  const [stress, setStress] = useState<Stress>(noStress);
  const p = params[sel];
  const set = (k: keyof ScenarioParams) => (v: number) => setParams(sel, { ...p, [k]: v });

  const investment = equipBy[sel] + capexOtherTotal(sel, false);
  const giro = capexOtherTotal(sel) - capexOtherTotal(sel, false);
  const r = useMemo(() => simulate(p, investment, giro, stress), [p, investment, giro, stress]);
  const base = useMemo(() => simulate(p, investment, giro, noStress), [p, investment, giro]);
  const stressed = Object.values(stress).some(Boolean);
  const steady = r.rows[23];
  const shortfall = r.minCaixa < 0 ? -r.minCaixa : 0;
  const cap = capacityStudents(p, 0.85);
  const hitBE = r.rows.find((x) => x.alunos >= r.breakEven)?.mes ?? null;

  const verdict = (() => {
    if (r.payback && r.payback <= 24 && !shortfall) return { tone: 'good', t: `Neste cenário o investimento de ${kbrl(investment)} volta em ${r.payback} meses, e o capital de giro reservado aguenta a fase de crescimento.` };
    if (r.payback && !shortfall) return { tone: 'ok', t: `Se paga em ${r.payback} meses, ${r.payback > 30 ? 'um prazo longo para o risco de um negócio físico' : 'um prazo razoável para negócio físico'}. O caixa reservado aguenta.` };
    if (r.payback && shortfall) return { tone: 'warn', t: `Se paga em ${r.payback} meses, mas no pior momento faltariam ${kbrl(shortfall)} além do capital de giro. Precisa reservar mais caixa ou acelerar a pré-venda.` };
    if (steady.resultado > 0) return { tone: 'warn', t: `Em 3 anos o investimento ainda não volta: o box dá ${kbrl(steady.resultado)} por mês no 2º ano, pouco para recuperar ${kbrl(investment)}.${shortfall ? ` E o caixa ficaria ${kbrl(shortfall)} abaixo do reservado.` : ''}` };
    return { tone: 'bad', t: `Não se paga. Com ${steady.alunos} alunos no 2º ano o box perde ${kbrl(-steady.resultado)} por mês, e o caixa precisaria de mais ${kbrl(shortfall)}.` };
  })();

  const pct = (v: number) => `${Math.min(100, (v / 260) * 100)}%`;

  return (
    <section className="chapter mid" id="simulador">
      <div className="wrap">
        <ChapterHead
          n={7}
          kicker="Stress test"
          title={<>E se der errado?<br /><span className="accent">Teste antes de assinar.</span></>}
          lead="O simulador projeta 36 meses, mês a mês: alunos entrando e saindo, receita, custo e caixa. Mude as premissas e ligue os cenários de estresse para ver até onde o negócio aguenta. O equipamento vem do capítulo 5."
        />
        <Reveal>
          <div className="chip-row" style={{ justifyContent: 'space-between', gap: 16 }}>
            <div className="seg" role="group" aria-label="Cenário">
              {(['conservador', 'otimista'] as ScenarioId[]).map((s) => <button key={s} className={sel === s ? 'on' : ''} onClick={() => setSel(s)}>{scenarios[s].name}</button>)}
            </div>
            <span className="small muted">Investimento {kbrl(investment)} + {kbrl(giro)} de capital de giro</span>
          </div>
        </Reveal>
        <div className="sim">
          <Reveal className="panel sim-ctrls">
            <div className="sim-group">
              <div className="label">Receita</div>
              <Slider id="s-ticket" label="Mensalidade média" value={p.ticket} min={149} max={499} step={10} onChange={set('ticket')} format={(v) => brl(v)} hint="Box de cross em POA: R$ 200 a 450" />
              <Slider id="s-founders" label="Alunos na abertura (pré-venda)" value={p.founders} min={0} max={100} step={5} onChange={set('founders')} />
              <Slider id="s-new" label="Matrículas novas por mês" value={p.newPerMonth} min={2} max={30} step={1} onChange={set('newPerMonth')} />
              <Slider id="s-churn" label="Cancelamentos por mês" value={p.churn} min={1} max={12} step={0.5} onChange={set('churn')} format={(v) => `${v.toLocaleString('pt-BR')}%`} hint="Box com comunidade forte: 3 a 6%" />
              <Slider id="s-extra" label="Loja e café, margem por aluno" value={p.extrasPerStudent} min={0} max={40} step={1} onChange={set('extrasPerStudent')} format={(v) => brl(v)} />
            </div>
            <div className="sim-group">
              <div className="label">Custo e capacidade</div>
              <Slider id="s-rent" label="Aluguel + IPTU" value={p.rent} min={5000} max={14000} step={200} onChange={set('rent')} format={(v) => brl(v)} />
              <Slider id="s-classes" label="Aulas por dia útil" value={p.classesPerDay} min={4} max={10} step={1} onChange={set('classesPerDay')} hint={`Cada aula a mais custa ~${brl(p.perClass * 22)}/mês em coach`} />
              <Slider id="s-cap" label="Vagas por aula" value={p.capacity} min={8} max={20} step={1} onChange={set('capacity')} />
              <Slider id="s-coach" label="Salário do head coach" value={p.headCoach} min={3000} max={9000} step={250} onChange={set('headCoach')} format={(v) => brl(v)} />
            </div>
            <button className="btn ghost sm" onClick={() => setParams(sel, scenarios[sel].params)} style={{ alignSelf: 'flex-start' }}>Voltar às premissas originais</button>
          </Reveal>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, minWidth: 0 }}>
            <Reveal>
              <div className="label" style={{ marginBottom: 10 }}>Cenários de estresse · ligue um ou vários</div>
              <div className="stress">
                {stressList.map((s) => {
                  const I = s.icon;
                  return (
                    <button key={s.k} className={stress[s.k] ? 'on' : ''} onClick={() => setStress({ ...stress, [s.k]: !stress[s.k] })} title={s.d} aria-pressed={stress[s.k]}>
                      <I size={15} /> {s.label}
                    </button>
                  );
                })}
                {stressed && <button onClick={() => setStress(noStress)}>Limpar</button>}
              </div>
              {stressed && <p className="tiny" style={{ color: 'var(--on-dark-3)', marginTop: 8 }}>{stressList.filter((s) => stress[s.k]).map((s) => s.d).join(' · ')}</p>}
            </Reveal>

            <div className="kpis">
              <div className="kpi"><span className="label">Empata com</span><span className="v">{r.breakEven} alunos</span><span className="s">{hitBE ? `alcançado no mês ${hitBE}` : 'não alcançado em 3 anos'} · cabem ~{cap}</span></div>
              <div className={`kpi ${steady.resultado >= 0 ? 'good' : 'bad'}`}><span className="label">Resultado no mês 24</span><span className="v">{kbrl(steady.resultado)}</span><span className="s">{steady.alunos} alunos · receita {kbrl(steady.receita)}</span></div>
              <div className={`kpi ${r.payback ? (r.payback <= 30 ? 'good' : '') : 'bad'}`}><span className="label">Investimento volta em</span><span className="v">{r.payback ? `${r.payback} meses` : '> 36 meses'}</span><span className="s">{r.payback ? `${(r.payback / 12).toLocaleString('pt-BR', { maximumFractionDigits: 1 })} anos` : 'fora do horizonte'}{stressed && base.payback !== r.payback ? ` · sem estresse: ${base.payback ?? '>36'}` : ''}</span></div>
              <div className={`kpi ${shortfall ? 'bad' : 'good'}`}><span className="label">Caixa no pior mês</span><span className="v">{shortfall ? `falta ${kbrl(shortfall)}` : kbrl(r.minCaixa)}</span><span className="s">{shortfall ? 'além do capital de giro' : `sobra do giro de ${kbrl(giro)}`}</span></div>
            </div>

            <Reveal className="panel">
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                <span className="label">36 meses · resultado do mês (barras) e retorno acumulado do investimento (linha)</span>
                <span className="legend" style={{ color: 'var(--on-dark-3)' }}><span><i style={{ background: '#2f9e6e' }} />lucro</span><span><i style={{ background: '#d64545' }} />prejuízo</span><span><i style={{ background: '#ff7a3d' }} />acumulado</span></span>
              </div>
              <div className="chart-box">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={r.rows} margin={{ top: 10, right: 8, left: 0, bottom: 0 }}>
                    <CartesianGrid stroke="#343a45" vertical={false} />
                    <XAxis dataKey="mes" stroke="#858b97" tick={{ fill: '#858b97', fontSize: 11 }} tickLine={false} interval={5} tickFormatter={(v) => `m${v}`} />
                    <YAxis yAxisId="a" stroke="#858b97" tick={{ fill: '#858b97', fontSize: 11 }} tickLine={false} axisLine={false} width={64} tickFormatter={(v) => `${Math.round(v / 1000)}k`} />
                    <YAxis yAxisId="b" orientation="right" hide domain={['auto', 'auto']} />
                    <ReferenceLine yAxisId="b" y={0} stroke="#b7bcc6" strokeDasharray="4 4" />
                    <Tooltip
                      contentStyle={{ background: '#1f232b', border: '1px solid #343a45', borderRadius: 10, color: '#f3f1ea' }}
                      labelFormatter={(l) => `Mês ${l}`}
                      formatter={(v, n) => [n === 'alunos' ? `${v}` : brl(Number(v)), n === 'resultado' ? 'Resultado do mês' : n === 'acumulado' ? 'Acumulado (− investimento)' : n === 'alunos' ? 'Alunos' : String(n)]}
                    />
                    <Bar yAxisId="a" dataKey="resultado" radius={[3, 3, 0, 0]}>
                      {r.rows.map((row) => <Cell key={row.mes} fill={row.resultado >= 0 ? '#2f9e6e' : '#d64545'} />)}
                    </Bar>
                    <Line yAxisId="b" type="monotone" dataKey="acumulado" stroke="#ff7a3d" strokeWidth={3} dot={false} />
                    <Line yAxisId="a" type="monotone" dataKey="alunos" stroke="transparent" dot={false} activeDot={false} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
              <p className="tiny" style={{ color: 'var(--on-dark-3)' }}>A linha laranja começa em −{kbrl(investment)} e cruza a linha tracejada no mês em que o investimento volta. O capital de giro não entra nessa conta: é reserva e volta para o caixa.</p>
            </Reveal>

            <Reveal className="panel">
              <span className="label">Régua de alunos</span>
              <div className="ruler" style={{ marginTop: 18 }}>
                <div className="bar">
                  <div style={{ width: pct(r.breakEven), background: '#d64545', opacity: 0.75 }} />
                  <div style={{ width: `calc(${pct(cap)} - ${pct(r.breakEven)})`, background: '#2f9e6e', opacity: 0.85 }} />
                  <div style={{ flex: 1, background: '#343a45' }} />
                </div>
                <div className="mk" style={{ left: pct(r.breakEven) }}><span>empate · {r.breakEven}</span></div>
                <div className="mk bottom" style={{ left: pct(r.rows[11].alunos) }}><span>mês 12 · {r.rows[11].alunos}</span></div>
                <div className="mk" style={{ left: pct(cap), background: 'var(--orange-2)' }}><span>casa cheia · {cap}</span></div>
              </div>
              <p className="small muted" style={{ marginTop: 18 }}>Cada aluno acima do empate deixa ~{brl(r.netPerStudent)} por mês. Abaixo dele, cada vaga vazia custa o mesmo. "Casa cheia" considera 85% das vagas da semana ocupadas, com frequência média de {p.avgFreq.toLocaleString('pt-BR')} treinos por aluno.</p>
            </Reveal>

            <div className="verdict-line" style={{ borderColor: verdict.tone === 'good' ? '#2f9e6e' : verdict.tone === 'bad' ? '#d64545' : verdict.tone === 'warn' ? '#d9962b' : 'var(--orange)' }}>
              {verdict.t}
            </div>
          </div>
        </div>
        <Reveal>
          <div className="panel scroll-x" style={{ padding: 0 }}>
            <table className="t" style={{ minWidth: 640 }}>
              <thead><tr><th>Marco</th><th className="r">Alunos</th><th className="r">Receita</th><th className="r">Custo</th><th className="r">Resultado</th><th className="r">Acumulado</th></tr></thead>
              <tbody>
                {[1, 3, 6, 12, 18, 24, 36].map((m) => {
                  const x = r.rows[m - 1];
                  return <tr key={m}><td className="mono">Mês {m}</td><td className="r">{x.alunos}</td><td className="r">{brl(x.receita)}</td><td className="r">{brl(x.custo)}</td><td className="r" style={{ color: x.resultado >= 0 ? '#5fd3a0' : '#ff8a80' }}>{brl(x.resultado)}</td><td className="r">{brl(x.acumulado)}</td></tr>;
                })}
              </tbody>
            </table>
          </div>
        </Reveal>
        <p className="tiny" style={{ color: 'var(--on-dark-3)' }}>
          <Wallet size={12} style={{ display: 'inline', verticalAlign: '-2px' }} /> Premissas: receita líquida de 10% de imposto e taxas; equipe calculada por aula; alunos de Wellhub/TotalPass fora da conta; sem pró-labore de gestão. Projeção para decisão, não promessa de resultado.
        </p>
      </div>
    </section>
  );
}
