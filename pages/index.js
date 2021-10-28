import Head from 'next/head'
import Papa from 'papaparse'

import starling from '../components/formatters/starling'
import {FileDropzone} from "../components/FileDropzone";


export default function Home() {
    let transformed = [];

    const handleFileInputChange = (e) => {
        const files = e.target.files;

        console.log(e);
        console.log(e.target.files);

        if (files.length > 0) {
            const file = files[0];
            console.log(file, file.name);
            transformed = [];
            parseCSV(file);
        }
    }

    const handleDrop = (files) => {
        if (files.length > 0) {
            const file = files[0];
            console.log(file, file.name);
            transformed = [];
            parseCSV(file);
        }
    }

    const parseCSV = (csvFile) => {
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

    const processLines = (results, parser) => {
        console.log(results, results.data);

        const transformedLine = starling(results.data);
        transformed.push(transformedLine);
        console.log(transformed);
    }

    const parseCallback = () => {
        let csvExport = Papa.unparse(transformed, {
            delimiter: ",",
            worker: true,
            newline: "\n"
        });
        console.log(csvExport);

        window.URL = window.webkitURL || window.URL;

        const contentType = 'text/csv';
        const csvFile = new Blob([csvExport], {type: contentType});
        const a = document.createElement('a');
        a.download = 'statement.csv';
        a.href = window.URL.createObjectURL(csvFile);
        a.textContent = 'Download CSV';
        a.dataset.downloadurl = [contentType, a.download, a.href].join(':');
        document.body.appendChild(a);
        a.click();

        // window.open(`data:text/csv;charset=utf-8,${csvExport}`)
    }

    return (
        <div className="container">
            <Head>
                <title>Starling2FreeAgent</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main>
                <h1 className="title">
                    Welcome to the FreeAgent CSV Formatter!
                </h1>

                <FileDropzone handleDrop={handleDrop} />

                <p className="description">
                    Get started by uploading a file.
                </p>

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
                    margin: 0;
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
                }

                * {
                    box-sizing: border-box;
                }
            `}</style>
        </div>
    )
}
