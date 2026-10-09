import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { BgVideo, ChapterHead, Reveal, Slider } from '../components/ui';
import { cityPlayers, competitors, market, place } from '../data/content';

export function Market() {
  return (
    <section className="chapter" id="mercado">
      <div className="wrap">
        <ChapterHead
          n={2}
          kicker="O mercado"
          title={<>Chegou ao Brasil.<br /><span className="accent">O Sul ainda não tem prova.</span></>}
          lead="O HYROX cresce por temporadas: cada prova lotada vira mais gente treinando para a próxima. No Brasil já são três cidades com etapa oficial e mais de 400 academias afiliadas. Quem treina em Porto Alegre ainda precisa viajar para competir."
        />
        <Reveal>
          <div className="label" style={{ marginBottom: 14 }}>No mundo</div>
          <div className="grid g3">
            {market.global.map((m) => (
              <div className="stat" key={m.label}><span className="v">{m.value}</span><span className="l">{m.label}</span><span className="tiny" style={{ color: 'var(--on-dark-3)' }}>{m.src}</span></div>
            ))}
          </div>
        </Reveal>
        <Reveal>
          <div className="label" style={{ marginBottom: 14 }}>No Brasil</div>
          <div className="grid g3">
            {market.brasil.map((m) => (
              <div className="stat" key={m.label}><span className="v" style={m.value === '0' ? { color: 'var(--orange-2)' } : undefined}>{m.value}</span><span className="l">{m.label}</span><span className="tiny" style={{ color: 'var(--on-dark-3)' }}>{m.src}</span></div>
            ))}
          </div>
        </Reveal>
        <div className="split">
          <Reveal>
            <div className="panel">
              <div className="label" style={{ marginBottom: 12 }}>Provas oficiais no Brasil · temporada 2026</div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {market.calendar.map((c) => (
                  <div key={c.city} style={{ display: 'grid', gridTemplateColumns: 'minmax(84px, 120px) minmax(0,1fr) auto', gap: 12, padding: '12px 0', borderTop: '1px solid var(--graphite-3)', alignItems: 'center' }}>
                    <span className="mono small">{c.date}</span>
                    <span><b style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem' }}>{c.city}</b><br /><span className="muted small">{c.where}</span></span>
                    <span className={`chip ${c.status === 'próxima' ? 'hot' : ''}`}>{c.status}</span>
                  </div>
                ))}
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(84px, 120px) minmax(0,1fr) auto', gap: 12, padding: '12px 0', borderTop: '1px solid var(--graphite-3)', alignItems: 'center' }}>
                  <span className="mono small">—</span>
                  <span><b style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--orange-2)' }}>Região Sul</b><br /><span className="muted small">nenhuma etapa anunciada</span></span>
                  <span className="chip">oportunidade</span>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="sub-head">
              <div className="label">Por que agora</div>
              <h3 style={{ textTransform: 'uppercase', fontSize: 'clamp(1.5rem, 2.6vw, 2.1rem)' }}>O box que prepara a turma para a prova vira o ponto de encontro</h3>
              <p className="muted">Quem compete precisa de um lugar para treinar as estações, simular a prova e viajar em grupo. Em Porto Alegre, isso hoje está espalhado em boxes de CrossFit que adaptaram uma parte do espaço.</p>
              <p className="muted">O hype é real, e é de 2025 e 2026. O que sustenta o box por anos é a turma e o treino de condicionamento; a marca HYROX é o gancho para atrair. O capítulo 8 trata do que fazer se a onda baixar.</p>
            </div>
          </Reveal>
        </div>
        <Reveal>
          <div className="label" style={{ marginBottom: 12 }}>Quem já oferece HYROX na cidade</div>
          <div className="scroll-x panel" style={{ padding: 0 }}>
            <table className="t" style={{ minWidth: 600 }}>
              <thead><tr><th>Quem</th><th>Onde</th><th>O que oferece</th></tr></thead>
              <tbody>{cityPlayers.map((c) => <tr key={c.name}><td style={{ fontWeight: 600 }}>{c.name}</td><td className="muted">{c.where}</td><td className="muted">{c.what}</td></tr>)}</tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const photos = [
  { src: 'media/fachada-b.webp', cap: 'Fachada atual, ainda com a marca NitroGym' },
  { src: 'media/fachada-a.webp', cap: 'Área externa com grama sintética na calçada' },
  { src: 'media/fachada-c.webp', cap: 'A rua: arborizada, plana, boa para correr' },
];

export function Place() {
  const [zoom, setZoom] = useState<string | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const maxKm = 1.5;
  return (
    <section className="chapter mid" id="ponto">
      <div className="wrap">
        <ChapterHead
          n={3}
          kicker="O ponto"
          title={<>Rua Gomes de Freitas, 216</>}
          lead={<>Um salão térreo que funcionou como academia por 18 anos, num bairro residencial de 31 mil moradores, a 400 metros da Av. Assis Brasil. <a href={place.maps} target="_blank" rel="noreferrer" style={{ color: 'var(--orange-2)' }}>Ver no Google Maps <ExternalLink size={14} style={{ display: 'inline', verticalAlign: '-2px' }} /></a></>}
        />
        <Reveal>
          <div className="photos">
            {photos.map((p) => (
              <figure key={p.src} onClick={() => setZoom(p.src)} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && setZoom(p.src)} aria-label={`Ampliar: ${p.cap}`}>
                <img src={p.src} alt={p.cap} loading="lazy" />
                <figcaption>{p.cap}</figcaption>
              </figure>
            ))}
          </div>
          <p className="tiny" style={{ color: 'var(--on-dark-3)', marginTop: 8 }}>Imagens do Google Street View, julho de 2025.</p>
        </Reveal>
        <Reveal>
          <div className="grid g3">
            {place.facts.map((f) => (
              <div className="fact" key={f.k}><span className="label">{f.k}</span><span className="v">{f.v}</span><span className="muted small">{f.d}</span></div>
            ))}
          </div>
        </Reveal>
        <Reveal>
          <div className="band">
            <BgVideo name="cena-loja" />
            <div className="band-text">
              <div className="label" style={{ color: 'var(--orange-2)' }}>Por que este salão</div>
              <h3 style={{ textTransform: 'uppercase', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}>O que parece defeito é o formato certo</h3>
            </div>
          </div>
        </Reveal>
        <div className="grid g4">
          {place.why.map((w, i) => (
            <Reveal key={w.t} delay={i * 0.06}>
              <div className="panel" style={{ height: '100%' }}>
                <h4 style={{ textTransform: 'uppercase', marginBottom: 8 }}>{w.t}</h4>
                <p className="muted small">{w.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="split">
            <div className="sub-head">
              <div className="label">Concorrência num raio de 1,5 km</div>
              <h3 style={{ textTransform: 'uppercase', fontSize: 'clamp(1.5rem, 2.6vw, 2.1rem)' }}>Academia barata não falta. Box com HYROX, só um, e é de rede.</h3>
              <p className="muted">A SuperForce Cristo fica a 900 m e mistura CrossFit, HYROX e treino híbrido. As outras são musculação, a partir de R$ 70. O espaço livre é o box de bairro, focado só nisso, com turma pequena.</p>
              <p className="tiny" style={{ color: 'var(--on-dark-3)' }}>Distâncias em linha reta medidas no OpenStreetMap. Passe o mouse ou toque numa academia.</p>
            </div>
            <div className="panel radar">
              <div className="radar-axis">
                <div className="line" />
                {[0, 0.5, 1, 1.5].map((k) => <div key={k} className="tick" style={{ left: `${(k / maxKm) * 100}%` }}><span>{k} km</span></div>)}
                <div className="radar-pin home" style={{ left: '0%' }} title="O box">★</div>
                {competitors.map((c, i) => (
                  <div key={c.name} className={`radar-pin ${c.hyrox ? 'hy' : ''} ${hover === i ? 'on' : ''}`} style={{ left: `${(c.km / maxKm) * 100}%`, top: 18 + (i % 2 ? -14 : 0) }} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} onClick={() => setHover(i)} title={c.name}>{i + 1}</div>
                ))}
              </div>
              <div className="comp-list" style={{ marginTop: 24 }}>
                {competitors.map((c, i) => (
                  <div key={c.name} className={`comp ${hover === i ? 'on' : ''}`} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
                    <span className="d">{c.km.toLocaleString('pt-BR')} km</span>
                    <span><b>{i + 1}. {c.name}</b><br /><span className="muted small">{c.type}</span></span>
                    {c.hyrox ? <span className="chip hot">HYROX</span> : <span className="small muted">{c.price}</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
      <AnimatePresence>
        {zoom && (
          <motion.div className="lightbox" onClick={() => setZoom(null)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <img src={zoom} alt="Foto ampliada" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ---------- Box por dentro ----------
const zones = [
  { id: 'raia', label: 'Raia do trenó', x: 20, y: 20, w: 560, h: 60, fill: '#3f8f5a', m2: '40 m²', d: 'Grama sintética de 20 m × 2 m. Comporta os trechos oficiais de 12,5 m de empurrar e puxar, com espaço para frear. Dois trenós rodam lado a lado em revezamento.' },
  { id: 'func', label: 'Área funcional', x: 20, y: 80, w: 330, h: 200, fill: '#e8591a', m2: '~95 m²', d: 'Piso de borracha 15 mm. Wall balls nos alvos da parede, kettlebells, sandbags, burpees e aquecimento. Cabem 14 a 16 pessoas trabalhando ao mesmo tempo.' },
  { id: 'erg', label: 'Ergômetros', x: 350, y: 80, w: 230, h: 120, fill: '#3b6ea8', m2: '~40 m²', d: 'Fileira de SkiErgs e remos lado a lado, virados para a TV com o cronômetro. No otimista, bikes e uma esteira curva.' },
  { id: 'carga', label: 'Rack e cargas', x: 350, y: 200, w: 230, h: 80, fill: '#6b7280', m2: '~25 m²', d: 'Rack de parede com alvos de wall ball, prateleiras de kettlebells, sacos e bolas. Guardar tudo encostado deixa o centro livre.' },
  { id: 'entrada', label: 'Entrada', x: 580, y: 20, w: 80, h: 260, fill: '#9aa0aa', m2: '~20 m²', d: 'Porta para a rua: é por ali que a turma sai para os trechos de 1 km de corrida e volta direto para a estação.' },
];
const mezz = [
  { id: 'rec', label: 'Recepção + loja', x: 20, y: 330, w: 200, h: 90, fill: '#c9a227', m2: '20 m²', d: 'Balcão de check-in, vitrine da loja (camisetas, grips, squeezes, suplementos).' },
  { id: 'cafe', label: 'Café', x: 220, y: 330, w: 140, h: 90, fill: '#8a5a3c', m2: '15 m²', d: 'Balcão de café pré e pós-treino, isotônico e whey. Receita extra e lugar para a turma ficar depois do treino.' },
  { id: 'vest', label: 'Vestiários', x: 360, y: 330, w: 180, h: 90, fill: '#5b7c99', m2: '30 m²', d: 'Masculino e feminino com chuveiros bons, inclusive banheiro acessível (exigido no alvará). Quem treina às 6h vai trabalhar direto do box.' },
  { id: 'sala', label: 'Sala alugável', x: 540, y: 330, w: 120, h: 90, fill: '#7a6aa8', m2: '15 m²', d: 'Sublocação para fisioterapia, nutrição ou massagem esportiva: ~R$ 1.500/mês, quase 20% do aluguel.' },
];

const hours = ['06h', '07h', '08h', '09h', '12h', '17h', '18h', '19h', '20h'];
const weight = [1.35, 1.3, 0.8, 0.45, 0.85, 0.8, 1.45, 1.4, 0.85];

export function Inside() {
  const [zone, setZone] = useState('raia');
  const all = [...zones, ...mezz];
  const z = all.find((x) => x.id === zone)!;

  const [alunos, setAlunos] = useState(130);
  const [freq, setFreq] = useState(2.8);
  const [vagas, setVagas] = useState(14);
  const [nAulas, setNAulas] = useState(7);

  const grid = useMemo(() => {
    // escolhe as aulas mais procuradas conforme o número de aulas por dia
    const order = weight.map((w, i) => ({ w, i })).sort((a, b) => b.w - a.w).slice(0, nAulas).map((o) => o.i);
    const active = hours.map((_, i) => order.includes(i));
    const wSum = weight.reduce((s, w, i) => (active[i] ? s + w : s), 0);
    const weekly = alunos * freq; // visitas por semana
    const perDay = (weekly * 0.94) / 5; // ~6% vão no sábado
    const dayFactor = [1.1, 1.05, 1.05, 0.95, 0.85];
    const cells = hours.map((_, h) => dayFactor.map((f) => (active[h] ? Math.round(((perDay * f) * weight[h]) / wSum) : null)));
    const vagasSemana = nAulas * 5 * vagas;
    return { cells, perDay: Math.round(perDay), weekly: Math.round(weekly), vagasSemana, ocup: weekly * 0.94 / vagasSemana };
  }, [alunos, freq, vagas, nAulas]);

  const color = (v: number) => {
    const r = v / vagas;
    if (r > 1) return { background: '#d64545', color: '#fff' };
    if (r >= 0.85) return { background: '#e8591a', color: '#fff' };
    if (r >= 0.55) return { background: '#f2a67e', color: '#1c1f25' };
    return { background: '#e8e4da', color: '#4a4f59' };
  };
  const lotadas = grid.cells.flat().filter((v) => v !== null && v > vagas).length;

  return (
    <section className="chapter light" id="box" style={{ ['--track-bg' as string]: 'var(--paper-2)' }}>
      <div className="wrap">
        <ChapterHead
          n={4}
          kicker="O box por dentro"
          title={<>Térreo inteiro para treinar.<br /><span className="accent">Mezanino para o resto.</span></>}
          lead="A planta abaixo é uma proposta de ocupação, desenhada para mostrar a lógica do espaço. A medida real do salão define as dimensões finais. Clique em cada área."
        />
        <Reveal>
          <div className="split">
            <div className="panel plan">
              <svg viewBox="0 0 680 440" role="img" aria-label="Planta proposta do box">
                <text x="20" y="13" fontSize="11" fill="#757a84">TÉRREO · 220 m²</text>
                <rect x="18" y="18" width="644" height="264" fill="none" stroke="#1c1f25" strokeWidth="3" rx="4" />
                {zones.map((q) => (
                  <g key={q.id} className={`zone ${zone === q.id ? 'on' : ''}`} onClick={() => setZone(q.id)} onMouseEnter={() => setZone(q.id)}>
                    <rect x={q.x} y={q.y} width={q.w} height={q.h} fill={q.fill} opacity={zone === q.id ? 1 : 0.72} stroke="#fbfaf6" strokeWidth="2" />
                    <text x={q.x + 10} y={q.y + 22} fontSize="13" fill="#fff" fontWeight="600">{q.label}</text>
                    <text x={q.x + 10} y={q.y + 38} fontSize="11" fill="#fff" opacity="0.85">{q.m2}</text>
                  </g>
                ))}
                <text x="20" y="323" fontSize="11" fill="#757a84">MEZANINO · 80 m²</text>
                <rect x="18" y="328" width="644" height="94" fill="none" stroke="#1c1f25" strokeWidth="3" rx="4" />
                {mezz.map((q) => (
                  <g key={q.id} className={`zone ${zone === q.id ? 'on' : ''}`} onClick={() => setZone(q.id)} onMouseEnter={() => setZone(q.id)}>
                    <rect x={q.x} y={q.y} width={q.w} height={q.h} fill={q.fill} opacity={zone === q.id ? 1 : 0.72} stroke="#fbfaf6" strokeWidth="2" />
                    <text x={q.x + 10} y={q.y + 22} fontSize="13" fill="#fff" fontWeight="600">{q.label}</text>
                    <text x={q.x + 10} y={q.y + 38} fontSize="11" fill="#fff" opacity="0.85">{q.m2}</text>
                  </g>
                ))}
              </svg>
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={z.id} className="panel ink" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <span className="label" style={{ color: 'var(--orange-2)' }}>{mezz.some((m) => m.id === z.id) ? 'Mezanino' : 'Térreo'} · {z.m2}</span>
                <h3 style={{ textTransform: 'uppercase', fontSize: '2rem' }}>{z.label}</h3>
                <p className="muted">{z.d}</p>
                <div style={{ borderTop: '1px solid var(--graphite-3)', paddingTop: 12 }} className="small muted">
                  <b style={{ color: 'var(--on-dark)' }}>O que o salão precisa ter:</b> pé-direito de pelo menos 3,5 m (alvo de wall ball a 3 m), largura de 5 m ou mais para raia + área de treino, piso térreo firme e banheiro acessível.
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>

        <Reveal>
          <div className="sub-head" style={{ marginBottom: 20 }}>
            <div className="label">Como funciona a lotação</div>
            <h3 style={{ textTransform: 'uppercase', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}>Ninguém treina quando quer. As aulas têm hora e vaga.</h3>
            <p className="muted">O aluno reserva a vaga pelo app (Tecnofit, Wodify ou similar). Se a aula das 19h lotou, entra na fila de espera ou vai às 20h. Aluno de box treina em média 2,5 a 3,5 vezes por semana, então 150 matrículas não são 150 pessoas por dia. Mexa nos controles e veja a semana encher.</p>
          </div>
          <div className="split">
            <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <Slider id="occ-alunos" label="Alunos matriculados" value={alunos} min={40} max={220} step={5} onChange={setAlunos} />
              <Slider id="occ-freq" label="Treinos por semana, em média" value={freq} min={1.5} max={4.5} step={0.1} onChange={setFreq} format={(v) => v.toLocaleString('pt-BR', { minimumFractionDigits: 1 })} />
              <Slider id="occ-vagas" label="Vagas por aula" value={vagas} min={8} max={20} step={1} onChange={setVagas} />
              <Slider id="occ-aulas" label="Aulas por dia útil" value={nAulas} min={4} max={9} step={1} onChange={setNAulas} hint="Abre primeiro os horários de maior procura" />
              <div className="grid g2" style={{ gap: 12 }}>
                <div className="stat"><span className="v" style={{ fontSize: '2.2rem' }}>{grid.perDay}</span><span className="l">pessoas por dia útil</span></div>
                <div className="stat"><span className="v" style={{ fontSize: '2.2rem' }}>{Math.round(grid.ocup * 100)}%</span><span className="l">das vagas da semana ocupadas</span></div>
              </div>
              <p className="small" style={{ color: lotadas ? 'var(--red)' : 'var(--on-light-2)' }}>
                {lotadas ? `${lotadas} aulas passam do limite: hora de abrir mais horários ou subir o preço.` : grid.ocup < 0.5 ? 'Muita vaga sobrando: o caixa sofre, mas o aluno treina com conforto.' : 'A semana fecha sem aula estourada. Os horários nobres ficam cheios, os do meio do dia têm folga.'}
              </p>
            </div>
            <div className="panel scroll-x">
              <div className="sched" style={{ minWidth: 420 }}>
                <span />
                {['seg', 'ter', 'qua', 'qui', 'sex'].map((d) => <span className="d" key={d}>{d}</span>)}
                <span className="d">sáb</span>
                {hours.map((h, hi) => (
                  <FragRow key={h}>
                    <span className="h">{h}</span>
                    {grid.cells[hi].map((v, di) => v === null ? <span key={di} className="c off">·</span> : <span key={di} className="c" style={color(v)} title={`${v} de ${vagas} vagas`}>{v}</span>)}
                    {hi === 1 || hi === 2 ? <span className="c" style={color(Math.round(grid.weekly * 0.03))}>{Math.round(grid.weekly * 0.03)}</span> : <span className="c off">·</span>}
                  </FragRow>
                ))}
              </div>
              <div className="legend" style={{ marginTop: 14 }}>
                <span><i style={{ background: '#e8e4da' }} />folga</span>
                <span><i style={{ background: '#f2a67e' }} />boa</span>
                <span><i style={{ background: '#e8591a' }} />cheia</span>
                <span><i style={{ background: '#d64545' }} />acima do limite</span>
              </div>
              <p className="tiny" style={{ color: 'var(--on-light-3)', marginTop: 10 }}>Distribuição típica de box: picos às 6h–7h e 18h–19h. Números por aula, em pessoas.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FragRow({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

