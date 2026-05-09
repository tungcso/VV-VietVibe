"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type ToggleField = "vocab" | "listen";

type Task = {
  id: string;
  title: string;
  vocab: boolean;
  listen: boolean;
};

type IconName =
  | "cart"
  | "restaurant"
  | "hospital"
  | "bus"
  | "salon"
  | "bank"
  | "taxi";

type Section = {
  id: string;
  label: string;
  icon: IconName;
  tasks: Task[];
};

const initialSections: Section[] = [
  {
    id: "super",
    label: "スーパー",
    icon: "cart",
    tasks: [
      {
        id: "ask-price",
        title: "商品の値段を聞く",
        vocab: true,
        listen: false,
      },
      {
        id: "pay-register",
        title: "レジで支払う",
        vocab: true,
        listen: true,
      },
      {
        id: "find-item",
        title: "商品を探す",
        vocab: false,
        listen: false,
      },
    ],
  },
  {
    id: "restaurant",
    label: "レストラン",
    icon: "restaurant",
    tasks: [
      {
        id: "order-dish",
        title: "料理を注文する",
        vocab: false,
        listen: true,
      },
      {
        id: "ask-bill",
        title: "会計をお願いする",
        vocab: true,
        listen: false,
      },
    ],
  },
  {
    id: "hospital",
    label: "病院",
    icon: "hospital",
    tasks: [
      {
        id: "describe-symptoms",
        title: "症状を説明する",
        vocab: true,
        listen: false,
      },
      {
        id: "fill-form",
        title: "問診票を書く",
        vocab: false,
        listen: false,
      },
    ],
  },
  {
    id: "bus-terminal",
    label: "バスターミナル",
    icon: "bus",
    tasks: [
      {
        id: "buy-ticket",
        title: "チケットを買う",
        vocab: false,
        listen: true,
      },
    ],
  },
  {
    id: "salon",
    label: "美容室",
    icon: "salon",
    tasks: [
      {
        id: "book-appointment",
        title: "予約を入れる",
        vocab: false,
        listen: false,
      },
    ],
  },
  {
    id: "bank",
    label: "銀行",
    icon: "bank",
    tasks: [
      {
        id: "open-account",
        title: "口座を作る",
        vocab: false,
        listen: false,
      },
    ],
  },
  {
    id: "taxi",
    label: "タクシー",
    icon: "taxi",
    tasks: [],
  },
];

