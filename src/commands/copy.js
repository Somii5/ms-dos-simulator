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

    const destDir = fs.resolvePath(destPath)
    if (!destDir) {
        return "The system cannot find the path specified"
    }

    const fileName = sourcePath.split("\\").pop()

    if (destDir[fileName]) {
        return "A file with that name already exists at the destination"
    }

    destDir[fileName] = sourceFile
    delete sourceDir[sourcePath]

    return `Moved ${fileName} to ${destPath}`
}