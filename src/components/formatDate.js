
function addDateZero(num) {
    return (num < 10 ? "0" + num : num);
}
export default function formatDate(datetime) {
    let d = new Date(datetime);
    return d.getFullYear()
        + '-' + addDateZero(d.getMonth() + 1)
        + '-' + addDateZero(d.getDate()) + ' '
        + addDateZero(d.getHours()) + ':'
        + addDateZero(d.getMinutes()) + ':'
        + addDateZero(d.getSeconds());
};
