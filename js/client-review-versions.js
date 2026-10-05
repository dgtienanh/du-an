"use strict";
(() => {
  const { $, $$, escape, toast, pill, update, confirmAction } = CS;
  if (!CS.shell("review", "Duyệt phiên bản")) return;
  let p = CS.selectProject("#project-select", "client-review-versions");
  if (!p || !p.versionStatus) {
    $("#review-workspace").hidden = true;
    $("#review-empty").hidden = false;
    if (p) {
      $("#empty-title").textContent = "Thiết kế chưa được gửi duyệt";
      $("#empty-description").textContent =
        "Dự án mới chưa có phiên bản. Hãy hoàn thiện brief; quy trình upload của Designer thuộc phần SV2.";
      $("#brief-link").href = CS.url("client-creative-brief", p.id);
    }
    $("#moodboard").hidden = true;
    return;
  }
  const dialog = $("#comment-dialog");
  let mode = "side",
    filter = "all",
    editing = null,
    pending = null,
    focused = null;
  $("#old-image").src = `assets/images/${p.art}-v1.svg`;
  $("#new-image").src = `assets/images/${p.art}-v2.svg`;
  $("#brief-link").href = CS.url("client-creative-brief", p.id);
  function locked() {
    return p.status === "Archived" || p.versionStatus === "Approved";
  }
  function refresh() {
    p = CS.read().projects.find((item) => item.id === p.id);
    render();
  }
  function focusPin(id) {
    filter = "all";
    $$("[data-comments]").forEach((button) => {
      const active = button.dataset.comments === "all";
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    focused = id;
    render();
    $("#comment-" + id)?.scrollIntoView({
      block: "nearest",
      behavior: "smooth",
    });
  }
  function render() {
    const comments = p.comments || [];
    $("#version-status").innerHTML = pill(
      p.status === "Archived" ? "Archived" : p.versionStatus,
    );
    $("#comment-count").textContent = comments.length;
    $("#pins").innerHTML = comments
      .map(
        (c, i) =>
          `<button class="pin ${c.resolved ? "resolved" : ""} ${focused === c.id ? "highlight" : ""}" style="left:${c.x * 100}%;top:${c.y * 100}%" data-pin="${escape(c.id)}" aria-label="Phản hồi ${i + 1}: ${escape(c.text)}">${i + 1}</button>`,
      )
      .join("");
    const visible = comments.filter(
      (c) =>
        filter === "all" || (filter === "resolved" ? c.resolved : !c.resolved),
    );
    $("#comment-list").innerHTML = visible.length
      ? visible
          .map(
            (c) =>
              `<article class="comment-card ${c.resolved ? "resolved" : ""} ${focused === c.id ? "focused" : ""}" id="comment-${escape(c.id)}"><div class="comment-head"><button class="comment-number" data-focus="${escape(c.id)}" aria-label="Xem vị trí phản hồi ${comments.indexOf(c) + 1}">${comments.indexOf(c) + 1}</button><strong>Minh Anh</strong><time>${escape(new Date(c.createdAt).toLocaleDateString("vi-VN"))}</time></div><p>${escape(c.text)}</p><div class="comment-actions">${locked() ? `<span class="pill">${c.resolved ? "Đã xử lý" : "Đã ghi nhận"}</span>` : `<button data-action="resolve" data-id="${escape(c.id)}">${c.resolved ? "↶ Mở lại" : "✓ Đánh dấu đã xử lý"}</button><button data-action="edit" data-id="${escape(c.id)}">Sửa</button><button data-action="delete" data-id="${escape(c.id)}">Xóa</button>`}</div></article>`,
          )
          .join("")
      : `<div class="feedback-empty"><span>⊕</span><h3>${comments.length ? "Không có phản hồi ở bộ lọc này" : "Chưa có phản hồi nào"}</h3><p>${locked() ? "Phiên bản này đang ở chế độ chỉ đọc." : "Nhấn vào ảnh v2.0 để ghim<br>góc nhìn đầu tiên của bạn."}</p></div>`;
    $("#pin-stage").classList.toggle("readonly", locked());
    $("#approve").disabled =
      $("#request-changes").disabled =
      $("#add-comment").disabled =
        locked();
    $("#pin-instruction").textContent = locked()
      ? "Phiên bản đã duyệt hoặc lưu trữ · Chỉ đọc."
      : "Nhấn vào ảnh v2.0 để ghim phản hồi tại đúng vị trí.";
    $("#decision-title").textContent =
      p.status === "Archived"
        ? "Dự án đã được lưu trữ."
        : p.versionStatus === "Approved"
          ? "Đã phê duyệt. Cùng nhau tạo nên thành quả!"
          : p.versionStatus === "Changes Requested"
            ? "Đã gửi yêu cầu chỉnh sửa."
            : "Bạn cảm thấy phiên bản này thế nào?";
    $("#decision-description").textContent =
      p.versionStatus === "Approved"
        ? "Trạng thái dự án đã chuyển sang Hoàn thành."
        : p.versionStatus === "Changes Requested"
          ? "Các phản hồi đã lưu để Creative Lead tiếp nhận trong module SV3."
          : "Phê duyệt để hoàn tất, hoặc gửi phản hồi để đội ngũ chỉnh sửa.";
    if (p.status === "Archived")
      $("#project-select").innerHTML =
        `<option>${escape(p.name)} — Đã lưu trữ</option>`;
  }
  $$("[data-mode]").forEach(
    (b) =>
      (b.onclick = () => {
        mode = b.dataset.mode;
        $$("[data-mode]").forEach((btn) => {
          btn.classList.toggle("active", btn === b);
          btn.setAttribute("aria-pressed", String(btn === b));
        });
        $("#comparison").classList.toggle("slider", mode === "slider");
        $("#slider-control").hidden = mode !== "slider";
      }),
  );
  $("#compare-range").oninput = (e) => {
    const value = e.target.value;
    $("#comparison").style.setProperty("--split", value + "%");
    $("#range-value").textContent = value + "%";
  };
  $$("[data-comments]").forEach(
    (b) =>
      (b.onclick = () => {
        filter = b.dataset.comments;
        $$("[data-comments]").forEach((btn) => {
          btn.classList.toggle("active", btn === b);
          btn.setAttribute("aria-pressed", String(btn === b));
        });
        render();
      }),
  );
  $("#pin-stage").onclick = (e) => {
    const pin = e.target.closest("[data-pin]");
    if (pin) {
      focusPin(pin.dataset.pin);
      return;
    }
    if (locked()) return;
    const rect = e.currentTarget.getBoundingClientRect();
    let x = (e.clientX - rect.left) / rect.width,
      y = (e.clientY - rect.top) / rect.height;
    if (mode === "slider" && x < Number($("#compare-range").value) / 100) {
      toast("Hãy ghim phản hồi trên phần ảnh v2.0 ở bên phải thanh trượt.");
      return;
    }
    openComment(x, y);
  };
  // Keyboard users can start a pin at the image center, then describe its location.
  $("#add-comment").onclick = () => {
    if (locked()) return;
    $('[data-mode="side"]').click();
    openComment(0.5, 0.5);
  };
  function openComment(x, y) {
    pending = {
      x: Math.min(0.98, Math.max(0.02, x)),
      y: Math.min(0.98, Math.max(0.02, y)),
    };
    editing = null;
    $("#comment-form").reset();
    $("#comment-title").textContent = "Ghim phản hồi";
    $("#pin-location").textContent =
      `Phiên bản v2.0 · Vị trí ${Math.round(x * 100)}%, ${Math.round(y * 100)}%`;
    $("#comment-error").textContent = "";
    dialog.showModal();
  }
  $("#close-comment").onclick = $("#cancel-comment").onclick = () =>
    dialog.close();
  $("#comment-form").onsubmit = (e) => {
    e.preventDefault();
    if (locked()) return;
    const text = $("#comment-text").value.trim();
    if (!text) {
      $("#comment-error").textContent = "Vui lòng nhập nội dung phản hồi.";
      return;
    }
    if (
      update(p.id, (project) => {
        if (editing) {
          const c = project.comments.find((c) => c.id === editing);
          if (c) {
            c.text = text;
            c.resolved = false;
          }
        } else {
          project.comments.push({
            id: crypto.randomUUID(),
            text,
            ...pending,
            resolved: false,
            createdAt: new Date().toISOString(),
          });
        }
      })
    ) {
      dialog.close();
      refresh();
      toast("Đã lưu phản hồi tại vị trí đã chọn.");
    }
  };
  $("#comment-list").onclick = (e) => {
    const focus = e.target.closest("[data-focus]");
    if (focus) {
      focusPin(focus.dataset.focus);
      return;
    }
    const b = e.target.closest("[data-action]");
    if (!b || locked()) return;
    const c = p.comments.find((c) => c.id === b.dataset.id);
    if (!c) return;
    if (b.dataset.action === "edit") {
      editing = c.id;
      $("#comment-title").textContent = "Chỉnh sửa phản hồi";
      $("#comment-text").value = c.text;
      $("#comment-error").textContent = "";
      $("#pin-location").textContent = "Giữ nguyên vị trí ghim trên v2.0.";
      dialog.showModal();
    } else if (b.dataset.action === "resolve") {
      if (
        update(p.id, (project) => {
          const target = project.comments.find((x) => x.id === c.id);
          target.resolved = !target.resolved;
        })
      )
        refresh();
    } else {
      confirmAction(
        "Xóa phản hồi?",
        "Ghim và nội dung phản hồi này sẽ được xóa.",
        () => {
          if (
            update(
              p.id,
              (project) =>
                (project.comments = project.comments.filter(
                  (x) => x.id !== c.id,
                )),
            )
          )
            refresh();
        },
      );
    }
  };
  $("#approve").onclick = () => {
    const unresolved = p.comments.filter((c) => !c.resolved).length;
    confirmAction(
      "Phê duyệt phiên bản v2.0?",
      `${unresolved ? "Còn " + unresolved + " phản hồi chưa xử lý. " : ""}Dự án sẽ chuyển sang Hoàn thành và phiên bản trở thành chỉ đọc.`,
      () => {
        if (
          update(p.id, (project) => {
            project.versionStatus = "Approved";
            project.status = "Completed";
            project.progress = 100;
          })
        ) {
          refresh();
          toast("Đã phê duyệt v2.0. Dự án hoàn thành!");
        }
      },
    );
  };
  $("#request-changes").onclick = () => {
    if (!p.comments.some((c) => !c.resolved)) {
      toast(
        "Hãy thêm ít nhất một phản hồi chưa xử lý để đội ngũ biết điều cần sửa.",
      );
      return;
    }
    confirmAction(
      "Gửi yêu cầu chỉnh sửa?",
      "Các phản hồi chưa xử lý sẽ được giữ để đội ngũ tiếp nhận. Trạng thái phiên bản chuyển sang Changes Requested.",
      () => {
        if (
          update(p.id, (project) => {
            project.versionStatus = "Changes Requested";
            project.status = "Active";
          })
        ) {
          refresh();
          toast("Đã lưu yêu cầu chỉnh sửa.");
        }
      },
    );
  };
  $("#moodboard").onclick = () => $("#mood-dialog").showModal();
  $("#close-mood").onclick = () => $("#mood-dialog").close();
  render();
})();
