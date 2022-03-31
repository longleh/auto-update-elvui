  document.addEventListener("DOMContentLoaded", async () => {
    try {
      document.getElementById("current-version").innerHTML = await window.elvuiVersion.local()
      document.getElementById("online-version").innerHTML = await window.elvuiVersion.online()
    } catch(e) {
      console.log(e)
    }
  })