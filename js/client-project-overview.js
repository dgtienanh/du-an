"use strict";
(() => {
  const { $, $$, escape, read, write, toast, pill, url, confirmAction } = CS;
  if (!CS.shell("projects", "Dự án của tôi")) return;
  let filter = "all",
    editing = null;
  const dialog = $("#project-dialog");
  function render() {
    const data = read();
    const visible = data.projects.filter((p) => p.status !== "Archived");
    $("#stat-total").textContent = visible.length;
    $("#stat-active").textContent = visible.filter(
      (p) => p.status === "Active",
    ).length;
    $("#stat-review").textContent = visible.filter(
      (p) => p.status === "In Review",
    ).length;
    $("#stat-done").textContent = visible.filter(
      (p) => p.status === "Completed",
    ).length;
    const query = $("#search").value.trim().toLocaleLowerCase("vi");
    const projects = data.projects.filter(
      (p) =>
        (filter === "all" ? p.status !== "Archived" : p.status === filter) &&
        `${p.name} ${p.category} ${p.description}`
          .toLocaleLowerCase("vi")
          .includes(query),
    );
    $("#result-count").textContent =
      `${projects.length} dự án ${query ? "phù hợp" : ""}`;
    $("#project-list").innerHTML =
      projects
        .map(
          (p) =>
            `<article class="project-card"><div class="project-art"><img src="assets/images/${escape(p.art)}-v2.svg" alt="Thiết kế minh họa cho ${escape(p.name)}">${pill(p.status)}</div><div class="card-content"><span class="category-label">${escape(p.category)} / CREATIVE PROJECT</span><h3 title="${escape(p.name)}">${escape(p.name)}</h3><p>${escape(p.description)}</p><div class="card-meta"><span>Tiến độ <strong>${p.progress}%</strong></span><span>Hạn: ${escape(new Date(p.deadline + "T00:00:00").toLocaleDateString("vi-VN"))}</span></div><progress value="${p.progress}" max="100" aria-label="Tiến độ ${escape(p.name)}"></progress><div class="card-footer">${p.status === "Archived" ? `<button class="btn small" data-action="restore" data-id="${escape(p.id)}">Khôi phục ↶</button>` : `<a class="text-button" href="${url("client-creative-brief", p.id)}">${p.brief?.submitted ? "Xem brief" : "Viết brief"} →</a><a class="btn small" href="${url("client-review-versions", p.id)}">Xem phiên bản →</a>`}</div><div class="card-menu">${p.status === "Archived" ? `<button data-action="delete" data-id="${escape(p.id)}">Xóa vĩnh viễn</button>` : `<button data-action="edit" data-id="${escape(p.id)}">Chỉnh sửa</button><span class="muted">·</span><button data-action="archive" data-id="${escape(p.id)}">Lưu trữ</button>`}</div></div></article>`,
        )
        .join("") +
      (!query && filter === "all"
        ? `<article class="new-card"><span>＋</span><h3>Ý tưởng tiếp theo của bạn?</h3><p>Bắt đầu một dự án mới và cùng biến ý tưởng thành hiện thực.</p><button class="btn small" id="create-card">Tạo dự án mới →</button></article>`
        : "");
    if (!projects.length && !(filter === "all" && !query))
      $("#project-list").innerHTML =
        '<div class="empty"><span class="empty-icon">⌕</span><h3>Chưa có dự án phù hợp</h3><p>Thử một từ khóa hoặc trạng thái khác.</p><button class="btn" id="reset-filter">Xóa bộ lọc</button></div>';
    $("#reset-filter")?.addEventListener("click", () => {
      filter = "all";
      $("#search").value = "";
      setTabs();
      render();
    });
    $("#create-card")?.addEventListener("click", () => openForm());
  }
  function setTabs() {
    $$("[data-filter]").forEach((b) => {
      b.classList.toggle("active", b.dataset.filter === filter);
      b.setAttribute("aria-pressed", String(b.dataset.filter === filter));
    });
  }
  function openForm(id) {
    editing = id || null;
    const p = read().projects.find((p) => p.id === id);
    $("#project-form").reset();
    $("#project-error").textContent = "";
    $("#dialog-title").textContent = p ? "Chỉnh sửa dự án" : "Tạo dự án mới";
    $("#save-project").textContent = p
      ? "Lưu thay đổi"
      : "Tạo dự án & viết brief →";
    $("#project-name").value = p?.name || "";
    $("#project-category").value = p?.category || "Branding";
    $("#project-deadline").value = p?.deadline || "";
    $("#project-description").value = p?.description || "";
    dialog.showModal();
  }
  $("#new-project").onclick = () => openForm();
  $("#close-dialog").onclick = $("#cancel-project").onclick = () =>
    dialog.close();
  $("#search").oninput = render;
  $$("[data-filter]").forEach(
    (b) =>
      (b.onclick = () => {
        filter = b.dataset.filter;
        setTabs();
        render();
      }),
  );
  $("#project-form").onsubmit = (e) => {
    e.preventDefault();
    const name = $("#project-name").value.trim(),
      description = $("#project-description").value.trim();
    if (!name || !description) {
      $("#project-error").textContent =
        "Tên dự án và ý tưởng không được chỉ chứa khoảng trắng.";
      return;
    }
    const data = read();
    const values = {
      name,
      description,
      category: $("#project-category").value,
      deadline: $("#project-deadline").value,
    };
    const id = editing || "p-" + crypto.randomUUID();
    if (editing) {
      Object.assign(
        data.projects.find((p) => p.id === editing),
        values,
      );
    } else {
      data.projects.unshift({
        ...values,
        id,
        status: "Active",
        progress: 0,
        art:
          values.category === "UI/UX"
            ? "forma"
            : values.category === "Campaign"
              ? "sunday"
              : "moc",
        versionStatus: null,
        comments: [],
        brief: null,
      });
    }
    if (!write(data)) return;
    dialog.close();
    if (editing) {
      toast("Đã cập nhật dự án.");
      render();
    } else location.href = url("client-creative-brief", id);
  };
  $("#project-list").onclick = (e) => {
    const b = e.target.closest("[data-action]");
    if (!b) return;
    const id = b.dataset.id,
      action = b.dataset.action;
    if (action === "edit") {
      openForm(id);
      return;
    }
    confirmAction(
      action === "delete"
        ? "Xóa vĩnh viễn dự án?"
        : action === "archive"
          ? "Lưu trữ dự án?"
          : "Khôi phục dự án?",
      action === "delete"
        ? "Brief và phản hồi của dự án sẽ bị xóa. Thao tác không thể hoàn tác."
        : action === "archive"
          ? "Dự án chuyển sang chế độ chỉ đọc. Bạn có thể khôi phục từ tab Lưu trữ."
          : "Dự án sẽ trở lại trạng thái trước khi lưu trữ.",
      () => {
        const data = read();
        const p = data.projects.find((p) => p.id === id);
        if (!p) return;
        if (action === "delete")
          data.projects = data.projects.filter((p) => p.id !== id);
        if (action === "archive") {
          p.previousStatus = p.status;
          p.status = "Archived";
        }
        if (action === "restore") p.status = p.previousStatus || "Active";
        if (write(data)) {
          render();
          toast(
            action === "delete"
              ? "Đã xóa dự án."
              : action === "archive"
                ? "Đã lưu trữ dự án."
                : "Đã khôi phục dự án.",
          );
        }
      },
    );
  };
  render();
})();
