import * as fs from "../fs/fileSystem"

export default function type(args) {
    if (args.length === 0) {
        return "Specify a filename"
    }

    const current = fs.getCurrentDirectory()
    const output = []

    for (let i = 0; i < args.length; i++) {
        const fileName = args[i].trim()

        const file = current[fileName]

        if (!(fileName in current)) {
            output.push(`File not found: ${fileName}`)
        }
        else if (typeof current[file] === "object") {
            output.push(`Cannot display a directory: ${fileName}`)
        }
        else {
            output.push(`---- ${fileName} ----`)
            output.push(...file.split("\n"))
        }
    }

    return output
}