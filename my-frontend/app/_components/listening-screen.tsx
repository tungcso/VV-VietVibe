"use client";

import Link from "next/link";
import { useState } from "react";

type PlayMode = "study" | "continuous";
type AmbientSound = "cafe" | "road" | "market" | "office" | "off";

const speeds = ["0.75x", "1.0x"] as const;

const conversationLines = [
  {
    id: "line-1",
    vi: "Xin chào, tôi cần thanh toán.",
    ja: "すみません、会計をお願いします。",
  },
  {
    id: "line-2",
    vi: "Tôi muốn trả bằng tiền mặt.",
    ja: "現金で支払いたいです。",
  },
  {
    id: "line-3",
    vi: "Bạn có thể xuất hóa đơn không?",
    ja: "領収書を発行してもらえますか？",
  },
  {
    id: "line-4",
    vi: "Bạn nhận thẻ tín dụng không?",
    ja: "クレジットカードは使えますか？",
  },
  {
    id: "line-5",
    vi: "Tôi có thể thanh toán bằng QR không?",
    ja: "QR で支払えますか？",
  },
  {
    id: "line-6",
    vi: "Cho tôi một túi nhé.",
    ja: "袋をください。",
  },
  {
    id: "line-7",
    vi: "Tôi quên mã PIN.",
    ja: "暗証番号を忘れました。",
  },
  {
    id: "line-8",
    vi: "Cảm ơn, hẹn gặp lại.",
    ja: "ありがとう、またね。",
  },
];

const ambientOptions: Array<{ id: AmbientSound; label: string }> = [
  { id: "cafe", label: "カフェ" },
  { id: "road", label: "道路" },
  { id: "market", label: "市場" },
  { id: "office", label: "オフィス" },
  { id: "off", label: "オフ" },
];

