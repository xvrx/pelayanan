function formatDate(b) {
    if (b === "") return "";
    const a = new Date(b);
    const taun = a.getFullYear();
    const bulan = a.getMonth() + 1;
    const tanggal = a.getDate() - 1;
    const locale = [taun,bulan,tanggal].join("-");
    return locale; 
}

module.exports = {formatDate}