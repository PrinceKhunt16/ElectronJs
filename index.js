const electron = require('electron')
const zoomin = document.querySelector('#zoomin')
const zoomout = document.querySelector('#zoomout')
const snackbar = document.querySelector('#snackbar')
const errorBtn = document.querySelector('#errorbtn')
const asyncBtn = document.querySelector('#asyncbtn')
const syncBtn = document.querySelector('#syncbtn')
const ipc = electron.ipcRenderer

zoomin.addEventListener('click', function(){
  electron.webFrame.setZoomFactor(electron.webFrame.getZoomFactor() + 1)
}) 

zoomout.addEventListener('click', function(){
  electron.webFrame.setZoomFactor(electron.webFrame.getZoomFactor() - 1)
})

function sendToSnackbar(message){
  const node = document.createElement('div')
  node.innerText = message
  snackbar.appendChild(node)
}
 
errorBtn.addEventListener('click', function(){
  sendToSnackbar('Error message start')
  ipc.send('open-error-dailog')
  sendToSnackbar('Error message end')
})

asyncBtn.addEventListener('click', function(){
  sendToSnackbar('Async message start')
  ipc.send('async-message')
  sendToSnackbar('Async message end')
})

syncBtn.addEventListener('click', function(){
  sendToSnackbar('Sync message start')
  const ipcSyncReply = ipc.sendSync('sync-message')
  sendToSnackbar(ipcSyncReply)
  sendToSnackbar('Sync message end')
})

ipc.on('opened-error-dailog', function(e, args){
  sendToSnackbar(args)
})