"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import OfferForm from "../components/OfferForm";

import {
  getOfferById,
  getOfferItems,
  updateOffer,
  saveOfferItems,
} from "@/services/offer.service";

import {
  getProductById,
  Product,
} from "@/services/product.service";

export default function EditOfferPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [offer, setOffer] = useState<any>(null);

  useEffect(() => {
    if (id) {
      loadOffer();
    }
  }, [id]);

  async function loadOffer() {
    try {
      setLoading(true);

      const offerData = await getOfferById(id);

      if (!offerData) {
        alert("Offer not found.");
        router.push("/admin/offers");
        return;
      }

      const offerItems = await getOfferItems(id);

     const selectedProducts: any[] = [];

for (const item of offerItems) {
  const product = await getProductById(item.product_id);

  if (product) {
    selectedProducts.push({
      product,
      quantity: item.quantity,
    });
  }
}

      setOffer({
        ...offerData,
        selectedProducts,
      });
    } catch (error) {
      console.error("Failed to load offer:", error);

      alert("Failed to load offer.");

      router.push("/admin/offers");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(values: any) {
     console.log("VALUES:", values);
  console.log("SELECTED PRODUCTS:", values.selectedProducts);
    try {
      await updateOffer(id, {
        title: values.title,
        title_ar: values.title_ar,
        description: values.description,
        description_ar: values.description_ar,
        image: values.image,
        badge: values.badge,
        original_price: values.original_price,
        offer_price: values.offer_price,
        saved_amount:
          values.original_price - values.offer_price,
        active: values.active,
        display_order: values.display_order,
      });

  await saveOfferItems(
  id,
  values.selectedProducts.map((item: any) => ({
    product_id: item.product.id,
    quantity: item.quantity ?? 1,
  }))
);

      router.push("/admin/offers");
    } catch (error) {
      console.error(error);
      alert("Failed to update offer.");
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#090909]">
        <div className="text-lg font-semibold text-white">
          Loading...
        </div>
      </main>
    );
  }

  if (!offer) {
    return null;
  }

  return (
    <OfferForm
      mode="edit"
      initialData={offer}
      onSubmit={handleSubmit}
    />
  );
}