import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
  writeBatch,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { Offer, OfferItem } from "@/types/offer";
import { getAllProducts } from "./product.service";

const OFFERS = "offers";
const OFFER_ITEMS = "offer_items";

/* ===========================
   Memory Cache
=========================== */

let offersCache: Offer[] | null = null;
let offersCacheTime = 0;

const OFFERS_CACHE_DURATION = 5 * 60 * 1000;

/* ------------------------- */
/* Get All Offers            */
/* ------------------------- */

export async function getOffers(
  forceRefresh = false
): Promise<Offer[]> {
  const now = Date.now();

  if (
    !forceRefresh &&
    offersCache &&
    now - offersCacheTime < OFFERS_CACHE_DURATION
  ) {
    return offersCache;
  }

  const q = query(
    collection(db, OFFERS),
    orderBy("display_order", "asc")
  );

  const snapshot = await getDocs(q);

  const offers: Offer[] = [];

  const allProducts = await getAllProducts();

  const productMap = new Map(
    allProducts.map((p) => [p.id, p])
  );

  for (const offerDoc of snapshot.docs) {
    const offer = {
      id: offerDoc.id,
      ...(offerDoc.data() as Omit<Offer, "id">),
    } as Offer;

    const offerItems = await getOfferItems(offer.id!);

    const items: string[] = [];
    const items_ar: string[] = [];

    let originalPrice = 0;

    for (const item of offerItems) {
      const product = productMap.get(item.product_id);

      if (!product) continue;

      originalPrice +=
        Number(product.price) * Number(item.quantity);

      items.push(`${item.quantity} × ${product.name}`);

      items_ar.push(
        `${item.quantity} × ${
          product.name_ar ||
          product.nameAr ||
          product.name
        }`
      );
    }

    offer.items = items;
    offer.items_ar = items_ar;

    offer.original_price = originalPrice;
    offer.saved_amount =
      originalPrice - Number(offer.offer_price);

    offers.push(offer);
  }

  offersCache = offers;
  offersCacheTime = now;

  return offers;
}

/* ------------------------- */
/* Get Offer By Id           */
/* ------------------------- */

export async function getOfferById(
  id: string
): Promise<Offer | null> {
  const snap = await getDoc(doc(db, OFFERS, id));

  if (!snap.exists()) return null;

  return {
    id: snap.id,
    ...(snap.data() as Omit<Offer, "id">),
  };
}

/* ------------------------- */
/* Create Offer              */
/* ------------------------- */

export async function createOffer(
  offer: Omit<Offer, "id">
): Promise<string> {
  const ref = await addDoc(
    collection(db, OFFERS),
    {
      ...offer,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
    }
  );

  offersCache = null;
  offersCacheTime = 0;

  return ref.id;
}

/* ------------------------- */
/* Update Offer              */
/* ------------------------- */

export async function updateOffer(
  id: string,
  data: Partial<Offer>
): Promise<void> {
  await updateDoc(
    doc(db, OFFERS, id),
    {
      ...data,
      updated_at: serverTimestamp(),
    }
  );
   offersCache = null;
  offersCacheTime = 0;
}

/* ------------------------- */
/* Delete Offer              */
/* ------------------------- */

export async function deleteOffer(
  id: string
): Promise<void> {
  const batch = writeBatch(db);

  const offerItemsQuery = query(
    collection(db, OFFER_ITEMS),
    where("offer_id", "==", id)
  );

  const items = await getDocs(offerItemsQuery);

  items.forEach((item) => {
    batch.delete(item.ref);
  });

  batch.delete(doc(db, OFFERS, id));

  await batch.commit();

  offersCache = null;
offersCacheTime = 0;
}

/* ------------------------- */
/* Get Offer Items           */
/* ------------------------- */

export async function getOfferItems(
  offerId: string
): Promise<OfferItem[]> {
  const q = query(
    collection(db, OFFER_ITEMS),
    where("offer_id", "==", offerId)
  );

  const snapshot = await getDocs(q);

  console.log("Offer ID:", offerId);
  console.log("Offer Items Count:", snapshot.size);
  console.log(
    "Offer Items:",
    snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }))
  );

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<OfferItem, "id">),
  }));
}

/* ------------------------- */
/* Save Offer Items          */
/* ------------------------- */

export async function saveOfferItems(
  offerId: string,
  items: Omit<OfferItem, "id" | "offer_id">[]
): Promise<void> {

  console.log("Offer ID:", offerId);
  console.log("Items received:", items);

  const batch = writeBatch(db);

  const oldItems = await getDocs(
    query(
      collection(db, OFFER_ITEMS),
      where("offer_id", "==", offerId)
    )
  );

  console.log("Old Items:", oldItems.size);

  oldItems.forEach((doc) => {
    batch.delete(doc.ref);
  });

  items.forEach((item) => {
    const ref = doc(collection(db, OFFER_ITEMS));

    console.log("Saving Item:", {
      offer_id: offerId,
      product_id: item.product_id,
      quantity: item.quantity,
    });

    batch.set(ref, {
      offer_id: offerId,
      product_id: item.product_id,
      quantity: item.quantity,
    });
  });

  await batch.commit();

  offersCache = null;
offersCacheTime = 0;

  console.log("Offer Items Saved Successfully");
}