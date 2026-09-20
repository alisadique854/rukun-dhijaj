import type { Language } from "@/context/LanguageContext";

export const translations = {
  en: {
    hero: {
      title1: "Delicious Food",
      title2: "Delivered Every Day",
      subtitle: [
        "Broast",
        "Burgers",
        "Pizza",
        "Sandwich",
        "Grills",
      ],
      description:
        "Freshly prepared meals made with premium ingredients. Enjoy crispy broast, juicy burgers, delicious pizza, sandwiches and more — delivered hot and fresh to your doorstep.",
      whatsapp: "WhatsApp Order",
      whatsappMessage:
        "Hello RUKUN DHIJAJ, I would like to place an order.",
    },
    search: {
      placeholder: "Search for your favorite food or category...",
      categoryBadge: "Category",
      productBadge: "Product",
      currency: "SAR",
    },
    categories: {
      title: "Browse Categories",
      subtitle: "Choose your favourite food",
      itemsTitle: "Choose your favourite items",
    }
  },

  ar: {
    hero: {
      title1: "طعام لذيذ",
      title2: "يصلك كل يوم",
      subtitle: [
        "بروست",
        "برجر",
        "بيتزا",
        "ساندويتش",
        "مشاوي",
      ],
      description:
        "وجبات طازجة تُحضّر بمكونات عالية الجودة. استمتع بالبروست المقرمش والبرجر والبيتزا والسندويتشات والمشاوي مع توصيل سريع إلى باب منزلك.",
      whatsapp: "اطلب عبر واتساب",
      whatsappMessage:
        "مرحبًا ركن الدجاج، أود تقديم طلب.",
    },
    search: {
      placeholder: "ابحث عن وجبتك المفضلة أو قسم...",
      categoryBadge: "قسم",
      productBadge: "وجبة",
      currency: "ريال",
    },
    categories: {
      title: "تصفح الفئات",
      subtitle: "اختر طعامك المفضل",
      itemsTitle: "اختر أصنافك المفضلة",
    }
  },
} as const;

export function getTranslations(language: Language) {
  return translations[language];
}