import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#0F0F10]">
      <div className="flex flex-col items-center">
        {/* Logo */}
        <div className="relative h-36 w-36">
          <Image
            src="/logo.png"
            alt="Chicken Corner"
            fill
            priority
            className="object-contain"
          />
        </div>

        {/* Spinner */}
        <div className="mt-8 h-10 w-10 animate-spin rounded-full border-4 border-yellow-500 border-t-transparent" />

        {/* Text */}
        <p className="mt-6 text-lg font-semibold tracking-wide text-white">
          Loading...
        </p>
      </div>
    </div>
  );
}