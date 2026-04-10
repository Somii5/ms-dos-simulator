import * as fs from "../fs/fileSystem"

export default function dir() {
    const currentDirectory = fs.getCurrentDirectory()
    const contents = Object.keys(currentDirectory)
    if (contents.length === 0) {
        return ["The directory is empty."]
    }
    
    return contents.map(item => {
        const isDirectory = typeof currentDirectory[item] === "object"
        return isDirectory ? `<DIR>\t${item}` : `\t${item}`
    })
}