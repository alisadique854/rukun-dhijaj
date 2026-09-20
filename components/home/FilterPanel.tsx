"use client";

import { motion, AnimatePresence } from "framer-motion";

interface FilterPanelProps {
  open: boolean;
}

export default function FilterPanel({ open }: FilterPanelProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -15, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: -15, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4 overflow-hidden rounded-3xl border border-yellow-500/10 bg-[#18181B] shadow-xl"
        >
          <div className="p-5">

            {/* Category */}
            <h3 className="mb-4 text-lg font-bold text-yellow-400">
              Categories
            </h3>

            <div className="grid grid-cols-2 gap-3">

              <label className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-[#202024] p-3 text-white">
                <input type="checkbox" className="accent-yellow-400" />
                🍗 Broast
              </label>

              <label className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-[#202024] p-3 text-white">
                <input type="checkbox" className="accent-yellow-400" />
                🍕 Pizza
              </label>

              <label className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-[#202024] p-3 text-white">
                <input type="checkbox" className="accent-yellow-400" />
                🍔 Burger
              </label>

              <label className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-[#202024] p-3 text-white">
                <input type="checkbox" className="accent-yellow-400" />
                🥤 Drinks
              </label>

              <label className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-[#202024] p-3 text-white">
                <input type="checkbox" className="accent-yellow-400" />
                🍟 Snacks
              </label>

              <label className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-[#202024] p-3 text-white">
                <input type="checkbox" className="accent-yellow-400" />
                🍰 Desserts
              </label>

            </div>

            {/* Price */}
            <h3 className="mt-8 mb-4 text-lg font-bold text-yellow-400">
              Price
            </h3>

            <div className="space-y-3">

              <label className="flex items-center gap-2 text-zinc-300">
                <input type="radio" name="price" className="accent-yellow-400" />
                Under 10 SAR
              </label>

              <label className="flex items-center gap-2 text-zinc-300">
                <input type="radio" name="price" className="accent-yellow-400" />
                10 - 20 SAR
              </label>

              <label className="flex items-center gap-2 text-zinc-300">
                <input type="radio" name="price" className="accent-yellow-400" />
                Above 20 SAR
              </label>

            </div>

            {/* Offers */}
            <h3 className="mt-8 mb-4 text-lg font-bold text-yellow-400">
              Offers
            </h3>

            <div className="space-y-3">

              <label className="flex items-center gap-2 text-zinc-300">
                <input type="checkbox" className="accent-yellow-400" />
                Discount
              </label>

              <label className="flex items-center gap-2 text-zinc-300">
                <input type="checkbox" className="accent-yellow-400" />
                Combo Deals
              </label>

              <label className="flex items-center gap-2 text-zinc-300">
                <input type="checkbox" className="accent-yellow-400" />
                New Items
              </label>

            </div>

            {/* Buttons */}
            <div className="mt-8 flex gap-3">

              <button className="flex-1 rounded-xl border border-zinc-700 py-3 text-white transition hover:border-yellow-400">
                Reset
              </button>

              <button className="flex-1 rounded-xl bg-yellow-400 py-3 font-semibold text-black transition hover:bg-yellow-300">
                Apply
              </button>

            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}