"use strict";
(() => {
  const { $, $$, toast, update } = CS;
  if (!CS.shell("brief", "Creative Brief")) return;
  const p = CS.selectProject("#project-select", "client-creative-brief");
  if (!p) {
    $("#brief-workspace").hidden = true;
    $("#brief-empty").hidden = false;
    return;
  }
  const fields = ["goal", "audience", "message", "style", "deliverables"];
  let accepted = false,
    source = "manual",
    explanation = "",
    round = 0,
    busy = false,
    submitted = false;
  $("#raw-idea").value = p.brief?.raw || p.description;
  function count() {
    $("#char-count").textContent =
      `${$("#raw-idea").value.length.toLocaleString("vi-VN")} / 5.000`;
  }
  function state() {
    $("#brief-state").textContent = submitted
      ? "Submitted · Đã gửi"
      : "Draft · Bản nháp";
    $("#brief-state").className = "pill " + (submitted ? "Completed" : "");
    $("#submit-brief").disabled = !accepted;
    $("#accepted-note").textContent = accepted
      ? "✓ Đã xác nhận. Bạn có thể gửi brief cho đội ngũ."
      : "Vui lòng rà soát và chấp nhận nội dung trước khi gửi.";
  }
  function showResult() {
    $("#result-placeholder").hidden = true;
    $("#structured-form").hidden = false;
    $("#result-source").textContent =
      source === "mock" ? "AI mô phỏng" : "Viết thủ công";
    $("#explanation-text").textContent = explanation;
  }
  function collect() {
    return {
      raw: $("#raw-idea").value.trim(),
      sections: Object.fromEntries(
        fields.map((id) => [id, $("#" + id).value.trim()]),
      ),
      accepted,
      source,
      explanation,
      submitted,
      updatedAt: new Date().toISOString(),
    };
  }
  function validate() {
    const empty = fields.find((id) => !$("#" + id).value.trim());
    if (empty) {
      $("#brief-error").textContent = "Vui lòng điền đủ 5 phần của brief.";
      $("#" + empty).focus();
      return false;
    }
    $("#brief-error").textContent = "";
    return true;
  }
  if (p.brief?.sections) {
    fields.forEach((id) => ($("#" + id).value = p.brief.sections[id] || ""));
    accepted = !!p.brief.accepted;
    submitted = !!p.brief.submitted;
    source = p.brief.source || "manual";
    explanation =
      p.brief.explanation || "Nội dung được bạn tự xây dựng và xác nhận.";
    showResult();
  }
  count();
  state();
  $("#raw-idea").oninput = () => {
    count();
    accepted = false;
    submitted = false;
    state();
  };
  fields.forEach(
    (id) =>
      ($("#" + id).oninput = () => {
        accepted = false;
        submitted = false;
        state();
      }),
  );
  async function generate() {
    if (busy) return;
    const raw = $("#raw-idea").value.trim();
    if (raw.length <= 20) {
      $("#brief-error").textContent =
        "Chưa đủ thông tin: hãy mô tả ý tưởng dài hơn 20 ký tự, hoặc chọn Tự viết brief.";
      $("#raw-idea").focus();
      return;
    }
    busy = true;
    accepted = false;
    submitted = false;
    state();
    $("#brief-error").textContent = "";
    $("#structured-form").hidden = true;
    $("#result-placeholder").hidden = true;
    $("#generating").hidden = false;
    $$("#brief-workspace button").forEach((b) => (b.disabled = true));
    $("#raw-idea").disabled = true;
    await new Promise((r) => setTimeout(r, 700));
    round++;
    source = "mock";
    const nature = /thiên nhiên|tự nhiên|mỹ phẩm|xanh|môi trường/i.test(raw),
      young = /trẻ|gen z|sinh viên/i.test(raw);
    const sentences = raw
      .split(/[.!?\n]+/)
      .map((s) => s.trim())
      .filter(Boolean);
    const values = {
      goal: `${sentences[0]}. ${round % 2 ? "Xây dựng định hướng rõ ràng và một trải nghiệm nhất quán cho thương hiệu." : "Ưu tiên tính dễ nhận biết và sự nhất quán trong các điểm chạm."}`,
      audience: young
        ? "Người trẻ quan tâm đến phong cách sống và trải nghiệm thương hiệu. Cần bổ sung độ tuổi, hành vi và nhu cầu cụ thể."
        : "Chưa xác định rõ từ mô tả. Hãy bổ sung nhóm khách hàng, độ tuổi và nhu cầu trước khi gửi.",
      message:
        sentences.length > 1
          ? sentences.slice(1).join(". ") + "."
          : "Truyền tải giá trị cốt lõi của thương hiệu một cách gần gũi. Cần xác nhận thông điệp cụ thể.",
      style: nature
        ? "Tự nhiên, tối giản, gần gũi. Gợi ý xanh lá và kem; cần xác nhận màu và font theo nhận diện."
        : p.category === "UI/UX"
          ? "Giao diện rõ ràng, hiện đại; ưu tiên khả năng đọc và trải nghiệm trên thiết bị di động."
          : "Đề xuất bố cục rõ ràng, có điểm nhấn thị giác. Cần bổ sung màu sắc, cảm xúc và mẫu tham khảo.",
      deliverables:
        p.category === "Branding"
          ? "Đề xuất: logo, bảng màu, typography và hướng dẫn nhận diện cơ bản. Xác nhận số lượng, định dạng và phạm vi bàn giao."
          : p.category === "UI/UX"
            ? "Đề xuất: sitemap, wireframe, giao diện desktop/mobile và prototype. Xác nhận số màn hình và phạm vi bàn giao."
            : "Đề xuất: key visual và bộ ấn phẩm chiến dịch. Xác nhận kênh truyền thông, kích thước và số lượng.",
    };
    fields.forEach((id) => ($("#" + id).value = values[id].slice(0, 2000)));
    explanation = `Đã giữ mô tả gốc và sắp xếp thành 5 phần. ${nature ? "Các từ khóa thiên nhiên/xanh dẫn đến gợi ý màu và cảm xúc tự nhiên." : "Phong cách được đề xuất theo loại dự án " + p.category + "."} ${young ? "Có tín hiệu về đối tượng người trẻ." : "Đối tượng chưa rõ; hãy bổ sung."} Nội dung “Đề xuất” cần bạn xác nhận; đây là mô phỏng bằng quy tắc, không phải kết quả LLM.`;
    $("#generating").hidden = true;
    $$("#brief-workspace button").forEach((b) => (b.disabled = false));
    $("#raw-idea").disabled = false;
    busy = false;
    showResult();
    state();
    toast("Đã tạo gợi ý. Hãy rà soát các thông tin cần xác nhận.");
  }
  $("#generate").onclick = $("#regenerate").onclick = generate;
  $("#manual").onclick = () => {
    source = "manual";
    explanation =
      "Bạn chủ động viết 5 phần định hướng. Hãy xác nhận nội dung và phạm vi trước khi gửi.";
    fields.forEach((id) => ($("#" + id).value = ""));
    accepted = false;
    submitted = false;
    showResult();
    state();
    $("#goal").focus();
  };
  $("#accept").onclick = () => {
    if (validate()) {
      accepted = true;
      state();
      toast("Đã chấp nhận nội dung brief.");
    }
  };
  $("#reject").onclick = () => {
    CS.confirmAction(
      "Từ chối kết quả hiện tại?",
      "Nội dung 5 phần trên màn hình sẽ được xóa. Mô tả ban đầu được giữ để bạn tạo lại hoặc tự viết.",
      () => {
        fields.forEach((id) => ($("#" + id).value = ""));
        accepted = false;
        submitted = false;
        $("#structured-form").hidden = true;
        $("#result-placeholder").hidden = false;
        $("#result-source").textContent = "Đã từ chối";
        state();
      },
    );
  };
  $("#save-draft").onclick = () => {
    submitted = false;
    const saved = update(p.id, (project) => (project.brief = collect()));
    if (saved) {
      state();
      $("#save-note").textContent = "Đã lưu bản nháp vào trình duyệt.";
      toast("Đã lưu bản nháp.");
    }
  };
  $("#structured-form").onsubmit = (e) => {
    e.preventDefault();
    if (!accepted || !validate()) return;
    submitted = true;
    if (
      update(p.id, (project) => {
        project.brief = collect();
        project.progress = Math.max(project.progress, 20);
      })
    ) {
      state();
      $("#save-note").textContent =
        "Đã lưu brief Submitted. Module tiếp nhận của Lead thuộc phần SV3.";
      toast("Đã gửi brief thành công.");
    } else {
      submitted = false;
      state();
    }
  };
  if (p.status === "Archived") {
    CS.$("#project-select").innerHTML =
      `<option>${CS.escape(p.name)} — Đã lưu trữ</option>`;
    $$(
      "#brief-workspace input, #brief-workspace textarea, #brief-workspace button",
    ).forEach((el) => (el.disabled = true));
    $("#brief-state").textContent = "Đã lưu trữ · Chỉ đọc";
  }
})();
