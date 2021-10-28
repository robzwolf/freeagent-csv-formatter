export default function StatementTable({statementData}) {
    return (
        <>
            <table cellSpacing="0">
                <tbody>
                    {statementData.map((row, i) => (
                        <tr key={i}>
                            <td className="statement-row-date">{row[0]}</td>
                            <td className="statement-row-amount">{row[1]}</td>
                            <td className="statement-row-description">{row[2]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <style jsx>{`
                tr:nth-child(odd) {
                    background: var(--fcf-pale-blue);
                }
                
                tr:nth-child(even) {
                    background: #e6f5ff;
                }
                
                td {
                    padding: 8px 14px;
                    font-family: var(--fcf-code-font);
                    font-size: 13px;
                }
                
                .statement-row-amount {
                    text-align: right;
                }
                
                @media (max-width: 768px) {
                    td {
                        font-size: 12px;
                        padding: 4px 8px;
                    }
                }
            `}</style>
        </>
    )
}
