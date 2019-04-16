import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Router from 'next/router';
import uuid from 'uuid/v1';
import cookie from 'js-cookie';

// Create a new context for the app
export const UserContext = React.createContext(uuid);

class UserProvider extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
    user: PropTypes.shape().isRequired,
    protectedPage: PropTypes.bool.isRequired,
  };

  constructor({ user, protectedPage }) {
    super();
    this.state = {
      ...{
        isLoggedIn: false,
        userName: null,
        protectedPage: false,
      },
      ...user,
      ...{
        protectedPage,
      },
    };
  }

  componentDidMount() {
    window.addEventListener('storage', this.syncLogout);
  }

  componentWillUnmount() {
    window.removeEventListener('storage', this.syncLogout);
    window.localStorage.removeItem('login');
    window.localStorage.removeItem('logout');
  }

  syncLogout = event => {
    if (event.key === 'login') {
      this.login();
    }

    if (event.key === 'logout') {
      this.logout();
    }
  };

  login = async () => {
    // NOTE: There would normally be a GET call here to an OIDC OP & the cookie would be stored on return
    cookie.set('token', 'abc123', { expires: 1 });
    window.localStorage.setItem('login', Date.now());
    this.setState({
      isLoggedIn: true,
      userName: 'Tom Evans',
    });
  };

  logout = async () => {
    const { protectedPage } = this.props;
    // NOTE: There would normally be a DELETE call here to an OIDC OP & the token cookie would be removed
    window.localStorage.setItem('logout', Date.now());
    cookie.remove('token');
    this.setState({
      isLoggedIn: false,
      userName: null,
    });
    if (protectedPage) {
      Router.push('/');
    }
  };

  render() {
    const { isLoggedIn, userName } = this.state;
    const { children } = this.props;
    const { login, logout } = this;

    return (
      <UserContext.Provider
        value={{
          isLoggedIn,
          userName,
          login,
          logout,
        }}
      >
        {children}
      </UserContext.Provider>
    );
  }
}

export default UserProvider;
