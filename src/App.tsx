import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { Activity, Calculator, Swords, Dumbbell, ExternalLink, MapPin, TrendingUp, Users, Target, ShieldAlert, ShoppingBag } from 'lucide-react';
import './index.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('projeto');

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <Activity size={32} color="#ff4d00" />
          <span>HYROX<span style={{color: '#64748b', fontWeight: 300}}>PITCH</span></span>
        </div>
        <div className="nav-links">
          <button className={`nav-item ${activeTab === 'projeto' ? 'active' : ''}`} onClick={() => setActiveTab('projeto')}>
            <Target size={18} /> O Projeto
          </button>
          <button className={`nav-item ${activeTab === 'esporte' ? 'active' : ''}`} onClick={() => setActiveTab('esporte')}>
            <TrendingUp size={18} /> O Esporte
          </button>
          <button className={`nav-item ${activeTab === 'simulador' ? 'active' : ''}`} onClick={() => setActiveTab('simulador')}>
            <Calculator size={18} /> Simulador
          </button>
          <button className={`nav-item ${activeTab === 'batalha' ? 'active' : ''}`} onClick={() => setActiveTab('batalha')}>
            <Swords size={18} /> Expansão & Riscos
          </button>
          <button className={`nav-item ${activeTab === 'equipamentos' ? 'active' : ''}`} onClick={() => setActiveTab('equipamentos')}>
            <Dumbbell size={18} /> Fornecedores
          </button>
        </div>
      </nav>

      <main className="main-content">
        <AnimatePresence mode="wait">
          {activeTab === 'projeto' && <ProjectView key="projeto" />}
          {activeTab === 'esporte' && <SportView key="esporte" />}
          {activeTab === 'simulador' && <SimulatorView key="simulador" />}
          {activeTab === 'batalha' && <ArenaView key="batalha" />}
          {activeTab === 'equipamentos' && <EquipmentView key="equipamentos" />}
        </AnimatePresence>
      </main>
    </>
  );
}

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay }} exit={{ opacity: 0, y: -30 }}>
    {children}
  </motion.div>
);

// --- VIEWS ---

function ProjectView() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      <section className="hero-section" style={{ height: '60vh', minHeight: '500px' }}>
        <video className="hero-video" autoPlay loop muted playsInline>
          <source src="/assets/cena-loja.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay" style={{ background: 'linear-gradient(180deg, rgba(30,33,43,0.7) 0%, rgba(30,33,43,0.95) 100%)' }}></div>
        <div className="hero-content">
          <FadeIn>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(255, 77, 0, 0.2)', padding: '5px 15px', borderRadius: '50px', marginBottom: '20px', border: '1px solid #ff4d00', color: '#ff4d00', fontWeight: 'bold' }}>
              <MapPin size={16} /> JARDIM ITU-SABARÁ, POA
            </div>
            <h1 className="hero-title" style={{ fontSize: 'clamp(3rem, 6vw, 6rem)' }}>O BOX DE BAIRRO</h1>
            <p className="hero-subtitle" style={{ color: '#cbd5e1' }}>Plano de Execução: Gomes de Freitas, 216</p>
          </FadeIn>
        </div>
      </section>

      <div className="section-container">
        <FadeIn delay={0.2}>
          <div className="grid-2">
            <div>
              <h2 className="section-title">O Ponto e o Mercado</h2>
              <p className="text-secondary" style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>
                O bairro possui ~31 mil moradores. A <strong>Rua Gomes de Freitas, 216</strong> funcionou como academia por 18 anos. É um salão comprido e estreito de 250m² a 380m². Parece um defeito, mas é o formato <strong>perfeito</strong> para a raia de trenó do Hyrox.
              </p>
              
              <div className="card" style={{ marginBottom: '1.5rem', background: 'rgba(16, 185, 129, 0.05)', borderLeft: '4px solid #10b981' }}>
                <h3 style={{ color: '#10b981', marginBottom: '0.5rem' }}>A Concorrência</h3>
                <p className="text-muted">Num raio de 1,5km, sobram academias baratas (Engenharia do Corpo, etc). Mas de Box focado em <strong>Hyrox</strong>, só existe UM concorrente (SuperForce Cristo, a 0,9km). A demanda existe e o mercado está descobrindo a modalidade.</p>
              </div>
            </div>
            
            <div className="card" style={{ padding: 0, overflow: 'hidden', border: '1px solid #353b4d' }}>
              <img src="/assets/fachada1.png" alt="Fachada Gomes de Freitas" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <h2 className="section-title" style={{ marginTop: '5rem', marginBottom: '2rem', textAlign: 'center', display: 'block' }}>Os Dois Cenários de Execução</h2>
          
          <div className="grid-2">
            <div className="card" style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-20px', left: '20px', background: '#ff4d00', color: 'white', padding: '5px 15px', borderRadius: '20px', fontWeight: 'bold' }}>CENÁRIO CONSERVADOR</div>
              <h3 style={{ marginTop: '1rem', fontSize: '1.5rem' }}>Modelo de Combate (CAPEX 125k)</h3>
              <p className="text-secondary" style={{ marginTop: '1rem' }}>Foco brutal em manter o custo baixo no início. Utilizamos ventiladores industriais no lugar de ar-condicionado, e compramos marcas nacionais premium (Brave, D1Fitness, Alpha) para garantir qualidade gastando metade do valor dos importados.</p>
              <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#353b4d', borderRadius: '8px' }}>
                <strong style={{ color: '#ff4d00' }}><ShieldAlert size={16} style={{ display:'inline', verticalAlign:'text-bottom'}}/> Vantagem:</strong> O ponto de equilíbrio (break-even) cai absurdamente. Com apenas ~60 alunos a operação já se paga. O retorno do investimento é muito mais rápido.
              </div>
            </div>

            <div className="card" style={{ position: 'relative', border: '1px solid #10b981' }}>
              <div style={{ position: 'absolute', top: '-20px', left: '20px', background: '#10b981', color: 'white', padding: '5px 15px', borderRadius: '20px', fontWeight: 'bold' }}>CENÁRIO OTIMISTA / PREMIUM</div>
              <h3 style={{ marginTop: '1rem', fontSize: '1.5rem' }}>High-End Box (CAPEX 250k+)</h3>
              <p className="text-secondary" style={{ marginTop: '1rem' }}>Investimento pesado desde o Dia 1. Galpão climatizado, ergômetros 100% Concept2 (importados oficiais) e acabamentos premium nos vestiários para justificar um ticket médio muito superior na região.</p>
              <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px' }}>
                <strong style={{ color: '#10b981' }}><Activity size={16} style={{ display:'inline', verticalAlign:'text-bottom'}}/> Vantagem:</strong> Posiciona a marca imediatamente como a melhor da região, atraindo o público Classe A que já está saturado de academias tradicionais lotadas.
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </motion.div>
  );
}

