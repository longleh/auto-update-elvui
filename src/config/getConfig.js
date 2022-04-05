import fs from 'fs'

const elvui_website = "https://www.tukui.org/"
const elvui_page = "download.php?ui=elvui"
const configFile = './_auto_update_elvui.config.json'

const getConfigFilePath = () => configFile

let configData = null

const getConfig = () => {
  if (!configData) {
    if (fs.existsSync(getConfigFilePath())) {
      configData = JSON.parse(fs.readFileSync(getConfigFilePath()))
    }
    else {
      configData = {wow_folder: ''}
    }
  }
  return configData
}

const setConfig = (newConfig) => {
  configData = { ...configData, ...newConfig}
  return configData
}

export const getWowFolder = () => {
  return getConfig().wow_folder;
};


export const setWowFolder = (wowFolder, save = true) => {
  const newConfig = setConfig({wow_folder: wowFolder})
  if (save) {
    if (!fs.existsSync(getConfigFilePath())) {
      fs.writeFileSync(getConfigFilePath(), JSON.stringify(newConfig))
    }
  }
  return newConfig.wow_folder
}

export const getElvuiWebsite = () => {
  return elvui_website;
};

export const getElvuiPage = () => {
  return elvui_page;
};

export const isWowFolderConfigured = () => (fs.existsSync(getConfigFilePath()) && fs.existsSync(getWowFolder()))


