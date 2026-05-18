"use client";

import { useRouter } from "next/navigation";

const profileName = "Thanh Ha";
const profileEmail = "thanhha@gmail.com";

export default function ProfileScreen() {
  const router = useRouter();

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("vietvibe_auth");
    }
    router.push("/login");
  };

  return (
    <div className="min-h-screen w-full bg-linear-to-b from-[#f8f6f2] via-[#f3f7f3] to-[#ecf2ee]">
      <div className="mx-auto flex w-full max-w-105 flex-col gap-6 px-5 pb-10 pt-8">
        <h1 className="text-lg font-semibold">プロフィール</h1>

        <div className="flex flex-col items-center gap-2 vv-rise-in">
          <div className="relative">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-(--vv-accent) text-xl font-semibold text-white shadow-[0_12px_24px_rgba(35,70,60,0.28)]">
              TH
            </div>
            <button
              type="button"
              className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-(--vv-accent-soft) text-(--vv-accent-strong) shadow-sm ring-1 ring-(--vv-ring)"
              aria-label="プロフィール写真を変更"
            >
              <CameraIcon className="h-4 w-4" />
            </button>
          </div>
          <p className="text-base font-semibold">{profileName}</p>
          <p className="text-xs text-(--vv-muted)">{profileEmail}</p>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold text-(--vv-muted)">情報を更新</p>
          <div className="overflow-hidden rounded-3xl bg-white/90 shadow-[0_16px_28px_rgba(31,43,39,0.08)] ring-1 ring-(--vv-ring)">
            <div className="divide-y divide-(--vv-border)">
              <button
                type="button"
                className="flex w-full items-center justify-between px-4 py-3 text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-(--vv-border) text-(--vv-accent-strong)">
                    <UserIcon className="h-5 w-5" />
                  </span>
                  <p className="text-sm font-semibold">ユーザー名を更新</p>
                </div>
                <ChevronRight className="h-4 w-4 text-(--vv-muted)" />
              </button>
              <button
                type="button"
                className="flex w-full items-center justify-between px-4 py-3 text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-(--vv-border) text-(--vv-accent-strong)">
                    <MailIcon className="h-5 w-5" />
                  </span>
                  <p className="text-sm font-semibold">メールアドレスを更新</p>
                </div>
                <ChevronRight className="h-4 w-4 text-(--vv-muted)" />
              </button>
              <button
                type="button"
                className="flex w-full items-center justify-between px-4 py-3 text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-(--vv-border) text-(--vv-accent-strong)">
                    <LockIcon className="h-5 w-5" />
                  </span>
                  <p className="text-sm font-semibold">パスワードを更新</p>
                </div>
                <ChevronRight className="h-4 w-4 text-(--vv-muted)" />
              </button>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="mt-2 h-12 w-full rounded-2xl bg-[#9d3d3a] text-sm font-semibold text-white shadow-[0_14px_24px_rgba(135,48,46,0.25)]"
        >
          ログアウト
        </button>
      </div>
    </div>
  );
}

function CameraIcon({ className }: { className?: string }) {
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
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3l2-3h6l2 3h3a2 2 0 0 1 2 2Z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

function UserIcon({ className }: { className?: string }) {
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
      <path d="M20 21a8 8 0 0 0-16 0" />
      <circle cx="12" cy="9" r="4" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
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
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function LockIcon({ className }: { className?: string }) {
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
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

function ChevronRight({ className }: { className?: string }) {
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
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
