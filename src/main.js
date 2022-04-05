import path from "path";
import decompress from "decompress";
import fs from "fs";
import { app, BrowserWindow, ipcMain, dialog } from "electron";
import { getElvUIVersion } from "./helpers/localElvUI.js";
import { downloadElvUI, getOnlineElvuiVersion } from "./helpers/onlineElvUI.js";
import {
  getWowFolder,
  isWowFolderConfigured,
  setWowFolder,
} from "./config/getConfig.js";
import { APP_STATES, stateManager } from "./helpers/stateManager.js";
import { resetStatus, statusManager } from "./helpers/statusManager.js";

let onlineVersion = 0;

const updateWowFolder = async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });
  if (canceled) {
    return "";
  }
  const wowFolder = setWowFolder(filePaths[0]);
  return wowFolder;
};

const unzipElvUI = async (fileName) => {
  const [_, setStatus] = statusManager();
  setStatus({ type: "info", message: "Start unzipping" });
  return decompress(
    `./${fileName}`,
    getWowFolder().concat("/_retail_/Interface/Addons")
  );
};

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  const [state, setState] = stateManager(win);
  const [_, setStatus] = statusManager();

  setState(APP_STATES.LOADING);

  if (!isWowFolderConfigured()) {
    setState(APP_STATES.CONFIGURATION);
    resetStatus();
  } else {
    setTimeout(() => setState(APP_STATES.INSTALLATION), 2000);
  }

  ipcMain.handle("elvui-version:local", () => {
    try {
      return getElvUIVersion();
    } catch (e) {
      return e.message;
    }
  });

  ipcMain.handle("elvui-version:online", async () => {
    try {
      onlineVersion = await getOnlineElvuiVersion();
      resetStatus();
      return onlineVersion;
    } catch (e) {
      return e.message;
    }
  });

  ipcMain.handle("elvui-version:download", async () => {
    try {
      const zipLocation = await downloadElvUI(onlineVersion);
      await unzipElvUI(zipLocation);
      setStatus({
        type: "info",
        message: "New version dezipped, trying to remove archive",
      });
      fs.unlink("./" + zipLocation, (err) => {
        if (err) {
          setStatus({
            type: "warning",
            message: `ElvUI Version ${onlineVersion} is installed but couldn't remove archive, you may want to delete it manually.`,
          });
        } else {
          setStatus({
            type: "ok",
            message: `Installation of version ${onlineVersion} finished, you can close the app`,
          });
        }
      });
    } catch (e) {
      setStatus({ type: "error", message: e.message });
    }
  });

  ipcMain.handle("wow-folder:get", () => {
    return getWowFolder();
  });

  ipcMain.handle("wow-folder:update", async () => {
    const wowFolder = await updateWowFolder();
    resetStatus();
    if (wowFolder !== "") setState(APP_STATES.INSTALLATION);
    return wowFolder;
  });

  ipcMain.handle("navigation:installation", async () => {
    resetStatus();
    setState(APP_STATES.INSTALLATION);
  });

  ipcMain.handle("navigation:configuration", async () => {
    resetStatus();
    setState(APP_STATES.CONFIGURATION);
  });

  ipcMain.handle("status:get", () => {
    const [status, _] = statusManager();
    return status;
  });
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
