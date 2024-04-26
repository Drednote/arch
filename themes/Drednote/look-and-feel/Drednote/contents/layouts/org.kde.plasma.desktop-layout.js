const plasma = getApiVersion(1);
/*General*/
const panelbottom = new Panel
panelbottom.location = "bottom"
panelbottom.height = gridUnit * 2.48
panelbottom.hiding = "none"
panelbottom.lengthMode = "fill"
panelbottom.floating = 0
// panelbottom.opacity = 2

/*weather*/
// weather = panelbottom.addWidget("Minimal.chaac.weather")
// weather.currentConfigGroup = ["General"]
// weather.writeConfig("sizeFontConfig", 3)
/*spacer*/
panelbottom.addWidget("org.kde.plasma.panelspacer")

/*App Launcher*/
const menu = panelbottom.addWidget("org.kde.plasma.kickoff")
menu.currentConfigGroup = ["General"]
menu.writeConfig("icon", "distributor-logo-archlinux")
/*Find-Widget*/
panelbottom.addWidget("org.kde.latte.separator")
panelbottom.addWidget("org.kde.plasma.icontasks")
panelbottom.addWidget("org.kde.latte.separator")

var downloads = panelbottom.addWidget("org.kde.plasma.folder")
downloads.currentConfigGroup = ["General"]
downloads.writeConfig("labelMode","1")
downloads.writeConfig("viewMode","1")
downloads.writeConfig("labelText","Downloads")
downloads.writeConfig("icon","folder_download")
downloads.writeConfig("useCustomIcon","true")
downloads.writeConfig("url",`${userDataPath("downloads")}`)

panelbottom.addWidget("org.kde.plasma.panelspacer")

// var cpu = panelbottom.addWidget("org.kde.plasma.systemmonitor.cpucore")
// cpu.currentConfigGroup = ["Appearance"]
// cpu.writeConfig("chartFace", "org.kde.ksysguard.piechart")
// cpu.currentConfigGroup = ["Sensors"]
// cpu.writeConfig("highPrioritySensorIds", ["cpu/all/usage"])
// cpu.writeConfig("totalSensors", ["cpu/all/usage"])

/*systemtray*/
const systraprev = panelbottom.addWidget("org.kde.plasma.systemtray")
// const SystrayContainmentId = systraprev.readConfig("SystrayContainmentId")
// const systray = desktopById(SystrayContainmentId)
// systray.currentGlobalConfigGroup = [""]
// systray.writeGlobalConfig("popupHeight", 430)
// systray.writeGlobalConfig("popupWidth", 320)
// systray.currentConfigGroup = ["General"]
// const ListTrays = systray.readConfig("extraItems")
// const ListTrays2 = ListTrays.replace(",org.kde.plasma.notifications", "")
// systray.writeConfig("extraItems", ListTrays2)
// systray.writeConfig("iconSpacing", 1)
// systray.writeConfig("shownItems", "org.kde.plasma.clipboard,org.kde.plasma.mediacontroller,org.kde.plasma.volume,org.kde.plasma.keyboardlayout,org.kde.plasma.networkmanagement")

/*Cambiando configuracion Dolphin*/
// const IconsStatic_dolphin = ConfigFile('dolphinrc')
// IconsStatic_dolphin.group = 'KFileDialog Settings'
// IconsStatic_dolphin.writeEntry('Places Icons Static Size', 16)
// const PlacesPanel = ConfigFile('dolphinrc')
// PlacesPanel.group = 'PlacesPanel'
// PlacesPanel.writeEntry('IconSize', 16)
/******************************/
/*Clock*/
const panelbottom_clock = panelbottom.addWidget("org.kde.plasma.digitalclock")
panelbottom_clock.currentConfigGroup = ["Appearance"]
panelbottom_clock.writeConfig("fontSize", "14")
panelbottom_clock.writeConfig("fontStyleName", "Medium")
panelbottom_clock.writeConfig("fontWeight", "500")
panelbottom_clock.writeConfig("autoFontAndSize", "false")

/*Notification*/
panelbottom.addWidget("org.kde.plasma.notifications")
/* accent color config*/
// const ColorAccetFile = ConfigFile("kdeglobals")
// ColorAccetFile.group = "General"
// ColorAccetFile.writeEntry("accentColorFromWallpaper", "false")
// ColorAccetFile.deleteEntry("AccentColor")
// ColorAccetFile.deleteEntry("LastUsedCustomAccentColor")
// /*Buttons of aurorae*/
// const Buttons = ConfigFile("kwinrc")
// Buttons.group = "org.kde.kdecoration2"
// Buttons.writeEntry("ButtonsOnRight", "IAX")
// Buttons.writeEntry("ButtonsOnLeft", "");
