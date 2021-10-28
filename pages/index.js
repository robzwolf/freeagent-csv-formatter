import Head from 'next/head'
import Papa from 'papaparse'

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

        const transformedLine = convertDataToFreeAgentFormat(results.data);
        transformed.push(transformedLine);
        console.log(transformed);
    }

    const convertDataToFreeAgentFormat = (data) => {
        const formattedCounterParty = format(data["Counter Party"]);
        const formattedReference = format(data["Reference"]);
        const formattedType = format(data["Type"]);
        const formattedSpendingCategory = format(data["Spending Category"]);

        const description = `${formattedCounterParty}//${formattedReference}//${formattedType}//${formattedSpendingCategory}`;
        return [
            data["Date"],
            data["Amount (GBP)"],
            description
        ];
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

    const format = (string) => string.trim().replace(/\s\s+/g, ' ');

    return (
        <div className="container">
            <Head>
                <title>Starling2FreeAgent</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main>
                <h1 className="title">
                    Welcome to Starling2FreeAgent!
                </h1>

                <div>
                    <input type="file"
                           id="csvfile"
                           name="csvfile"
                           accept=".csv"
                           onInput={handleFileInputChange}
                    />
                </div>

                <p className="description">
                    Get started by editing <code>pages/index.js</code>
                </p>

                <div className="grid">
                    <a href="https://nextjs.org/docs" className="card">
                        <h3>Documentation &rarr;</h3>
                        <p>Find in-depth information about Next.js features and API.</p>
                    </a>

                    <a href="https://nextjs.org/learn" className="card">
                        <h3>Learn &rarr;</h3>
                        <p>Learn about Next.js in an interactive course with quizzes!</p>
                    </a>

                    <a
                        href="https://github.com/vercel/next.js/tree/master/examples"
                        className="card"
                    >
                        <h3>Examples &rarr;</h3>
                        <p>Discover and deploy boilerplate example Next.js projects.</p>
                    </a>

                    <a
                        href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                        className="card"
                    >
                        <h3>Deploy &rarr;</h3>
                        <p>
                            Instantly deploy your Next.js site to a public URL with Vercel.
                        </p>
                    </a>
                </div>
            </main>

            <footer>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{' '}
                    <img src="/vercel.svg" alt="Vercel" className="logo"/>
                </a>
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

                footer img {
                    margin-left: 0.5rem;
                }

                footer a {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                a {
                    color: inherit;
                    text-decoration: none;
                }

                .title a {
                    color: #0070f3;
                    text-decoration: none;
                }

                .title a:hover,
                .title a:focus,
                .title a:active {
                    text-decoration: underline;
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

                code {
                    background: #fafafa;
                    border-radius: 5px;
                    padding: 0.75rem;
                    font-size: 1.1rem;
                    font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
                    DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
                }

                .grid {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-wrap: wrap;

                    max-width: 800px;
                    margin-top: 3rem;
                }

                .card {
                    margin: 1rem;
                    flex-basis: 45%;
                    padding: 1.5rem;
                    text-align: left;
                    color: inherit;
                    text-decoration: none;
                    border: 1px solid #eaeaea;
                    border-radius: 10px;
                    transition: color 0.15s ease, border-color 0.15s ease;
                }

                .card:hover,
                .card:focus,
                .card:active {
                    color: #0070f3;
                    border-color: #0070f3;
                }

                .card h3 {
                    margin: 0 0 1rem 0;
                    font-size: 1.5rem;
                }

                .card p {
                    margin: 0;
                    font-size: 1.25rem;
                    line-height: 1.5;
                }

                .logo {
                    height: 1em;
                }

                @media (max-width: 600px) {
                    .grid {
                        width: 100%;
                        flex-direction: column;
                    }
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

                * {
                    box-sizing: border-box;
                }
            `}</style>
        </div>
    )
}
