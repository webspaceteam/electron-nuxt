const _IS_DEV_MODE_ = process.env.NODE_ENV === 'DEV' ? true : false;

const path = require("path");
const { app, BrowserWindow } = require("electron");

if (_IS_DEV_MODE_) {

} else {
    const serve = require('electron-serve');
    serve({directory: '.app'});
}


let win = null; // Current window
const makeAppWindow = () => {
    win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false
        },
        width: 1280,
        height: 850,
        minWidth: 375,
        minHeight: 780,
        autoHideMenuBar: true,
        icon: path.join(__dirname, "build/icon.png")
    });

    win.on("closed", () => (win = null));
    if (_IS_DEV_MODE_) {
        const { Nuxt, Builder } = require("nuxt");
        const config = require("./nuxt.config");

        //Init nuxt
        const nuxt = new Nuxt(config);
        console.log('Working in DEV mode')
        const http = require("http");
        const server = http.createServer(nuxt.render);
        server.listen(33333);

        const _NUXT_URL_ = `http://localhost:${server.address().port}`;
        console.log(`Nuxt is working on ${_NUXT_URL_}`);

        // Install vue dev tool and open chrome dev tools
        const {
            default: installExtension,
            VUEJS_DEVTOOLS
        } = require("electron-devtools-installer");

        installExtension(VUEJS_DEVTOOLS)
            .then(name => {
                console.log(`Added Extension:  ${name}`);

                win.webContents.on("did-frame-finish-load", () => {
                    win.webContents.once("devtools-opened", () => {
                        win.focus();
                    });
                    win.webContents.openDevTools();
                });
            })
            .catch(err => console.log("An error occurred: ", err));


        const builder = new Builder(nuxt);
        builder
            .build()
            .then(() => {
                // Wait for nuxt to build
                const appServer = () => {
                    http
                        .get(_NUXT_URL_, res => {
                            if (res.statusCode === 200) {
                                win.loadURL(_NUXT_URL_);
                            } else {
                                setTimeout(appServer, 300);
                            }
                        })
                        .on("error", appServer);
                };
                appServer();
            })
            .catch(err => {
                console.error(err); // eslint-disable-line no-console
                process.exit(1);
            });
    } else {
        win.removeMenu();
        win.loadURL('app://-');
    }
}

app.on("ready", makeAppWindow);
app.on("activate", () => win === null && makeAppWindow());
app.on("window-all-closed", () => app.quit());

const mainWin = () => {return win}

export {
    mainWin,
    _IS_DEV_MODE_
}