import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="ko">
            <Head>
                <meta charSet="utf-8" />
                <meta name="theme-color" content="#3B82F6" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
