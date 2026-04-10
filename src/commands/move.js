import * as fs from "../fs/fileSystem"

export default function move(args) {
    if (!args[0] || !args[1]) {
        return "Usage: move <source> <destination>"
    }

    const sourcePath = args[0]
    const destPath = args[1]

    const sourceDir = fs.getCurrentDirectory()
    const sourceFile = sourceDir[sourcePath]

    if (!sourceFile) {
        return "The system cannot find the file specified"
    }

    let destDir = fs.resolvePath(destPath)
    let newFileName = sourcePath.split("\\").pop()

    if (destDir === null) {
        const parentPath = destPath.includes("\\") ? destPath.substring(0, destPath.lastIndexOf("\\")) : fs.getPathString()
        destDir = fs.resolvePath(parentPath)
        newFileName = destPath.split("\\").pop()

        if (destDir === null) {
            return "The system cannot find the path specified"
        }
    }

    if (typeof destDir !== "object") {
        return "The system cannot find the path specified"
    }

    if (destDir[newFileName]) {
        return "A file with that name already exists at the destination"
    }

    destDir[newFileName] = sourceFile
    delete sourceDir[sourcePath]

    return `Moved ${sourcePath} to ${destPath}`
}