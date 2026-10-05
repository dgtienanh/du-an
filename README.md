# CreatorStudio -- Quản lý dự án sáng tạo và phản hồi phiên bản

> **Học phần:** Phát triển Ứng dụng Web Cơ bản -- CSE122\
> **Nhóm thực hiện:** 3 sinh viên\
> **Loại sản phẩm:** Web Frontend Prototype\
> **Lĩnh vực:** Nghệ thuật & sáng tạo / CreativeTech

## 1. Giới thiệu dự án

**CreatorStudio** là website Frontend hỗ trợ quản lý quy trình thực hiện
một dự án sáng tạo, từ tiếp nhận brief, xây dựng moodboard, quản lý
phiên bản thiết kế, phản hồi nội bộ, phản hồi khách hàng cho đến phê
duyệt phiên bản.

Dự án giải quyết các vấn đề:

-   Brief ban đầu thiếu cấu trúc.
-   Feedback nằm rải rác, khó tổng hợp.
-   Khó xác định phiên bản thiết kế mới nhất.
-   Khách hàng khó theo dõi và duyệt thay đổi.
-   Nhóm sáng tạo thiếu một luồng làm việc thống nhất giữa Client,
    Designer và Creative Lead.

Website được xây dựng dưới dạng **Frontend prototype**, không bắt buộc
backend thật. Dữ liệu có thể được mô phỏng bằng JSON, LocalStorage hoặc
API giả lập.

------------------------------------------------------------------------

## 2. Mục tiêu

Dự án cần đáp ứng các mục tiêu chính:

-   Xây dựng đầy đủ hành trình người dùng cho từng vai trò.
-   Có giao diện và điều hướng nhất quán trên toàn website.
-   Có CRUD hoặc trạng thái nghiệp vụ có ý nghĩa.
-   Có tìm kiếm, lọc, validation và tương tác JavaScript/DOM.
-   Có mock data / JSON / LocalStorage hoặc API phù hợp.
-   Responsive trên desktop và tablet/mobile.
-   Có ít nhất 3 trải nghiệm AI có ý nghĩa trong nghiệp vụ.
-   Có các trạng thái loading, empty, success, error và các trạng thái
    nghiệp vụ phù hợp.
-   Quản lý công việc bằng Trello và mã nguồn bằng Git/GitHub theo
    branch + Pull Request.
-   Có video OBS minh chứng cho từng màn hình thực tế đã được duyệt.

------------------------------------------------------------------------

## 3. Các vai trò người dùng

  -----------------------------------------------------------------------
  Vai trò                             Trách nhiệm chính
  ----------------------------------- -----------------------------------
  **Khách hàng (Client)**             Tạo brief, theo dõi dự án, xem và
                                      duyệt phiên bản

  **Nhà thiết kế (Designer)**         Quản lý moodboard và các phiên bản
                                      thiết kế

  **Creative Lead**                   Phân công công việc, review nội bộ,
                                      tổng hợp feedback

  **Quản trị viên (Admin)**           Quản lý template, người dùng và cấu
                                      hình dự án
  -----------------------------------------------------------------------

Ngoài các trang theo vai trò, website có các màn hình dùng chung như
Landing Page, Login, Profile, Notifications và Error Page.

------------------------------------------------------------------------

## 4. User Journey tổng quát

``` text
Khám phá / Đăng nhập
        ↓
Chọn / xác định vai trò
        ↓
Thực hiện nghiệp vụ theo vai trò
        ↓
Xem dữ liệu / trạng thái / phản hồi
        ↓
AI hỗ trợ phân tích hoặc gợi ý
        ↓
Accept / Edit / Reject / Regenerate / Save
        ↓
Vai trò liên quan tiếp tục xử lý
        ↓
Hoàn thành / phê duyệt / lưu trạng thái
```

------------------------------------------------------------------------

## 5. Screen Inventory

Theo Trello hiện tại, nhóm đã phân tích và thiết kế **17 màn hình**.

### 5.1. Màn hình dùng chung

    \# File                   Màn hình                     Trạng thái
  ---- ---------------------- ---------------------------- ------------
     1 `index.html`           Landing Page                 ⬜
     2 `login.html`           Login + Demo Role Switcher   ⬜
     3 `profile.html`         Profile                      ⬜
     4 `notifications.html`   Notifications                ⬜
     5 `404.html`             Error Page 403/404           ⬜

