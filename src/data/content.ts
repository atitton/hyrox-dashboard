export interface Station {
  n: number;
  name: string;
  pt: string;
  distance: string;
  how: string;
  works: string;
  openM: string;
  openW: string;
  pro: string;
  equipment: string;
  img?: string;
  video?: string;
}

export const stations: Station[] = [
  {
    n: 1, name: 'SkiErg', pt: 'Ergômetro de esqui', distance: '1.000 m',
    how: 'O atleta fica em pé e puxa dois cabos de cima para baixo, dobrando quadril e joelhos, como quem empurra bastões de esqui na neve. A ventoinha cria a resistência.',
    works: 'Costas, ombros, tríceps e abdômen. Cansa o pulmão logo na largada.',
    openM: '1.000 m', openW: '1.000 m', pro: '1.000 m', equipment: 'SkiErg (Concept2 na prova)', img: 'skierg',
  },
  {
    n: 2, name: 'Sled Push', pt: 'Empurrar o trenó', distance: '50 m',
    how: 'Empurrar um trenó carregado de anilhas sobre grama sintética, em 4 trechos de 12,5 m, segurando nos postes verticais.',
    works: 'Pernas inteiras e glúteos. É a estação mais pesada da prova.',
    openM: '152 kg', openW: '102 kg', pro: '202 kg (H) / 152 kg (M)', equipment: 'Trenó + anilhas + raia de grama', video: 'cena-treno',
  },
  {
    n: 3, name: 'Sled Pull', pt: 'Puxar o trenó', distance: '50 m',
    how: 'De costas para a raia, o atleta puxa o trenó pela corda, mão após mão, e caminha para trás para recuperar espaço.',
    works: 'Costas, braços, pegada e posteriores de coxa.',
    openM: '103 kg', openW: '78 kg', pro: '153 kg (H) / 103 kg (M)', equipment: 'Trenó + corda de 10 m', img: 'sledpull',
  },
  {
    n: 4, name: 'Burpee Broad Jumps', pt: 'Burpee com salto à frente', distance: '80 m',
    how: 'Deita no chão (peito encosta), levanta e salta para a frente com os dois pés juntos. Repete até cobrir 80 metros.',
    works: 'Corpo todo e explosão. Não usa equipamento.',
    openM: 'peso corporal', openW: 'peso corporal', pro: 'peso corporal', equipment: 'Nenhum, só espaço livre', img: 'burpee',
  },
  {
    n: 5, name: 'Rowing', pt: 'Remo seco', distance: '1.000 m',
    how: 'Sentado num banco que desliza, empurra com as pernas e puxa o puxador até o peito, num ciclo contínuo.',
    works: 'Pernas, costas e braços em sequência. Fôlego.',
    openM: '1.000 m', openW: '1.000 m', pro: '1.000 m', equipment: 'Remo indoor (Concept2 na prova)', img: 'rowing',
  },
  {
    n: 6, name: 'Farmers Carry', pt: 'Caminhada do fazendeiro', distance: '200 m',
    how: 'Caminhar rápido segurando um kettlebell pesado em cada mão, braços estendidos ao lado do corpo.',
    works: 'Pegada, ombros, abdômen e postura.',
    openM: '2 × 24 kg', openW: '2 × 16 kg', pro: '2 × 32 kg (H) / 2 × 24 kg (M)', equipment: 'Pares de kettlebells', img: 'farmers',
  },
  {
    n: 7, name: 'Sandbag Lunges', pt: 'Avanço com saco de areia', distance: '100 m',
    how: 'Com o saco de areia apoiado nos ombros, dá passadas longas, encostando o joelho de trás no chão a cada passo.',
    works: 'Coxas, glúteos e equilíbrio. Queima muito a perna.',
    openM: '20 kg', openW: '10 kg', pro: '30 kg (H) / 20 kg (M)', equipment: 'Sacos de areia (sandbags)', img: 'sandbag',
  },
  {
    n: 8, name: 'Wall Balls', pt: 'Arremesso de bola na parede', distance: '100 repetições',
    how: 'Agacha segurando uma bola macia e, ao subir, arremessa a bola num alvo alto na parede. Pega a bola na volta e já desce para o próximo agachamento.',
    works: 'Pernas, ombros e fôlego. É a última estação, quando o corpo já está no limite.',
    openM: '6 kg · alvo a 3 m', openW: '4 kg · alvo a 2,7 m', pro: '9 kg (H) / 6 kg (M)', equipment: 'Med balls + alvo na parede', img: 'wallballs',
  },
];

