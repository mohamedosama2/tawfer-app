// It's a static script file, so it won't be covered by a module bundling system
// hence, it uses "importScripts" function to load the other libs
importScripts("https://www.gstatic.com/firebasejs/8.8.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.8.1/firebase-messaging.js");

// Replace the values with yours


self.addEventListener("push", function (event) {
  var data = event.data.json();
  const title = data.notification.title;
  const options = {
    ...data.notification,
  };
  console.log(data);
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", function (event) {
  console.log(event.action);

  event.notification.close();
  event.waitUntil(self.clients.openWindow("users"));
});

self.addEventListener("notificationclose", function (event) {});
