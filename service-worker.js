self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});self.addEventListener("push", (event) => {
  let data = {
    title: "KIKO Le Gru LearningHub",
    body: "Hai una nuova notifica.",
    url: "./"
  };

  if (event.data) {
    try {
      data = {
        ...data,
        ...event.data.json()
      };
    } catch (error) {
      data.body = event.data.text();
    }
  }

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "./icon.png",
      badge: "./icon.png",
      data: {
        url: data.url || "./"
      }
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const url =
    event.notification.data?.url || "./";

  event.waitUntil(
    self.clients.openWindow(url)
  );
});