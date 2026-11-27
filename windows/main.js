const { app, BrowserWindow, shell } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1100, height: 820, minWidth: 380, minHeight: 600,
    title: 'מסלול', autoHideMenuBar: true, backgroundColor: '#FAF4E4',
    icon: path.join(__dirname, 'icon.ico')
  });
  win.setMenuBarVisibility(false);
  win.loadFile(path.join(__dirname, 'index.html'));
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:/.test(url)) shell.openExternal(url);
    return { action: 'deny' };
  });
}

const lock = app.requestSingleInstanceLock();
if (!lock) { app.quit(); } else {
  app.whenReady().then(createWindow);
  app.on('window-all-closed', () => app.quit());
}
