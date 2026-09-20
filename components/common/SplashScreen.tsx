"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

interface SplashScreenProps {
  show: boolean;
  onFinish: () => void;
}

export default function SplashScreen({ show, onFinish }: SplashScreenProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!show) return;

    const timer = setTimeout(() => {
      onFinish();
    }, 4500);

    return () => clearTimeout(timer);
  }, [show, onFinish]);

  const primaryGold = "from-yellow-200 via-amber-400 to-amber-600";
  const glowGold = "rgba(245,158,11,0.25)";

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.03,
            transition: { duration: 0.8, ease: "easeInOut" }
          }}
          className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#050402] via-[#020201] to-[#000000] will-change-transform"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 0.35 
            }}
            transition={{ 
              duration: 2, 
              ease: "easeOut" 
            }}
            className={`absolute h-[700px] w-[700px] rounded-full bg-gradient-to-r ${primaryGold} blur-[120px] pointer-events-none will-change-transform`}
          />

          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-55">
            {mounted && [...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute h-1 w-1 rounded-full bg-gradient-to-b ${primaryGold} shadow-[0_0_6px_rgba(251,191,36,0.6)] will-change-transform`}
                style={{
                  left: `${(i * 7) % 100}%`,
                  top: `${(i * 13) % 100}%`,
                }}
                animate={{
                  y: [0, -90, 0],
                  opacity: [0, 1, 0.4, 1, 0],
                }}
                transition={{
                  duration: 5 + (i % 5),
                  repeat: Infinity,
                  delay: (i % 4) * 0.8,
                  ease: "linear",
                }}
              />
            ))}
          </div>

          <div className="relative flex flex-col items-center">
            
            <div className="relative flex items-center justify-center h-44 w-44 pointer-events-none">
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1,
                }}
                transition={{
                  scale: { duration: 1, ease: "easeOut" },
                  opacity: { duration: 1.2 }
                }}
                className="relative flex items-center justify-center w-full h-full will-change-transform"
              >
                <Image
                  src="/calligraphy.png"
                  alt="Rukun Dhijaj"
                  width={210}
                  height={210}
                  priority
                  className="object-contain filter drop-shadow-[0_0_20px_rgba(251,191,36,0.4)]"
                />
              </motion.div>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
              className={`mt-1 text-4xl font-bold bg-gradient-to-b ${primaryGold} bg-clip-text text-transparent drop-shadow-[0_2px_12px_${glowGold}] text-center tracking-wide will-change-transform`}
            >
              ركن الدجاج
            </motion.h2>

            <div className="overflow-hidden mt-4 flex flex-col items-center">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className={`text-center text-5xl font-black tracking-[0.35em] mr-[-0.35em] bg-gradient-to-b ${primaryGold} bg-clip-text text-transparent drop-shadow-[0_4px_15px_rgba(0,0,0,0.6)] will-change-transform`}
              >
                RUKUN
                <br />
                <span className="text-4xl tracking-[0.4em] mr-[-0.4em] font-extrabold">DHIJAJ</span>
              </motion.h1>
            </div>

            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 140, opacity: 0.6 }}
              transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
              className="h-[1px] bg-gradient-to-r from-transparent via-amber-400 to-transparent mt-5 will-change-[width,opacity]"
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 1.5, ease: "easeOut" }}
              className={`mt-5 mr-[-0.6em] text-center text-xs font-bold bg-gradient-to-b ${primaryGold} bg-clip-text text-transparent uppercase tracking-[0.6em] drop-shadow-[0_0_10px_${glowGold}] will-change-transform`}
            >
              PREMIUM RESTAURANT
            </motion.p>

            <div className="mt-14 flex gap-3 items-center justify-center h-4">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className={`h-2.5 w-2.5 rounded-full bg-gradient-to-b ${primaryGold} shadow-[0_0_10px_rgba(245,158,11,0.8)] will-change-transform`}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 1.3,
                    repeat: Infinity,
                    delay: i * 0.28,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}