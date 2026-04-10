import * as fs from "../fs/fileSystem"

export default function del(args) {
    const current = fs.getCurrentDirectory()
    const fileName = args[0]?.trim()

    if (!fileName) return "Specify a filename"

    if (!fileName.includes("*") && typeof current[fileName] === "object") {
        return "Cannot delete a directory with del"
    }

    const regex = wildcardToRegex(fileName)
    let deleted = []

    for (const name of Object.keys(current)) {
        if (regex.test(name) && typeof current[name] !== "object") {
            delete current[name]
            deleted.push(name)
        }
    }

    if (deleted.length === 0) return "File not found"

    return `Deleted: ${deleted.join(", ")}`
}

function wildcardToRegex(pattern) {
    if (pattern === "*.*") return /^.+\..+$/ 
    if (pattern === "*") return /^.+$/       

    return new RegExp(
        "^" +
        pattern
            .replace(/\./g, "\\.")
            .replace(/\*/g, ".*")  
        + "$"
    )
}
