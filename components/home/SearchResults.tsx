"use client";

import React from "react";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";

import { SearchItem } from "@/lib/search.service";
import { getTranslations } from "@/lib/translations";
import { useCart } from "@/context/CartContext";

interface SearchResultsProps {
  results: SearchItem[];
  isOpen: boolean;
  activeIndex: number;
  locale: "en" | "ar";
  onSelect: (item: SearchItem) => void;
  setActiveIndex: (index: number) => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  isOpen,
  activeIndex,
  locale,
  onSelect,
  setActiveIndex,
}) => {
  const {
    items,
    addItem,
    increaseQty,
    decreaseQty,
  } = useCart();

  if (!isOpen || results.length === 0) {
    return null;
  }

  const isRtl = locale === "ar";
  const t = getTranslations(locale);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(
      isRtl ? "ar-EG" : "en-US",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    ).format(price);
  };

  const getQty = (id: string) => {
    return (
      items.find((i) => i.id === id)?.quantity || 0
    );
  };

  const addProduct = (item: SearchItem) => {
    addItem({
      id: item.id,
      name: isRtl ? item.nameAr : item.nameEn,
      price: item.price || 0,
      image: item.image,
    });
  };

  return (
    <div
      className="
      absolute
      left-0
      right-0
      top-full
      z-[999]
      mt-2
      max-h-[420px]
      overflow-y-auto
      rounded-2xl
      border
      border-amber-500/30
      bg-[#090909]/95
      p-2
      shadow-2xl
      backdrop-blur-xl
      no-scrollbar
      "
      role="listbox"
    >
            {results.map((item, index) => {
        const isSelected = index === activeIndex;

        const name = isRtl
          ? item.nameAr
          : item.nameEn;

        const description =
          isRtl
            ? item.descriptionAr
            : item.descriptionEn;

        const categoryName = isRtl
          ? item.categoryNameAr
          : item.categoryNameEn;

        const qty = getQty(item.id);

        return (
          <div
            key={`${item.type}-${item.id}`}
            onClick={() => onSelect(item)}
            onMouseEnter={() =>
              setActiveIndex(index)
            }
            className={`
              mb-2
              flex
              items-center
              gap-4
              rounded-2xl
              border
              p-3
              cursor-pointer
              transition-all
              duration-200

              ${
                isSelected
                  ? "border-amber-500 bg-amber-500/15"
                  : "border-neutral-800 hover:border-amber-500/40 hover:bg-neutral-900"
              }

              ${
                isRtl
                  ? "flex-row-reverse text-right"
                  : "text-left"
              }
            `}
          >
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
              <Image
                src={
                  item.image ||
                  "/placeholder-food.png"
                }
                alt={name}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>

            <div className="min-w-0 flex-1">

              <div className="flex items-start justify-between gap-2">

                <h3 className="min-w-0 flex-1 font-cairo text-base font-bold leading-5 text-white break-words">
                  {name}
                </h3>

                <span
          
  className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-bold

                  ${
                    item.type === "category"
                      ? "bg-amber-500 text-black"
                      : "bg-neutral-800 text-amber-400"
                  }`}
                >
                  {item.type === "category"
                    ? t.search.categoryBadge
                    : t.search.productBadge}
                </span>

              </div>

              {item.type === "product" && (
                <>
                  <p className="mt-1 line-clamp-2 text-xs text-neutral-400 font-cairo">
                    {description}
                  </p>

                  <div className="mt-2 flex items-center justify-between">

                    <span className="text-sm font-bold text-amber-400">
                      {formatPrice(item.price || 0)}{" "}
                      {t.search.currency}
                    </span>

                    <span className="truncate text-xs text-neutral-500">
                      {categoryName}
                    </span>

                  </div>
                </>
              )}
            </div>
                        {item.type === "product" && (
              <div
                className={`mt-3 flex items-center ${
                  isRtl ? "justify-start" : "justify-end"
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                {qty === 0 ? (
                  <button
                    onClick={() => addProduct(item)}
                    className="flex items-center gap-2 rounded-xl bg-amber-500 px-3 py-2 text-sm font-semibold text-black transition hover:bg-amber-400"
                  >
                    <ShoppingCart size={16} />
                    {isRtl ? "أضف" : "Add"}
                  </button>
                ) : (
                  <div className="flex items-center gap-3 rounded-xl bg-neutral-900 px-2 py-2">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-800 text-white hover:bg-neutral-700"
                    >
                      −
                    </button>

                    <span className="min-w-[24px] text-center font-bold text-white">
                      {qty}
                    </span>

                    <button
                      onClick={() => increaseQty(item.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 font-bold text-black hover:bg-amber-400"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};