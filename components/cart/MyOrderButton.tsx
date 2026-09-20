"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";

export default function MyOrderButton() {
  const { totalItems } = useCart();
  const { language, isRTL } = useLanguage();

  const isAr = language === "ar";

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat(isAr ? "ar-EG" : "en-US").format(num);
  };

  return (
    <button
      dir={isRTL ? "rtl" : "ltr"}
      className="
        relative
        flex
        items-center
        gap-2
        rounded-xl
        border
        border-[#2d2208]
        bg-[#141414]
        px-4
        py-2.5
        text-white
        transition-all
        duration-200
        hover:border-[#ffb800]
      "
    >
      <ShoppingCart className="h-5 w-5 text-[#ffb800]" />

      <span className="text-sm font-semibold font-cairo">
        {isAr ? "طلباتي" : "My Order"}
      </span>

      <span className="flex h-6 min-w-[24px] items-center justify-center rounded-full bg-[#ffb800] px-2 text-xs font-bold text-black font-cairo">
        {formatNumber(totalItems)}
      </span>
    </button>
  );
}