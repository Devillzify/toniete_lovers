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
        label: 'Utils',
        submenu: [
            {
                label: 'Map',
                click: async () => {
                    const { mainWindow } = require('./main')
                    mainWindow.loadFile("./html/maps.html")
                }
            },
            {
                label: 'Graphs',
                click: async () => {
                    const { mainWindow } = require('./main')
                    mainWindow.loadFile("./html/graphs.html")
                }
            },
        ]
    },
    {
        label: 'Administrador',
        submenu: [
            {
                label: 'Insertar nueva Casa',
                click: async () => {
                    const { mainWindow } = require('./main')
                    mainWindow.loadFile("./html/insert.html")
                }
            },
        ]
    },
    {
        label: 'Log out',
        submenu: [
            {
                label: 'Log out',
                click: async () => {
                    const { resetToken } = require('./main')
                    resetToken()
                }
            },
            {
                label: 'Modificar Casa',
                click: async () => {
                    const { mainWindow } = require('./main')
                    mainWindow.loadFile("./html/tabla.html")
                }
            },
        ]
    },
]

const menu2 = Menu.buildFromTemplate(template)
module.exports.menu2 = menu2;
Menu.setApplicationMenu(menu2)

