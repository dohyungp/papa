const { app, BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    center: true,
    kiosk: !isDev,
    resizable: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  if (isDev) {
    mainWindow.loadURL("http://localhost:3000");
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, "../build/index.html"));
  }
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}
app.on("ready", createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