export const divisions = [
  { name: 'Open', desc: 'Categoria de entrada, pesos mais leves. É onde está a maioria.' },
  { name: 'Pro', desc: 'Pesos maiores, para quem já treina sério e busca ranking.' },
  { name: 'Doubles', desc: 'Dupla: os dois correm juntos e dividem o trabalho das estações.' },
  { name: 'Relay', desc: 'Equipe de 4: cada um faz 2 km e 2 estações. Ótimo para levar a turma do box.' },
];

export const comparison = {
  cols: ['HYROX', 'CrossFit', 'Academia tradicional'],
  rows: [
    { label: 'Movimentos', vals: ['Naturais: correr, empurrar, puxar, carregar', 'Técnicos: levantamento olímpico, ginástica', 'Máquinas e pesos livres'] },
    { label: 'Medo de lesão do iniciante', vals: ['Baixo', 'Alto', 'Baixo'] },
    { label: 'Prova oficial', vals: ['Sim, igual no mundo todo', 'Open anual online', 'Não'] },
    { label: 'Treino em turma', vals: ['Sim, com coach', 'Sim, com coach', 'Não, cada um por si'] },
    { label: 'Frequência do aluno', vals: ['Alta, 3× por semana', 'Alta', 'Baixa: paga e não vai'] },
    { label: 'Mensalidade em POA', vals: ['R$ 200–450', 'R$ 200–450', 'R$ 70–150'] },
  ],
};

export const market = {
  global: [
    { value: '1,5 mi', label: 'atletas competiram na temporada 2025/26', src: 'HYROX, via Athletech News' },
    { value: '2 mi+', label: 'é a meta para 2026/27', src: 'HYROX' },
    { value: '107', label: 'fins de semana de prova em 6 continentes', src: 'Athletech News' },
  ],
  brasil: [
    { value: '4.000+', label: 'atletas na edição anterior de São Paulo', src: 'Distrito Anhembi' },
    { value: '400+', label: 'boxes e academias afiliadas no Brasil (ago/2026)', src: 'Diário do Nordeste' },
    { value: '0', label: 'provas no Sul do país', src: 'calendário oficial' },
  ],
  calendar: [
    { date: '28 fev 2026', city: 'Fortaleza', where: 'Centro de Eventos do Ceará', status: 'realizada' },
    { date: '17–18 out 2026', city: 'São Paulo', where: 'Distrito Anhembi · 3ª edição', status: 'próxima' },
    { date: '21–22 nov 2026', city: 'Rio de Janeiro', where: '2ª edição', status: 'confirmada' },
  ],
};

export const place = {
  address: 'Rua Gomes de Freitas, 216',
  hood: 'Jardim Itu-Sabará · Zona Norte de Porto Alegre',
  maps: 'https://www.google.com/maps/search/?api=1&query=Rua+Gomes+de+Freitas+216+Porto+Alegre',
  facts: [
    { k: 'Térreo', v: '220 m²', d: 'área de treino, toda no chão firme' },
    { k: 'Mezanino', v: '80 m²', d: 'recepção, vestiários, loja e café' },
    { k: 'Aluguel', v: 'R$ 8.000', d: '+ ~R$ 400 de IPTU, cerca de R$ 27/m²' },
    { k: 'Histórico', v: '18 anos', d: 'de academia no mesmo endereço (antiga NitroGym)' },
    { k: 'Bairro', v: '31 mil', d: 'moradores, residencial, classe média-alta' },
    { k: 'Acesso', v: '400 m', d: 'da Av. Assis Brasil e do Terminal Triângulo' },
  ],
  why: [
    { t: 'Já é academia', d: 'Funcionou como academia por 18 anos. O público do bairro já tem o hábito de treinar ali, e a estrutura (banheiros, elétrica, contrapiso) reduz a obra.' },
    { t: 'Formato comprido', d: 'A raia do trenó precisa de comprimento, não de largura: na prova são trechos de 12,5 m. Um salão comprido acomoda raia de 15 a 20 m sem roubar a área de treino.' },
    { t: 'A rua é a pista', d: 'A prova tem 8 km de corrida. Correr na rua em volta do box substitui esteiras que custariam R$ 18 mil cada.' },
    { t: 'Mezanino separa as funções', d: 'Recepção, vestiários, loja e café sobem. O térreo inteiro fica para o treino, que é o que gera receita.' },
  ],
};

