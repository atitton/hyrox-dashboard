# Box HYROX Jardim Itu · estudo de viabilidade

Apresentação interativa (uma página) de um box de HYROX na Rua Gomes de Freitas, 216, Jardim Itu-Sabará, Porto Alegre.

## Capítulos
1. **O esporte**: formato da prova, as 8 estações clicáveis (o que é cada uma, pesos Open/Pro), divisões e comparação com CrossFit e academia.
2. **O mercado**: números globais e do Brasil, calendário de provas, concorrência na cidade.
3. **O ponto**: fotos, dados do imóvel, por que o formato serve, concorrentes num raio de 1,5 km.
4. **O box por dentro**: planta proposta clicável e simulador de lotação (como 150 alunos cabem na grade).
5. **Equipamentos**: monte o box item a item (mínimo × ideal), Brave, Concept2 e Mercado Livre.
6. **Investimento e custos**: CAPEX dos cenários conservador e otimista, custo mensal, equipe e licenças.
7. **Stress test**: projeção de 36 meses com cenários de estresse (hype esfria, guerra de preço, aluguel, etc.).
8. **Arena, riscos e expansão**: debate de 10 agentes com votação, matriz de risco, plano B, expansão.

Navegação: barra superior em formato de pista; setas ← → pulam de capítulo.

## Rodar
```bash
npm install
npm run dev      # desenvolvimento
npm run build    # gera dist/ (site estático, base relativa)
```

## Onde mexer nos números
- `src/data/model.ts`: equipamentos, preços, quantidades, CAPEX, premissas dos cenários e o simulador.
- `src/data/content.ts`: textos do esporte, mercado, ponto, concorrentes, arena, riscos, expansão e fontes.

`material-original/` guarda as mídias e áudios originais do projeto; o site usa versões comprimidas em `public/media/`.
O histórico das conversas está em `CONVERSA_HISTORICO.md` e `ANALISE_SIMULACOES.md`.
