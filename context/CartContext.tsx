"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;

  // Offer Support
  type?: "product" | "offer";
  description?: string;
  items?: string[];
}

interface CartContextType {
  items: CartItem[];

  addItem: (item: Omit<CartItem, "quantity">) => void;

  removeItem: (id: string) => void;

  increaseQty: (id: string) => void;

  decreaseQty: (id: string) => void;

  clearCart: () => void;

  totalItems: number;

  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Add Item
  const addItem = (item: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.id === item.id);

      if (existing) {
        return prev.map((p) =>
          p.id === item.id
            ? {
                ...p,
                quantity: p.quantity + 1,
              }
            : p
        );
      }

      return [
        ...prev,
        {
          ...item,
          quantity: 1,
        },
      ];
    });
  };

  // Remove Item
  const removeItem = (id: string) => {
    setItems((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  // Increase Quantity
  const increaseQty = (id: string) => {
  setItems((prev) => {
    const existing = prev.find((item) => item.id === id);

    if (!existing) {
      return prev;
    }

    return prev.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item
    );
  });
};

  // Decrease Quantity
  const decreaseQty = (id: string) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Clear Cart
  const clearCart = () => {
    setItems([]);
  };

  // Total Items
  const totalItems = useMemo(() => {
    return items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
  }, [items]);

  // Total Price
  const totalPrice = useMemo(() => {
    return items.reduce(
      (sum, item) =>
        sum + item.price * item.quantity,
      0
    );
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        increaseQty,
        decreaseQty,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}