export const competitors = [
  { name: 'Engenharia do Corpo Grand Park', km: 0.4, type: 'Musculação', price: 'R$ 70–100/mês', hyrox: false },
  { name: 'Play Vitta (Jardim Itu)', km: 0.7, type: 'Academia', price: 'n/d', hyrox: false },
  { name: 'SuperForce Cristo', km: 0.9, type: 'CrossFit + HYROX · rede com 17 unidades no RS', price: 'R$ 200–440 nos apps', hyrox: true },
  { name: 'Action Fit (Jd. Lindóia)', km: 1.2, type: 'Academia', price: 'n/d', hyrox: false },
  { name: 'Moinhos Fitness', km: 1.2, type: 'Academia', price: 'n/d', hyrox: false },
  { name: 'Práxis (Assis Brasil)', km: 1.4, type: 'Academia', price: 'n/d', hyrox: false },
];

export const cityPlayers = [
  { name: 'SuperForce', where: 'Cristo, Petrópolis e São Geraldo', what: 'CrossFit + HYROX, a maior rede do Sul' },
  { name: 'CT011', where: 'Av. Pereira Barreto, 848', what: 'HYROX + cross training' },
  { name: 'Boxes de CrossFit', where: 'A cidade toda', what: 'Já têm ~60% do equipamento; adaptam com R$ 18–42 mil' },
  { name: 'BRUK Moema (referência)', where: 'São Paulo', what: 'Primeira academia boutique só de HYROX do Brasil' },
];

export interface Argument { side: 'pro' | 'con'; who: string; text: string }
export interface Round { title: string; pro: Argument; con: Argument; judge: 'pro' | 'con' | 'empate'; why: string }

export const arena: Round[] = [
  {
    title: 'Mercado e hype',
    pro: { side: 'pro', who: 'O Oportunista de Mercado', text: 'É o esporte fitness que mais cresce no planeta: 1,5 milhão de atletas na última temporada e meta de 2 milhões. O Brasil já tem 400 afiliadas e três provas, e o Sul nenhuma. Quem chega agora pega a onda antes de virar mar vermelho.' },
    con: { side: 'con', who: 'O Cético de Tendências', text: 'Paleta mexicana também foi hype. O CrossFit teve o auge e muitos boxes fecharam depois. Se o HYROX esfriar em 3 anos, sobra um galpão alugado com R$ 70 mil em ergômetros suados para revender pela metade.' },
    judge: 'pro', why: 'O crescimento é real e medido. Mas o Cético deixa uma condição: o box precisa sobreviver sem a marca.',
  },
  {
    title: 'Receita',
    pro: { side: 'pro', who: 'O Estrategista de Recorrência', text: 'Box vive de mensalidade recorrente no cartão. No dia 1º do mês você já sabe quanto entra. Planos semestrais e anuais pagam o equipamento mesmo quando o aluno falta.' },
    con: { side: 'con', who: 'O Analista do Teto Físico', text: 'São 220 m². Com turma cheia em todos os horários, o faturamento trava perto de R$ 40 a 50 mil por mês. A inflação sobe aluguel e luz todo ano, e repassar tudo para a mensalidade espanta aluno.' },
    judge: 'empate', why: 'Os dois estão certos. A recorrência dá previsibilidade, e o teto existe. A resposta está na expansão (round 5).',
  },
  {
    title: 'O ponto',
    pro: { side: 'pro', who: 'O Arquiteto do Espaço', text: 'Endereço com 18 anos de academia, salão comprido que vira raia de trenó, mezanino para tirar vestiário do caminho e uma rua boa para correr, que economiza esteiras. Raramente aparece um ponto tão pronto.' },
    con: { side: 'con', who: 'O Caçador de Concorrência', text: 'A SuperForce Cristo, rede com 17 unidades, já oferece HYROX a 900 metros. E qualquer box de CrossFit da cidade vira "HYROX" com R$ 18 a 42 mil em equipamento.' },
    judge: 'pro', why: 'A concorrência existe, mas é de rede e mista. O espaço de bairro, só de HYROX, com turma pequena, ainda está livre.',
  },
  {
    title: 'Operação',
    pro: { side: 'pro', who: 'O Construtor de Comunidade', text: 'Aluno de box vai em média 3 vezes por semana e fica muito mais tempo que aluno de academia comum, porque treina com a mesma turma. Aula com hora marcada e app de check-in organizam tudo.' },
    con: { side: 'con', who: 'O Operador Realista', text: 'Comunidade não paga folha. É coach que falta, CREF, aluno que se machuca, vizinho reclamando de música às 6h e alguém precisando abrir a porta todo dia de madrugada. É operação física pesada, todo dia.' },
    judge: 'con', why: 'O maior risco do negócio não está na planilha: é a presença diária nos horários de pico (6h e 18h–20h).',
  },
  {
    title: 'Escala',
    pro: { side: 'pro', who: 'O Expansionista', text: 'A unidade 1 é laboratório. Loja, café, recovery, eventos e planilhas online sobem a receita por aluno. Com o processo padronizado, a unidade 2 abre em outro bairro com o lucro da primeira.' },
    con: { side: 'con', who: 'O Guardião do Capital', text: 'Expansão é promessa. No cenário em que a abertura é lenta e o hype esfria, o caixa vai ao negativo e o dinheiro não volta. Esse capital rendendo em renda fixa não acorda às 5h.' },
    judge: 'pro', why: 'Escalar é possível, mas só depois da unidade 1 rodar sozinha. O stress test mostra quanto caixa aguenta o cenário ruim.',
  },
];

