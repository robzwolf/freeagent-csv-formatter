import {checkForHeaders, freeagentDateFormat, negateAmount, tidyWhitespace} from '../utilities'
import dayjs from 'dayjs'

/*
 * ********************************************************************************
 * IMPORTANT: If you add any new formatters, append them to the 'formatters' object
 * at the end of this file
 * ********************************************************************************
 */


const starlingFormatter = row => {
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

const marcusFormatter = row => {
    checkForHeaders([
        "TransactionDate",
        "Value",
        "Description"
    ], row);

    const formatDate = (rawDateString) => {
        const year = parseInt(rawDateString.substring(0, 4));
        const month = parseInt(rawDateString.substring(4, 6));
        const day = parseInt(rawDateString.substring(6, 8));

        return dayjs(new Date(year, month-1, day)).format(freeagentDateFormat);
    }

    return [
        formatDate(row["TransactionDate"]),
        row["Value"],
        row["Description"]
    ]
}

const newdayFormatter = row => {
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

const coventrybuildingsocietyFormatter = row => {
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
}

const coventrybuildingsocietyConfigOverride = {
    beforeFirstChunk: chunk => {
        // Skip the first two lines
        const lines = chunk.split("\r\n");
        return lines.slice(2).join("\r\n");
    }
}


/*
 * ****************************************************
 * IMPORTANT: Add new formatters above this comment
 * then add a new item to the 'formatters' object below
 * ****************************************************
 */

const formatters = {
    starling: {
        prettyName: "Starling Bank",
        formatter: starlingFormatter
    },
    marcus: {
        prettyName: "Marcus by Goldman Sachs",
        formatter: marcusFormatter
    },
    newday: {
        prettyName: "NewDay",
        formatter: newdayFormatter
    },
    coventrybuildingsociety: {
        prettyName: "Coventry Building Society",
        formatter: coventrybuildingsocietyFormatter,
        parserConfigOverride: coventrybuildingsocietyConfigOverride
    }
};
export default formatters;
