"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import AdminSidebar from "./admin-sidebar";

type Status = "published" | "edited" | "draft";

type Unit = {
  id: string;
  title: string;
  status: Status;
  vocabCount: number;
  listeningCount: number;
  duration: string;
};

type Location = {
  id: string;
  label: string;
  icon: IconName;
  status: Status;
  units: Unit[];
};

type IconName = "cart" | "restaurant" | "hospital" | "bus" | "salon" | "bank";

type SelectedUnit = {
  locationId: string;
  unitId: string;
} | null;

const locations: Location[] = [
  {
    id: "super",
    label: "スーパー",
    icon: "cart",
    status: "published",
    units: [
      {
        id: "register",
        title: "レジで支払う",
        status: "draft",
        vocabCount: 3,
        listeningCount: 8,
        duration: "1:08",
      },
      {
        id: "ask-price",
        title: "商品の値段を聞く",
        status: "edited",
        vocabCount: 5,
        listeningCount: 10,
        duration: "1:32",
      },
      {
        id: "find-item",
        title: "商品を探す",
        status: "published",
        vocabCount: 4,
        listeningCount: 6,
        duration: "0:58",
      },
    ],
  },
  {
    id: "restaurant",
    label: "レストラン",
    icon: "restaurant",
    status: "draft",
    units: [],
  },
  {
    id: "hospital",
    label: "病院",
    icon: "hospital",
    status: "published",
    units: [],
  },
  {
    id: "salon",
    label: "美容室",
    icon: "salon",
    status: "edited",
    units: [],
  },
];

const vocabRows = [
  {
    index: "1",
    term: "chém gió",
    type: "từ lóng",
    meaning: "大げさに話す・ほら吹き",
    example: "“Anh ấy hay chém gió lắm.”",
  },
  {
    index: "2",
    term: "một mũi tên trúng hai đích",
    type: "thành ngữ",
    meaning: "一石二鳥",
    example: "“Đi học vừa học được kiến thức vừa gặp bạn bè.”",
  },
  {
    index: "3",
    term: "thanh toán không tiếp xúc",
    type: "từ chuyên ngành",
    meaning: "非接触決済",
    example: "“Bạn có thể thanh toán không tiếp xúc bằng thẻ này.”",
  },
];

const listeningRows = [
  {
    index: "1",
    vi: "Xin chào, tôi cần thanh toán.",
    jp: "すみません、会計をお願いします。",
    timestamp: "0:00",
  },
  {
    index: "2",
    vi: "Tôi muốn trả bằng tiền mặt.",
    jp: "現金で支払いたいです。",
    timestamp: "0:08",
  },
  {
    index: "3",
    vi: "Bạn có thể xuất hóa đơn không?",
    jp: "領収書を発行してもらえますか？",
    timestamp: "0:15",
  },
  {
    index: "4",
    vi: "Bạn nhận thẻ tín dụng không?",
    jp: "クレジットカードは使えますか？",
    timestamp: "0:22",
  },
];

