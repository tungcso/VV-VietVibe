# VietVibe - Japanese Learning Platform

Chào mừng bạn đến với **VietVibe**, nền tảng học tiếng Nhật chuyên sâu dành riêng cho người Việt. Hệ thống được xây dựng với mục tiêu cung cấp trải nghiệm học tập hiện đại, từ vựng phong phú và lộ trình học tập được theo dõi chi tiết.

## ✨ Tính năng chính
- **Hệ thống từ vựng phong phú**: Phân loại theo chủ đề, cấp độ JLPT (N5 - N1) và từ loại.
- **Theo dõi tiến độ học tập**: Ghi nhận kết quả bài tập, điểm số và tiến trình học của từng cá nhân.
- **Giao diện hiện đại**: Trải nghiệm người dùng mượt mà, tối ưu hóa tốc độ với Next.js và TailwindCSS.
- **Tích hợp API chuẩn RESTful**: Backend mạnh mẽ, an toàn và dễ mở rộng với NestJS.

## 🛠 Công nghệ sử dụng
- **Frontend**: Next.js, React, TailwindCSS.
- **Backend**: NestJS, TypeScript, Mongoose.
- **Database**: MongoDB (Local hoặc Atlas).

---

## 📋 Yêu cầu hệ thống

Trước khi bắt đầu, hãy đảm bảo máy tính của bạn đã cài đặt các công cụ sau:
- **Node.js**: Phiên bản 18 trở lên.
- **MongoDB**: Đang chạy cục bộ (local) ở port 27017 hoặc có chuỗi kết nối (connection string) tới MongoDB Atlas.
- **npm**: Trình quản lý gói đi kèm với Node.js.

---

## 🚀 Hướng dẫn thiết lập môi trường

### 1. Thiết lập Backend

Di chuyển vào thư mục backend:
```bash
cd my-backend
```

#### Bước 1: Cài đặt thư viện
```bash
npm install
```

#### Bước 2: Cấu hình biến môi trường
Tạo file `.env` từ file mẫu:
```bash
cp .env.example .env
```
Mở file `.env` và cập nhật các thông số sau (nếu cần):
- `MONGO_URI`: Địa chỉ kết nối MongoDB của bạn (Mặc định: `mongodb://localhost:27017/vietvibe_db`).
- `PORT`: Cổng chạy backend (mặc định là `3001`).
- `JWT_SECRET`: Mã bí mật để ký token JWT (Mặc định: `change_this_secret`).

#### Bước 3: Khởi tạo dữ liệu (Seeding)
Hệ thống cần dữ liệu mẫu (Master data, Business data) để hoạt động. Chạy lệnh sau để import dữ liệu vào MongoDB:
```bash
npm run seed:all
```

#### Bước 4: Chạy ứng dụng
```bash
npm run start:dev
```
> **Lưu ý:** Lệnh `start:dev` đã được cấu hình để tự động dọn dẹp port 3001 và chạy lệnh `seed:all` trước khi khởi động server, do đó bạn có thể yên tâm chạy lệnh này cho lần đầu tiên.

- **Backend API**: [http://localhost:3001](http://localhost:3001)
- **Tài liệu API (Swagger UI)**: [http://localhost:3001/api](http://localhost:3001/api)

---

### 2. Thiết lập Frontend

Mở một terminal mới và di chuyển vào thư mục frontend:
```bash
cd my-frontend
```

#### Bước 1: Cài đặt thư viện
```bash
npm install
```

#### Bước 2: Chạy ứng dụng
```bash
npm run dev
```
- **Giao diện Web**: [http://localhost:3000](http://localhost:3000)

---

## 🛠 Các lệnh quan trọng

### Backend (`/my-backend`)
- `npm run start:dev`: Chạy backend ở chế độ phát triển (watch mode).
- `npm run seed:all`: Khởi tạo lại toàn bộ dữ liệu mẫu (Master, Business, Progress).
- `npm run build`: Build dự án cho môi trường production.
- `npm run lint`: Kiểm tra lỗi cú pháp (Linting).

### Frontend (`/my-frontend`)
- `npm run dev`: Chạy frontend ở chế độ phát triển.
- `npm run build`: Build dự án Next.js cho production.
- `npm run start`: Chạy ứng dụng sau khi đã build.

---

## 📝 Cấu trúc dự án
Dự án được chia thành 2 thư mục chính:
- **`/my-backend`**: Mã nguồn server-side.
  - `/src`: Chứa logic chính (Controllers, Services, Modules).
  - `/src/seeders`: Chứa các script khởi tạo dữ liệu mẫu.
  - `/src/schemas`: Định nghĩa cấu trúc các Collection trong MongoDB (Mongoose Schemas).
- **`/my-frontend`**: Mã nguồn giao diện người dùng.
  - `/app`: Cấu trúc Next.js App Router (Pages, Layouts).
  - `/public`: Chứa tài nguyên tĩnh (Hình ảnh, fonts).
