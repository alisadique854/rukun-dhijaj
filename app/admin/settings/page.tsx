"use client";

import { useEffect, useState } from "react";
import { Truck, Save, Gift } from "lucide-react";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useLanguage } from "@/context/LanguageContext";

const FREE_DELIVERY_THRESHOLD = 50;

export default function SettingsPage() {
  const { language, isRTL } = useLanguage();

  const [deliveryEnabled, setDeliveryEnabled] = useState(true);
  const [freeDelivery, setFreeDelivery] = useState(false);
  const [deliveryCharge, setDeliveryCharge] = useState("5");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const isArabic = language === "ar";

  const text = {
    en: {
      settings: "Settings",
      settingsDescription:
        "Manage your restaurant delivery settings.",

      deliverySettings: "Delivery Settings",
      deliveryDescription:
        "Control home delivery and delivery charges.",

      homeDelivery: "Home Delivery",
      homeDeliveryDescription:
        "Allow customers to place delivery orders.",

      freeDeliveryEveryone: "Free Delivery for Everyone",
      freeDeliveryEveryoneDescription:
        "Make delivery free for every order during promotions.",

      freeDeliveryAbove: "Free Delivery Above",
      freeDeliveryAboveDescription:
        "Orders of 50 SAR or more will receive free delivery.",

      deliveryCharge: "Delivery Charge",
      deliveryChargeDescription:
        "This amount will be charged for delivery orders below 50 SAR.",

      example:
        "Example: 5 SAR means orders below 50 SAR will have a 5 SAR delivery charge.",

      deliveryRule: "Delivery Rule",

      normalMode: "Normal delivery mode",
      promotionMode: "Promotion mode",

      below50: "Order below 50 SAR",
      above50: "Order 50 SAR or above",

      charge: "CHARGE",
      free: "FREE",

      promotionActive:
        "Free delivery for everyone is currently ON.",

      save: "Save Changes",
      saving: "Saving...",

      sar: "SAR",

      saveSuccess:
        "Delivery settings saved successfully!",

      loadError:
        "Failed to load delivery settings.",

      saveError:
        "Failed to save delivery settings.",

      invalidCharge:
        "Please enter a valid delivery charge.",
    },

    ar: {
      settings: "الإعدادات",
      settingsDescription:
        "إدارة إعدادات توصيل المطعم.",

      deliverySettings: "إعدادات التوصيل",
      deliveryDescription:
        "التحكم في التوصيل ورسوم التوصيل.",

      homeDelivery: "التوصيل للمنزل",
      homeDeliveryDescription:
        "السماح للعملاء بإجراء طلبات التوصيل.",

      freeDeliveryEveryone:
        "توصيل مجاني للجميع",

      freeDeliveryEveryoneDescription:
        "جعل التوصيل مجانيًا لجميع الطلبات أثناء العروض.",

      freeDeliveryAbove:
        "التوصيل المجاني للطلبات فوق",

      freeDeliveryAboveDescription:
        "الطلبات بقيمة ٥٠ ريال أو أكثر تحصل على توصيل مجاني.",

      deliveryCharge: "رسوم التوصيل",

      deliveryChargeDescription:
        "يتم إضافة هذا المبلغ للطلبات التي تقل عن ٥٠ ريال.",

      example:
        "مثال: إذا كانت رسوم التوصيل ٥ ريال، فسيتم إضافة ٥ ريال للطلبات الأقل من ٥٠ ريال.",

      deliveryRule: "قاعدة التوصيل",

      normalMode: "وضع التوصيل العادي",
      promotionMode: "وضع العرض الترويجي",

      below50: "الطلب أقل من ٥٠ ريال",
      above50: "الطلب ٥٠ ريال أو أكثر",

      charge: "رسوم",
      free: "مجانًا",

      promotionActive:
        "التوصيل المجاني للجميع مفعّل حاليًا.",

      save: "حفظ التغييرات",
      saving: "جارٍ الحفظ...",

      sar: "ريال",

      saveSuccess:
        "تم حفظ إعدادات التوصيل بنجاح!",

      loadError:
        "تعذر تحميل إعدادات التوصيل.",

      saveError:
        "تعذر حفظ إعدادات التوصيل.",

      invalidCharge:
        "يرجى إدخال رسوم توصيل صحيحة.",
    },
  };

  const t = text[language];

  // Load saved settings
  useEffect(() => {
    const loadDeliverySettings = async () => {
      try {
        const settingsRef = doc(db, "settings", "delivery");
        const settingsSnap = await getDoc(settingsRef);

        if (settingsSnap.exists()) {
          const data = settingsSnap.data();

          setDeliveryEnabled(data.deliveryEnabled ?? true);
          setFreeDelivery(data.freeDelivery ?? false);
          setDeliveryCharge(
            String(data.deliveryCharge ?? 5)
          );
        }
      } catch (error) {
        console.error(
          "Error loading delivery settings:",
          error
        );

        alert(t.loadError);
      } finally {
        setLoading(false);
      }
    };

    loadDeliverySettings();
  }, [t.loadError]);

  // Save settings
  const handleSave = async () => {
    const charge = Number(deliveryCharge);

    if (!Number.isFinite(charge) || charge < 0) {
      alert(t.invalidCharge);
      return;
    }

    try {
      setSaving(true);

      await setDoc(
        doc(db, "settings", "delivery"),
        {
          deliveryEnabled,
          freeDelivery,
          deliveryCharge: charge,
          freeDeliveryThreshold:
            FREE_DELIVERY_THRESHOLD,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      alert(t.saveSuccess);
    } catch (error) {
      console.error(
        "Error saving delivery settings:",
        error
      );

      alert(t.saveError);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div
        dir={isRTL ? "rtl" : "ltr"}
        className="flex min-h-screen items-center justify-center bg-[#090909] text-white"
      >
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#ffb800] border-t-transparent" />
      </div>
    );
  }

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className="min-h-screen bg-[#090909] px-4 py-6 text-white md:px-8"
    >
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold md:text-3xl">
            {t.settings}
          </h1>

          <p className="mt-2 text-sm text-white/50">
            {t.settingsDescription}
          </p>
        </div>

        {/* Delivery Settings */}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#111111]">

          {/* Card Header */}
          <div className="flex items-center gap-3 border-b border-white/10 p-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#ffb800]/10">
              <Truck className="h-5 w-5 text-[#ffb800]" />
            </div>

            <div>
              <h2 className="font-semibold">
                {t.deliverySettings}
              </h2>

              <p className="text-sm text-white/50">
                {t.deliveryDescription}
              </p>
            </div>
          </div>

          <div className="space-y-6 p-5">

            {/* Home Delivery */}
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-medium">
                  {t.homeDelivery}
                </p>

                <p className="mt-1 text-sm text-white/50">
                  {t.homeDeliveryDescription}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setDeliveryEnabled(!deliveryEnabled)
                }
                className={`relative h-7 w-12 shrink-0 rounded-full transition ${
                  deliveryEnabled
                    ? "bg-[#ffb800]"
                    : "bg-white/20"
                }`}
                aria-label={t.homeDelivery}
              >
                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                    deliveryEnabled
                      ? "left-6"
                      : "left-1"
                  }`}
                />
              </button>
            </div>

            {/* Free Delivery For Everyone */}
            <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-6">

              <div className="flex items-start gap-3">

                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#ffb800]/10">
                  <Gift className="h-4 w-4 text-[#ffb800]" />
                </div>

                <div>
                  <p className="font-medium">
                    {t.freeDeliveryEveryone}
                  </p>

                  <p className="mt-1 text-sm text-white/50">
                    {t.freeDeliveryEveryoneDescription}
                  </p>
                </div>

              </div>

              <button
                type="button"
                onClick={() =>
                  setFreeDelivery(!freeDelivery)
                }
                className={`relative h-7 w-12 shrink-0 rounded-full transition ${
                  freeDelivery
                    ? "bg-[#ffb800]"
                    : "bg-white/20"
                }`}
                aria-label={t.freeDeliveryEveryone}
              >
                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                    freeDelivery
                      ? "left-6"
                      : "left-1"
                  }`}
                />
              </button>
            </div>

            {/* Promotion Active Message */}
            {freeDelivery && (
              <div className="rounded-xl border border-[#ffb800]/30 bg-[#ffb800]/10 px-4 py-3 text-sm text-[#ffb800]">
                🎁 {t.promotionActive}
              </div>
            )}

            {/* Free Delivery Threshold */}
            <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-6">

              <div>
                <p className="font-medium">
                  {t.freeDeliveryAbove} 50 SAR
                </p>

                <p className="mt-1 text-sm text-white/50">
                  {t.freeDeliveryAboveDescription}
                </p>
              </div>

              <div className="shrink-0 rounded-xl border border-[#ffb800]/30 bg-[#ffb800]/10 px-5 py-3 font-semibold text-[#ffb800]">
                {isArabic ? "٥٠ ريال" : "50 SAR"}
              </div>
            </div>

            {/* Delivery Charge */}
            <div className="border-t border-white/10 pt-6">

              <label
                htmlFor="deliveryCharge"
                className="mb-2 block font-medium"
              >
                {t.deliveryCharge}
              </label>

              <p className="mb-3 text-sm text-white/50">
                {t.deliveryChargeDescription}
              </p>

              <div className="flex max-w-xs items-center overflow-hidden rounded-xl border border-white/10 bg-black/30">

                <input
                  id="deliveryCharge"
                  type="number"
                  min="0"
                  step="0.5"
                  value={deliveryCharge}
                  onChange={(e) =>
                    setDeliveryCharge(e.target.value)
                  }
                  className="w-full bg-transparent px-4 py-3 text-white outline-none"
                  placeholder="5"
                  dir="ltr"
                />

                <span className="border-l border-white/10 px-4 py-3 text-white/50">
                  {t.sar}
                </span>

              </div>

              <p className="mt-2 text-xs text-white/40">
                {t.example}
              </p>
            </div>

            {/* Delivery Rule */}
            <div className="border-t border-white/10 pt-6">

              <div className="rounded-xl border border-white/10 bg-black/20 p-4">

                <p className="mb-3 text-sm font-medium">
                  {t.deliveryRule}
                </p>

                {freeDelivery ? (
                  <div className="rounded-lg bg-[#ffb800]/10 p-3 text-sm text-[#ffb800]">
                    🎁 {t.promotionMode}
                  </div>
                ) : (
                  <div className="space-y-2 text-sm">

                    <div className="flex justify-between gap-4">
                      <span className="text-white/50">
                        {t.below50}
                      </span>

                      <span className="font-medium">
                        {deliveryCharge || "0"} {t.sar}
                      </span>
                    </div>

                    <div className="flex justify-between gap-4">
                      <span className="text-white/50">
                        {t.above50}
                      </span>

                      <span className="font-medium text-[#ffb800]">
                        {t.free}
                      </span>
                    </div>

                  </div>
                )}

              </div>
            </div>

            {/* Save */}
            <div className="border-t border-white/10 pt-6">

              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 rounded-xl bg-[#ffb800] px-5 py-3 font-semibold text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Save className="h-5 w-5" />

                {saving ? t.saving : t.save}
              </button>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}