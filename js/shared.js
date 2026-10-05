"use strict";
window.CS = (() => {
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [
    ...scope.querySelectorAll(selector),
  ];
  const escape = (value) =>
    String(value ?? "").replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
  const key = "creatorstudio.sv1.v1";
  const initial = () => ({
    projects: [
      {
        id: "p1",
        name: "Mộc — Bản sắc từ thiên nhiên",
        category: "Branding",
        description:
          "Bộ nhận diện cho thương hiệu chăm sóc da thuần chay. Tối giản, tự nhiên, gần gũi với người trẻ.",
        deadline: "2026-11-20",
        status: "In Review",
        progress: 75,
        art: "moc",
        versionStatus: "Client Review",
        comments: [],
        brief: null,
      },
      {
        id: "p2",
        name: "Forma — Không gian sống mới",
        category: "UI/UX",
        description:
          "Website giới thiệu bộ sưu tập nội thất hiện đại, ưu tiên trải nghiệm trên thiết bị di động.",
        deadline: "2026-12-05",
        status: "Active",
        progress: 35,
        art: "forma",
        versionStatus: "Client Review",
        comments: [],
        brief: null,
      },
      {
        id: "p3",
        name: "Sunday — Một chút rực rỡ",
        category: "Campaign",
        description:
          "Chiến dịch giới thiệu đồ uống mùa hè, màu sắc tươi sáng và tinh thần lạc quan.",
        deadline: "2026-11-28",
        status: "Active",
        progress: 50,
        art: "sunday",
        versionStatus: "Client Review",
        comments: [],
        brief: null,
      },
      {
        id: "p4",
        name: "Élan — Cảm hứng mỗi ngày",
        category: "Branding",
        description: "Hệ thống nhận diện cho studio sáng tạo độc lập.",
        deadline: "2026-10-01",
        status: "Completed",
        progress: 100,
        art: "elan",
        versionStatus: "Approved",
        comments: [],
        brief: null,
      },
    ],
  });
  function read() {
    try {
      const value = JSON.parse(localStorage.getItem(key));
      return value && Array.isArray(value.projects) ? value : initial();
    } catch {
      return initial();
    }
  }
  function write(value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      toast(
        "Không thể lưu dữ liệu. Hãy kiểm tra quyền lưu trữ hoặc dung lượng trình duyệt.",
      );
      return false;
    }
  }
  function session() {
    try {
      return JSON.parse(sessionStorage.getItem("cs.session"));
    } catch {
      return null;
    }
  }
  function login(role, email = "khachhang@demo.vn") {
    try {
      sessionStorage.setItem(
        "cs.session",
        JSON.stringify({ role, email, name: "Minh Anh" }),
      );
      return true;
    } catch {
      toast("Trình duyệt không cho phép lưu phiên demo.");
      return false;
    }
  }
  function toast(message) {
    let el = $("#toast");
    if (!el) {
      el = document.createElement("div");
      el.id = "toast";
      el.className = "toast";
      el.setAttribute("role", "status");
      document.body.append(el);
    }
    el.textContent = message;
    el.hidden = false;
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => (el.hidden = true), 4200);
  }
  const labels = {
    Active: "Đang thực hiện",
    "In Review": "Chờ phản hồi",
    Completed: "Hoàn thành",
    Archived: "Đã lưu trữ",
    "Client Review": "Chờ duyệt",
    Approved: "Đã phê duyệt",
    "Changes Requested": "Yêu cầu chỉnh sửa",
  };
  const pill = (status) =>
    `<span class="pill ${escape(status.replaceAll(" ", ""))}"><span class="badge-dot"></span>${escape(labels[status] || status)}</span>`;
  const url = (page, id) =>
    `${page}.html${id ? "?project=" + encodeURIComponent(id) : ""}`;
  function project() {
    return read().projects.find(
      (p) => p.id === new URLSearchParams(location.search).get("project"),
    );
  }
  function update(id, fn) {
    const data = read();
    const p = data.projects.find((p) => p.id === id);
    if (!p) {
      toast("Dự án không còn tồn tại.");
      return false;
    }
    fn(p);
    return write(data);
  }
  function shell(active, title) {
    const user = session();
    if (!user) {
      location.replace("login.html");
      return false;
    }
    const main = $("main");
    document.body.classList.add("app");
    const content = main.outerHTML;
    document.body.innerHTML = `<a class="skip-link" href="#main">Đến nội dung chính</a><div class="app-shell"><aside class="sidebar" id="sidebar"><a class="brand" href="index.html"><span class="brand-mark">✳</span>CreatorStudio<span class="brand-dot">.</span></a><p class="nav-label">KHÔNG GIAN KHÁCH HÀNG</p><nav aria-label="Điều hướng chính">${[
      ["projects", "▦", "Dự án của tôi", "client-project-overview"],
      ["brief", "▤", "Creative Brief", "client-creative-brief"],
      ["review", "◫", "Duyệt phiên bản", "client-review-versions"],
    ]
      .map(
        ([id, icon, label, page]) =>
          `<a class="nav-link ${active === id ? "active" : ""}" ${active === id ? 'aria-current="page"' : ""} href="${url(page, project()?.id)}"><span aria-hidden="true">${icon}</span>${label}</a>`,
      )
      .join(
        "",
      )}</nav><div class="sidebar-note"><span class="eyebrow">Cùng nhau sáng tạo</span><h3>Ý tưởng hay bắt đầu<br>từ một brief tốt.</h3><p>Chia sẻ điều bạn mong muốn.<br>Chúng tôi giúp bạn kết nối.</p><a class="btn small" href="client-creative-brief.html">Viết brief mới →</a></div></aside><div class="workspace"><header class="topbar"><button class="btn mobile-menu" aria-controls="sidebar" aria-expanded="false" aria-label="Mở menu">☰</button><span class="breadcrumb">Không gian làm việc <span class="breadcrumb-separator">/</span> ${escape(title)}</span><div class="topbar-right"><span class="pill">Bản demo • SV1</span><span class="divider"></span><div class="user-chip"><span class="avatar">MA</span><div><strong>${escape(user.name)}</strong><small>${escape(user.role)}</small></div></div><button class="text-button" id="logout">Thoát</button></div></header>${content}</div></div>`;
    $(".mobile-menu").addEventListener("click", (e) => {
      const open = $("#sidebar").classList.toggle("open");
      e.currentTarget.setAttribute("aria-expanded", String(open));
    });
    $("#logout").addEventListener("click", () => {
      sessionStorage.removeItem("cs.session");
      location.href = "login.html";
    });
    if (user.role !== "Client") {
      $("main").innerHTML =
        `<div class="panel security-notice"><span class="eyebrow">403 · Phân quyền demo</span><h1>Không gian dành cho Client</h1><p>5 trang này thuộc phần việc SV1. Các màn hình ${escape(user.role)} được phân công cho SV2/SV3 và chưa nằm trong bộ giao diện này.</p><div class="actions dialog-actions"><button class="btn primary" id="switch-client">Trải nghiệm vai trò Client</button><a class="btn" href="index.html">Về trang chủ</a></div></div>`;
      $("#switch-client").onclick = () => {
        if (login("Client")) location.reload();
      };
      return false;
    }
    return true;
  }
  function selectProject(container, onChange) {
    const data = read().projects.filter((p) => p.status !== "Archived");
    const current = project();
    $(container).innerHTML =
      `<option value="">Chọn dự án…</option>${data.map((p) => `<option value="${escape(p.id)}" ${current?.id === p.id ? "selected" : ""}>${escape(p.name)}</option>`).join("")}`;
    $(container).onchange = (e) => {
      location.href = url(onChange, e.target.value);
    };
    return current;
  }
  function confirmAction(title, description, onConfirm) {
    const dialog = document.createElement("dialog");
    dialog.innerHTML = `<h2>${escape(title)}</h2><p>${escape(description)}</p><div class="actions dialog-actions"><button class="btn" data-no>Hủy</button><button class="btn primary" data-yes>Xác nhận</button></div>`;
    document.body.append(dialog);
    dialog.showModal();
    $("[data-no]", dialog).onclick = () => dialog.close();
    $("[data-yes]", dialog).onclick = () => {
      dialog.close();
      onConfirm();
    };
    dialog.addEventListener("close", () => dialog.remove());
  }
  return {
    $,
    $$,
    escape,
    read,
    write,
    session,
    login,
    toast,
    pill,
    url,
    project,
    update,
    shell,
    selectProject,
    confirmAction,
  };
})();
