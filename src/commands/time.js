export default function time() {
    const now = new Date()
    const hours = now.getHours()
    const minutes = now.getMinutes()
    const seconds = now.getSeconds()

    const format = `${hours}:${minutes}:${seconds}`

    return format
}