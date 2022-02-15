import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';   // 이런식으로 객체 타입으로 받으면 수정가능함
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  // 서버사이드에서 실행하기 위한 로직
  static async getInitalProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () => originalRenderPage({
        enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
      });
      const initialProps = await Document.getInitalProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      };
    } catch (error) {
      console.error(error);
    } finally {
      sheet.seal();
    }
  }

  render() {
    <Html>
      <Head />
      <body>
        <Main />
        <script src="https://polyfill.io/v3/polyfill.min.js?features=default%2Ces2015%2Ces2016%2Ces2017%2Ces2018%2Ces2019" />
        <NextScript />
      </body>
    </Html>
  }
}