const downloadButton = document.getElementById('start')
downloadButton.addEventListener("click", async() => {
  downloadButton.disabled = true
  await window.elvuiVersion.download()
  downloadButton.disabled = false
})

const btn = document.getElementById('wow-folder')
const filePathElement = document.getElementById('filePath')

btn.addEventListener('click', async () => {
  const filePath = await window.wowFolder.update()
  filePathElement.innerText = filePath
})

document.addEventListener("DOMContentLoaded", async () => {
    try {
      document.getElementById("current-version").innerHTML = await window.elvuiVersion.local() ?? 'Cannot find ElvUI, check your wow folder'
      document.getElementById("online-version").innerHTML = await window.elvuiVersion.online() ?? 'Error while getting online ElvUI version'
    } catch(e) {
      console.log(e)
    }
  })