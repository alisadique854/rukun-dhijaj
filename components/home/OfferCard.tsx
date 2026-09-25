"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Flame, Plus, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";

interface OfferCardProps {
  title: string;
  titleAr?: string;
  description?: string;
  descriptionAr?: string;
  image: string;
  badge?: string;
  originalPrice: number;
  offerPrice: number;
  items: string[];
  itemsAr?: string[];
  onAdd?: () => void;
}

export default function OfferCard({
  title,
  titleAr,
  description,
  descriptionAr,
  image,
  badge = "Hot Deal",
  originalPrice,
  offerPrice,
  items,
  itemsAr,
  onAdd,
}: OfferCardProps) {
  const { language } = useLanguage();
  const { addItem } = useCart();

  const isRTL = language === "ar";

  const [showAllItems, setShowAllItems] = useState(false);

  const displayTitle =
    isRTL && titleAr
      ? titleAr
      : title || "";

  const displayDescription =
    isRTL && descriptionAr
      ? descriptionAr
      : description || "";

  const displayItems =
    (isRTL && itemsAr?.length
      ? itemsAr
      : items) ?? [];

  const badgeMap: Record<string, string> = {
    "Hot Deal": "عرض ساخن",
    "Best Seller": "الأكثر مبيعًا",
    "New": "جديد",
    "Family Pack": "وجبة عائلية",
    "Limited": "لفترة محدودة",
  };

  const displayBadge =
    isRTL
      ? badgeMap[badge] ?? badge
      : badge;

  const saveAmount = Math.max(
    Number(originalPrice) -
      Number(offerPrice),
    0
  );

  const formatPrice = (price: number) => {
    const formatted =
      new Intl.NumberFormat(
        isRTL ? "ar-SA" : "en-SA",
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }
      ).format(price);

    return `${formatted} ر.س`;
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      dir={isRTL ? "rtl" : "ltr"}
      className="
        group
        relative
        h-full
        overflow-hidden
        rounded-3xl
        border
        border-[#2d2208]
        bg-[#111111]
        shadow-lg
        transition-all
        duration-500
        hover:border-[#ffb800]
        hover:shadow-[0_18px_40px_rgba(255,184,0,0.15)]
        flex
        flex-col
      "
    >
      <div className="relative h-48 sm:h-52 overflow-hidden flex-shrink-0">
        <Image
          src={image || "/placeholder-offer.jpg"}
          alt={displayTitle}
          fill
          sizes="(max-width:768px)100vw,(max-width:1200px)50vw,370px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/40 to-transparent" />
      </div>

      <div
        className={`
          absolute
          top-4
          z-20
          ${isRTL ? "right-4" : "left-4"}
        `}
      >
        <div
          className="
            inline-flex
            items-center
            gap-2
            rounded-full
            bg-[#ffb800]
            px-4
            py-2
            text-xs
            font-bold
            text-black
            shadow-xl
          "
        >
          <Flame className="h-4 w-4" />
          <span>{displayBadge}</span>
        </div>
      </div>

      <div
        className={`
          flex
          flex-1
          flex-col
          p-5
          ${isRTL ? "text-right" : "text-left"}
        `}
      >
        {!showAllItems && (
          <>
            <h2
              className="
                min-h-[52px]
                text-2xl
                font-bold
                text-white
                font-cairo
                leading-8
                line-clamp-2
              "
            >
              {displayTitle}
            </h2>

            {displayDescription && (
              <p
                className="
                  mt-2
                  min-h-[40px]
                  text-sm
                  leading-5
                  text-neutral-300
                  line-clamp-2
                "
              >
                {displayDescription}
              </p>
            )}
          </>
        )}

        <div className="mt-4 space-y-2 flex-1">
          {(showAllItems ? displayItems : displayItems.slice(0, 2)).map(
            (item, index) => (
              <div
                key={index}
                className={`
                  flex
                  items-center
                  gap-3
                  text-sm
                  text-white
                  ${isRTL ? "flex-row-reverse" : ""}
                `}
              >
                <div
                  className="
                    flex
                    h-5
                    w-5
                    flex-shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[#ffb800]/20
                    backdrop-blur-md
                  "
                >
                  <Check className="h-3.5 w-3.5 text-[#ffb800]" />
                </div>
                <span>{item}</span>
              </div>
            )
          )}

          {displayItems.length > 2 && (
            <button
              type="button"
              onClick={() => setShowAllItems(!showAllItems)}
              className="
                pt-1
                pb-2
                text-sm
                font-semibold
                text-[#ffb800]
                hover:text-[#ffd54a]
              "
            >
              {showAllItems
                ? isRTL
                  ? "إظهار أقل"
                  : "Show Less"
                : isRTL
                ? `+${displayItems.length - 2} عناصر أخرى`
                : `+${displayItems.length - 2} More Items`}
            </button>
          )}
        </div>
      </div>

      <div className="mt-auto border-t border-[#2d2208] p-5 flex-shrink-0">
        <p className="text-sm text-neutral-500 line-through">
          {formatPrice(originalPrice)}
        </p>

        <h2 className="mt-1 text-3xl font-extrabold text-[#ffb800]">
          {formatPrice(offerPrice)}
        </h2>

        <p className="mt-1 text-sm font-medium text-green-400">
          {isRTL
            ? `وفّر ${formatPrice(saveAmount)}`
            : `Save ${formatPrice(saveAmount)}`}
        </p>

        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            addItem({
              id: `offer-${title}`,
              name: displayTitle,
              price: offerPrice,
              image,
              type: "offer",
              description: displayDescription,
              items: displayItems,
            });

            onAdd?.();
          }}
          className="
            mt-4
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-2xl
            bg-[#ffb800]
            py-3
            font-semibold
            text-black
            transition-all
            hover:bg-[#ffd54a]
          "
        >
          <Plus className="h-5 w-5" />
          <span>
            {isRTL ? "أضف العرض" : "Add Combo"}
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
}