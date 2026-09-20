import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

export interface Category {
  id?: string;
  name: string;
  name_ar?: string;
  nameAr?: string;
  color: string;
  order: number;
  active: boolean;
  image?: string;
  productCount?: number;
}

const categoryRef = collection(db, "categories");

/* ===========================
   Memory Cache
=========================== */

let categoryCache: Category[] | null = null;
let categoryCacheTime = 0;

const CACHE_DURATION = 5 * 60 * 1000; // 5 Minutes

/* ===========================
   Add Category
=========================== */

export async function addCategory(category: Category) {
  await addDoc(categoryRef, {
    name: category.name,
    name_ar: category.name_ar || category.nameAr || "",
    nameAr: category.name_ar || category.nameAr || "",
    color: category.color,
    order: category.order,
    active: category.active,
    image: category.image ?? "",
    productCount: 0,
  });

  // Clear cache
  categoryCache = null;
}

/* ===========================
   Get Categories
=========================== */

export async function getCategories(
  forceRefresh = false
): Promise<Category[]> {
  const now = Date.now();

  if (
    !forceRefresh &&
    categoryCache &&
    now - categoryCacheTime < CACHE_DURATION
  ) {
    return categoryCache;
  }

  const q = query(categoryRef, orderBy("order", "asc"));

  const snapshot = await getDocs(q);

  const data = snapshot.docs.map((item) => ({
    id: item.id,
    ...(item.data() as Omit<Category, "id">),
  }));

  categoryCache = data;
  categoryCacheTime = now;

  return data;
}

/* ===========================
   Update Category
=========================== */

export async function updateCategory(
  id: string,
  data: Partial<Category>
) {
  const categoryDoc = doc(db, "categories", id);

  const updateData: any = { ...data };

  if (data.name_ar || data.nameAr) {
    updateData.name_ar = data.name_ar || data.nameAr;
    updateData.nameAr = data.name_ar || data.nameAr;
  }

  await updateDoc(categoryDoc, updateData);

  // Clear cache
  categoryCache = null;
}

/* ===========================
   Delete Category
=========================== */

export async function deleteCategory(id: string) {
  const categoryDoc = doc(db, "categories", id);

  await deleteDoc(categoryDoc);

  // Clear cache
  categoryCache = null;
}