"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function IOSInstallPrompt() {
  const { language, isRTL } = useLanguage();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const isIOS =
      /iphone|ipad|ipod/i.test(navigator.userAgent) &&
      !(window.navigator as Navigator & { standalone?: boolean }).standalone;

    const isSafari =
      /safari/i.test(navigator.userAgent) &&
      !/crios|fxios|edgios|chrome|android/i.test(navigator.userAgent);

    const dismissed = localStorage.getItem("ios-install-dismissed");

    if (isIOS && isSafari && !dismissed) {
      const timer = setTimeout(() => {
        setShow(true);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, []);

  const closePrompt = () => {
    localStorage.setItem("ios-install-dismissed", "true");
    setShow(false);
  };

  if (!show) return null;

  const content =
    language === "ar"
      ? {
          title: "ثبّت تطبيق تشيكن كورنر 🍗",
          description:
            "أضف تشيكن كورنر إلى الشاشة الرئيسية للوصول السريع.",
          button: "📲 تثبيت تشيكن كورنر",
          instructions:
            "للتثبيت:\n\n1. اضغط على زر المشاركة ⬆️ في Safari.\n2. مرر لأسفل واضغط على «إضافة إلى الشاشة الرئيسية».\n3. اضغط «إضافة».",
          footer: "Safari → مشاركة ⬆️ → إضافة إلى الشاشة الرئيسية",
        }
      : {
          title: "Install Chicken Corner 🍗",
          description:
            "Add Chicken Corner to your Home Screen for quick access.",
          button: "📲 Install Chicken Corner",
          instructions:
            "To install:\n\n1. Tap the Share button ⬆️ in Safari.\n2. Scroll down and tap “Add to Home Screen”.\n3. Tap “Add”.",
          footer: "Safari → Share ⬆️ → Add to Home Screen",
        };

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className="fixed inset-x-0 bottom-0 z-[9999] p-4"
    >
      <div className="mx-auto max-w-md rounded-3xl border border-yellow-500/30 bg-[#111111] p-5 shadow-2xl">
        <div className="flex items-start gap-4">
          <img
            src="/apple-icon.png"
            alt="Chicken Corner"
            className="h-14 w-14 shrink-0 rounded-2xl object-cover"
          />

          <div className="flex-1">
            <h3 className="text-lg font-bold text-white">
              {content.title}
            </h3>

            <p className="mt-1 text-sm text-gray-400">
              {content.description}
            </p>
          </div>

          <button
            onClick={closePrompt}
            className="text-xl text-gray-400 transition hover:text-white"
            aria-label={language === "ar" ? "إغلاق" : "Close"}
          >
            ×
          </button>
        </div>

        <button
          onClick={() => {
            alert(content.instructions);
          }}
          className="mt-4 w-full rounded-2xl bg-[#D4AF37] px-5 py-3 font-bold text-black transition active:scale-95"
        >
          {content.button}
        </button>

        <p className="mt-3 text-center text-xs text-gray-500">
          {content.footer}
        </p>
      </div>
    </div>
  );
}