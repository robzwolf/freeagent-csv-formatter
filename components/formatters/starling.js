import {checkForHeaders, tidyWhitespace} from "../utilities";

const starling = {
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
}

export default starling;
