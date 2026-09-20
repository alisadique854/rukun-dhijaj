"use client";

import { MapPin, Phone, Clock3, Mail, Map } from "lucide-react";
import { FaInstagram, FaSnapchatGhost, FaWhatsapp } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { language, isRTL } = useLanguage();
  const isAr = language === "ar";

  const formatNumber = (text: string) => {
    if (!isAr) return text;
    return text.replace(/[0-9]/g, (w) => "٠١٢٣٤٥٦٧٨٩"[parseInt(w)]);
  };

  return (
    <footer className="mt-20 border-t border-[#2d2208] bg-[#111111]">
      <div className="mx-auto max-w-[1600px] px-6 py-14">
        
        {/* Premium CTA Section */}
        <div 
          dir={isRTL ? "rtl" : "ltr"} 
          className={`mb-16 rounded-2xl border border-[#2d2208] bg-[#161616] p-8 md:p-12 shadow-2xl transition-all duration-300 hover:shadow-[#ffb800]/5 flex flex-col lg:flex-row items-center justify-between gap-8 ${isRTL ? "text-right" : "text-left"}`}
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-[#ffb800] font-cairo tracking-wide">
              {isAr ? "هل أنت جائع؟" : "Hungry?"}
            </h2>
            <p className="mt-2 text-lg md:text-xl text-neutral-300 font-cairo">
              {isAr ? "اطلب وجبتك المفضلة الآن" : "Order Your Favourite Meal Today"}
            </p>
          </div>
          <div className="flex flex-wrap gap-4 w-full lg:w-auto justify-center lg:justify-start">
            <a
              href="https://wa.me/919656836427"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-[#ffb800] text-black font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:bg-[#ffb800] hover:shadow-[0_0_20px_rgba(255,184,0,0.4)] hover:scale-105 active:scale-95 font-cairo w-full sm:w-auto text-center"
            >
              <FaWhatsapp size={20} className="shrink-0" />
              <span>{isAr ? "طلب عبر الواتساب" : "WhatsApp Order"}</span>
            </a>
            <a
              href="tel:+919656836427"
              className="flex items-center justify-center gap-2 border border-[#2d2208] bg-[#111111] text-[#ffb800] font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:border-[#ffb800] hover:bg-[#ffb800] hover:text-black hover:shadow-[0_0_20px_rgba(255,184,0,0.2)] hover:scale-105 active:scale-95 font-cairo w-full sm:w-auto text-center"
            >
              <span>{isAr ? "اتصل الآن" : "Call Now"}</span>
            </a>
          </div>
        </div>

        {/* Footer Columns */}
        <div 
          dir={isRTL ? "rtl" : "ltr"}
          className={`grid gap-10 md:grid-cols-2 lg:grid-cols-5 ${isRTL ? "text-right" : "text-left"}`}
        >
          
          {/* Column 1: Restaurant */}
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-black text-[#ffb800] font-cairo tracking-wide">
              {isAr ? "ركن الدجاج" : "RUKUN DHIJAJ"}
            </h2>
            <p className="mt-4 leading-7 text-neutral-400 font-cairo text-sm">
              {isAr 
                ? "بروست وبرجر وبيتزا وشاورما تُحضّر طازجة يومياً بمذاق أصيل في حي الصفا، جدة."
                : "Premium Broast, Burgers, Pizza and Shawarma prepared fresh every day with authentic taste in Al Safa, Jeddah."}
            </p>
          </div>

          {/* Column 2: Contact */}
          <div>
            <h3 className="mb-5 text-xl font-bold text-white font-cairo relative inline-block after:absolute after:bottom-[-4px] after:start-0 after:h-[2px] after:w-8 after:bg-[#ffb800]">
              {isAr ? "اتصل بنا" : "Contact"}
            </h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-[#ffb800]" />
                <p className="text-neutral-400 font-cairo">
                  {isAr ? "الصفا، جدة، المملكة العربية السعودية" : "Al Safa, Jeddah, Saudi Arabia"}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <FaWhatsapp size={18} className="shrink-0 text-[#ffb800]" />
                <a
                  href="https://wa.me/919656836427"
                  target="_blank"
                  rel="noopener noreferrer"
                  dir="ltr"
                  className={`text-neutral-300 transition hover:text-[#ffb800] hover:drop-shadow-[0_0_8px_rgba(255,184,0,0.5)] ${isRTL ? "text-right" : ""}`}
                >
                  {formatNumber("96568 36427")}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={18} className="shrink-0 text-[#ffb800]" />
                <a
                  href="mailto:rukundhijajksa@gmail.com"
                  className="text-neutral-300 transition hover:text-[#ffb800] hover:underline decoration-[#ffb800] underline-offset-4 break-all"
                >
                  rukundhijajksa@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Column 3: Working Hours */}
          <div>
            <h3 className="mb-5 text-xl font-bold text-white font-cairo relative inline-block after:absolute after:bottom-[-4px] after:start-0 after:h-[2px] after:w-8 after:bg-[#ffb800]">
              {isAr ? "ساعات العمل" : "Working Hours"}
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <Clock3 size={18} className="shrink-0 text-[#ffb800]" />
                <span className="text-neutral-300 font-cairo font-semibold">
                  {isAr ? "كل يوم" : "Every Day"}
                </span>
              </div>
              <p className="text-neutral-400 font-cairo" dir="ltr">
                {isAr ? formatNumber("1:00 PM – 2:30 AM") : "1:00 PM – 2:30 AM"}
              </p>
              <p className="text-xs font-bold uppercase tracking-wider text-[#ffb800] font-cairo">
                {isAr ? "مفتوح يومياً" : "Open Daily"}
              </p>
            </div>
          </div>

          {/* Column 4: Find Us */}
          <div>
            <h3 className="mb-5 text-xl font-bold text-white font-cairo relative inline-block after:absolute after:bottom-[-4px] after:start-0 after:h-[2px] after:w-8 after:bg-[#ffb800]">
              {isAr ? "موقعنا" : "Find Us"}
            </h3>
            <div className="space-y-4 text-sm">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 border border-[#2d2208] bg-[#161616] px-4 py-3 rounded-xl text-neutral-300 transition-all duration-300 hover:border-[#ffb800] hover:text-[#ffb800] hover:shadow-[0_0_15px_rgba(255,184,0,0.15)] hover:scale-105"
              >
                <Map size={18} className="shrink-0 text-[#ffb800]" />
                <span className="font-cairo font-medium">
                  {isAr ? "الاتجاهات" : "Get Directions"}
                </span>
              </a>
            </div>
          </div>

          {/* Column 5: Follow Us */}
          <div>
            <h3 className="mb-5 text-xl font-bold text-white font-cairo relative inline-block after:absolute after:bottom-[-4px] after:start-0 after:h-[2px] after:w-8 after:bg-[#ffb800]">
              {isAr ? "تابعنا" : "Follow Us"}
            </h3>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/rukundhijaj"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Rukun Dhijaj on Instagram"
                className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#2d2208] bg-[#181818] text-neutral-400 transition-all duration-300 hover:border-[#ffb800] hover:bg-[#ffb800] hover:text-black hover:shadow-[0_0_15px_rgba(255,184,0,0.3)] hover:scale-105 active:scale-95"
              >
                <FaInstagram size={20} />
              </a>

              <a
                href="https://snapchat.com/add/rukundhijaj"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Rukun Dhijaj on Snapchat"
                className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#2d2208] bg-[#181818] text-neutral-400 transition-all duration-300 hover:border-[#ffb800] hover:bg-[#ffb800] hover:text-black hover:shadow-[0_0_15px_rgba(255,184,0,0.3)] hover:scale-105 active:scale-95"
              >
                <FaSnapchatGhost size={20} />
              </a>
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="mt-12 border-t border-[#2d2208] pt-6">
          <div className={`flex flex-col items-center justify-between gap-4 text-center md:flex-row ${isRTL ? "md:flex-row-reverse" : ""}`}>
            <p className="text-sm text-neutral-500 font-cairo">
              {isAr 
                ? `© ${formatNumber(String(new Date().getFullYear()))} ركن الدجاج. جميع الحقوق محفوظة.`
                : `© ${new Date().getFullYear()} RUKUN DHIJAJ. All Rights Reserved.`}
            </p>
            <p className="text-sm text-neutral-500 font-cairo">
              {isAr ? "تم التصميم والتطوير بواسطة " : "Designed & Developed by "}
              <span className="font-semibold text-[#ffb800] transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(255,184,0,0.6)]">
                ALI Stack
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}