import React, { Fragment } from 'react';

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
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis voluptate cum esse
          consequuntur a doloremque quibusdam ipsam dolorem autem harum repellat sequi est
          architecto necessitatibus in earum nobis, excepturi molestias!
        </p>
      </Fragment>
    )}
  />
);

export default Home;
