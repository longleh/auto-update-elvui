const downloadButton = document.getElementById("start");
const configurationButton = document.getElementById("configuration");
const statusElement = document.getElementById("status");

configurationButton.addEventListener("click", async () => {
  await window.navigation.configuration();
});

downloadButton.addEventListener("click", async () => {
  downloadButton.disabled = true;
  await window.elvuiVersion.download();
  downloadButton.disabled = false;
  document.getElementById("current-version").innerHTML =
    (await window.elvuiVersion.local()) ?? "Error";
});

document.addEventListener("DOMContentLoaded", async () => {
  console.log("ICIIIII");
  setInterval(async () => {
    const status = await window.statusManager.status();
    console.log(status);
    statusElement.className = "status-" + status.type;
    statusElement.innerText = status.message;
  }, 200);

  try {
    document.getElementById("current-version").innerHTML =
      (await window.elvuiVersion.local()) ??
      "Cannot find ElvUI, check your wow folder";
    document.getElementById("online-version").innerHTML =
      (await window.elvuiVersion.online()) ??
      "Error while getting online ElvUI version";
  } catch (e) {
    console.log(e);
  }
});
