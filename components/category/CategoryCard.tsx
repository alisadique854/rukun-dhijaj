"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface CategoryCardProps {
  name: string;
  nameAr?: string;
  color: string;
  image?: string;
  productCount: number;
  expanded: boolean;
  onClick: () => void;
}

export default function CategoryCard({
  name,
  nameAr,
  color,
  image,
  productCount,
  expanded,
  onClick,
}: CategoryCardProps) {
  const { language, isRTL } = useLanguage();

  const displayName =
    language === "ar" && nameAr ? nameAr : name;

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat(
      language === "ar" ? "ar-EG" : "en-US"
    ).format(num);
  };

  return (
    <motion.button
      layout
      whileHover={{
        scale: 1.02,
      }}
      whileTap={{
        scale: 0.98,
      }}
      transition={{
        duration: 0.25,
      }}
      onClick={onClick}
    className={`
  group
  relative
  w-full

  aspect-[4/5]
  lg:aspect-auto
  lg:h-[500px]
  xl:h-[560px]
  2xl:h-[620px]

  overflow-hidden
  rounded-3xl
  border
  bg-[#111111]

  transform-gpu
  will-change-transform
  transition-all
  duration-500

  ${
    expanded
      ? "border-[#ffb800] shadow-[0_18px_45px_rgba(255,184,0,0.20)]"
      : "border-[#2d2208] hover:border-[#ffb800] hover:shadow-[0_18px_40px_rgba(255,184,0,0.15)]"
  }
`}
    >
      <motion.div
        layout
        className="absolute inset-0 overflow-hidden rounded-3xl"
      >
                {image ? (
          <img
            src={image}
            alt={displayName}
            loading="lazy"
            className="
              h-full
              w-full
              object-cover
              object-center
              transition-transform
              duration-1000
              ease-out
              group-hover:scale-110
            "
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center"
            style={{
              background: color,
            }}
          >
            <span className="text-7xl font-black text-white/10">
              {displayName.charAt(0)}
            </span>
          </div>
        )}

        {/* Dark Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

        {/* Gold Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#ffb800]/5" />
      </motion.div>

      {/* Bottom Content */}
      <div className="absolute bottom-0 left-0 right-0 z-10 flex items-end justify-between p-5 lg:p-6">
        <div className={isRTL ? "text-right" : "text-left"}>
          <motion.h3
            layout
            className="font-cairo text-xl font-bold text-white drop-shadow-lg"
          >
            {displayName}
          </motion.h3>

          <p className="mt-1 font-cairo text-sm text-white/90">
            {language === "ar"
              ? `${formatNumber(productCount)} عنصر متوفر`
              : `${formatNumber(productCount)} Item${
                  productCount !== 1 ? "s" : ""
                } Available`}
          </p>
        </div>
                <motion.div
          layout
          whileHover={{
            x: isRTL ? -3 : 3,
          }}
          transition={{
            duration: 0.2,
          }}
          className={`
            flex
            items-center
            justify-center
            text-white
            ${
              expanded
                ? "rotate-90"
                : ""
            }
          `}
        >
          <ArrowRight
            className={`h-8 w-8 stroke-[2.5] ${
              isRTL ? "rotate-180" : ""
            }`}
          />
        </motion.div>
      </div>
    </motion.button>
  );
}