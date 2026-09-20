"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

import { useCart } from "@/context/CartContext";
import CategoryCard from "@/components/category/CategoryCard";
import ProductItem from "@/components/category/ProductItem";
import ProductModal from "@/components/category/ProductModal";

import { getCategories } from "@/services/category.service";
import { getProducts } from "@/services/product.service";
import { getTranslations } from "@/lib/translations";

interface CategoriesProps {
  locale: "en" | "ar";
}

export default function Categories({ locale }: CategoriesProps) {
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);
  const [fireCategories, setFireCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  

  const {
    items,
    addItem,
    increaseQty,
    decreaseQty,
  } = useCart();

  const isRtl = locale === "ar";
  const t = getTranslations(locale);

  const scrollRef = useRef<HTMLDivElement>(null);

  const selectedCategory =
    fireCategories.find((item) => item.id === expandedCategory) ?? null;

  const addToOrder = (product: any) => {
    const prodNameAr = product.name_ar || product.nameAr;

    addItem({
      id: String(product.id),
      name: isRtl && prodNameAr ? prodNameAr : product.name,
      price: product.price,
      image: product.image,
    });
  };

  useEffect(() => {
    document.body.style.overflow = selectedCategory ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedCategory]);

  useEffect(() => {
    const loadCategories = async () => {
      const data = await getCategories();

      const categoriesWithCount = await Promise.all(
        data
          .filter((item) => item.active)
          .map(async (cat) => ({
            ...cat,
            productCount: (await getProducts(cat.id!)).length,
          }))
      );

      setFireCategories(categoriesWithCount);
    };

    loadCategories();
  }, []);

  useEffect(() => {
    (window as any).handleSearchSelection = async (
      categoryId: string,
      productId?: string
    ) => {
      const catId = Number(categoryId);

      setIsLoading(true);

      const data = await getProducts(categoryId);

      setProducts(data);
      window.history.pushState(
  { category: true },
  "",
  ""
);
      setExpandedCategory(catId);

      setIsLoading(false);

      if (productId) {
        setTimeout(() => {
          const element = document.getElementById(
            `product-${productId}`
          );

          if (element) {
            element.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }, 500);
      }
    };

    return () => {
      delete (window as any).handleSearchSelection;
    };
  }, [fireCategories, locale]);

  useEffect(() => {
  const handlePopState = () => {
    if (expandedCategory !== null) {
      setExpandedCategory(null);
      setProducts([]);
    }
  };

  window.addEventListener("popstate", handlePopState);

  return () => {
    window.removeEventListener("popstate", handlePopState);
  };
}, [expandedCategory]);

  return (
    <section className="space-y-6" dir={isRtl ? "rtl" : "ltr"}>
  <div className={isRtl ? "text-right" : "text-left"}>
    <h2 className="text-3xl font-bold text-white font-cairo">
      {t.categories.title}
    </h2>

    <p className="mt-2 text-neutral-400 font-cairo">
      {t.categories.subtitle}
    </p>
  </div>

  <AnimatePresence mode="wait">
    {!selectedCategory && (
     <motion.div
       initial={{ opacity: 1, scale: 1 }}
       animate={{ opacity: 1, scale: 1 }}
       exit={{
       opacity: 0,
       scale: 0.98,
     }}
       transition={{
       duration: 0.45,
     }}
        className="grid grid-cols-2 gap-5"
      >
        {fireCategories.map((category) => {
          const catNameAr =
            category.name_ar || category.nameAr;

          return (
            <motion.div
              key={category.id}
              layoutId={`category-${category.id}`}
            >
              <CategoryCard
                name={
                  isRtl && catNameAr
                    ? catNameAr
                    : category.name
                }
                color={category.color}
                image={category.image}
                productCount={category.productCount}
                expanded={false}
                onClick={async () => {
                  setIsLoading(true);

                  const data = await getProducts(
                    category.id
                  );

                  setProducts(data);
                  setIsLoading(false);
                  window.history.pushState(
  { category: true },
  "",
  ""
);



                  setExpandedCategory(category.id);

                  setIsLoading(false);
                }}
              />
            </motion.div>
          );
        })}
      </motion.div>
    )}
  </AnimatePresence>

  <AnimatePresence>
    {selectedCategory && (
      <motion.div
        initial={{
         opacity:0,
        }}  
        animate={{
          opacity: 1,
          
        }}
        exit={{
          opacity: 0,
          
        }}
        transition={{
          duration: 0.3,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="fixed inset-0 z-50 bg-[#050505] overflow-y-auto no-scrollbar"
        ref={scrollRef}
      >
        <motion.div
        layoutId={`category-${selectedCategory.id}`}
        transition={{
        layout:{
        duration:0.55,
        ease:[0.22,1,0.36,1]
        }
        }}
          className="relative"
        >
         <div className="sticky top-0 z-20 bg-black/60 backdrop-blur-xl">
  <div className="w-full lg:max-w-[1600px] lg:mx-auto lg:px-6">
    <div className="p-4 flex items-center justify-between">
      <button
        onClick={() => {
          if (window.history.length > 1) {
            window.history.back();
          } else {
            setExpandedCategory(null);
            setProducts([]);
          }
        }}
        className="flex items-center gap-2 rounded-xl bg-neutral-800 px-4 py-2 text-white hover:bg-neutral-700 transition"
      >
        {isRtl ? "→ رجوع" : "← Back"}
      </button>
    </div>
  </div>
</div>
          {isLoading ? (
  <div className="space-y-4 p-5">
    {[1, 2, 3].map((i) => (
      <div
        key={i}
        className="h-32 w-full rounded-2xl bg-neutral-800 animate-pulse"
      />
    ))}
  </div>
) : (
  <div className="pb-20">
  <div className="w-full lg:max-w-[1600px] lg:mx-auto px-5 lg:px-6">
    <motion.div
      
   layout 
   initial={{
   opacity:0
   }}
   animate={{
   opacity:1
   }}
      
      transition={{ delay: 0.15, duration: 0.4 }}
    >
      <Image
        src={selectedCategory.image || "/placeholder.png"}
        alt={selectedCategory.name}
        width={1200}
        height={700}
        className="w-full aspect-[16/9] rounded-3xl object-cover"
      />
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="mt-6"
    >
      <h1 className="text-4xl font-bold text-white">
        {isRtl
          ? (selectedCategory.name_ar || selectedCategory.nameAr)
          : selectedCategory.name}
      </h1>

      <p className="mt-2 text-neutral-400">
        {t.categories.itemsTitle}
      </p>
    </motion.div>

    <motion.div
      className="mt-8 space-y-5"
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.03,
          },
        },
      }}
    >
      {products.map((product) => (
        <motion.div
          key={product.id}
          id={`product-${product.id}`}
          variants={{
            hidden: {
              opacity: 0,
              y: 20,
            },
            show: {
              opacity: 1,
              y: 0,
            },
          }}
        >
          <ProductItem
            id={product.id}
            name={product.name}
            nameAr={product.name_ar || product.nameAr}
            description={
  isRtl
    ? (product.description_ar ||
       product.descriptionAr ||
       product.description)
    : product.description
}
descriptionAr={
  product.description_ar ||
  product.descriptionAr
}

ingredients={
  product.ingredients || []
}

ingredientsAr={
  product.ingredients_ar || []
}
            price={product.price}
            image={product.image}
            color={selectedCategory.color}
            quantity={
              items.find(
                (i) => i.id === String(product.id)
              )?.quantity || 0
            }
            onIncrease={() =>
              increaseQty(String(product.id))
            }
            onDecrease={() =>
              decreaseQty(String(product.id))
            }
            onAdd={() => addToOrder(product)}

           
          />
        </motion.div>
      ))}
    </motion.div>
  </div>
  </div>
)}

        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
</section>
  );
}