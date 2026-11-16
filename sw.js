/* Service worker – Báo giá Hixe
   Đổi số phiên bản khi sửa file để máy nhân viên nhận bản mới. */
const CACHE = "hixe-bao-gia-pro-v2";
const CORE = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/icon.svg",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./icons/apple-touch-icon.png",
];
const FONT_HOSTS = ["fonts.googleapis.com", "fonts.gstatic.com"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Trang chính: lấy bản mới từ mạng trước, mất mạng thì dùng bản đã lưu
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req)
        .then((res) => { if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put("./index.html", copy)); } return res; })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  // File tĩnh và font: dùng bản đã lưu ngay, cập nhật ngầm
  if (url.origin === location.origin || FONT_HOSTS.includes(url.hostname)) {
    e.respondWith(
      caches.open(CACHE).then(async (c) => {
        const cached = await c.match(req);
        const fresh = fetch(req)
          .then((res) => { if (res.ok || res.type === "opaque") c.put(req, res.clone()); return res; })
          .catch(() => cached);
        return cached || fresh;
      })
    );
  }
});
