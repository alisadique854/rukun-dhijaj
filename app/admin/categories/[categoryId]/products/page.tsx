"use client";

import { useEffect, useState } from "react";
import { Plus, Package } from "lucide-react";
import { useParams } from "next/navigation";

import ProductForm from "@/components/product/ProductForm";

import {
  Product,
  getProducts,
  deleteProduct,
} from "@/services/product.service";

export default function ProductsPage() {
  const params = useParams();
  const categoryId = params.categoryId as string;

  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const loadProducts = async () => {
    setLoading(true);
    const data = await getProducts(categoryId);
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    if (categoryId) {
      loadProducts();
    }
  }, [categoryId]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    await deleteProduct(categoryId, id);
    await loadProducts();
  };

  return (
    <main className="min-h-screen bg-[#090909] px-6 py-10">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-white">Products</h1>
            <p className="text-neutral-400">Manage products in this category</p>
          </div>

          <button
            onClick={() => {
              if (open) {
                setOpen(false);
                setEditingProduct(null);
              } else {
                setEditingProduct(null);
                setOpen(true);
              }
            }}
            className="flex items-center gap-2 rounded-2xl bg-[#ffb800] px-6 py-3 font-bold text-black transition hover:bg-[#e6a500]"
          >
            <Plus size={18} />
            {open ? "Close" : "Add Product"}
          </button>
        </div>

        {/* Product Form */}
        {open && (
          <ProductForm
            categoryId={categoryId}
            nextOrder={products.length + 1}
            editData={editingProduct}
            onSuccess={() => {
              setOpen(false);
              setEditingProduct(null);
              loadProducts();
            }}
          />
        )}

        {/* Loading */}
        {loading ? (
          <div className="rounded-2xl border border-[#2d2208] bg-[#111111] p-8 text-center text-neutral-400">
            Loading products...
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#2d2208] bg-[#111111] p-10 text-center">
            <Package size={50} className="mx-auto text-neutral-600" />
            <h2 className="mt-4 text-xl font-bold text-white">No Products Found</h2>
            <p className="mt-2 text-neutral-400">Add your first product to this category.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex gap-4 rounded-2xl border border-[#2d2208] bg-[#111111] p-5"
              >
                {/* Image */}
                <div className="h-20 w-20 overflow-hidden rounded-xl bg-black shrink-0">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-neutral-500">
                      No Image
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white">
                    {product.name}
                    {((product as any).name_ar || (product as any).nameAr) && (
                      <span className="ml-2 text-sm font-medium text-neutral-400 font-cairo">
                        ({(product as any).name_ar || (product as any).nameAr})
                      </span>
                    )}
                  </h3>

                  <p className="mt-2 text-sm text-neutral-400">
                    {product.description}
                  </p>

                  <p className="mt-2 text-lg font-bold text-[#ffb800]">
                    SAR {product.price}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 justify-center">
                  <button
                    onClick={() => {
                      setEditingProduct(product);
                      setOpen(true);
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                    className="rounded-lg bg-blue-500 px-3 py-2 text-xs font-bold text-white hover:bg-blue-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(product.id!)}
                    className="rounded-lg bg-red-500 px-3 py-2 text-xs font-bold text-white hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}