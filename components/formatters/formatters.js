import {checkForHeaders, freeagentDateFormat, negateAmount, tidyWhitespace} from '../utilities'
import dayjs from 'dayjs'


/*
 * ****************************************************
 * IMPORTANT: Add new formatters above this comment
 * then add a new item to the 'formatters' object below
 * ****************************************************
 */

const formatters = [
    {
        name: "starling",
        prettyName: "Starling Bank",
        formatter: row => {
            checkForHeaders([
                "Counter Party",
                "Reference",
                "Type",
                "Spending Category"
            ], row);

            const formattedCounterParty = tidyWhitespace(row["Counter Party"]);
            const formattedReference = tidyWhitespace(row["Reference"]);
            const formattedType = tidyWhitespace(row["Type"]);
            const formattedSpendingCategory = tidyWhitespace(row["Spending Category"]);

            const description = `${formattedCounterParty}//${formattedReference}//${formattedType}//${formattedSpendingCategory}`;
            return [
                row["Date"],
                row["Amount (GBP)"],
                description
            ];
        }
    },
    {
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
    },
    {
        name: "newday",
        prettyName: "NewDay",
        formatter: row => {
            checkForHeaders([
                "Date",
                "Amount(GBP)",
                "Description"
            ], row);

            // Ignore pending transactions that haven't cleared yet
            if (row["Date"] === "Pending") {
                return null;
            }

            // Spend is listed as positive, payments to the credit card are listed as negative
            // We need to negate all these for FreeAgent
            const formattedAmount = negateAmount(row["Amount(GBP)"]);

            return [
                row["Date"],
                formattedAmount,
                row["Description"]
            ]
        }
    },
    {
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
    }
];
export default formatters;
