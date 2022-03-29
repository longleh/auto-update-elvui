import fs from "fs";
import { getElvUIVersion } from "./localElvUIHelper.js";
import { getOnlineElvuiVersion, downloadElvUI } from "./onlineElvUIHelper.js";
import { getWowFolder } from "./getConfig.js";

let localVersion = 0;
let onlineVersion = 0;

const isElvuiInstalled = () => {
  const wowFolder = getWowFolder();
  console.log(wowFolder);
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

export const start = async () => {
  if (isElvuiInstalled()) {
    console.info("ElvUI installed, checking version...");
    try {
      if (await shouldInstallElvUI()) {
        console.info("Updating start...");
        const fileName = await downloadElvUI(onlineVersion);
        fs.unlink(fileName, (err) => {
          if (err)
            console.error(
              "Could not remove zip file of ElvUI you may want to delete it manually"
            );
        });
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
