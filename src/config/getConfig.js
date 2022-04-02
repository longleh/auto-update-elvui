import fs from 'fs'

const elvui_website = "https://www.tukui.org/"
const elvui_page = "download.php?ui=elvui"
const configFile = './_auto_update_elvui.config.json'

let configData = null

const getConfig = () => {
  if (!configData) {
    configData = JSON.parse(fs.readFileSync('./_auto_update_config.json'))
  }
  return configData
}

export const getConfigFilePath = () => configFile

export const getWowFolder = () => {
  return getConfig().wow_folder;
};

export const getElvuiWebsite = () => {
  return elvui_website;
};

export const getElvuiPage = () => {
  return elvui_page;
};

export const isWowFolderConfigured = () => (fs.existsSync(configFile) && fs.existsSync(getWowFolder))


