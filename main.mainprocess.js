const { app } = require("electron");
import { _IS_DEV_MODE_ } from './mainprocess/core';
import { Menu, custom_menu } from './mainprocess/menu';

const gotTheLock = app.requestSingleInstanceLock(); //requestSingleInstanceLock returns always false on MAS

if (!gotTheLock && !process.mas) {
    app.quit()
} else {
    if ( !_IS_DEV_MODE_ ) {
        Menu.setApplicationMenu(custom_menu);
    }
}