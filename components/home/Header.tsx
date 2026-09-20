"use client";

import Image from "next/image";
import DeliveryAnimation from "./DeliveryAnimation";
import { Globe, Leaf, Flame, Bike } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Header() {
  const { language, toggleLanguage } = useLanguage();
  const isArabic = language === "ar";

  return (
    <header className="mb-8 w-full">
      <div className="relative overflow-hidden rounded-3xl border border-yellow-500/10 bg-gradient-to-r from-[#111111] via-[#18181B] to-[#111111] px-4 py-5 shadow-2xl sm:px-6">
        {/* Background Glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-500/10 blur-[55px]" />
        </div>

        <div className="relative flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between">
          {/* Logo */}
          <div className="group relative shrink-0">
            <div className="absolute inset-0 rounded-full bg-yellow-500/15 blur-xl opacity-0 transition duration-500 group-hover:opacity-100" />

            <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-black sm:h-24 sm:w-24">
              <Image
  src="/logo.png"
  alt="Rukun Dhijaj"
  fill
  priority
  sizes="120px"
  className="object-contain p-1 transition-transform duration-500 group-hover:scale-105"
/>
            </div>
          </div>

          {/* Brand */}
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <h1
              dir="rtl"
              className="text-2xl font-black leading-none text-yellow-400 sm:text-3xl"
            >
              ركن الدجاج
            </h1>

            <h2 className="mt-2 text-3xl font-extrabold uppercase tracking-[0.18em] text-white sm:text-5xl sm:tracking-[0.28em]">
              RUKUN
              <br className="sm:hidden" />
              <span className="sm:ml-3">DHIJAJ</span>
            </h2>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-sm text-zinc-400">
  <span className="flex items-center gap-1">
    <Leaf size={15} className="text-green-500" />
    {isArabic ? "طازج" : "Fresh"}
  </span>

  <span className="hidden text-zinc-600 sm:inline">•</span>

  <span className="flex items-center gap-1">
    <Flame size={15} className="text-orange-500" />
    {isArabic ? "مقرمش" : "Crispy"}
  </span>

  <span className="hidden text-zinc-600 sm:inline">•</span>

  <span className="flex items-center gap-1">
    <Bike size={15} className="text-yellow-500" />
    {isArabic ? "توصيل سريع" : "Fast Delivery"}
  </span>
</div>
</div> 

          {/* Language Switch */}
          <button
            onClick={toggleLanguage}
            className="flex h-11 items-center gap-2 rounded-xl border border-zinc-700 bg-[#1A1A1D] px-4 text-sm font-semibold text-white transition duration-300 hover:border-yellow-400 hover:bg-[#242428] sm:h-12"
          >
            <Globe size={18} />

            <span
              className={
                language === "ar"
                  ? "text-yellow-400"
                  : "text-zinc-400"
              }
            >
              AR
            </span>

            <span className="text-zinc-500">|</span>

            <span
              className={
                language === "en"
                  ? "text-yellow-400"
                  : "text-zinc-400"
              }
            >
              EN
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}