import { useMemo, useState } from 'react';
import { Nav } from './components/ui';
import { Hero, Sport } from './sections/Intro';
import { Inside, Market, Place } from './sections/Place';
import { Equipment, Investment, type Mode, type Qty } from './sections/Money';
import { Simulator } from './sections/Simulator';
import { Arena, Expansion, Finish, Risks } from './sections/Arena';
import { equipTotal, equipment, scenarios, type ScenarioId, type ScenarioParams } from './data/model';

export default function App() {
  const [mode, setMode] = useState<Mode>('conservador');
  const [qty, setQty] = useState<Qty>(() => Object.fromEntries(equipment.map((e) => [e.id, e.qty.conservador])));
  const [params, setAll] = useState<Record<ScenarioId, ScenarioParams>>({ conservador: scenarios.conservador.params, otimista: scenarios.otimista.params });

  // O cenário que estiver montado no capítulo de equipamentos usa as quantidades escolhidas
  const equipBy = useMemo(() => {
    const custom = equipTotal('conservador', qty);
    return {
      conservador: mode === 'conservador' || mode === 'custom' ? custom : equipTotal('conservador'),
      otimista: mode === 'otimista' ? custom : equipTotal('otimista'),
    };
  }, [qty, mode]);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Sport />
        <Market />
        <Place />
        <Inside />
        <Equipment mode={mode} setMode={setMode} qty={qty} setQty={setQty} />
        <Investment equipBy={equipBy} params={params} />
        <Simulator equipBy={equipBy} params={params} setParams={(s, p) => setAll((a) => ({ ...a, [s]: p }))} />
        <Arena />
        <Risks />
        <Expansion />
        <Finish />
      </main>
    </>
  );
}
