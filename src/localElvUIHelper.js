import fs from "fs";

export const getElvUIVersion = async (wowFolder) => {
    const elvuiMetadataFile = wowFolder.concat(
      "/_retail_/Interface/Addons/ElvUI/ElvUI_Mainline.toc"
    );
    return new Promise((resolve, reject) => {
      fs.readFile(elvuiMetadataFile, "utf8", function (err, data) {
        if (err) return reject('Cannot find ElvUI Metadata');
        const lines = data.split("\n");
        const versionLine = lines.find((line) => line.includes("## Version:"));
        if (!versionLine) return reject('Cannot parse ElvUI version')
        const versionLineSplitted = versionLine.split(":");
  
        if (versionLineSplitted.length < 1)
          return reject("Cannot parse ElvUI version");
        return resolve(Number.parseFloat(versionLineSplitted[1]));
      });
    });
  };
  