export default function HomeScreen() {
  const [sections, setSections] = useState<Section[]>(initialSections);
  const [openId, setOpenId] = useState<string>(initialSections[0]?.id ?? "");
  const [query, setQuery] = useState<string>("");

  const { total, done } = useMemo(() => {
    let totalCount = 0;
    let doneCount = 0;

    sections.forEach((section) => {
      section.tasks.forEach((task) => {
        totalCount += 2;
        if (task.vocab) doneCount += 1;
        if (task.listen) doneCount += 1;
      });
    });

    return { total: totalCount, done: doneCount };
  }, [sections]);

  const progress = total === 0 ? 0 : Math.round((done / total) * 100);

  const filteredSections = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return sections;

    return sections
      .map((section) => {
        const matchesSection = section.label.toLowerCase().includes(normalized);
        const tasks = section.tasks.filter((task) =>
          task.title.toLowerCase().includes(normalized),
        );
        return matchesSection ? section : { ...section, tasks };
      })
      .filter(
        (section) =>
          section.label.toLowerCase().includes(normalized) ||
          section.tasks.length > 0,
      );
  }, [query, sections]);

  const toggleTask = (
    sectionId: string,
    taskId: string,
    field: ToggleField,
  ) => {
    setSections((prev) =>
      prev.map((section) => {
        if (section.id !== sectionId) return section;
        return {
          ...section,
          tasks: section.tasks.map((task) =>
            task.id === taskId ? { ...task, [field]: !task[field] } : task,
          ),
        };
      }),
    );
  };

  return (
    <div className="min-h-screen w-full bg-linear-to-b from-[#f8f6f2] via-[#f3f7f3] to-[#ecf2ee]">
      <div className="mx-auto flex w-full max-w-105 flex-col gap-6 px-4 pb-10 pt-8">
        <header className="flex items-center justify-between vv-rise-in">
          <div className="flex items-center gap-3">
            <div className="vv-display flex h-12 w-12 items-center justify-center rounded-2xl bg-(--vv-accent) text-lg text-white shadow-[0_12px_20px_rgba(35,70,60,0.25)]">
              VV
            </div>
            <div>
              <p className="text-base font-semibold tracking-tight">VietVibe</p>
              <p className="text-xs text-(--vv-muted)">場所を選んで始める</p>
            </div>
          </div>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-sm font-semibold text-(--vv-accent-strong) shadow-sm ring-1 ring-(--vv-ring)"
          >
            TH
          </button>
        </header>

        <div className="relative vv-rise-in vv-delay-1">
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-(--vv-muted)" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="場所や状況を検索..."
            className="h-12 w-full rounded-2xl border border-transparent bg-white/90 pl-12 pr-4 text-sm text-foreground shadow-sm ring-1 ring-(--vv-ring) transition focus:border-(--vv-accent) focus:outline-none"
          />
        </div>

        <section className="rounded-3xl bg-white/90 p-4 shadow-[0_18px_32px_rgba(31,43,39,0.08)] ring-1 ring-(--vv-ring) vv-rise-in vv-delay-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-(--vv-muted)">
              全体の進捗
            </p>
            <p className="text-sm font-semibold text-(--vv-accent-strong)">
              {progress}%
            </p>
          </div>
          <div className="mt-3 h-2 w-full rounded-full bg-(--vv-border)">
            <div
              className="h-full rounded-full bg-(--vv-accent) transition-[width] duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/vocab"
              className="rounded-full bg-(--vv-accent-soft) px-4 py-2 text-xs font-semibold text-(--vv-accent-strong)"
            >
              今日の語彙カード
            </Link>
            <Link
              href="/login"
              className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-(--vv-muted) ring-1 ring-(--vv-border)"
            >
              ログインする
            </Link>
          </div>
        </section>

        <section className="rounded-3xl bg-white/90 p-4 shadow-[0_18px_32px_rgba(31,43,39,0.08)] ring-1 ring-(--vv-ring) vv-rise-in vv-delay-3">
          <div className="flex items-center justify-between pb-2">
            <p className="text-sm font-semibold text-(--vv-muted)">
              シーンを選択
            </p>
            <span className="text-xs text-(--vv-muted)">
              {filteredSections.length} 件
            </span>
          </div>

          <div className="mt-2 flex flex-col gap-3">
            {filteredSections.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-(--vv-border) p-4 text-center text-xs text-(--vv-muted)">
                該当するシーンが見つかりません。
              </div>
            ) : (
              filteredSections.map((section) => {
                const isOpen =
                  openId === section.id ||
                  (query.trim().length > 0 && section.tasks.length > 0);

                return (
                  <div
                    key={section.id}
                    className="rounded-2xl border border-(--vv-border) bg-white/80"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenId((prev) =>
                          prev === section.id ? "" : section.id,
                        )
                      }
                      className="flex w-full items-center justify-between gap-3 px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-(--vv-accent-soft) text-(--vv-accent-strong)">
                          <Icon name={section.icon} className="h-5 w-5" />
                        </span>
                        <div className="text-left">
                          <p className="text-sm font-semibold">
                            {section.label}
                          </p>
                          <p className="text-xs text-(--vv-muted)">
                            {section.tasks.length > 0
                              ? `${section.tasks.length} レッスン`
                              : "準備中"}
                          </p>
                        </div>
                      </div>
                      <ChevronIcon
                        className={`h-4 w-4 text-(--vv-muted) transition-transform ${
                          isOpen ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </button>

                    {isOpen ? (
                      <div className="border-t border-(--vv-border) px-4 py-3">
                        {section.tasks.length === 0 ? (
                          <p className="text-xs text-(--vv-muted)">
                            まもなく追加されます。
                          </p>
                        ) : (
                          <div className="flex flex-col gap-3">
                            {section.tasks.map((task) => (
                              <div
                                key={task.id}
                                className="flex items-center justify-between gap-3"
                              >
                                <p className="text-sm font-medium text-foreground">
                                  {task.title}
                                </p>
                                <div className="flex items-center gap-2">
                                  <ToggleButton
                                    label="語彙"
                                    active={task.vocab}
                                    onClick={() =>
                                      toggleTask(section.id, task.id, "vocab")
                                    }
                                  />
                                  <ToggleButton
                                    label="聞く"
                                    active={task.listen}
                                    onClick={() =>
                                      toggleTask(section.id, task.id, "listen")
                                    }
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : null}
                  </div>
                );
              })
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

function ToggleButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full px-3 py-1 text-[11px] font-semibold transition ${
        active
          ? "bg-(--vv-accent-soft) text-(--vv-accent-strong)"
          : "bg-white text-(--vv-muted) ring-1 ring-(--vv-border)"
      }`}
    >
      {label}
    </button>
  );
}

function SearchIcon({ className }: { className?: string }) {
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
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  );
}

function ChevronIcon({ className }: { className?: string }) {
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

function Icon({ name, className }: { name: IconName; className?: string }) {
  switch (name) {
    case "cart":
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
          <path d="M6 6h15l-1.5 8.5a2 2 0 0 1-2 1.5H9.5" />
          <path d="M6 6l-2-2" />
          <circle cx="9" cy="20" r="1.5" />
          <circle cx="18" cy="20" r="1.5" />
        </svg>
      );
    case "restaurant":
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
          <path d="M8 3v9" />
          <path d="M12 3v9" />
          <path d="M6 6h8" />
          <path d="M18 3v18" />
          <path d="M16 7h4" />
        </svg>
      );
    case "hospital":
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
          <path d="M4 21V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14" />
          <path d="M9 21v-6h6v6" />
          <path d="M12 9v4" />
          <path d="M10 11h4" />
        </svg>
      );
    case "bus":
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
          <path d="M5 16V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10" />
          <path d="M5 16h14" />
          <path d="M7 16v3" />
          <path d="M17 16v3" />
          <path d="M7 8h10" />
        </svg>
      );
    case "salon":
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
          <circle cx="6" cy="6" r="2" />
          <circle cx="18" cy="6" r="2" />
          <path d="M8 8l8 8" />
          <path d="M4 20l6-6" />
          <path d="M20 20l-6-6" />
        </svg>
      );
    case "bank":
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
          <path d="M3 10h18" />
          <path d="M5 10v8" />
          <path d="M9 10v8" />
          <path d="M15 10v8" />
          <path d="M19 10v8" />
          <path d="M4 18h16" />
          <path d="M12 3l9 7H3z" />
        </svg>
      );
    case "taxi":
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
          <path d="M5 16l1-5h12l1 5" />
          <path d="M4 16h16" />
          <path d="M6 11l2-4h8l2 4" />
          <circle cx="7.5" cy="18" r="1.5" />
          <circle cx="16.5" cy="18" r="1.5" />
        </svg>
      );
    default:
      return null;
  }
}
