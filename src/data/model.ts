// Modelo financeiro e catálogo do box. Todos os valores em R$.
// Preços de equipamento: lista pública vista em 08/10/2026 (Brave Fitness e Concept2/Live360).
// O que estiver marcado como "estimativa" precisa de orçamento real.

export type ScenarioId = 'conservador' | 'otimista';

export type EquipCategory = 'Ergômetros' | 'Corrida' | 'Trenó' | 'Carga' | 'Estrutura' | 'Piso' | 'Ambiente';

export interface EquipItem {
  id: string;
  name: string;
  pt: string; // o que é, em português simples
  category: EquipCategory;
  brand: string;
  unit: string;
  price: number;
  estimate?: boolean;
  min: number; // mínimo para a aula funcionar
  ideal: number; // quantidade confortável para turma cheia
  qty: Record<ScenarioId, number>;
  station?: string; // estação Hyrox que atende
  img?: string;
  search: string; // link de busca do produto na loja
  ml?: string; // busca no Mercado Livre
  mlRef?: string; // referência de preço vista no Mercado Livre
  note?: string;
}

const ml = (q: string) => `https://lista.mercadolivre.com.br/${q}`;
const g = (site: string, q: string) =>
  `https://www.google.com/search?q=${encodeURIComponent(`site:${site} ${q}`)}`;

