let toggleEcho = true

export default function echo(args) {
    if (!args[0]) {
        return `Echo is ${toggleEcho ? "on" : "off"}`
    }

    if (args[0].toLowerCase() === "off") {
        toggleEcho = false
        return
    }
    else if (args[0].toLowerCase() === "on") {
        toggleEcho = true
        return
    }
    else if (args[0] === "." && toggleEcho) {
        return "\n"
    }

    if (toggleEcho) {
        return args.join(" ")
    }
    else if (!toggleEcho) {
        return "Echo is off (type 'echo on' to enable it)"
    }
}