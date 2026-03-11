export function convertMongoDateToSimpleDateTime(mongoDate) {
    const date = new Date(mongoDate);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const period = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12 || 12;

    return `${day} - ${month} - ${year} ${hours}:${minutes} ${period}`;
}


export function convertMongoDateToSimpleDate(mongoDate) {

    if (!mongoDate) return '--';

    const date = new Date(mongoDate);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day} - ${month} - ${year}`;
}

export function convertMongoDateToInputDate(mongoDate) {

    if (!mongoDate) return undefined;

    const date = new Date(mongoDate);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
}

export const getFormattedDate = () => {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = String(currentDate.getFullYear()).substr(-2);

    return `${day}/${month}/${year}`;
}