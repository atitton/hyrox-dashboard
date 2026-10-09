import { motion, useInView, animate } from 'framer-motion';
import { useEffect, useRef, useState, type ReactNode } from 'react';

export const chapters = [
  { id: 'esporte', short: 'Esporte', title: 'O esporte' },
  { id: 'mercado', short: 'Mercado', title: 'O mercado' },
  { id: 'ponto', short: 'Ponto', title: 'O ponto' },
  { id: 'box', short: 'Box', title: 'O box por dentro' },
  { id: 'equipamentos', short: 'Equipamentos', title: 'Equipamentos' },
  { id: 'investimento', short: 'Investimento', title: 'Investimento e custos' },
  { id: 'simulador', short: 'Simulador', title: 'Stress test' },
  { id: 'riscos', short: 'Riscos', title: 'Arena, riscos e expansão' },
] as const;

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0.25, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function ChapterHead({ n, title, lead, kicker }: { n: number; title: ReactNode; lead: ReactNode; kicker: string }) {
  return (
    <Reveal className="chapter-head">
      <div>
        <div className="eyebrow"><span className="bib">{String(n).padStart(2, '0')}</span>{kicker}</div>
        <h2>{title}</h2>
      </div>
      <p className="lead">{lead}</p>
    </Reveal>
  );
}

export function CountUp({ value, format }: { value: number; format: (v: number) => string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [shown, setShown] = useState(value);
  const prev = useRef(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(prev.current, value, { duration: 0.9, ease: 'easeOut', onUpdate: (v) => setShown(v) });
    prev.current = value;
    return () => c.stop();
  }, [value, inView]);
  return <span ref={ref}>{format(shown)}</span>;
}

export function Slider(props: {
  id: string; label: string; value: number; min: number; max: number; step: number;
  onChange: (v: number) => void; format?: (v: number) => string; hint?: string;
}) {
  const { id, label, value, min, max, step, onChange, format = String, hint } = props;
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="ctrl">
      <div className="ctrl-top">
        <label htmlFor={id}>{label}</label>
        <output htmlFor={id}>{format(value)}</output>
      </div>
      <input
        id={id} type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ background: `linear-gradient(90deg, var(--orange) ${pct}%, var(--track-bg, var(--graphite-3)) ${pct}%)` }}
      />
      {hint && <span className="hint">{hint}</span>}
    </div>
  );
}

export function Nav() {
  const [active, setActive] = useState(-1);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      setProgress(Math.min(1, doc.scrollTop / Math.max(1, doc.scrollHeight - doc.clientHeight)));
      const mid = window.innerHeight * 0.35;
      let idx = -1;
      chapters.forEach((c, i) => {
        const el = document.getElementById(c.id);
        if (el && el.getBoundingClientRect().top <= mid) idx = i;
      });
      setActive(idx);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, []);

  // Modo apresentação: setas e PageUp/PageDown pulam de capítulo
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
      const next = ['ArrowRight', 'PageDown'].includes(e.key);
      const prev = ['ArrowLeft', 'PageUp'].includes(e.key);
      if (!next && !prev) return;
      e.preventDefault();
      const target = next ? Math.min(chapters.length - 1, active + 1) : active - 1;
      if (target < 0) window.scrollTo({ top: 0, behavior: 'smooth' });
      else document.getElementById(chapters[target].id)?.scrollIntoView({ behavior: 'smooth' });
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active]);

  return (
    <nav className="nav" aria-label="Capítulos">
      <a className="brand" href="#topo"><b>BOX<i style={{ color: 'var(--orange-2)', fontStyle: 'normal' }}>·</i>ITU</b><span>HYROX · POA</span></a>
      <div className="track">
        <div className="track-line" />
        <motion.div className="track-fill" style={{ width: '100%' }} animate={{ scaleX: progress }} transition={{ duration: 0.15 }} />
        <div className="track-runner" style={{ left: `${progress * 100}%` }} />
        <div className="track-stops">
          {chapters.map((c, i) => (
            <button
              key={c.id}
              className={`stop ${i < active ? 'done' : ''} ${i === active ? 'on' : ''}`}
              onClick={() => document.getElementById(c.id)?.scrollIntoView({ behavior: 'smooth' })}
              title={c.title}
              aria-label={`Ir para ${c.title}`}
            >
              <i />
              <span>{i + 1}·{c.short}</span>
            </button>
          ))}
        </div>
      </div>
      <span className="nav-key"><kbd>←</kbd><kbd>→</kbd> capítulos</span>
    </nav>
  );
}

export function BgVideo({ name, className }: { name: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { margin: '200px' });
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (inView) v.play().catch(() => undefined); else v.pause();
  }, [inView]);
  return (
    <video ref={ref} className={className} muted loop playsInline preload="metadata" poster={`media/${name}-poster.jpg`} aria-hidden="true">
      <source src={`media/${name}.mp4`} type="video/mp4" />
    </video>
  );
}