### 5.2. Client

  ------------------------------------------------------------------------------------------------------
              \# File                             Màn hình    CRUD / nghiệp vụ  AI           Trạng thái
  -------------- -------------------------------- ----------- ----------------- ------------ -----------
               6 `client-creative-brief.html`     Creative    R / nhập & cập    AI Brief     ⬜
                                                  Brief       nhật brief        Structurer   

               7 `client-review-versions.html`    Review      C/R/U, comment,   ---          ⬜
                                                  Versions    approve/request                
                                                              changes                        

               8 `client-project-overview.html`   Project     C/R/U/D hoặc      ---          ⬜
                                                  Overview    Archive                        
  ------------------------------------------------------------------------------------------------------

### 5.3. Designer

  ----------------------------------------------------------------------------------------------------
              \# File                                 Màn hình     CRUD /      AI          Trạng thái
                                                                   nghiệp vụ               
  -------------- ------------------------------------ ------------ ----------- ----------- -----------
               9 `designer-dashboard.html`            Designer     R           ---         ⬜
                                                      Dashboard                            

              10 `designer-moodboard.html`            Moodboard    C/R/U       AI Mood     ⬜
                                                                               Keyword     
                                                                               Assistant   

              11 `designer-version-management.html`   Version      C/R/U/D     ---         ⬜
                                                      Management   hoặc                    
                                                                   Archive                 
  ----------------------------------------------------------------------------------------------------

### 5.4. Creative Lead

  ----------------------------------------------------------------------------------------------
              \# File                           Màn hình    CRUD /      AI           Trạng thái
                                                            nghiệp vụ                
  -------------- ------------------------------ ----------- ----------- ------------ -----------
              12 `lead-task-board.html`         Task Board  R / phân    ---          ⬜
                                                            công &                   
                                                            trạng thái               
                                                            task                     

              13 `lead-internal-review.html`    Internal    C/R/U       ---          ⬜
                                                Review                               

              14 `lead-feedback-summary.html`   Feedback    C/R/U/D     AI Feedback  ⬜
                                                Summary     hoặc        Summarizer   
                                                            Archive                  
  ----------------------------------------------------------------------------------------------

### 5.5. Admin

  --------------------------------------------------------------------------------------------------------------
              \# File                                     Màn hình     CRUD / nghiệp vụ  AI          Trạng thái
  -------------- ---------------------------------------- ------------ ----------------- ----------- -----------
              15 `admin-brief-template-management.html`   Brief        R                 ---         ⬜
                                                          Template                                   
                                                          Management                                 

              16 `admin-user-management.html`             User         C/R/U             ---         ⬜
                                                          Management                                 

              17 `admin-project-settings.html`            Project      C/R/U/D hoặc      ---         ⬜
                                                          Settings     Disable/Archive               
  --------------------------------------------------------------------------------------------------------------

> **Lưu ý:** 17 màn hình là Screen Inventory hiện tại trên Trello, không
> phải giới hạn cứng. Nếu trong quá trình hoàn thiện luồng nghiệp vụ
> phát sinh màn hình cần thiết, nhóm phải cập nhật Screen Inventory và
> README.

------------------------------------------------------------------------

## 6. Các tính năng AI bắt buộc

### AI-1 -- Brief Structurer

Dùng tại `client-creative-brief.html`.

Mục tiêu: chuyển mô tả tự do của khách hàng thành brief có cấu trúc.

Luồng:

``` text
User Input
→ Validation
→ AI Processing
→ Result
→ Explanation
→ Accept / Edit / Reject / Regenerate
→ Save
```

### AI-2 -- Mood Keyword Assistant

Dùng tại `designer-moodboard.html`.

Mục tiêu: gợi ý các từ khóa phong cách phù hợp với moodboard hoặc brief.

### AI-3 -- Feedback Summarizer

Dùng tại `lead-feedback-summary.html`.

Mục tiêu: tổng hợp feedback thành các action item dễ xử lý.

### Trạng thái AI thất bại

Mỗi tính năng AI phải có ít nhất một trường hợp không thành công hoặc
không chắc chắn, ví dụ:

-   Không đủ dữ liệu để đưa ra đề xuất.
-   AI chưa chắc chắn về kết quả.
-   Không thể xử lý yêu cầu lúc này.

