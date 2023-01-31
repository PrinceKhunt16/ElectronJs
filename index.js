const { webFrame } = require('electron')
const zoomin = document.querySelector('#zoomin')
const zoomout = document.querySelector('#zoomout')

zoomin.addEventListener('click', function(){
  webFrame.setZoomFactor(webFrame.getZoomFactor() + 1)
}) 

zoomout.addEventListener('click', function(){
  webFrame.setZoomFactor(webFrame.getZoomFactor() - 1)
})