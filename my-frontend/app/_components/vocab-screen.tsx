"use client";

import Link from "next/link";
import { useState } from "react";

type StudyMode = "vocab" | "listening";

type VocabCard = {
  id: string;
  term: string;
  reading: string;
  meaning: string;
  example: string;
  note: string;
};

const cards: VocabCard[] = [
  {
    id: "chemgio",
    term: "chém gió",
    reading: "tu vung",
    meaning: "大げさに話す・ほら吹き",
    example: "彼はいつも大げさに話すから、あまり信じないほうがいい。",
    note: "友達同士の会話で使うカジュアルな表現。",
  },
  {
    id: "dithoi",
    term: "đi thôi",
    reading: "tu vung",
    meaning: "行こう・出発しよう",
    example: "もう遅いね、行こう。",
    note: "親しい相手に使う柔らかい誘い方。",
  },
  {
    id: "ngon",
    term: "ngon",
    reading: "tu vung",
    meaning: "おいしい・素晴らしい",
    example: "このフォーは本当においしい！",
    note: "食べ物にも会話にも使える万能表現。",
  },
];

export default function VocabScreen() {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [mode, setMode] = useState<StudyMode>("vocab");

  const card = cards[index];

  const goNext = () => {
    setIndex((prev) => Math.min(prev + 1, cards.length - 1));
    setFlipped(false);
  };

  const goPrev = () => {
    setIndex((prev) => Math.max(prev - 1, 0));
    setFlipped(false);
  };

  return (
    <div className="min-h-screen w-full bg-linear-to-b from-[#f8f6f2] via-[#f3f7f3] to-[#ecf2ee]">
      <div className="mx-auto flex w-full max-w-105 flex-col gap-6 px-4 pb-10 pt-8">
        <header className="flex items-center justify-between vv-rise-in">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold text-(--vv-accent-strong)"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 ring-1 ring-(--vv-ring)">
              <ArrowLeftIcon className="h-4 w-4" />
            </span>
            ホーム
          </Link>
          <div className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-(--vv-muted) ring-1 ring-(--vv-ring)">
            カード {index + 1} / {cards.length}
          </div>
        </header>

        <section className="rounded-3xl bg-white/90 p-4 shadow-[0_18px_32px_rgba(31,43,39,0.08)] ring-1 ring-(--vv-ring) vv-rise-in vv-delay-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-(--vv-muted)">
                スーパー | レジで支払う
              </p>
              <h1 className="mt-1 text-xl font-semibold">語彙</h1>
              <p className="mt-1 text-xs text-(--vv-muted)">
                慣用表現、スラング、丁寧な言い回し
              </p>
            </div>
            <div className="flex rounded-full bg-(--vv-border) p-1 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setMode("vocab")}
                className={`rounded-full px-3 py-1 transition ${
                  mode === "vocab"
                    ? "bg-white text-(--vv-accent-strong)"
                    : "text-(--vv-muted)"
                }`}
              >
                語彙
              </button>
              <button
                type="button"
                onClick={() => setMode("listening")}
                className={`rounded-full px-3 py-1 transition ${
                  mode === "listening"
                    ? "bg-white text-(--vv-accent-strong)"
                    : "text-(--vv-muted)"
                }`}
              >
                聞き取り
              </button>
            </div>
          </div>
          <div
            className="mt-6 vv-flip"
            data-flipped={flipped}
            onClick={() => setFlipped((prev) => !prev)}
          >
            <div className="relative vv-flip-inner">
              <div className="vv-flip-side w-full rounded-3xl border border-(--vv-border) bg-white px-6 py-10 text-center shadow-[0_14px_30px_rgba(35,70,60,0.12)]">
                <span className="inline-flex items-center rounded-full bg-(--vv-accent) px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
                  {mode === "vocab" ? "từ vựng" : "nghe"}
                </span>

                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground">
                  {card.term}
                </h2>

                <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-(--vv-muted)">
                  {card.reading}
                </p>

                <p className="mt-3 text-xs text-(--vv-muted)">{card.example}</p>

                <p className="mt-6 text-xs font-semibold text-(--vv-muted)">
                  カードをタップして裏返す
                </p>
              </div>
              {/* Back side */}
              <div className="absolute inset-0 h-full w-full vv-flip-side vv-flip-back rounded-3xl border border-(--vv-border) bg-white px-6 py-8 text-left shadow-[0_14px_30px_rgba(35,70,60,0.12)]">
                <p className="text-sm font-semibold text-(--vv-accent-strong)">
                  {card.meaning}
                </p>

                <p className="mt-4 text-sm text-foreground">{card.note}</p>

                <div className="mt-5 rounded-2xl bg-(--vv-accent-soft) p-3 text-xs text-(--vv-accent-strong)">
                  例：{card.example}
                </div>

                <p className="mt-6 text-xs font-semibold text-(--vv-muted)">
                  タップして表に戻す
                </p>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <button
              type="button"
              onClick={goPrev}
              disabled={index === 0}
              className="rounded-full bg-white px-5 py-2 text-xs font-semibold text-(--vv-muted) ring-1 ring-(--vv-border) transition disabled:opacity-50"
            >
              前へ
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={index === cards.length - 1}
              className="rounded-full bg-(--vv-accent) px-5 py-2 text-xs font-semibold text-white shadow-[0_8px_20px_rgba(35,70,60,0.28)] transition disabled:opacity-50"
            >
              次へ
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

function ArrowLeftIcon({ className }: { className?: string }) {
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
