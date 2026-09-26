import type { Metadata } from "next";
import AdminAuth from "./AdminAuth";

export const metadata: Metadata = {
  title: {
    default: "Chicken Corner Admin",
    template: "%s | Chicken Corner Admin",
  },
  description: "Chicken Corner restaurant administration panel.",
  applicationName: "Chicken Corner Admin",
  manifest: "/admin/manifest.webmanifest",

  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div dir="ltr">
      <AdminAuth>{children}</AdminAuth>
    </div>
  );
}