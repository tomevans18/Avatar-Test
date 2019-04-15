import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import { createGlobalStyle } from 'styled-components';
import NProgress from 'nprogress';
import Router from 'next/router';

// import fetchHandler from '../lib/fetchHandler';

import ResetStyles from '../styles/reset.style';
import GlobalStyles from '../styles/global.style';
import LoadingBarStyles from '../styles/loadingBar.style';

import { AppProviders } from '../components/HOC';
import AccessibilityWrapper from '../components/AccessibilityWrapper';
import Layout from '../components/Layout';

/* eslint-disable no-unused-expressions */
const GlobalStylesComponent = createGlobalStyle`
  ${ResetStyles}
  ${GlobalStyles}
  ${LoadingBarStyles}
`;
const ResetAndLoadingBarStylesComponent = createGlobalStyle`
  ${ResetStyles}
  ${LoadingBarStyles}
`;
/* eslint-enable no-unused-expressions */

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    let user = {
      isLoggedIn: true,
    };
    // try {
    //   user = {
    //     ...user,
    //     ...async () => {
    //       const data = await fetchHandler('https://example.com');
    //       data.userName = data.id;
    //       return data;
    //     },
    //   };
    // } catch (err) {
    //   user = { isLoggedIn: false };
    // }

    user = { isLoggedIn: true, userName: 'testUser' };

    if (Component.getInitialProps) {
      pageProps = { pageProps, ...(await Component.getInitialProps(ctx)) };
    }

    return { ...pageProps, user };
  }

  render() {
    const { Component, pageProps } = this.props;
    const { user } = this.props;

    return (
      <Container>
        <Head>
          <title>Avatar Test</title>
        </Head>
        {typeof Component !== 'undefined' &&
          (typeof Component.noGlobalStyles !== 'undefined' && Component.noGlobalStyles ? (
            <ResetAndLoadingBarStylesComponent />
          ) : (
            <GlobalStylesComponent />
          ))}
        <AppProviders user={user}>
          <AccessibilityWrapper>
            {typeof Component !== 'undefined' &&
              (typeof Component.layout !== 'undefined' ? (
                <Component.layout {...{ Component, pageProps }} />
              ) : (
                <Layout.Foundation user={user}>
                  <Component {...pageProps} />
                </Layout.Foundation>
              ))}
          </AccessibilityWrapper>
        </AppProviders>
      </Container>
    );
  }
}

export default MyApp;
