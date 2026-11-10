# Hyrox Dashboard: estudo de viabilidade de um box

Painel interativo que montei para estudar a abertura de um box de Hyrox (o esporte de condicionamento que mistura corrida e estações funcionais) num bairro de Porto Alegre. O projeto não seguiu adiante, mas o estudo virou um bom exemplo de como apresentar uma decisão de investimento.

## O que o painel mostra

- **O ponto e o mercado:** perfil do bairro, concorrência e por que um salão comprido serve para a raia de trenó.
- **Dois cenários de investimento:** um modelo enxuto (CAPEX de ~R$ 125 mil) e um box completo (R$ 250 mil+).
- **O esporte:** o formato da prova e as 8 estações, para quem não conhece o Hyrox.
- **Stress test financeiro:** controles deslizantes para ticket médio, número de alunos e custos, com a curva de receita contra custo total e o ponto de equilíbrio.
- **Expansão e riscos:** fontes extras de receita e o que pode dar errado.
- **Fornecedores e CAPEX:** lista de equipamentos com custos.

O raciocínio completo dos números está em [`ANALISE_SIMULACOES.md`](ANALISE_SIMULACOES.md).

## Tecnologias

React · TypeScript · Vite · Recharts · Framer Motion

## Como rodar

```bash
npm install
npm run dev
```