function SportView() {
  const stations = [
    { name: "SkiErg", desc: "Simulador de Esqui", type: "img", src: "/assets/skierg_1791561168235.jpg" },
    { name: "Sled Push", desc: "Empurrar o Trenó", type: "video", src: "/assets/cena-treno.mp4" }, // User said this video was perfect
    { name: "Sled Pull", desc: "Puxar o Trenó", type: "img", src: "/assets/sled_pull_1791561179242.jpg" },
    { name: "Burpee Broad Jumps", desc: "Burpee com Salto Longo", type: "img", src: "/assets/burpee_1791561189223.jpg" },
    { name: "Rowing", desc: "Remo Seco", type: "img", src: "/assets/rowing_1791561227593.jpg" },
    { name: "Farmers Carry", desc: "Caminhada do Fazendeiro (Carga)", type: "img", src: "/assets/farmers_carry_1791561251700.jpg" },
    { name: "Sandbag Lunges", desc: "Avanço com Saco de Areia", type: "img", src: "/assets/sandbag_1791561262922.jpg" },
    { name: "Wall Balls", desc: "Arremesso de Bola na Parede", type: "img", src: "/assets/wallballs_1791561271998.jpg" }
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      <section className="hero-section" style={{ height: '70vh' }}>
        <video className="hero-video" autoPlay loop muted playsInline>
          <source src="/assets/cena-turma.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay" style={{ background: 'linear-gradient(180deg, rgba(30,33,43,0.5) 0%, rgba(30,33,43,0.95) 100%)' }}></div>
        <div className="hero-content">
          <FadeIn>
            <h1 className="hero-title">A CORRIDA DO <br/><span className="text-gradient">FITNESS</span></h1>
            <p className="hero-subtitle">Mundialmente padronizado. Acessível para todos.</p>
          </FadeIn>
        </div>
      </section>

      <div className="section-container">
        <FadeIn>
          <div className="grid-2" style={{ marginBottom: '6rem' }}>
            <div>
              <h2 className="section-title">O que é o Hyrox?</h2>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                O HYROX é a maratona do fitness. Diferente do CrossFit, não há LPO (Levantamento de Peso Olímpico) complexo que gera medo de lesões na maioria do público.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ background: 'rgba(255, 77, 0, 0.2)', padding: '10px', borderRadius: '8px', color: '#ff4d00' }}><TrendingUp size={24}/></div>
                  <div>
                    <h3 style={{ fontSize: '1.2rem' }}>O Formato Universal</h3>
                    <p className="text-muted">8 quilômetros de corrida no total. A cada 1km de corrida, o atleta entra no box e realiza UM exercício funcional (uma estação). A prova é exatamente a mesma em Nova York, Berlim ou São Paulo.</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="card" style={{ padding: 0, overflow: 'hidden', border: 'none', height: '400px' }}>
              <img src="/assets/hyrox_hero_1791561158199.jpg" alt="Hyrox Event" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <h2 className="section-title" style={{ textAlign: 'center', display: 'block', marginBottom: '3rem' }}>A Prova: 8 Estações</h2>
          <div className="grid-4">
            {stations.map((s, idx) => (
              <div key={idx} className="station-card" style={{ paddingBottom: '1rem' }}>
                <span className="station-number">0{idx+1}</span>
                <div style={{ height: '150px', marginBottom: '1rem', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#353b4d' }}>
                  {s.type === 'video' ? (
                    <video style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} autoPlay loop muted playsInline>
                      <source src={s.src} type="video/mp4" />
                    </video>
                  ) : (
                    <img src={s.src} alt={s.name} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
                  )}
                </div>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '0.2rem' }}>{s.name}</h3>
                <p className="text-gradient" style={{ fontWeight: 'bold', fontSize: '0.9rem', textTransform: 'uppercase' }}>({s.desc})</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </motion.div>
  );
}

