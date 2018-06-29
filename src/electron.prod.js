const {
  app,
  BrowserWindow
} = require('electron');
const path = require('path');
const url = require('url');

if (process.mas) app.setName('XML Workflow Design')

let window;

function createWindow() {
  window = new BrowserWindow({
    backgroundColor: '#ffffff',
    title: app.getName(),
  })
  window.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
  window.maximize();
  window.isMinimizable(false);
  
  window.webContents.openDevTools();

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
