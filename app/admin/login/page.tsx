"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

import {
  Lock,
  Mail,
  LogIn,
  ShieldCheck,
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      router.push("/admin/dashboard");
    } catch (err) {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main dir="ltr" className="flex min-h-screen items-center justify-center bg-[#090909] px-5">
      <div className="w-full max-w-md rounded-3xl border border-[#2d2208] bg-[#111111] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#ffb800]/10">
            <ShieldCheck
              size={42}
              className="text-[#ffb800]"
            />
          </div>

          <h1 className="mt-5 text-3xl font-black text-white">
            Admin Login
          </h1>

          <p className="mt-2 text-sm text-neutral-400">
            Login to manage your restaurant
          </p>
        </div>

        {error && (
          <div className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-center text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Email */}
        <label className="mb-2 flex items-center gap-2 text-sm text-neutral-300">
          <Mail size={16} />
          Email Address
        </label>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-5 w-full rounded-xl border border-[#2d2208] bg-[#181818] px-4 py-3 text-white outline-none transition focus:border-[#ffb800]"
        />

        {/* Password */}
        <label className="mb-2 flex items-center gap-2 text-sm text-neutral-300">
          <Lock size={16} />
          Password
        </label>

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border border-[#2d2208] bg-[#181818] px-4 py-3 text-white outline-none transition focus:border-[#ffb800]"
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#ffb800] py-4 text-lg font-bold text-black transition hover:bg-[#e6a500] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <LogIn size={20} />

          {loading ? "Signing In..." : "Login"}
        </button>

        <div className="mt-8 border-t border-[#2d2208] pt-5 text-center">
          <p className="text-sm text-neutral-500">
            RUKUN DHIJAJ
          </p>

          <p className="mt-1 text-xs text-neutral-600">
            Restaurant Management Panel
          </p>
        </div>
      </div>
    </main>
  );
}