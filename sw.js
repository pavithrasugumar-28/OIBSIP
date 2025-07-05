self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window" }).then(clientsArr => {
      const client = clientsArr.find(c => c.visibilityState === "visible");
      if (client) return client.focus();
      return clients.openWindow('/');
    })
  );
});
