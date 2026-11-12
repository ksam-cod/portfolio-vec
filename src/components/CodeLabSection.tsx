import { useCallback, useEffect, useRef, useState } from 'react';
import { Check, Copy, Play, RotateCcw, Square } from 'lucide-react';

type LabModuleId = 'synth' | 'quadtree' | 'spring' | 'tokens';

interface LabModuleMeta {
  id: LabModuleId;
  title: string;
  subtitle: string;
  filename: string;
  code: string;
}

const LAB_MODULES: LabModuleMeta[] = [
  {
    id: 'synth',
    title: 'Web Audio Oscilloscope',
    subtitle: 'Real-time AudioContext synthesis & 60fps Canvas 2D trace',
    filename: 'useAudioSynth.ts',
    code: `// Lock-free Web Audio oscillator + AnalyserNode trace
const osc = audioCtx.createOscillator();
const analyser = audioCtx.createAnalyser();
const gain = audioCtx.createGain();

osc.type = waveform; // 'sine' | 'triangle' | 'square'
osc.frequency.setTargetAtTime(hz, audioCtx.currentTime, 0.015);
gain.gain.setTargetAtTime(0.14, audioCtx.currentTime, 0.02);

osc.connect(analyser);
analyser.connect(gain);
gain.connect(audioCtx.destination);
osc.start();`,
  },
  {
    id: 'quadtree',
    title: 'Spatial Quadtree Index',
    subtitle: 'Click canvas to insert points & query O(log n) radius neighbors',
    filename: 'SpatialQuadtree.ts',
    code: `export function queryRange(
  node: QuadNode,
  cx: number,
  cy: number,
  radius: number,
  found: Point[] = []
): Point[] {
  if (!intersectsCircle(node.bounds, cx, cy, radius)) return found;
  for (const p of node.points) {
    if (Math.hypot(p.x - cx, p.y - cy) <= radius) found.push(p);
  }
  if (node.divided) {
    node.children.forEach((child) => queryRange(child, cx, cy, radius, found));
  }
  return found;
}`,
  },
  {
    id: 'spring',
    title: 'Damped Spring Physics',
    subtitle: 'Harmonic motion integrator for tactile UI transitions',
    filename: 'springStep.ts',
    code: `export function stepSpring(
  position: number,
  velocity: number,
  target: number,
  stiffness: number,
  damping: number,
  dt: number
) {
  const force = -stiffness * (position - target);
  const damper = -damping * velocity;
  const accel = force + damper;
  const nextVel = velocity + accel * dt;
  const nextPos = position + nextVel * dt;
  return { position: nextPos, velocity: nextVel };
}`,
  },
  {
    id: 'tokens',
    title: 'WCAG Contrast & CSS Tokens',
    subtitle: 'Live relative luminance calculator & CSS custom property compiler',
    filename: 'contrastRatio.ts',
    code: `function luminance(hex: string): number {
  const rgb = hex.replace('#', '').match(/.{2}/g)!.map((c) => {
    const v = parseInt(c, 16) / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
}

export function getContrastRatio(fg: string, bg: string): number {
  const l1 = luminance(fg);
  const l2 = luminance(bg);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}`,
  },
];

