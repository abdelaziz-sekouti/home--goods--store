import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const LETTERS = [
  { char: 'H', note: 'C4' },
  { char: 'o', note: 'D4' },
  { char: 'm', note: 'E4' },
  { char: 'e', note: 'F4' },
  { char: ' ', note: null },
  { char: 'S', note: 'G4' },
  { char: 't', note: 'A4' },
  { char: 'r', note: 'B4' },
];

const NOTES_FREQ: Record<string, number> = {
  C4: 261.63,
  D4: 293.66,
  E4: 329.63,
  F4: 349.23,
  G4: 392.0,
  A4: 440.0,
  B4: 493.88,
};

interface FloatingGood {
  icon: string;
  x: number;
  y: number;
  size: number;
  delay: number;
  drift: number;
  rotEnd: number;
}

const GOODS: FloatingGood[] = [
  { icon: '🪔', x: 12, y: 20, size: 34, delay: 0.0, drift: 18, rotEnd: 15 },
  { icon: '🏺', x: 85, y: 16, size: 36, delay: 0.12, drift: -14, rotEnd: -12 },
  { icon: '🪑', x: 6, y: 68, size: 30, delay: 0.24, drift: 16, rotEnd: 10 },
  { icon: '🪴', x: 90, y: 64, size: 32, delay: 0.36, drift: -12, rotEnd: -8 },
  { icon: '🛏️', x: 48, y: 10, size: 36, delay: 0.48, drift: 10, rotEnd: 6 },
  { icon: '🖼️', x: 28, y: 85, size: 28, delay: 0.6, drift: -18, rotEnd: -14 },
  { icon: '🕯️', x: 72, y: 82, size: 28, delay: 0.72, drift: 14, rotEnd: 12 },
  { icon: '📚', x: 18, y: 42, size: 26, delay: 0.84, drift: -10, rotEnd: -16 },
  { icon: '🛋️', x: 78, y: 44, size: 34, delay: 0.96, drift: 12, rotEnd: 8 },
  { icon: '🕐', x: 42, y: 76, size: 26, delay: 1.08, drift: -16, rotEnd: -10 },
  { icon: '🛁', x: 58, y: 55, size: 28, delay: 1.2, drift: 8, rotEnd: 14 },
  { icon: '📺', x: 35, y: 24, size: 30, delay: 1.32, drift: -12, rotEnd: -18 },
];

function createAudioCtx(): AudioContext | null {
  try {
    return new (window.AudioContext || (window as any).webkitAudioContext)();
  } catch {
    return null;
  }
}

