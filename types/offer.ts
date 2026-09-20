export interface Offer {
  id?: string;

  title: string;
  title_ar: string;

  description: string;
  description_ar: string;

  image: string;

  badge: string;

  original_price: number;

  offer_price: number;

  saved_amount: number;

  active: boolean;

  display_order: number;

  items?: string[];
  items_ar?: string[];

  created_at?: any;
  updated_at?: any;
}

export interface OfferItem {
  id: string;

  offer_id: string;

  product_id: string;

  quantity: number;
}