function SimulatorView() {
  const [students, setStudents] = useState(64);
  const [ticket, setTicket] = useState(300);
  const [rent, setRent] = useState(6400); // 6.4k aluguel + iptu default

  const capex = 125000;
  const staff = 6500; // Head coach 5k + 30 aulas a 50
  const infraAndOthers = 4200; // energia 1.2k, mkt 1k, limpeza 0.8k, contador 0.5k, ecad/seguro/cref 0.4k, sistema 0.3k
  
  const opex = rent + staff + infraAndOthers;
  const revenue = students * ticket;
  
  // ticket de 300 sobra 270 (10% impostos/taxas)
  const netRevenuePerStudent = ticket * 0.90; 
  const netProfit = (students * netRevenuePerStudent) - opex;
  
  const paybackMonths = netProfit > 0 ? (capex / netProfit).toFixed(1) : '∞';
  const breakEvenStudents = Math.ceil(opex / netRevenuePerStudent);

  const graphData = [];
  for (let s = 30; s <= 150; s += 15) {
    const rev = s * ticket;
    const netRev = s * netRevenuePerStudent;
    const lucro = netRev - opex;
    graphData.push({ alunos: s, faturamento: rev, custo: opex, lucro: lucro });
  }

  return (
    <motion.div className="section-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 className="section-title">Stress Test Financeiro</h1>
        <p className="text-secondary" style={{ fontSize: '1.2rem' }}>Projeção baseada no CAPEX Conservador de R$ 125.000,00.</p>
      </div>

      <div className="simulator-panel">
        <div className="grid-2">
          {/* CONTROLS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            
            <div className="card" style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderLeft: '4px solid #64748b' }}>
              <h4 style={{ color: '#fff', marginBottom: '0.5rem' }}>Premissas Fixadas:</h4>
              <ul className="text-muted" style={{ fontSize: '0.85rem', marginLeft: '1rem' }}>
                <li>CAPEX Base: R$ 125.000 (R$ 55k equip, R$ 20k obra, R$ 30k caixa...)</li>
                <li>Impostos/Taxas: 10% retidos da mensalidade.</li>
                <li>Staff: R$ 6.500 (Head Coach + Freelancers).</li>
                <li>Infra: R$ 4.200 (Energia, marketing, contador, limpeza).</li>
              </ul>
            </div>

            <div>
              <div className="input-label">
                <span>TICKET MÉDIO (MENSALIDADE)</span>
                <span className="text-gradient" style={{ fontSize: '1.5rem' }}>R$ {ticket}</span>
              </div>
              <input type="range" min="150" max="450" step="10" value={ticket} onChange={e => setTicket(Number(e.target.value))} />
            </div>

            <div>
              <div className="input-label">
                <span>ALUNOS ATIVOS</span>
                <span className="text-gradient" style={{ fontSize: '1.5rem' }}>{students}</span>
              </div>
              <input type="range" min="30" max="150" step="5" value={students} onChange={e => setStudents(Number(e.target.value))} />
            </div>

            <div>
              <div className="input-label">
                <span>CUSTO DE LOCAÇÃO (Aluguel + IPTU)</span>
                <span>R$ {rent}</span>
              </div>
              <input type="range" min="5000" max="12000" step="200" value={rent} onChange={e => setRent(Number(e.target.value))} />
            </div>
          </div>

          {/* RESULTS */}
          <div>
            <div className="grid-2" style={{ gap: '1rem', marginBottom: '2rem' }}>
              <div className="kpi-card" style={{ borderTop: '2px solid #3b82f6' }}>
                <div className="kpi-label">Faturamento</div>
                <div className="kpi-value">R$ {(revenue/1000).toFixed(1)}k</div>
              </div>
              <div className="kpi-card" style={{ borderTop: `2px solid ${netProfit > 0 ? '#10b981' : '#ef4444'}` }}>
                <div className="kpi-label">Lucro Líquido</div>
                <div className="kpi-value" style={{ color: netProfit > 0 ? '#10b981' : '#ef4444' }}>
                  R$ {(netProfit/1000).toFixed(1)}k
                </div>
              </div>
              <div className="kpi-card" style={{ borderTop: '2px solid #8b5cf6' }}>
                <div className="kpi-label">Payback (Retorno)</div>
                <div className="kpi-value">{paybackMonths} {paybackMonths !== '∞' ? 'meses' : ''}</div>
              </div>
              <div className="kpi-card" style={{ borderTop: '2px solid #f59e0b' }}>
                <div className="kpi-label">Break-even (Empate)</div>
                <div className="kpi-value">{breakEvenStudents}</div>
                <div className="kpi-label">Alunos (Aprox. 0,2% do bairro)</div>
              </div>
            </div>

            <div className="card" style={{ height: '300px', background: 'transparent', padding: '1rem' }}>
              <h3 style={{ marginBottom: '1rem', fontSize: '1rem', color: 'var(--text-secondary)' }}>Evolução de Receita vs Custo Total</h3>
              <ResponsiveContainer width="100%" height="90%">
                <LineChart data={graphData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#353b4d" vertical={false} />
                  <XAxis dataKey="alunos" stroke="#64748b" tick={{ fill: '#64748b' }} axisLine={false} />
                  <YAxis stroke="#64748b" tickFormatter={(value) => `R$${value/1000}k`} tick={{ fill: '#64748b' }} axisLine={false} />
                  <RechartsTooltip 
                    formatter={(value: number) => `R$ ${value.toLocaleString()}`}
                    labelFormatter={(label) => `${label} Alunos`}
                    contentStyle={{ backgroundColor: '#252936', border: '1px solid #353b4d', borderRadius: '12px', color: '#fff' }}
                  />
                  <Line type="monotone" dataKey="faturamento" name="Receita Bruta" stroke="#ff4d00" strokeWidth={4} dot={false} />
                  <Line type="monotone" dataKey="custo" name="Custo Fixo" stroke="#64748b" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                  <Line type="monotone" dataKey="lucro" name="Lucro Líquido" stroke="#10b981" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ArenaView() {
  const expansao = [
    { title: "Venda de Produtos (Upsell)", desc: "O mezzanino de 80m² e a recepção permitem criar uma 'lojinha' vendendo camisetas, grips, squeezes e suplementos. Alta margem com custo de aquisição zero." },
    { title: "Café / Recovery", desc: "Instalar um café funcional ou locar salas ociosas para massagistas e fisioterapeutas gera receita secundária pesada que paga o aluguel do galpão." },
    { title: "Eventos e Simulações", desc: "Cobrar inscrições aos finais de semana para 'Simulados Hyrox' atrai público de outras academias e gera fluxo de caixa extra." }
  ];

  const cons = [
    { title: "Teto de Faturamento (Limitação Física)", desc: "A casa cheia fica em ~120 alunos. A operação gera fluxo de caixa estável (+14k), mas não permite mega-escala infinita no mesmo ponto." },
    { title: "Gestão Operacional Fina", desc: "A retenção dos profissionais de tatame (coaches) é crítica. Alta rotatividade de professores mata a comunidade e espanta clientes." },
    { title: "Manutenção e Desgaste", desc: "O uso intenso de remos, trenós e cordas exige gestão disciplinada de caixa para manutenção preventiva, senão o box ganha aspecto sucateado." }
  ];

  return (
    <motion.div className="section-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 className="section-title">Expansão de Receita & Riscos</h1>
        <p className="text-secondary" style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto' }}>
          Como escalar o negócio além das mensalidades, e quais os riscos reais da operação.
        </p>
      </div>

      <div className="grid-2">
        <div className="arena-side pro">
          <h2 style={{ textAlign: 'center', color: 'var(--success)', marginBottom: '2rem', fontSize: '2rem' }}>🟢 OPORTUNIDADES DE EXPANSÃO</h2>
          {expansao.map((p, i) => (
            <FadeIn delay={i * 0.1} key={i}>
              <div className="debate-item">
                <h3 style={{ color: 'var(--success)' }}><ShoppingBag size={20} /> {p.title}</h3>
                <p className="text-secondary">{p.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="arena-side con">
          <h2 style={{ textAlign: 'center', color: 'var(--danger)', marginBottom: '2rem', fontSize: '2rem' }}>🔴 DETRATORES E RISCOS</h2>
          {cons.map((c, i) => (
            <FadeIn delay={i * 0.1} key={i}>
              <div className="debate-item">
                <h3 style={{ color: 'var(--danger)' }}>{c.title}</h3>
                <p className="text-secondary">{c.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function EquipmentView() {
  const equips = [
    {
      name: "SkiErg Concept2",
      type: "Premium (Importado)",
      price: "R$ 8.900",
      desc: "O ergômetro oficial das competições. Para o modelo Otimista.",
      link: "https://somoslive360.com.br/produto/skierg-concept-2/",
      store: "Live360 (Concept2 BR)",
      img: "https://d1fitness.com.br/cdn/shop/files/Ergometros_Ski-Erg-D1-2023.jpg?v=1685042618&width=800"
    },
    {
      name: "SkiErg D1Fitness",
      type: "Combate (Nacional)",
      price: "R$ 4.720",
      desc: "Excelente custo-benefício. Mantém o CAPEX de 125k sem perder qualidade na puxada.",
      link: "https://www.d1fitness.com.br/collections/ergometros/products/ski-erg-d1",
      store: "D1Fitness Oficial",
      img: "https://d1fitness.com.br/cdn/shop/files/Ergometros_Ski-Erg-D1-2023.jpg?v=1685042618&width=800"
    },
    {
      name: "Air Remo Alpha BF860",
      type: "Combate / Premium",
      price: "R$ 7.286",
      desc: "Resistência a ar impecável, peças de reposição fáceis no Brasil.",
      link: "https://alphaequipamentos.com/produto/air-remo-bf860/",
      store: "Alpha Equipamentos",
      img: "https://alphaequipamentos.com/wp-content/uploads/2021/11/Air-Remo-BF860-2.jpg"
    },
    {
      name: "Trenó Sled Pro",
      type: "Acessório Base",
      price: "R$ 1.550",
      desc: "Compatível com as regras oficiais da pista de empurrar e puxar.",
      link: "https://3bfitness.com.br/produto/treno-pro-sled/",
      store: "3B Fitness",
      img: "https://3bfitness.com.br/wp-content/uploads/2021/04/Treno-Sled.jpg"
    },
    {
      name: "Esteira Curva Profissional",
      type: "Opcional (Comparativo)",
      price: "R$ 15.000 a R$ 30.000",
      desc: "Apenas para comparação. Como o Box usará a RUA para correr, economizamos R$ 100 mil ao não comprar esteiras.",
      link: "https://www.d1fitness.com.br",
      store: "Referência de Custo",
      img: "https://images.unsplash.com/photo-1576678927484-cc9079fa14eb?q=80&w=800&auto=format&fit=crop"
    }
  ];

  return (
    <motion.div className="section-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 className="section-title">Fornecedores & CAPEX</h1>
        <p className="text-secondary" style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto' }}>
          Seleção rigorosa de maquinário mapeado para o modelo Combate e Premium.
        </p>
      </div>

      <div className="grid-3">
        {equips.map((e, i) => (
          <FadeIn delay={i * 0.1} key={i}>
            <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '1.5rem' }}>
              <div className="eq-image-ph" style={{ backgroundImage: `url(${e.img})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#353b4d' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.2rem' }}>{e.name}</h3>
              </div>
              <h2 className="text-gradient" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{e.price}</h2>
              <span className="text-muted" style={{ fontSize: '0.8rem', background: '#353b4d', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold', display: 'inline-block', marginBottom: '1rem', width: 'fit-content' }}>
                  {e.type}
              </span>
              <p className="text-secondary" style={{ marginBottom: '1.5rem', flex: 1, fontSize: '0.9rem' }}>{e.desc}</p>
              
              <a href={e.link} target="_blank" rel="noreferrer" className="btn" style={{ width: '100%', fontSize: '0.8rem', padding: '0.8rem 1rem' }}>
                Ver na {e.store} <ExternalLink size={14} />
              </a>
            </div>
          </FadeIn>
        ))}
      </div>
    </motion.div>
  );
}
