import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("elvuiVersion", {
  local: () => ipcRenderer.invoke("elvui-version:local"),
  online: () => ipcRenderer.invoke("elvui-version:online"),
  download: () => ipcRenderer.invoke("elvui-version:download"),
});

contextBridge.exposeInMainWorld("wowFolder", {
  get: () => ipcRenderer.invoke("wow-folder:get"),
  update: () => ipcRenderer.invoke("wow-folder:update"),
  back: () => ipcRenderer.invoke("wow-folder:back"),
  configuration: () => ipcRenderer.invoke("wow-folder:configuration"),
});

contextBridge.exposeInMainWorld("navigation", {
  installation: () => ipcRenderer.invoke("navigation:installation"),
  configuration: () => ipcRenderer.invoke("navigation:configuration"),
});

contextBridge.exposeInMainWorld("statusManager", {
  status: () => ipcRenderer.invoke("status:get"),
});
