export const fileSystem = {
    C: {
        docs: {
            "help.txt": "This is the help file",
            "demo.txt": "Demo file to do whatever with it",
            "doom.exe": "binary...",
        },
        games: {
            "doom.exe": "binary...",
        },
    },
}

export let currentPath = ["C"]

export function getCurrentDirectory() {
    return currentPath.reduce((dir, folder) => dir[folder], fileSystem)
}

export function getPathString() {
    return currentPath.join("\\") + ">"
}

export function getRootName() {
    return Object.keys(fileSystem)[0]
}

export function setCurrentPath(newPath) {
    currentPath = newPath
}

export function resolvePath(path) {
    const parts = path.split("\\").filter(Boolean)
    const drive = parts[0].toUpperCase().replace(":", "")

    let dir = fileSystem[drive]
    if (!dir) return null

    for (let i = 1; i < parts.length; i++) {
        const part = parts[i]

        if (!dir[part]) return null

        if (typeof dir[part] === "object") {
            dir = dir[part]
        } else {
            return null
        }
    }
    return dir
}

export default fileSystem