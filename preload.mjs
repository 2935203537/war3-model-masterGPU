import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("war3Desktop", {
  selectFolder: () => ipcRenderer.invoke("select-folder"),
  selectMap: () => ipcRenderer.invoke("select-map"),
  readFile: (absPath) => ipcRenderer.invoke("read-file", absPath),
  setWar3Dir: (dir) => ipcRenderer.invoke("set-war3-dir", dir),
  getWar3Dir: () => ipcRenderer.invoke("get-war3-dir"),
  getWar3Status: () => ipcRenderer.invoke("get-war3-status"),
  selectExportFolder: () => ipcRenderer.invoke("select-export-folder"),
  exportFiles: (outRoot, items) => ipcRenderer.invoke("fs:exportFiles", outRoot, items),
  writeFile: (absPath, data) => ipcRenderer.invoke("fs:writeFile", absPath, data),
  deleteFiles: (absPaths) => ipcRenderer.invoke("fs:deleteFiles", absPaths),
  renameFile: (oldAbs, newAbs) => ipcRenderer.invoke("fs:renameFile", oldAbs, newAbs),
});
