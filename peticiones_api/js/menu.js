const { app, Menu } = require('electron')


const isMac = process.platform === 'darwin'

const template = [
    // { role: 'appMenu' }
    ...(isMac ? [{
        label: app.name,
        submenu: [
            { role: 'about' },
            { type: 'separator' },
            { role: 'services' },
            { type: 'separator' },
            { role: 'hide' },
            { role: 'hideOthers' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'quit' }
        ]
    }] : []),
    {
        label: 'Home',
        submenu: [
            {
                label: 'Home',
                click: async () => {
                    const { mainWindow } = require('./main')
                    mainWindow.loadFile("./html/index.html")
                }
            }]
    },
    {
        label: 'Table',
        submenu: [
            {
                label: 'Table',
                click: async () => {
                    const { mainWindow } = require('./main')
                    mainWindow.loadFile("./html/tabla.html")
                }
            },
        ]
    },
    {
        label: 'Map',
        submenu: [
            {
                label: 'Map',
                click: async () => {
                    const { mainWindow } = require('./main')
                    mainWindow.loadFile("./html/maps.html")
                }
            },
        ]
    },
]

const menu = Menu.buildFromTemplate(template)
module.exports.menu = menu;
Menu.setApplicationMenu(menu)

