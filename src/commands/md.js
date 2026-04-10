import * as fs from "../fs/fileSystem"

export default function md(args) {
    const current = fs.getCurrentDirectory()
    let folderName = args[0]?.trim()

    if (!folderName) return "Specify a directory name"
    else if (current[folderName]) return "Directory already exist"

    if (args.length === 1){
        current[folderName] = {}
    }
    else if (args.length > 1) {
        for (let i = 0; i < args.length; i++) {
            folderName = args[i]?.trim()
            current[folderName] = {}
        }
    }
}