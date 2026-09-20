"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Flame } from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";
import OfferCard from "./OfferCard";
import { getOffers } from "@/services/offer.service";

export default function Offers() {
  const { language } = useLanguage();

  const isRTL = language === "ar";

  const [offers, setOffers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({
      left: isRTL ? 380 : -380,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({
      left: isRTL ? -380 : 380,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    loadOffers();
  }, []);

  async function loadOffers() {
    try {
      setLoading(true);

      const data = await getOffers();
      setOffers(data);
    } catch (error) {
      console.error("Failed to load offers:", error);
    } finally {
      setLoading(false);
    }
  }

  if (!loading && offers.length === 0) {
    return null;
  }

  return (
    <section
      dir={isRTL ? "rtl" : "ltr"}
      className="space-y-8"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className={`flex items-center justify-between ${
          isRTL ? "flex-row-reverse" : ""
        }`}
      >
        <div className={isRTL ? "text-right" : "text-left"}>
          <div
            className={`flex items-center gap-2 ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            <Flame className="h-7 w-7 text-[#ffb800]" />

            <h2 className="font-cairo text-3xl font-bold text-white">
              {isRTL ? "العروض الخاصة" : "Special Offers"}
            </h2>
          </div>

          <p className="mt-2 text-neutral-400">
            {isRTL
              ? "لا تفوت أفضل عروض الوجبات اليوم."
              : "Don't miss today's best combo deals."}
          </p>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={scrollLeft}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#3d2a00] bg-[#151515] text-[#ffb800] transition hover:border-[#ffb800] hover:bg-[#ffb800]/10"
          >
            <ArrowLeft size={20} />
          </button>

          <button
            onClick={scrollRight}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#3d2a00] bg-[#151515] text-[#ffb800] transition hover:border-[#ffb800] hover:bg-[#ffb800]/10"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </motion.div>

      {/* Loading */}
      {loading ? (
        <div className="flex gap-6 overflow-hidden">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-[430px] w-[340px] animate-pulse rounded-3xl bg-[#181818]"
            />
          ))}
        </div>
      ) : (
        <motion.div
          ref={sliderRef}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="
            flex
            gap-6
            overflow-x-auto
            snap-x
            snap-mandatory
            pb-3
            scroll-smooth
            no-scrollbar
            cursor-grab
            active:cursor-grabbing
          "
        >
          {offers.map((offer) => (
            <motion.div
              key={offer.id}
              className="
                snap-start
                shrink-0
                w-[300px]
                sm:w-[335px]
                lg:w-[370px]
              "
            >
              <OfferCard
                title={offer.title}
                titleAr={offer.title_ar}
                description={offer.description}
                descriptionAr={offer.description_ar}
                image={offer.image}
                badge={offer.badge}
                originalPrice={offer.original_price}
                offerPrice={offer.offer_price}
                items={offer.items ?? []}
                itemsAr={offer.items_ar ?? []}
                onAdd={() => {
                  console.log("Offer:", offer.id);
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Mobile */}
      <div className="flex justify-center md:hidden">
        <span className="rounded-full bg-[#171717] px-4 py-2 text-xs text-neutral-500">
          {isRTL
            ? "← اسحب لاستعراض المزيد من العروض →"
            : "← Swipe to explore more offers →"}
        </span>
      </div>
    </section>
  );
}