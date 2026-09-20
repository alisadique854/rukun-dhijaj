"use client";
import { useState } from "react";
import { ShoppingCart, ChevronDown, ChevronUp } from "lucide-react";
import QuantitySelector from "./QuantitySelector";
import { useLanguage } from "@/context/LanguageContext";

export interface ProductItemProps {
  id: number;
  name: string;
  nameAr?: string;
  description: string;
  descriptionAr?: string;
  price: number;
  image?: string;
  quantity: number;
  color: string;
  ingredients?: string[];
  ingredientsAr?: string[];
  onIncrease: () => void;
  onDecrease: () => void;
  onAdd: () => void;
}

export default function ProductItem({
  name,
  nameAr,
  description,
  descriptionAr,
  price,
  image,
  quantity,
  color,
  ingredients,
  ingredientsAr,
  onIncrease,
  onDecrease,
  onAdd,
}: ProductItemProps) {
  const { language, isRTL } = useLanguage();
  const [expanded, setExpanded] = useState(false);

  const formatPrice = (num: number) => {
    return new Intl.NumberFormat(
      language === "ar" ? "ar-EG" : "en-US",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    ).format(num);
  };

  const displayName = language === "ar" && nameAr ? nameAr : name;

  const displayDescription =
    language === "ar" && descriptionAr ? descriptionAr : description;

  const displayIngredients =
    language === "ar"
      ? ingredientsAr || ingredients || []
      : ingredients || [];

  const currencyText = language === "ar" ? "ريال" : "SAR";

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      onClick={() => setExpanded(!expanded)}
      className="cursor-pointer rounded-2xl border border-[#2d2208] bg-[#171717] p-4 transition-all duration-300 hover:border-[#ffb800] hover:shadow-[0_8px_25px_rgba(255,184,0,0.12)]"
    >
      <div
        className={`flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-3 ${
          isRTL ? "sm:flex-row-reverse" : ""
        }`}
      >
        {/* LEFT / DETAILS */}
        <div
          className={`flex min-w-0 flex-1 items-center gap-4 ${
            isRTL ? "text-right flex-row-reverse" : "text-left flex-row"
          }`}
        >
          {/* Image */}
          <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-black">
            {image ? (
              <img
                src={image}
                alt={displayName}
                loading="lazy"
                className="h-full w-full object-cover object-center transition-transform duration-300 hover:scale-105"
              />
            ) : (
              <div
                className="flex h-full w-full items-center justify-center"
                style={{ background: color }}
              >
                <span className="text-3xl font-black text-white/20">
                  {displayName.charAt(0)}
                </span>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="break-words text-lg font-bold leading-tight text-white font-cairo sm:text-base md:text-lg">
                {displayName}
              </h3>
              <div className="text-neutral-400">
                {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>
            </div>

            {!expanded && displayDescription && (
  <p className="mt-1 line-clamp-2 break-words text-sm text-neutral-400 font-cairo">
    {displayDescription}
  </p>
)}

            {/* Micro Ingredients preview (visible only when collapsed) */}
{!expanded && displayIngredients.length > 0 && (
  <div className="mt-3 flex flex-wrap gap-2">
    {displayIngredients.slice(0, 3).map((item, index) => (
      <span
        key={index}
        className="rounded-full border border-[#2d2208] bg-[#1f1f1f] px-2 py-1 text-[10px] font-medium text-neutral-300"
      >
        {item}
      </span>
    ))}

    {displayIngredients.length > 3 && (
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setExpanded(true);
        }}
        className="rounded-full bg-[#ffb800]/20 px-2 py-1 text-[10px] font-bold text-[#ffb800] hover:bg-[#ffb800]/30"
      >
        +{displayIngredients.length - 3} more
      </button>
    )}
  </div>
)}

            {/* Price */}
            <div
              className={`mt-3 flex items-center gap-1.5 text-2xl font-extrabold text-[#ffb800] font-cairo sm:text-xl md:text-2xl ${
                isRTL ? "justify-end flex-row-reverse" : "justify-start"
              }`}
            >
              <span>{formatPrice(price)}</span>
              <span className="text-sm font-bold opacity-90">{currencyText}</span>
            </div>
          </div>
        </div>

        {/* CONTROLS (visible only when collapsed) */}
        {!expanded && (
          <div
            className={`flex shrink-0 items-center justify-between gap-3 border-t border-neutral-800/60 pt-3 sm:flex-col sm:border-t-0 sm:pt-0 ${
              isRTL ? "sm:items-start" : "sm:items-end"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <QuantitySelector
              quantity={quantity}
              onIncrease={onIncrease}
              onDecrease={onDecrease}
            />

            <button
              onClick={(e) => {
                e.stopPropagation();
                onAdd();
              }}
              className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[#ffb800] px-4 font-bold text-black transition-all duration-300 hover:scale-[1.02] hover:bg-[#e6a500] active:scale-95 sm:h-11 sm:w-11 sm:flex-initial sm:px-0"
            >
              <ShoppingCart size={20} />
              <span className="text-sm font-cairo sm:hidden">
                {language === "ar" ? "أضف إلى السلة" : "Add to Cart"}
              </span>
            </button>
          </div>
        )}
      </div>

      {/* EXPANDED SECTION */}
      {expanded && (
        <div className="mt-5 border-t border-[#2d2208] pt-5 transition-all duration-300">
          {/* Large Image */}
          {image && (
            <img
              src={image}
              alt={displayName}
              className="h-52 sm:h-64 md:h-96 w-full rounded-2xl object-cover shadow-lg"
            />
          )}

          {/* Full Description */}
          {displayDescription && (
            <div className="mt-5">
              <h4 className="text-lg font-bold text-white font-cairo">
                {language === "ar" ? "الوصف" : "Description"}
              </h4>
              <p className="mt-2 text-sm text-neutral-400 font-cairo leading-relaxed">
                {displayDescription}
              </p>
            </div>
          )}

          {/* Full Ingredients with Gold Bullets */}
          {displayIngredients.length > 0 && (
            <div className="mt-5">
              <h4 className="text-lg font-bold text-white font-cairo">
                {language === "ar" ? "المكونات" : "Ingredients"}
              </h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {displayIngredients.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 rounded-full bg-[#1f1f1f] border border-[#2d2208] px-3 py-1.5 text-xs text-neutral-200 font-cairo"
                  >
                    <span className="h-2 w-2 shrink-0 rounded-full bg-[#ffb800]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <hr className="my-5 border-neutral-800/60" />

          {/* Expanded Bottom Controls */}
          <div
            className={`flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between ${
              isRTL ? "sm:flex-row-reverse" : ""
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="text-sm text-neutral-400 font-cairo">
                {language === "ar" ? "الكمية:" : "Quantity:"}
              </span>
              <QuantitySelector
                quantity={quantity}
                onIncrease={onIncrease}
                onDecrease={onDecrease}
              />
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onAdd();
              }}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#ffb800] px-6 font-bold text-black transition-all duration-300 hover:scale-[1.01] hover:bg-[#e6a500] active:scale-95 sm:w-auto"
            >
              <ShoppingCart size={20} />
              <span className="text-sm font-cairo">
                {language === "ar" ? "أضف إلى السلة" : "Add to Cart"}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}