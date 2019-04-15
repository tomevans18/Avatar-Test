import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();

    const originalRenderPage = ctx.renderPage;
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
      });

    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, styles: [...initialProps.styles, ...sheet.getStyleElement()] };
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <link rel="icon" href="/static/favicon.ico" type="image/x-icon" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, viewport-fit=cover"
          />
          <meta name="description" content="This is a meta description for this website!!" />
          {(process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') && (
            <link rel="manifest" href="/static/manifest.webmanifest" />
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
