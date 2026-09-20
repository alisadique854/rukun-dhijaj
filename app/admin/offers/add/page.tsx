"use client";

import { useRouter } from "next/navigation";

import OfferForm from "../components/OfferForm";

import {
  createOffer,
  saveOfferItems,
} from "@/services/offer.service";

export default function AddOfferPage() {
  const router = useRouter();

  async function handleSubmit(data: any) {
      console.log("DATA:", data);
  console.log("SELECTED PRODUCTS:", data.selectedProducts);
    try {
      // Create Offer
      const offerId = await createOffer({
        title: data.title,
        title_ar: data.title_ar,

        description: data.description,
        description_ar: data.description_ar,

        image: data.image,

        badge: data.badge,

        original_price: data.original_price,
        offer_price: data.offer_price,
        saved_amount: data.saved_amount,

        active: data.active,
        display_order: data.display_order,
      });

      // Save Products
      await saveOfferItems(
  offerId,
  data.selectedProducts.map((item: any) => ({
    product_id: item.product.id,
    quantity: item.quantity,
  }))
);

      alert("Offer created successfully.");

      router.push("/admin/offers");
    } catch (error) {
      console.error(error);

      alert("Failed to create offer.");
    }
  }

  return (
    <main className="min-h-screen bg-[#090909] px-6 py-8">

      <div className="mx-auto max-w-7xl">

        <div className="mb-8">

          <h1 className="text-4xl font-black text-white">
            Add Offer
          </h1>

          <p className="mt-2 text-neutral-400">
            Create a new combo offer.
          </p>

        </div>

        <OfferForm
          onSubmit={handleSubmit}
        />

      </div>

    </main>
  );
}