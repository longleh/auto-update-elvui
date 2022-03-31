import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('elvuiVersion', {
  local: () => ipcRenderer.invoke('elvui-version:local'),
  online: () => ipcRenderer.invoke('elvui-version:online')
})