// --- Helper math for WCAG Tokens ---
function hexLuminance(hex: string): number {
  const clean = hex.replace('#', '');
  if (clean.length !== 6) return 0;
  const rgb = [0, 2, 4].map((idx) => {
    const val = parseInt(clean.slice(idx, idx + 2), 16) / 255;
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
}

function calcContrastRatio(fg: string, bg: string): number {
  const l1 = hexLuminance(fg);
  const l2 = hexLuminance(bg);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

export function CodeLabSection() {
  const [activeId, setActiveId] = useState<LabModuleId>('synth');
  const [copied, setCopied] = useState(false);

  // Module 1: Web Audio Synth State
  const [isPlaying, setIsPlaying] = useState(false);
  const [frequency, setFrequency] = useState(220);
  const [waveform, setWaveform] = useState<'sine' | 'triangle' | 'square'>('triangle');
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const synthCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Module 2: Spatial Quadtree State
  const quadCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [points, setPoints] = useState<{ x: number; y: number }[]>(() =>
    Array.from({ length: 48 }, (_, i) => ({
      x: ((i * 73) % 460) + 30,
      y: ((i * 137) % 200) + 25,
    }))
  );
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number }>({ x: 260, y: 125 });
  const [queryRadius, setQueryRadius] = useState(65);

  // Module 3: Spring Physics State
  const [stiffness, setStiffness] = useState(180);
  const [damping, setDamping] = useState(14);
  const [springImpulse, setSpringImpulse] = useState(0);
  const springCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Module 4: Tokens & WCAG State
  const [fgColor, setFgColor] = useState('#111113');
  const [bgColor, setBgColor] = useState('#FAFAFA');

  const activeModule = LAB_MODULES.find((m) => m.id === activeId) ?? LAB_MODULES[0];

  // Clean up audio on unmount or tab switch
  const stopAudio = useCallback(() => {
    if (oscRef.current) {
      try {
        oscRef.current.stop();
        oscRef.current.disconnect();
      } catch {
        // Ignore already stopped
      }
      oscRef.current = null;
    }
    if (gainRef.current) {
      gainRef.current.disconnect();
      gainRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    if (activeId !== 'synth' && isPlaying) {
      stopAudio();
    }
  }, [activeId, isPlaying, stopAudio]);

  useEffect(() => {
    return () => stopAudio();
  }, [stopAudio]);

  const toggleSynth = () => {
    if (isPlaying) {
      stopAudio();
      return;
    }
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioCtx();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') {
      void ctx.resume();
    }

    const osc = ctx.createOscillator();
    const analyser = ctx.createAnalyser();
    const gain = ctx.createGain();

    analyser.fftSize = 1024;
    osc.type = waveform;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    gain.gain.setValueAtTime(0.12, ctx.currentTime);

    osc.connect(analyser);
    analyser.connect(gain);
    gain.connect(ctx.destination);
    osc.start();

    oscRef.current = osc;
    analyserRef.current = analyser;
    gainRef.current = gain;
    setIsPlaying(true);
  };

  useEffect(() => {
    if (oscRef.current && audioCtxRef.current) {
      oscRef.current.frequency.setTargetAtTime(frequency, audioCtxRef.current.currentTime, 0.015);
      oscRef.current.type = waveform;
    }
  }, [frequency, waveform]);

  // Draw Synth Oscilloscope
  useEffect(() => {
    if (activeId !== 'synth') return;
    const canvas = synthCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    const buffer = new Uint8Array(512);

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.fillStyle = '#111113';
      ctx.fillRect(0, 0, w, h);

      // Subtle reference grid
      ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.moveTo(0, h / 2);
      ctx.lineTo(w, h / 2);
      ctx.stroke();

      ctx.strokeStyle = '#60A5FA';
      ctx.lineWidth = 2;
      ctx.beginPath();

      if (isPlaying && analyserRef.current) {
        analyserRef.current.getByteTimeDomainData(buffer);
        const sliceWidth = w / buffer.length;
        for (let i = 0; i < buffer.length; i++) {
          const v = buffer[i] / 128.0;
          const y = (v * h) / 2;
          if (i === 0) ctx.moveTo(0, y);
          else ctx.lineTo(i * sliceWidth, y);
        }
      } else {
        // Preview mathematical waveform when silent
        const cycles = (frequency / 110) * 2;
        for (let x = 0; x <= w; x++) {
          const t = (x / w) * Math.PI * 2 * cycles;
          let sample = 0;
          if (waveform === 'sine') sample = Math.sin(t);
          else if (waveform === 'triangle') sample = (2 / Math.PI) * Math.asin(Math.sin(t));
          else sample = Math.sin(t) >= 0 ? 0.75 : -0.75;
          const y = h / 2 + sample * (h * 0.32);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      if (isPlaying) {
        rafId = requestAnimationFrame(draw);
      }
    };

    draw();
    return () => cancelAnimationFrame(rafId);
  }, [activeId, isPlaying, frequency, waveform]);

  // Draw Spatial Quadtree Canvas
  const matchedCount = points.filter(
    (p) => Math.hypot(p.x - cursorPos.x, p.y - cursorPos.y) <= queryRadius
  ).length;

  useEffect(() => {
    if (activeId !== 'quadtree') return;
    const canvas = quadCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, w, h);

    // Draw recursive quadtree visual subdivision boxes around dense regions
    const drawQuad = (x: number, y: number, qw: number, qh: number, pts: { x: number; y: number }[], depth: number) => {
      ctx.strokeStyle = 'rgba(17, 17, 19, 0.1)';
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, qw, qh);
      if (pts.length > 4 && depth < 5) {
        const hw = qw / 2;
        const hh = qh / 2;
        const quadrants = [
          { x, y, pts: pts.filter((p) => p.x < x + hw && p.y < y + hh) },
          { x: x + hw, y, pts: pts.filter((p) => p.x >= x + hw && p.y < y + hh) },
          { x, y: y + hh, pts: pts.filter((p) => p.x < x + hw && p.y >= y + hh) },
          { x: x + hw, y: y + hh, pts: pts.filter((p) => p.x >= x + hw && p.y >= y + hh) },
        ];
        quadrants.forEach((q) => drawQuad(q.x, q.y, hw, hh, q.pts, depth + 1));
      }
    };
    drawQuad(0, 0, w, h, points, 0);

    // Query radius circle
    ctx.fillStyle = 'rgba(37, 99, 235, 0.08)';
    ctx.strokeStyle = '#2563EB';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cursorPos.x, cursorPos.y, queryRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Draw points
    points.forEach((p) => {
      const inRange = Math.hypot(p.x - cursorPos.x, p.y - cursorPos.y) <= queryRadius;
      ctx.fillStyle = inRange ? '#2563EB' : '#71717A';
      ctx.beginPath();
      ctx.arc(p.x, p.y, inRange ? 4.5 : 3, 0, Math.PI * 2);
      ctx.fill();
    });
  }, [activeId, points, cursorPos, queryRadius]);

  // Draw Spring Physics Simulation
  useEffect(() => {
    if (activeId !== 'spring') return;
    const canvas = springCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    let pos = 0;
    let vel = 0;
    const target = 1;
    const dt = 1 / 60;
    const samples: number[] = [];

    for (let i = 0; i < 180; i++) {
      const force = -stiffness * (pos - target);
      const damper = -damping * vel;
      vel += (force + damper) * dt;
      pos += vel * dt;
      samples.push(pos);
    }

    let frame = 0;
    let raf = 0;

    const render = () => {
      ctx.fillStyle = '#FAFAFA';
      ctx.fillRect(0, 0, w, h);

      // Baseline target line
      const targetY = h * 0.38;
      ctx.strokeStyle = '#E4E4E7';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(0, targetY);
      ctx.lineTo(w - 90, targetY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw displacement curve
      ctx.strokeStyle = '#2563EB';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      samples.forEach((val, idx) => {
        const x = (idx / samples.length) * (w - 110) + 16;
        const y = h * 0.8 - val * (h * 0.42);
        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Animated target puck on right side
      const curVal = samples[Math.min(frame, samples.length - 1)] ?? 1;
      const puckY = h * 0.8 - curVal * (h * 0.42);
      ctx.fillStyle = '#111113';
      ctx.beginPath();
      ctx.arc(w - 48, puckY, 12, 0, Math.PI * 2);
      ctx.fill();

      if (frame < samples.length - 1) {
        frame += 2;
        raf = requestAnimationFrame(render);
      }
    };

    render();
    return () => cancelAnimationFrame(raf);
  }, [activeId, stiffness, damping, springImpulse]);

  const handleCopy = async () => {
    const textToCopy =
      activeId === 'tokens'
        ? `:root {\n  --surface-canvas: ${bgColor};\n  --ink-primary: ${fgColor};\n  --accent-cobalt: #2563EB;\n}`
        : activeModule.code;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const contrastRatio = calcContrastRatio(fgColor, bgColor);
  const wcagGrade = contrastRatio >= 7 ? 'AAA Pass' : contrastRatio >= 4.5 ? 'AA Pass' : 'Below AA';

  return (
    <section id="code-lab" className="py-20 lg:py-24 bg-white border-y border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h2
              className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#111113]"
              style={{ textWrap: 'balance' }}
            >
              Interactive Engineering &amp; Code Lab
            </h2>
            <p className="mt-3 text-base text-zinc-600 max-w-2xl">
              Runnable browser modules demonstrating real-time Web Audio synthesis, spatial indexing, spring physics, and WCAG token tooling alongside their TypeScript source.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Navigation List */}
          <div className="lg:col-span-4 space-y-2">
            {LAB_MODULES.map((mod, idx) => {
              const isSelected = mod.id === activeId;
              return (
                <button
                  key={mod.id}
                  type="button"
                  onClick={() => setActiveId(mod.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#2563EB] ${
                    isSelected
                      ? 'bg-[#FAFAFA] border-[#2563EB]'
                      : 'bg-white border-zinc-200 hover:border-zinc-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-display font-bold text-base text-[#111113]">
                      0{idx + 1}. {mod.title}
                    </span>
                    <span className="font-mono text-xs text-zinc-500 shrink-0">
                      {mod.filename}
                    </span>
                  </div>
                  <p className="mt-1 text-xs sm:text-sm text-zinc-600 leading-relaxed">
                    {mod.subtitle}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Live Interactive Playground + Source Code */}
          <div className="lg:col-span-8 rounded-2xl border border-zinc-200 bg-[#FAFAFA] overflow-hidden">
            {/* Interactive Canvas Area */}
            <div className="p-6 border-b border-zinc-200 bg-white">
              {activeId === 'synth' && (
                <div className="space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={toggleSynth}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                      >
                        {isPlaying ? (
                          <>
                            <Square className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                            Stop Tone
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                            Play Oscillator
                          </>
                        )}
                      </button>

                      <div className="inline-flex p-1 bg-zinc-100 rounded-lg border border-zinc-200">
                        {(['sine', 'triangle', 'square'] as const).map((wave) => (
                          <button
                            key={wave}
                            type="button"
                            onClick={() => setWaveform(wave)}
                            className={`px-3 py-1 text-xs font-medium rounded-md capitalize transition-colors cursor-pointer ${
                              waveform === wave
                                ? 'bg-white text-[#111113] shadow-xs'
                                : 'text-zinc-600 hover:text-[#111113]'
                            }`}
                          >
                            {wave}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <label htmlFor="synth-freq" className="text-xs font-medium text-zinc-600">
                        Frequency
                      </label>
                      <input
                        id="synth-freq"
                        type="range"
                        min={110}
                        max={880}
                        value={frequency}
                        onChange={(e) => setFrequency(Number(e.target.value))}
                        className="w-28 accent-[#2563EB] cursor-pointer"
                      />
                      <span className="font-mono text-xs font-medium text-[#111113] w-14 text-right tabular-nums">
                        {frequency} Hz
                      </span>
                    </div>
                  </div>

                  <canvas
                    ref={synthCanvasRef}
                    width={640}
                    height={210}
                    className="w-full h-[210px] rounded-xl border border-zinc-200 bg-[#111113]"
                  />
                </div>
              )}

              {activeId === 'quadtree' && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="text-sm text-zinc-600">
                      Click canvas to insert spatial nodes <span aria-hidden="true">·</span>{' '}
                      <span className="font-mono text-xs font-semibold text-[#111113] tabular-nums">
                        {matchedCount} / {points.length} nodes in radius
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      <label htmlFor="quad-radius" className="text-xs font-medium text-zinc-600 flex items-center gap-2">
                        Radius
                        <input
                          id="quad-radius"
                          type="range"
                          min={30}
                          max={130}
                          value={queryRadius}
                          onChange={(e) => setQueryRadius(Number(e.target.value))}
                          className="w-24 accent-[#2563EB] cursor-pointer"
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() =>
                          setPoints(
                            Array.from({ length: 48 }, (_, i) => ({
                              x: ((i * 73) % 460) + 30,
                              y: ((i * 137) % 200) + 25,
                            }))
                          )
                        }
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-700 bg-zinc-100 hover:bg-zinc-200 rounded-md cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                        Reset
                      </button>
                    </div>
                  </div>

                  <canvas
                    ref={quadCanvasRef}
                    width={640}
                    height={240}
                    onMouseMove={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const scaleX = e.currentTarget.width / rect.width;
                      const scaleY = e.currentTarget.height / rect.height;
                      setCursorPos({
                        x: (e.clientX - rect.left) * scaleX,
                        y: (e.clientY - rect.top) * scaleY,
                      });
                    }}
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const scaleX = e.currentTarget.width / rect.width;
                      const scaleY = e.currentTarget.height / rect.height;
                      const x = (e.clientX - rect.left) * scaleX;
                      const y = (e.clientY - rect.top) * scaleY;
                      setPoints((prev) => [...prev, { x, y }]);
                    }}
                    className="w-full h-[240px] rounded-xl border border-zinc-200 cursor-crosshair bg-white"
                  />
                </div>
              )}

              {activeId === 'spring' && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-5">
                      <label className="text-xs font-medium text-zinc-600 flex items-center gap-2">
                        Stiffness
                        <input
                          type="range"
                          min={60}
                          max={360}
                          value={stiffness}
                          onChange={(e) => setStiffness(Number(e.target.value))}
                          className="w-24 accent-[#2563EB] cursor-pointer"
                        />
                        <span className="font-mono text-[#111113] tabular-nums w-8">{stiffness}</span>
                      </label>
                      <label className="text-xs font-medium text-zinc-600 flex items-center gap-2">
                        Damping
                        <input
                          type="range"
                          min={4}
                          max={36}
                          value={damping}
                          onChange={(e) => setDamping(Number(e.target.value))}
                          className="w-24 accent-[#2563EB] cursor-pointer"
                        />
                        <span className="font-mono text-[#111113] tabular-nums w-6">{damping}</span>
                      </label>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSpringImpulse((n) => n + 1)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg cursor-pointer"
                    >
                      Trigger Impulse
                    </button>
                  </div>

                  <canvas
                    ref={springCanvasRef}
                    width={640}
                    height={210}
                    className="w-full h-[210px] rounded-xl border border-zinc-200 bg-[#FAFAFA]"
                  />
                </div>
              )}

              {activeId === 'tokens' && (
                <div className="space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-4">
                      <label className="flex items-center gap-2 text-xs font-medium text-zinc-700">
                        Ink Color
                        <input
                          type="color"
                          value={fgColor}
                          onChange={(e) => setFgColor(e.target.value)}
                          className="w-8 h-8 rounded cursor-pointer border border-zinc-300"
                        />
                        <span className="font-mono text-xs uppercase">{fgColor}</span>
                      </label>
                      <label className="flex items-center gap-2 text-xs font-medium text-zinc-700">
                        Surface Color
                        <input
                          type="color"
                          value={bgColor}
                          onChange={(e) => setBgColor(e.target.value)}
                          className="w-8 h-8 rounded cursor-pointer border border-zinc-300"
                        />
                        <span className="font-mono text-xs uppercase">{bgColor}</span>
                      </label>
                    </div>

                    <div className="text-sm font-mono font-medium text-[#111113] tabular-nums">
                      {contrastRatio.toFixed(2)}:1 <span aria-hidden="true">·</span> {wcagGrade}
                    </div>
                  </div>

                  <div
                    className="p-6 rounded-xl border border-zinc-200 transition-colors"
                    style={{ backgroundColor: bgColor, color: fgColor }}
                  >
                    <p className="font-display text-2xl font-bold tracking-tight">
                      Typography &amp; Surface Contrast Specimen
                    </p>
                    <p className="mt-2 text-sm opacity-90 max-w-xl">
                      Verifies real-time WCAG AA (4.5:1) and AAA (7.0:1) legibility budgets before compiling design tokens to production CSS variables.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Code Inspector Header + Source */}
            <div className="bg-[#111113] text-zinc-100">
              <div className="px-5 py-3 border-b border-zinc-800 flex items-center justify-between">
                <span className="font-mono text-xs text-zinc-400">{activeModule.filename}</span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-zinc-200 bg-zinc-800 hover:bg-zinc-700 rounded-md transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#60A5FA]" aria-hidden="true" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                      Copy Code
                    </>
                  )}
                </button>
              </div>
              <pre className="p-5 overflow-x-auto text-xs sm:text-sm leading-relaxed font-mono text-zinc-200">
                <code>
                  {activeId === 'tokens'
                    ? `:root {\n  --surface-canvas: ${bgColor};\n  --ink-primary: ${fgColor};\n  /* Contrast ratio: ${contrastRatio.toFixed(2)}:1 (${wcagGrade}) */\n}`
                    : activeModule.code}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
