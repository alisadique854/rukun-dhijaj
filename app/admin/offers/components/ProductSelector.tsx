"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import {
  CheckCircle2,
  Search,
} from "lucide-react";

import {
  getAllProducts,
  Product,
} from "@/services/product.service";

interface Props {
  selectedProducts: Product[];
  onChange: (products: Product[]) => void;
}

export default function ProductSelector({
  selectedProducts,
  onChange,
}: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setFilteredProducts(products);
      return;
    }

    const keyword = search.toLowerCase();

    setFilteredProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(keyword)
      )
    );
  }, [search, products]);

  async function loadProducts() {
    console.log("loadProducts started");
    try {
      setLoading(true);

      const data = await getAllProducts();

      console.log(data);

      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error("Failed to load products", error);
    } finally {
      setLoading(false);
    }
  }

  function toggleProduct(product: Product) {
    const exists = selectedProducts.some(
      (item) => item.id === product.id
    );

    if (exists) {
      onChange(
        selectedProducts.filter(
          (item) => item.id !== product.id
        )
      );
    } else {
      onChange([...selectedProducts, product]);
    }
  }

  if (loading) {
    return (
      <div className="py-10 text-center text-neutral-500">
        Loading products...
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="py-10 text-center text-neutral-500">
        No products found.
      </div>
    );
  }

 return (
  <div className="space-y-6">
    <div className="relative">
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"
      />

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products..."
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

    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {filteredProducts.map((product) => {
        const selected = selectedProducts.some(
          (item) => item.id === product.id
        );

        return (
          <button
            key={product.id}
            type="button"
            onClick={() => toggleProduct(product)}
            className={`
              relative
              overflow-hidden
              rounded-2xl
              border
              p-4
              text-left
              transition-all

              ${
                selected
                  ? "border-[#ffb800] bg-[#ffb800]/10"
                  : "border-[#2d2208] bg-[#111111] hover:border-[#ffb800]/40"
              }
            `}
          >
            <div className="flex items-center gap-4">
<p className="text-red-500 text-xs">
  {product.image}
</p>

           {product.image ? (
  <img
    src={product.image}
    alt={product.name}
    className="h-[72px] w-[72px] rounded-xl object-cover border border-[#3b2d0f]"
  />
) : (
                <div className="flex h-[72px] w-[72px] items-center justify-center rounded-xl bg-neutral-800 text-xs text-neutral-500">
                  No Image
                </div>
              )}

              <div className="flex-1">
                <h3 className="font-bold text-white">
                  {product.name}
                </h3>

                <p className="mt-2 font-semibold text-[#ffb800]">
                  {Number(product.price).toFixed(2)} ر.س
                </p>
              </div>

              <div
                className={`
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-md
                  border
                  transition

                  ${
                    selected
                      ? "border-[#ffb800] bg-[#ffb800]"
                      : "border-neutral-600"
                  }
                `}
              >
                {selected && (
                  <CheckCircle2
                    size={18}
                    className="text-black"
                  />
                )}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  </div>
);
}