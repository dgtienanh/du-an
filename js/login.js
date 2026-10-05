"use strict";
const { $, $$, login, toast } = CS;
const selected = new URLSearchParams(location.search).get("role");
$$("[data-role]").forEach((button) => {
  if (button.dataset.role === selected) button.classList.add("selected");
  button.onclick = () => {
    if (login(button.dataset.role))
      location.href = "client-project-overview.html";
  };
});
$("#toggle-password").onclick = (e) => {
  const visible = $("#password").type === "password";
  $("#password").type = visible ? "text" : "password";
  e.target.textContent = visible ? "Ẩn" : "Hiện";
  e.target.setAttribute(
    "aria-label",
    visible ? "Ẩn mật khẩu" : "Hiện mật khẩu",
  );
  e.target.setAttribute("aria-pressed", String(visible));
};
$("#login-form").onsubmit = async (e) => {
  e.preventDefault();
  const email = $("#email"),
    pass = $("#password");
  const emailValid = email.validity.valid && email.value.trim();
  const passValid = pass.value.length >= 6;
  $("#email-error").textContent = emailValid
    ? ""
    : "Vui lòng nhập địa chỉ email hợp lệ.";
  $("#password-error").textContent = passValid
    ? ""
    : "Mật khẩu demo cần ít nhất 6 ký tự.";
  email.setAttribute("aria-invalid", String(!emailValid));
  pass.setAttribute("aria-invalid", String(!passValid));
  if (!emailValid || !passValid) {
    (!emailValid ? email : pass).focus();
    return;
  }
  $("#login-submit").disabled = true;
  $("#login-status").textContent = "Đang tạo phiên demo…";
  await new Promise((r) => setTimeout(r, 450));
  if (login("Client", email.value.trim())) {
    pass.value = "";
    location.href = "client-project-overview.html";
  } else {
    $("#login-submit").disabled = false;
    $("#login-status").textContent =
      "Không thể tạo phiên. Vui lòng bật quyền lưu trữ trình duyệt.";
  }
};
