import fs from "fs";
import axios from "axios";
import { getElvuiWebsite, getElvuiPage } from "../config/getConfig.js";
import CriticalException from "../exceptions/CriticalException.js";
import { statusManager } from "./statusManager.js";

export const getDownloadLine = async () => {
  try {
    const { data } = await axios.get(`${getElvuiWebsite()}${getElvuiPage()}`);
    const dataLines = data.split("\n");
    return dataLines.find((line) => line.includes("Download ElvUI"));
  } catch {
    throw new CriticalException("Cannot reach ElvUI website");
  }
};

export const getOnlineElvuiVersion = async () => {
  const [_, setStatus] = statusManager();
  setStatus({ type: "info", message: "Checking ElvUI online version" });
  const htmlLines = await getDownloadLine();
  if (!htmlLines)
    throw new CriticalException("Cannot parse ElvUI online version");
  const splittedLine = htmlLines.split("Download ElvUI");
  if (splittedLine.length < 1)
    throw CriticalException("Cannot parse ElvUI online version");
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
  if (Number.parseFloat(version) === 0)
    throw CriticalException("Cannot parse ElvUI online version");
  return Number.parseFloat(version);
};

export const downloadElvUI = async (onlineVersion) => {
  const [_, setStatus] = statusManager();
  setStatus({ type: "info", message: "Downloading Elvui" });
  const htmlLines = await getDownloadLine();
  if (!htmlLines)
    throw new CriticalException("Cannot parse ElvUI online version");

  const linkLines = htmlLines.split('"');
  if (linkLines.length === 0)
    throw new CriticalException("Cannot parse ElvUI download link");
  const downloadLink = linkLines.find((line) =>
    line.includes(onlineVersion + ".zip")
  );
  if (!downloadLink)
    throw new CriticalException("Cannot find ElvUI download link");
  const { data } = await axios({
    url: `${getElvuiWebsite()}${downloadLink}`,
    method: "GET",
    responseType: "arraybuffer",
  });
  return new Promise((resolve, reject) => {
    fs.writeFile(`ElvUI-${onlineVersion}.zip`, data, function (err) {
      if (err) reject(err);
      setStatus({
        type: "Info",
        message: `ElvUI version ${onlineVersion} downloaded`,
      });
      resolve(`ElvUI-${onlineVersion}.zip`);
    });
  });
};
