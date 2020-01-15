const isMac = process.platform === "darwin";
const { app, Menu } = require("electron");

const template = [
    ...(isMac
        ? [
            {
            label: app.name,
            submenu: [
                { role: "about" },
                { type: "separator" },
                { role: "services" },
                { type: "separator" },
                { role: "hide" },
                { role: "hideothers" },
                { role: "unhide" },
                { type: "separator" },
                { role: "quit" }
            ]
            }
        ]
        : []),
    {
        label: "File",
        submenu: [isMac ? { role: "close" } : { role: "quit" }]
    },
    {
        label: "Edit",
        submenu: [
        { role: "undo" },
        { role: "redo" },
        { type: "separator" },
        { role: "cut" },
        { role: "copy" },
        { role: "paste" },
        ...(isMac
            ? [
            { role: "pasteAndMatchStyle" },
                { role: "delete" },
                { role: "selectAll" },
                { type: "separator" },
                {
                label: "Speech",
                submenu: [{ role: "startspeaking" }, { role: "stopspeaking" }]
                }
            ]
            : [{ role: "delete" }, { type: "separator" }, { role: "selectAll" }])
        ]
    },
    {
        label: "Window",
        submenu: [
        { role: "minimize" },
        { role: "zoom" },
        ...(isMac
            ? [
                { type: "separator" },
                { role: "front" },
                { type: "separator" },
                { role: "window" }
            ]
            : [{ role: "close" }])
        ]
    }
];

const custom_menu = Menu.buildFromTemplate(template);

export {
    custom_menu,
    Menu
}