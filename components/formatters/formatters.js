import {freeagentDateFormat, negateAmount, tidyWhitespace} from '../utilities'
import dayjs from 'dayjs'

export function starling(row) {
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

export function marcus(row) {
    const formatDate = (rawDateString) => {
        const year = parseInt(rawDateString.substring(0, 4));
        const month = parseInt(rawDateString.substring(4, 6));
        const day = parseInt(rawDateString.substring(6, 8));

        return dayjs(new Date(year, month, day)).format(freeagentDateFormat);
    }

    return [
        formatDate(row["TransactionDate"]),
        row["Value"],
        row["Description"]
    ]
}

export function newday(row) {
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
