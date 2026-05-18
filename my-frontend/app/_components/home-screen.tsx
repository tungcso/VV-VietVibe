"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, useEffect, useRef } from "react";
import type { ReactNode } from "react";

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

type TaskProgress = Record<
  string,
  Record<string, { vocab?: boolean; listen?: boolean }>
>;

const PROGRESS_STORAGE_KEY = "vv-task-progress";
const LAST_SELECTION_STORAGE_KEY = "vv-last-selection";

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
  const router = useRouter();
  const [sections, setSections] = useState<Section[]>(initialSections);
  const [openIds, setOpenIds] = useState<string[]>(
    initialSections[0]?.id ? [initialSections[0].id] : [],
  );
  const [query, setQuery] = useState<string>("");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMode, setNotificationMode] = useState<
    "login" | "register"
  >("login");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const hasSuccess = localStorage.getItem("showLoginSuccess");
    const mode =
      (localStorage.getItem("loginSuccessMode") as "login" | "register") ||
      "login";

    if (!hasSuccess) return;

    const timer = window.setTimeout(() => {
      setShowNotification(true);
      setNotificationMode(mode);
    }, 0);

    localStorage.removeItem("showLoginSuccess");
    localStorage.removeItem("loginSuccessMode");

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const readProgress = () => {
      try {
        const stored = localStorage.getItem(PROGRESS_STORAGE_KEY);
        return stored ? (JSON.parse(stored) as TaskProgress) : {};
      } catch {
        return {};
      }
    };

    const applyProgress = (progress: TaskProgress) => {
      setSections((prev) =>
        prev.map((section) => {
          const sectionProgress = progress[section.id] ?? {};
          return {
            ...section,
            tasks: section.tasks.map((task) => {
              const taskProgress = sectionProgress[task.id] ?? {};
              return {
                ...task,
                vocab: taskProgress.vocab ?? task.vocab,
                listen: taskProgress.listen ?? task.listen,
              };
            }),
          };
        }),
      );
    };

    const syncProgress = () => {
      const progress = readProgress();
      applyProgress(progress);
    };

    syncProgress();

    const handleVisibility = () => {
      if (!document.hidden) syncProgress();
    };

    window.addEventListener("focus", syncProgress);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.removeEventListener("focus", syncProgress);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  useEffect(() => {
    if (!isProfileOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (!profileRef.current) return;
      if (!profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isProfileOpen]);

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

  const normalizedQuery = query.trim().toLowerCase();

  const filteredSections = useMemo(() => {
    if (!normalizedQuery) return sections;

    return sections
      .map((section) => {
        const matchesSection = section.label
          .toLowerCase()
          .includes(normalizedQuery);
        const tasks = section.tasks.filter((task) =>
          task.title.toLowerCase().includes(normalizedQuery),
        );
        return matchesSection ? section : { ...section, tasks };
      })
      .filter(
        (section) =>
          section.label.toLowerCase().includes(normalizedQuery) ||
          section.tasks.length > 0,
      );
  }, [normalizedQuery, sections]);

  const handleTaskLaunch = (
    sectionId: string,
    taskId: string,
    field: ToggleField,
  ) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        LAST_SELECTION_STORAGE_KEY,
        JSON.stringify({ sectionId, taskId, mode: field }),
      );
    }

    router.push(field === "vocab" ? "/vocab" : "/listening");
  };

  const highlightText = (text: string) => {
    if (!normalizedQuery) return text;

    const lower = text.toLowerCase();
    const queryText = normalizedQuery;
    const parts: Array<string | ReactNode> = [];
    let startIndex = 0;

    while (startIndex < text.length) {
      const matchIndex = lower.indexOf(queryText, startIndex);
      if (matchIndex === -1) {
        parts.push(text.slice(startIndex));
        break;
      }

      if (matchIndex > startIndex) {
        parts.push(text.slice(startIndex, matchIndex));
      }

      parts.push(
        <mark key={`${text}-${matchIndex}`} className="vv-highlight">
          {text.slice(matchIndex, matchIndex + queryText.length)}
        </mark>,
      );

      startIndex = matchIndex + queryText.length;
    }

    return parts;
  };

  return (
    <div className="min-h-screen w-full bg-linear-to-b from-[#f8f6f2] via-[#f3f7f3] to-[#ecf2ee]">
      {showNotification && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm rounded-2xl bg-white shadow-lg p-4 flex items-center gap-3 mx-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white shrink-0">
            ✓
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm text-green-700">
              {notificationMode === "login"
                ? "ログインが完了しました！"
                : "登録が完了しました！"}
            </p>
            <p className="text-xs text-green-600">VietVibeへようこそ</p>
          </div>
          <button
            onClick={() => setShowNotification(false)}
            className="text-gray-400 hover:text-gray-600 shrink-0 text-lg leading-none"
          >
            ×
          </button>
        </div>
      )}

      <div className="mx-auto flex w-full max-w-105 flex-col gap-6 px-4 pb-10 pt-8">
        <header className="relative z-20 flex items-center justify-between vv-rise-in">
          <div className="flex items-center gap-3">
            <div className="vv-logo flex h-12 w-12 items-center justify-center rounded-2xl bg-(--vv-accent) text-lg text-white shadow-[0_12px_20px_rgba(35,70,60,0.25)]">
              VV
            </div>
            <div>
              <p className="text-base font-semibold tracking-tight">VietVibe</p>
              <p className="text-xs text-(--vv-muted)">場所を選んで始める</p>
            </div>
          </div>
          <div className="relative" ref={profileRef}>
            <button
              type="button"
              onClick={() => setIsProfileOpen((prev) => !prev)}
              aria-expanded={isProfileOpen}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-(--vv-accent) text-sm font-semibold text-white shadow-sm ring-1 ring-(--vv-ring)"
            >
              TH
            </button>
            {isProfileOpen ? (
              <div className="absolute right-0 z-30 mt-2 w-40 rounded-2xl bg-white p-2 shadow-[0_14px_30px_rgba(0,0,0,0.12)] ring-1 ring-(--vv-ring)">
                <button
                  type="button"
                  className="w-full rounded-xl px-3 py-2 text-left text-xs font-semibold text-(--vv-muted) transition hover:bg-(--vv-border)"
                >
                  プロフィール
                </button>
                <button
                  type="button"
                  onClick={() => router.push("/login")}
                  className="mt-1 w-full rounded-xl px-3 py-2 text-left text-xs font-semibold text-red-600 transition hover:bg-red-50"
                >
                  ログアウト
                </button>
              </div>
            ) : null}
          </div>
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
          <div className="mt-2 flex flex-col gap-3">
            {filteredSections.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-(--vv-border) p-4 text-center text-xs text-(--vv-muted)">
                該当するシーンが見つかりません。
              </div>
            ) : (
              filteredSections.map((section) => {
                const isOpen =
                  openIds.includes(section.id) ||
                  (query.trim().length > 0 && section.tasks.length > 0);

                return (
                  <div
                    key={section.id}
                    className="rounded-2xl border border-(--vv-border) bg-white/80"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenIds((prev) =>
                          prev.includes(section.id)
                            ? prev.filter((id) => id !== section.id)
                            : [...prev, section.id],
                        )
                      }
                      className="flex w-full items-center justify-between gap-3 px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center text-(--vv-accent-strong)">
                          <Icon name={section.icon} className="h-5 w-5" />
                        </span>
                        <div className="text-left">
                          <p className="text-sm font-semibold">
                            {highlightText(section.label)}
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
                                  {highlightText(task.title)}
                                </p>
                                <div className="flex items-center gap-2">
                                  <ToggleButton
                                    label="語彙"
                                    active={task.vocab}
                                    onClick={() =>
                                      handleTaskLaunch(
                                        section.id,
                                        task.id,
                                        "vocab",
                                      )
                                    }
                                  />
                                  <ToggleButton
                                    label="聞く"
                                    active={task.listen}
                                    onClick={() =>
                                      handleTaskLaunch(
                                        section.id,
                                        task.id,
                                        "listen",
                                      )
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
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold transition ${
        active
          ? "bg-(--vv-accent-soft) text-(--vv-accent-strong)"
          : "bg-white text-(--vv-muted) ring-1 ring-(--vv-border)"
      }`}
    >
      {label}
      {active ? <span aria-hidden="true">✓</span> : null}
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
          <circle cx="8" cy="21" r="1" />
          <circle cx="19" cy="21" r="1" />
          <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
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
          <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
          <path d="M7 2v20" />
          <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
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
          <path d="M3 21h18" />
          <path d="M7 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16" />
          <path d="M3 21v-9a2 2 0 0 1 2-2h2" />
          <path d="M17 10h2a2 2 0 0 1 2 2v9" />
          <path d="M12 7v4" />
          <path d="M10 9h4" />
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
          <path d="M5 17H4v-9c0-1.1.9-2 2-2h12c1.6 0 3 1.2 3.4 2.7l.6 2.3v4c0 1.1-.9 2-2 2h-1" />
          <circle cx="17" cy="17" r="2" />
          <path d="M9 17h6" />
          <circle cx="7" cy="17" r="2" />
          <path d="M4 11h18" />
          <path d="M10 6v5" />
          <path d="M15 6v5" />
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
          <circle cx="6" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <line x1="20" y1="4" x2="8.12" y2="15.88" />
          <line x1="14.47" y1="14.48" x2="20" y2="20" />
          <line x1="8.12" y1="8.12" x2="12" y2="12" />
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
          <path d="M4 9h16l-8-6-8 6Z" />
          <path d="M6 12v6" />
          <path d="M10 12v6" />
          <path d="M14 12v6" />
          <path d="M18 12v6" />
          <path d="M3 21h18" />
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
          <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
          <circle cx="7" cy="17" r="2" />
          <path d="M9 17h6" />
          <circle cx="17" cy="17" r="2" />
        </svg>
      );
    default:
      return null;
  }
}
