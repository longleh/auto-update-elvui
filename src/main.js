import path from "path";
import decompress from "decompress";
import { app, BrowserWindow, ipcMain, dialog } from "electron";
import { getElvUIVersion } from "./helpers/localElvUI.js";
import { downloadElvUI, getOnlineElvuiVersion } from "./helpers/onlineElvUI.js";
import {
  getWowFolder,
  isWowFolderConfigured,
  setWowFolder,
} from "./config/getConfig.js";
import { APP_STATES, stateManager } from "./helpers/stateManager.js";
import { statusManager } from "./helpers/statusManager.js";

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
  console.info("Start unzipping");
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

  setState(APP_STATES.LOADING);

  if (!isWowFolderConfigured()) {
    setState(APP_STATES.CONFIGURATION);
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
      return onlineVersion;
    } catch (e) {
      return e.message;
    }
  });

  ipcMain.handle("elvui-version:download", async () => {
    try {
      const zipLocation = await downloadElvUI(onlineVersion);
      await unzipElvUI(zipLocation);
      console.info("Finishing dezipping");
      fs.unlink(fileName, (err) => {
        if (err)
          console.error(
            "Could not remove zip file of ElvUI you may want to delete it manually"
          );
        app.quit();
      });
    } catch (e) {
      return e.message;
    }
  });

  ipcMain.handle("wow-folder:get", () => {
    return getWowFolder();
  });

  ipcMain.handle("wow-folder:update", async () => {
    const wowFolder = await updateWowFolder();
    if (wowFolder !== "") setState(APP_STATES.INSTALLATION);
    return wowFolder;
  });

  ipcMain.handle("wow-folder:back", async () =>
    setState(APP_STATES.INSTALLATION)
  );

  ipcMain.handle("wow-folder:configuration", async () =>
    setState(APP_STATES.CONFIGURATION)
  );

  ipcMain.handle("status:message", () => {
    return statusManager();
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
