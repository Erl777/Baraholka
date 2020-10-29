export default function formatDate(date) {
    if(date !== undefined) return Intl.DateTimeFormat('ru').format(date);
}