export const equipment: EquipItem[] = [
  {
    id: 'ski-brave', name: 'SkiErg Brave', pt: 'Ergômetro de esqui: puxa dois cabos de cima para baixo, como bastões de esqui',
    category: 'Ergômetros', brand: 'Brave (nacional)', unit: 'un', price: 7990,
    min: 2, ideal: 4, qty: { conservador: 2, otimista: 3 }, station: 'SkiErg', img: 'skierg',
    search: g('bravefitness.com.br', 'ski erg'),
    ml: ml('ski-erg'), mlRef: 'D1 Echocross ~R$ 7.044; VO6 R$ 6.499',
  },
  {
    id: 'ski-c2', name: 'SkiErg Concept2', pt: 'O mesmo aparelho, da marca usada na prova oficial',
    category: 'Ergômetros', brand: 'Concept2 (importado)', unit: 'un', price: 12990,
    min: 0, ideal: 1, qty: { conservador: 0, otimista: 1 }, station: 'SkiErg', img: 'skierg',
    search: g('somoslive360.com.br', 'skierg concept2'),
    ml: ml('concept-2-skierg'), mlRef: 'usados aparecem bem abaixo do novo',
    note: 'Ter 1 oficial deixa o aluno simular a prova com o mesmo monitor e resistência.',
  },
  {
    id: 'row-brave', name: 'Remo Indoor Brave', pt: 'Remo seco: banco que desliza e corrente ligada a uma ventoinha de ar',
    category: 'Ergômetros', brand: 'Brave (nacional)', unit: 'un', price: 7899,
    min: 2, ideal: 4, qty: { conservador: 2, otimista: 3 }, station: 'Rowing', img: 'rowing',
    search: g('bravefitness.com.br', 'remo indoor'),
    ml: ml('remo-seco-air'), mlRef: 'Thanus, Consport, Hakon: R$ 4.390–5.690',
  },
  {
    id: 'row-c2', name: 'RowErg Concept2', pt: 'Remo oficial da prova',
    category: 'Ergômetros', brand: 'Concept2 (importado)', unit: 'un', price: 14990,
    min: 0, ideal: 1, qty: { conservador: 0, otimista: 1 }, station: 'Rowing', img: 'rowing',
    search: g('somoslive360.com.br', 'rowerg concept2'),
    ml: ml('remo-ergometro-concept-2'), mlRef: 'há usados à venda',
  },
  {
    id: 'bike', name: 'Bike Erg Brave', pt: 'Bicicleta a ar para aquecimento e treino de motor (não é estação da prova)',
    category: 'Ergômetros', brand: 'Brave (nacional)', unit: 'un', price: 7899,
    min: 0, ideal: 2, qty: { conservador: 0, otimista: 2 },
    search: g('bravefitness.com.br', 'bike erg'),
    ml: ml('air-bike-erg'),
  },
  {
    id: 'treadmill', name: 'Esteira curva', pt: 'Esteira sem motor, o próprio corredor move a lona. Serve para dia de chuva',
    category: 'Corrida', brand: 'Brave (nacional)', unit: 'un', price: 17990,
    min: 0, ideal: 2, qty: { conservador: 0, otimista: 1 },
    search: g('bravefitness.com.br', 'esteira curva'),
    ml: ml('esteira-curva'),
    note: 'No cenário conservador a rua é a pista. Duas esteiras custam R$ 36 mil.',
  },
  {
    id: 'sled', name: 'Sled (trenó) Push & Pull', pt: 'Trenó de aço que recebe anilhas. Empurra pelos postes ou puxa pela corda',
    category: 'Trenó', brand: 'Brave (nacional)', unit: 'un', price: 1499,
    min: 2, ideal: 3, qty: { conservador: 2, otimista: 0 }, station: 'Sled', img: 'sledpull',
    search: g('bravefitness.com.br', 'sled push pull'),
    ml: ml('sled-treno-crossfit'),
  },
  {
    id: 'sled-pro', name: 'Sled oficial 50 kg', pt: 'Trenó pesado no padrão de competição',
    category: 'Trenó', brand: 'Brave (nacional)', unit: 'un', price: 2499,
    min: 0, ideal: 3, qty: { conservador: 0, otimista: 3 }, station: 'Sled', img: 'sledpull',
    search: g('bravefitness.com.br', 'sled oficial'),
    ml: ml('sled-treno-crossfit'),
  },
  {
    id: 'rope', name: 'Corda para trenó 10 m', pt: 'Corda grossa para puxar o trenó mão após mão',
    category: 'Trenó', brand: 'Brave (nacional)', unit: 'un', price: 499,
    min: 2, ideal: 3, qty: { conservador: 2, otimista: 3 }, station: 'Sled Pull', img: 'sledpull',
    search: g('bravefitness.com.br', 'corda sled'),
    ml: ml('corda-sled'),
  },
  {
    id: 'kb', name: 'Kettlebells (kg)', pt: 'Pesos com alça. Pares de 16 e 24 kg para o farmers carry, outros para o treino',
    category: 'Carga', brand: 'Brave (nacional)', unit: 'kg', price: 20,
    min: 240, ideal: 400, qty: { conservador: 240, otimista: 400 }, station: 'Farmers Carry', img: 'farmers',
    search: g('bravefitness.com.br', 'kettlebell'),
    ml: ml('kettlebell-ferro'), note: 'R$ 16 a 28 por kg conforme o peso; usamos a média de R$ 20.',
  },
  {
    id: 'sandbag', name: 'Strong Bag (saco de areia)', pt: 'Saco de 10 a 20 kg apoiado nos ombros para o avanço',
    category: 'Carga', brand: 'Brave (nacional)', unit: 'un', price: 439,
    min: 4, ideal: 8, qty: { conservador: 4, otimista: 8 }, station: 'Sandbag Lunges', img: 'sandbag',
    search: g('bravefitness.com.br', 'strong bag'),
    ml: ml('sandbag-crossfit'),
  },
  {
    id: 'medball', name: 'Wall ball (med ball)', pt: 'Bola macia de 4 a 9 kg arremessada no alvo da parede',
    category: 'Carga', brand: 'Brave (nacional)', unit: 'un', price: 319,
    min: 6, ideal: 12, qty: { conservador: 6, otimista: 12 }, station: 'Wall Balls', img: 'wallballs',
    search: g('bravefitness.com.br', 'med ball'),
    ml: ml('wall-ball-crossfit'), mlRef: 'atenção: slam ball não quica, não serve para wall ball',
  },
  {
    id: 'target', name: 'Alvo de wall ball', pt: 'Alvo fixo na parede a 2,7 m (mulheres) ou 3 m (homens)',
    category: 'Estrutura', brand: 'Brave (nacional)', unit: 'un', price: 279,
    min: 3, ideal: 6, qty: { conservador: 3, otimista: 6 }, station: 'Wall Balls', img: 'wallballs',
    search: g('bravefitness.com.br', 'alvo wall ball'),
    ml: ml('alvo-wall-ball'),
  },
  {
    id: 'rack', name: 'Wall Rack 2 estações', pt: 'Estrutura de parede para alvos, barra fixa e elásticos',
    category: 'Estrutura', brand: 'Brave (nacional)', unit: 'un', price: 3899,
    min: 1, ideal: 1, qty: { conservador: 1, otimista: 0 },
    search: g('bravefitness.com.br', 'wall rack'),
    ml: ml('rack-parede-crossfit'),
  },
  {
    id: 'rack-elite', name: 'Elite Rack 4 estações', pt: 'Rig maior, de chão, para 4 estações de trabalho simultâneas',
    category: 'Estrutura', brand: 'Brave (nacional)', unit: 'un', price: 12900,
    min: 0, ideal: 1, qty: { conservador: 0, otimista: 1 },
    search: g('bravefitness.com.br', 'elite rack'),
    ml: ml('rig-crossfit'),
  },
  {
    id: 'acc', name: 'Caixas, halteres, elásticos, colchonetes', pt: 'Material de aquecimento e acessórios',
    category: 'Estrutura', brand: 'Diversos', unit: 'lote', price: 1000, estimate: true,
    min: 3, ideal: 6, qty: { conservador: 3, otimista: 6 },
    search: g('bravefitness.com.br', 'plyo box'),
    ml: ml('caixa-pliometrica'),
  },
  {
    id: 'floor', name: 'Piso de borracha 15 mm (m²)', pt: 'Absorve impacto e protege o contrapiso e os vizinhos',
    category: 'Piso', brand: 'Brave (nacional)', unit: 'm²', price: 125,
    min: 100, ideal: 150, qty: { conservador: 100, otimista: 150 },
    search: g('bravefitness.com.br', 'piso borracha'),
    ml: ml('piso-de-borracha-15mm'), mlRef: 'kits de placas 50×50: ~R$ 133–186/m²',
  },
  {
    id: 'turf', name: 'Grama sintética da raia (m²)', pt: 'A pista onde o trenó desliza. Raia de 2 m de largura',
    category: 'Piso', brand: 'Brave (nacional)', unit: 'm²', price: 65,
    min: 30, ideal: 50, qty: { conservador: 30, otimista: 50 }, station: 'Sled',
    search: g('bravefitness.com.br', 'grama sintética'),
    ml: ml('grama-sintetica-crossfit'),
  },
  {
    id: 'sound', name: 'Som, TV e cronômetro de parede', pt: 'Música, treino do dia na tela e relógio de prova',
    category: 'Ambiente', brand: 'Diversos', unit: 'kit', price: 2500, estimate: true,
    min: 1, ideal: 1, qty: { conservador: 1, otimista: 2 },
    search: 'https://www.google.com/search?q=cron%C3%B4metro+de+parede+crossfit',
    ml: ml('cronometro-crossfit'),
  },
  {
    id: 'fans', name: 'Ventilador industrial', pt: 'Ventilação no lugar de ar-condicionado',
    category: 'Ambiente', brand: 'Diversos', unit: 'un', price: 900, estimate: true,
    min: 3, ideal: 3, qty: { conservador: 3, otimista: 0 },
    search: 'https://www.google.com/search?q=ventilador+industrial+parede+academia',
    ml: ml('ventilador-industrial-parede'),
  },
];