Người dùng phải có quyền **Edit / Retry / Skip / Reject / xử lý thủ
công** thay vì buộc phải chấp nhận kết quả AI.

------------------------------------------------------------------------

## 7. Dữ liệu và CRUD

Các entity chính:

``` text
projects
briefs
moodboards
versions
comments
tasks
```

Có thể triển khai dữ liệu bằng:

-   JSON cục bộ.
-   LocalStorage / SessionStorage.
-   JSON Server / MockAPI.
-   Public API khi phù hợp.
-   LLM API là tùy chọn.

Không viết cứng dữ liệu nghiệp vụ rải rác trong từng file nếu có thể
tách thành mock data hoặc module dùng chung.

------------------------------------------------------------------------

## 8. Shared UI và Navigation

Theo TASK-05 trên Trello, phần giao diện dùng chung cần có:

-   Header / Navbar.
-   Sidebar.
-   Avatar.
-   Notifications / chuông hoạt động.
-   Menu mobile.
-   Menu điều hướng theo vai trò.
-   Demo Role Switcher cho 4 vai trò.
-   Ghi nhớ role đã chọn.
-   Active state cho trang hiện tại.
-   Kiểm tra quyền truy cập theo role.
-   CSS/JavaScript dùng chung.
-   Component, màu sắc, typography, spacing và design token thống nhất.

Các màn hình của SV1, SV2 và SV3 phải sử dụng chung hệ thống này để
tránh tạo thành các website con rời rạc.

------------------------------------------------------------------------

## 9. Responsive và trạng thái giao diện

Mỗi màn hình phải được kiểm tra tối thiểu trên:

-   Desktop.
-   Tablet/mobile.

Các trạng thái cần xem xét tùy chức năng:

-   Normal.
-   Loading.
-   Empty.
-   Success.
-   Error.
-   Disabled.
-   Pending.
-   Rejected.
-   Completed.
-   Cancelled / Archived nếu nghiệp vụ có sử dụng.

Không bắt buộc mọi màn hình phải có tất cả trạng thái, nhưng các trạng
thái phù hợp với nghiệp vụ phải được triển khai và kiểm thử.

------------------------------------------------------------------------

## 10. Cấu trúc thư mục dự kiến

``` text
project-root/
├── README.md
├── index.html
├── pages/
│   ├── login.html
│   ├── profile.html
│   ├── notifications.html
│   ├── 404.html
│   ├── client-creative-brief.html
│   ├── client-review-versions.html
│   ├── client-project-overview.html
│   ├── designer-dashboard.html
│   ├── designer-moodboard.html
│   ├── designer-version-management.html
│   ├── lead-task-board.html
│   ├── lead-internal-review.html
│   ├── lead-feedback-summary.html
│   ├── admin-brief-template-management.html
│   ├── admin-user-management.html
│   └── admin-project-settings.html
├── assets/
│   ├── images/
│   ├── icons/
│   └── data/
├── css/
│   ├── style.css
│   └── responsive.css
├── js/
│   ├── main.js
│   ├── api.js
│   └── modules/
├── design/
│   ├── figma-link.txt
│   └── mockups/
└── docs/
    ├── project-proposal.md
    ├── roles-and-features.md
    ├── screen-list.md
    ├── team-assignment.md
    └── ai-usage-report.md
```

Cấu trúc thực tế có thể điều chỉnh, nhưng cần giữ tính rõ ràng và tái sử
dụng.

------------------------------------------------------------------------

## 11. Phân công nhóm

Theo hướng dẫn BTL:

### SV1 -- Client

-   Phụ trách chính các màn hình Client.
-   Tham gia phần giao diện dùng chung.
-   Responsive và test phần Client.
-   Có HTML + CSS + JavaScript + Git + OBS trong phần việc của mình.

### SV2 -- Designer

-   Phụ trách các màn hình Designer.
-   Tham gia JavaScript / mock data / LocalStorage.
-   Responsive và test phần Designer.
-   Review PR của thành viên khác.

### SV3 -- Creative Lead + Admin

-   Phụ trách các màn hình Creative Lead và Admin.
-   Tích hợp layout/navigation/dashboard/admin.
-   Responsive và test phần Lead/Admin.
-   Kiểm tra tính nhất quán toàn dự án.