export const verdict = {
  winner: 'pro',
  score: '3 × 1, com um empate',
  headline: 'A ideia vence, por margem apertada, com três condições',
  conditions: [
    { t: 'Gestão presente no pico', d: 'Alguém responsável dentro do box às 6h e das 18h às 20h. Sem isso, a comunidade não se forma e a retenção cai.' },
    { t: 'Aceitar o teto', d: 'Uma unidade de 220 m² não deixa ninguém rico. Ela gera caixa e ensina a operar; a escala vem depois.' },
    { t: 'Não depender da marca', d: 'O produto é treino de condicionamento em turma. Se o HYROX esfriar, o aluno precisa continuar pelo treino, pelo coach e pela turma.' },
  ],
};

export const risks = [
  { t: 'O hype esfria', p: 'média', i: 'alto', m: 'Posicionar como treino híbrido de condicionamento. A marca HYROX é o gancho, não o produto. Run club e ciclos de preparação mantêm o aluno.' },
  { t: 'Concorrente baixa o preço', p: 'média', i: 'médio', m: 'Não brigar por preço com rede. Diferencial: turma pequena, coach que sabe o nome do aluno, viagem em grupo às provas.' },
  { t: 'Coach principal sai e leva a turma', p: 'média', i: 'alto', m: 'Comunidade ligada ao box, não a uma pessoa. Bônus por retenção para o head coach e dois coaches que conhecem a turma.' },
  { t: 'Barulho e vizinhos', p: 'alta', i: 'médio', m: 'Piso de 15 mm, volume combinado no primeiro horário, conversa com vizinhos antes de abrir.' },
  { t: 'Chuva e inverno', p: 'alta', i: 'baixo', m: 'Dias de chuva viram treino de ergômetros. No cenário otimista, uma esteira curva cobre a corrida.' },
  { t: 'Apps pagam pouco', p: 'alta', i: 'baixo', m: 'Wellhub e TotalPass rendem R$ 8 a 25 por visita. Usar só para encher horário vazio, nunca como base.' },
  { t: 'Contrato de aluguel curto', p: 'baixa', i: 'alto', m: 'Contrato de 5 anos ou mais garante o direito de renovação e protege o dinheiro da obra.' },
  { t: 'Desgaste do equipamento', p: 'alta', i: 'baixo', m: 'Manutenção preventiva mensal no orçamento. Equipamento sucateado espanta o aluno premium.' },
];

export const planB = [
  'Rebatizar as aulas como "treino híbrido" e manter o mesmo formato, sem pagar afiliação',
  'Run club aberto aos sábados, saindo do box, para trazer corredores do bairro',
  'Personal e pequenos grupos nos horários ociosos (10h às 16h)',
  'Equipamento Concept2 revende por 70 a 80% do valor; o nacional, por ~50 a 60%',
];

export const expansion = {
  vertical: [
    { t: 'Loja', d: 'Camisetas, moletons, grips, squeezes e suplementos com a marca do box. Margem alta e nenhum custo de aquisição: o cliente já está lá.', v: 'R$ 4–14 por aluno/mês de margem' },
    { t: 'Café pré e pós-treino', d: 'Balcão no mezanino com espresso, água, isotônico e whey batido. O público toma café antes do treino e fica conversando depois.', v: 'paga luz e água do espaço' },
    { t: 'Sublocação', d: 'Uma sala de 15 m² no mezanino para fisioterapeuta, nutricionista ou massagista esportivo.', v: '~R$ 1.500/mês' },
    { t: 'Recovery', d: 'Banheira de gelo e botas de compressão como plano adicional.', v: '+R$ 50 na mensalidade' },
    { t: 'Simulados e eventos', d: 'Simulado HYROX aos sábados, com inscrição aberta a outros boxes da cidade.', v: '60 atletas × R$ 100 por evento' },
    { t: 'Horários ociosos', d: 'Das 10h às 16h o box fica vazio: personal, pequenos grupos e assessoria.', v: 'receita sobre espaço morto' },
  ],
  horizontal: [
    { year: 'Ano 1', t: 'Unidade 1 cheia', d: 'Gomes de Freitas atinge o ponto de equilíbrio e passa a rodar com head coach e processo escrito.' },
    { year: 'Ano 2', t: 'Manual do box', d: 'Grade, treinos, vendas, onboarding de aluno e checklist de abertura viram um padrão que se repete.' },
    { year: 'Ano 3', t: 'Unidade 2', d: 'Outro bairro de perfil parecido (Moinhos de Vento, Tristeza, Petrópolis) financiado pelo lucro da unidade 1.' },
    { year: 'Ano 3+', t: 'Digital e eventos', d: 'Planilhas online de preparação para quem treina fora de POA e uma competição local do Sul.' },
  ],
};

