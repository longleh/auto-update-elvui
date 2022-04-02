import path from 'path'
import { app, BrowserWindow, ipcMain, dialog } from 'electron'
import { getElvUIVersion } from './helpers/localElvUIHelper.js'
import { downloadElvUI, getOnlineElvuiVersion } from './helpers/onlineElvUIHelper.js'
import { getWowFolder, isWowFolderConfigured } from './config/getConfig.js'
import { APP_STATES, stateManager, loadWindowByState } from './stateManager.js'

let onlineVersion = 0

const handleFileOpen = async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog()
  if (canceled) {
    return
  } else {
    return filePaths[0]
  }
}

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  const [state, setState] = stateManager(win)

  setState(APP_STATES.LOADING)

  if (!isWowFolderConfigured()) {
    setState(APP_STATES.CONFIGURATION)
  }

  ipcMain.handle('elvui-version:local', () => {
    try {
      return getElvUIVersion()
    } catch (e) {
      return e.message
    }
  })

  ipcMain.handle('elvui-version:online', async () => {
    try {
      onlineVersion = await getOnlineElvuiVersion()
    } catch (e) {
      return e.message
    }
  })

  ipcMain.handle('elvui-version:download', () => {
    try {
      return downloadElvUI(onlineVersion)
    } catch (e) {
      return e.message
    }
  })

  ipcMain.handle('wow-folder:get', () => {
    return getWowFolder()
  })

  ipcMain.handle('wow-folder:update', handleFileOpen)

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