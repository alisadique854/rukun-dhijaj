"use client";

import Image from "next/image";
import Link from "next/link";

import {
  MessageCircle,
  Phone,
  Star,
  Clock3,
  Truck,
  ShieldCheck,
} from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";
import { getTranslations } from "@/lib/translations";

export default function HeroBanner() {
  const { language, isRTL } = useLanguage();
  const t = getTranslations(language);

  const handleWhatsAppOrder = () => {
    const phone = "966556127369";

    const message = t.hero.whatsappMessage;

    const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
      message
    )}`;

    window.location.href = waUrl;
  };

  // Restaurant Phone
  const callNumber = "966556127369";

  // Feature Chips
  const featureItems = isRTL
    ? [
        {
          icon: Truck,
          text: "توصيل سريع",
        },
        {
          icon: Clock3,
          text: "أكثر من 18 عاماً",
        },
        {
          icon: ShieldCheck,
          text: "طازج يومياً",
        },
        {
          icon: Star,
          text: "الأكثر مبيعاً",
        },
      ]
    : [
        {
          icon: Truck,
          text: "Fast Delivery",
        },
        {
          icon: Clock3,
          text: "18+ Years",
        },
        {
          icon: ShieldCheck,
          text: "Fresh Daily",
        },
        {
          icon: Star,
          text: "Best Seller",
        },
      ];

  return (
    <section className="relative mt-4 mb-8 w-full overflow-hidden rounded-[24px] border border-[#2d2208] bg-[#0d0d0d] shadow-xl sm:rounded-[28px]">

  {/* Background */}
  <div className="absolute inset-0">

    <Image
      src="/images/hero-banner.webp"
      alt="Hero Background"
      fill
      priority
      className="object-cover object-[78%] sm:object-right"
    />

    <div className="absolute inset-0 bg-black/55" />

    <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d] via-[#0d0d0d]/80 via-35% to-transparent" />

    <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,#ffb80022,transparent_55%)]" />

    <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0d0d0d] to-transparent" />

  </div>

  {/* Content */}
  <div
    dir={isRTL ? "rtl" : "ltr"}
    className="relative z-20 flex min-h-[470px] flex-col justify-center px-5 py-8 sm:min-h-[560px] sm:px-8 lg:px-16 lg:py-16 xl:px-20"
  >

    {/* 18 Years Badge */}
    <div className="mb-6">
      <div className="inline-flex items-center gap-2 rounded-full border border-[#ffb800]/30 bg-[#ffb800]/10 px-4 py-2 backdrop-blur-md">

        <Star className="h-4 w-4 fill-[#ffb800] text-[#ffb800]" />

        <span className="text-xs font-bold uppercase tracking-widest text-[#ffb800]">
          {isRTL
            ? "أكثر من 18 عاماً من الطعم المميز"
            : "18+ Years of Delicious Taste"}
        </span>

      </div>
    </div>

    {/* Heading */}

    <h1 className="leading-[1.1] tracking-tight">

      <span className="block text-3xl font-extrabold text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
        {t.hero.title1}
      </span>

      <span className="mt-2 block text-3xl font-extrabold text-[#ffb800] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
        {t.hero.title2}
      </span>

    </h1>
        {/* Subtitle */}

    <p className="mt-6 flex flex-wrap items-center gap-y-2 text-sm font-medium text-neutral-200 sm:text-base md:text-lg">
      {t.hero.subtitle.map((item, index) => (
        <span key={item} className="flex items-center">
          {index > 0 && (
            <span className="mx-2 text-[#ffb800]">•</span>
          )}
          <span>{item}</span>
        </span>
      ))}
    </p>

    {/* Description */}

    <p className="mt-5 max-w-2xl text-sm leading-relaxed text-neutral-300 sm:text-base md:text-lg">
      {t.hero.description}
    </p>

    {/* Feature Chips */}

    <div className="mt-7 flex flex-wrap gap-3">

      {featureItems.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={index}
            className="
              flex
              items-center
              gap-2
              rounded-full
              border
              border-white/10
              bg-white/5
              px-4
              py-2
              backdrop-blur-md
            "
          >
            <Icon className="h-4 w-4 text-[#ffb800]" />

            <span className="text-sm font-medium text-white">
              {item.text}
            </span>
          </div>
        );
      })}

    </div>
        {/* Buttons */}

    <div className="mt-8 flex flex-col gap-3 sm:flex-row">

      {/* WhatsApp */}
      <button
        onClick={handleWhatsAppOrder}
        className="
          flex
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-[#ffb800]
          px-6
          py-3
          font-bold
          text-black
          transition-all
          duration-300
          hover:scale-[1.03]
          hover:bg-[#e6a500]
        "
      >
        <MessageCircle className="h-5 w-5" />
        {t.hero.whatsapp}
      </button>

      {/* Call */}
      <Link
        href={`tel:${callNumber}`}
        className="
          flex
          items-center
          justify-center
          gap-2
          rounded-xl
          border
          border-[#ffb800]
          bg-black/30
          px-6
          py-3
          font-bold
          text-white
          backdrop-blur-md
          transition-all
          duration-300
          hover:bg-[#ffb800]
          hover:text-black
        "
      >
        <Phone className="h-5 w-5" />
        {isRTL ? "اتصل الآن" : "Call Now"}
      </Link>

    </div>

    {/* Stats */}

    <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">

      <div>
        <h3 className="text-3xl font-extrabold text-[#ffb800]">
          18+
        </h3>
        <p className="mt-1 text-sm text-neutral-300">
          {isRTL ? "سنة" : "Years"}
        </p>
      </div>

      <div>
        <h3 className="text-3xl font-extrabold text-[#ffb800]">
          5K+
        </h3>
        <p className="mt-1 text-sm text-neutral-300">
          {isRTL ? "عملاء" : "Customers"}
        </p>
      </div>

      <div>
        <h3 className="text-3xl font-extrabold text-[#ffb800]">
          100%
        </h3>
        <p className="mt-1 text-sm text-neutral-300">
          {isRTL ? "طازج" : "Fresh"}
        </p>
      </div>

    </div>

  </div>

</section>
  );
}