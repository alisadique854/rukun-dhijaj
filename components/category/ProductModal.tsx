"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface ProductModalProps {
  open: boolean;

  product: {
    id: string;
    name: string;
    nameAr?: string;

    description: string;
    descriptionAr?: string;

    ingredients?: string[];
    ingredientsAr?: string[];

    image?: string;

    price: number;
  } | null;

  locale: "en" | "ar";

  onClose: () => void;

  onAddToCart: () => void;
}

export default function ProductModal({
  open,
  product,
  locale,
  onClose,
  onAddToCart,
}: ProductModalProps) {
  if (!product) return null;

  const isRTL = locale === "ar";

  const name =
    isRTL && product.nameAr
      ? product.nameAr
      : product.name;

  const description =
    isRTL && product.descriptionAr
      ? product.descriptionAr
      : product.description;

  const ingredients =
    isRTL
      ? product.ingredientsAr || product.ingredients || []
      : product.ingredients || [];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-black/70 backdrop-blur-sm lg:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
                    onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{
              y: 80,
              opacity: 0,
              scale: 0.98,
            }}
            animate={{
              y: 0,
              opacity: 1,
              scale: 1,
            }}
            exit={{
              y: 80,
              opacity: 0,
              scale: 0.98,
            }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative w-full overflow-hidden rounded-t-3xl bg-[#111111] lg:max-w-2xl lg:rounded-3xl"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-20 rounded-full bg-black/60 p-2 text-white backdrop-blur transition hover:bg-black"
            >
              <X size={20} />
            </button>

            {/* Product Image */}
            <div className="relative h-72 w-full bg-black">
              <Image
                src={product.image || "/placeholder.png"}
                alt={name}
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-5 p-6">

                              {/* Product Name */}
              <div>
                <h2 className="text-3xl font-bold text-white font-cairo">
                  {name}
                </h2>

                <div className="mt-3 flex items-center gap-2">
                  <span className="text-3xl font-extrabold text-[#ffb800]">
                    SAR {product.price.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Description */}
              {description && (
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-white">
                    {isRTL ? "الوصف" : "Description"}
                  </h3>

                  <p className="leading-7 text-neutral-400 font-cairo">
                    {description}
                  </p>
                </div>
              )}

              {/* Ingredients */}
              {ingredients.length > 0 && (
                <div>
                  <h3 className="mb-3 text-lg font-semibold text-white">
                    {isRTL ? "المكونات" : "Ingredients"}
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {ingredients.map((item, index) => (
                      <span
                        key={index}
                        className="rounded-full border border-[#2d2208] bg-[#1a1a1a] px-3 py-2 text-sm text-neutral-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
                            {/* Add To Cart */}
              <button
                onClick={() => {
                  onAddToCart();
                  onClose();
                }}
                className="w-full rounded-2xl bg-[#ffb800] py-4 text-lg font-bold text-black transition hover:bg-[#e6a500]"
              >
                {isRTL ? "أضف إلى السلة" : "Add to Cart"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}