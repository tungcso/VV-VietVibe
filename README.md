# 🌸 VietVibe - Nền tảng Học Tiếng Nhật Dành Cho Người Việt

[![NestJS](https://img.shields.io/badge/Backend-NestJS-E0234E?style=flat-square&logo=nestjs)](https://nestjs.com/)
[![Next.js](https://img.shields.io/badge/Frontend-Next.js-000000?style=flat-square&logo=next.js)](https://nextjs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/Styling-TailwindCSS-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

Chào mừng bạn đến với **VietVibe**, dự án nền tảng học tiếng Nhật tiên tiến được thiết kế tối ưu hóa dành riêng cho người Việt Nam. Hệ thống giúp người học theo dõi tiến độ, rèn luyện từ vựng và cải thiện kỹ năng ngôn ngữ một cách hệ thống.

---

## 🛠 Công nghệ sử dụng

Dự án được xây dựng dựa trên kiến trúc hiện đại, phân tách rõ ràng giữa Frontend và Backend:

- **Frontend:** Next.js (App Router), React, TailwindCSS.
- **Backend:** NestJS (Node.js framework), Mongoose, Swagger (API Docs).
- **Cơ sở dữ liệu:** MongoDB (Local hoặc Cloud Atlas).

---

## 📂 Cấu trúc thư mục

```text
VV-VietVibe/
├── my-backend/       # Chứa toàn bộ mã nguồn API (NestJS)
│   ├── src/          # Logic xử lý, controller, service, module
│   ├── scripts/      # Các script tiện ích (vd: dọn dẹp port)
│   └── package.json
└── my-frontend/      # Chứa toàn bộ giao diện người dùng (Next.js)
    ├── app/          # Các trang (pages) và routing (App Router)
    ├── public/       # Tài nguyên tĩnh (hình ảnh, icon)
    └── package.json
```

---

## 🚀 Hướng dẫn thiết lập môi trường

### 📋 Yêu cầu hệ thống
- **Node.js**: Phiên bản 18.x trở lên.
- **MongoDB**: Máy chủ MongoDB đang chạy cục bộ (port 27017) hoặc có sẵn connection string đến MongoDB Atlas.
- **Git**: Để quản lý mã nguồn.

### 1. Thiết lập Backend (API Server)

Mở terminal và di chuyển vào thư mục backend:
```bash
cd my-backend
```

**Bước 1: Cài đặt thư viện**
```bash
npm install
```

**Bước 2: Cấu hình biến môi trường**
Tạo file `.env` từ file mẫu:
```bash
cp .env.example .env
```
Mở file `.env` và kiểm tra lại `MONGO_URI` cùng `PORT`. Mặc định Backend sẽ chạy trên port `3001`.

**Bước 3: Chạy ứng dụng & Khởi tạo dữ liệu**
Dự án đã được cấu hình lệnh `start:dev` tự động dọn dẹp port bị kẹt và chạy seeding (đổ dữ liệu mẫu) trước khi khởi động.
```bash
npm run start:dev
```
*Backend sẽ chạy tại:* **http://localhost:3001**

---

### 2. Thiết lập Frontend (Web UI)

Mở một cửa sổ terminal mới và di chuyển vào thư mục frontend:
```bash
cd my-frontend
```

**Bước 1: Cài đặt thư viện**
```bash
npm install
```

**Bước 2: Chạy ứng dụng**
```bash
npm run dev
```
*Frontend sẽ chạy tại:* **http://localhost:3000**

---

## 📚 Tài liệu API (Swagger UI)

Backend được tích hợp sẵn Swagger để tự động sinh tài liệu API, giúp Frontend developer dễ dàng tra cứu và test API.

Khi Backend đang chạy, bạn có thể truy cập tài liệu tại:
👉 **[http://localhost:3001/api](http://localhost:3001/api)**

---

## 🔄 Quy trình làm việc với Git

Dự án hiện tại sử dụng luồng làm việc dựa trên nhánh:

- `main`: Nhánh chứa mã nguồn ổn định nhất, sẵn sàng để deploy. **Không commit trực tiếp vào nhánh này.**
- `development`: Nhánh phát triển chính. Các tính năng mới sẽ được hợp nhất (merge) vào đây trước.
- **Nhánh tính năng (Feature branches)**: Khi phát triển tính năng mới, hãy tạo nhánh từ `development` (VD: `feature/vocabulary-list`, `fix/login-bug`).

**Các bước khuyến nghị khi code:**
1. Chuyển sang nhánh development: `git checkout development`
2. Cập nhật code mới nhất: `git pull origin development`
3. Tạo nhánh mới: `git checkout -b feature/ten-tinh-nang`
4. Code, commit và push nhánh mới lên repository.
5. Tạo Pull Request (PR) để merge vào `development`.

---

## 🛠 Các lệnh thường dùng

### Backend (`my-backend/`)
- `npm run start:dev`: Chạy backend (Watch mode) + Tự động Seeding.
- `npm run seed:all`: Chạy thủ công việc khởi tạo lại dữ liệu mẫu vào DB.
- `npm run build`: Build mã nguồn thành JavaScript thuần cho Production.
- `npm run lint`: Kiểm tra lỗi cú pháp (ESLint).

### Frontend (`my-frontend/`)
- `npm run dev`: Chạy frontend ở chế độ phát triển (Hot reload).
- `npm run build`: Build dự án Next.js tối ưu hóa cho Production.
- `npm run start`: Chạy frontend bằng bản build production.
- `npm run lint`: Kiểm tra mã nguồn.
