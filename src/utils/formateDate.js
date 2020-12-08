export default function formateDate (datetime) {
    function addDateZero(num) {
        return (num < 10 ? "0" + num : num);
    }
    let d = new Date(datetime);
    const formatDatetime = d.getFullYear()
        + '-' + addDateZero(d.getMonth() + 1)
        + '-' + addDateZero(d.getDate())
        + ' ' + addDateZero(d.getHours())
        + ':' + addDateZero(d.getMinutes())
        + ':' + addDateZero(d.getSeconds());
    return formatDatetime;
}