export interface CapexLine { id: string; label: string; detail: string; value: Record<ScenarioId, number>; estimate?: boolean }

// Investimento além do equipamento
export const capexOther: CapexLine[] = [
  {
    id: 'obra', label: 'Obra e adaptação',
    detail: 'Conservador: aproveita os vestiários da antiga academia, pintura, identidade visual, iluminação e elétrica. Otimista: climatização (~R$ 30 mil), vestiários novos e recepção com café no mezanino.',
    value: { conservador: 20000, otimista: 65000 }, estimate: true,
  },
  { id: 'licencas', label: 'Licenças, PPCI e abertura da empresa', detail: 'Alvará, plano de incêndio (Lei Kiss), CNPJ, CREF, projetos.', value: { conservador: 6000, otimista: 8000 }, estimate: true },
  { id: 'garantia', label: 'Garantia do aluguel', detail: 'Seguro-fiança. Caução de 3 meses custaria ~R$ 25 mil, que voltam no fim.', value: { conservador: 8000, otimista: 8000 }, estimate: true },
  { id: 'afiliacao', label: 'Afiliação HYROX, 1º ano', detail: 'US$ 1.500/ano a ~R$ 5,40. Dá direito à marca, mapa oficial, treinos e cursos.', value: { conservador: 8100, otimista: 8100 } },
  { id: 'lancamento', label: 'Lançamento e pré-venda', detail: 'Aula aberta, anúncios, fotos, kit de fundador.', value: { conservador: 5000, otimista: 12000 }, estimate: true },
  { id: 'estoque', label: 'Estoque inicial da loja', detail: 'Camisetas, squeezes, grips, suplementos.', value: { conservador: 2000, otimista: 6000 }, estimate: true },
  { id: 'giro', label: 'Capital de giro', detail: 'Reserva para os meses em que a receita ainda não paga a operação.', value: { conservador: 70000, otimista: 80000 }, estimate: true },
];

