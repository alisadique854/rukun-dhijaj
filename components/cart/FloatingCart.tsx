"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import { ShoppingCart, ChevronRight, GripVertical } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCart } from "../../context/CartContext";
import CheckoutModal from "./CheckoutModal";
import MyOrderDrawer from "./MyOrderDrawer";
import { useLanguage } from "@/context/LanguageContext";

interface CustomerDetails {
  name: string;
  phone: string;
  location: string;
  flat: string;
  notes: string;
}

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

  if (totalItems === 0) {
    return null;
  }

  const formatNumber = (num: number, isPrice = false) => {
    return new Intl.NumberFormat(isAr ? "ar-EG" : "en-US", {
      minimumFractionDigits: isPrice ? 2 : 0,
      maximumFractionDigits: isPrice ? 2 : 0,
    }).format(num);
  };

  const handleWhatsAppOrder = (customer: CustomerDetails) => {
    if (!customer.location) {
       alert("Location is required!");
       return;
    }
    const restaurantPhone = "966556127369";
    
    const now = new Date();
    const dateStr = now.toLocaleDateString(isAr ? "ar-EG" : "en-GB", { year: "numeric", month: "2-digit", day: "2-digit" });
    const timeStr = now.toLocaleTimeString(isAr ? "ar-EG" : "en-US", { hour: "2-digit", minute: "2-digit", hour12: true });

    const orderItems = items
      .map((item, index) => {
        const pName = isAr && (item as any).nameAr ? (item as any).nameAr : item.name;
        const currency = isAr ? "ريال" : "SAR";

        if ((item as any).type === "offer") {
  const offerItems =
    (item as any).items
      ?.map((food: string) => `• ${food}`)
      .join("\n") || "";

  return `🔥 SPECIAL OFFER

Offer:
${pName}

Quantity:
${item.quantity}

Price:
SAR ${item.price.toFixed(2)} × ${item.quantity}
= SAR ${(item.price * item.quantity).toFixed(2)}

Description:
${(item as any).description || "-"}

Includes:
${offerItems}
`;
}
        
        return isAr
          ? `${formatNumber(index + 1)}. ${pName}\nالكمية : ${formatNumber(item.quantity)}\nالسعر : ${formatNumber(item.price, true)} ${currency}\nالإجمالي : ${formatNumber(item.price * item.quantity, true)} ${currency}\n`
          : `${String(index + 1).padStart(2, "0")}. ${pName}\nQty   : ${item.quantity}\nPrice : SAR ${item.price.toFixed(2)}\nTotal : SAR ${(item.price * item.quantity).toFixed(2)}\n`;
      })
      .join(isAr ? "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" : "\n------------------------------\n");

   const message = isAr
  ? `╔══════════════════════════════╗
          🍗 *ركن الدجاج*
           ✨ *طلب جديد* ✨
╚══════════════════════════════╝

📅 التاريخ : ${dateStr}
🕒 الوقت : ${timeStr}

──────────────────────────────

👤 *بيانات العميل*

🙍 الاسم : ${customer.name}
📞 الهاتف : ${customer.phone}
🏢 المبنى / الشقة : ${customer.flat || "-"}

📍 *الموقع*

${customer.location}

──────────────────────────────

🛒 *الطلبات*

${orderItems}

──────────────────────────────

💰 *ملخص الطلب*

عدد الأصناف : ${formatNumber(totalItems)}

⭐ *الإجمالي*
💵 *${formatNumber(totalPrice, true)} ريال*

──────────────────────────────

📝 *ملاحظات*

${customer.notes || "-"}

──────────────────────────────

🙏 *شكراً لكم*

🍗 *ركن الدجاج*`
  : `╔══════════════════════════════╗
          🍗 *RUKUN DHIJAJ*
           ✨ *NEW ORDER* ✨
╚══════════════════════════════╝

📅 Date : ${dateStr}
🕒 Time : ${timeStr}

──────────────────────────────

👤 *CUSTOMER*

🙍 Name : ${customer.name}
📞 Phone : ${customer.phone}
🏢 Building / Flat : ${customer.flat || "-"}

📍 *LOCATION*

${customer.location}

──────────────────────────────

🛒 *ORDER ITEMS*

${orderItems}

──────────────────────────────

💰 *PAYMENT SUMMARY*

Items Ordered : ${totalItems}

⭐ *GRAND TOTAL*
💵 *SAR ${totalPrice.toFixed(2)}*

──────────────────────────────

📝 *SPECIAL NOTES*

${customer.notes || "-"}

──────────────────────────────

🙏 *Thank You*

🍗 *RUKUN DHIJAJ*`;

    const waUrl = `https://wa.me/${restaurantPhone}?text=${encodeURIComponent(message)}`;

window.location.href = waUrl;

    setCheckoutOpen(false);
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
          paddingBottom: "max(16px, env(safe-area-inset-bottom))",
        }}
      >
        {!drawerOpen && !checkoutOpen && (
          <motion.div
            drag
            dragListener={true}
            dragMomentum={false}
            dragElastic={0.05}
            dragConstraints={constraintsRef}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
            whileDrag={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{ x: dragX, y: dragY }}
            className={`pointer-events-auto absolute bottom-4 ${isRTL ? "right-4" : "left-4"}`}
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
                    setDrawerOpen(true);
                  }
                }}
                className={`flex w-[190px] sm:w-[210px] items-center gap-3 md:hidden ${isRTL ? "pl-2 flex-row-reverse" : "pr-2"}`}
              >
                <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-[#ffb800] text-black shrink-0">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[11px] font-black text-black ring-2 ring-[#111111]">
                    {totalItems > 99 ? "99+" : formatNumber(totalItems)}
                  </span>
                </div>
                <div className={`flex-1 ${isRTL ? "text-right" : "text-left"}`}>
                  <p className="text-[10px] uppercase tracking-wider text-neutral-500 font-cairo">
                    {isAr ? "الإجمالي" : "Total"}
                  </p>
                  <p className="text-base font-black text-[#ffb800] font-cairo flex items-center gap-1.5 justify-start">
                    <span>SAR {formatNumber(totalPrice, true)}</span>
                  </p>
                </div>
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-neutral-900 text-neutral-400 shrink-0">
                  <ChevronRight className={`h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
                </div>
              </button>

              {/* Desktop Full View */}
              <button
                onClick={() => {
                  if (!isDragging) {
                    setDrawerOpen(true);
                  }
                }}
                className={`hidden w-[400px] items-center justify-between md:flex ${isRTL ? "pl-2 pr-1 flex-row-reverse" : "pl-1 pr-2"}`}
              >
                <div className={`flex items-center gap-4 ${isRTL ? "flex-row-reverse text-right" : "text-left"}`}>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#ffb800] shrink-0">
                    <ShoppingCart className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <p className="text-base font-bold text-white font-cairo">{isAr ? "طلباتي" : "My Order"}</p>
                    <p className="mt-0.5 text-sm text-neutral-400 font-cairo">
                      {isAr 
                        ? `تم إضافة ${formatNumber(totalItems)} أصناف` 
                        : `${totalItems} Item${totalItems > 1 ? "s" : ""} Added`}
                    </p>
                  </div>
                </div>

                <div className={`flex items-center gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <div className={isRTL ? "text-left" : "text-right"}>
                    <p className="text-xs uppercase tracking-widest text-neutral-500 font-cairo">
                      {isAr ? "الإجمالي" : "Total"}
                    </p>
                    <p className="text-2xl font-black text-[#ffb800] font-cairo">
                      SAR {formatNumber(totalPrice, true)}
                    </p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ffb800] text-black shrink-0">
                    <ChevronRight className={`h-5 w-5 ${isRTL ? "rotate-180" : ""}`} />
                  </div>
                </div>
              </button>
            </div>
          </motion.div>
        )}
      </div>

      <MyOrderDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onCheckout={() => {
          setDrawerOpen(false);
          setCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        onConfirm={handleWhatsAppOrder}
      />
    </>
  );
}