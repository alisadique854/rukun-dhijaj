"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import {
  ShoppingCart,
  ChevronRight,
  GripVertical,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";

import { useCart } from "../../context/CartContext";
import CheckoutModal from "./CheckoutModal";
import MyOrderDrawer from "./MyOrderDrawer";
import { useLanguage } from "@/context/LanguageContext";
import { db } from "@/lib/firebase";

interface CustomerDetails {
  name: string;
  phone: string;
  location: string;
  flat: string;
  notes: string;
}

const FREE_DELIVERY_THRESHOLD = 50;

export default function FloatingCart() {
  const { items, totalItems, totalPrice } = useCart();
  const { language, isRTL } = useLanguage();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const constraintsRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  const isAr = language === "ar";

  useEffect(() => {
    const saved = localStorage.getItem("floating-cart-position");

    if (saved) {
      try {
        const { x, y } = JSON.parse(saved);
        dragX.set(x);
        dragY.set(y);
      } catch (e) {
        console.error("Error loading cart position", e);
      }
    }
  }, [dragX, dragY]);

  // ---------------------------------------------------------
  // MOBILE / BROWSER BACK NAVIGATION
  // Checkout -> My Order -> Home
  // ---------------------------------------------------------
  useEffect(() => {
    const handlePopState = () => {
      if (checkoutOpen) {
        setCheckoutOpen(false);
        setDrawerOpen(true);
        return;
      }

      if (drawerOpen) {
        setDrawerOpen(false);
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [checkoutOpen, drawerOpen]);

  if (totalItems === 0) {
    return null;
  }

  const formatNumber = (
    num: number,
    isPrice = false
  ) => {
    return new Intl.NumberFormat(
      isAr ? "ar-EG" : "en-US",
      {
        minimumFractionDigits: isPrice ? 2 : 0,
        maximumFractionDigits: isPrice ? 2 : 0,
      }
    ).format(num);
  };

  // ---------------------------------------------------------
  // WHATSAPP ORDER
  // ---------------------------------------------------------
  const handleWhatsAppOrder = async (
    customer: CustomerDetails
  ) => {
    if (!customer.location) {
      alert(
        isAr
          ? "يرجى تحديد الموقع."
          : "Location is required!"
      );
      return;
    }

    try {
      const restaurantPhone = "966556127369";

      // -----------------------------------------------------
      // LOAD DELIVERY SETTINGS
      // -----------------------------------------------------
      const settingsRef = doc(
        db,
        "settings",
        "delivery"
      );

      const settingsSnap = await getDoc(settingsRef);

      let deliveryEnabled = true;
      let freeDelivery = false;
      let deliveryCharge = 5;

      if (settingsSnap.exists()) {
        const data = settingsSnap.data();

        deliveryEnabled =
          data.deliveryEnabled ?? true;

        freeDelivery =
          data.freeDelivery ?? false;

        deliveryCharge = Number(
          data.deliveryCharge ?? 5
        );
      }

      // -----------------------------------------------------
      // DELIVERY CALCULATION
      //
      // Free Delivery ON
      //       -> FREE
      //
      // Free Delivery OFF + >= 50 SAR
      //       -> FREE
      //
      // Free Delivery OFF + < 50 SAR
      //       -> configured charge
      // -----------------------------------------------------
      const appliedDeliveryCharge =
        !deliveryEnabled
          ? 0
          : freeDelivery
          ? 0
          : totalPrice >= FREE_DELIVERY_THRESHOLD
          ? 0
          : deliveryCharge;

      const isFreeDelivery =
        deliveryEnabled &&
        (freeDelivery ||
          totalPrice >= FREE_DELIVERY_THRESHOLD);

      const grandTotal =
        totalPrice + appliedDeliveryCharge;

      const now = new Date();

      const dateStr = now.toLocaleDateString(
        isAr ? "ar-EG" : "en-GB",
        {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }
      );

      const timeStr = now.toLocaleTimeString(
        isAr ? "ar-EG" : "en-US",
        {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }
      );

      // -----------------------------------------------------
      // ORDER ITEMS
      // -----------------------------------------------------
      const orderItems = items
        .map((item, index) => {
          const pName =
            isAr && (item as any).nameAr
              ? (item as any).nameAr
              : item.name;

          if ((item as any).type === "offer") {
            const offerItems =
              (item as any).items
                ?.map(
                  (food: string) => `- ${food}`
                )
                .join("\n") || "";

            return isAr
              ? `*عرض خاص*

العرض:
${pName}

الكمية:
${formatNumber(item.quantity)}

السعر:
${formatNumber(item.price, true)} ريال × ${formatNumber(
                  item.quantity
                )}

الإجمالي:
${formatNumber(
  item.price * item.quantity,
  true
)} ريال

الوصف:
${(item as any).description || "-"}

يشمل:
${offerItems}`
              : `*SPECIAL OFFER*

Offer:
${pName}

Qty:
${item.quantity}

Price:
SAR ${item.price.toFixed(2)} × ${item.quantity}

Total:
SAR ${(item.price * item.quantity).toFixed(2)}

Description:
${(item as any).description || "-"}

Includes:
${offerItems}`;
          }

          return isAr
            ? `${formatNumber(index + 1)}. *${pName}*
الكمية: ${formatNumber(item.quantity)}
السعر: ${formatNumber(item.price, true)} ريال
الإجمالي: ${formatNumber(
                item.price * item.quantity,
                true
              )} ريال`
            : `${String(index + 1).padStart(
                2,
                "0"
              )}. *${pName}*
Qty: ${item.quantity}
Price: SAR ${item.price.toFixed(2)}
Total: SAR ${(item.price * item.quantity).toFixed(
                2
              )}`;
        })
        .join(
          isAr
            ? "\n\n━━━━━━━━━━━━━━━━━━━━\n\n"
            : "\n\n━━━━━━━━━━━━━━━━━━━━\n\n"
        );

      // -----------------------------------------------------
      // DELIVERY TEXT
      // -----------------------------------------------------
      const deliveryText = !deliveryEnabled
        ? isAr
          ? "غير متاح"
          : "UNAVAILABLE"
        : isFreeDelivery
        ? isAr
          ? "🎁 مجانًا"
          : "🎁 FREE"
        : isAr
        ? `${formatNumber(
            appliedDeliveryCharge,
            true
          )} ريال`
        : `SAR ${appliedDeliveryCharge.toFixed(2)}`;

      // -----------------------------------------------------
      // CLEAN LOCATION URL
      // -----------------------------------------------------
      // If a Markdown-style link somehow reaches the customer
      // details, convert it back to a plain URL for WhatsApp.
      const cleanLocation = customer.location
        .replace(/^\[([^\]]+)\]\(([^)]+)\)$/, "$2")
        .trim();

      // -----------------------------------------------------
      // WHATSAPP MESSAGE
      // -----------------------------------------------------
      const message = isAr
        ? `*ركن الدجاج*
*طلب جديد*
━━━━━━━━━━━━━━━━━━━━

التاريخ: ${dateStr}
الوقت: ${timeStr}

*بيانات العميل*
━━━━━━━━━━━━━━━━━━━━

الاسم: ${customer.name}
الهاتف: ${customer.phone}
المبنى / الشقة: ${customer.flat || "-"}

*موقع التوصيل*
━━━━━━━━━━━━━━━━━━━━

موقع العميل:
${cleanLocation}

*تفاصيل الطلب*
━━━━━━━━━━━━━━━━━━━━

${orderItems}

━━━━━━━━━━━━━━━━━━━━
*ملخص الدفع*

عدد الأصناف: ${formatNumber(totalItems)}

المجموع الفرعي: ${formatNumber(
            totalPrice,
            true
          )} ريال

التوصيل: ${deliveryText}

*الإجمالي النهائي: ${formatNumber(
            grandTotal,
            true
          )} ريال*

━━━━━━━━━━━━━━━━━━━━

*ملاحظات*
${customer.notes || "-"}

━━━━━━━━━━━━━━━━━━━━

*شكرًا لطلبكم*

*ركن الدجاج*`
        : `*CHICKEN CORNER*
*NEW ORDER*
━━━━━━━━━━━━━━━━━━━━

Date: ${dateStr}
Time: ${timeStr}

*CUSTOMER DETAILS*
━━━━━━━━━━━━━━━━━━━━

Name: ${customer.name}
Phone: ${customer.phone}
Building / Flat: ${customer.flat || "-"}

*DELIVERY LOCATION*
━━━━━━━━━━━━━━━━━━━━

Customer Location:
${cleanLocation}

*ORDER DETAILS*
━━━━━━━━━━━━━━━━━━━━

${orderItems}

━━━━━━━━━━━━━━━━━━━━
*PAYMENT SUMMARY*

Items: ${totalItems}

Subtotal: SAR ${totalPrice.toFixed(2)}

Delivery: ${deliveryText}

*GRAND TOTAL: SAR ${grandTotal.toFixed(2)}*

━━━━━━━━━━━━━━━━━━━━

*SPECIAL NOTES*
${customer.notes || "-"}

━━━━━━━━━━━━━━━━━━━━

*Thank you for ordering!*

*CHICKEN CORNER*`;


      const waUrl = `https://wa.me/${restaurantPhone}?text=${encodeURIComponent(
        message
      )}`;

      window.location.href = waUrl;

      setCheckoutOpen(false);
    } catch (error) {
      console.error(
        "Error creating WhatsApp order:",
        error
      );

      alert(
        isAr
          ? "تعذر تجهيز الطلب. حاول مرة أخرى."
          : "Unable to prepare the order. Please try again."
      );
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);

    localStorage.setItem(
      "floating-cart-position",
      JSON.stringify({
        x: dragX.get(),
        y: dragY.get(),
      })
    );
  };

  return (
    <>
      <div
        ref={constraintsRef}
        className="pointer-events-none fixed inset-0 z-[9999] p-4"
        style={{
          paddingBottom:
            "max(16px, env(safe-area-inset-bottom))",
        }}
      >
        {!drawerOpen && !checkoutOpen && (
          <motion.div
            drag
            dragListener={true}
            dragMomentum={false}
            dragElastic={0.05}
            dragConstraints={constraintsRef}
            onDragStart={() =>
              setIsDragging(true)
            }
            onDragEnd={handleDragEnd}
            whileDrag={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{ x: dragX, y: dragY }}
            className={`pointer-events-auto absolute bottom-4 ${
              isRTL ? "right-4" : "left-4"
            }`}
          >
            <div
              className="
                flex
                items-center
                gap-2
                rounded-2xl
                border
                border-[#3b2b0d]
                bg-[#111111]/95
                p-2
                shadow-[0_20px_50px_rgba(0,0,0,0.45)]
                backdrop-blur-xl
                transition-colors
                duration-300
                hover:border-[#ffb800]
                hover:shadow-[0_15px_40px_rgba(255,184,0,0.15)]
                md:p-3
              "
            >
              <div
                className="flex h-12 w-6 cursor-grab items-center justify-center rounded-lg text-neutral-500 hover:text-white active:cursor-grabbing"
              >
                <GripVertical className="h-5 w-5" />
              </div>

              {/* Mobile Compact View */}
              <button
                onClick={() => {
                  if (!isDragging) {
                    window.history.pushState(
                      {
                        chickenCorner:
                          "my-order",
                      },
                      "",
                      window.location.href
                    );

                    setDrawerOpen(true);
                  }
                }}
                className={`flex w-[190px] sm:w-[210px] items-center gap-3 md:hidden ${
                  isRTL
                    ? "pl-2 flex-row-reverse"
                    : "pr-2"
                }`}
              >
                <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-[#ffb800] text-black shrink-0">
                  <ShoppingCart className="h-5 w-5" />

                  <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[11px] font-black text-black ring-2 ring-[#111111]">
                    {totalItems > 99
                      ? "99+"
                      : formatNumber(totalItems)}
                  </span>
                </div>

                <div
                  className={`flex-1 ${
                    isRTL
                      ? "text-right"
                      : "text-left"
                  }`}
                >
                  <p className="text-[10px] uppercase tracking-wider text-neutral-500 font-cairo">
                    {isAr ? "الإجمالي" : "Total"}
                  </p>

                  <p className="text-base font-black text-[#ffb800] font-cairo flex items-center gap-1.5 justify-start">
                    <span>
                      SAR{" "}
                      {formatNumber(
                        totalPrice,
                        true
                      )}
                    </span>
                  </p>
                </div>

                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-neutral-900 text-neutral-400 shrink-0">
                  <ChevronRight
                    className={`h-4 w-4 ${
                      isRTL
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </div>
              </button>

              {/* Desktop Full View */}
              <button
                onClick={() => {
                  if (!isDragging) {
                    window.history.pushState(
                      {
                        chickenCorner:
                          "my-order",
                      },
                      "",
                      window.location.href
                    );

                    setDrawerOpen(true);
                  }
                }}
                className={`hidden w-[400px] items-center justify-between md:flex ${
                  isRTL
                    ? "pl-2 pr-1 flex-row-reverse"
                    : "pl-1 pr-2"
                }`}
              >
                <div
                  className={`flex items-center gap-4 ${
                    isRTL
                      ? "flex-row-reverse text-right"
                      : "text-left"
                  }`}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#ffb800] shrink-0">
                    <ShoppingCart className="h-6 w-6 text-black" />
                  </div>

                  <div>
                    <p className="text-base font-bold text-white font-cairo">
                      {isAr
                        ? "طلباتي"
                        : "My Order"}
                    </p>

                    <p className="mt-0.5 text-sm text-neutral-400 font-cairo">
                      {isAr
                        ? `تم إضافة ${formatNumber(
                            totalItems
                          )} أصناف`
                        : `${totalItems} Item${
                            totalItems > 1
                              ? "s"
                              : ""
                          } Added`}
                    </p>
                  </div>
                </div>

                <div
                  className={`flex items-center gap-4 ${
                    isRTL
                      ? "flex-row-reverse"
                      : ""
                  }`}
                >
                  <div
                    className={
                      isRTL
                        ? "text-left"
                        : "text-right"
                    }
                  >
                    <p className="text-xs uppercase tracking-widest text-neutral-500 font-cairo">
                      {isAr
                        ? "الإجمالي"
                        : "Total"}
                    </p>

                    <p className="text-2xl font-black text-[#ffb800] font-cairo">
                      SAR{" "}
                      {formatNumber(
                        totalPrice,
                        true
                      )}
                    </p>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ffb800] text-black shrink-0">
                    <ChevronRight
                      className={`h-5 w-5 ${
                        isRTL
                          ? "rotate-180"
                          : ""
                      }`}
                    />
                  </div>
                </div>
              </button>
            </div>
          </motion.div>
        )}
      </div>

      <MyOrderDrawer
        open={drawerOpen}
        onClose={() => {
          window.history.back();
        }}
        onCheckout={() => {
          window.history.pushState(
            {
              chickenCorner: "checkout",
            },
            "",
            window.location.href
          );

          setDrawerOpen(false);
          setCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        open={checkoutOpen}
        onClose={() => {
          window.history.back();
        }}
        onConfirm={handleWhatsAppOrder}
      />
    </>
  );
}