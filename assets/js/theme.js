// 明暗主题切换：点击按钮切换并记住选择（首次访问跟随系统设置）
(function () {
  var button = document.getElementById("theme-toggle");
  if (!button) return;
  button.addEventListener("click", function () {
    var next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });
})();

// 点击论文预览图放大查看；点击任意处或按 Esc 关闭
(function () {
  document.querySelectorAll(".pub-preview img").forEach(function (img) {
    img.addEventListener("click", function () {
      var overlay = document.createElement("div");
      overlay.className = "lightbox";
      var full = document.createElement("img");
      full.src = img.dataset.full || img.src;
      full.alt = img.alt;
      overlay.appendChild(full);
      document.body.appendChild(overlay);
      function onKey(event) {
        if (event.key === "Escape") close();
      }
      function close() {
        overlay.remove();
        document.removeEventListener("keydown", onKey);
      }
      overlay.addEventListener("click", close);
      document.addEventListener("keydown", onKey);
    });
  });
})();
