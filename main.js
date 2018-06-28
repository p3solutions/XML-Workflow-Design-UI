const {
  app,
  BrowserWindow
} = require('electron');
const path = require('path')

if (process.mas) app.setName('XML Workflow Design')

let window;

function createWindow() {
  window = new BrowserWindow({
    width: 600,
    height: 600,
    backgroundColor: '#ffffff',
    title: app.getName(),
  })
  if (process.platform === 'darwin') {
    window.icon = path.join(__dirname, 'dist/xml-workflow-design/assets/brand/suite.icns')
  }
  window.loadURL(path.join('file://', __dirname, 'dist/xml-workflow-design/index.html'))
  window.maximize();
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
