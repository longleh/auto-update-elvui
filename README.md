# Auto Update Elvui

It's a simple application done with [Electronjs](https://www.electronjs.org/) that allows you to download the latest ElvUI (WoW Addon) version

# Installation

## User

Just take the latest release, unzip the folder, open the `AutoUpdateElvUI.exe` and voilà

## Developper

You just need [Node.js](https://nodejs.org/en/) then

```
# Install depedencies
npm install

# Run it simply
npm start

# Compile it for your system
npm run make

# Run tests
npm tests
```

# Configuration

## Via GUI

The first time you start the `.exe` it will ask you for your **WOW FOLDER** (not your addon folder) , use the explorer and select your folder

![Parameter Page](https://user-images.githubusercontent.com/33480010/161818163-2f0509ea-5104-49b6-816d-2ce09e9e54c4.png)


You can go back to the configuration via the **Parameters** button
![Parameter button](https://user-images.githubusercontent.com/33480010/161818242-32d2af79-6ad6-43da-bf39-5e488fc00813.png)


## Via the config file

You can create/update `_auto_update_elvui.config.json` inside the application folder

```
{"wow_folder":"<your path to wow folder>"}
```

# Known errors

- If your WoW folder is badly configured, it may not triggers the online search
  - You can still install ElvUI
