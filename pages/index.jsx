import React, { Fragment } from 'react';
import Link from 'next/link';

import Layout from '../components/Layout';
import Banner from '../components/Banner';

const Home = () => (
  <Layout.Standard
    banner={() => (
      <Banner>
        <h1>Banner Component</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
      </Banner>
    )}
    content={() => (
      <Fragment>
        <h2>Homepage</h2>
        <p>
          <strong>Login to view the status update component</strong>
        </p>
        <p>
          I have implemented a basic user flow with a protect{' '}
          <Link href="/profile" passHref>
            <a>profile</a>
          </Link>{' '}
          page.
        </p>
        <p>
          This would normally use an aith application to provide the cookie handling and security
          requirements (e.g. 2nd auth).
        </p>
        <p>
          It uses local storage to track logged in/out state. If you open 2 browsers at the same
          time you will see both update when selecting the login or logout button.
        </p>
      </Fragment>
    )}
  />
);

export default Home;
