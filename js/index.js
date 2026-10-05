"use strict";
document.querySelector("#hero-demo").onclick = () => {
  if (CS.login("Client")) location.href = "client-project-overview.html";
};
document.querySelectorAll("[data-role]").forEach(
  (button) =>
    (button.onclick = () => {
      location.href =
        "login.html?role=" + encodeURIComponent(button.dataset.role);
    }),
);
