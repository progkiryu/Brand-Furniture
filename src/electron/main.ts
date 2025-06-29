import { app, BrowserWindow } from "electron";
import path from "path";
import { isDev } from "./util.js";
import { getPreloadPath } from "./pathResolver.js";
import { mongoConnect } from "./database.js";
import { getOrders } from "./dataHandlers/order.js"
import { getClients } from "./dataHandlers/client.js";

app.on("ready", () => {
  // create browser window
  const mainWindow = new BrowserWindow({
    // hide top menu bar
    autoHideMenuBar: true,
    webPreferences: {
      // security purposes
      nodeIntegration: false,
      contextIsolation: true,
      preload: getPreloadPath()
    }
  });

  if (isDev()) {
    // Open live server while in dev mode
    mainWindow.loadURL("http://localhost:5555");
  } else {
    // Open HTML file when app is built
    mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
  }

  mongoConnect();
  
  getOrders();
  //getClients();
});
