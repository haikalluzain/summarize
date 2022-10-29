import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="id">
        <Head>
          <title>Summarize</title>
          <meta name="description" content="DESC" />
        </Head>
        <body className="modern-design">
          <div className="d-flex flex-column flex-grow-1 flex-shrink-1 vh-100">
            <Main />
            <NextScript />
          </div>
        </body>
      </Html>
    )
  }
}

export default MyDocument
