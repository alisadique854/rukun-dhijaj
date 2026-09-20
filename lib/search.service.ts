import {
  collection,
  collectionGroup,
  query,
  getDocs,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface SearchItem {
  id: string;
  type: "category" | "product";
  nameEn: string;
  nameAr: string;
  image: string;
  categoryId: string;
  categoryNameEn?: string;
  categoryNameAr?: string;
  descriptionEn?: string;
  descriptionAr?: string;
  price?: number;
}

export class SearchService {
  private cache: SearchItem[] | null = null;
  private lastFetchTime = 0;
  private readonly CACHE_DURATION = 5 * 60 * 1000;

  private async loadData(): Promise<SearchItem[]> {
    const now = Date.now();

    if (
      this.cache &&
      now - this.lastFetchTime < this.CACHE_DURATION
    ) {
      return this.cache;
    }

    try {
      const categoriesQuery = query(
        collection(db, "categories")
      );

      const categoriesSnapshot = await getDocs(
        categoriesQuery
      );

      const categoryMap = new Map<
        string,
        {
          nameEn: string;
          nameAr: string;
        }
      >();

      const items: SearchItem[] = [];

      categoriesSnapshot.forEach((doc) => {
        const data = doc.data();

        if (data.active === false) return;

        const catName =
          data.name || data.nameEn || "";

        categoryMap.set(doc.id, {
          nameEn: catName,
          nameAr: data.nameAr || catName,
        });

        items.push({
          id: doc.id,
          type: "category",
          nameEn: catName,
          nameAr: data.nameAr || catName,
          image: data.image || "",
          categoryId: doc.id,
        });
      });

      const productsQuery = query(
        collectionGroup(db, "products")
      );

      const productsSnapshot = await getDocs(
        productsQuery
      );

      productsSnapshot.forEach((doc) => {
        
        const data = doc.data();

        if (data.active === false) return;

        const prodName =
          data.name || data.nameEn || "";

        const parentId =
          doc.ref.parent.parent?.id || "";

        const catInfo =
          categoryMap.get(parentId);

        items.push({
          id: doc.id,
          type: "product",
          nameEn: prodName,
          nameAr: data.nameAr || prodName,
          image: data.image || "",
          categoryId: parentId,
          categoryNameEn: catInfo?.nameEn || "",
          categoryNameAr: catInfo?.nameAr || "",
          descriptionEn: data.description || "",
          descriptionAr:
            data.descriptionAr ||
            data.description_ar ||
            data.description ||
            "",
          price: Number(data.price) || 0,
        });
      });
            this.cache = items;
      this.lastFetchTime = now;

      return items;
    } catch (error) {
      console.error("Search load error:", error);
      return [];
    }
  }

  public async search(
    searchTerm: string,
    locale: "en" | "ar"
  ): Promise<SearchItem[]> {
    const term = searchTerm.trim().toLowerCase();

    if (!term) return [];

    const allItems = await this.loadData();

    return allItems
      .filter((item) => {
        const matchEn = item.nameEn
          .toLowerCase()
          .includes(term);

        const matchAr = item.nameAr
          .toLowerCase()
          .includes(term);

        const matchCatEn = item.categoryNameEn
          ?.toLowerCase()
          .includes(term);

        const matchCatAr = item.categoryNameAr
          ?.toLowerCase()
          .includes(term);

        return (
          matchEn ||
          matchAr ||
          matchCatEn ||
          matchCatAr
        );
      })
      .sort((a, b) => {
        // Category ആദ്യം
        if (
          a.type === "category" &&
          b.type === "product"
        )
          return -1;

        if (
          a.type === "product" &&
          b.type === "category"
        )
          return 1;

        const aName =
          locale === "ar"
            ? a.nameAr.toLowerCase()
            : a.nameEn.toLowerCase();

        const bName =
          locale === "ar"
            ? b.nameAr.toLowerCase()
            : b.nameEn.toLowerCase();

        if (aName === term) return -1;
        if (bName === term) return 1;

        return aName.localeCompare(bName);
      });
  }
}

export const searchService = new SearchService();