export default function ListeningScreen() {
  const [speed, setSpeed] = useState<(typeof speeds)[number]>("1.0x");
  const [playMode, setPlayMode] = useState<PlayMode>("study");
  const [ambientSound, setAmbientSound] = useState<AmbientSound>("cafe");
  const [ambientVolume, setAmbientVolume] = useState(40);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const currentLine = conversationLines[currentIndex];

  const goPrev = () =>
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  const goNext = () =>
    setCurrentIndex((prev) =>
      Math.min(prev + 1, conversationLines.length - 1),
    );

  return (
    <div className="min-h-screen w-full bg-linear-to-b from-[#f8f6f2] via-[#f3f7f3] to-[#ecf2ee]">
      {isSettingsOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setIsSettingsOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            className="w-full max-w-sm rounded-3xl bg-white p-5 shadow-[0_24px_50px_rgba(0,0,0,0.25)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-base font-semibold text-foreground">
                  再生設定
                </h2>
              </div>
              <button
                type="button"
                className="text-lg font-semibold text-(--vv-muted)"
                onClick={() => setIsSettingsOpen(false)}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="mt-4">
              <p className="text-xs font-semibold text-(--vv-muted)">
                再生モード
              </p>
              <div className="mt-3 flex rounded-full bg-(--vv-border) p-1 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setPlayMode("study")}
                  className={`flex-1 rounded-full px-3 py-2 transition ${
                    playMode === "study"
                      ? "bg-(--vv-accent-strong) text-white"
                      : "text-(--vv-muted)"
                  }`}
                >
                  学習モード
                </button>
                <button
                  type="button"
                  onClick={() => setPlayMode("continuous")}
                  className={`flex-1 rounded-full px-3 py-2 transition ${
                    playMode === "continuous"
                      ? "bg-(--vv-accent-strong) text-white"
                      : "text-(--vv-muted)"
                  }`}
                >
                  連続再生
                </button>
              </div>
            </div>

            <div className="mt-5">
              <p className="text-xs font-semibold text-(--vv-muted)">
                環境音の練習
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {ambientOptions.map((option) => {
                  const isActive = ambientSound === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setAmbientSound(option.id)}
                      className={`rounded-full px-3 py-2 text-xs font-semibold transition ${
                        isActive
                          ? "bg-(--vv-accent-soft) text-(--vv-accent-strong)"
                          : "bg-(--vv-border) text-(--vv-muted)"
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-5">
              <p className="text-xs font-semibold text-(--vv-muted)">
                環境音の音量
              </p>
              <input
                type="range"
                min={0}
                max={100}
                value={ambientVolume}
                onChange={(event) =>
                  setAmbientVolume(Number(event.target.value))
                }
                className="vv-range mt-3"
              />
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setIsSettingsOpen(false)}
                className="flex-1 rounded-full bg-(--vv-border) px-4 py-2 text-xs font-semibold text-(--vv-muted)"
              >
                キャンセル
              </button>
              <button
                type="button"
                onClick={() => setIsSettingsOpen(false)}
                className="flex-1 rounded-full bg-(--vv-accent-strong) px-4 py-2 text-xs font-semibold text-white"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <div className="mx-auto flex w-full max-w-105 flex-col gap-5 px-4 pb-10 pt-6">
        <div className="vv-rise-in">
          <p className="text-xs font-semibold text-(--vv-muted)">
            スーパー / レジで支払う
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">
            聞き取り
          </h1>
          <p className="mt-1 text-xs text-(--vv-muted)">会話</p>
        </div>

        <div className="flex items-center gap-6 border-b border-(--vv-border) text-sm font-semibold vv-rise-in vv-delay-1">
          <Link
            href="/vocab"
            className="pb-3 text-(--vv-muted) transition hover:text-(--vv-accent-strong)"
          >
            語彙
          </Link>
          <span className="relative pb-3 text-(--vv-accent-strong)">
            聞き取り
            <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-(--vv-accent-strong)" />
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3 vv-rise-in vv-delay-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-(--vv-muted) ring-1 ring-(--vv-border)"
          >
            日本語
            <ChevronDownIcon className="h-4 w-4" />
          </button>

          {speeds.map((item) => {
            const isActive = item === speed;
            return (
              <button
                key={item}
                type="button"
                onClick={() => setSpeed(item)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                  isActive
                    ? "bg-(--vv-accent-strong) text-white"
                    : "bg-white text-(--vv-muted) ring-1 ring-(--vv-border)"
                }`}
              >
                {item}
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => setIsSettingsOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white ring-1 ring-(--vv-border)"
            aria-label="Settings"
          >
            <SettingsIcon className="h-5 w-5 text-(--vv-muted)" />
          </button>
        </div>

        <div className="rounded-3xl bg-[#cfeee3] p-4 shadow-[0_12px_24px_rgba(35,70,60,0.12)] vv-rise-in vv-delay-3">
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-(--vv-accent-strong) text-white"
              aria-label="Play"
            >
              <PlayIcon className="h-5 w-5" />
            </button>
            <div className="flex-1">
              <div className="h-2 w-full rounded-full bg-white/70">
                <div className="h-full w-[25%] rounded-full bg-(--vv-accent-strong)" />
              </div>
            </div>
            <span className="text-xs font-semibold text-(--vv-accent-strong)">
              0:13 / 1:08
            </span>
          </div>
        </div>

        <div className="rounded-3xl bg-white/90 p-4 shadow-[0_12px_24px_rgba(31,43,39,0.08)] ring-1 ring-(--vv-ring)">
          <p className="text-sm font-semibold text-foreground">
            {currentLine.vi}
          </p>
          <p className="mt-2 text-xs text-(--vv-muted)">{currentLine.ja}</p>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={goPrev}
            disabled={currentIndex === 0}
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-(--vv-muted) ring-1 ring-(--vv-border) disabled:opacity-50"
          >
            <ChevronLeftIcon className="h-4 w-4" />
            前の文
          </button>
          <span className="text-xs font-semibold text-(--vv-muted)">
            {currentIndex + 1} / {conversationLines.length}
          </span>
          <button
            type="button"
            onClick={goNext}
            disabled={currentIndex === conversationLines.length - 1}
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-(--vv-muted) ring-1 ring-(--vv-border) disabled:opacity-50"
          >
            次の文
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {conversationLines.map((line, index) => {
            const isActive = index === currentIndex;
            return (
              <button
                key={line.id}
                type="button"
                onClick={() => setCurrentIndex(index)}
                className={`flex w-full items-start gap-3 rounded-2xl px-3 py-3 text-left transition ${
                  isActive
                    ? "bg-[#cfeee3]"
                    : "bg-white/80 ring-1 ring-(--vv-border)"
                }`}
              >
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    isActive
                      ? "bg-(--vv-accent-strong) text-white"
                      : "bg-(--vv-border) text-(--vv-muted)"
                  }`}
                >
                  <PlayIcon className="h-4 w-4" />
                </span>
                <span className="flex-1">
                  <p className="text-sm font-semibold text-foreground">
                    {line.vi}
                  </p>
                  <p className="mt-1 text-xs text-(--vv-muted)">{line.ja}</p>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SettingsIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="3.5" />
      <path d="M19.4 15a1.8 1.8 0 0 0 .35 2l.04.05a2 2 0 1 1-2.83 2.83l-.05-.04a1.8 1.8 0 0 0-2-.35 1.8 1.8 0 0 0-1 1.6V21a2 2 0 1 1-4 0v-.07a1.8 1.8 0 0 0-1-1.6 1.8 1.8 0 0 0-2 .35l-.05.04a2 2 0 1 1-2.83-2.83l.04-.05a1.8 1.8 0 0 0 .35-2 1.8 1.8 0 0 0-1.6-1H3a2 2 0 1 1 0-4h.07a1.8 1.8 0 0 0 1.6-1 1.8 1.8 0 0 0-.35-2l-.04-.05A2 2 0 1 1 7.11 3.1l.05.04a1.8 1.8 0 0 0 2 .35 1.8 1.8 0 0 0 1-1.6V2a2 2 0 1 1 4 0v.07a1.8 1.8 0 0 0 1 1.6 1.8 1.8 0 0 0 2-.35l.05-.04a2 2 0 1 1 2.83 2.83l-.04.05a1.8 1.8 0 0 0-.35 2 1.8 1.8 0 0 0 1.6 1H21a2 2 0 1 1 0 4h-.07a1.8 1.8 0 0 0-1.53 1z" />
    </svg>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M8 5.5v13l10-6.5-10-6.5z" />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
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
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function ChevronLeftIcon({ className }: { className?: string }) {
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
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
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
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}
