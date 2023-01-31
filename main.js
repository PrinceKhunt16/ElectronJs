const { app, BrowserWindow } = require('electron')

function createWindow(){
  const win = new BrowserWindow({
    width: 900,
    height: 600,
    frame: true,
    backgroundColor: '#f2f2f2',
    resizable: true,
    title: 'ElectronJs',
    alwaysOnTop: false
  })

  win.loadFile('index.html')
}

app.whenReady().then(createWindow)