import * as Electron from 'electron';
import * as path from 'path';
const app = Electron.app;

let mainWindow : Electron.BrowserWindow;

const createWindow = () => {
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
    mainWindow.loadFile('index.html', {query: {
        'url': 'https://nocorona.kr'
    }});

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
}

// Electron.ipcMain.on('close', (e, args) => {
//     app.quit();
// });

app.whenReady().then(createWindow);

app.on('ready', () => {
    const openCount = () => {
        const win = new Electron.BrowserWindow({
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
        win.loadFile('index.html', {query: {
            'url': 'https://outstanding1301.github.io/text-length-bytes/'
        }});
    };


    const openTag = () => {
        const win = new Electron.BrowserWindow({
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
        win.loadFile('index.html', {query: {
            'url': 'https://outstanding1301.github.io/tag-gen/'
        }});
    };

    const openNew = () => {
        if(mainWindow.isDestroyed()) {
            createWindow();
        }
        else
            mainWindow.focus();
    }
    Electron.globalShortcut.register('Alt+Shift+2', openTag)
    Electron.globalShortcut.register('CommandOrControl+Shift+2', openTag)

    Electron.globalShortcut.register('Alt+Shift+1', openCount)
    Electron.globalShortcut.register('CommandOrControl+Shift+1', openCount)

    Electron.globalShortcut.register('Alt+Shift+`', openNew);
    Electron.globalShortcut.register('CommandOrControl+Shift+`', openNew);
  });


app.on('will-quit', () => {
    Electron.globalShortcut.unregisterAll()  
})

Electron.ipcMain.on('home', () => {
    if(mainWindow.isDestroyed()) {
        createWindow();
    }
    else
        mainWindow.focus();
});

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('web-contents-created', (e, contents) => {
    if(contents.getType() == 'webview') {
        contents.on('before-input-event', (e, key) => {
            if(key.type == 'keyDown') {
                if(key.key == 'F5') {
                    contents.reload();
                }
            }
        })
        contents.on('new-window', (e, url) => {
            e.preventDefault();
            if(url.includes('outstanding1301.github.io')) {
                if(url.includes('text-length-bytes')) {
                    const win = new Electron.BrowserWindow({
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
                    win.loadFile('index.html', {query: {
                        'url': url
                    }});
                    return;
                }
                else if(url.includes('skynet')) {
                    const win = new Electron.BrowserWindow({
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
                    win.removeMenu();
                    win.loadFile('index.html', {query: {
                        'url': url
                    }});
                    return;
                }
                else if(url.includes('tag-gen')) {
                    const win = new Electron.BrowserWindow({
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
                    win.loadFile('index.html', {query: {
                        'url': 'https://outstanding1301.github.io/tag-gen/'
                    }});
                    return;
                }
                const win = new Electron.BrowserWindow({
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
                win.loadFile('index.html', {query: {
                    'url': url
                }});
            }
            else {
                Electron.shell.openExternal(url);
            }
        })
    }
})

app.on('activate', () => {
    if(Electron.BrowserWindow.getAllWindows().length == 0) {
        createWindow();
    }
});