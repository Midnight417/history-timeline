export const toHumanDate = (date: [number, number, number], format?: {month?: boolean, date?: boolean}) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    if (format?.month && format?.date) {
        return `${months[date[1] - 1]} ${date[2].toString()[0] == "0" ? date[2].toString()[1] : date[2]}, ${date[0]}`
    }

    else if (format?.month) {
        return `${months[date[1] - 1]} ${date[0]}`
    }

    return date[0]
}