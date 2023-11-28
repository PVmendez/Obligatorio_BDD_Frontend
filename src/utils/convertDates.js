export const convertDates = (date) => {
    if (date)
    return new Date(date).toISOString().split("T")[0]
}