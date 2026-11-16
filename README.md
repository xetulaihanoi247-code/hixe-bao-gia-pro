# Báo giá thuê xe tự lái Hixe Pro

Công cụ nội bộ tính báo giá thuê xe tự lái: chọn loại xe, nhập giá và thời gian, cộng phụ phí cuối tuần / lễ Tết, ưu đãi dài ngày, VAT, đặt cọc; copy tin nhắn hoặc xuất ảnh gửi khách qua Zalo; lưu lịch sử báo giá.

Chạy hoàn toàn trên trình duyệt, không có máy chủ. Lịch sử và cài đặt lưu trong `localStorage` của từng máy.

## Cài như một app (PWA)

Mở trang bằng HTTPS (ví dụ GitHub Pages), rồi:

- **Chrome / Edge / Android:** bấm nút **Cài app** trên trang, hoặc biểu tượng cài đặt ở thanh địa chỉ.
- **iPhone / iPad (Safari):** Chia sẻ → Thêm vào Màn hình chính.
- **Safari trên Mac:** File → Add to Dock.

Sau lần mở đầu tiên, app chạy được khi mất mạng.

## Cập nhật

Mỗi khi sửa `index.html`, tăng số phiên bản `CACHE` trong `sw.js` để máy đã cài nhận bản mới.

## File

- `index.html` – toàn bộ giao diện và phép tính; giá và quy tắc mặc định nằm trong `MAC_DINH` ở đầu file.
- `manifest.webmanifest`, `sw.js`, `icons/` – phần PWA.
