import {
  collection,
  collectionGroup,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  increment,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

export interface Product {
  id?: string;
  categoryId?: string;

  name: string;
  name_ar?: string;
  nameAr?: string;

  description: string;
  description_ar?: string;

  ingredients?: string[];
  ingredients_ar?: string[];

  price: number;

  image: string;

  gallery?: string[];

  order: number;

  active: boolean;
}
/* =======================================================
   Memory Cache
======================================================= */

let productsCache = new Map<string, Product[]>();
let allProductsCache: Product[] | null = null;

let productsCacheTime = new Map<string, number>();
let allProductsCacheTime = 0;

const CACHE_DURATION = 5 * 60 * 1000;

export async function addProduct(
  categoryId: string,
  product: Product
) {
  const productRef = collection(
    db,
    "categories",
    categoryId,
    "products"
  );

 await addDoc(productRef, {
  name: product.name,
  name_ar: product.name_ar || product.nameAr || "",
  nameAr: product.name_ar || product.nameAr || "",

  description: product.description,
  description_ar: product.description_ar || "",

  ingredients: product.ingredients || [],
  ingredients_ar: product.ingredients_ar || [],

  price: product.price,

  image: product.image || "",
  gallery: product.gallery || [],

  order: product.order,
  active: product.active,
});

  const categoryDoc = doc(db, "categories", categoryId);

  await updateDoc(categoryDoc, {
    productCount: increment(1),
  });
  productsCache.clear();
allProductsCache = null;
productsCacheTime.clear();
allProductsCacheTime = 0;
}

export async function getProducts(
  categoryId: string,
  forceRefresh = false
): Promise<Product[]> {
  const now = Date.now();

  const cachedProducts = productsCache.get(categoryId);
  const cachedTime = productsCacheTime.get(categoryId);

  if (
    !forceRefresh &&
    cachedProducts &&
    cachedTime &&
    now - cachedTime < CACHE_DURATION
  ) {
    return cachedProducts;
  }

  const productRef = collection(
    db,
    "categories",
    categoryId,
    "products"
  );

  const q = query(productRef, orderBy("order", "asc"));

  const snapshot = await getDocs(q);

  const products = snapshot.docs.map((item) => ({
    id: item.id,
    categoryId,
    ...(item.data() as Omit<Product, "id">),
  }));

  productsCache.set(categoryId, products);
  productsCacheTime.set(categoryId, now);

  return products;
}

/* =======================================================
   Get ALL Products (Used for Offers)
======================================================= */
export async function getAllProducts(
  forceRefresh = false
): Promise<Product[]> {
  const now = Date.now();

  if (
    !forceRefresh &&
    allProductsCache &&
    now - allProductsCacheTime < CACHE_DURATION
  ) {
    return allProductsCache;
  }

  const q = query(
    collectionGroup(db, "products"),
    where("active", "==", true),
    orderBy("order", "asc")
  );

  const snapshot = await getDocs(q);

  const products = snapshot.docs.map((item) => {
    const data = item.data();

    return {
      id: item.id,
      categoryId: item.ref.parent.parent?.id,

      name: data.name,
      name_ar: data.name_ar || "",
      nameAr: data.nameAr || "",

      description: data.description || "",
      description_ar: data.description_ar || "",

      ingredients: data.ingredients || [],
      ingredients_ar: data.ingredients_ar || [],

      price: Number(data.price || 0),

      image: data.image || "",

      gallery: data.gallery || [],

      order: data.order || 0,

      active: data.active ?? true,
    };
  });

  allProductsCache = products;
  allProductsCacheTime = now;

  return products;
}

export async function getProductById(
  productId: string
): Promise<Product | null> {
  const snapshot = await getDocs(
    collectionGroup(db, "products")
  );

  const found = snapshot.docs.find(
    (doc) => doc.id === productId
  );

  if (!found) {
    return null;
  }

  const data = found.data();

  return {
    id: found.id,
    categoryId: found.ref.parent.parent?.id,

    name: data.name,
    name_ar: data.name_ar || "",
    nameAr: data.nameAr || "",

   description: data.description || "",
description_ar: data.description_ar || "",

ingredients: data.ingredients || [],
ingredients_ar: data.ingredients_ar || [],

price: Number(data.price || 0),

    image: data.image || "",

    gallery: data.gallery || [],

    order: data.order || 0,

    active: data.active ?? true,
  };
}

export async function updateProduct(
  categoryId: string,
  productId: string,
  data: Partial<Product>
) {
  const productDoc = doc(
    db,
    "categories",
    categoryId,
    "products",
    productId
  );

  const updateData: any = { ...data };

  if (data.name_ar || data.nameAr) {
    updateData.name_ar =
      data.name_ar || data.nameAr;

    updateData.nameAr =
      data.name_ar || data.nameAr;
  }

  await updateDoc(productDoc, updateData);
  productsCache.clear();
allProductsCache = null;
productsCacheTime.clear();
allProductsCacheTime = 0;
}

export async function deleteProduct(
  categoryId: string,
  productId: string
) {
  const productDoc = doc(
    db,
    "categories",
    categoryId,
    "products",
    productId
  );

  await deleteDoc(productDoc);

  const categoryDoc = doc(
    db,
    "categories",
    categoryId
  );

  await updateDoc(categoryDoc, {
    productCount: increment(-1),
  });
  productsCache.clear();
allProductsCache = null;
productsCacheTime.clear();
allProductsCacheTime = 0;
}