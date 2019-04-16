import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { withUserContext } from '../components/HOC/User';

import Layout from '../components/Layout';
import Banner from '../components/Banner';

const propTypes = {
  userName: PropTypes.string.isRequired,
};

const Profile = ({ userName }) => (
  <Layout.Standard
    banner={() => (
      <Banner>
        <h1>User Profile</h1>
      </Banner>
    )}
    content={() => (
      <Fragment>
        <p>
          Hello <strong>{userName}</strong>, welcome back!
        </p>
      </Fragment>
    )}
  />
);

Profile.propTypes = propTypes;
Profile.protected = true; // NOTE: this prevents access unless there is a logged in user

export default withUserContext(Profile);
