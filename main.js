"use strict";
exports.__esModule = true;
var Electron = require("electron");
var path = require("path");
var app = Electron.app;
var mainWindow;
var createWindow = function () {
    // ejse.data();
    mainWindow = new Electron.BrowserWindow({
        width: 400,
        height: 725,
        title: "Orange",
        webPreferences: {
            nodeIntegration: true,
            webviewTag: true
        },
        frame: false,
        icon: path.join(__dirname, 'assets/icons/png/orange.png')
    });
    // win.webContents.openDevTools()
    mainWindow.removeMenu();
    mainWindow.loadFile('index.html', { query: {
            'url': 'https://outstanding1301.github.io/orange/'
        } });
    // win.webContents.on('new-window', (event, url) => {
    //     event.preventDefault();
    //     const child = new Electron.BrowserWindow({
    //         width: 1280,
    //         height: 720,
    //         webPreferences: {
    //             nodeIntegration: true,
    //             webviewTag: true
    //         },
    //         frame: false
    //     })
    //     child.loadURL(url);
    // });
};
// Electron.ipcMain.on('close', (e, args) => {
//     app.quit();
// });
app.whenReady().then(createWindow);
app.on('ready', function () {
    var openCount = function () {
        var win = new Electron.BrowserWindow({
            width: 480,
            height: 660,
            title: "글자 수 세기",
            webPreferences: {
                nodeIntegration: true,
                webviewTag: true
            },
            frame: false,
            icon: path.join(__dirname, 'assets/icons/png/orange.png')
        });
        win.removeMenu();
        win.loadFile('index.html', { query: {
                'url': 'https://outstanding1301.github.io/text-length-bytes/'
            } });
    };
    var openTag = function () {
        var win = new Electron.BrowserWindow({
            width: 500,
            height: 660,
            title: "태그 생성",
            webPreferences: {
                nodeIntegration: true,
                webviewTag: true
            },
            frame: false,
            icon: path.join(__dirname, 'assets/icons/png/orange.png')
        });
        win.removeMenu();
        win.loadFile('index.html', { query: {
                'url': 'https://outstanding1301.github.io/tag-gen/'
            } });
    };
    var openNew = function () {
        if (mainWindow.isDestroyed()) {
            createWindow();
        }
        else
            mainWindow.focus();
    };
    Electron.globalShortcut.register('Alt+Shift+2', openTag);
    Electron.globalShortcut.register('CommandOrControl+Shift+2', openTag);
    Electron.globalShortcut.register('Alt+Shift+1', openCount);
    Electron.globalShortcut.register('CommandOrControl+Shift+1', openCount);
    Electron.globalShortcut.register('Alt+Shift+`', openNew);
    Electron.globalShortcut.register('CommandOrControl+Shift+`', openNew);
});
app.on('will-quit', function () {
    Electron.globalShortcut.unregisterAll();
});
Electron.ipcMain.on('home', function () {
    if (mainWindow.isDestroyed()) {
        createWindow();
    }
    else
        mainWindow.focus();
});
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
app.on('web-contents-created', function (e, contents) {
    if (contents.getType() == 'webview') {
        contents.on('before-input-event', function (e, key) {
            if (key.type == 'keyDown') {
                if (key.key == 'F5') {
                    contents.reload();
                }
            }
        });
        contents.on('new-window', function (e, url) {
            e.preventDefault();
            if (url.includes('outstanding1301.github.io')) {
                if (url.includes('text-length-bytes')) {
                    var win_1 = new Electron.BrowserWindow({
                        width: 480,
                        height: 660,
                        title: "글자 수 세기",
                        webPreferences: {
                            nodeIntegration: true,
                            webviewTag: true
                        },
                        frame: false,
                        icon: path.join(__dirname, 'assets/icons/png/orange.png')
                    });
                    win_1.removeMenu();
                    win_1.loadFile('index.html', { query: {
                            'url': url
                        } });
                    return;
                }
                else if (url.includes('skynet')) {
                    var win_2 = new Electron.BrowserWindow({
                        width: 1380,
                        height: 840,
                        title: "Skynet",
                        webPreferences: {
                            nodeIntegration: true,
                            webviewTag: true
                        },
                        frame: false,
                        icon: path.join(__dirname, 'assets/icons/png/orange.png')
                    });
                    win_2.removeMenu();
                    win_2.loadFile('index.html', { query: {
                            'url': url
                        } });
                    return;
                }
                else if (url.includes('tag-gen')) {
                    var win_3 = new Electron.BrowserWindow({
                        width: 500,
                        height: 660,
                        title: "태그 생성",
                        webPreferences: {
                            nodeIntegration: true,
                            webviewTag: true
                        },
                        frame: false,
                        icon: path.join(__dirname, 'assets/icons/png/orange.png')
                    });
                    win_3.removeMenu();
                    win_3.loadFile('index.html', { query: {
                            'url': 'https://outstanding1301.github.io/tag-gen/'
                        } });
                    return;
                }
                var win = new Electron.BrowserWindow({
                    width: 1280,
                    height: 800,
                    title: "Orange",
                    webPreferences: {
                        nodeIntegration: true,
                        webviewTag: true
                    },
                    frame: false,
                    icon: path.join(__dirname, 'assets/icons/png/orange.png')
                });
                win.removeMenu();
                win.loadFile('index.html', { query: {
                        'url': url
                    } });
            }
            else {
                Electron.shell.openExternal(url);
            }
        });
    }
});
app.on('activate', function () {
    if (Electron.BrowserWindow.getAllWindows().length == 0) {
        createWindow();
    }
});
