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
  Globe,
} from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";
import { getTranslations } from "@/lib/translations";

export default function HeroBanner() {
  const { language, isRTL, toggleLanguage } = useLanguage();
  const t = getTranslations(language);

  const handleWhatsAppOrder = () => {
    const phone = "966556127369";
    const message = t.hero.whatsappMessage;

    const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
      message
    )}`;

    window.location.href = waUrl;
  };

  const callNumber = "966556127369";

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
    <section
      className="
        relative
        mt-0
        mb-8
        -mx-4
        w-[calc(100%+2rem)]
        overflow-hidden
        bg-[#0d0d0d]
        sm:mx-0
        sm:w-full
      "
    >
      {/* =====================================================
          MOBILE HERO IMAGE
          Original: 1024 x 1536 = 2:3
          ===================================================== */}

      <div
        className="
          relative
          block
          aspect-[2/3]
          w-full
          sm:hidden
        "
      >
        <Image
          src="/images/hero-mobile.webp"
          alt="Chicken Corner Restaurant"
          fill
          priority
          sizes="100vw"
          className="
            object-contain
            object-top
          "
        />

        {/* Overall overlay */}
        <div className="absolute inset-0 bg-black/15" />

        {/* Top dark overlay */}
        <div
          className="
            pointer-events-none
            absolute
            inset-x-0
            top-0
            h-24
            bg-gradient-to-b
            from-[#0d0d0d]/90
            via-[#0d0d0d]/35
            to-transparent
          "
        />

        {/* Bottom fade */}
        <div
          className="
            pointer-events-none
            absolute
            inset-x-0
            bottom-0
            h-[48%]
            bg-gradient-to-t
            from-[#0d0d0d]
            via-[#0d0d0d]/45
            to-transparent
          "
        />
      </div>

      {/* =====================================================
          MOBILE HEADER
          ZERO EXTRA SPACE
          ===================================================== */}

      <div
        className="
          absolute
          inset-x-0
          top-0
          z-30
          flex
          items-start
          justify-between
          px-4
          pt-3
          sm:hidden
        "
      >
        {/* Mobile Brand - LEFT */}
        <div
          className="
            flex
            flex-col
            items-start
            justify-center
            leading-none
          "
        >
          {/* Arabic */}
          <div
            dir="rtl"
            className="
              text-[17px]
              font-black
              leading-none
              tracking-tight
              text-yellow-400
            "
          >
            ركن الدجاج
          </div>

          {/* English */}
          <div
            className="
              mt-1
              whitespace-nowrap
              text-[11px]
              font-bold
              leading-none
              tracking-[0.07em]
              text-white
            "
          >
            CHICKEN CORNER
          </div>
        </div>

        {/* Language Toggle - RIGHT */}
        <button
          type="button"
          onClick={toggleLanguage}
          aria-label="Change language"
          className="
            flex
            h-9
            shrink-0
            items-center
            gap-1.5
            rounded-lg
            border
            border-zinc-700
            bg-[#1A1A1D]/90
            px-2.5
            text-xs
            font-semibold
            text-white
            shadow-lg
            backdrop-blur-md
            transition
            duration-300
            hover:border-yellow-400
            hover:bg-[#242428]
            active:scale-95
          "
        >
          <Globe size={15} />

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

      {/* =====================================================
          DESKTOP BACKGROUND
          ===================================================== */}

      <div className="absolute inset-0 hidden sm:block">
        <Image
          src="/images/hero-banner.webp"
          alt="Hero Background"
          fill
          priority
          sizes="(min-width: 640px) 100vw"
          className="
            object-cover
            object-[78%]
            sm:object-right
          "
        />

        <div className="absolute inset-0 bg-black/55" />

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-r
            from-[#0d0d0d]
            via-[#0d0d0d]/80
            via-35%
            to-transparent
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_left,#ffb80022,transparent_55%)]
          "
        />

        <div
          className="
            absolute
            inset-x-0
            bottom-0
            h-40
            bg-gradient-to-t
            from-[#0d0d0d]
            to-transparent
          "
        />
      </div>

      {/* =====================================================
          CONTENT
          ===================================================== */}

      <div
        dir={isRTL ? "rtl" : "ltr"}
        className={`
          relative
          z-20
          flex
          flex-col
          px-5
          pb-8
          pt-0

          sm:min-h-[560px]
          sm:justify-center
          sm:px-8
          sm:py-16

          lg:px-16
          lg:py-16

          xl:px-20

          ${isRTL ? "items-end text-right" : "items-start text-left"}
        `}
      >
        {/* =================================================
            MOBILE SPACING / CONTENT POSITION
            ================================================= */}

        <div
          className="
            w-full
            sm:max-w-none
          "
        >
          {/* 18 YEARS BADGE */}

          <div
            className="
              mb-4
              mt-[-92px]
              sm:mb-6
              sm:mt-0
            "
          >
            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-[#ffb800]/30
                bg-[#ffb800]/10
                px-4
                py-2
                backdrop-blur-md
              "
            >
              <Star
                className="
                  h-4
                  w-4
                  fill-[#ffb800]
                  text-[#ffb800]
                "
              />

              <span
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.12em]
                  text-[#ffb800]
                  sm:text-xs
                  sm:tracking-widest
                "
              >
                {isRTL
                  ? "أكثر من 18 عاماً من الطعم المميز"
                  : "18+ Years of Delicious Taste"}
              </span>
            </div>
          </div>

          {/* =================================================
              MAIN HEADING
              English = LEFT
              Arabic = RIGHT
              ================================================= */}

          <h1
            dir={isRTL ? "rtl" : "ltr"}
            className={`
              leading-[1.08]
              tracking-tight
              ${isRTL ? "text-right" : "text-left"}
            `}
          >
            <span
              className="
                block
                text-[32px]
                font-extrabold
                text-white
                sm:text-4xl
                md:text-5xl
                lg:text-6xl
                xl:text-7xl
              "
            >
              {t.hero.title1}
            </span>

            <span
              className="
                mt-1
                block
                text-[32px]
                font-extrabold
                text-[#ffb800]
                sm:text-4xl
                md:text-5xl
                lg:text-6xl
                xl:text-7xl
              "
            >
              {t.hero.title2}
            </span>
          </h1>

          {/* =================================================
              SUBTITLE
              ================================================= */}

          <p
            dir={isRTL ? "rtl" : "ltr"}
            className={`
              mt-5
              flex
              flex-wrap
              items-center
              gap-y-2
              text-sm
              font-medium
              text-neutral-200
              sm:mt-6
              sm:text-base
              md:text-lg
              ${isRTL ? "justify-end" : "justify-start"}
            `}
          >
            {t.hero.subtitle.map((item, index) => (
              <span
                key={item}
                className="flex items-center"
              >
                {index > 0 && (
                  <span className="mx-2 text-[#ffb800]">
                    •
                  </span>
                )}

                <span>{item}</span>
              </span>
            ))}
          </p>

          {/* =================================================
              DESCRIPTION
              ================================================= */}

          <p
            dir={isRTL ? "rtl" : "ltr"}
            className={`
              mt-5
              max-w-2xl
              text-sm
              leading-relaxed
              text-neutral-300
              sm:text-base
              md:text-lg
              ${isRTL ? "text-right" : "text-left"}
            `}
          >
            {t.hero.description}
          </p>

          {/* =================================================
              FEATURE CHIPS
              ================================================= */}

          <div
            dir={isRTL ? "rtl" : "ltr"}
            className={`
              mt-6
              flex
              flex-wrap
              gap-2.5
              sm:mt-7
              sm:gap-3
              ${isRTL ? "justify-end" : "justify-start"}
            `}
          >
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
                    px-3.5
                    py-2
                    backdrop-blur-md
                    sm:px-4
                  "
                >
                  <Icon
                    className="
                      h-4
                      w-4
                      text-[#ffb800]
                    "
                  />

                  <span
                    className="
                      text-xs
                      font-medium
                      text-white
                      sm:text-sm
                    "
                  >
                    {item.text}
                  </span>
                </div>
              );
            })}
          </div>

          {/* =================================================
              BUTTONS
              ================================================= */}

          <div
            className="
              mt-7
              flex
              flex-col
              gap-3
              sm:mt-8
              sm:flex-row
            "
          >
            {/* WhatsApp */}

            <button
              type="button"
              onClick={handleWhatsAppOrder}
              className="
                flex
                min-h-[54px]
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
                active:scale-[0.98]
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
                min-h-[54px]
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

          {/* =================================================
              STATS
              ================================================= */}

          <div
            className="
              mt-8
              grid
              max-w-md
              grid-cols-3
              gap-3
              sm:mt-10
              sm:gap-6
            "
          >
            {/* 18+ */}

            <div>
              <h3
                className="
                  text-2xl
                  font-extrabold
                  text-[#ffb800]
                  sm:text-3xl
                "
              >
                18+
              </h3>

              <p
                className="
                  mt-1
                  text-xs
                  text-neutral-300
                  sm:text-sm
                "
              >
                {isRTL ? "سنة" : "Years"}
              </p>
            </div>

            {/* Customers */}

            <div>
              <h3
                className="
                  text-2xl
                  font-extrabold
                  text-[#ffb800]
                  sm:text-3xl
                "
              >
                5K+
              </h3>

              <p
                className="
                  mt-1
                  text-xs
                  text-neutral-300
                  sm:text-sm
                "
              >
                {isRTL ? "عملاء" : "Customers"}
              </p>
            </div>

            {/* Fresh */}

            <div>
              <h3
                className="
                  text-2xl
                  font-extrabold
                  text-[#ffb800]
                  sm:text-3xl
                "
              >
                100%
              </h3>

              <p
                className="
                  mt-1
                  text-xs
                  text-neutral-300
                  sm:text-sm
                "
              >
                {isRTL ? "طازج" : "Fresh"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}