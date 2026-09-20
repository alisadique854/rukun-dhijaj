"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { uploadProductImage } from "@/services/storage.service";

import {
  addProduct,
  updateProduct,
  Product,
} from "@/services/product.service";

interface ProductFormProps {
  categoryId: string;
  nextOrder: number;
  onSuccess: () => void;
  editData?: Product | null;
}

export default function ProductForm({
  categoryId,
  nextOrder,
  onSuccess,
  editData,
}: ProductFormProps) {
  const [name, setName] = useState("");
  const [nameAr, setNameAr] = useState("");

  const [description, setDescription] = useState("");
  const [descriptionAr, setDescriptionAr] = useState("");

  const [ingredients, setIngredients] = useState("");
  const [ingredientsAr, setIngredientsAr] = useState("");

  const [price, setPrice] = useState("");

  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!editData) return;

    setName(editData.name);
    setNameAr(editData.name_ar || editData.nameAr || "");

    setDescription(editData.description);
    setDescriptionAr(editData.description_ar || "");

    setIngredients(
      (editData.ingredients || []).join(", ")
    );

    setIngredientsAr(
      (editData.ingredients_ar || []).join(", ")
    );

    setPrice(String(editData.price));

    setImage(editData.image || "");
    setImageFile(null);
  }, [editData]);
  const handleSave = async () => {
  if (!name.trim()) {
    alert("Enter product name");
    return;
  }

  if (!price) {
    alert("Enter product price");
    return;
  }

  try {
    setSaving(true);

    let imageUrl = image;

    if (imageFile) {
      setUploading(true);

      try {
        imageUrl = await uploadProductImage(imageFile);
      } finally {
        setUploading(false);
      }
    }

    const product: Product = {
      name,
      name_ar: nameAr,
      nameAr: nameAr,

      description,
      description_ar: descriptionAr,

      ingredients: ingredients
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),

      ingredients_ar: ingredientsAr
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),

      image: imageUrl,
      gallery: [],

      price: Number(price),

      active: true,

      order: editData?.order ?? nextOrder,
    };

    if (editData?.id) {
      await updateProduct(
        categoryId,
        editData.id,
        product
      );
    } else {
      await addProduct(categoryId, product);
    }

    setName("");
    setNameAr("");

    setDescription("");
    setDescriptionAr("");

    setIngredients("");
    setIngredientsAr("");

    setPrice("");

    setImage("");
    setImageFile(null);

    onSuccess();
  } catch (err) {
    console.error(err);
    alert("Failed to save product.");
  } finally {
    setSaving(false);
    setUploading(false);
  }
};
  return (
    <div className="mb-8 rounded-3xl border border-[#2d2208] bg-[#111111] p-6">
      <h2 className="mb-6 text-2xl font-bold text-white">
        {editData ? "Edit Product" : "Add Product"}
      </h2>

      <div className="grid gap-5">

        {/* Product Name English */}
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name (English)"
          className="rounded-xl border border-[#2d2208] bg-[#181818] px-4 py-3 text-white outline-none focus:border-[#ffb800]"
        />

        {/* Product Name Arabic */}
        <input
          value={nameAr}
          onChange={(e) => setNameAr(e.target.value)}
          placeholder="Product Name (Arabic)"
          dir="rtl"
          className="rounded-xl border border-[#2d2208] bg-[#181818] px-4 py-3 text-white outline-none focus:border-[#ffb800]"
        />

        {/* Description English */}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (English)"
          rows={4}
          className="rounded-xl border border-[#2d2208] bg-[#181818] px-4 py-3 text-white outline-none focus:border-[#ffb800]"
        />

        {/* Description Arabic */}
        <textarea
          value={descriptionAr}
          onChange={(e) => setDescriptionAr(e.target.value)}
          placeholder="Description (Arabic)"
          dir="rtl"
          rows={4}
          className="rounded-xl border border-[#2d2208] bg-[#181818] px-4 py-3 text-white outline-none focus:border-[#ffb800]"
        />

        {/* Ingredients English */}
        <input
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Ingredients (English)"
          className="rounded-xl border border-[#2d2208] bg-[#181818] px-4 py-3 text-white outline-none focus:border-[#ffb800]"
        />

        <p className="-mt-3 text-xs text-neutral-500">
          Example: Chicken, Cheese, Tomato, Onion
        </p>

        {/* Ingredients Arabic */}
        <input
          value={ingredientsAr}
          onChange={(e) => setIngredientsAr(e.target.value)}
          placeholder="Ingredients (Arabic)"
          dir="rtl"
          className="rounded-xl border border-[#2d2208] bg-[#181818] px-4 py-3 text-white outline-none focus:border-[#ffb800]"
        />

        {/* Price */}
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price (SAR)"
          className="rounded-xl border border-[#2d2208] bg-[#181818] px-4 py-3 text-white outline-none focus:border-[#ffb800]"
        />

        {/* Product Image */}
        <div>
          <label className="mb-2 block text-sm text-neutral-300">
            Product Image
          </label>

          <input
            type="file"
            accept="image/*"
            disabled={uploading}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;

              setImageFile(file);
              setImage(URL.createObjectURL(file));
            }}
            className="w-full rounded-xl border border-[#2d2208] bg-[#181818] px-4 py-3 text-white"
          />

          {uploading && (
            <p className="mt-3 text-yellow-400">
              Uploading image...
            </p>
          )}

          {image && (
            <div className="mt-4 overflow-hidden rounded-2xl border border-[#2d2208]">
              <img
                src={image}
                alt="Preview"
                className="h-48 w-full object-cover"
              />
            </div>
          )}
        </div>

      </div>

      <button
        onClick={handleSave}
        disabled={saving || uploading}
        className="mt-6 flex items-center gap-2 rounded-2xl bg-[#ffb800] px-8 py-4 font-bold text-black transition hover:bg-[#e6a500] disabled:opacity-50"
      >
        <Plus size={18} />
        {uploading
          ? "Uploading..."
          : saving
          ? "Saving..."
          : editData
          ? "Update Product"
          : "Add Product"}
      </button>
    </div>
  );
}
