"use client";

import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export default function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
}: QuantitySelectorProps) {
  return (
    <div className="flex items-center overflow-hidden rounded-xl border border-[#2d2208] bg-[#121212] shadow-sm">

      {/* Minus */}
      <button
        type="button"
        onClick={onDecrease}
        disabled={quantity === 0}
        className="flex h-10 w-10 items-center justify-center text-neutral-300 transition-all duration-200 hover:bg-[#1d1d1d] hover:text-[#ffb800] active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Minus size={16} strokeWidth={2.5} />
      </button>

      {/* Quantity */}
      <div className="flex h-10 min-w-[44px] items-center justify-center border-x border-[#2d2208] px-2">
        <span className="text-sm font-bold text-white">
          {quantity}
        </span>
      </div>

      {/* Plus */}
      <button
        type="button"
        onClick={onIncrease}
        className="flex h-10 w-10 items-center justify-center text-neutral-300 transition-all duration-200 hover:bg-[#1d1d1d] hover:text-[#ffb800] active:scale-95"
      >
        <Plus size={16} strokeWidth={2.5} />
      </button>

    </div>
  );
}