export default function formatDate(date) {
    if(date) return Intl.DateTimeFormat('ru').format(date);
}