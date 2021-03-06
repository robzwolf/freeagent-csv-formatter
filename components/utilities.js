export function tidyWhitespace(data) {
    if (typeof data === "undefined" || !data) {
        return "";
    }

    return data.trim().replace(/\s\s+/g, ' ');
}

export const freeagentDateFormat = "DD/MM/YYYY"

export function downloadContentsAsCsvFile(csvExport) {
    window.URL = window.webkitURL || window.URL;

    const contentType = 'text/csv';
    const csvFile = new Blob([csvExport], {type: contentType});
    const a = document.createElement('a');
    a.download = 'statement.csv';
    a.href = window.URL.createObjectURL(csvFile);
    a.dataset.downloadurl = [contentType, a.download, a.href].join(':');
    a.click();
}

export function negateAmount(amount) {
    return `${-amount}`;
}

export function MissingHeaderException(header, row) {
    this.header = header;
    this.row = row;
    this.message = `Row does not have '${header}' key`;
}

export function checkForHeaders(headers, row) {
    headers.forEach(header => {
        if (!row.hasOwnProperty(header)) {
            throw new MissingHeaderException(header, row);
        }
    })
}