export interface ScenarioParams {
  ticket: number;
  rent: number; // aluguel + IPTU
  classesPerDay: number; // dias úteis
  satClasses: number;
  capacity: number; // vagas por aula
  headCoach: number;
  perClass: number; // valor pago por aula extra
  headCoachClasses: number; // aulas/mês incluídas no salário do head coach
  reception: number;
  utilities: number;
  marketing: number;
  cleaning: number;
  accountant: number;
  software: number;
  fees: number; // ECAD, seguro, CREF
  maintenance: number;
  affiliation: number;
  taxRate: number; // Simples + cartão/app
  founders: number;
  newPerMonth: number;
  churn: number; // % ao mês
  avgFreq: number; // treinos por semana por aluno
  extrasPerStudent: number; // margem de loja/café por aluno/mês
  extrasFixed: number; // sublocação, eventos
}

export const scenarios: Record<ScenarioId, { name: string; tagline: string; params: ScenarioParams }> = {
  conservador: {
    name: 'Conservador',
    tagline: 'Equipamento nacional, corrida na rua, ventilação, ticket de ataque',
    params: {
      ticket: 249, rent: 8400, classesPerDay: 7, satClasses: 2, capacity: 14,
      headCoach: 5000, perClass: 50, headCoachClasses: 80, reception: 0,
      utilities: 1200, marketing: 1200, cleaning: 1000, accountant: 600, software: 300, fees: 500, maintenance: 400, affiliation: 700,
      taxRate: 0.10, founders: 35, newPerMonth: 11, churn: 5, avgFreq: 2.8,
      extrasPerStudent: 6, extrasFixed: 0,
    },
  },
  otimista: {
    name: 'Otimista',
    tagline: 'Concept2 para simular a prova, esteira, ar-condicionado, recepção e café',
    params: {
      ticket: 349, rent: 8400, classesPerDay: 8, satClasses: 3, capacity: 15,
      headCoach: 6000, perClass: 55, headCoachClasses: 80, reception: 2500,
      utilities: 3200, marketing: 2500, cleaning: 1800, accountant: 700, software: 400, fees: 600, maintenance: 800, affiliation: 700,
      taxRate: 0.10, founders: 40, newPerMonth: 10, churn: 4, avgFreq: 2.8,
      extrasPerStudent: 14, extrasFixed: 1500,
    },
  },
};

export const equipTotal = (s: ScenarioId, qty?: Record<string, number>) =>
  equipment.reduce((sum, e) => sum + e.price * (qty ? qty[e.id] ?? 0 : e.qty[s]), 0);

export const capexOtherTotal = (s: ScenarioId, includeGiro = true) =>
  capexOther.reduce((sum, c) => (c.id === 'giro' && !includeGiro ? sum : sum + c.value[s]), 0);

export const classesPerMonth = (p: ScenarioParams) => Math.round(p.classesPerDay * 22 + p.satClasses * 4);