function playPianoNote(ctx: AudioContext, freq: number) {
  const now = ctx.currentTime;

  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  osc1.type = 'triangle';
  osc1.frequency.setValueAtTime(freq, now);
  osc2.type = 'sine';
  osc2.frequency.setValueAtTime(freq * 2, now);

  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(2000, now);
  filter.frequency.exponentialRampToValueAtTime(400, now + 0.3);

  gain.gain.setValueAtTime(0.06, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

  osc1.connect(filter);
  osc2.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  osc1.start(now);
  osc2.start(now);
  osc1.stop(now + 0.5);
  osc2.stop(now + 0.5);
}

const KEY_WIDTH = 44;
const KEY_HEIGHT = 72;
const KEY_GAP = 4;

export default function WelcomePreloader({ onComplete }: { onComplete: () => void }) {
  const [show, setShow] = useState(true);
  const [activeKey, setActiveKey] = useState<number | null>(null);
  const [typedChars, setTypedChars] = useState<string[]>([]);
  const ctxRef = useRef<AudioContext | null>(null);

  const initAudio = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = createAudioCtx();
    }
  }, []);

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    document.addEventListener('click', initAudio, { once: true });
    document.addEventListener('touchstart', initAudio, { once: true });

    const playableLetters = LETTERS.filter((l) => l.char !== null);

    playableLetters.forEach((letter, idx) => {
      const globalIdx = LETTERS.indexOf(letter);
      const delay = 500 + idx * 200;

      timeouts.push(
        setTimeout(() => {
          setActiveKey(globalIdx);
          setTypedChars((prev) => [...prev, letter.char!]);

          if (ctxRef.current && ctxRef.current.state === 'running' && letter.note) {
            playPianoNote(ctxRef.current, NOTES_FREQ[letter.note]);
          }

          timeouts.push(
            setTimeout(() => setActiveKey(null), 150)
          );
        }, delay)
      );
    });

    timeouts.push(
      setTimeout(() => setShow(false), 3600)
    );

    return () => {
      timeouts.forEach(clearTimeout);
      document.removeEventListener('click', initAudio);
      document.removeEventListener('touchstart', initAudio);
    };
  }, []);

  const totalKeysWidth = LETTERS.length * (KEY_WIDTH + KEY_GAP) - KEY_GAP;

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ backgroundColor: '#f5f5f0' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Floating home goods */}
          {GOODS.map(({ icon, x, y, size, delay, drift, rotEnd }, i) => (
            <motion.div
              key={i}
              className="absolute select-none pointer-events-none"
              style={{ left: `${x}%`, top: `${y}%`, fontSize: size, marginLeft: -size / 2, marginTop: -size / 2 }}
              initial={{ opacity: 0, scale: 0, y: 100, filter: 'blur(8px)' }}
              animate={{
                opacity: [0, 0.65, 0.5],
                scale: [0, 1.05, 0.95],
                y: [100, drift * 0.5, drift],
                filter: 'blur(0px)',
                rotate: [0, rotEnd * 0.7, rotEnd],
              }}
              transition={{
                duration: 2.2,
                delay,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <motion.span
                className="block"
                animate={{ y: [0, -10, 0, 8, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: delay + 1.5,
                }}
              >
                {icon}
              </motion.span>
            </motion.div>
          ))}

          {/* Typed text display */}
          <motion.div
            className="relative z-10 flex items-center mb-20 h-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {LETTERS.map((letter, i) => {
              const isTyped = typedChars.includes(letter.char ?? '');
              const isActive = activeKey === i;

              if (letter.char === null) {
                return <div key={i} className="w-6" />;
              }

              return (
                <motion.span
                  key={i}
                  className="relative inline-block text-center"
                  style={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: '4.5rem',
                    lineHeight: 1,
                    fontWeight: i >= 5 ? 300 : 600,
                    fontStyle: i >= 5 ? 'italic' : 'normal',
                    width: KEY_WIDTH,
                  }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{
                    opacity: isTyped ? 1 : 0.12,
                    y: isTyped ? (isActive ? -6 : 0) : 0,
                    color: isActive ? '#3a3a28' : i >= 5 ? '#5A5A40' : '#404040',
                  }}
                  transition={{
                    opacity: { duration: 0.2 },
                    y: { type: 'spring', stiffness: 600, damping: 20 },
                    color: { duration: 0.1 },
                  }}
                >
                  {letter.char}

                  {/* Glow on active */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-lg"
                        style={{ backgroundColor: 'rgba(90, 90, 64, 0.06)' }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1.1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.1 }}
                      />
                    )}
                  </AnimatePresence>
                </motion.span>
              );
            })}
          </motion.div>

          {/* Piano keyboard */}
          <div className="relative z-10" style={{ perspective: '600px' }}>
            <div
              className="flex items-start"
              style={{ gap: KEY_GAP, width: totalKeysWidth }}
            >
              {LETTERS.map((letter, i) => {
                if (letter.char === null) {
                  return <div key={i} style={{ width: KEY_WIDTH + KEY_GAP }} />;
                }

                const isActive = activeKey === i;
                const isWhite = true;

                return (
                  <motion.div
                    key={i}
                    className="relative rounded-b-lg overflow-hidden"
                    style={{
                      width: KEY_WIDTH,
                      height: KEY_HEIGHT,
                      backgroundColor: isActive ? '#e8e8dc' : '#ffffff',
                      border: '1px solid #d5d5c8',
                      borderTop: 'none',
                      borderRadius: '0 0 6px 6px',
                      boxShadow: isActive
                        ? 'inset 0 2px 8px rgba(90,90,64,0.15)'
                        : '0 4px 12px rgba(0,0,0,0.1), inset 0 -2px 4px rgba(0,0,0,0.05)',
                      cursor: 'default',
                    }}
                    animate={{
                      y: isActive ? 3 : 0,
                      backgroundColor: isActive ? '#e8e8dc' : '#ffffff',
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 700,
                      damping: 18,
                    }}
                  >
                    {/* Key label */}
                    <span
                      className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-wider font-sans"
                      style={{ color: '#a0a090' }}
                    >
                      {letter.char}
                    </span>

                    {/* Key top reflection */}
                    <div
                      className="absolute top-0 left-0 right-0 h-2"
                      style={{
                        background: 'linear-gradient(to bottom, rgba(255,255,255,0.8), transparent)',
                      }}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Tagline */}
          <motion.p
            className="mt-12 text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-sans"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.6 }}
          >
            Handcrafted Home Goods
          </motion.p>

          {/* Progress bar */}
          <motion.div
            className="mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.5 }}
          >
            <div className="w-36 h-[1px] bg-neutral-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: '#5A5A40' }}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ delay: 1.9, duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
