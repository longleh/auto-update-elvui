import fs from "fs";
import decompress from "decompress";
import { getElvUIVersion } from "./localElvUIHelper.js";
import { getOnlineElvuiVersion, downloadElvUI } from "./onlineElvUIHelper.js";
import { getWowFolder } from "./getConfig.js";

let localVersion = 0;
let onlineVersion = 0;

const isElvuiInstalled = () => {
  const wowFolder = getWowFolder();
  const wowFolders = fs.readdirSync(
    wowFolder.concat("/_retail_/Interface/Addons")
  );
  return !!(
    wowFolders.find((folder) => folder === "ElvUI") &&
    wowFolders.find((folder) => folder === "ElvUI_OptionsUI")
  );
};

const shouldInstallElvUI = async () => {
  const version = await getElvUIVersion();
  console.info("Current ElvUI version installed is " + version);
  const parsedOnlineVersion = await getOnlineElvuiVersion();
  console.info("Current ElvUI online version is " + parsedOnlineVersion);
  localVersion = version;
  onlineVersion = parsedOnlineVersion;
  return version < onlineVersion;
};

const unzipElvUI = async (fileName) => {
  console.info('Start unzipping')
  return decompress(`./${fileName}`, getWowFolder().concat("/_retail_/Interface/Addons"))
}

const updateElvUI = async() => {
  console.info("Updating start...");
  const fileName = await downloadElvUI(onlineVersion);
  await unzipElvUI(fileName)
  fs.unlink(fileName, (err) => {
    if (err)
      console.error(
        "Could not remove zip file of ElvUI you may want to delete it manually"
      );
  });
}

export const start = async () => {
  if (isElvuiInstalled()) {
    console.info("ElvUI installed, checking version...");
    try {
      if (await shouldInstallElvUI()) {
        await updateElvUI()
      } else {
        console.info("Your version is the latest");
      }
    } catch (err) {
      console.error("Error while getting ElvUI version");
      console.error(err);
      return;
    }
  }
};

export default start;
