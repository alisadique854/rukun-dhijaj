"use client";
import Link from "next/link";

import { useEffect, useState } from "react";
import {
  FolderKanban,
  Plus,
  Search,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react";

import {
  Category,
  addCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "@/services/category.service";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [name, setName] = useState("");
  const [color, setColor] = useState("#ffb800");

  const [editingId, setEditingId] = useState<string | null>(null);

  const loadCategories = async () => {
    setLoading(true);

    const data = await getCategories();

    setCategories(data);

    setLoading(false);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleSave = async () => {
    if (!name.trim()) {
      alert("Enter category name");
      return;
    }

    if (editingId) {
      await updateCategory(editingId, {
        name,
        color,
      });
    } else {
      await addCategory({
        name,
        color,
        active: true,
        order: categories.length + 1,
      });
    }

    setName("");
    setColor("#ffb800");
    setEditingId(null);

    loadCategories();
  };

  const filteredCategories = categories.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#090909] p-6">

      <div className="mx-auto max-w-6xl">

        <div className="mb-8 flex items-center gap-4">

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#ffb800]/10">

            <FolderKanban
              size={32}
              className="text-[#ffb800]"
            />

          </div>

          <div>

            <h1 className="text-3xl font-black text-white">
              Categories
            </h1>

            <p className="text-neutral-400">
              Restaurant Category Manager
            </p>

          </div>

        </div>
                {/* Search & Add Form */}

        <div className="rounded-3xl border border-[#2d2208] bg-[#111111] p-6">

          <div className="grid gap-5 md:grid-cols-2">

            {/* Search */}

            <div className="relative">

              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search category..."
                className="w-full rounded-xl border border-[#2d2208] bg-[#181818] py-3 pl-12 pr-4 text-white outline-none focus:border-[#ffb800]"
              />

            </div>

            {/* Category Name */}

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Category name"
              className="rounded-xl border border-[#2d2208] bg-[#181818] px-4 py-3 text-white outline-none focus:border-[#ffb800]"
            />

          </div>

          <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <div className="flex items-center gap-3">

              <span className="text-sm text-neutral-300">
                Category Color
              </span>

              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="h-12 w-20 cursor-pointer rounded-lg border border-[#2d2208] bg-[#181818]"
              />

            </div>

            <button
              onClick={handleSave}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#ffb800] px-6 py-3 font-bold text-black transition hover:bg-[#e6a500]"
            >
              <Plus size={18} />

              {editingId
                ? "Update Category"
                : "Add Category"}
            </button>

          </div>

        </div>

        {/* Category List */}

        <div className="mt-8 space-y-4">

                  {loading ? (
            <div className="rounded-2xl border border-[#2d2208] bg-[#111111] p-8 text-center text-neutral-400">
              Loading categories...
            </div>
          ) : filteredCategories.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#2d2208] bg-[#111111] p-10 text-center">

              <FolderKanban
                size={48}
                className="mx-auto text-neutral-600"
              />

              <p className="mt-4 text-neutral-400">
                No categories found.
              </p>

            </div>
          ) : (
            filteredCategories.map((category) => (
              <div
                key={category.id}
                className="rounded-2xl border border-[#2d2208] bg-[#111111] p-5"
              >
                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                  <div className="flex items-center gap-4">

                    <div
                      className="h-12 w-12 rounded-xl border border-white/10"
                      style={{
                        backgroundColor: category.color,
                      }}
                    />

                    <div>

                      <h3 className="text-xl font-bold text-white">
                        {category.name}
                      </h3>

                      <p className="mt-1 text-sm text-neutral-500">
                        Order : {category.order}
                      </p>

                    </div>

                  </div>

                  <div className="flex items-center gap-3">

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
                        setColor(category.color);
                      }}
                      className="rounded-xl bg-yellow-500/10 p-3 text-yellow-400 transition hover:bg-yellow-500 hover:text-black"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={async () => {
                        await updateCategory(category.id!, {
                          active: !category.active,
                        });

                        loadCategories();
                      }}
                      className="rounded-xl bg-blue-500/10 p-3 text-blue-400 transition hover:bg-blue-500 hover:text-white"
                    >
                      {category.active ? (
                        <Eye size={18} />
                      ) : (
                        <EyeOff size={18} />
                      )}
                    </button>

                    <button
                      onClick={async () => {
                        if (
                          !confirm(
                            "Delete this category?"
                          )
                        )
                          return;

                        await deleteCategory(category.id!);

                        loadCategories();
                      }}
                      className="rounded-xl bg-red-500/10 p-3 text-red-400 transition hover:bg-red-500 hover:text-white"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>

                </div>

              </div>
            ))
          )}

                    {editingId && (
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => {
                  setEditingId(null);
                  setName("");
                  setColor("#ffb800");
                }}
                className="rounded-xl border border-[#2d2208] bg-[#181818] px-6 py-3 font-semibold text-white transition hover:border-[#ffb800] hover:text-[#ffb800]"
              >
                Cancel Edit
              </button>
            </div>
          )}

        </div>

      </div>

    </main>
  );
}