export const licenses = [
  { t: 'Viabilidade', d: 'Consulta grátis na Prefeitura: a rua permite academia? Antes de assinar o aluguel.' },
  { t: 'CNPJ', d: 'CNAE 9313-1/00 (condicionamento físico), no Simples Nacional. O contador abre.' },
  { t: 'Alvará', d: 'Localização e funcionamento, pedido online na Prefeitura de Porto Alegre.' },
  { t: 'Bombeiros', d: 'Plano contra incêndio da Lei Kiss: extintores, luz de emergência, saídas.' },
  { t: 'CREF2/RS', d: 'A empresa se registra e indica um responsável técnico formado em Educação Física.' },
  { t: 'ECAD', d: 'Música ambiente paga direito autoral todo mês.' },
  { t: 'HYROX', d: 'Opcional. Libera a marca: US$ 130/mês ou US$ 1.500/ano, sem exigência de metragem.' },
  { t: 'Contrato', d: 'Uso "academia", carência durante a obra e prazo de 5 anos ou mais.' },
];

export const team = [
  { role: 'Head coach', qty: '1', cost: 'R$ 5–6 mil/mês', d: 'Monta os treinos, cuida da turma e dos ciclos de preparação para prova. Dá ~4 aulas por dia.' },
  { role: 'Coaches por aula', qty: '2 a 3', cost: 'R$ 50–55 por aula', d: 'Cobrem os outros horários. Todos com CREF ativo (Lei 9.696/98).' },
  { role: 'Gestão e vendas', qty: '1', cost: 'gestão própria', d: 'Financeiro, matrículas, retenção, compras, marketing. No otimista, há recepção contratada.' },
];

export const nextSteps = [
  'Medir o salão: comprimento, largura, pé-direito, banheiros e estado do piso',
  'Consulta de viabilidade na Prefeitura: a rua permite academia?',
  'Negociar o aluguel com 2 a 3 meses de carência para a obra e prazo de 5 anos',
  'Treinar como aluno na SuperForce Cristo e na CT011: preço, lotação e pico',
  'Abrir a lista de espera no bairro e no Instagram: meta de 50 nomes',
  'Fechar orçamento à vista com frete (Brave) e da obra',
];

export const dealBreakers = [
  'a Prefeitura não permitir academia no endereço',
  'o pé-direito for menor que 3,5 m (o alvo de wall ball fica a 3 m)',
  'a lista de espera não passar de 30 nomes',
  'ninguém puder estar no box nos horários de pico',
];

export const sources = [
  { t: 'Formato, pesos e divisões', s: 'hyrox.com' },
  { t: '1,5 mi atletas e 107 provas', s: 'athletechnews.com (jul/2026)' },
  { t: 'Provas no Brasil', s: 'distritoanhembi.com.br, hyrox.com, prommer.net' },
  { t: '400+ afiliadas no Brasil', s: 'Diário do Nordeste (ago/2026)' },
  { t: 'Afiliação e curso Level 1', s: 'vibefam.com, wodify.com, hyrox365.com' },
  { t: 'Preços de equipamento', s: 'bravefitness.com.br e Live360/Concept2, lidos em 08/10/2026' },
  { t: 'Aluguel e o ponto', s: 'chavesnamao.com.br (Gomes de Freitas, 08/10/2026)' },
  { t: 'Bairro', s: 'Censo 2010, auxiliadorapredial.com.br' },
  { t: 'Concorrentes e distâncias', s: 'wellhub.com, totalpass.com, superforce, OpenStreetMap' },
  { t: 'Licenças', s: 'prefeitura.poa.br, Lei Kiss (RS), crefrs.org.br' },
  { t: 'Salário de coach', s: 'Glassdoor' },
  { t: 'Repasse dos apps', s: 'remessaonline.com.br' },
];
