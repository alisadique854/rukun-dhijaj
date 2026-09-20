"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { getAllProducts } from "@/services/product.service";
import { motion } from "framer-motion";
import {
  ImagePlus,
  Loader2,
  Save,
  Pencil,
  Trash2,
} from "lucide-react";

import { uploadOfferImage } from "@/services/storage.service";
import { Offer } from "@/types/offer";
import { Product } from "@/types/product";

interface SelectedProduct {
  product: Product;
  quantity: number;
}

interface OfferFormProps {
  mode?: "create" | "edit";

  initialData?: any;

  onSubmit: (data: {
    title: string;
    title_ar: string;
    description: string;
    description_ar: string;
    badge: string;
    image: string;
    offer_price: number;
    original_price: number;
    saved_amount: number;
    active: boolean;
    display_order: number;
    selectedProducts: SelectedProduct[];
  }) => Promise<void>;
}
export default function OfferForm({
  mode = "create",
  initialData,
  onSubmit,
}: OfferFormProps) {
  /* ------------------------------ */
  /* Basic Fields                   */
  /* ------------------------------ */

  const [title, setTitle] = useState(
    initialData?.title ?? ""
  );

  const [titleAr, setTitleAr] = useState(
    initialData?.title_ar ?? ""
  );

  const [description, setDescription] =
    useState(initialData?.description ?? "");

  const [descriptionAr, setDescriptionAr] =
    useState(initialData?.description_ar ?? "");

  const [badge, setBadge] = useState(
    initialData?.badge ?? "Hot Deal"
  );

  const [active, setActive] = useState(
    initialData?.active ?? true
  );

  const [displayOrder, setDisplayOrder] =
    useState(initialData?.display_order ?? 1);

  /* ------------------------------ */
  /* Image                          */
  /* ------------------------------ */

  const [image, setImage] = useState(
    initialData?.image ?? ""
  );

  const [uploadingImage, setUploadingImage] =
    useState(false);
const fileInputRef = useRef<HTMLInputElement>(null);
  /* ------------------------------ */
  /* Products                       */
  /* ------------------------------ */

  const [products, setProducts] =
    useState<Product[]>([]);
  const [search, setSearch] = useState("");
const [selectedProducts, setSelectedProducts] =
  useState<SelectedProduct[]>(
    initialData?.selectedProducts ?? []
  );

  /* ------------------------------ */
  /* Prices                         */
  /* ------------------------------ */

  const [offerPrice, setOfferPrice] = useState<string>(
  initialData?.offer_price?.toString() ?? ""
);

  const originalPrice = useMemo(() => {
    return selectedProducts.reduce(
      (sum, item) =>
        sum +
        item.product.price *
          item.quantity,
      0
    );
  }, [selectedProducts]);

  const savedAmount = useMemo(() => {
  return Math.max(
    originalPrice - Number(offerPrice || 0),
    0
  );
}, [offerPrice, originalPrice]);

const filteredProducts = useMemo(() => {
  return products.filter((product) =>
    product.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );
}, [products, search]);

  /* ------------------------------ */
  /* Loading                        */
  /* ------------------------------ */

  const [saving, setSaving] =
    useState(false);

  /* ------------------------------ */
  /* Image Upload                   */
  /* ------------------------------ */

  async function handleImageUpload(
    file: File
  ) {
    try {
      setUploadingImage(true);

      const url =
        await uploadOfferImage(file);

      setImage(url);
    } finally {
      setUploadingImage(false);
    }
  }

useEffect(() => {
  async function loadProducts() {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  }

  loadProducts();
}, []);
    return (
    <form
      className="space-y-8"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      {/* Image Upload */}

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border border-[#2d2208] bg-[#111111] p-6"
      >
        <h1 className="mb-8 text-3xl font-black text-white">
  {mode === "edit"
    ? "Edit Offer"
    : "Create Offer"}
</h1>
        <h2 className="mb-5 text-xl font-bold text-white">
          Offer Image
        </h2>

        <label
  onDragOver={(e) => e.preventDefault()}
  onDrop={async (e) => {
    e.preventDefault();

    const file = e.dataTransfer.files?.[0];

    if (!file) return;

    await handleImageUpload(file);
  }}
  className="
    flex
    h-72
    cursor-pointer
    items-center
    justify-center
    overflow-hidden
    rounded-2xl
    border-2
    border-dashed
    border-[#3b2a08]
    bg-[#181818]
    transition
    hover:border-[#ffb800]
  "
>
          {image ? (
            <div className="relative h-full w-full">
  <Image
    src={image}
    alt="Offer"
    fill
    className="object-contain"
  />

  <div className="absolute right-3 top-3 z-20 flex gap-2">
    <button
  type="button"
  onClick={(e) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  }}
  className="flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur transition hover:bg-[#ffb800] hover:text-black"
>
  <Pencil size={18} />
</button>

    <button
  type="button"
  onClick={(e) => {
    e.stopPropagation();
    setImage("");
  }}
  className="flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur transition hover:bg-red-600"
>
  <Trash2 size={18} />
</button>
  </div>
</div>
          ) : (
            <div className="text-center">
              {uploadingImage ? (
                <>
                  <Loader2 className="mx-auto h-10 w-10 animate-spin text-[#ffb800]" />
                  <p className="mt-3 text-neutral-400">
                    Uploading...
                  </p>
                </>
              ) : (
                <>
                  <ImagePlus className="mx-auto h-12 w-12 text-[#ffb800]" />
                  <p className="mt-4 font-medium text-white">
                    Upload Offer Image
                  </p>
                  <p className="mt-1 text-sm text-neutral-500">
                    JPG • PNG • WEBP
                  </p>
                </>
              )}
            </div>
          )}

          <input
  ref={fileInputRef}
  type="file"
  accept="image/*"
  hidden
  onChange={async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    await handleImageUpload(file);
  }}
/>
        </label>
      </motion.div>

      {/* Basic Details */}

      <div className="grid gap-6 lg:grid-cols-2">

        {/* English */}

        <div className="rounded-3xl border border-[#2d2208] bg-[#111111] p-6">

          <h2 className="mb-5 text-xl font-bold text-white">
            English
          </h2>

          <div className="space-y-5">

            <div>
              <label className="mb-2 block text-sm text-neutral-300">
                Title
              </label>

              <input
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                className="w-full rounded-xl border border-[#2d2208] bg-[#181818] px-4 py-3 text-white outline-none focus:border-[#ffb800]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-neutral-300">
                Description
              </label>

              <textarea
                rows={4}
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                className="w-full rounded-xl border border-[#2d2208] bg-[#181818] px-4 py-3 text-white outline-none focus:border-[#ffb800]"
              />
            </div>

          </div>

        </div>

        {/* Arabic */}

        <div className="rounded-3xl border border-[#2d2208] bg-[#111111] p-6">

          <h2 className="mb-5 text-xl font-bold text-white">
            العربية
          </h2>

          <div className="space-y-5">

            <div>
              <label className="mb-2 block text-sm text-neutral-300">
                Title
              </label>

              <input
                dir="rtl"
                value={titleAr}
                onChange={(e) =>
                  setTitleAr(e.target.value)
                }
                className="w-full rounded-xl border border-[#2d2208] bg-[#181818] px-4 py-3 text-right text-white outline-none focus:border-[#ffb800]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-neutral-300">
                Description
              </label>

              <textarea
                dir="rtl"
                rows={4}
                value={descriptionAr}
                onChange={(e) =>
                  setDescriptionAr(e.target.value)
                }
                className="w-full rounded-xl border border-[#2d2208] bg-[#181818] px-4 py-3 text-right text-white outline-none focus:border-[#ffb800]"
              />
            </div>

          </div>

        </div>

      </div>

            {/* Offer Settings */}

      <div className="grid gap-6 lg:grid-cols-2">

        {/* Settings */}

        <div className="rounded-3xl border border-[#2d2208] bg-[#111111] p-6">

          <h2 className="mb-5 text-xl font-bold text-white">
            Offer Settings
          </h2>

          <div className="space-y-5">

            {/* Badge */}

            <div>
              <label className="mb-2 block text-sm text-neutral-300">
                Badge
              </label>

              <select
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                className="w-full rounded-xl border border-[#2d2208] bg-[#181818] px-4 py-3 text-white outline-none focus:border-[#ffb800]"
              >
                <option>Hot Deal</option>
                <option>Best Seller</option>
                <option>Limited</option>
                <option>New</option>
                <option>Family Pack</option>
              </select>
            </div>

            {/* Offer Price */}

            <div>
              <label className="mb-2 block text-sm text-neutral-300">
                Offer Price (ر.س)
              </label>

              <input
  type="number"
  min={0}
  value={offerPrice}
  onChange={(e) => setOfferPrice(e.target.value)}
  className="w-full rounded-xl border border-[#2d2208] bg-[#181818] px-4 py-3 text-white outline-none focus:border-[#ffb800]"
/>
            </div>

            {/* Display Order */}

            <div>
              <label className="mb-2 block text-sm text-neutral-300">
                Display Order
              </label>

              <input
                type="number"
                min={1}
                value={displayOrder}
                onChange={(e) =>
                  setDisplayOrder(Number(e.target.value))
                }
                className="w-full rounded-xl border border-[#2d2208] bg-[#181818] px-4 py-3 text-white outline-none focus:border-[#ffb800]"
              />
            </div>

            {/* Active */}

            <label className="flex items-center justify-between rounded-2xl border border-[#2d2208] bg-[#181818] p-4">

              <span className="font-medium text-white">
                Active Offer
              </span>

              <input
                type="checkbox"
                checked={active}
                onChange={(e) =>
                  setActive(e.target.checked)
                }
                className="h-5 w-5 accent-[#ffb800]"
              />

            </label>

          </div>

        </div>

        {/* Price Summary */}

        <div className="rounded-3xl border border-[#2d2208] bg-[#111111] p-6">

          <h2 className="mb-5 text-xl font-bold text-white">
            Price Summary
          </h2>

          <div className="space-y-5">

            <div className="rounded-2xl bg-[#181818] p-5">

              <p className="text-sm text-neutral-400">
                Original Price
              </p>

              <h3 className="mt-2 text-3xl font-black text-white">
                {originalPrice.toFixed(2)} ر.س
              </h3>

            </div>

            <div className="rounded-2xl bg-[#181818] p-5">

              <p className="text-sm text-neutral-400">
                Offer Price
              </p>

             <h3 className="mt-2 text-3xl font-black text-[#ffb800]">
  {Number(offerPrice || 0).toFixed(2)} ر.س
</h3>

            </div>

            <div className="rounded-2xl bg-[#181818] p-5">

              <p className="text-sm text-neutral-400">
                Customer Saves
              </p>

              <h3 className="mt-2 text-3xl font-black text-green-400">
                {savedAmount.toFixed(2)} ر.س
              </h3>

            </div>

          </div>

        </div>

      </div>
{/* Products */}

<div className="rounded-3xl border border-[#2d2208] bg-[#111111] p-6">

  <div className="mb-6 flex items-center justify-between">

    <div>
      <h2 className="text-2xl font-bold text-white">
        Select Products
      </h2>

      <p className="mt-1 text-sm text-neutral-400">
        Choose the products included in this combo.
      </p>
    </div>

    <div className="rounded-xl bg-[#ffb800]/10 px-4 py-2">
      <span className="font-semibold text-[#ffb800]">
        {selectedProducts.length} Selected
      </span>
    </div>

  </div>

  {/* Search */}
  <div className="mb-6">
    <input
      type="text"
      placeholder="🔍 Search products..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full rounded-xl border border-[#2d2208] bg-[#181818] px-4 py-3 text-white outline-none focus:border-[#ffb800]"
    />
  </div>

  <div className="space-y-4">

    {filteredProducts.length === 0 ? (

      <div className="rounded-2xl border border-dashed border-[#2d2208] py-12 text-center">
        <p className="text-neutral-500">
          No products found.
        </p>
      </div>

    ) : (

      filteredProducts.map((product) => {

        const selected = selectedProducts.find(
          (item) => item.product.id === product.id
        );

        return (

          <div
            key={product.id}
            className="flex items-center justify-between rounded-2xl border border-[#2d2208] bg-[#181818] p-4"
          >

            <div>
              <h3 className="font-semibold text-white">
                {product.name}
              </h3>

              <p className="mt-1 text-sm text-[#ffb800]">
                {Number(product.price).toFixed(2)} ر.س
              </p>
            </div>

            <div className="flex items-center gap-3">

              <input
                type="checkbox"
                checked={!!selected}
                onChange={(e) => {

                  if (e.target.checked) {

                    setSelectedProducts((prev) => [
                      ...prev,
                      {
                        product,
                        quantity: 1,
                      },
                    ]);

                  } else {

                    setSelectedProducts((prev) =>
                      prev.filter(
                        (item) =>
                          item.product.id !== product.id
                      )
                    );

                  }

                }}
                className="h-5 w-5 accent-[#ffb800]"
              />

              {selected && (

                <input
                  type="number"
                  min={1}
                  value={selected.quantity}
                  onChange={(e) => {

                    const qty = Number(e.target.value);

                    setSelectedProducts((prev) =>
                      prev.map((item) =>
                        item.product.id === product.id
                          ? {
                              ...item,
                              quantity: qty,
                            }
                          : item
                      )
                    );

                  }}
                  className="w-20 rounded-xl border border-[#2d2208] bg-[#111111] px-3 py-2 text-center text-white outline-none focus:border-[#ffb800]"
                />

              )}

            </div>

          </div>

        );

      })

    )}

  </div>

</div>

      {/* Selected Products Preview */}

      <div className="rounded-3xl border border-[#2d2208] bg-[#111111] p-6">

        <h2 className="mb-5 text-xl font-bold text-white">
          Selected Items
        </h2>

        {selectedProducts.length === 0 ? (

          <p className="text-neutral-500">
            No products selected.
          </p>

        ) : (

          <div className="space-y-3">

            {selectedProducts.map((item) => (

              <div
                key={item.product.id}
                className="flex items-center justify-between rounded-xl bg-[#181818] px-4 py-3"
              >

                <span className="font-medium text-white">
                  {item.product.name}
                </span>

                <span className="font-bold text-[#ffb800]">
                  × {item.quantity}
                </span>

              </div>

            ))}

          </div>

        )}

      </div>
            {/* Save Button */}

      <div className="flex justify-end">

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          disabled={saving || uploadingImage}
          onClick={async () => {
            try {
              setSaving(true);

              if (!image) {
                alert("Please upload an offer image.");
                return;
              }

              if (!title.trim()) {
                alert("Please enter the offer title.");
                return;
              }

              if (selectedProducts.length === 0) {
                alert("Please select at least one product.");
                return;
              }
await onSubmit({
  title,
  title_ar: titleAr,
  description,
  description_ar: descriptionAr,
  badge,
  image,
  offer_price: Number(offerPrice),
  original_price: originalPrice,
  saved_amount: savedAmount,
  active,
  display_order: displayOrder,
  selectedProducts,
});
            } finally {
              setSaving(false);
            }
          }}
          className="
            flex
            items-center
            gap-3
            rounded-2xl
            bg-[#ffb800]
            px-8
            py-4
            text-lg
            font-bold
            text-black
            transition
            hover:bg-[#ffd24d]
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {saving ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              {mode === "edit"
  ? "Updating..."
  : "Saving..."}
            </>
          ) : (
            <>
              <Save className="h-5 w-5" />
              {mode === "edit"
  ? "Update Offer"
  : "Save Offer"}
            </>
          )}
        </motion.button>

      </div>

    </form>
  );
}