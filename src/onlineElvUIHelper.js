import config from "../config.js";
import fs from "fs";
import axios from "axios";

export const getDownloadLine = async () => {
    const { data } = await axios.get(
      `${config.elvui_website}/download.php?ui=elvui`
    );
    const dataLines = data.split("\n");
    return dataLines.find((line) => line.includes("Download ElvUI"));
  };
  

export const getOnlineElvuiVersion = async () => {
    console.info("Checking ElvUI online version");
    const htmlLines = await getDownloadLine();
    if (!htmlLines) throw new Exception("Cannot parse ElvUI online version")
    const splittedLine = htmlLines.split("Download ElvUI");
    if (splittedLine.length < 1)
      throw Exception("Cannot parse ElvUI online version");
    const versionLine = splittedLine[1].trim();
    let version = "";
    let i = 0;
    while (
      i < versionLine.length &&
      (versionLine[i].match(/^[0-9a-z]+$/) || versionLine[i] === ".")
    ) {
      version += versionLine[i];
      i++;
    }
    return Number.parseFloat(version);
  };
  
  export const downloadElvUI = async (onlineVersion) => {
    console.info("Downloading Elvui");
    const htmlLines = await getDownloadLine();
    if (!htmlLines) throw new Exception("Cannot parse ElvUI online version")
  
    const linkLines = htmlLines.split('"');
    if (linkLines.length === 0)
      throw Exception("Cannot parse ElvUI download link");
    const downloadLink = linkLines.find((line) =>
      line.includes(onlineVersion + ".zip")
    );
    if (!downloadLink) throw Exception("Cannot find ElvUI download link");
    const { data } = await axios({
      url: `${config.elvui_website}${downloadLink}`,
      method: "GET",
      responseType: "arraybuffer",
    });
    return new Promise((resolve, reject) => {
      fs.writeFile(`ElvUI-${onlineVersion}.zip`, data, function (err) {
        if (err) reject(err);
        console.info(`ElvUI version ${onlineVersion} downloaded`);
        resolve(`ElvUI-${onlineVersion}.zip`);
      });
    });
  };
  