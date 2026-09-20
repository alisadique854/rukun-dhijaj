"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Gift,
  Plus,
  Search,
  Loader2,
  Pencil,
  Trash2,
} from "lucide-react";

import { Offer } from "@/types/offer";

import {
  getOffers,
  deleteOffer,
} from "@/services/offer.service";

export default function OffersPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [filteredOffers, setFilteredOffers] = useState<Offer[]>([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOffers();
  }, []);

  async function loadOffers() {
    try {
      setLoading(true);

      const data = await getOffers();

      setOffers(data);
      setFilteredOffers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!search.trim()) {
      setFilteredOffers(offers);
      return;
    }

    const keyword = search.toLowerCase();

    setFilteredOffers(
      offers.filter((offer) =>
        offer.title.toLowerCase().includes(keyword)
      )
    );
  }, [search, offers]);

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Delete this offer?"
    );

    if (!confirmed) return;

    try {
      await deleteOffer(id);

      await loadOffers();

      alert("Offer deleted successfully.");
    } catch (error) {
      console.error(error);

      alert("Failed to delete offer.");
    }
  }

  return (
    <main className="min-h-screen bg-[#090909]">

      <div className="mx-auto max-w-7xl px-6 py-8">

        {/* Header */}

        <div className="mb-8 flex items-center justify-between">

          <div className="flex items-center gap-4">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#ffb800]/10">

              <Gift
                size={34}
                className="text-[#ffb800]"
              />

            </div>

            <div>

              <h1 className="text-4xl font-black text-white">
                Offers
              </h1>

              <p className="mt-2 text-neutral-400">
                Manage combo offers
              </p>

            </div>

          </div>

          <Link
            href="/admin/offers/add"
            className="
              flex
              items-center
              gap-2
              rounded-2xl
              bg-[#ffb800]
              px-6
              py-3
              font-bold
              text-black
              transition
              hover:bg-[#ffd24d]
            "
          >
            <Plus size={20} />
            Add Offer
          </Link>

        </div>

        {/* Search */}

        <div className="mb-8">

          <div className="relative">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search offers..."
              className="
                w-full
                rounded-2xl
                border
                border-[#2d2208]
                bg-[#111111]
                py-4
                pl-12
                pr-5
                text-white
                outline-none
                focus:border-[#ffb800]
              "
            />

          </div>

        </div>

        {loading ? (

          <div className="flex h-72 items-center justify-center">

            <Loader2 className="h-8 w-8 animate-spin text-[#ffb800]" />

          </div>

        ) : (
            <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  className="overflow-hidden rounded-3xl border border-[#2d2208] bg-[#111111]"
>
  {filteredOffers.length === 0 ? (

    <div className="flex flex-col items-center justify-center py-24">

      <Gift className="h-14 w-14 text-[#ffb800]" />

      <h2 className="mt-6 text-2xl font-bold text-white">
        No Offers Found
      </h2>

      <p className="mt-2 text-neutral-400">
        Create your first combo offer.
      </p>

      <Link
        href="/admin/offers/add"
        className="mt-8 rounded-2xl bg-[#ffb800] px-6 py-3 font-bold text-black transition hover:bg-[#ffd24d]"
      >
        + Add Offer
      </Link>

    </div>

  ) : (

    <div className="overflow-x-auto">

      <table className="min-w-full">

        <thead className="bg-[#181818]">

          <tr className="border-b border-[#2d2208]">

            <th className="px-6 py-5 text-left text-sm font-bold text-neutral-300">
              Offer
            </th>

            <th className="px-6 py-5 text-center text-sm font-bold text-neutral-300">
              Original
            </th>

            <th className="px-6 py-5 text-center text-sm font-bold text-neutral-300">
              Offer
            </th>

            <th className="px-6 py-5 text-center text-sm font-bold text-neutral-300">
              Save
            </th>

            <th className="px-6 py-5 text-center text-sm font-bold text-neutral-300">
              Status
            </th>

            <th className="px-6 py-5 text-right text-sm font-bold text-neutral-300">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {filteredOffers.map((offer) => (

            <tr
              key={offer.id}
              className="border-b border-[#2d2208] transition hover:bg-[#181818]"
            >

              {/* Offer */}

              <td className="px-6 py-5">

                <div className="flex items-center gap-4">

                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="h-16 w-16 rounded-2xl object-cover"
                  />

                  <div>

                    <h3 className="font-bold text-white">
                      {offer.title}
                    </h3>

                    <p className="mt-1 text-sm text-neutral-500">
                      {offer.badge}
                    </p>

                  </div>

                </div>

              </td>

              {/* Original Price */}

              <td className="px-6 py-5 text-center">

                <span className="font-semibold text-neutral-400 line-through">

                  {offer.original_price.toFixed(2)} ر.س

                </span>

              </td>

              {/* Offer Price */}

              <td className="px-6 py-5 text-center">

                <span className="text-xl font-black text-[#ffb800]">

                  {offer.offer_price.toFixed(2)} ر.س

                </span>

              </td>

              {/* Saved */}

              <td className="px-6 py-5 text-center">

                <span className="font-bold text-green-400">

                  {offer.saved_amount.toFixed(2)} ر.س

                </span>

              </td>

              {/* Status */}

              <td className="px-6 py-5 text-center">

                {offer.active ? (

                  <span className="rounded-full bg-green-500/20 px-4 py-2 text-sm font-semibold text-green-400">

                    Active

                  </span>

                ) : (

                  <span className="rounded-full bg-red-500/20 px-4 py-2 text-sm font-semibold text-red-400">

                    Inactive

                  </span>

                )}

              </td>

              {/* Actions */}

              <td className="px-6 py-5">

                <div className="flex justify-end gap-3">

                  <Link
                    href={`/admin/offers/${offer.id}`}
                    className="flex items-center gap-2 rounded-xl border border-[#ffb800] px-4 py-2 text-sm font-semibold text-[#ffb800] transition hover:bg-[#ffb800] hover:text-black"
                  >
                    <Pencil size={16} />
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(offer.id!)}
                    className="flex items-center gap-2 rounded-xl border border-red-500 px-4 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-500 hover:text-white"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  )}

</motion.div>
      )}

      </div>

    </main>
  );
}
