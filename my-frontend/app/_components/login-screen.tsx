"use client";

import Link from "next/link";
import { useState } from "react";

type AuthMode = "login" | "register";

export default function LoginScreen() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen w-full bg-linear-to-b from-[#f8f6f2] via-[#f3f7f3] to-[#ecf2ee]">
      <div className="mx-auto flex w-full max-w-105 flex-col items-center gap-6 px-4 pb-10 pt-10">
        <div className="flex flex-col items-center gap-3 vv-rise-in">
          <div className="vv-display flex h-16 w-16 items-center justify-center rounded-3xl bg-(--vv-accent) text-xl text-white shadow-[0_18px_28px_rgba(35,70,60,0.28)]">
            VV
          </div>
          <h1 className="text-xl font-semibold tracking-tight">VietVibe</h1>
          <p className="text-xs text-(--vv-muted)">ベトナム語リスニング練習</p>
        </div>

        <div className="w-full rounded-3xl bg-white/90 p-5 shadow-[0_18px_32px_rgba(31,43,39,0.08)] ring-1 ring-(--vv-ring) vv-rise-in vv-delay-1">
          <div className="flex rounded-full bg-(--vv-border) p-1 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`w-1/2 rounded-full px-3 py-2 transition ${
                mode === "login"
                  ? "bg-white text-(--vv-accent-strong)"
                  : "text-(--vv-muted)"
              }`}
            >
              ログイン
            </button>
            <button
              type="button"
              onClick={() => setMode("register")}
              className={`w-1/2 rounded-full px-3 py-2 transition ${
                mode === "register"
                  ? "bg-white text-(--vv-accent-strong)"
                  : "text-(--vv-muted)"
              }`}
            >
              新規登録
            </button>
          </div>

          <form className="mt-6 flex flex-col gap-4">
            {mode === "register" ? (
              <label className="flex flex-col gap-2 text-xs font-semibold text-(--vv-muted)">
                お名前
                <input
                  type="text"
                  placeholder="お名前を入力..."
                  className="h-12 rounded-2xl border border-transparent bg-white px-4 text-sm text-foreground shadow-sm ring-1 ring-(--vv-border) focus:border-(--vv-accent) focus:outline-none"
                />
              </label>
            ) : null}

            <label className="flex flex-col gap-2 text-xs font-semibold text-(--vv-muted)">
              メールアドレス
              <input
                type="email"
                placeholder="メールアドレスを入力..."
                className="h-12 rounded-2xl border border-transparent bg-white px-4 text-sm text-foreground shadow-sm ring-1 ring-(--vv-border) focus:border-(--vv-accent) focus:outline-none"
              />
            </label>

            <label className="flex flex-col gap-2 text-xs font-semibold text-(--vv-muted)">
              パスワード
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="パスワードを入力..."
                  className="h-12 w-full rounded-2xl border border-transparent bg-white px-4 pr-12 text-sm text-foreground shadow-sm ring-1 ring-(--vv-border) focus:border-(--vv-accent) focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-(--vv-muted)"
                >
                  <EyeIcon className="h-5 w-5" />
                </button>
              </div>
            </label>

            {mode === "register" ? (
              <label className="flex flex-col gap-2 text-xs font-semibold text-(--vv-muted)">
                パスワード確認
                <input
                  type="password"
                  placeholder="もう一度入力..."
                  className="h-12 rounded-2xl border border-transparent bg-white px-4 text-sm text-foreground shadow-sm ring-1 ring-(--vv-border) focus:border-(--vv-accent) focus:outline-none"
                />
              </label>
            ) : null}

            <div className="flex items-center justify-between text-xs">
              <button
                type="button"
                className="font-semibold text-(--vv-accent-strong)"
              >
                パスワードをお忘れですか？
              </button>
              <Link href="/" className="text-(--vv-muted)">
                戻る
              </Link>
            </div>

            <button
              type="button"
              className="mt-2 h-12 rounded-2xl bg-(--vv-accent) text-sm font-semibold text-white shadow-[0_14px_24px_rgba(35,70,60,0.3)]"
            >
              {mode === "login" ? "ログイン" : "新規登録"}
            </button>

            <p className="text-center text-xs text-(--vv-muted)">
              {mode === "login"
                ? "アカウントをお持ちでないですか？"
                : "すでにアカウントをお持ちですか？"}
              <button
                type="button"
                onClick={() =>
                  setMode((prev) => (prev === "login" ? "register" : "login"))
                }
                className="ml-2 font-semibold text-(--vv-accent-strong)"
              >
                {mode === "login" ? "新規登録" : "ログイン"}
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

function EyeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M1.5 12s4.5-7.5 10.5-7.5S22.5 12 22.5 12s-4.5 7.5-10.5 7.5S1.5 12 1.5 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
