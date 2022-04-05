const btn = document.getElementById("open-btn");
const btnBack = document.getElementById("back-btn");
const filePathElement = document.getElementById("content");

btn.addEventListener("click", async () => {
  const filePath = await window.wowFolder.update();
  filePathElement.innerText = filePath;
});

btnBack.addEventListener("click", async () => {
  if ((await window.wowFolder.get()) !== "") {
    await window.wowFolder.back();
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  const localWowFolder = await window.wowFolder.get();
  setInterval(async () => {
    if (wowFolder !== "") {
      filePathElement.innerText = localWowFolder;
      btnBack.hidden = false;
    }
  }, 1000);
});
