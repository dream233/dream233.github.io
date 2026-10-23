// 明暗主题切换：点击按钮切换并记住选择（首次访问跟随系统设置）
(function () {
  var button = document.getElementById("theme-toggle");
  if (!button) return;
  button.addEventListener("click", function () {
    var next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch (e) {} // 浏览器禁用存储时只在本页生效
  });
})();

// 点击论文预览图放大查看；点击任意处或按 Esc 关闭
(function () {
  document.querySelectorAll("a.pub-preview").forEach(function (link) {
    link.addEventListener("click", function (event) {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return; // 带修饰键：照常在新标签页打开大图
      event.preventDefault();
      var thumb = link.querySelector("img");
      var overlay = document.createElement("div");
      overlay.className = "lightbox";
      overlay.setAttribute("role", "dialog");
      overlay.setAttribute("aria-label", thumb.alt);
      overlay.tabIndex = -1;
      var full = document.createElement("img");
      full.alt = thumb.alt;
      if (thumb.naturalWidth) full.style.setProperty("--ratio", thumb.naturalWidth / thumb.naturalHeight); // 换成大图时尺寸不跳
      full.src = thumb.currentSrc || thumb.src; // 先显示已加载的缩略图，大图下载完再替换，不用干等
      var big = new Image();
      big.onload = function () {
        full.src = big.src;
      };
      big.src = link.href;
      overlay.appendChild(full);
      document.body.appendChild(overlay);
      overlay.focus();
      function onKey(e) {
        if (e.key === "Escape") close();
      }
      function close() {
        overlay.remove();
        document.removeEventListener("keydown", onKey);
        link.focus();
      }
      overlay.addEventListener("click", close);
      document.addEventListener("keydown", onKey);
    });
  });
})();
