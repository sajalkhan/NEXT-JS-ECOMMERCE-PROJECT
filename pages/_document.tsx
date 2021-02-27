import Document, {Html, Head, Main, NextScript } from 'next/document'

export default class CustomeDocument extends Document {
    render () {
        return(
            <Html>
                <Head>
                    <meta property='custom' content='great work'/>
                </Head>

                <body>
                    <Main/>
                </body>

                <NextScript/>
            </Html>
        )
    }
}