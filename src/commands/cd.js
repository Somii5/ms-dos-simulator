import * as fs from "../fs/fileSystem"

export default function cd(target) {
    if (!target || target.toString().trim() === "") return fs.getPathString()

    target = target.toString().trim()
    const currentFolder = fs.getCurrentDirectory()
    const rootName = fs.getRootName()

    if (target.match(/^[a-zA-Z]:$/)) {
        const drive = target.toUpperCase()[0]
        if (fs.fileSystem[drive]) {
            fs.setCurrentPath([drive])
            return ""
        }
    }

    if (target === "\\" || target === "/") {
        fs.setCurrentPath([rootName])
        return ""
    } else if (target === "..") {
        if (fs.currentPath.length > 1) {
            const newPath = [...fs.currentPath]
            newPath.pop()
            fs.setCurrentPath(newPath)
        }
        return ""
    } else if (target.match(/^([a-zA-Z]):\\(.*)/)) {
        const absolutePathMatch = target.match(/^([a-zA-Z]):\\(.*)/)
        const drive = absolutePathMatch[1].toUpperCase()
        const path = absolutePathMatch[2]

        if (!fs.fileSystem[drive]) {
            return "Directory not found"
        }

        let currentDir = fs.fileSystem[drive]
        const parts = path.split("\\").filter(Boolean)
        const pathSoFar = [drive]

        for (const part of parts) {
            const match = Object.keys(currentDir).find(key => key.toLowerCase() === part.toLowerCase())
            if (!match || typeof currentDir[match] !== "object") {
                return "Directory not found"
            }
            currentDir = currentDir[match]
            pathSoFar.push(match)
        }

        fs.setCurrentPath(pathSoFar)
        return ""
    } else {
        const match = Object.keys(currentFolder).find(key => key.toLowerCase() === target.toLowerCase())

        if (match && typeof currentFolder[match] === "object") {
            const newPath = [...fs.currentPath, match]
            fs.setCurrentPath(newPath)
            return ""
        }
    }

    return "Directory not found"
}
