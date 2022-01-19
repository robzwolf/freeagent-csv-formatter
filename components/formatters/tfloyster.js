import {checkForHeaders, freeagentDateFormat, tidyWhitespace} from "../utilities";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const tfloyster = {
    name: "tfloyster",
    prettyName: "Transport for London (TfL) Oyster",
    formatter: row => {
        checkForHeaders([
            "Date",
            "Journey/Action",
            "Charge",
            "Credit",
            "Start Time",
            "End Time",
            "Note"
        ], row);

        const formatDate = (rawDateString) => {
            // Sometimes the year is formatted YY, sometimes it is formatted YYYY
            let format;

            if (rawDateString.length === 9) {
                format = "DD-MMM-YY";
            } else {
                format = "DD-MMM-YYYY";
            }
            
            return dayjs(rawDateString, format).format(freeagentDateFormat);
        }

        const formatTime = (start, end) => {
            if (start && end) {
                return `[${start}-${end}]`;
            }

            if (start && !end) {
                return `[${start}]`;
            }

            if (!start && end) {
                return `[${end}]`;
            }

            return "";
        }

        const formattedJourneyAction = tidyWhitespace(row["Journey/Action"]);
        const formattedStart = tidyWhitespace(row["Start Time"]);
        const formattedEnd = tidyWhitespace(row["End Time"]);
        const formattedNote = tidyWhitespace(row["Note"]);
        const formattedAmount = tidyWhitespace(row["Credit"]) - tidyWhitespace(row["Charge"]);

        const description = [
            formatTime(formattedStart, formattedEnd),
            formattedJourneyAction,
            formattedNote
        ]
        .filter(Boolean)
        .join("//");

        return [
            formatDate(row["Date"]),
            formattedAmount,
            description
        ];
    }
};

export default tfloyster;
