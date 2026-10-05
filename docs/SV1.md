# CreatorStudio — 5 màn hình của SV1

Bộ giao diện HTML/CSS/JavaScript thuần, dựa trên README, bảng phân công Excel và sitemap/user flow draw.io được cung cấp. Không cần cài npm hay backend.

## Các file

| Trang                 | HTML                           | CSS riêng                         | JavaScript riêng                |
| --------------------- | ------------------------------ | --------------------------------- | ------------------------------- |
| Landing Portal        | `index.html`                   | `css/index.css`                   | `js/index.js`                   |
| Login & Demo Switcher | `login.html`                   | `css/login.css`                   | `js/login.js`                   |
| Project Overview      | `client-project-overview.html` | `css/client-project-overview.css` | `js/client-project-overview.js` |
| Creative Brief        | `client-creative-brief.html`   | `css/client-creative-brief.css`   | `js/client-creative-brief.js`   |
| Review Versions       | `client-review-versions.html`  | `css/client-review-versions.css`  | `js/client-review-versions.js`  |

`css/tokens.css` chứa màu giao diện; `css/shared.css` chứa thành phần và responsive dùng chung. `js/shared.js` quản lý dữ liệu, phiên demo, sidebar, toast và hộp xác nhận. Hình SVG mẫu nằm trong `assets/images/`; không tải font, ảnh hoặc thư viện từ CDN.

## Chạy

Giải nén toàn bộ thư mục, giữ nguyên cấu trúc HTML/CSS/JS/assets. Tại thư mục chứa `index.html`, chạy:

```bash
python3 -m http.server 8000
```

Mở trang `index.html` trên máy chủ vừa chạy; hoặc dùng VS Code Live Server. Nên chạy qua HTTP để 5 trang dùng cùng nguồn lưu trữ. Không cần `npm install`.

## Luồng trải nghiệm

1. Landing → **Khám phá bản demo**, hoặc Login → **Khách hàng**. Biểu mẫu đăng nhập kiểm tra email và mật khẩu demo tối thiểu 6 ký tự.
2. Project Overview → **Tạo dự án mới** → điền tên, hạn hoàn thành và ý tưởng. Có tìm kiếm, lọc trạng thái, sửa dự án, lưu trữ, khôi phục và xóa dự án đã lưu trữ.
3. Creative Brief → nhập mô tả dài hơn 20 ký tự → **Tạo brief có cấu trúc** → rà soát/sửa 5 phần → **Chấp nhận kết quả** → **Gửi brief**. Có giải thích, tạo lại, từ chối, tự viết và lưu bản nháp. Thay đổi nội dung yêu cầu xác nhận lại. Dữ liệu được giữ sau khi tải lại trang nếu đã lưu.
4. Dùng dự án mẫu **Mộc**, **Forma** hoặc **Sunday** để Review Versions. Dự án mới chưa có phiên bản; module upload thuộc SV2, nên không tự tạo phiên bản giả cho dự án vừa tạo.
5. So sánh v1.0/v2.0 song song hoặc bằng thanh trượt. Nhấn vào v2.0 để đặt pin; nút **＋ Phản hồi** đặt pin ở giữa ảnh và hỗ trợ thao tác bàn phím. Có sửa/xóa phản hồi và đánh dấu đã xử lý.
6. **Yêu cầu chỉnh sửa** cần ít nhất một phản hồi chưa xử lý; lưu `Changes Requested` và đưa dự án về `Active`. **Phê duyệt** cần xác nhận, chuyển dự án `Completed`/100%, phiên bản `Approved` và khóa chỉnh sửa phản hồi. Lưu trữ dự án cũng khóa chỉnh sửa brief/phiên bản.

## Phạm vi mô phỏng

- Đăng nhập là demo, không xác thực với máy chủ và không lưu mật khẩu. Không nhập mật khẩu thật. Phiên vai trò lưu bằng SessionStorage, dùng trong tab hiện tại; dữ liệu dự án lưu bằng LocalStorage tại khóa `creatorstudio.sv1.v1`.
- Brief Structurer dùng quy tắc và từ khóa, không gọi LLM. Các đề xuất và thông tin chưa rõ được ghi để người dùng xác nhận. Mô tả quá ngắn có trạng thái lỗi và hướng dẫn xử lý thủ công.
- README và Excel/draw.io đánh số Mood Assistant/Feedback Summarizer khác nhau. Bộ này dùng tên chức năng để tránh nhầm; SV1 chỉ triển khai Brief Structurer.
- Hai phiên bản và moodboard là nội dung minh họa. Lead chưa nhận thông báo thật, chưa có upload, API, đồng bộ đa người dùng hay backend.
- 4 nút vai trò đều tạo phiên demo. Designer/Lead/Admin hiển thị thông báo phạm vi/403 và nút chuyển sang Client vì trang của các vai trò đó thuộc SV2/SV3.
- Phân quyền phía trình duyệt chỉ phục vụ prototype, không phải cơ chế bảo mật cho sản phẩm thật.

Muốn bắt đầu lại, xóa mục `creatorstudio.sv1.v1` trong LocalStorage của website bằng công cụ trình duyệt; dữ liệu mẫu sẽ được nạp lại. Thao tác này xóa mọi dự án/brief/phản hồi đã tạo trên trình duyệt đó.

## Ghép với phần của nhóm

Schema hiện tại nằm ở `js/shared.js`: mỗi dự án có `id`, `name`, `category`, `description`, `deadline`, `status`, `progress`, `brief`, `versionStatus`, `comments`, `art`. Brief có 5 `sections`, trạng thái `submitted`, thông tin `source` và `explanation`; comment có tọa độ tương đối `x/y`, nội dung và trạng thái xử lý. SV2/SV3 có thể dùng cùng schema hoặc thay lớp lưu trữ bằng API khi tích hợp.

## Kiểm tra đã thực hiện

Đã chạy 48 kiểm tra chức năng trên Chromium: đăng nhập/đăng xuất, validation, CRUD dự án, bản nháp và gửi brief, AI mô phỏng và viết thủ công, phản hồi theo tọa độ, sửa và lưu qua tải lại, yêu cầu chỉnh sửa, phê duyệt và phân quyền demo. Cả 5 trang không tràn ngang tại 390px, 768px và 1440px; không có lỗi JavaScript trong các luồng đã chạy.
