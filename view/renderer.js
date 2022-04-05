const downloadButton = document.getElementById("start");
const configurationButton = document.getElementById("configuration");

configurationButton.addEventListener("click", async () => {
  await window.wowFolder.configuration();
});

downloadButton.addEventListener("click", async () => {
  downloadButton.disabled = true;
  await window.elvuiVersion.download();
  downloadButton.disabled = false;
  document.getElementById("current-version").innerHTML =
    (await window.elvuiVersion.local()) ?? "Error";
});

document.addEventListener("DOMContentLoaded", async () => {
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
