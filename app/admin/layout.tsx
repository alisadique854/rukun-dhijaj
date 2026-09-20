"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   
    if (pathname === "/admin/login") {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/admin/login");
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router, pathname]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#090909] text-white">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#ffb800] border-t-transparent mx-auto"></div>
      </div>
    );
  }


  return <div dir="ltr">{children}</div>;
}