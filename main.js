const { app, BrowserWindow, globalShortcut, dialog, Tray, Menu } = require('electron')
const windowStateKeeper = require('electron-window-state')

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
    alwaysOnTop: false
  })

  /* 

  globalShortcut.register('Shift + K', function(){
    win.loadFile('./child.html')
    console.log('K Key Pressed')
  })

  */

  /* 

  const child = new BrowserWindow({ parent: win })
  child.loadFile('child.html')
  child.show()

  */

  win.loadFile('index.html')
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

app.on('ready', function(){
  createWindow()
})