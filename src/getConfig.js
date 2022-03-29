import config from "./config.js"

export const getWowFolder = () => {
    return config.wow_folder
}

export const getElvuiWebsite = () => {
    return config.elvui_website
}

// mostly for testing purpose
export const getElvuiPage = () => {
    return config.elvui_page
}