import config from "../config.js";
import fs from "fs";
import { getElvUIVersion } from "./localElvUIHelper.js";
import { getOnlineElvuiVersion, downloadElvUI } from "./onlineElvUIHelper.js";

export const start = async () => {
    const wowFolder = config.wow_folder;
    const wowFolders = fs.readdirSync(
      wowFolder.concat("/_retail_/Interface/Addons")
    );
    const isElvuiInstalled = !!(
      wowFolders.find((folder) => folder === "ElvUI") &&
      wowFolders.find((folder) => folder === "ElvUI_OptionsUI")
    );
    if (isElvuiInstalled) {
      console.info("ElvUI installed, checking version...");
      try {
        const version = await getElvUIVersion(wowFolder);
        console.info("Current ElvUI version installed is " + version);
        const onlineVersion = await getOnlineElvuiVersion();
        console.info("Current ElvUI online version is " + onlineVersion);
        if (version < onlineVersion) {
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

  export default start