> Mỗi sinh viên phải tự hoàn thành ít nhất một luồng end-to-end:
> **Mockup → HTML → CSS → JavaScript → Data → Responsive → Branch →
> Commit → PR → OBS**.

------------------------------------------------------------------------

## 12. Kế hoạch công việc theo Trello

Các task chính đang được tổ chức theo hướng sau:

  -----------------------------------------------------------------------
  Task                    Nội dung                Phụ trách
  ----------------------- ----------------------- -----------------------
  TASK-01                 Khởi tạo GitHub +       Cả nhóm
                          Trello + cấu trúc dự án 

  TASK-02                 Sitemap + User Flow +   Cả nhóm
                          Screen Inventory        

  TASK-03                 Wireframe + UI Kit trên Nhóm / SV1 chủ trì
                          Figma                   

  TASK-04                 High-Fidelity Mockup 17 Cả nhóm
                          màn hình + duyệt Figma  

  TASK-05                 Navbar + Sidebar + Role Cả nhóm
                          Switcher + CSS/JS chung 

  TASK-06 → TASK-09       Client: Creative Brief, SV1
                          Review Versions,        
                          Project Overview,       
                          Responsive/Test         

  TASK-10 → TASK-14       Designer: Dashboard,    SV2
                          Moodboard + AI, Version 
                          Management,             
                          Data/LocalStorage,      
                          Responsive/Test         

  TASK-15 → TASK-21       Lead/Admin + AI         SV3
                          Feedback Summarizer +   
                          Responsive/Test         

  TASK-22 → TASK-26       Landing, Login,         Theo phân công nhóm
                          Profile, Notifications, 
                          Error Page              

  TASK-27                 Kiểm thử tích hợp E2E   Cả nhóm
                          toàn website            

  TASK-28                 README + docs + cập     Cả nhóm
                          nhật Screen Inventory   

  TASK-29                 OBS + GitHub/PR + minh  Cả nhóm
                          chứng + Release         
  -----------------------------------------------------------------------

Luồng Trello:

``` text
TỒN ĐỌNG
→ CẦN LÀM
→ ĐANG LÀM
→ CHỜ DUYỆT
→ HOÀN THÀNH
```

Mỗi task cần ghi rõ:

-   Mã task.
-   Màn hình / file.
-   Người thực hiện.
-   Deadline.
-   Branch.
-   Commit / Pull Request.
-   Link OBS sau khi hoàn thành.

------------------------------------------------------------------------

## 13. Git/GitHub Workflow

### Branch

``` text
main
dev
feature/<feature-name>
fix/<bug-name>
docs/<document-name>
```

Ví dụ:

``` text
feature/client-creative-brief
feature/designer-moodboard
feature/lead-task-board
fix/mobile-navigation
docs/update-readme
```

### Quy trình

``` text
Trello Task
→ Create Branch
→ Code
→ Commit
→ Push
→ Pull Request
→ Cross Review
→ Merge dev
→ Integration Test
→ Merge main
```

### Commit convention

Nên sử dụng commit có ý nghĩa:

``` text
feat: add responsive dashboard layout
feat: render data from mock json
feat: add ai recommendation state
fix: validate empty form inputs
style: improve mobile navigation
refactor: split reusable ui modules
docs: update screen list and obs links
```

Không sử dụng commit chung chung như:

``` text
update
done
final
fix code
```

------------------------------------------------------------------------

## 14. Definition of Done cho mỗi màn hình

Một màn hình chỉ được đánh dấu **DONE** khi các mục phù hợp đã hoàn
thành:

-   [ ] Mockup Figma/Canva đã được duyệt.
-   [ ] Đúng tên file HTML trong Screen Inventory.
-   [ ] HTML semantic.
-   [ ] CSS hoàn chỉnh và thống nhất UI Kit.
-   [ ] Responsive desktop + tablet/mobile.
-   [ ] Có ít nhất một tương tác JavaScript có ý nghĩa.
-   [ ] Form có validation nếu có biểu mẫu.
-   [ ] Dữ liệu mock/API/LocalStorage nếu cần.
-   [ ] Có empty state.
-   [ ] Có loading/error state khi phù hợp.
-   [ ] Có các trạng thái nghiệp vụ cần thiết.
-   [ ] Có accessibility cơ bản.
-   [ ] Navigation hoạt động đúng.
-   [ ] Kiểm tra quyền truy cập theo role nếu áp dụng.
-   [ ] Pull Request đã được review.
-   [ ] Merge vào `dev`.
-   [ ] Test tích hợp.
-   [ ] Video OBS.
-   [ ] README / Screen Inventory được cập nhật.

