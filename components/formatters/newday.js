import {checkForHeaders, negateAmount} from "../utilities";

const newday = {
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
};

export default newday;
