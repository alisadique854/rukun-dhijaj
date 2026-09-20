"use client";

import React from "react";
import { motion, useReducedMotion, Variants, TargetAndTransition } from "framer-motion";
import { Bike, Flame, Leaf } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function DeliveryAnimation() {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const shouldReduceMotion = useReducedMotion();

  // The cycle duration matches the text background transitions
  const containerVariants: Variants = {
    animate: {
      x: isArabic ? ["100vw", "-120vw"] : ["-100vw", "120vw"],
      transition: {
        duration: shouldReduceMotion ? 0 : 12,
        ease: "linear",
        repeat: Infinity,
        repeatDelay: 1,
      },
    },
  };

  // Static/Central text fades in out bright while bike is away, then dims slightly as bike passes through
  const staticTextVariants: Variants = {
    animate: {
      opacity: [1, 1, 0.25, 1],
      scale: [1, 1, 0.95, 1],
      transition: {
        duration: 13, // 12s active run + 1s delay loop matching main rhythm
        times: [0, 0.25, 0.55, 1],
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const itemVariants = (delayIndex: number): Variants => ({
    animate: {
      opacity: [0, 0, 1, 1],
      scale: [0.8, 0.8, 1, 1],
      transition: {
        duration: 12,
        times: [0, delayIndex * 0.05, delayIndex * 0.05 + 0.03, 1],
        repeat: Infinity,
        repeatDelay: 1,
      },
    },
  });

  const trailVariants: TargetAndTransition = {
    scaleX: [1, 1.4, 1],
    opacity: [0.3, 0.6, 0.3],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  const smokeVariants = (delay: number): TargetAndTransition => ({
    x: isArabic ? [0, 25] : [0, -25],
    y: [0, -12, -18],
    opacity: [0.8, 0.4, 0],
    scale: [0.5, 1.2, 0.3],
    transition: {
      duration: 0.5,
      delay: delay,
      repeat: Infinity,
      ease: "easeOut",
    },
  });

  return (
    <div className="relative w-full h-20 md:h-24 overflow-hidden bg-black/10 backdrop-blur-sm border-y border-amber-500/10 pointer-events-none select-none flex items-center justify-center">
      
      {/* Central Permanent Base Text (Becomes bright when bike left, fades/dims when bike enters center) */}
      <motion.div 
        variants={staticTextVariants}
        animate="animate"
        className={`flex items-center gap-2 md:gap-3 rounded-full border border-amber-500/10 bg-black/40 px-3 py-1.5 md:px-4 md:py-2 backdrop-blur-sm transition-all duration-700 ${
          isArabic ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {isArabic ? (
          <>
            <div className="flex items-center gap-1.5 text-emerald-400/80"><Leaf size={16} /><span className="text-xs md:text-sm font-medium">طازج</span></div>
            <span className="text-amber-500/20 text-xs md:text-sm">•</span>
            <div className="flex items-center gap-1.5 text-orange-500/80"><Flame size={16} /><span className="text-xs md:text-sm font-medium">مقرمش</span></div>
            <span className="text-amber-500/20 text-xs md:text-sm">•</span>
            <div className="flex items-center gap-1.5 text-amber-400/80"><Bike size={16} /><span className="text-xs md:text-sm font-medium">توصيل سريع</span></div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-1.5 text-amber-400/80"><Bike size={16} /><span className="text-xs md:text-sm font-medium">Fast Delivery</span></div>
            <span className="text-amber-500/20 text-xs md:text-sm">•</span>
            <div className="flex items-center gap-1.5 text-orange-500/80"><Flame size={16} /><span className="text-xs md:text-sm font-medium">Crispy</span></div>
            <span className="text-amber-500/20 text-xs md:text-sm">•</span>
            <div className="flex items-center gap-1.5 text-emerald-400/80"><Leaf size={16} /><span className="text-xs md:text-sm font-medium">Fresh</span></div>
          </>
        )}
      </motion.div>

      {/* Moving Active Scooter and Attached Glowing Text Badges */}
      <motion.div
        className={`absolute top-1/2 flex -translate-y-1/2 items-center gap-4 will-change-transform z-10 ${
          isArabic ? "flex-row-reverse" : "flex-row"
        }`}
        variants={containerVariants}
        animate="animate"
      >
        <div className={`relative h-14 w-16 md:h-16 md:w-20 flex-shrink-0 ${isArabic ? "scale-x-[-1]" : ""}`}>
          <motion.div
            className="w-full h-full"
            animate={
              shouldReduceMotion
                ? {}
                : {
                    y: [0, -2, 0, -1, 0],
                    rotate: [0, 0.8, 0, -0.4, 0],
                  }
            }
            transition={{
              duration: 0.4,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <svg
              viewBox="0 0 100 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full filter drop-shadow-[0_2px_8px_rgba(245,158,11,0.4)]"
            >
              {/* Delivery Rider */}
              <g id="delivery-rider">
                <path d="M42 34 L33 46 L45 52 L50 42 Z" fill="#b45309" stroke="#fbbf24" strokeWidth="1" />
                <circle cx="46" cy="24" r="7" fill="#1e1b4b" stroke="#fbbf24" strokeWidth="1.5" />
                <path d="M49 21 L53 24 L49 27 Z" fill="#fbbf24" />
                <path d="M44 36 L56 36 L62 42" stroke="#b45309" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M44 36 L56 36 L62 42" stroke="#fbbf24" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              </g>

              {/* Scooter Chassis & Body */}
              <path
                d="M28 65 L38 44 L65 44 L72 54 L55 65 Z"
                fill="#111827"
                stroke="#d97706"
                strokeWidth="1.5"
              />
              <path d="M65 44 L75 27 L82 27" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M72 50 L84 50" stroke="#9ca3af" strokeWidth="2" />
              
              {/* Premium Delivery Box */}
              <rect
                x="10"
                y="22"
                width="26"
                height="26"
                rx="3"
                fill="#1e1b4b"
                stroke="#fbbf24"
                strokeWidth="2"
              />
              <path d="M10 35 L36 35" stroke="#d97706" strokeWidth="1" />
              <circle cx="15" cy="28" r="1.5" fill="#fbbf24" />
              <circle cx="31" cy="28" r="1.5" fill="#fbbf24" />

              {/* Wheels & Rim Spokes */}
              <g>
                <circle cx="30" cy="65" r="11" fill="#111827" stroke="#fbbf24" strokeWidth="1.5" />
                <circle cx="30" cy="65" r="7" fill="#374151" />
                <motion.circle
                  cx="30"
                  cy="65"
                  r="4"
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="2"
                  strokeDasharray="4 3"
                  animate={shouldReduceMotion ? {} : { rotate: 360 }}
                  transition={{ duration: 0.35, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: "30px 65px" }}
                />
              </g>

              <g>
                <circle cx="74" cy="65" r="11" fill="#111827" stroke="#fbbf24" strokeWidth="1.5" />
                <circle cx="74" cy="65" r="7" fill="#374151" />
                <motion.circle
                  cx="74"
                  cy="65"
                  r="4"
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="2"
                  strokeDasharray="4 3"
                  animate={shouldReduceMotion ? {} : { rotate: 360 }}
                  transition={{ duration: 0.35, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: "74px 65px" }}
                />
              </g>

              <path d="M43 49 L58 49" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />
              <path d="M48 45 L53 45" stroke="#111827" strokeWidth="2" />

              <path d="M82 25 L86 27 L82 29 Z" fill="#fbbf24" />
              <circle cx="86" cy="27" r="3" fill="#fff" className="animate-pulse" />
            </svg>
          </motion.div>

          {/* Engine Smoke */}
          <div className="absolute top-[32px] left-0 -translate-x-full flex flex-col items-center gap-1">
            <motion.div className="w-2 h-2 rounded-full bg-amber-500/40 blur-[1px]" animate={smokeVariants(0)} />
            <motion.div className="w-3 h-3 rounded-full bg-zinc-600/30 blur-[2px]" animate={smokeVariants(0.15)} />
            <motion.div className="w-1.5 h-1.5 rounded-full bg-amber-600/40 blur-[1px]" animate={smokeVariants(0.3)} />
          </div>

          {/* Golden Trail */}
          <motion.div
            className="absolute top-[44px] left-[-45px] w-14 h-4 bg-gradient-to-r from-transparent to-amber-500/25 blur-sm origin-right"
            animate={trailVariants}
          />
        </div>

        {/* Attached Text Badges */}
        <div className={`flex items-center gap-2 md:gap-3 rounded-full border border-amber-500/20 bg-black/85 px-3 py-1.5 md:px-4 md:py-2 backdrop-blur-md shadow-[0_4px_25px_rgba(0,0,0,0.95)] ${
          isArabic ? "flex-row-reverse" : "flex-row"
        }`}>
          {isArabic ? (
            <>
              <motion.div className="flex items-center gap-1.5 text-emerald-400" variants={itemVariants(1)} animate="animate">
                <Leaf size={16} className="md:w-5 md:h-5" />
                <span className="text-xs md:text-sm font-medium tracking-wide">طازج</span>
              </motion.div>
              <span className="text-amber-500/40 text-xs md:text-sm">•</span>
              <motion.div className="flex items-center gap-1.5 text-orange-500" variants={itemVariants(2)} animate="animate">
                <Flame size={16} className="md:w-5 md:h-5" />
                <span className="text-xs md:text-sm font-medium tracking-wide">مقرمش</span>
              </motion.div>
              <span className="text-amber-500/40 text-xs md:text-sm">•</span>
              <motion.div className="flex items-center gap-1.5 text-amber-400" variants={itemVariants(3)} animate="animate">
                <Bike size={16} className="md:w-5 md:h-5" />
                <span className="text-xs md:text-sm font-medium tracking-wide">توصيل سريع</span>
              </motion.div>
            </>
          ) : (
            <>
              <motion.div className="flex items-center gap-1.5 text-amber-400" variants={itemVariants(1)} animate="animate">
                <Bike size={16} className="md:w-5 md:h-5" />
                <span className="text-xs md:text-sm font-medium tracking-wide">Fast Delivery</span>
              </motion.div>
              <span className="text-amber-500/40 text-xs md:text-sm">•</span>
              <motion.div className="flex items-center gap-1.5 text-orange-500" variants={itemVariants(2)} animate="animate">
                <Flame size={16} className="md:w-5 md:h-5" />
                <span className="text-xs md:text-sm font-medium tracking-wide">Crispy</span>
              </motion.div>
              <span className="text-amber-500/40 text-xs md:text-sm">•</span>
              <motion.div className="flex items-center gap-1.5 text-emerald-400" variants={itemVariants(3)} animate="animate">
                <Leaf size={16} className="md:w-5 md:h-5" />
                <span className="text-xs md:text-sm font-medium tracking-wide">Fresh</span>
              </motion.div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}