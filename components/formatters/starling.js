import {format} from '../utilities'

export default function (row) {
    const formattedCounterParty = format(row["Counter Party"]);
    const formattedReference = format(row["Reference"]);
    const formattedType = format(row["Type"]);
    const formattedSpendingCategory = format(row["Spending Category"]);

    const description = `${formattedCounterParty}//${formattedReference}//${formattedType}//${formattedSpendingCategory}`;
    return [
        row["Date"],
        row["Amount (GBP)"],
        description
    ];
}
