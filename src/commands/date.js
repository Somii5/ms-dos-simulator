let now = new Date()

export default function date(args) {
    const weekDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    let dayWeek = weekDay[now.getDay()]
    let day = now.getDate()
    let month = now.getMonth() + 1
    let year = now.getFullYear()

    if(!args[0]){
        return `Current date is: ${dayWeek} ${day}.${month}.${year}.`
    }
    else if (args[0] === "now") {
        let fresh = new Date
        day = fresh.getDate()
        month = fresh.getMonth() + 1
        year = fresh.getFullYear()
        dayWeek = weekDay[fresh.getDay()]
        now = fresh
    }
    else {
        const newDay = parseInt(args[0]?.split())
        const newMonth = parseInt(args[1]?.split())
        const newYear = parseInt(args[2]?.split())
        if (!isNaN(newDay) && !isNaN(newMonth) && !isNaN(newYear) &&
            newDay >= 1 && newDay <= 31 &&
            newMonth >= 1 && newMonth <= 12 &&
            newYear >= 1970
        ) {
            now.setFullYear(newYear)
            now.setMonth(newMonth - 1)
            now.setDate(newDay)
        }
        else {
            return "Wrong format"
        }
    }
}