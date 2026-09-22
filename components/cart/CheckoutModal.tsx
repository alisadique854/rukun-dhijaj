"use client";

import {
  X,
  MapPin,
  Phone,
  User,
  Building2,
  FileText,
  LocateFixed,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (data: {
    name: string;
    phone: string;
    location: string;
    flat: string;
    notes: string;
  }) => void;
}

export default function CheckoutModal({
  open,
  onClose,
  onConfirm,
}: CheckoutModalProps) {
  const { language, isRTL } = useLanguage();
  const isAr = language === "ar";

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [flat, setFlat] = useState("");
  const [notes, setNotes] = useState("");

  const [locationSelected, setLocationSelected] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [showLocationGuide, setShowLocationGuide] = useState(false);

  // Customer GPS coordinates
  const [customerCoords, setCustomerCoords] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  /*
   * RUKUN DHIJAJ DELIVERY AREA
   *
   * Delivery is allowed only inside this boundary:
   * P1 → P2 → P3 → P4 → P1
   */
  const DELIVERY_AREA = [
    { latitude: 21.582841, longitude: 39.209075 },
    { latitude: 21.586236, longitude: 39.227032 },
    { latitude: 21.606445, longitude: 39.218745 },
    { latitude: 21.602641, longitude: 39.202826 },
  ];

  useEffect(() => {
    const saved = localStorage.getItem("customer_details");

    if (!saved) return;

    try {
      const data = JSON.parse(saved);

      setName(data.name || "");
      setPhone(data.phone || "");
      setLocation(data.location || "");
      setFlat(data.flat || "");
      setNotes(data.notes || "");

      if (data.location?.startsWith("https://")) {
        setLocationSelected(true);
      }

      // Restore previously saved GPS coordinates
      if (
        typeof data.latitude === "number" &&
        typeof data.longitude === "number"
      ) {
        setCustomerCoords({
          latitude: data.latitude,
          longitude: data.longitude,
        });
      }
    } catch (error) {
      console.error("Error loading customer details:", error);
    }
  }, []);

  // Check whether customer location is inside delivery area
  const isInsideDeliveryArea = (
    latitude: number,
    longitude: number
  ) => {
    let inside = false;

    for (
      let i = 0, j = DELIVERY_AREA.length - 1;
      i < DELIVERY_AREA.length;
      j = i++
    ) {
      const xi = DELIVERY_AREA[i].longitude;
      const yi = DELIVERY_AREA[i].latitude;

      const xj = DELIVERY_AREA[j].longitude;
      const yj = DELIVERY_AREA[j].latitude;

      const intersect =
        yi > latitude !== yj > latitude &&
        longitude <
          ((xj - xi) * (latitude - yi)) / (yj - yi) + xi;

      if (intersect) {
        inside = !inside;
      }
    }

    return inside;
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert(
        isAr
          ? "تحديد الموقع غير مدعوم في متصفحك."
          : "Geolocation is not supported."
      );
      return;
    }

    setLoadingLocation(true);
    setLocation("");
    setLocationSelected(false);
    setCustomerCoords(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        // Save exact GPS coordinates
        setCustomerCoords({
          latitude,
          longitude,
        });

        // Google Maps location link
        setLocation(
          `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`
        );

        setLocationSelected(true);
        setLoadingLocation(false);
      },
      (error) => {
        setLoadingLocation(false);

        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert(
              isAr
                ? "يرجى السماح بالوصول إلى الموقع."
                : "Please allow location permission."
            );
            break;

          case error.POSITION_UNAVAILABLE:
            alert(
              isAr
                ? "الموقع غير متوفر حالياً."
                : "Location unavailable."
            );
            break;

          case error.TIMEOUT:
            alert(
              isAr
                ? "استغرق تحديد الموقع وقتاً طويلاً، حاول مرة أخرى."
                : "Location request timed out. Please try again."
            );
            break;

          default:
            alert(
              isAr
                ? "تعذر الحصول على الموقع."
                : "Unable to get location."
            );
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const handleConfirm = () => {
    // Name
    if (!name.trim()) {
      alert(
        isAr
          ? "يرجى إدخال اسم العميل."
          : "Please enter your name."
      );
      return;
    }

    // Phone
    if (!phone.trim()) {
      alert(
        isAr
          ? "يرجى إدخال رقم الهاتف."
          : "Please enter your phone number."
      );
      return;
    }

    // GPS is mandatory
    if (!customerCoords) {
      alert(
        isAr
          ? "يرجى تحديد موقعك الحالي أولاً."
          : "Please select your current location first."
      );
      return;
    }

    // Location link
    if (!location.trim()) {
      alert(
        isAr
          ? "يرجى تحديد موقعك الحالي."
          : "Please select your current location."
      );
      return;
    }

    // Building / Flat
    if (!flat.trim()) {
      alert(
        isAr
          ? "يرجى إدخال رقم المبنى / الشقة."
          : "Please enter building/flat number."
      );
      return;
    }

    // Check delivery area
    const insideDeliveryArea = isInsideDeliveryArea(
      customerCoords.latitude,
      customerCoords.longitude
    );

    if (!insideDeliveryArea) {
      alert(
        isAr
          ? "عذراً، موقعك خارج منطقة التوصيل."
          : "Sorry, your location is outside our delivery area."
      );

      return;
    }

    // Save customer details + GPS coordinates
    localStorage.setItem(
      "customer_details",
      JSON.stringify({
        name,
        phone,
        location,
        latitude: customerCoords.latitude,
        longitude: customerCoords.longitude,
        flat,
        notes,
      })
    );

    // Continue to WhatsApp
    onConfirm({
      name,
      phone,
      location,
      flat,
      notes,
    });
  };

  if (!open) return null;

  return (
    <>
      {/* Location Guide */}
      {showLocationGuide && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="w-[90%] max-w-md rounded-3xl border border-[#2d2208] bg-[#111111] p-6">

            <div className="flex justify-center">
              <LocateFixed
                size={60}
                className="text-[#ffb800]"
              />
            </div>

            <h2 className="mt-4 text-center text-2xl font-bold text-white">
              {isAr ? "تشغيل الموقع" : "Enable Location"}
            </h2>

            <p className="mt-4 text-center text-neutral-300">
              {isAr
                ? "يرجى تشغيل خدمة الموقع (GPS)، ثم اضغط متابعة لتحديد موقعك الحالي."
                : "Please enable your phone's GPS (Location), then tap Continue to get your current location."}
            </p>

            <div className="mt-6 space-y-3">

              <button
                type="button"
                onClick={() => {
                  setShowLocationGuide(false);
                  getCurrentLocation();
                }}
                className="w-full rounded-xl bg-[#ffb800] py-3 font-bold text-black hover:bg-[#e6a600] transition-colors"
              >
                {isAr ? "متابعة" : "Continue"}
              </button>

              <button
                type="button"
                onClick={() =>
                  setShowLocationGuide(false)
                }
                className="w-full rounded-xl border border-[#ffb800] py-3 text-[#ffb800] hover:bg-[#ffb800]/10 transition-colors"
              >
                {isAr ? "إلغاء" : "Cancel"}
              </button>

            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      <div className="fixed inset-0 z-[200] overflow-y-auto bg-black/70 backdrop-blur-md p-4">

        <div className="flex min-h-full items-center justify-center py-8">

          <div
            dir={isRTL ? "rtl" : "ltr"}
            className="w-full max-w-xl rounded-3xl border border-[#3b2b0d] bg-[#111111] shadow-2xl"
          >

            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#2d2208] p-6">

              <h2 className="text-2xl font-bold text-white font-cairo">
                {isAr ? "إتمام الطلب" : "Checkout"}
              </h2>

              <button
                onClick={onClose}
                className="rounded-full bg-[#1b1b1b] p-2 text-white hover:bg-[#ffb800]"
              >
                <X size={20} />
              </button>

            </div>

            <div className="space-y-5 p-6">

              {/* Name */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm text-neutral-300 font-cairo">
                  <User size={16} />
                  {isAr ? "إسم العميل" : "Customer Name"}
                </label>

                <input
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  className="w-full rounded-xl border border-[#2d2208] bg-[#181818] px-4 py-3 text-white outline-none focus:border-[#ffb800]"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm text-neutral-300 font-cairo">
                  <Phone size={16} />
                  {isAr ? "رقم الهاتف" : "Phone Number"}
                </label>

                <input
                  type="tel"
                  value={phone}
                  onChange={(e) =>
                    setPhone(
                      e.target.value.replace(
                        /[^0-9]/g,
                        ""
                      )
                    )
                  }
                  placeholder="05xxxxxxxx"
                  className="w-full rounded-xl border border-[#2d2208] bg-[#181818] px-4 py-3 text-white outline-none focus:border-[#ffb800]"
                />
              </div>

              {/* GPS Button */}
              <button
                type="button"
                onClick={() =>
                  setShowLocationGuide(true)
                }
                disabled={loadingLocation}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#ffb800] bg-[#181818] px-4 py-3 font-semibold text-[#ffb800] disabled:opacity-50"
              >
                <LocateFixed size={18} />

                {loadingLocation
                  ? isAr
                    ? "جاري تحديد الموقع..."
                    : "Getting Location..."
                  : isAr
                  ? "استخدام الموقع الحالي"
                  : "Use Current Location"}
              </button>

              {/* Location Status */}
              {locationSelected ? (
                <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-3 text-center text-green-400">
                  {isAr
                    ? "📍 تم اختيار الموقع بنجاح"
                    : "📍 Location Selected Successfully"}
                </div>
              ) : (
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm text-neutral-300 font-cairo">
                    <MapPin size={16} />
                    {isAr
                      ? "عنوان التوصيل"
                      : "Delivery Address"}
                  </label>

                  <input
                    value={location}
                    onChange={(e) =>
                      setLocation(e.target.value)
                    }
                    placeholder={
                      isAr
                        ? "المنطقة / الشارع"
                        : "Area / Street"
                    }
                    className="w-full rounded-xl border border-[#2d2208] bg-[#181818] px-4 py-3 text-white outline-none focus:border-[#ffb800]"
                  />
                </div>
              )}

              {/* Building / Flat */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm text-neutral-300 font-cairo">
                  <Building2 size={16} />
                  {isAr
                    ? "رقم المبنى / الشقة"
                    : "Building / Flat No"}
                </label>

                <input
                  value={flat}
                  onChange={(e) =>
                    setFlat(e.target.value)
                  }
                  placeholder={
                    isAr
                      ? "مثال: بناية 12، شقة 302"
                      : "Example: Building 12, Flat 302"
                  }
                  className="w-full rounded-xl border border-[#2d2208] bg-[#181818] px-4 py-3 text-white outline-none focus:border-[#ffb800]"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm text-neutral-300 font-cairo">
                  <FileText size={16} />

                  {isAr
                    ? "ملاحظات إضافية"
                    : "Order Notes"}
                </label>

                <textarea
                  value={notes}
                  onChange={(e) =>
                    setNotes(e.target.value)
                  }
                  placeholder={
                    isAr
                      ? "مثال: بدون بصل، اتصل عند الوصول..."
                      : "Example: No onions, call on arrival..."
                  }
                  rows={3}
                  className="w-full resize-none rounded-xl border border-[#2d2208] bg-[#181818] px-4 py-3 text-white outline-none focus:border-[#ffb800]"
                />
              </div>

              {/* Clear Saved Details */}
              <button
                type="button"
                onClick={() => {
                  localStorage.removeItem(
                    "customer_details"
                  );

                  setName("");
                  setPhone("");
                  setLocation("");
                  setFlat("");
                  setNotes("");

                  setLocationSelected(false);
                  setShowLocationGuide(false);
                  setCustomerCoords(null);
                }}
                className="w-full rounded-xl border border-red-500 py-3 text-red-400 hover:bg-red-500/10"
              >
                {isAr
                  ? "حذف البيانات المحفوظة"
                  : "Clear Saved Details"}
              </button>

              {/* Confirm */}
              <button
                type="button"
                onClick={handleConfirm}
                className="w-full rounded-2xl bg-[#ffb800] py-4 text-lg font-bold text-black"
              >
                {isAr
                  ? "المتابعة إلى الواتساب"
                  : "Continue to WhatsApp"}
              </button>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}