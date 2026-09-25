"use client";

import { useState } from "react";
import { MapPin, Clock3, Mail, Map, X, BookOpen } from "lucide-react";
import { FaInstagram, FaSnapchatGhost, FaWhatsapp } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { language, isRTL } = useLanguage();
  const isAr = language === "ar";

  const [showHistory, setShowHistory] = useState(false);

  const formatNumber = (text: string) => {
    if (!isAr) return text;

    return text.replace(
      /[0-9]/g,
      (w) => "٠١٢٣٤٥٦٧٨٩"[parseInt(w)]
    );
  };

  return (
    <>
      <footer className="mt-20 border-t border-[#2d2208] bg-[#111111]">
        <div className="mx-auto max-w-[1600px] px-6 py-14">

          {/* Premium CTA Section */}
          <div
            dir={isRTL ? "rtl" : "ltr"}
            className={`mb-16 flex flex-col items-center justify-between gap-8 rounded-2xl border border-[#2d2208] bg-[#161616] p-8 shadow-2xl transition-all duration-300 hover:shadow-[#ffb800]/5 md:p-12 lg:flex-row ${
              isRTL ? "text-right" : "text-left"
            }`}
          >
            <div>
              <h2 className="font-cairo text-3xl font-black tracking-wide text-[#ffb800] md:text-4xl">
                {isAr ? "هل أنت جائع؟" : "Hungry?"}
              </h2>

              <p className="mt-2 font-cairo text-lg text-neutral-300 md:text-xl">
                {isAr
                  ? "اطلب وجبتك المفضلة الآن"
                  : "Order Your Favourite Meal Today"}
              </p>
            </div>

            <div className="flex w-full flex-wrap justify-center gap-4 lg:w-auto lg:justify-start">
              <a
                href="https://wa.me/966556127369"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#ffb800] px-8 py-4 text-center font-cairo font-bold text-black transition-all duration-300 hover:bg-[#ffb800] hover:scale-105 hover:shadow-[0_0_20px_rgba(255,184,0,0.4)] active:scale-95 sm:w-auto"
              >
                <FaWhatsapp size={20} className="shrink-0" />

                <span>
                  {isAr ? "طلب عبر الواتساب" : "WhatsApp Order"}
                </span>
              </a>

              <a
                href="tel:+966556127369"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#2d2208] bg-[#111111] px-8 py-4 text-center font-cairo font-bold text-[#ffb800] transition-all duration-300 hover:border-[#ffb800] hover:bg-[#ffb800] hover:text-black hover:scale-105 hover:shadow-[0_0_20px_rgba(255,184,0,0.2)] active:scale-95 sm:w-auto"
              >
                <span>
                  {isAr ? "اتصل الآن" : "Call Now"}
                </span>
              </a>
            </div>
          </div>

          {/* Footer Columns */}
          <div
            dir={isRTL ? "rtl" : "ltr"}
            className={`grid gap-10 md:grid-cols-2 lg:grid-cols-5 ${
              isRTL ? "text-right" : "text-left"
            }`}
          >

            {/* Column 1: Restaurant / Our History */}
            <div className="lg:col-span-1">
              <h2 className="font-cairo text-3xl font-black tracking-wide text-[#ffb800]">
                {isAr ? "ركن الدجاج" : "CHICKEN CORNER"}
              </h2>

              <p className="mt-4 font-cairo text-sm leading-7 text-neutral-400">
                {isAr
                  ? "بروست وبرجر وبيتزا وشاورما تُحضّر طازجة يومياً بمذاق أصيل في حي الصفا، جدة."
                  : "Premium Broast, Burgers, Pizza and Shawarma prepared fresh every day with authentic taste in Al Safa, Jeddah."}
              </p>

              {/* Our History Button */}
              <button
                type="button"
                onClick={() => setShowHistory(true)}
                className="mt-5 inline-flex items-center gap-2 rounded-lg border border-[#2d2208] bg-[#161616] px-4 py-2.5 font-cairo text-sm font-semibold text-[#ffb800] transition-all duration-300 hover:border-[#ffb800] hover:bg-[#ffb800] hover:text-black hover:shadow-[0_0_15px_rgba(255,184,0,0.18)]"
              >
                <BookOpen size={16} />

                <span>
                  {isAr ? "قصتنا" : "Our History"}
                </span>
              </button>
            </div>

            {/* Column 2: Contact */}
            <div>
              <h3 className="relative mb-5 inline-block font-cairo text-xl font-bold text-white after:absolute after:bottom-[-4px] after:start-0 after:h-[2px] after:w-8 after:bg-[#ffb800]">
                {isAr ? "اتصل بنا" : "Contact"}
              </h3>

              <div className="space-y-4 text-sm">

                <div className="flex items-start gap-3">
                  <MapPin
                    size={18}
                    className="mt-0.5 shrink-0 text-[#ffb800]"
                  />

                  <p className="font-cairo text-neutral-400">
                    {isAr
                      ? "الصفا، جدة، المملكة العربية السعودية"
                      : "Al Safa, Jeddah, Saudi Arabia"}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <FaWhatsapp
                    size={18}
                    className="shrink-0 text-[#ffb800]"
                  />

                  <a
                    href="https://wa.me/966556127369"
                    target="_blank"
                    rel="noopener noreferrer"
                    dir="ltr"
                    className={`text-neutral-300 transition hover:text-[#ffb800] hover:drop-shadow-[0_0_8px_rgba(255,184,0,0.5)] ${
                      isRTL ? "text-right" : ""
                    }`}
                  >
                    {formatNumber("96568 36427")}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Mail
                    size={18}
                    className="shrink-0 text-[#ffb800]"
                  />

                  <a
                    href="mailto:rukundhijajksa@gmail.com"
                    className="break-all text-neutral-300 transition hover:text-[#ffb800] hover:underline decoration-[#ffb800] underline-offset-4"
                  >
                    rukundhijajksa@gmail.com
                  </a>
                </div>

              </div>
            </div>

            {/* Column 3: Working Hours */}
            <div>
              <h3 className="relative mb-5 inline-block font-cairo text-xl font-bold text-white after:absolute after:bottom-[-4px] after:start-0 after:h-[2px] after:w-8 after:bg-[#ffb800]">
                {isAr ? "ساعات العمل" : "Working Hours"}
              </h3>

              <div className="space-y-3 text-sm">

                <div className="flex items-center gap-3">
                  <Clock3
                    size={18}
                    className="shrink-0 text-[#ffb800]"
                  />

                  <span className="font-cairo font-semibold text-neutral-300">
                    {isAr ? "كل يوم" : "Every Day"}
                  </span>
                </div>

                <p
                  className="font-cairo text-neutral-400"
                  dir="ltr"
                >
                  {isAr
                    ? formatNumber("1:00 PM – 2:30 AM")
                    : "1:00 PM – 2:30 AM"}
                </p>

                <p className="font-cairo text-xs font-bold uppercase tracking-wider text-[#ffb800]">
                  {isAr ? "مفتوح يومياً" : "Open Daily"}
                </p>

              </div>
            </div>

            {/* Column 4: Find Us */}
            <div>
              <h3 className="relative mb-5 inline-block font-cairo text-xl font-bold text-white after:absolute after:bottom-[-4px] after:start-0 after:h-[2px] after:w-8 after:bg-[#ffb800]">
                {isAr ? "موقعنا" : "Find Us"}
              </h3>

              <div className="space-y-4 text-sm">

                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=21.588681%2C39.206652"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-xl border border-[#2d2208] bg-[#161616] px-4 py-3 text-neutral-300 transition-all duration-300 hover:border-[#ffb800] hover:text-[#ffb800] hover:scale-105 hover:shadow-[0_0_15px_rgba(255,184,0,0.15)]"
                >
                  <Map
                    size={18}
                    className="shrink-0 text-[#ffb800]"
                  />

                  <span className="font-cairo font-medium">
                    {isAr ? "الاتجاهات" : "Get Directions"}
                  </span>
                </a>

              </div>
            </div>

            {/* Column 5: Follow Us */}
            <div>
              <h3 className="relative mb-5 inline-block font-cairo text-xl font-bold text-white after:absolute after:bottom-[-4px] after:start-0 after:h-[2px] after:w-8 after:bg-[#ffb800]">
                {isAr ? "تابعنا" : "Follow Us"}
              </h3>

              <div className="flex gap-4">

                <a
                  href="https://instagram.com/rukundhijaj"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Chicken Corner on Instagram"
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#2d2208] bg-[#181818] text-neutral-400 transition-all duration-300 hover:border-[#ffb800] hover:bg-[#ffb800] hover:text-black hover:scale-105 hover:shadow-[0_0_15px_rgba(255,184,0,0.3)] active:scale-95"
                >
                  <FaInstagram size={20} />
                </a>

                <a
                  href="https://snapchat.com/add/rukundhijaj"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Chicken Corner on Snapchat"
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#2d2208] bg-[#181818] text-neutral-400 transition-all duration-300 hover:border-[#ffb800] hover:bg-[#ffb800] hover:text-black hover:scale-105 hover:shadow-[0_0_15px_rgba(255,184,0,0.3)] active:scale-95"
                >
                  <FaSnapchatGhost size={20} />
                </a>

              </div>
            </div>

          </div>

          {/* Footer Bottom */}
          <div className="mt-12 border-t border-[#2d2208] pt-6">

            <div
              className={`flex flex-col items-center justify-between gap-4 text-center md:flex-row ${
                isRTL ? "md:flex-row-reverse" : ""
              }`}
            >

              <p className="font-cairo text-sm text-neutral-500">
                {isAr
                  ? `© ${formatNumber(
                      String(new Date().getFullYear())
                    )} ركن الدجاج. جميع الحقوق محفوظة.`
                  : `© ${new Date().getFullYear()} CHICKEN CORNER. All Rights Reserved.`}
              </p>

              <p className="font-cairo text-sm text-neutral-500">
                {isAr
                  ? "تم التصميم والتطوير بواسطة "
                  : "Designed & Developed by "}

                <span className="font-semibold text-[#ffb800] transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(255,184,0,0.6)]">
                  ALI Stack
                </span>
              </p>

            </div>

          </div>

        </div>
      </footer>

      {/* ============================= */}
      {/* OUR HISTORY MODAL */}
      {/* ============================= */}

      <AnimatePresence>
        {showHistory && (
          <motion.div
            dir={isRTL ? "rtl" : "ltr"}
            className="fixed inset-0 z-[9999] flex items-end justify-center bg-black/60 p-4 backdrop-blur-[2px] md:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowHistory(false)}
          >

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="history-title"
              onClick={(e) => e.stopPropagation()}
              initial={{
                opacity: 0,
                y: 80,
                scale: 0.98,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 60,
                scale: 0.98,
              }}
              transition={{
                duration: 0.28,
                ease: "easeOut",
              }}
              className={`relative w-full max-w-2xl overflow-hidden rounded-2xl border border-[#3b2d0a] bg-[#111111] shadow-[0_20px_80px_rgba(0,0,0,0.55)] ${
                isRTL ? "text-right" : "text-left"
              }`}
            >

              {/* Gold top line */}
              <div className="h-1 w-full bg-[#ffb800]" />

              <div className="p-6 md:p-8">

                {/* Header */}
                <div className="flex items-start justify-between gap-5">

                  <div>
                    <p className="mb-2 font-cairo text-xs font-bold uppercase tracking-[0.2em] text-[#ffb800]">
                      {isAr ? "منذ أكثر من 18 سنة" : "Over 18 Years"}
                    </p>

                    <h2
                      id="history-title"
                      className="font-cairo text-2xl font-black text-white md:text-3xl"
                    >
                      {isAr ? "قصتنا" : "Our History"}
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowHistory(false)}
                    aria-label={isAr ? "إغلاق" : "Close"}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#2d2208] bg-[#181818] text-neutral-400 transition-all duration-200 hover:border-[#ffb800] hover:bg-[#ffb800] hover:text-black"
                  >
                    <X size={19} />
                  </button>

                </div>

                {/* Divider */}
                <div className="my-6 h-px bg-[#2d2208]" />

                {/* English / Arabic History */}
                <div className="font-cairo text-[15px] leading-8 text-neutral-300">

                  {isAr ? (
                    <>
                      <p>
                        لأكثر من 18 سنة، وركن الدجاج يقدم لعملائنا في حي الصفا
                        بجدة الأكل اللي يحبونه. بدأت قصتنا بحب الأكل الطيب،
                        ومع الوقت كبرت بثقة ودعم عملائنا.
                      </p>

                      <p className="mt-5">
                        ومن البداية، كان اهتمامنا دايم بالجودة، والمكونات
                        الطازجة، وأن كل وجبة تنقدم لكم بالمستوى اللي يرضيكم.
                      </p>

                      <p className="mt-5">
                        واليوم، نكمل نفس المشوار ونقدم لكم النكهات اللي
                        تحبونها، بنفس الشغف والاهتمام.
                      </p>
                    </>
                  ) : (
                    <>
                      <p>
                        For over 18 years, Chicken Corner has been serving
                        customers in Al Safa, Jeddah with the food they love.
                        Our journey started with a passion for good food, and
                        over the years, it has grown through the trust and
                        support of our customers.
                      </p>

                      <p className="mt-5">
                        From the beginning, we have always focused on quality,
                        fresh ingredients, and making sure every meal is
                        prepared with care.
                      </p>

                      <p className="mt-5">
                        Today, we continue the same journey, serving the
                        flavours our customers love with the same passion and
                        care.
                      </p>
                    </>
                  )}

                </div>

                {/* Bottom accent */}
                <div className="mt-7 flex items-center gap-3">
                  <div className="h-px flex-1 bg-[#2d2208]" />
                  <span className="text-lg text-[#ffb800]">✦</span>
                  <div className="h-px flex-1 bg-[#2d2208]" />
                </div>

              </div>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}