export default function AdminContentScreen() {
  const [isSidebarOpen] = useState(true);
  const [isContentSidebarOpen, setIsContentSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<"vocab" | "listening">("vocab");
  const [expandedIds, setExpandedIds] = useState<string[]>(["super"]);
  const [selectedUnit, setSelectedUnit] = useState<SelectedUnit>(null);

  const activeLocation = useMemo(() => {
    if (!selectedUnit) return null;
    return locations.find(
      (location) => location.id === selectedUnit.locationId,
    );
  }, [selectedUnit]);

  const activeUnit = useMemo(() => {
    if (!selectedUnit || !activeLocation) return null;
    return activeLocation.units.find((unit) => unit.id === selectedUnit.unitId);
  }, [selectedUnit, activeLocation]);

  return (
    <div className="min-h-screen w-full text-[#1f2b27]">
      <div className="relative min-h-screen w-full">
        {isSidebarOpen ? <AdminSidebar active="content" /> : null}

        <main
          className={`h-screen overflow-hidden bg-[#f4f6f2] ${
            isSidebarOpen ? "ml-56 w-[calc(100%-14rem)]" : "w-full"
          }`}
        >
          <div className="h-full ml-8.75 bg-white/90">
            <div className="flex h-full">
              {isContentSidebarOpen ? (
                <section className="w-90 shrink-0 border-r border-[#eef2ee] px-6 py-6">
                  <div className="flex h-full flex-col">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold text-[#9aa8a2]">
                          Nội dung
                        </p>
                        <h1 className="mt-1 text-xl font-semibold">Nội dung</h1>
                      </div>
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-full bg-[#2f5d50] px-4 py-2 text-xs font-semibold text-white"
                      >
                        <PlusIcon className="h-3.5 w-3.5" />
                        Thêm địa điểm
                      </button>
                    </div>

                    <div className="mt-4 flex items-center gap-2 rounded-full border border-[#e6ece6] bg-white px-4 py-2 text-xs text-[#9aa8a2]">
                      <SearchIcon className="h-4 w-4" />
                      <span>Tìm kiếm địa điểm hoặc tình huống</span>
                    </div>
                    <div className="mt-3 flex items-center gap-4 text-[11px] text-[#7b8b83]">
                      <LegendDot color="#2f5d50" />
                      <span>Đã xuất bản</span>
                      <LegendDot color="#f4b24f" />
                      <span>Đã sửa đổi</span>
                      <LegendDot color="#e16f5c" />
                      <span>Nháp</span>
                    </div>

                    <div className="mt-6 flex-1 overflow-y-auto pr-2">
                      <div className="space-y-3">
                        {locations.map((location) => {
                          const isExpanded = expandedIds.includes(location.id);
                          return (
                            <div key={location.id} className="bg-white">
                              <div className="flex items-center justify-between px-3 py-2">
                                <button
                                  type="button"
                                  onClick={() =>
                                    setExpandedIds((prev) =>
                                      prev.includes(location.id)
                                        ? prev.filter(
                                            (id) => id !== location.id,
                                          )
                                        : [...prev, location.id],
                                    )
                                  }
                                  className="flex items-center gap-2 text-sm font-semibold"
                                >
                                  <ChevronDownIcon
                                    className={`h-4 w-4 text-[#9aa8a2] transition-transform ${
                                      isExpanded ? "rotate-0" : "-rotate-90"
                                    }`}
                                  />
                                  <LocationIcon
                                    name={location.icon}
                                    className="h-4 w-4 text-[#2f5d50]"
                                  />
                                  {location.label}
                                </button>
                                <div className="flex items-center gap-2">
                                  <IconButton ariaLabel="Edit">
                                    <EditIcon className="h-4 w-4" />
                                  </IconButton>
                                  <IconButton ariaLabel="Delete">
                                    <TrashIcon className="h-4 w-4" />
                                  </IconButton>
                                  <StatusDot status={location.status} />
                                </div>
                              </div>

                              {isExpanded ? (
                                <div className="border-[#eef2ee] px-3 py-2">
                                  <button
                                    type="button"
                                    className="flex items-center gap-2 rounded-xl px-2 py-2 text-xs font-semibold text-[#7b8b83]"
                                  >
                                    <PlusIcon className="h-3.5 w-3.5" />
                                    Thêm tình huống
                                  </button>
                                  <div className="mt-1 space-y-2">
                                    {location.units.map((unit) => (
                                      <button
                                        key={unit.id}
                                        type="button"
                                        onClick={() =>
                                          setSelectedUnit({
                                            locationId: location.id,
                                            unitId: unit.id,
                                          })
                                        }
                                        className={`flex w-full items-center justify-between rounded-xl px-2 py-2 text-left text-sm transition ${
                                          selectedUnit?.unitId === unit.id
                                            ? "bg-(--vv-accent-soft)"
                                            : "hover:bg-[#f6f8f6]"
                                        }`}
                                      >
                                        <span>{unit.title}</span>
                                        <StatusDot status={unit.status} />
                                      </button>
                                    ))}
                                    {location.units.length === 0 ? (
                                      <p className="px-2 pb-2 text-xs text-[#9aa8a2]">
                                        Chưa có tình huống
                                      </p>
                                    ) : null}
                                  </div>
                                </div>
                              ) : null}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </section>
              ) : null}

              <section
                className={`flex-1 overflow-y-auto ${
                  isContentSidebarOpen ? "" : "w-full"
                }`}
              >
                {activeUnit ? (
                  <div className=" border border-[#eef2ee] bg-white ">
                    <div className="px-8 py-4 border-b border-[#eef2ee]">
                      <div className="flex items-start justify-between ">
                        <div className="flex items-start gap-3">
                          <button
                            type="button"
                            onClick={() =>
                              setIsContentSidebarOpen((prev) => !prev)
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#e6ece6] bg-white text-[#7b8b83]"
                            aria-label="Toggle content sidebar"
                          >
                            <MenuIcon className="h-4 w-4" />
                          </button>
                          <div>
                            <p className="text-[11px] text-[#9aa8a2]">
                              {activeLocation?.label} / {activeUnit.title}
                            </p>
                            <h2 className="mt-1 text-xl font-semibold">
                              {activeUnit.title}
                            </h2>
                            <p className="mt-1 text-[11px] text-[#9aa8a2]">
                              {activeUnit.vocabCount} thẻ từ vựng •{" "}
                              {activeUnit.listeningCount} câu hội thoại •{" "}
                              {activeUnit.duration}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="rounded-full border border-[#dfe6df] px-3 py-1 text-[11px] font-semibold text-[#7b8b83]">
                            ✓ Đã lưu tự động
                          </span>
                          <span className="rounded-full border border-[#f4b24f] bg-[#fff6e8] px-3 py-1 text-[11px] font-semibold text-[#c47b1f]">
                            Nháp
                          </span>
                          <button
                            type="button"
                            className="rounded-full bg-[#2f5d50] px-4 py-1 text-[11px] font-semibold text-white"
                          >
                            Xuất bản
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className=" flex items-center gap-4 border-b px-8 pt-4 border-[#eef2ee] text-sm font-semibold">
                      <button
                        type="button"
                        onClick={() => setActiveTab("vocab")}
                        className={`pb-4 ${
                          activeTab === "vocab"
                            ? "border-b-2 border-[#2f5d50]"
                            : "text-[#7b8b83]"
                        }`}
                      >
                        Từ vựng
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab("listening")}
                        className={`pb-4 ${
                          activeTab === "listening"
                            ? "border-b-2 border-[#2f5d50]"
                            : "text-[#7b8b83]"
                        }`}
                      >
                        Bài nghe
                      </button>
                    </div>
                    <main className="px-8 pt-4">
                      {activeTab === "vocab" ? (
                        <div>
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold">
                              3 thẻ từ vựng
                            </p>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                className="rounded-full border border-[#dfe6df] px-3 py-1 text-[11px] font-semibold text-[#7b8b83]"
                              >
                                Import CSV
                              </button>
                              <button
                                type="button"
                                className="rounded-full bg-[#2f5d50] px-3 py-1 text-[11px] font-semibold text-white"
                              >
                                + Thêm thẻ
                              </button>
                            </div>
                          </div>

                          <div className="mt-3 overflow-hidden rounded-2xl border border-[#eef2ee]">
                            <table className="w-full text-left text-[11px]">
                              <thead className="bg-[#f8faf7] text-[#7b8b83]">
                                <tr>
                                  <th className="px-4 py-3">#</th>
                                  <th className="px-4 py-3">Từ / cụm từ</th>
                                  <th className="px-4 py-3">Loại</th>
                                  <th className="px-4 py-3">
                                    Nghĩa tiếng Nhật
                                  </th>
                                  <th className="px-4 py-3">
                                    Ví dụ câu (Việt)
                                  </th>
                                  <th className="px-4 py-3"></th>
                                </tr>
                              </thead>
                              <tbody className="text-[#1f2b27]">
                                {vocabRows.map((row) => (
                                  <tr
                                    key={row.index}
                                    className="border-t border-[#eef2ee]"
                                  >
                                    <td className="px-4 py-3">{row.index}</td>
                                    <td className="px-4 py-3 font-semibold">
                                      {row.term}
                                    </td>
                                    <td className="px-4 py-3">
                                      <span className={getTagClass(row.type)}>
                                        {row.type}
                                      </span>
                                    </td>
                                    <td className="px-4 py-3">{row.meaning}</td>
                                    <td className="px-4 py-3">{row.example}</td>
                                    <td className="px-4 py-3">
                                      <div className="flex items-center gap-2">
                                        <IconButton ariaLabel="Edit">
                                          <EditIcon className="h-4 w-4" />
                                        </IconButton>
                                        <IconButton ariaLabel="Delete">
                                          <TrashIcon className="h-4 w-4 text-[#d46b6b]" />
                                        </IconButton>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>

                          <div className="mt-3 flex items-center gap-2 text-[11px] text-[#7b8b83]">
                            <InfoIcon className="h-4 w-4" />
                            <span>
                              Bấm vào để sửa thẻ — gồm cả nghĩa tiếng Nhật, ví
                              dụ câu tiếng Việt và ghi chú (mặt sau flashcard)
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="rounded-2xl bg-[#36584e] px-4 py-5 text-white">
                            <div className="flex items-center gap-3">
                              <button
                                type="button"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d7f0e5] text-[#2f5d50]"
                              >
                                <PlayIcon className="h-4 w-4" />
                              </button>
                              <div className="flex-1">
                                <div className="h-2 w-full rounded-full bg-[#5f7a71]">
                                  <div className="h-full w-[65%] rounded-full bg-[#d7f0e5]" />
                                </div>
                              </div>
                              <div className="text-xs text-[#d7f0e5]">
                                0:13 / 1:08{" "}
                                <span className="underline">Thay file</span>
                              </div>
                            </div>
                          </div>

                          <div className="mt-3 py-4 flex items-center gap-2 text-[11px] text-[#7b8b83]">
                            <ClockIcon className="h-4 w-4" />
                            <span>
                              Bấm nút đồng hồ ở từng dòng để tự điền timestamp
                              tại vị trí đang phát
                            </span>
                          </div>

                          <div className="mt-6">
                            <p className="text-sm font-semibold">
                              Âm thanh môi trường
                            </p>
                            <div className="mt-2 flex items-center gap-2 rounded-2xl border border-[#eef2ee] bg-white px-3 py-2 text-xs text-[#7b8b83]">
                              <span className="flex items-center gap-1 rounded-full bg-(--vv-accent-soft) px-3 py-1 text-[#2f5d50]">
                                Quán cafe
                                <span className="text-[#7b8b83]">×</span>
                              </span>
                              <span className="flex items-center gap-1 rounded-full bg-(--vv-accent-soft) px-3 py-1 text-[#2f5d50]">
                                Đường phố
                                <span className="text-[#7b8b83]">×</span>
                              </span>
                              <span className="text-[#9aa8a2]">+ Thêm...</span>
                            </div>
                          </div>

                          <div className="mt-6">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-semibold">
                                Script hội thoại 4 câu
                              </p>
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  className="rounded-full border border-[#dfe6df] px-3 py-1 text-[11px] font-semibold text-[#7b8b83]"
                                >
                                  Import CSV
                                </button>
                                <button
                                  type="button"
                                  className="rounded-full bg-[#2f5d50] px-3 py-1 text-[11px] font-semibold text-white"
                                >
                                  + Thêm câu
                                </button>
                              </div>
                            </div>

                            <div className="mt-3 overflow-hidden rounded-2xl border border-[#eef2ee]">
                              <table className="w-full text-left text-[11px]">
                                <thead className="bg-[#f8faf7] text-[#7b8b83]">
                                  <tr>
                                    <th className="px-4 py-3">#</th>
                                    <th className="px-4 py-3">Tiếng Việt</th>
                                    <th className="px-4 py-3">Tiếng Nhật</th>
                                    <th className="px-4 py-3">Timestamp</th>
                                    <th className="px-4 py-3"></th>
                                  </tr>
                                </thead>
                                <tbody className="text-[#1f2b27]">
                                  {listeningRows.map((row) => (
                                    <tr
                                      key={row.index}
                                      className="border-t border-[#eef2ee]"
                                    >
                                      <td className="px-4 py-3">{row.index}</td>
                                      <td className="px-4 py-3">{row.vi}</td>
                                      <td className="px-4 py-3">{row.jp}</td>
                                      <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                          <span>{row.timestamp}</span>
                                          <ClockIcon className="h-3.5 w-3.5 text-[#7b8b83]" />
                                        </div>
                                      </td>
                                      <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                          <IconButton ariaLabel="Edit">
                                            <EditIcon className="h-4 w-4" />
                                          </IconButton>
                                          <IconButton ariaLabel="Delete">
                                            <TrashIcon className="h-4 w-4 text-[#d46b6b]" />
                                          </IconButton>
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      )}
                    </main>
                  </div>
                ) : (
                  <div className="flex h-105 items-center justify-center rounded-2xl border border-[#eef2ee] bg-white">
                    <div className="flex flex-col items-center gap-2 text-center text-sm text-[#7b8b83]">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f5f7f3] text-[#9aa8a2]">
                        <SearchIcon className="h-5 w-5" />
                      </div>
                      <p className="font-semibold text-[#1f2b27]">
                        Vui lòng chọn tình huống
                      </p>
                      <p className="text-[11px]">
                        Chọn tình huống cần chỉnh sửa từ danh sách bên trái.
                      </p>
                    </div>
                  </div>
                )}
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function StatusDot({ status }: { status: Status }) {
  const colors = {
    published: "bg-[#2f5d50]",
    edited: "bg-[#f4b24f]",
    draft: "bg-[#e16f5c]",
  };

  return <span className={`h-2.5 w-2.5 rounded-full ${colors[status]}`} />;
}

function LegendDot({ color }: { color: string }) {
  return (
    <span className="h-2 w-2 rounded-full" style={{ background: color }} />
  );
}

function getTagClass(type: string) {
  switch (type) {
    case "từ lóng":
      return "rounded-full bg-[#f1d6d3] px-2 py-1 text-[10px] font-semibold text-[#b85f54]";
    case "thành ngữ":
      return "rounded-full bg-[#d7ece3] px-2 py-1 text-[10px] font-semibold text-[#2f5d50]";
    case "từ chuyên ngành":
      return "rounded-full bg-[#dff2ea] px-2 py-1 text-[10px] font-semibold text-[#4a7d6c]";
    default:
      return "rounded-full bg-[#eef2ee] px-2 py-1 text-[10px] font-semibold text-[#7b8b83]";
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

function LocationIcon({
  name,
  className,
}: {
  name: IconName;
  className?: string;
}) {
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
    default:
      return null;
  }
}

function MenuIcon({ className }: { className?: string }) {
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
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <line x1="10" y1="6" x2="10" y2="18" />
      <path d="m16 9-3 3 3 3" />
    </svg>
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

function InfoIcon({ className }: { className?: string }) {
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
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
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

function ClockIcon({ className }: { className?: string }) {
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
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  );
}
