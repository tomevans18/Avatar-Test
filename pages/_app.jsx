import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import nextCookie from 'next-cookies';
import { createGlobalStyle } from 'styled-components';

// import fetchHandler from '../lib/fetchHandler';

import ResetStyles from '../styles/reset.style';
import GlobalStyles from '../styles/global.style';

import { AppProviders } from '../components/HOC';
import AccessibilityWrapper from '../components/AccessibilityWrapper';
import Layout from '../components/Layout';

/* eslint-disable no-unused-expressions */
const GlobalStylesComponent = createGlobalStyle`
  ${ResetStyles}
  ${GlobalStyles}
`;
const ResetAndLoadingBarStylesComponent = createGlobalStyle`
  ${ResetStyles}
`;
/* eslint-enable no-unused-expressions */

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const { token } = nextCookie(ctx);
    let pageProps = {};

    let user;

    try {
      if (token) {
        // NOTE: Normally API call to OIDC OP to get user
        // const data = await fetchHandler(
        //   'https://example.com/api/user/'
        // );
        // const { userName } = data;
        user = {
          isLoggedIn: true,
          userName: 'Tom Evans',
        };
      } else {
        user = { isLoggedIn: false };
      }
    } catch (err) {
      user = { isLoggedIn: false };
    }

    if (!user.isLoggedIn && Component.protected) {
      if (ctx.res) {
        ctx.res.writeHead(302, {
          Location: '/',
        });
        ctx.res.end();
      } else {
        Router.push('/');
      }
    }

    if (Component.getInitialProps) {
      pageProps = { pageProps, ...(await Component.getInitialProps(ctx)) };
    }

    return { ...pageProps, user, protectedPage: Component.protected || false };
  }

  render() {
    const { Component, pageProps, protectedPage, user } = this.props;

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
        <AppProviders user={user} protectedPage={protectedPage}>
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
