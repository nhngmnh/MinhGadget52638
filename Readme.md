# 🖥️ MinhGadget - Website Bán Đồ Công Nghệ Trực Tuyến

## 🌟 Mô tả ngắn gọn  
**MinhGadget** là một nền tảng thương mại điện tử hiện đại chuyên cung cấp các thiết bị công nghệ như điện thoại, laptop, tai nghe, phụ kiện,... Dự án được xây dựng bằng MERN Stack (MongoDB, Express.js, React.js, Node.js), đảm bảo trải nghiệm người dùng mượt mà và hiệu suất cao.

---

## 🔑 Tính năng chính  

### 1. Hệ thống quản lý người dùng  
- **Đăng ký / Đăng nhập với phân quyền:**  
  - **Admin:** Quản lý sản phẩm, đơn hàng, và người dùng.  
  - **Client:** Mua hàng, theo dõi đơn hàng, cập nhật thông tin cá nhân.  
- **Bảo mật:** Xác thực bằng JWT, mã hóa mật khẩu bằng bcrypt.

### 2. Trang chủ thân thiện, hiện đại  
- Hiển thị sản phẩm nổi bật.  
- Giới thiệu thương hiệu, chính sách, và hỗ trợ khách hàng.  

### 3. Tìm kiếm và lọc sản phẩm  
- Tìm kiếm theo từ khóa.  
- Lọc theo loại, thương hiệu, giá, đánh giá.  

### 4. Giỏ hàng và thanh toán  
- Thêm/xoá sản phẩm vào giỏ hàng.  
- Đặt hàng, thanh toán trực tuyến.  
- Theo dõi trạng thái đơn hàng.  

### 5. Trang quản trị (Admin Dashboard)  
- Quản lý sản phẩm (thêm/sửa/xoá).  
- Quản lý đơn hàng, người dùng.  

### 6. Trang cá nhân người dùng  
- Cập nhật thông tin.  
- Xem lịch sử mua hàng và đánh giá sản phẩm.

### 7. 💬 Tích hợp Chatbox tư vấn trực tuyến  
- Giao diện chat thân thiện cho khách hàng.  
- Hỗ trợ người dùng ngay trong quá trình mua sắm.  
- Tư vấn tự động hoặc qua nhân viên hỗ trợ.  

---

## 🛠 Công nghệ sử dụng

- **Frontend:** React.js + Vite  
- **Backend:** Node.js + Express.js  
- **Database:** MongoDB  
- **Thư viện hỗ trợ:**  
  - `react-toastify`: Hiển thị thông báo giao diện  
  - `bcryptjs`: Mã hóa mật khẩu  
  - `jsonwebtoken (JWT)`: Xác thực và phân quyền  
  - `axios`: Giao tiếp client-server  
  - `react-router-dom`: Điều hướng trang  
  - **Chatbox:** Tuỳ chọn sử dụng `socket.io`, `Firebase Realtime`, hoặc tích hợp dịch vụ như `Tawk.to`, `LiveChat`,...

---

## 🚀 Hướng dẫn chạy dự án

### 1. Clone repository:
```bash
git clone https://github.com/yourusername/MinhGadget.git
cd MinhGadget

### 2. Cài đặt dependencies:
npm install

### 3. Chạy frontend:
npm run dev

### 4. Chạy backend:
npm run server

💡 Đóng góp phát triển
Mọi đóng góp đều được hoan nghênh!
Hãy tạo Issue hoặc gửi Pull Request để cùng nhau phát triển MinhGadget trở thành nền tảng thương mại điện tử hàng đầu cho dân yêu công nghệ!