import React from 'react';

import Layout from '../components/Layout';

const Home = () => (
  <Layout.Standard banner={() => <div>BANNER</div>} content={() => <h1>Homepage</h1>} />
);

export default Home;
