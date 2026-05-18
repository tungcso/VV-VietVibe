"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import AdminSidebar from "./admin-sidebar";

type AudioCategory = "Trong nhà" | "Ngoài trời" | "Phương tiện";

type AudioItem = {
  id: string;
  title: string;
  filename: string;
  duration: string;
  size: string;
  date: string;
  category: AudioCategory;
};

const audioItems: AudioItem[] = [
  {
    id: "cafe",
    title: "Quán cafe",
    filename: "cafe-noise.mp3",
    duration: "2:30",
    size: "3.2 MB",
    date: "12/04/2026",
    category: "Trong nhà",
  },
  {
    id: "street",
    title: "Đường phố",
    filename: "street.mp3",
    duration: "3:08",
    size: "4.1 MB",
    date: "12/04/2026",
    category: "Ngoài trời",
  },
  {
    id: "market",
    title: "Chợ / Siêu thị",
    filename: "market.mp3",
    duration: "2:08",
    size: "2.8 MB",
    date: "11/04/2026",
    category: "Trong nhà",
  },
  {
    id: "office",
    title: "Văn phòng",
    filename: "office.mp3",
    duration: "2:45",
    size: "3.5 MB",
    date: "11/04/2026",
    category: "Trong nhà",
  },
  {
    id: "bus",
    title: "Xe buýt",
    filename: "bus.mp3",
    duration: "1:58",
    size: "2.3 MB",
    date: "10/04/2026",
    category: "Phương tiện",
  },
];

const filters = ["Tất cả", "Trong nhà", "Ngoài trời", "Phương tiện"] as const;

type FilterValue = (typeof filters)[number];

export default function AdminAudioScreen() {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("Tất cả");

  const filteredItems = useMemo(() => {
    if (activeFilter === "Tất cả") return audioItems;
    return audioItems.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  return (
    <div className="min-h-screen w-full text-[#1f2b27]">
      <div className="relative min-h-screen w-full">
        <AdminSidebar active="audio" />

        <main className="ml-56 min-h-screen w-[calc(100%-14rem)] bg-[#F2F4F2]">
          <div className="min-h-[120vh] bg-[#F2F4F2] pl-8 pb-16 ">
            <header className="p-8 border-b border-white/90 bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-semibold">Kho tạp âm</h1>
                  <p className="my-2 text-xs text-[#9aa8a2]">
                    5 file âm thanh môi trường
                  </p>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full bg-[#2f5d50] px-4 py-3 text-xs font-semibold text-white"
                >
                  <PlusIcon className="h-3.5 w-3.5" />
                  Thêm tạp âm
                </button>
              </div>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex flex-1 items-center gap-2 rounded-[14px] border border-[#e6ece6] bg-(--vv-search) px-4 py-2 text-xs text-[#9aa8a2]">
                  <SearchIcon className="h-4 w-4" />
                  <span>Tìm kiếm theo tên hoặc file...</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  {filters.map((filter) => (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setActiveFilter(filter)}
                      className={`rounded-full px-3 py-2 font-semibold transition ${
                        activeFilter === filter
                          ? "bg-[#2f5d50] text-white"
                          : "bg-[#f2f5f2] text-[#7b8b83]"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
            </header>

            <div className=" grid grid-cols-3 gap-5 pt-6 px-8">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-[#eef2ee] bg-white p-4 shadow-[0_10px_20px_rgba(31,43,39,0.06)]"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold">{item.title}</p>
                      <p className="text-[11px] text-[#9aa8a2]">
                        {item.filename}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <IconButton ariaLabel="Edit">
                        <EditIcon className="h-4 w-4" />
                      </IconButton>
                      <IconButton ariaLabel="Delete">
                        <TrashIcon className="h-4 w-4 text-[#d46b6b]" />
                      </IconButton>
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl bg-[#f6f8f6] p-3">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2f5d50] text-white"
                      >
                        <PlayIcon className="h-3.5 w-3.5" />
                      </button>
                      <div className="flex-1">
                        <div className="h-1.5 w-full rounded-full bg-[#dce4de]">
                          <div className="h-full w-[55%] rounded-full bg-[#2f5d50]" />
                        </div>
                      </div>
                      <span className="text-[11px] text-[#7b8b83]">
                        {item.duration}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span className={getCategoryClass(item.category)}>
                      {item.category}
                    </span>
                    <div className="text-right text-[11px] text-[#9aa8a2]">
                      <p className="text-black">{item.size}</p>
                      <p>{item.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function getCategoryClass(category: AudioCategory) {
  switch (category) {
    case "Trong nhà":
      return "rounded-full bg-[#d8eee2] px-3 py-1 text-[11px] font-semibold text-[#2f5d50]";
    case "Ngoài trời":
      return "rounded-full bg-[#eaf2fb] px-3 py-1 text-[11px] font-semibold text-[#4c6fa3]";
    case "Phương tiện":
      return "rounded-full bg-[#fff2d9] px-3 py-1 text-[11px] font-semibold text-[#c47b1f]";
    default:
      return "rounded-full bg-[#eef2ee] px-3 py-1 text-[11px] font-semibold text-[#7b8b83]";
  }
}

function IconButton({
  children,
  ariaLabel,
}: {
  children: ReactNode;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      className="flex h-7 w-7 items-center justify-center rounded-full border border-[#eef2ee] text-[#9aa8a2]"
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

function PlusIcon({ className }: { className?: string }) {
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
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
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

function EditIcon({ className }: { className?: string }) {
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
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}

function TrashIcon({ className }: { className?: string }) {
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
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
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
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
