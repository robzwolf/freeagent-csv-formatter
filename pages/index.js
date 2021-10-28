import Head from 'next/head'
import Papa from 'papaparse'

import {FileDropzone} from "../components/FileDropzone";
import {downloadContentsAsCsvFile} from '../components/utilities';
import {useState} from "react";
import StatementTable from "../components/StatementTable";
import BankSelector from "../components/BankSelector";


export default function Home() {
    const [bank, setBank] = useState(null);
    console.log('Home() called and bank is: ', bank);
    const [selectedFile, setSelectedFile] = useState(null);
    const [convertedFile, setConvertedFile] = useState(null);

    let transformed = [];

    const handleDrop = (files) => {
        console.log("dropped file, bank:", bank, setBank)
        if (files.length > 0) {
            const file = files[0];
            setSelectedFile(file);
            setConvertedFile(null);
            console.log(file, file.name);
            transformed = [];
            parseCSV(file);
        }
    }

    const parseCSV = (csvFile) => {
        console.log("About to parseCSV(), bank is:", bank);
        Papa.parse(csvFile, {
            delimiter: ",",
            header: true,
            encoding: "ISO-8859-1",
            worker: true,
            complete: parseCallback,
            step: processLines,
            skipEmptyLines: true
        });
    }

    const processLines = (results) => {
        console.log(results, results.data);

        console.log("processLines() called, bank:", bank, setBank)

        const formatLine = bank.value;
        const transformedLine = formatLine(results.data);

        if (transformedLine) {
            transformed.push(transformedLine);
            console.log(transformed);
        }
    }

    const parseCallback = () => {
        if (transformed.length === 0) {
            return;
        }
        setConvertedFile(transformed);
        let csvExport = Papa.unparse(transformed, {
            delimiter: ",",
            worker: true,
            newline: "\n"
        });
        console.log(csvExport);

        downloadContentsAsCsvFile(csvExport);

        // window.open(`data:text/csv;charset=utf-8,${csvExport}`)
    }

    if(selectedFile) {
        console.log("selectedFile", selectedFile);
    }

    return (
        <div className="container">
            <Head>
                <title>FreeAgent CSV Formatter</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main>
                <h1 className="title">
                    Welcome to the FreeAgent CSV Formatter!
                </h1>

                <BankSelector bank={bank} setBank={setBank} />

                <FileDropzone handleDrop={handleDrop} disabled={!bank} />

                <p className="description">
                    {selectedFile ?
                        <span>You selected <code>{selectedFile.name}</code>. {convertedFile ? "Here's what we converted it to:" : ""}</span> :
                        <span>Get started by uploading a file.</span>
                    }
                </p>

                {convertedFile ?
                    <StatementTable statementData={convertedFile} />
                    : null
                }

            </main>

            <footer>
                <p>
                    Created by{" "}
                    <a
                        href="https://robbie.dev"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Robbie Jakob-Whitworth
                    </a>
                </p>
            </footer>

            <style jsx>{`
                .container {
                    min-height: 100vh;
                    padding: 0 0.5rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }

                main {
                    padding: 5rem 0;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }

                code {
                    background: #fafafa;
                    border-radius: 5px;
                    padding: 0.75rem;
                    font-size: 1.1rem;
                    font-family: var(--fcf-code-font);
                }

                footer {
                    width: 100%;
                    height: 100px;
                    border-top: 1px solid #eaeaea;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                footer a {
                    color: var(--fcf-blue);
                }

                footer a:hover {
                    text-decoration: none;
                }

                .title {
                    margin: 0 0 24px 0;
                    line-height: 1.15;
                    font-size: 4rem;
                }

                .title,
                .description {
                    text-align: center;
                }

                .description {
                    line-height: 1.5;
                    font-size: 1.5rem;
                }
            `}</style>

            <style jsx global>{`
                html,
                body {
                    padding: 0;
                    margin: 0;
                    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
                    Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
                    sans-serif;
                }

                body {
                    --fcf-very-dark-blue: #0c4f77;
                    --fcf-dark-blue: #1f82bd;
                    --fcf-blue: #0ea7e3;
                    --fcf-light-blue: #24b5ee;
                    --fcf-bright-blue: #45cbff;
                    --fcf-pale-blue: #c6e8fd;

                    --fcf-code-font: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
                }

                * {
                    box-sizing: border-box;
                }
            `}</style>
        </div>
    )
}