------------------------------------------------------------------------

## 15. Kiểm thử

### Functional Test

-   Navigation hoạt động đúng.
-   Role Switcher hoạt động đúng.
-   CRUD mô phỏng hoạt động.
-   Search/filter hoạt động.
-   Validation hoạt động.
-   LocalStorage/mock data được đọc/ghi đúng.
-   Các trạng thái nghiệp vụ thay đổi đúng.
-   AI flow có đủ input → processing → result → user control.

### Responsive Test

Kiểm tra:

-   Navbar/Sidebar.
-   Menu mobile.
-   Form.
-   Table/Card.
-   Dashboard.
-   Modal.
-   Button.
-   Text overflow.
-   Hình ảnh.
-   Các màn hình AI.

### Integration / E2E

Kiểm tra các luồng chính từ đầu đến cuối theo từng role, đặc biệt khi dữ
liệu hoặc trạng thái được chuyển giữa nhiều màn hình.

------------------------------------------------------------------------

## 16. Video OBS và minh chứng

**Mỗi màn hình độc lập trong Screen Inventory cuối cùng = 1 video OBS.**

Mỗi video cần:

1.  Có mặt sinh viên thực hiện.
2.  Hiển thị mockup Figma/Canva.
3.  Mở đúng HTML/CSS/JavaScript.
4.  Giải thích layout và logic.
5.  Thực hiện ít nhất một chỉnh sửa trực tiếp.
6.  Chạy thử tương tác.
7.  Commit lên GitHub.
8.  Nêu rõ Task / Branch / Commit.

Quy tắc đặt tên:

``` text
SV1-01-screen-name.mp4
SV1-02-screen-name.mp4
SV2-01-screen-name.mp4
SV3-01-screen-name.mp4
```

------------------------------------------------------------------------

## 17. Bảng minh chứng

Cập nhật bảng này trong quá trình thực hiện:

  ---------------------------------------------------------------------------------------------------------------------------------------
  Task      Screen/File                              Thành    Branch                                  Commit   PR       OBS      Status
                                                     viên                                                                        
  --------- ---------------------------------------- -------- --------------------------------------- -------- -------- -------- --------
  TASK-06   `client-creative-brief.html`             SV1      `feature/client-creative-brief`         TODO     TODO     TODO     ⬜

  TASK-07   `client-review-versions.html`            SV1      `feature/client-review-versions`        TODO     TODO     TODO     ⬜

  TASK-08   `client-project-overview.html`           SV1      `feature/client-project-overview`       TODO     TODO     TODO     ⬜

  TASK-10   `designer-dashboard.html`                SV2      `feature/designer-dashboard`            TODO     TODO     TODO     ⬜

  TASK-11   `designer-moodboard.html`                SV2      `feature/designer-moodboard`            TODO     TODO     TODO     ⬜

  TASK-12   `designer-version-management.html`       SV2      `feature/designer-version-management`   TODO     TODO     TODO     ⬜

  TASK-15   `lead-task-board.html`                   SV3      `feature/lead-task-board`               TODO     TODO     TODO     ⬜

  TASK-16   `lead-internal-review.html`              SV3      `feature/lead-internal-review`          TODO     TODO     TODO     ⬜

  TASK-17   `lead-feedback-summary.html`             SV3      `feature/lead-feedback-summary`         TODO     TODO     TODO     ⬜

  TASK-18   `admin-brief-template-management.html`   SV3      `feature/admin-brief-template`          TODO     TODO     TODO     ⬜

  TASK-19   `admin-user-management.html`             SV3      `feature/admin-user-management`         TODO     TODO     TODO     ⬜

  TASK-20   `admin-project-settings.html`            SV3      `feature/admin-project-settings`        TODO     TODO     TODO     ⬜
  ---------------------------------------------------------------------------------------------------------------------------------------

> Thêm các màn hình dùng chung và cập nhật mã task/branch theo Trello
> thực tế khi bắt đầu code.

------------------------------------------------------------------------

## 18. Figma / Design

Trước khi code chính thức cần bảo đảm đã có:

