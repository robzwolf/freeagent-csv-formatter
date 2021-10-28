import {checkForHeaders, freeagentDateFormat} from "../utilities";
import dayjs from "dayjs";

const marcus = {
    name: "marcus",
    prettyName: "Marcus by Goldman Sachs",
    formatter: row => {
        checkForHeaders([
            "TransactionDate",
            "Value",
            "Description"
        ], row);

        const formatDate = (rawDateString) => {
            const year = parseInt(rawDateString.substring(0, 4));
            const month = parseInt(rawDateString.substring(4, 6));
            const day = parseInt(rawDateString.substring(6, 8));

            return dayjs(new Date(year, month - 1, day)).format(freeagentDateFormat);
        }

        return [
            formatDate(row["TransactionDate"]),
            row["Value"],
            row["Description"]
        ]
    }
};

export default marcus;
