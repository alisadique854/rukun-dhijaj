"use client";

import Image from "next/image";
import { ShoppingCart, Star } from "lucide-react";

interface ProductCardProps {
  name: string;
  image: string;
  price: number;

  description?: string;
  badge?: string;

  ingredients?: string[];

  onAdd?: () => void;

  onClick?: () => void;
}

export default function ProductCard({
  name,
  image,
  price,
  description,
  badge,
  ingredients,
  onAdd,
  onClick,
}: ProductCardProps) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer overflow-hidden rounded-3xl border border-[#2d2208] bg-[#111111] transition-all duration-300 hover:-translate-y-1 hover:border-[#ffb800] hover:shadow-[0_10px_35px_rgba(255,184,0,0.12)]"
    >
            {/* Product Image */}
      <div className="relative h-52 overflow-hidden bg-black">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {badge && (
          <span className="absolute left-3 top-3 rounded-full bg-[#ffb800] px-3 py-1 text-[10px] font-bold text-black">
            {badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="space-y-3 p-4">

              {/* Title + Rating */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-bold leading-6 text-white">
            {name}
          </h3>

          <div className="flex items-center gap-1 rounded-full bg-[#1a1a1a] px-2 py-1">
            <Star className="h-3.5 w-3.5 fill-[#ffb800] text-[#ffb800]" />
            <span className="text-[11px] font-medium text-white">
              4.9
            </span>
          </div>
        </div>

        {/* Description */}
        {description && (
          <p className="line-clamp-2 text-xs leading-5 text-neutral-400">
            {description}
          </p>
        )}

        {/* Ingredients */}
        {ingredients && ingredients.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {ingredients.slice(0, 3).map((item, index) => (
              <span
                key={index}
                className="rounded-full border border-[#2d2208] bg-[#1a1a1a] px-2 py-1 text-[10px] text-neutral-300"
              >
                {item}
              </span>
            ))}

            {ingredients.length > 3 && (
              <span className="rounded-full bg-[#ffb800]/20 px-2 py-1 text-[10px] font-semibold text-[#ffb800]">
                +{ingredients.length - 3} more
              </span>
            )}
          </div>
        )}

                {/* Price + Button */}
        <div className="flex items-center justify-between">

          <div>
            <p className="text-[10px] uppercase tracking-wider text-neutral-500">
              Starting From
            </p>

            <p className="text-xl font-extrabold text-[#ffb800]">
              SAR {price}
            </p>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onAdd?.();
            }}
            className="flex items-center gap-2 rounded-xl bg-[#ffb800] px-3 py-2 text-sm font-bold text-black transition-all duration-200 hover:bg-[#e6a500]"
          >
            <ShoppingCart className="h-4 w-4" />
            Add
          </button>

        </div>

      </div>
    </div>
  );
}