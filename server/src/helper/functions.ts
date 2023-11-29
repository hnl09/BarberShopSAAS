export function convertTimeToMinutes(time: string) {
    const [hours, minutes] = time.split(':');

    const hoursInMinutes = parseInt(hours, 10) * 60;
    const minutesInMinutes = parseInt(minutes, 10);

    return hoursInMinutes + minutesInMinutes;
}