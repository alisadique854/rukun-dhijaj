"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

import {
  LayoutDashboard,
  FolderKanban,
  UtensilsCrossed,
  ImageIcon,
  Settings,
  Gift,
  LogOut,
  ArrowRight,
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/admin/login");
  };

  const cards = [
    {
      title: "Categories",
      description: "Manage food categories",
      href: "/admin/categories",
      icon: FolderKanban,
    },
    {
      title: "Products",
      description: "Manage all products",
      href: "/admin/products",
      icon: UtensilsCrossed,
    },
    {
      title: "Images",
      description: "Upload product images",
      href: "/admin/images",
      icon: ImageIcon,
    },
    {
      title: "Settings",
      description: "Restaurant settings",
      href: "/admin/settings",
      icon: Settings,
    },
      {
  title: "Offers",
  description: "Manage combo offers",
  href: "/admin/offers",
  icon: Gift,
},
    
  ];

  return (
    <main className="min-h-screen bg-[#090909]">

      {/* Header */}

      <header className="border-b border-[#2d2208] bg-[#111111]">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ffb800]/10">

              <LayoutDashboard
                size={30}
                className="text-[#ffb800]"
              />

            </div>

            <div>

              <h1 className="text-3xl font-black text-white">
                Admin Dashboard
              </h1>

              <p className="text-sm text-neutral-400">
                RUKUN DHIJAJ Management
              </p>

            </div>

          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-3 font-semibold text-red-400 transition hover:bg-red-500 hover:text-white"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>

      </header>

      <section className="mx-auto max-w-7xl px-6 py-10">

        <h2 className="mb-8 text-3xl font-black text-white">
          Welcome 👋
        </h2>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                  {cards.map((card) => {
            const Icon = card.icon;

            return (
              <Link
                key={card.title}
                href={card.href}
                className="group rounded-3xl border border-[#2d2208] bg-[#111111] p-6 transition-all duration-300 hover:border-[#ffb800] hover:shadow-[0_15px_40px_rgba(255,184,0,0.12)]"
              >
                <div className="flex items-center justify-between">

                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#ffb800]/10">
                    <Icon
                      size={30}
                      className="text-[#ffb800]"
                    />
                  </div>

                  <ArrowRight
                    size={22}
                    className="text-neutral-500 transition group-hover:translate-x-1 group-hover:text-[#ffb800]"
                  />

                </div>

                <h3 className="mt-6 text-2xl font-bold text-white">
                  {card.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-neutral-400">
                  {card.description}
                </p>

              </Link>
            );
          })}

        </div>

        <div className="mt-10 rounded-3xl border border-[#2d2208] bg-[#111111] p-8">

          <h3 className="text-2xl font-bold text-white">
            Quick Overview
          </h3>

          <p className="mt-3 text-neutral-400">
            Manage your restaurant categories, products,
            settings and images from one place.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">

                            <div className="rounded-2xl border border-[#2d2208] bg-[#181818] p-5">
              <p className="text-sm text-neutral-400">
                Categories
              </p>

              <h4 className="mt-2 text-3xl font-black text-[#ffb800]">
                Ready
              </h4>
            </div>

            <div className="rounded-2xl border border-[#2d2208] bg-[#181818] p-5">
              <p className="text-sm text-neutral-400">
                Products
              </p>

              <h4 className="mt-2 text-3xl font-black text-[#ffb800]">
                Ready
              </h4>
            </div>

            <div className="rounded-2xl border border-[#2d2208] bg-[#181818] p-5">
              <p className="text-sm text-neutral-400">
                Images
              </p>

              <h4 className="mt-2 text-3xl font-black text-[#ffb800]">
                Ready
              </h4>
            </div>

            <div className="rounded-2xl border border-[#2d2208] bg-[#181818] p-5">
              <p className="text-sm text-neutral-400">
                Settings
              </p>

              <h4 className="mt-2 text-3xl font-black text-[#ffb800]">
                Ready
              </h4>
            </div>

           <div className="rounded-2xl border border-[#2d2208] bg-[#181818] p-5">
  <p className="text-sm text-neutral-400">
    Offers
  </p>

  <h4 className="mt-2 text-3xl font-black text-[#ffb800]">
    Ready
  </h4>
</div>

          </div>

        </div>

      </section>

    </main>
  );
}