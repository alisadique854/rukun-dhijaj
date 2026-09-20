"use client";

import { useState } from "react";
import Header from "@/components/home/Header";

import HeroBanner from "@/components/home/HeroBanner";
import { SearchBar } from "@/components/home/SearchBar";
import Categories from "@/components/home/Categories";
import Offers from "@/components/home/Offers";
import Footer from "@/components/home/Footer";
import FloatingCart from "@/components/cart/FloatingCart";
import SplashScreen from "@/components/common/SplashScreen";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { language } = useLanguage();
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {/* Splash Overlay */}
      <SplashScreen
        show={showSplash}
        onFinish={() => setShowSplash(false)}
      />

      {/* Main Content (Always Rendered) */}
      <main
        className={`min-h-screen bg-[#0F0F10] text-white transition-opacity duration-500 ${
          showSplash ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
       <div
  className="
    mx-auto
    w-full
    max-w-full
    px-4
    py-5
    lg:max-w-[1440px]
    lg:px-8
    xl:px-10
    2xl:px-12
  "
>
          <Header />
          

          <div className="mt-4">
            <HeroBanner />
          </div>

          <div className="-mt-6 relative z-20">
            <SearchBar locale={language} />
          </div>

          <div className="mt-8">
            <Categories locale={language} />
          </div>

          <div className="mt-12">
            <Offers />
          </div>

          <div className="mt-16">
            <Footer />
          </div>
        </div>

        <FloatingCart />
      </main>
    </>
  );
}