export function opexBreakdown(p: ScenarioParams) {
  const classes = classesPerMonth(p);
  const extraClasses = Math.max(0, classes - p.headCoachClasses);
  const staff = p.headCoach + extraClasses * p.perClass;
  const lines = [
    { label: 'Aluguel + IPTU', value: p.rent },
    { label: `Equipe técnica (head coach + ${extraClasses} aulas avulsas)`, value: staff },
    { label: 'Recepção / vendas', value: p.reception },
    { label: 'Energia, água e internet', value: p.utilities },
    { label: 'Marketing', value: p.marketing },
    { label: 'Limpeza', value: p.cleaning },
    { label: 'Manutenção e reposição', value: p.maintenance },
    { label: 'Contador', value: p.accountant },
    { label: 'Afiliação HYROX (US$ 130)', value: p.affiliation },
    { label: 'ECAD, seguro e CREF', value: p.fees },
    { label: 'Sistema de check-in', value: p.software },
  ].filter((l) => l.value > 0);
  return { lines, total: lines.reduce((s, l) => s + l.value, 0), classes, staff };
}

// Quantos alunos cabem: vagas da semana × lotação saudável ÷ frequência média
export function capacityStudents(p: ScenarioParams, fill = 0.75) {
  const weekly = (p.classesPerDay * 5 + p.satClasses) * p.capacity;
  return Math.floor((weekly * fill) / p.avgFreq);
}

export interface Stress {
  hype: boolean; // hype esfria no 2º ano
  rent: boolean; // aluguel +25%
  price: boolean; // concorrente: ticket −15%
  slow: boolean; // abertura lenta
  inflation: boolean; // custos +8% a.a. sem reajuste
  coach: boolean; // perde o head coach no mês 9
}
export const noStress: Stress = { hype: false, rent: false, price: false, slow: false, inflation: false, coach: false };

export interface MonthRow { mes: number; alunos: number; receita: number; custo: number; resultado: number; acumulado: number; caixa: number }

export function simulate(p: ScenarioParams, investment: number, giro: number, stress: Stress, months = 36) {
  const ticket = p.ticket * (stress.price ? 0.85 : 1);
  const rent = p.rent * (stress.rent ? 1.25 : 1);
  const base = opexBreakdown({ ...p, rent }).total;
  const cap = capacityStudents(p, 0.85);
  let alunos = stress.slow ? Math.round(p.founders * 0.35) : p.founders;
  let acumulado = -investment; // investimento sem o capital de giro
  let caixa = giro;
  let minCaixa = giro;
  let payback: number | null = null;
  const rows: MonthRow[] = [];
  for (let m = 1; m <= months; m++) {
    if (m > 1) {
      let novos = p.newPerMonth * (stress.slow ? 0.6 : 1);
      let churn = p.churn / 100;
      if (stress.hype && m > 12) { novos *= 0.5; churn += 0.03; }
      if (stress.coach && m === 9) churn += 0.15;
      alunos = Math.min(cap, alunos * (1 - churn) + novos);
    }
    const receita = alunos * ticket * (1 - p.taxRate) + alunos * p.extrasPerStudent + p.extrasFixed;
    const custo = base * (stress.inflation ? Math.pow(1.08, (m - 1) / 12) : 1);
    const resultado = receita - custo;
    acumulado += resultado;
    caixa += resultado;
    minCaixa = Math.min(minCaixa, caixa);
    if (payback === null && acumulado >= 0) payback = m;
    rows.push({ mes: m, alunos: Math.round(alunos), receita: Math.round(receita), custo: Math.round(custo), resultado: Math.round(resultado), acumulado: Math.round(acumulado), caixa: Math.round(caixa) });
  }
  const netPerStudent = ticket * (1 - p.taxRate) + p.extrasPerStudent;
  const breakEven = Math.ceil((base - p.extrasFixed) / netPerStudent);
  return { rows, payback, minCaixa, breakEven, cap, opex: base, netPerStudent, ticket };
}

export const brl = (v: number, digits = 0) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: digits, minimumFractionDigits: digits });
export const kbrl = (v: number) => {
  const a = Math.abs(v);
  const s = a >= 1000 ? `R$ ${(a / 1000).toLocaleString('pt-BR', { maximumFractionDigits: a >= 100000 ? 0 : 1 })} mil` : brl(a);
  return v < 0 ? `−${s}` : s;
};
