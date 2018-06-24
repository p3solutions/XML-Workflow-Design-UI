const {
  app,
  BrowserWindow
} = require('electron');
const path = require('path')

let window;

function createWindow() {
  window = new BrowserWindow({
    width: 600,
    height: 600,
    backgroundColor: '#ffffff',
    icon: path.join('file://', __dirname, 'dist/cfw-workflow-design/favicon.ico')
  })
  window.loadURL(path.join('file://', __dirname, 'dist/cfw-workflow-design/index.html'))

//   window.webContents.openDevTools()

  window.on('closed', function () {
    window = null;
  })

}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (window === null) {
    createWindow()
  }
})
