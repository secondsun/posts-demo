self.addEventListener('activate', async () => {
    // This will be called only once when the service worker is activated.
    try {
      const options = {}
      const subscription = await self.registration.pushManager.subscribe(options)
      console.log(JSON.stringify(subscription))
    } catch (err) {
      console.log('Error', err)
    }
  })

  self.addEventListener("push", (event) => {
    let title = (event.data && event.data.text()) || "a default message if nothing was passed to us";
    let body = "We have received a push message";
    let tag = "push-simple-demo-notification-tag";
    let icon = '/icon.png';
  
    event.waitUntil(
      self.registration.showNotification(title, { body, icon, tag })
    )
  });
  