import * as fs from "../fs/fileSystem"

export default function ren(args) {
    const current = fs.getCurrentDirectory()
    const oldName = args[0]?.trim()
    const newName = args[1]?.trim()

    if (!args[0] || !args[1]) return "Specify old and new name"
    else if (!current[oldName]) return "File or directory not found"
    else if (current[oldName] && current[newName]) return "File or directory already exist"

    if (current[oldName] && !current[newName]){
        current[newName] = current[oldName]
        delete current[oldName]
        return ""
    }
}