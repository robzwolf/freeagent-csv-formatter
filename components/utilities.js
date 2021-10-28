export function format(data) {
    if (typeof data === "undefined" || !data) {
        return "";
    }

    return data.trim().replace(/\s\s+/g, ' ');
}