-   Sitemap.
-   User Flow.
-   Screen Inventory.
-   Wireframe.
-   UI Kit.
-   Design tokens.
-   Desktop mockup.
-   Responsive/mobile mockup chính.
-   Loading / empty / error state.
-   AI interaction mockup.

**Figma hiện có trên Trello:**\
`https://www.figma.com/make/pFN0zbq56SV69UOs2bPNZT/CreatorStudio-Dashboard-UI`

> Nếu nhóm thay đổi link Figma chính thức, cập nhật lại mục này.

------------------------------------------------------------------------

## 19. Báo cáo sử dụng AI

Tạo file:

``` text
docs/ai-usage-report.md
```

Nội dung cần khai báo:

-   Công cụ AI đã sử dụng.
-   Prompt chính.
-   Nội dung AI sinh ra.
-   Nội dung sinh viên đã chỉnh sửa.
-   Lỗi AI gặp phải.
-   Cách kiểm chứng.
-   Kiến thức sinh viên học được.
-   Tính năng nào là mock.
-   Tính năng nào sử dụng API thật (nếu có).

------------------------------------------------------------------------

## 20. Checklist MVP trước khi nộp

-   [ ] Đủ các vai trò Client / Designer / Creative Lead / Admin.
-   [ ] Screen Inventory cuối cùng đã cập nhật.
-   [ ] Toàn bộ màn hình cần thiết đã triển khai.
-   [ ] Navigation xuyên suốt.
-   [ ] Shared UI nhất quán.
-   [ ] Responsive.
-   [ ] CRUD mô phỏng có ý nghĩa.
-   [ ] Search / filter / validation.
-   [ ] Mock data / JSON / LocalStorage hoặc API.
-   [ ] AI Brief Structurer.
-   [ ] AI Mood Keyword Assistant.
-   [ ] AI Feedback Summarizer.
-   [ ] AI có trạng thái loading/result/error và quyền kiểm soát của
    người dùng.
-   [ ] Empty/loading/error states phù hợp.
-   [ ] Test E2E.
-   [ ] Trello được cập nhật.
-   [ ] Git history rõ ràng.
-   [ ] Feature branches + Pull Requests + review.
-   [ ] Merge và test trên `dev`.
-   [ ] README hoàn chỉnh.
-   [ ] `docs/ai-usage-report.md`.
-   [ ] OBS cho từng màn hình.
-   [ ] Link Task ↔ Branch ↔ Commit ↔ PR ↔ Screen ↔ OBS đầy đủ.
-   [ ] Release/final version trên `main`.

------------------------------------------------------------------------

## 21. Liên kết dự án

  --------------------------------------------------------------------------------------------------------------------
  Tài nguyên                          Link
  ----------------------------------- --------------------------------------------------------------------------------
  GitHub Repository                   `TODO`

  Trello Board                        `https://trello.com/b/lYefCZHz`

  Figma                               `https://www.figma.com/make/pFN0zbq56SV69UOs2bPNZT/CreatorStudio-Dashboard-UI`

  Screen Inventory                    `TODO`

  OBS Folder                          `TODO`

  Demo/Deployment                     `TODO`
  --------------------------------------------------------------------------------------------------------------------

------------------------------------------------------------------------

## 22. Thành viên

  Thành viên   Vai trò/phần phụ trách                             GitHub
  ------------ -------------------------------------------------- --------
  SV1          Client + shared UI + responsive Client             `TODO`
  SV2          Designer + JavaScript/data + responsive Designer   `TODO`
  SV3          Creative Lead + Admin + integration/release        `TODO`

------------------------------------------------------------------------

## 23. Nguyên tắc hoàn thiện dự án

Nhóm cần chứng minh được chuỗi phát triển:

``` text
Ngữ cảnh
→ Vấn đề
→ Mục tiêu
→ Vai trò
→ User Flow
→ Screen Inventory
→ Mockup
→ Trello Task
→ Branch
→ Code
→ Commit
→ Pull Request
→ Review
→ OBS
→ Sản phẩm hoàn chỉnh
```

Mục tiêu không phải chỉ đủ số lượng màn hình, mà là **đủ nghiệp vụ, đủ
trạng thái, có thể chạy thử end-to-end và chứng minh rõ quá trình mỗi
thành viên thực hiện sản phẩm**.
