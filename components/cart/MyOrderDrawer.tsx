"use client";

import {
  X,
  Trash2,
  Minus,
  Plus,
  ShoppingCart,
} from "lucide-react";

import { useCart } from "../../context/CartContext";
import { useLanguage } from "@/context/LanguageContext";

interface MyOrderDrawerProps {
  open: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export default function MyOrderDrawer({
  open,
  onClose,
  onCheckout,
}: MyOrderDrawerProps) {
  const {
    items,
    totalPrice,
    increaseQty,
    decreaseQty,
    removeItem,
    clearCart,
  } = useCart();

  const { language, isRTL } = useLanguage();
  const isAr = language === "ar";

  if (!open) return null;

  const formatNumber = (num: number, isPrice = false) => {
    return new Intl.NumberFormat(isAr ? "ar-EG" : "en-US", {
      minimumFractionDigits: isPrice ? 2 : 0,
      maximumFractionDigits: isPrice ? 2 : 0,
    }).format(num);
  };

  return (
    <div className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-sm">
      {/* Overlay */}
      <div
        className="absolute inset-0"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        dir={isRTL ? "rtl" : "ltr"}
        className="
          absolute
          bottom-0
          left-0
          right-0
          max-h-[90vh]
          overflow-y-auto
          rounded-t-[34px]
          border-t
          border-t-[#3b2b0d]
          bg-[#111111]
        "
      >
        {/* Handle */}
        <div className="flex justify-center py-3">
          <div className="h-1.5 w-14 rounded-full bg-neutral-600" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 pb-5">
          <div className={`flex items-center gap-3 ${isRTL ? "flex-row" : "flex-row"}`}>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ffb800] shrink-0">
              <ShoppingCart className="h-6 w-6 text-black" />
            </div>

            <div className={isRTL ? "text-right" : "text-left"}>
              <h2 className="text-2xl font-bold text-white font-cairo">
                {isAr ? "طلباتي" : "My Order"}
              </h2>
              <p className="text-sm text-neutral-400 font-cairo">
                {isAr ? "راجع تفاصيل طلبك" : "Review your order"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-full bg-[#1b1b1b] p-2 text-white transition hover:bg-[#ffb800] hover:text-black"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="space-y-5 px-6 pb-6">
          {items.map((item) => {
            const displayName = isAr && (item as any).nameAr ? (item as any).nameAr : item.name;
            return (
              <div
                key={item.id}
                className="rounded-2xl border border-[#2d2208] bg-[#181818] p-5"
              >
                <div className={`flex items-start justify-between ${isRTL ? "flex-row" : "flex-row"}`}>
                  <div className={isRTL ? "text-right" : "text-left"}>
                    <h3 className="text-lg font-bold text-white font-cairo">
                      {displayName}
                    </h3>
                    <div className={`mt-2 flex items-center gap-1 text-xl font-bold text-[#ffb800] font-cairo ${isRTL ? "flex-row" : "flex-row"}`}>
                      <span>{formatNumber(item.price * item.quantity, true)}</span>
                      <span className="text-xs opacity-90">{isAr ? "ريال" : "SAR"}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="rounded-xl bg-red-500/10 p-2 text-red-400 transition hover:bg-red-500 hover:text-white shrink-0"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className={`mt-5 flex items-center justify-between ${isRTL ? "flex-row-reverse" : "flex-row"}`}>
                  <div className="flex overflow-hidden rounded-xl border border-[#2d2208]" dir="ltr">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="px-4 py-3 text-white transition hover:bg-[#222]"
                    >
                      <Minus size={18} />
                    </button>

                    <div className="flex w-14 items-center justify-center border-x border-[#2d2208] font-bold text-white font-cairo">
                      {formatNumber(item.quantity)}
                    </div>

                    <button
                      onClick={() => increaseQty(item.id)}
                      className="px-4 py-3 text-white transition hover:bg-[#222]"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 border-t border-[#2d2208] bg-[#111111] p-6">
          {/* Total */}
          <div className={`mb-5 flex items-center justify-between ${isRTL ? "flex-row" : "flex-row"}`}>
            <span className="text-lg font-medium text-neutral-300 font-cairo">
              {isAr ? "الإجمالي" : "Total"}
            </span>

            <div className={`flex items-center gap-1.5 text-3xl font-extrabold text-[#ffb800] font-cairo ${isRTL ? "flex-row" : "flex-row"}`}>
              <span>{formatNumber(totalPrice, true)}</span>
              <span className="text-sm font-bold opacity-90">{isAr ? "ريال" : "SAR"}</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={clearCart}
              className="rounded-2xl border border-red-500/40 bg-red-500/10 py-4 font-semibold text-red-400 transition hover:bg-red-500 hover:text-white font-cairo"
            >
              {isAr ? "مسح السلة" : "Clear Cart"}
            </button>

            <button
              onClick={onCheckout}
              className="rounded-2xl bg-[#ffb800] py-4 font-bold text-black transition hover:bg-[#e6a500] font-cairo"
            >
              {isAr ? "متابعة الطلب" : "Continue to Checkout"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}