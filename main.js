const { app, BrowserWindow, globalShortcut, dialog, Tray, Menu, webContents } = require('electron')
const electron = require('electron')
const windowStateKeeper = require('electron-window-state')
const ipc = electron.ipcMain

let template = [
  {
    label: 'Go to Defination'
  },
  {
    label: 'Cut'
  },
  {
    label: 'Copy'
  },
  {
    label: 'Paste'
  }
]

let menu = Menu.buildFromTemplate(template)

/*

let template = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Open',
      },
      {
        label: 'Copy'
      }
    ]
  },
  {
    label: 'Blog',
    submenu: [
      {
        label: 'Website'
      }
    ]
  },
  {
    label: 'Help',
    submenu: [
      {
        label: 'Documentation'
      }
    ]
  }
]

let menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

*/

function createWindow(){
  let mainWindowState = windowStateKeeper({
    defaultHeight: 800,
    defaultHeight: 500
  })

  const win = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    frame: true,
    backgroundColor: '#f2f2f2',
    resizable: true,
    title: 'ElectronJs',
    alwaysOnTop: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    }
  })

  /* 

  globalShortcut.register('Shift + K', function(){
    win.loadFile('./popup.html')
    console.log('K Key Pressed')
  })

  */

  /* 

  const popup = new BrowserWindow({ parent: win })
  popup.loadFile('popup.html')
  popup.show()

  */

  win.loadFile('index.html')
  win.webContents.on('context-menu', function(){
    menu.popup()
  })
  mainWindowState.manage(win)

  /*

  win.webContents.on('did-finish-load', function(){
    dialog.showOpenDialog({
      defaultPath: app.getPath('downloads'),
      buttonLabel: 'Select File'
    })
  })

  */

  /*

  const wc = win.webContents

  wc.on('dom-ready', function(){
    console.log('dom-ready')
  })

  wc.on('did-finish-load', function(){
    console.log('did-finish-load')
  })

  wc.on('before-input-event', function(){
    console.log('before-input-event')
  })

  */
}

/*

  Event type
  1. Main 
  2. Renderer
  3. Main and Renderer

*/

/*

app.on('before-quit', function(e){
  console.log('before-quit')
})

app.on('will-quit', function(){
  console.log('will-quit')
})

app.on('browser-window-focus', function(){
  console.log('browser-window-focus')
})

app.on('browser-window-blur', function(){
  console.log('browser-window-blur')
})

*/

// app.whenReady().then(createWindow)

ipc.on('open-error-dailog', function(e){
  dialog.showErrorBox('Error Title', 'Error Description')
  e.sender.send('opened-error-dailog', 'Main process opened the error dailog')
})

ipc.on('async-message', function(e){
  e.sender.send('async-reply', 'Main process async replay')
})

ipc.on('sync-message', function(e){
  e.returnValue = 'Sync reply'
})

app.on('ready', function(){
  createWindow()
}) 