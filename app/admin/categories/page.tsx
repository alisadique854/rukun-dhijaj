"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  FolderKanban,
} from "lucide-react";
import { uploadCategoryImage } from "../../../services/storage.service";

import {
  Category,
  addCategory,
  getCategories,
  deleteCategory,
  updateCategory,
} from "@/services/category.service";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [nameAr, setNameAr] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [color, setColor] = useState("#ffb800");

  const loadCategories = async () => {
    setLoading(true);
    const data = await getCategories();
    setCategories(data);
    setLoading(false);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleAdd = async () => {
    if (!name.trim()) {
      alert("Enter category name");
      return;
    }

    try {
      setUploading(true);
      let imageUrl = image;

      if (imageFile) {
        imageUrl = await uploadCategoryImage(imageFile);
      }

      const categoryData: any = {
        name,
        name_ar: nameAr,
        nameAr: nameAr,
        color,
        image: imageUrl,
      };

      if (editingId) {
        await updateCategory(editingId, categoryData);
        setEditingId(null);
      } else {
        await addCategory({
          ...categoryData,
          order: categories.length + 1,
          active: true,
        });
      }

      setName("");
      setNameAr("");
      setColor("#ffb800");
      setImage("");
      setImageFile(null);

      loadCategories();
    } catch (err) {
      console.error(err);
      alert("Failed to save category");
    } finally {
      setUploading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#090909] px-6 py-10">
      <div className="mx-auto max-w-6xl">
        
        <div className="mb-10 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#ffb800]/10">
            <FolderKanban size={32} className="text-[#ffb800]" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white">Categories</h1>
            <p className="text-neutral-400">Manage restaurant categories</p>
          </div>
        </div>

        {/* Add/Edit Category */}
        <div className="rounded-3xl border border-[#2d2208] bg-[#111111] p-6">
          <h2 className="mb-6 text-2xl font-bold text-white">
            {editingId ? "Edit Category" : "Add New Category"}
          </h2>

          <div className="grid gap-5 md:grid-cols-2">
            {/* English Name */}
            <div>
              <label className="mb-2 block text-sm text-neutral-300">
                Category Name (English)
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Crispy Broast"
                className="w-full rounded-xl border border-[#2d2208] bg-[#181818] px-4 py-3 text-white outline-none transition focus:border-[#ffb800]"
              />
            </div>

            {/* Arabic Name */}
            <div>
              <label className="mb-2 block text-sm text-neutral-300">
                Category Name (Arabic)
              </label>
              <input
                value={nameAr}
                onChange={(e) => setNameAr(e.target.value)}
                placeholder="مثال: بروستد مقرمش"
                dir="rtl"
                className="w-full rounded-xl border border-[#2d2208] bg-[#181818] px-4 py-3 text-white outline-none transition focus:border-[#ffb800]"
              />
            </div>
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {/* Image Upload */}
            <div>
              <label className="mb-2 block text-sm text-neutral-300">
                Category Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setImageFile(file);
                  setImage(URL.createObjectURL(file));
                }}
                className="w-full rounded-xl border border-[#2d2208] bg-[#181818] px-4 py-3 text-white"
              />
              {image && (
                <img
                  src={image}
                  alt="Preview"
                  className="mt-4 h-24 w-24 rounded-xl object-cover"
                />
              )}
            </div>

            {/* Color Picker */}
            <div>
              <label className="mb-2 block text-sm text-neutral-300">
                Category Color
              </label>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="h-[52px] w-full cursor-pointer rounded-xl border border-[#2d2208] bg-[#181818] p-2"
              />
            </div>
          </div>

          <button
            onClick={handleAdd}
            disabled={uploading}
            className="mt-6 flex items-center gap-2 rounded-2xl bg-[#ffb800] px-8 py-4 font-bold text-black transition hover:bg-[#e6a500] disabled:opacity-50"
          >
            <Plus size={20} />
            {uploading
              ? "Uploading..."
              : editingId
              ? "Update Category"
              : "Add Category"}
          </button>
        </div>

        {/* Categories List */}
        <div className="mt-10 rounded-3xl border border-[#2d2208] bg-[#111111] p-6">
          <h2 className="mb-6 text-2xl font-bold text-white">All Categories</h2>

          {loading ? (
            <p className="text-neutral-400">Loading categories...</p>
          ) : (
            <div className="space-y-4">
              {categories.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-[#2d2208] p-8 text-center">
                  <FolderKanban size={48} className="mx-auto text-neutral-600" />
                  <p className="mt-4 text-neutral-400">No categories found.</p>
                </div>
              ) : (
                categories.map((category) => (
                  <div
                    key={category.id}
                    className="flex flex-col gap-4 rounded-2xl border border-[#2d2208] bg-[#181818] p-5 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="h-6 w-6 rounded-full border border-white/10 shrink-0"
                        style={{ backgroundColor: category.color }}
                      />
                      <div>
                        <h3 className="text-lg font-bold text-white">
                          {category.name} 
                          {((category as any).name_ar || (category as any).nameAr) && (
                            <span className="ml-2 text-sm font-medium text-neutral-400">
                              ({(category as any).name_ar || (category as any).nameAr})
                            </span>
                          )}
                        </h3>
                        <p className="text-sm text-neutral-500">
                          Order : {category.order}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 justify-end">
                      <Link
                        href={`/admin/categories/${category.id}/products`}
                        className="rounded-xl bg-green-500/10 px-4 py-3 text-sm font-semibold text-green-400 transition hover:bg-green-500 hover:text-white"
                      >
                        Manage Products
                      </Link>

                      <button
                        onClick={() => {
                          setEditingId(category.id!);
                          setName(category.name);
                          setNameAr((category as any).name_ar || (category as any).nameAr || "");
                          setColor(category.color);
                          setImage(category.image ?? "");
                        }}
                        className="rounded-xl bg-yellow-500/10 p-3 text-yellow-400 transition hover:bg-yellow-500 hover:text-black"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={async () => {
                          if (!confirm("Delete this category?")) return;
                          await deleteCategory(category.id!);
                          loadCategories();
                        }}
                        className="rounded-xl bg-red-500/10 p-3 text-red-400 transition hover:bg-red-500 hover:text-white"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}