import path from 'path'
import { app, BrowserWindow, ipcMain, nativeTheme } from 'electron'
import { getElvUIVersion } from '../../helpers/localElvUIHelper.js'
import { getOnlineElvuiVersion } from '../../helpers/onlineElvUIHelper.js'

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('./view/index.html')

  ipcMain.handle('elvui-version:local', () => {
    try {
      return getElvUIVersion()
    } catch (e) {
      return e.message
    }
  })

  ipcMain.handle('elvui-version:online', () => {
    try {
      return getOnlineElvuiVersion()
    } catch (e) {
      return e.message
    }
  })

}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})