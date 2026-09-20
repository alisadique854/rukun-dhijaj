"use client";

import {
  ImageIcon,
  Upload,
  ArrowLeft,
} from "lucide-react";

import Link from "next/link";

export default function ImagesPage() {
  return (
    <main className="min-h-screen bg-[#090909]">

      {/* Header */}

      <header className="border-b border-[#2d2208] bg-[#111111]">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div className="flex items-center gap-4">

            <Link
              href="/admin/dashboard"
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#181818] transition hover:bg-[#ffb800] hover:text-black"
            >
              <ArrowLeft size={20} />
            </Link>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ffb800]/10">

              <ImageIcon
                size={30}
                className="text-[#ffb800]"
              />

            </div>

            <div>

              <h1 className="text-3xl font-black text-white">
                Image Manager
              </h1>

              <p className="text-sm text-neutral-400">
                Upload product images
              </p>

            </div>

          </div>

        </div>

      </header>

      <section className="mx-auto max-w-5xl px-6 py-10">

        <div className="rounded-3xl border border-dashed border-[#ffb800]/40 bg-[#111111] p-10 text-center">

          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#ffb800]/10">

            <Upload
              size={40}
              className="text-[#ffb800]"
            />

          </div>

          <h2 className="mt-6 text-3xl font-black text-white">
            Upload Product Images
          </h2>

          <p className="mt-3 text-neutral-400">
            Choose an image from your phone or laptop.
          </p>
                    <div className="mt-10 rounded-2xl border border-[#2d2208] bg-[#181818] p-8">

            <div className="flex flex-col items-center justify-center">

              <label
                htmlFor="image-upload"
                className="cursor-pointer rounded-2xl bg-[#ffb800] px-8 py-4 text-lg font-bold text-black transition hover:bg-[#e6a500]"
              >
                Choose Image
              </label>

              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
              />

              <p className="mt-4 text-sm text-neutral-500">
                Supports JPG, PNG and WEBP
              </p>

            </div>

          </div>

          <div className="mt-10 rounded-3xl border border-[#2d2208] bg-[#111111] p-8">

            <h3 className="text-2xl font-bold text-white">
              Selected Image
            </h3>

            <div className="mt-6 flex h-80 items-center justify-center rounded-2xl border border-dashed border-[#2d2208] bg-[#181818]">

              <div className="text-center">

                <ImageIcon
                  size={70}
                  className="mx-auto text-neutral-600"
                />

                <p className="mt-5 text-neutral-500">
                  No image selected
                </p>

              </div>

            </div>

                        <div className="mt-8 flex flex-col gap-4 sm:flex-row">

              <button
                className="flex-1 rounded-2xl bg-[#ffb800] py-4 text-lg font-bold text-black transition hover:bg-[#e6a500]"
              >
                Upload Image
              </button>

              <Link
                href="/admin/dashboard"
                className="flex flex-1 items-center justify-center rounded-2xl border border-[#2d2208] bg-[#181818] py-4 text-lg font-semibold text-white transition hover:border-[#ffb800] hover:text-[#ffb800]"
              >
                Back to Dashboard
              </Link>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}