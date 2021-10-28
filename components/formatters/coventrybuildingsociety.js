import {checkForHeaders, tidyWhitespace} from "../utilities";

const coventrybuildingsociety = {
    name: "coventrybuildingsociety",
    prettyName: "Coventry Building Society",
    formatter: row => {
        checkForHeaders([
            "Date",
            " Description",
            " Money in",
            " Money out"
        ], row);

        const formattedDate = tidyWhitespace(row["Date"]);
        const formattedDescription = tidyWhitespace(row[" Description"]);
        const formattedAmount = tidyWhitespace(row[" Money in"]) - tidyWhitespace(row[" Money out"]);

        return [
            formattedDate,
            formattedAmount,
            formattedDescription
        ];
    },
    parserConfigOverride: {
        beforeFirstChunk: chunk => {
            // Skip the first two lines
            const lines = chunk.split("\r\n");
            return lines.slice(2).join("\r\n");
        }
    }
};

export default coventrybuildingsociety;
